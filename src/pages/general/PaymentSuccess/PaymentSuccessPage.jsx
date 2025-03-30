import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateWalletMutation } from "../../../services/walletApi";
import { useUpdateTransactionStatusMutation } from "../../../services/transactionApi";
import { useDecryptDataQuery } from "../../../services/decryptApi";
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
  const [status, setStatus] = useState("Đang xử lý giao dịch...");
  const [isProcessing, setIsProcessing] = useState(true);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Lấy các tham số từ URL
  const encryptedWalletId = searchParams.get("WalletId");
  const encryptedTransactionId = searchParams.get("TransactionId");
  const amount = searchParams.get("vnp_Amount");

  // Sử dụng query hook để giải mã
  const { data: walletIdData, isLoading: isWalletIdLoading } =
    useDecryptDataQuery(encryptedWalletId, { skip: !encryptedWalletId });
  const { data: transactionIdData, isLoading: isTransactionIdLoading } =
    useDecryptDataQuery(encryptedTransactionId, {
      skip: !encryptedTransactionId,
    });

  useEffect(() => {
    const handlePaymentSuccess = async () => {
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
          amount: parseInt(amount),
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

        // Đợi 2 giây để người dùng thấy thông báo thành công
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

    handlePaymentSuccess();
  }, [
    walletIdData,
    transactionIdData,
    isWalletIdLoading,
    isTransactionIdLoading,
  ]);

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
              w="100px"
              h="100px"
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
