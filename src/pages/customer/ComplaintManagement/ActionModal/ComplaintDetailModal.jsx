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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";

import { useGetServiceOrderComplaintsQuery } from "../../../../services/complaintApi";

// Import components similar to staff modal
import ServiceInfoSection from "./ServiceInfoSection";
import ProductInfoSection from "./ProductInfoSection";
import Transaction from "./Transaction";
import RefundTransactionCard from "./RefundTransactionCard";
import ComplaintAccordion from "./ComplaintAccordion";

export default function ComplaintDetailModal({ complaint }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

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

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
