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
  useToast,
  Badge,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiEye, FiStar, FiCheck, FiX } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import { formatDateTimeString } from "../../../../utils/utils";
import { useUpdateReviewResponseStatusMutation } from "../../../../services/reviewApi";

export default function DetailModal({ review, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const [updateResponseStatus] = useUpdateReviewResponseStatusMutation();

  const handleUpdateStatus = async (status) => {
    try {
      setIsProcessing(true);
      await updateResponseStatus({
        reviewId: review.reviewId,
        status: status,
      }).unwrap();

      toast({
        title: `Đã ${status ? "duyệt" : "từ chối"} phản hồi`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      if (refetch) refetch();
    } catch (error) {
      toast({
        title: `Lỗi khi ${status ? "duyệt" : "từ chối"} phản hồi`,
        description: error.data?.message || "Đã có lỗi xảy ra",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getResponseStatusBadge = () => {
    if (review?.woodworkerResponseStatus === true) {
      return <Badge colorScheme="green">Đã duyệt</Badge>;
    } else if (review?.woodworkerResponseStatus === false) {
      return <Badge colorScheme="red">Từ chối</Badge>;
    }
    return <Badge colorScheme="orange">Chờ duyệt</Badge>;
  };

  const getReviewStatusBadge = () => {
    if (review?.status === true) {
      return <Badge colorScheme="green">Đã duyệt</Badge>;
    } else if (review?.status === false) {
      return <Badge colorScheme="red">Từ chối</Badge>;
    }
    return <Badge colorScheme="orange">Chờ duyệt</Badge>;
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
          <ModalHeader>Chi tiết phản hồi đánh giá</ModalHeader>
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
                      <Text>
                        {review?.woodworker?.brandName || "Không có thông tin"}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Loại đơn:</Text>
                      <Text>
                        {review?.serviceOrderId
                          ? "Đơn thiết kế"
                          : review?.guaranteeOrderId
                          ? "Đơn bảo hành"
                          : "Không xác định"}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Ngày đánh giá:</Text>
                      <Text>{formatDateTimeString(review?.createdAt)}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Trạng thái đánh giá:</Text>
                      {getReviewStatusBadge()}
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Trạng thái phản hồi:</Text>
                      {getResponseStatusBadge()}
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Ngày phản hồi:</Text>
                      <Text>
                        {review?.responseAt
                          ? formatDateTimeString(review.responseAt)
                          : "Chưa có"}
                      </Text>
                    </Box>
                  </Grid>
                </Box>
              </Box>

              {/* Đánh giá nội dung */}
              <Box>
                <Heading size="md" mb={4}>
                  Nội dung đánh giá
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

              <Box>
                <Heading size="md" mb={4}>
                  Phản hồi của xưởng mộc
                </Heading>
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  {review?.woodworkerResponse ? (
                    <Text>{review.woodworkerResponse}</Text>
                  ) : (
                    <Text color="gray.500">Chưa có phản hồi</Text>
                  )}
                </Box>
              </Box>
            </Stack>

            <Divider my={6} />

            <Flex mt={6} justify="flex-end">
              <Button onClick={onClose} mr={3}>
                Đóng
              </Button>

              {review?.woodworkerResponse &&
                review?.woodworkerResponseStatus === null && (
                  <>
                    <Button
                      colorScheme="red"
                      mr={3}
                      onClick={() => handleUpdateStatus(false)}
                      leftIcon={<FiX />}
                      isLoading={isProcessing}
                    >
                      Từ chối phản hồi
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={() => handleUpdateStatus(true)}
                      leftIcon={<FiCheck />}
                      isLoading={isProcessing}
                    >
                      Duyệt phản hồi
                    </Button>
                  </>
                )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
