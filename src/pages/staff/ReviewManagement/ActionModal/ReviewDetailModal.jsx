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
  Tooltip,
  useDisclosure,
  VStack,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiEye, FiStar, FiCheck, FiX } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import { formatDateTimeString } from "../../../../utils/utils";
import { useUpdateReviewStatusMutation } from "../../../../services/reviewApi";
import { useNotify } from "../../../../components/Utility/Notify";

export default function ReviewDetailModal({ review, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const notify = useNotify();
  const [isProcessing, setIsProcessing] = useState(false);

  const [updateReviewStatus] = useUpdateReviewStatusMutation();

  const handleUpdateStatus = async (status) => {
    try {
      setIsProcessing(true);
      await updateReviewStatus({
        reviewId: review.reviewId,
        status: status,
      }).unwrap();

      notify(
        `Đã ${status ? "duyệt" : "từ chối"} đánh giá`,
        "",
        "success",
        3000
      );

      onClose();
      if (refetch) refetch();
    } catch (error) {
      notify(
        `Lỗi khi ${status ? "duyệt" : "từ chối"} đánh giá`,
        error.data?.message || "Đã có lỗi xảy ra",
        "error",
        5000
      );
    } finally {
      setIsProcessing(false);
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
        size="3xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi tiết đánh giá</ModalHeader>
          {!isProcessing && <ModalCloseButton />}
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
                      <Text fontWeight="bold">Khách hàng:</Text>
                      <Text>{review?.username}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Xưởng mộc:</Text>
                      <Link
                        href={`/woodworker/${review?.woodworkerId}`}
                        color={appColorTheme.brown_2}
                        isExternal
                      >
                        <Text>{review?.brandName}</Text>
                      </Link>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Ngày tạo:</Text>
                      <Text>{formatDateTimeString(review?.createdAt)}</Text>
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
                      <Text ml={2} fontWeight="bold">
                        {review?.rating}/5
                      </Text>
                    </HStack>
                    <Text>{review?.comment}</Text>
                  </VStack>
                </Box>
              </Box>

              {review?.woodworkerResponse && (
                <Box>
                  <Heading size="md" mb={4}>
                    Phản hồi của xưởng mộc
                  </Heading>
                  <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                    <Text>{review?.woodworkerResponse}</Text>
                  </Box>
                </Box>
              )}
            </Stack>

            <Flex mt={6} justify="flex-end">
              <Button onClick={onClose} mr={3}>
                Đóng
              </Button>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => handleUpdateStatus(false)}
                leftIcon={<FiX />}
                isLoading={isProcessing}
              >
                Từ chối
              </Button>
              <Button
                colorScheme="green"
                onClick={() => handleUpdateStatus(true)}
                leftIcon={<FiCheck />}
                isLoading={isProcessing}
              >
                Duyệt
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
