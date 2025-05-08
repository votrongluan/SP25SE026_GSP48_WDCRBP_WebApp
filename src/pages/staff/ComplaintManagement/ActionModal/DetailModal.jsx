import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import { useNotify } from "../../../../components/Utility/Notify";
import { formatPrice } from "../../../../utils/utils";
import {
  useUpdateComplaintStaffMutation,
  useGetServiceOrderComplaintsQuery,
} from "../../../../services/complaintApi";
import useAuth from "../../../../hooks/useAuth";

// Import sub-components
import ServiceInfoSection from "./ServiceInfoSection";
import ProductInfoSection from "./ProductInfoSection";
import ComplaintAccordion from "./ComplaintAccordion";
import StaffResponseSection from "./StaffResponseSection";
import Transaction from "./Transaction";

export default function DetailModal({ complaint, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();
  const initialRef = useRef(null);
  const notify = useNotify();
  const [response, setResponse] = useState(complaint?.staffResponse || "");
  const [refundAmount, setRefundAmount] = useState(
    complaint?.refundAmount || 0
  );
  // New state variables for the updated API
  const [isAccept, setIsAccept] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [refundPercent, setRefundPercent] = useState(50); // Default to 50%

  const [updateComplaintStaff, { isLoading }] =
    useUpdateComplaintStaffMutation();

  // Extract service name and order details
  const serviceName =
    complaint?.serviceOrderDetail?.service?.service?.serviceName;
  const orderDetail = complaint?.serviceOrderDetail;
  const orderId = orderDetail?.orderId;

  // Fetch all complaints for this service order
  const { data: serviceOrderComplaints, isLoading: isLoadingComplaints } =
    useGetServiceOrderComplaintsQuery(
      orderId,
      {
        skip: !isOpen || !orderId,
      },
      {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      }
    );

  // Calculate the total refunded amount and maximum refundable amount
  const [maxRefundableAmount, setMaxRefundableAmount] = useState(0);
  const [totalRefundedAmount, setTotalRefundedAmount] = useState(0);
  const [allOrderComplaints, setAllOrderComplaints] = useState([]);

  useEffect(() => {
    if (serviceOrderComplaints?.data) {
      setAllOrderComplaints(serviceOrderComplaints.data);

      if (orderDetail) {
        // Calculate total refunded amount from other complaints
        const totalRefunded = serviceOrderComplaints.data.reduce(
          (sum, c) => sum + (c.refundAmount || 0),
          0
        );

        // Calculate maximum refundable amount
        const totalOrderAmount = orderDetail.amountPaid || 0;
        const maxRefundable = Math.max(0, totalOrderAmount - totalRefunded);

        setTotalRefundedAmount(totalRefunded);
        setMaxRefundableAmount(maxRefundable);
      }
    }
  }, [serviceOrderComplaints?.data, orderDetail]);

  const handleSubmit = async () => {
    if (!response.trim()) {
      notify("Lỗi", "Vui lòng nhập nội dung phản hồi", "error");
      return;
    }

    // Validate refund amount if accepting the complaint
    if (isAccept && refundAmount > maxRefundableAmount) {
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
      // Updated request body as per new API requirements
      const requestBody = {
        complaintId: complaint.complaintId,
        refundAmount: isAccept ? Number(refundAmount) : 0,
        refundPercent: isAccept ? Number(refundPercent) : 0,
        isAccept,
        staffResponse: response,
        staffUserId: auth?.userId,
        isCancel: isCancel,
      };

      await updateComplaintStaff(requestBody).unwrap();

      notify(
        "Thành công",
        isAccept
          ? "Đã xử lý và Chấp nhận hoàn tiền thành công"
          : "Đã từ chối xử lý khiếu nại",
        "success"
      );

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
            {/* Top section: Service and Product Information side by side */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mb={4}>
              {/* Left side: Service Information */}
              <ServiceInfoSection
                orderDetail={orderDetail}
                serviceName={serviceName}
              />

              {/* Right side: Product Information */}
              <ProductInfoSection
                orderDetail={orderDetail}
                serviceName={serviceName}
              />
            </SimpleGrid>

            <Box mb={4}>
              <Transaction order={complaint?.serviceOrderDetail} />
            </Box>

            {/* All Complaints for this Order */}
            <ComplaintAccordion
              orderDetail={orderDetail}
              allOrderComplaints={allOrderComplaints}
              currentComplaint={complaint}
              isLoadingComplaints={isLoadingComplaints}
            />

            {/* Staff Response Section with new props */}
            <StaffResponseSection
              complaint={complaint}
              orderDetail={orderDetail}
              response={response}
              setResponse={setResponse}
              refundAmount={refundAmount}
              setRefundAmount={setRefundAmount}
              maxRefundableAmount={maxRefundableAmount}
              totalRefundedAmount={totalRefundedAmount}
              isLoading={isLoading}
              isLoadingComplaints={isLoadingComplaints}
              handleSubmit={handleSubmit}
              isAccept={isAccept}
              setIsAccept={setIsAccept}
              refundPercent={refundPercent}
              setRefundPercent={setRefundPercent}
              isCancel={isCancel}
              setIsCancel={setIsCancel}
            />

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
