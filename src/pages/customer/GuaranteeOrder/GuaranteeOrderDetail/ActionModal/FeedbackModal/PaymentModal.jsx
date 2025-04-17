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
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNotify } from "../../../../../../components/Utility/Notify";
import { FiCheck, FiCreditCard, FiXCircle } from "react-icons/fi";
import CheckboxList from "../../../../../../components/Utility/CheckboxList";
import {
  appColorTheme,
  guaranteeOrderStatusConstants,
  transactionTypeConstants,
} from "../../../../../../config/appconfig";
import { formatPrice } from "../../../../../../utils/utils";
import useAuth from "../../../../../../hooks/useAuth";
import { useOrderPaymentMutation } from "../../../../../../services/walletApi";
import { useCreatePaymentMutation } from "../../../../../../services/paymentApi";
import { useNavigate } from "react-router-dom";
import {
  useGetShipmentsByGuaranteeOrderIdQuery,
  useUpdateGuaranteeOrderShipmentOrderCodeMutation,
} from "../../../../../../services/shipmentApi";
import { useCreateShipmentForServiceOrderMutation } from "../../../../../../services/ghnApi";

export default function PaymentModal({ deposit, order, refetch, buttonText }) {
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
  const [processingShipment, setProcessingShipment] = useState(false);

  // Shipment related API hooks
  const { data: shipmentData, isLoading: loadingShipment } =
    useGetShipmentsByGuaranteeOrderIdQuery(order?.guaranteeOrderId, {
      skip: !isOpen,
    });
  const [createShipment, { isLoading: creatingShipment }] =
    useCreateShipmentForServiceOrderMutation();
  const [updateShipmentOrderCode, { isLoading: updatingShipment }] =
    useUpdateGuaranteeOrderShipmentOrderCodeMutation();

  const isLoading =
    isWalletLoading ||
    isGatewayLoading ||
    loadingShipment ||
    creatingShipment ||
    updatingShipment ||
    processingShipment;

  const checkboxItems = [
    {
      description: "Tôi đã kiểm tra thông tin và xác nhận thao tác",
      isOptional: false,
    },
  ];

  // Helper function to extract dimensions from product configuration
  const extractDimensions = (product) => {
    try {
      if (product.designIdeaVariantDetail?.designIdeaVariantConfig) {
        const config = product.designIdeaVariantDetail.designIdeaVariantConfig;
        const dimensionStr = config[0]?.designVariantValues[0]?.value;

        if (dimensionStr) {
          const dimensions = dimensionStr
            .split("x")
            .map((dim) => parseFloat(dim.trim()));

          if (dimensions.length === 3) {
            return {
              length: dimensions[0] || 20,
              width: dimensions[1] || 20,
              height: dimensions[2] || 20,
            };
          }
        }
      } else if (product.personalProductDetail) {
        const techSpecs = product.personalProductDetail.techSpecList;
        return {
          length:
            parseFloat(
              techSpecs.find((item) => item.name === "Chiều dài")?.value
            ) || 20,
          width:
            parseFloat(
              techSpecs.find((item) => item.name === "Chiều rộng")?.value
            ) || 20,
          height:
            parseFloat(
              techSpecs.find((item) => item.name === "Chiều cao")?.value
            ) || 20,
        };
      }
      return { length: 20, width: 20, height: 20 };
    } catch (error) {
      console.error("Error extracting dimensions:", error);
      return { length: 20, width: 20, height: 20 };
    }
  };

  // Process GHN shipment creation
  const processShipment = async () => {
    if (
      order?.status !== guaranteeOrderStatusConstants.DA_DUYET_BAO_GIA ||
      !shipmentData?.data?.length
    ) {
      return true; // No need to create shipment
    }

    try {
      setProcessingShipment(true);

      const shipment = shipmentData.data[0];
      const products = [
        order?.serviceOrderDetail?.requestedProduct.find(
          (item) =>
            item.requestedProductId ==
            order?.requestedProduct?.requestedProductId
        ),
      ];

      // Prepare items for GHN API
      const items = products.map((product) => {
        const dimensions = extractDimensions(product);
        return {
          name:
            product.designIdeaVariantDetail?.name ||
            product.category?.categoryName ||
            "Sản phẩm sửa chữa",
          quantity: 1,
          length: dimensions.length,
          width: dimensions.width,
          height: dimensions.height,
          weight: 0,
        };
      });

      // Create GHN shipment request
      const requestData = {
        payment_type_id: 1,
        required_note: "WAIT",
        from_name: order?.user?.name,
        from_phone: order?.user?.phone,
        from_address: shipment.fromAddress,
        from_ward_name: shipment.fromAddress?.split(",")[1]?.trim() || "N/A",
        from_district_name:
          shipment.fromAddress?.split(",")[2]?.trim() || "N/A",
        from_province_name:
          shipment.fromAddress?.split(",")[3]?.trim() || "N/A",
        to_phone: order?.woodworkerUser?.phone,
        to_name: order?.woodworkerUser?.username,
        to_address: shipment.toAddress,
        to_ward_code: shipment.toWardCode,
        to_district_id: shipment.toDistrictId,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        service_type_id: shipment.ghnServiceTypeId || 5,
        items: items,
      };

      // Call GHN API to create shipment
      const response = await createShipment({
        serviceOrderId: order.guaranteeOrderId, // Using guaranteeOrderId here
        data: requestData,
      }).unwrap();

      // Get order code from response
      const orderCode = response.data.data.order_code;

      // Update shipment with order code
      await updateShipmentOrderCode({
        guaranteeOrderId: order.guaranteeOrderId,
        orderCode: orderCode,
        type: "Lấy", // Fixed value as specified
      }).unwrap();

      notify(
        "Thành công",
        "Đã tạo vận đơn thành công với mã: " + orderCode,
        "info"
      );

      return true;
    } catch (error) {
      notify(
        "Lỗi vận chuyển",
        error.data?.message || error.message || "Không thể tạo vận đơn",
        "error"
      );
      return false;
    } finally {
      setProcessingShipment(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Check if we need to create a shipment first
      if (order?.status === "Đã duyệt báo giá") {
        const shipmentCreated = await processShipment();
        if (!shipmentCreated) return; // Stop payment if shipment creation failed
      }

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
          `/success?title=Thanh toán thành công&desc=Bạn đã thanh toán cho đơn hàng thành công&path=/cus/guarantee-order/${order.guaranteeOrderId}&buttonText=Xem đơn hàng`,
          { replace: true }
        );

        onClose();
        refetch(); // Refresh data
      } else {
        postData.transactionType = transactionTypeConstants.THANH_TOAN_QUA_CONG;
        const response = await createPayment(postData).unwrap();

        onClose();

        window.location.href = response.data.url;
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
        {buttonText ? buttonText : `Thanh toán lần #${deposit.depositNumber}`}
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
            {processingShipment ? (
              <Center py={8} flexDirection="column">
                <Spinner size="xl" color={appColorTheme.brown_2} mb={4} />
                <Text>Đang xử lý vận đơn...</Text>
              </Center>
            ) : (
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
                      <Text>#{order.guaranteeOrderId}</Text>
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

                    {order?.status ==
                      guaranteeOrderStatusConstants.DA_DUYET_BAO_GIA && (
                      <>
                        <GridItem>
                          <Text fontWeight="semibold">Lưu ý:</Text>
                        </GridItem>
                        <GridItem>
                          <Text color="blue.600">
                            Vận đơn GHN sẽ được tạo khi bạn thanh toán
                          </Text>
                        </GridItem>
                      </>
                    )}
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
            )}
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
                processingShipment
                  ? "Đang xử lý vận đơn"
                  : paymentMethod === "wallet"
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
