import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateWalletMutation } from "../../../services/walletApi";
import { useUpdateTransactionStatusMutation } from "../../../services/transactionApi";
import { useDecryptDataQuery } from "../../../services/decryptApi";
import { useAddServicePackMutation } from "../../../services/woodworkerApi";
import { useNotify } from "../../../components/Utility/Notify";
import {
  Box,
  Center,
  Spinner,
  Text,
  VStack,
  Heading,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import { FiLoader } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import RequireAuth from "../../../components/Utility/RequireAuth";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const notify = useNotify();
  const [updateWallet] = useUpdateWalletMutation();
  const [updateTransactionStatus] = useUpdateTransactionStatusMutation();
  const [addServicePack] = useAddServicePackMutation();
  const [status, setStatus] = useState("Đang xử lý giao dịch...");
  const [isProcessing, setIsProcessing] = useState(true);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Common parameters
  const encryptedTransactionId = searchParams.get("TransactionId");
  const amount = searchParams.get("vnp_Amount");

  // Wallet-specific parameters
  const encryptedWalletId = searchParams.get("WalletId");

  // Service Pack-specific parameters
  const encryptedWoodworkerId = searchParams.get("WoodworkerId");
  const encryptedServicePackId = searchParams.get("ServicePackId");

  // Determine transaction type based on parameters
  const isServicePackTransaction =
    !!encryptedWoodworkerId && !!encryptedServicePackId;

  // Decrypt wallet data
  const { data: walletIdData, isLoading: isWalletIdLoading } =
    useDecryptDataQuery(encryptedWalletId, {
      skip: !encryptedWalletId || isServicePackTransaction,
    });

  // Decrypt transaction ID
  const { data: transactionIdData, isLoading: isTransactionIdLoading } =
    useDecryptDataQuery(encryptedTransactionId, {
      skip: !encryptedTransactionId,
    });

  // Decrypt service pack data
  const { data: woodworkerIdData, isLoading: isWoodworkerIdLoading } =
    useDecryptDataQuery(encryptedWoodworkerId, {
      skip: !encryptedWoodworkerId || !isServicePackTransaction,
    });

  const { data: servicePackIdData, isLoading: isServicePackIdLoading } =
    useDecryptDataQuery(encryptedServicePackId, {
      skip: !encryptedServicePackId || !isServicePackTransaction,
    });

  useEffect(() => {
    if (isServicePackTransaction) {
      handleServicePackPaymentSuccess();
    } else {
      handleWalletPaymentSuccess();
    }
  }, [
    isServicePackTransaction,
    walletIdData,
    transactionIdData,
    woodworkerIdData,
    servicePackIdData,
    isWalletIdLoading,
    isTransactionIdLoading,
    isWoodworkerIdLoading,
    isServicePackIdLoading,
  ]);

  const handleServicePackPaymentSuccess = async () => {
    if (
      !encryptedWoodworkerId ||
      !encryptedServicePackId ||
      !encryptedTransactionId
    ) {
      setStatus("Thông tin giao dịch không hợp lệ");
      setIsProcessing(false);
      setTimeout(() => {
        navigate(`/ww/profile`);
      }, 1000);
      return;
    }

    if (
      isWoodworkerIdLoading ||
      isServicePackIdLoading ||
      isTransactionIdLoading
    ) {
      setStatus("Đang giải mã thông tin giao dịch...");
      return;
    }

    try {
      setStatus("Đang cập nhật gói dịch vụ...");
      // Call addServicePack to update the service pack
      await addServicePack({
        woodworkerId: parseInt(woodworkerIdData?.data),
        servicePackId: parseInt(servicePackIdData?.data),
      }).unwrap();

      setStatus("Đang cập nhật trạng thái giao dịch...");
      // Update transaction status
      await updateTransactionStatus({
        transactionId: parseInt(transactionIdData?.data),
        status: true,
        canceledAt: null,
      }).unwrap();

      setStatus("Giao dịch hoàn tất!");
      setIsProcessing(false);

      setTimeout(() => {
        navigate(
          `/success?title=Thanh toán thành công&desc=Đăng ký gói dịch vụ đã được thực hiện thành công&path=/ww/profile&buttonText=Xem hồ sơ`
        );
      }, 1000);
    } catch (error) {
      setStatus("Có lỗi xảy ra, vui lòng thử lại sau");
      setIsProcessing(false);
      notify(
        "Cập nhật thất bại",
        error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
      setTimeout(() => {
        navigate(`/ww/profile`);
      }, 1000);
    }
  };

  const handleWalletPaymentSuccess = async () => {
    if (!encryptedWalletId || !encryptedTransactionId || !amount) {
      setStatus("Thông tin giao dịch không hợp lệ");
      setIsProcessing(false);
      setTimeout(() => {
        navigate(`/${auth?.role == "Woodworker" ? "ww" : "cus"}/wallet`);
      }, 1000);
      return;
    }

    if (isWalletIdLoading || isTransactionIdLoading) {
      setStatus("Đang giải mã thông tin giao dịch...");
      return;
    }

    try {
      setStatus("Đang cập nhật số dư ví...");
      // Cập nhật số dư ví
      await updateWallet({
        walletId: parseInt(walletIdData?.data),
        amount: Math.floor(parseInt(amount) / 100),
      }).unwrap();

      setStatus("Đang cập nhật trạng thái giao dịch...");
      // Cập nhật trạng thái giao dịch
      await updateTransactionStatus({
        transactionId: parseInt(transactionIdData?.data),
        status: true,
        canceledAt: null,
      }).unwrap();

      setStatus("Giao dịch hoàn tất!");
      setIsProcessing(false);

      setTimeout(() => {
        navigate(
          `/success?title=Thanh toán thành công&desc=Giao dịch đã được thực hiện thành công&path=/${
            auth?.role == "Woodworker" ? "ww" : "cus"
          }/wallet&buttonText=Xem ví`
        );
      }, 1000);
    } catch (error) {
      setStatus("Có lỗi xảy ra, vui lòng thử lại sau");
      setIsProcessing(false);
      notify(
        "Cập nhật thất bại",
        error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
      setTimeout(() => {
        navigate(`/${auth?.role == "Woodworker" ? "ww" : "cus"}/wallet`);
      }, 1000);
    }
  };

  return (
    <RequireAuth allowedRoles={["Customer", "Woodworker"]}>
      <Container maxW="container.md" py={10}>
        <Center>
          <VStack
            spacing={8}
            p={8}
            bg={bgColor}
            borderRadius="xl"
            boxShadow="lg"
            border="1px"
            borderColor={borderColor}
            w="full"
          >
            <Box
              w="80px"
              h="80px"
              borderRadius="full"
              bg={appColorTheme.brown_2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              {isProcessing ? (
                <Spinner size="xl" color="white" thickness="4px" />
              ) : (
                <FiLoader size={50} color="white" />
              )}
            </Box>

            <Heading
              color={appColorTheme.brown_2}
              fontFamily="Montserrat"
              as="h2"
              fontSize="2xl"
              textAlign="center"
            >
              {status}
            </Heading>

            <Text color="gray.600" textAlign="center" fontSize="md" maxW="md">
              {isProcessing
                ? "Vui lòng đợi trong giây lát, chúng tôi đang xử lý giao dịch của bạn"
                : status == "Giao dịch hoàn tất!"
                ? "Chuyển hướng bạn đến trang thành công..."
                : "Chuyển hướng bạn về trang ví..."}
            </Text>
          </VStack>
        </Center>
      </Container>
    </RequireAuth>
  );
}
