import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

export default function OrderPaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const notify = useNotify();
  const [updateTransactionStatus] = useUpdateTransactionStatusMutation();
  const [status, setStatus] = useState("Đang xử lý giao dịch...");
  const [isProcessing, setIsProcessing] = useState(true);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Order Payment-specific parameters (lowercase)
  const encryptedTransactionId = searchParams.get("transactionId");
  const encryptedOrderDepositId = searchParams.get("orderDepositId");

  // Decrypt transaction ID
  const { data: transactionIdData, isLoading: isTransactionIdLoading } =
    useDecryptDataQuery(encryptedTransactionId, {
      skip: !encryptedTransactionId,
    });

  // Decrypt order deposit ID
  const { data: orderDepositIdData, isLoading: isOrderDepositIdLoading } =
    useDecryptDataQuery(encryptedOrderDepositId, {
      skip: !encryptedOrderDepositId,
    });

  useEffect(() => {
    handleOrderPaymentSuccess();
  }, [
    transactionIdData,
    orderDepositIdData,
    isTransactionIdLoading,
    isOrderDepositIdLoading,
  ]);

  const handleOrderPaymentSuccess = async () => {
    if (!encryptedTransactionId || !encryptedOrderDepositId) {
      setStatus("Thông tin giao dịch không hợp lệ");
      setIsProcessing(false);
      navigate(`/cus/orders`, { replace: true });

      return;
    }

    if (isTransactionIdLoading || isOrderDepositIdLoading) {
      setStatus("Đang giải mã thông tin giao dịch...");
      return;
    }

    try {
      setStatus("Đang cập nhật trạng thái giao dịch...");
      // Update transaction status
      await updateTransactionStatus({
        transactionId: parseInt(transactionIdData?.data),
        status: true,
      }).unwrap();

      setStatus("Giao dịch hoàn tất!");
      setIsProcessing(false);

      navigate(
        `/success?title=Thanh toán thành công&desc=Thanh toán đặt cọc đã được xử lý thành công`,
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
      navigate(`/cus/service-order`, { replace: true });
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
              : "Chuyển hướng bạn về trang đơn hàng..."}
          </Text>
        </VStack>
      </Center>
    </Container>
  );
}
