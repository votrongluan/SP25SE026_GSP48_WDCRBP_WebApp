import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

export default function BuyPackSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const notify = useNotify();
  const [updateTransactionStatus] = useUpdateTransactionStatusMutation();
  const [addServicePack] = useAddServicePackMutation();
  const [status, setStatus] = useState("Đang xử lý giao dịch...");
  const [isProcessing, setIsProcessing] = useState(true);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Service Pack-specific parameters
  const encryptedTransactionId = searchParams.get("TransactionId");
  const encryptedWoodworkerId = searchParams.get("WoodworkerId");
  const encryptedServicePackId = searchParams.get("ServicePackId");

  // Decrypt transaction ID
  const { data: transactionIdData, isLoading: isTransactionIdLoading } =
    useDecryptDataQuery(encryptedTransactionId, {
      skip: !encryptedTransactionId,
    });

  // Decrypt service pack data
  const { data: woodworkerIdData, isLoading: isWoodworkerIdLoading } =
    useDecryptDataQuery(encryptedWoodworkerId, {
      skip: !encryptedWoodworkerId,
    });

  const { data: servicePackIdData, isLoading: isServicePackIdLoading } =
    useDecryptDataQuery(encryptedServicePackId, {
      skip: !encryptedServicePackId,
    });

  useEffect(() => {
    handleServicePackPaymentSuccess();
  }, [
    transactionIdData,
    woodworkerIdData,
    servicePackIdData,
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
      navigate(`/ww/profile`, { replace: true });
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
      }).unwrap();

      setStatus("Giao dịch hoàn tất!");
      setIsProcessing(false);

      navigate(
        `/success?title=Thanh toán thành công&desc=Đăng ký gói dịch vụ đã được thực hiện thành công&path=/ww/profile&buttonText=Xem hồ sơ`,
        { replace: true }
      );
    } catch (error) {
      setStatus("Có lỗi xảy ra, vui lòng thử lại sau");
      setIsProcessing(false);
      notify(
        "Cập nhật thất bại",
        error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
      navigate(`/ww/profile`, { replace: true });
    }
  };

  return (
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
              : "Chuyển hướng bạn về trang hồ sơ..."}
          </Text>
        </VStack>
      </Center>
    </Container>
  );
}
