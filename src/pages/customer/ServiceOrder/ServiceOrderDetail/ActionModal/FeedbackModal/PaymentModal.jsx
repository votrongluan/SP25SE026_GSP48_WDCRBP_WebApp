import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Divider,
  useDisclosure,
  Box,
  Grid,
  GridItem,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNotify } from "../../../../../../components/Utility/Notify";
import { FiCheck, FiCreditCard, FiXCircle } from "react-icons/fi";
import CheckboxList from "../../../../../../components/Utility/CheckboxList";
import {
  appColorTheme,
  transactionTypeConstants,
} from "../../../../../../config/appconfig";
import { formatPrice } from "../../../../../../utils/utils";
import useAuth from "../../../../../../hooks/useAuth";
import { useOrderPaymentMutation } from "../../../../../../services/walletApi";
import { useCreatePaymentMutation } from "../../../../../../services/paymentApi";
import { useNavigate } from "react-router-dom";

export default function PaymentModal({ deposit, order, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notify = useNotify();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [orderPayment, { isLoading: isWalletLoading }] =
    useOrderPaymentMutation();
  const [createPayment, { isLoading: isGatewayLoading }] =
    useCreatePaymentMutation();
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("wallet"); // wallet or gateway

  const isLoading = isWalletLoading || isGatewayLoading;

  const checkboxItems = [
    {
      description: "Tôi đã kiểm tra thông tin và xác nhận thao tác",
      isOptional: false,
    },
  ];

  console.log(deposit);

  const handleSubmit = async () => {
    try {
      const postData = {
        userId: auth.userId,
        orderDepositId: deposit?.orderDepositId,
        transactionType: "",
        email: auth.sub,
        returnUrl: `${window.location.origin}/payment-success`,
      };

      if (paymentMethod === "wallet") {
        // Using wallet for payment
        postData.transactionType = transactionTypeConstants.THANH_TOAN_BANG_VI;
        await orderPayment(postData).unwrap();

        navigate(
          `/success?title=Thanh toán thành công&desc=Bạn đã thanh toán cho đơn hàng thành công&path=/cus/service-order/${order.orderId}&buttonText=Xem đơn hàng`,
          { replace: true }
        );

        onClose();
        refetch(); // Refresh data
      } else {
        // Using payment gateway
        postData.transactionType = transactionTypeConstants.THANH_TOAN_QUA_CONG;
        const response = await createPayment(postData).unwrap();

        onClose();
        // Redirect to payment gateway
        window.location.href = response.url;
      }
    } catch (err) {
      notify(
        "Thanh toán thất bại",
        err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <>
      <Button leftIcon={<FiCreditCard />} colorScheme="blue" onClick={onOpen}>
        Thanh toán đặt cọc #{deposit.depositNumber}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={isLoading ? null : onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanh toán đặt cọc</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Text fontSize="lg" fontWeight="bold">
                Chi tiết đặt cọc
              </Text>

              <Box p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                <Grid templateColumns="150px 1fr" gap={3}>
                  <GridItem>
                    <Text fontWeight="semibold">Mã đơn dịch vụ:</Text>
                  </GridItem>
                  <GridItem>
                    <Text>#{order.orderId}</Text>
                  </GridItem>

                  <GridItem>
                    <Text fontWeight="semibold">Đặt cọc lần:</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{deposit.depositNumber}</Text>
                  </GridItem>

                  <GridItem>
                    <Text fontWeight="semibold">Phần trăm:</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{deposit.percent}%</Text>
                  </GridItem>

                  <GridItem>
                    <Text fontWeight="semibold">Số tiền:</Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" color={appColorTheme.brown_2}>
                      {formatPrice(deposit.amount)}
                    </Text>
                  </GridItem>
                </Grid>
              </Box>

              <Box p={4}>
                <Text fontSize="md" fontWeight="bold" mb={3}>
                  Chọn phương thức thanh toán:
                </Text>
                <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                  <Stack spacing={4}>
                    <Radio value="wallet">Thanh toán bằng ví</Radio>
                    <Radio value="gateway">
                      Thanh toán qua cổng thanh toán
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>

              <Divider my={2} />
              <CheckboxList
                items={checkboxItems}
                setButtonDisabled={setIsCheckboxDisabled}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              variant="ghost"
              mr={3}
              onClick={onClose}
              leftIcon={<FiXCircle />}
              isDisabled={isLoading}
            >
              Đóng
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isLoading}
              isDisabled={isCheckboxDisabled}
              leftIcon={<FiCheck />}
              loadingText={
                paymentMethod === "wallet"
                  ? "Đang xử lý thanh toán"
                  : "Đang chuyển hướng"
              }
            >
              Thanh toán
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
