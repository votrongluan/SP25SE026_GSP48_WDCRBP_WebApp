import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { appColorTheme } from "../../../../config/appconfig";
import { convertTimeStampToDateTimeString } from "../../../../utils/utils";

export default function ComplaintDetailModal({ complaint, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState(complaint?.explanation || "");

  const handleSubmit = () => {
    // TODO: Implement submit explanation logic
    navigate(
      "/success?title=Phản hồi thành công&desc=Đã gửi phản hồi khiếu nại thành công&path=/woodworker/complaints"
    );
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
        size="4xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">Chi tiết khiếu nại</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <Stack gap={6}>
              {/* Thông tin cơ bản */}
              <Box>
                <Heading size="md" mb={4}>
                  Thông tin khiếu nại
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="sm">
                  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    <Box>
                      <Text fontWeight="bold">Mã khiếu nại:</Text>
                      <Text>{complaint?.complaintId}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Mã đơn hàng:</Text>
                      <Text>{complaint?.orderId}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Mã khách hàng:</Text>
                      <Text>{complaint?.userId}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Ngày tạo:</Text>
                      <Text>
                        {convertTimeStampToDateTimeString(complaint?.createdAt)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Trạng thái:</Text>
                      <Text
                        color={
                          complaint?.status === "Chờ phản hồi"
                            ? "red.500"
                            : complaint?.status === "Đã phản hồi"
                            ? "green.500"
                            : "gray.500"
                        }
                      >
                        {complaint?.status}
                      </Text>
                    </Box>
                  </Grid>
                </Box>
              </Box>

              {/* Nội dung khiếu nại */}
              <Box>
                <Heading size="md" mb={4}>
                  Nội dung khiếu nại
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="sm">
                  <Text>{complaint?.description}</Text>
                </Box>
              </Box>

              {/* Phản hồi */}
              <Box>
                <Heading size="md" mb={4}>
                  Phản hồi
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="sm">
                  <VStack spacing={4} align="stretch">
                    <Textarea
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Nhập nội dung phản hồi..."
                      rows={4}
                    />
                    <Text fontSize="sm" color="gray.500">
                      {explanation.length}/500 ký tự
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </Stack>

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isDisabled={!explanation.trim() || explanation.length > 500}
              >
                Gửi phản hồi
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
