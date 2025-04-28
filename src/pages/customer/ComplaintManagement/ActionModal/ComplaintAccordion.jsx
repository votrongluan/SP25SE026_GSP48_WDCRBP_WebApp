import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDateString } from "../../../../utils/utils";
import {
  appColorTheme,
  complaintStatusConstants,
} from "../../../../config/appconfig";
import ImageListSelector from "../../../../components/Utility/ImageListSelector";
import RefundTransactionCard from "../../../staff/ComplaintManagement/ActionModal/RefundTransactionCard";

export default function ComplaintAccordion({
  orderDetail,
  allOrderComplaints,
  currentComplaint,
  isLoadingComplaints,
}) {
  // Helper function to get complaint status display text
  const getComplaintStatusText = (status) => {
    return (
      Object.values(complaintStatusConstants).find((s) => s === status) ||
      status
    );
  };

  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
      <Heading size="md" mb={4}>
        Tất cả khiếu nại của đơn hàng #{orderDetail?.orderId}
      </Heading>

      {isLoadingComplaints ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : allOrderComplaints.length > 0 ? (
        <Accordion
          allowMultiple
          defaultIndex={[
            allOrderComplaints.findIndex(
              (c) => c.complaintId === currentComplaint?.complaintId
            ),
          ]}
        >
          {allOrderComplaints.map((complaintItem) => (
            <AccordionItem
              key={complaintItem.complaintId}
              borderWidth={
                complaintItem.complaintId === currentComplaint?.complaintId
                  ? "2px"
                  : "1px"
              }
              borderColor={
                complaintItem.complaintId === currentComplaint?.complaintId
                  ? appColorTheme.brown_2
                  : "inherit"
              }
              mb={3}
              borderRadius="md"
            >
              <h2>
                <AccordionButton
                  py={3}
                  bg={
                    complaintItem.complaintId === currentComplaint?.complaintId
                      ? "gray.100"
                      : "white"
                  }
                >
                  <Box flex="1" textAlign="left">
                    <HStack spacing={4}>
                      <Badge
                        colorScheme={
                          complaintItem.status ===
                          complaintStatusConstants.COMPLETED
                            ? "green"
                            : complaintItem.status ===
                              complaintStatusConstants.IN_PROGRESS
                            ? "yellow"
                            : complaintItem.status ===
                              complaintStatusConstants.PENDING
                            ? "purple"
                            : "red"
                        }
                        fontSize="sm"
                      >
                        {getComplaintStatusText(complaintItem.status)}
                      </Badge>
                      <Text fontWeight="semibold">
                        Khiếu nại #{complaintItem.complaintId}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {formatDateString(new Date(complaintItem.createdAt))}
                      </Text>
                      {complaintItem.complaintId ===
                        currentComplaint?.complaintId && (
                        <Badge colorScheme="purple">Đang xem</Badge>
                      )}
                    </HStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg="white">
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      Khiếu nại được tạo khi đơn hàng ở trạng thái:
                    </Text>
                    <Text>{complaintItem?.orderStatus}</Text>
                  </Box>

                  {/* Complaint Type */}
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      Loại khiếu nại:
                    </Text>
                    <Text>{complaintItem.complaintType}</Text>
                  </Box>

                  {/* Complaint Content */}
                  <Box>
                    <Text fontWeight="bold" mb={1}>
                      Nội dung khiếu nại:
                    </Text>
                    <Text whiteSpace="pre-wrap">
                      {complaintItem.description}
                    </Text>
                  </Box>

                  {/* Proof Images */}
                  {complaintItem.proofImgUrls &&
                    complaintItem.proofImgUrls.length > 0 && (
                      <Box>
                        <Text fontWeight="bold" mb={2}>
                          Hình ảnh minh chứng:
                        </Text>
                        <ImageListSelector
                          imgH={150}
                          imgUrls={complaintItem.proofImgUrls}
                        />
                      </Box>
                    )}

                  {/* Woodworker Response */}
                  {complaintItem.woodworkerResponse && (
                    <Box p={3} bg="gray.50" borderRadius="md">
                      <Text fontWeight="bold" mb={1}>
                        Phản hồi từ xưởng mộc:
                      </Text>
                      <Text whiteSpace="pre-wrap">
                        {complaintItem.woodworkerResponse}
                      </Text>
                    </Box>
                  )}

                  {/* Staff Response */}
                  {complaintItem.staffResponse && (
                    <Box p={3} bg="blue.50" borderRadius="md">
                      <Text fontWeight="bold" mb={1}>
                        Phản hồi từ nhân viên:
                      </Text>
                      <Text whiteSpace="pre-wrap">
                        {complaintItem.staffResponse}
                      </Text>

                      {/* Staff Member */}
                      {complaintItem.staffUser && (
                        <HStack mt={3}>
                          <Text fontWeight="bold">Nhân viên xử lý:</Text>
                          <Text>{complaintItem.staffUser.username}</Text>
                          <Text ml={4} fontWeight="bold">
                            SĐT:
                          </Text>
                          <Text>{complaintItem.staffUser.phone}</Text>
                        </HStack>
                      )}
                    </Box>
                  )}

                  {/* Refund Information */}
                  <RefundTransactionCard complaintItem={complaintItem} />
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Text>Không có khiếu nại nào cho đơn hàng này</Text>
      )}
    </Box>
  );
}
