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
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { FiEye, FiSend } from "react-icons/fi";
import {
  appColorTheme,
  complaintStatusConstants,
} from "../../../../config/appconfig";

import { useNotify } from "../../../../components/Utility/Notify";
import {
  useUpdateComplaintWoodworkerMutation,
  useGetServiceOrderComplaintsQuery,
} from "../../../../services/complaintApi";

// Import components similar to staff modal
import ServiceInfoSection from "../../../customer/ComplaintManagement/ActionModal/ServiceInfoSection";
import ProductInfoSection from "../../../customer/ComplaintManagement/ActionModal/ProductInfoSection";
import Transaction from "../../../customer/ComplaintManagement/ActionModal/Transaction";
import ComplaintAccordion from "../../../customer/ComplaintManagement/ActionModal/ComplaintAccordion";

export default function ComplaintDetailModal({ complaint, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const notify = useNotify();
  const [response, setResponse] = useState(complaint?.woodworkerResponse || "");
  const [updateComplaintWoodworker, { isLoading }] =
    useUpdateComplaintWoodworkerMutation();

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

  // State to store all complaints for this order
  const [allOrderComplaints, setAllOrderComplaints] = useState([]);

  useEffect(() => {
    if (serviceOrderComplaints?.data) {
      setAllOrderComplaints(serviceOrderComplaints.data);
    }
  }, [serviceOrderComplaints?.data]);

  const handleSubmit = async () => {
    if (!response.trim()) {
      notify("Lỗi", "Vui lòng nhập nội dung phản hồi", "error");
      return;
    }

    try {
      const requestBody = {
        complaintId: complaint.complaintId,
        woodworkerResponse: response,
      };

      await updateComplaintWoodworker(requestBody).unwrap();

      notify("Thành công", "Đã gửi phản hồi khiếu nại thành công", "success");

      onClose();
      refetch && refetch();
    } catch (error) {
      notify(
        "Lỗi",
        error.data?.message || "Không thể gửi phản hồi khiếu nại",
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

            {/* Transaction Information */}
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

            {/* Response Section */}
            {complaint?.status == complaintStatusConstants.PENDING && (
              <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
                <Text fontWeight="bold" fontSize="lg" mb={4}>
                  Phản hồi của bạn
                </Text>
                <VStack spacing={4} align="stretch">
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Nhập nội dung phản hồi của bạn đối với khiếu nại này..."
                    rows={6}
                    isDisabled={
                      complaint?.status != complaintStatusConstants.PENDING ||
                      isLoading
                    }
                  />
                  <HStack justify="space-between">
                    {complaint?.status == complaintStatusConstants.PENDING && (
                      <Button
                        leftIcon={<FiSend />}
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        isDisabled={!response.trim() || response.length > 1000}
                      >
                        Gửi phản hồi
                      </Button>
                    )}
                  </HStack>
                </VStack>
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
