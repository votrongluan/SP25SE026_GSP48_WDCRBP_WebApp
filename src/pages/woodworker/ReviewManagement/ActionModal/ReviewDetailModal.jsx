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
import { FiEye, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { appColorTheme } from "../../../../config/appconfig";
import { formatDateTimeString } from "../../../../utils/utils";

export default function ReviewDetailModal({ review, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const navigate = useNavigate();
  const [response, setResponse] = useState(review?.response || "");

  const handleSubmit = () => {
    // TODO: Implement submit response logic
    navigate(
      "/success?title=Phản hồi thành công&desc=Đã gửi phản hồi đánh giá thành công&path=/woodworker/reviews"
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
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">Chi tiết đánh giá</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <Stack gap={5}>
              {/* Thông tin cơ bản */}
              <Box>
                <Heading size="md" mb={4}>
                  Thông tin đánh giá
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                    <Box>
                      <Text fontWeight="bold">Mã đánh giá:</Text>
                      <Text>{review?.reviewId}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Mã đơn hàng:</Text>
                      <Text>{review?.orderId}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Mã khách hàng:</Text>
                      <Text>{review?.userId}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Ngày cập nhật:</Text>
                      <Text>{formatDateTimeString(review?.updatedAt)}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Trạng thái:</Text>
                      <Text
                        color={
                          review?.status === "Chờ phản hồi"
                            ? "red.500"
                            : review?.status === "Đã phản hồi"
                            ? "green.500"
                            : "gray.500"
                        }
                      >
                        {review?.status}
                      </Text>
                    </Box>
                  </Grid>
                </Box>
              </Box>

              {/* Đánh giá và nội dung */}
              <Box>
                <Heading size="md" mb={4}>
                  Đánh giá và nội dung
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  <VStack spacing={4} align="stretch">
                    <HStack spacing={1}>
                      {[...Array(5)].map((_, index) => (
                        <FiStar
                          key={index}
                          color={
                            index < review?.rating
                              ? appColorTheme.brown_2
                              : "#CBD5E0"
                          }
                          size={24}
                        />
                      ))}
                    </HStack>
                    <Text>{review?.comment}</Text>
                  </VStack>
                </Box>
              </Box>

              {/* Phản hồi */}
              <Box>
                <Heading size="md" mb={4}>
                  Phản hồi
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  <VStack spacing={4} align="stretch">
                    <Textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Nhập nội dung phản hồi..."
                      rows={4}
                    />
                    <Text fontSize="sm" color="gray.500">
                      {response.length}/500 ký tự
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
                isDisabled={!response.trim() || response.length > 500}
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
