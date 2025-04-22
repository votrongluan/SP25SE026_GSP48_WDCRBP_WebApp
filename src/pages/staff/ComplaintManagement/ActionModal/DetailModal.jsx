import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
  Divider,
  Link,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { FiEye, FiSend } from "react-icons/fi";
import {
  appColorTheme,
  getComplaintStatusColor,
  getServiceTypeLabel,
} from "../../../../config/appconfig";
import {
  formatDateString,
  formatDateTimeString,
  formatPrice,
} from "../../../../utils/utils";
import { useNotify } from "../../../../components/Utility/Notify";
import {
  useUpdateComplaintStaffMutation,
  useGetServiceOrderComplaintsQuery,
} from "../../../../services/complaintApi";
import ImageListSelector from "../../../../components/Utility/ImageListSelector";
import PersonalizationProductList from "../../../customer/ServiceOrder/ServiceOrderDetail/Tab/PersonalizationProductList";
import CustomizationProductList from "../../../customer/ServiceOrder/ServiceOrderDetail/Tab/CustomizationProductList";
import SaleProductList from "../../../customer/ServiceOrder/ServiceOrderDetail/Tab/SaleProductList";
import useAuth from "../../../../hooks/useAuth";

export default function DetailModal({ complaint, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();
  const initialRef = useRef(null);
  const notify = useNotify();
  const [response, setResponse] = useState(complaint?.staffResponse || "");
  const [refundAmount, setRefundAmount] = useState(
    complaint?.refundAmount || 0
  );
  const [updateComplaintStaff, { isLoading }] =
    useUpdateComplaintStaffMutation();

  // Extract service name and order details
  const serviceName =
    complaint?.serviceOrderDetail?.service?.service?.serviceName;
  const orderDetail = complaint?.serviceOrderDetail;
  const orderId = orderDetail?.orderId;

  // Fetch all complaints for this service order
  const { data: serviceOrderComplaints, isLoading: isLoadingComplaints } =
    useGetServiceOrderComplaintsQuery(orderId, {
      skip: !isOpen || !orderId,
    });

  // Calculate the total refunded amount and maximum refundable amount
  const [maxRefundableAmount, setMaxRefundableAmount] = useState(0);
  const [totalRefundedAmount, setTotalRefundedAmount] = useState(0);

  useEffect(() => {
    if (serviceOrderComplaints?.data && orderDetail) {
      // Calculate total refunded amount from other complaints
      const totalRefunded = serviceOrderComplaints.data
        .filter((c) => c.complaintId !== complaint.complaintId) // exclude current complaint
        .reduce((sum, c) => sum + (c.refundAmount || 0), 0);

      // Calculate maximum refundable amount
      const totalOrderAmount = orderDetail.amountPaid || 0;
      const maxRefundable = Math.max(0, totalOrderAmount - totalRefunded);

      setTotalRefundedAmount(totalRefunded);
      setMaxRefundableAmount(maxRefundable);
    }
  }, [serviceOrderComplaints, orderDetail, complaint]);

  const handleSubmit = async () => {
    if (!response.trim()) {
      notify("Lỗi", "Vui lòng nhập nội dung phản hồi", "error");
      return;
    }

    // Validate refund amount
    if (Number(refundAmount) > maxRefundableAmount) {
      notify(
        "Lỗi",
        `Số tiền hoàn trả không thể vượt quá ${formatPrice(
          maxRefundableAmount
        )}`,
        "error"
      );
      return;
    }

    try {
      const requestBody = {
        complaintId: complaint.complaintId,
        refundAmount: Number(refundAmount),
        staffResponse: response,
        staffUserId: auth?.userId,
      };

      await updateComplaintStaff(requestBody).unwrap();

      notify("Thành công", "Đã xử lý khiếu nại thành công", "success");

      onClose();
      refetch && refetch();
    } catch (error) {
      notify(
        "Lỗi",
        error.data?.message || "Không thể xử lý khiếu nại",
        "error"
      );
    }
  };

  return (
    <>
      <Tooltip label="Chi tiết" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.brown_2}
          bg="none"
          border={`1px solid ${appColorTheme.brown_2}`}
          _hover={{ bg: appColorTheme.brown_2, color: "white" }}
          onClick={onOpen}
        >
          <FiEye />
        </Button>
      </Tooltip>

      <Modal
        size="6xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Chi tiết khiếu nại #{complaint?.complaintId}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            {/* Complaint Information */}
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Left side: Complaint details */}
                <Box>
                  <Heading size="md" mb={4}>
                    Thông tin khiếu nại
                  </Heading>
                  <Grid templateColumns="150px 1fr" gap={3}>
                    <GridItem>
                      <Text fontWeight="bold">Mã khiếu nại:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>#{complaint?.complaintId}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Loại khiếu nại:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{complaint?.complaintType}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Ngày tạo:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>
                        {formatDateTimeString(new Date(complaint?.createdAt))}
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Trạng thái:</Text>
                    </GridItem>
                    <GridItem>
                      <Text
                        fontWeight="semibold"
                        color={getComplaintStatusColor(complaint?.status)}
                      >
                        {complaint?.status}
                      </Text>
                    </GridItem>

                    {complaint?.staffUser && (
                      <>
                        <GridItem>
                          <Text fontWeight="bold">Nhân viên xử lý:</Text>
                        </GridItem>
                        <GridItem>
                          <Text>{complaint?.staffUser?.username}</Text>
                        </GridItem>
                      </>
                    )}
                  </Grid>
                </Box>

                {/* Right side: Service Information */}
                <Box>
                  <Heading size="md" mb={4}>
                    Thông tin dịch vụ
                  </Heading>
                  <Grid templateColumns="150px 1fr" gap={3}>
                    <GridItem>
                      <Text fontWeight="bold">Mã đơn hàng:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>#{orderDetail?.orderId}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Loại dịch vụ:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{getServiceTypeLabel(serviceName)}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Ngày cam kết hoàn thành:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>
                        {orderDetail?.completeDate
                          ? formatDateString(orderDetail?.completeDate)
                          : "Chưa cập nhật"}
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Tổng tiền đã thanh toán:</Text>
                    </GridItem>
                    <GridItem>
                      <Text color={appColorTheme.brown_2}>
                        {formatPrice(orderDetail?.amountPaid)}
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Khách hàng:</Text>
                    </GridItem>
                    <GridItem>
                      <Text>{orderDetail?.user?.username || "N/A"}</Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">Xưởng mộc:</Text>
                    </GridItem>
                    <GridItem>
                      <Link
                        color={appColorTheme.brown_2}
                        isExternal
                        href={`/woodworker/${orderDetail?.service?.wwDto?.woodworkerId}`}
                      >
                        <Text>{orderDetail?.service?.wwDto?.brandName}</Text>
                      </Link>
                    </GridItem>
                  </Grid>
                </Box>
              </SimpleGrid>
            </Box>

            {/* Product Information - Using the components from GeneralInformationTab */}
            {serviceName && (
              <Box mb={4}>
                {serviceName === "Personalization" && (
                  <PersonalizationProductList
                    orderId={orderDetail?.orderId}
                    products={orderDetail?.requestedProduct}
                    totalAmount={orderDetail?.totalAmount}
                  />
                )}

                {serviceName === "Customization" && (
                  <CustomizationProductList
                    shipFee={orderDetail?.shipFee}
                    products={orderDetail?.requestedProduct}
                    totalAmount={orderDetail?.totalAmount}
                  />
                )}

                {serviceName === "Sale" && (
                  <SaleProductList
                    shipFee={orderDetail?.shipFee}
                    products={orderDetail?.requestedProduct}
                    totalAmount={orderDetail?.totalAmount}
                  />
                )}
              </Box>
            )}

            {/* Complaint Description and Images */}
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
              <Heading size="md" mb={4}>
                Nội dung khiếu nại
              </Heading>
              <Text whiteSpace="pre-wrap">{complaint?.description}</Text>

              {complaint?.proofImgUrls && (
                <Box mt={4}>
                  <Text fontWeight="bold" mb={2}>
                    Hình ảnh minh chứng:
                  </Text>
                  <ImageListSelector
                    imgH={150}
                    imgUrls={complaint.proofImgUrls}
                  />
                </Box>
              )}
            </Box>

            {/* Woodworker Response (if exists) */}
            {complaint?.woodworkerResponse && (
              <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
                <Heading size="md" mb={4}>
                  Phản hồi từ xưởng mộc
                </Heading>
                <Text whiteSpace="pre-wrap">
                  {complaint?.woodworkerResponse}
                </Text>
              </Box>
            )}

            {/* Staff Response Section */}
            {!complaint?.staffResponse && (
              <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
                <Heading size="md" mb={4}>
                  Phản hồi của nhân viên
                </Heading>

                {/* Display refund information */}
                <Box mb={4} p={3} bg="gray.50" borderRadius="md">
                  <Heading size="sm" mb={3}>
                    Thông tin hoàn tiền cho đơn hàng #{orderDetail?.orderId}
                  </Heading>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <GridItem>
                      <Text fontWeight="bold">Tổng tiền đã thanh toán:</Text>
                      <Text fontSize="xl" color={appColorTheme.brown_2}>
                        {formatPrice(orderDetail?.amountPaid || 0)}
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text fontWeight="bold">
                        Đã hoàn trả (các khiếu nại khác):
                      </Text>
                      <Text fontSize="xl" color="orange.500">
                        {isLoadingComplaints
                          ? "Đang tải..."
                          : formatPrice(totalRefundedAmount)}
                      </Text>
                    </GridItem>

                    <GridItem colSpan={2}>
                      <Divider my={2} />
                      <Text fontWeight="bold">
                        Số tiền có thể hoàn trả tối đa:
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color="green.500">
                        {isLoadingComplaints
                          ? "Đang tính toán..."
                          : formatPrice(maxRefundableAmount)}
                      </Text>
                    </GridItem>
                  </Grid>
                </Box>

                <VStack spacing={4} align="stretch">
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Nhập nội dung phản hồi đối với khiếu nại này..."
                    rows={6}
                    isDisabled={complaint?.staffResponse || isLoading}
                  />

                  <FormControl>
                    <FormLabel>Số tiền hoàn trả (nếu có)</FormLabel>
                    <HStack>
                      <Text flex="1" as="b" color={appColorTheme.brown_2}>
                        {formatPrice(refundAmount)}
                      </Text>

                      <NumberInput
                        flex="1"
                        value={refundAmount}
                        onChange={(value) => setRefundAmount(value)}
                        min={0}
                        max={maxRefundableAmount}
                        isDisabled={
                          complaint?.refundAmount > 0 ||
                          isLoading ||
                          isLoadingComplaints
                        }
                      >
                        <NumberInputField placeholder="Nhập số tiền hoàn trả" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Tối đa:{" "}
                      {isLoadingComplaints
                        ? "Đang tính toán..."
                        : formatPrice(maxRefundableAmount)}
                    </Text>
                  </FormControl>

                  <HStack justify="space-between">
                    <Button
                      leftIcon={<FiSend />}
                      colorScheme="green"
                      onClick={handleSubmit}
                      isLoading={isLoading}
                      isDisabled={
                        !response.trim() ||
                        response.length > 1000 ||
                        isLoadingComplaints
                      }
                    >
                      Xác nhận và Gửi phản hồi
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            )}

            {/* Refund Information (if exists) */}
            {complaint?.refundAmount > 0 && (
              <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
                <Heading size="md" mb={4}>
                  Thông tin hoàn tiền
                </Heading>
                <Grid templateColumns="150px 1fr" gap={3}>
                  <GridItem>
                    <Text fontWeight="bold">Số tiền hoàn:</Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="semibold" color="green.500">
                      {formatPrice(complaint?.refundAmount)}
                    </Text>
                  </GridItem>

                  <GridItem>
                    <Text fontWeight="bold">Ngày hoàn tiền:</Text>
                  </GridItem>
                  <GridItem>
                    <Text>
                      {complaint?.refundCreditTransaction?.createdAt
                        ? formatDateTimeString(
                            new Date(
                              complaint?.refundCreditTransaction?.createdAt
                            )
                          )
                        : "Chưa cập nhật"}
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
            )}

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
