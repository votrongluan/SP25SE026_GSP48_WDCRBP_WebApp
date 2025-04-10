import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Badge,
  Alert,
  AlertIcon,
  Divider,
  Center,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import { FiImage, FiUpload, FiXCircle } from "react-icons/fi";
import { appColorTheme } from "../../../../../../config/appconfig.js";
import ImageListSelector from "../../../../../../components/Utility/ImageListSelector.jsx";
import ImageUpdateUploader from "../../../../../../components/Utility/ImageUpdateUploader.jsx";
import { useAddFinishProductImageMutation } from "../../../../../../services/serviceOrderApi";
import { useNotify } from "../../../../../../components/Utility/Notify.jsx";

export default function FinishUpdateModal({
  products = [],
  refetch,
  serviceOrderId,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addFinishProductImage, { isLoading }] =
    useAddFinishProductImageMutation();
  const notify = useNotify();

  // Store each product's upload status
  const [productUploads, setProductUploads] = useState({});

  // Store the complete request payload that will be sent to the API
  const [requestPayload, setRequestPayload] = useState([]);

  // Track if we're currently submitting the final request
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This function now just stores the uploaded media URLs in state
  const handleUploadComplete = (productId, mediaUrls) => {
    // Store the new upload in our state
    setProductUploads((prev) => ({
      ...prev,
      [productId]: { mediaUrls, isUploaded: true },
    }));

    // Update the request payload
    setRequestPayload((prev) => {
      // Remove any existing entry for this product
      const filtered = prev.filter((item) => item.productId !== productId);
      // Add the new entry
      return [
        ...filtered,
        {
          mediaUrls,
          productId,
        },
      ];
    });
  };

  // Submit all uploads at once
  const handleSubmitAllUploads = async () => {
    try {
      setIsSubmitting(true);

      // Format the request payload as an array of objects
      const formattedPayload = requestPayload.map((item) => ({
        mediaUrls: item.mediaUrls,
        productId: item.productId,
      }));

      // Call the API with the array as body and serviceId as query param
      await addFinishProductImage({
        serviceId: serviceOrderId,
        body: formattedPayload,
      }).unwrap();

      notify(
        "Cập nhật ảnh thành công",
        "Tất cả ảnh sản phẩm hoàn thiện đã được lưu",
        "success"
      );

      refetch();
      closeModal();
    } catch (error) {
      notify(
        "Lỗi cập nhật ảnh",
        error.data?.message || "Không thể cập nhật ảnh",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setProductUploads({});
    setRequestPayload([]);
    onClose();
  };

  // Check if a specific product has been prepared for upload
  const isProductPrepared = (productId) => {
    return !!productUploads[productId]?.isUploaded;
  };

  // Check if all products have been prepared for upload
  const allProductsPrepared = products.every(
    (product) =>
      isProductPrepared(product.requestedProductId) ||
      product.personalProductDetail?.finishImgUrls
  );

  // Calculate how many products are ready
  const preparedProductsCount = products.reduce((count, product) => {
    if (
      isProductPrepared(product.requestedProductId) ||
      product.personalProductDetail?.finishImgUrls
    ) {
      return count + 1;
    }
    return count;
  }, 0);

  // Progress percentage
  const progressPercentage =
    products.length > 0 ? (preparedProductsCount / products.length) * 100 : 0;

  return (
    <>
      <Button
        py={1}
        px={2}
        color={appColorTheme.blue_0}
        bg="none"
        border={`1px solid ${appColorTheme.blue_0}`}
        _hover={{ bg: appColorTheme.blue_0, color: "white" }}
        leftIcon={<FiImage />}
        onClick={onOpen}
      >
        Cập nhật ảnh hoàn thiện và giao hàng
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        size="4xl"
        scrollBehavior="inside"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật ảnh hoàn thiện sản phẩm</ModalHeader>
          {!isSubmitting && <ModalCloseButton />}
          <ModalBody>
            {isLoading || isSubmitting ? (
              <Center py={8} flexDirection="column">
                <Spinner size="xl" color={appColorTheme.brown_2} mb={4} />
                <Text>
                  {isSubmitting ? "Đang lưu ảnh..." : "Đang xử lý..."}
                </Text>
              </Center>
            ) : (
              <>
                <Progress
                  value={progressPercentage}
                  size="sm"
                  colorScheme="green"
                  mb={4}
                  borderRadius="md"
                />

                <Text mb={4}>
                  Đã chuẩn bị {preparedProductsCount}/{products.length} sản phẩm
                </Text>

                <Accordion allowMultiple defaultIndex={[0]}>
                  {products.map((product, idx) => {
                    const finishImgUrls =
                      product.personalProductDetail?.finishImgUrls || "";
                    const alreadyHasImages =
                      finishImgUrls && finishImgUrls.trim() !== "";
                    const isPrepared = isProductPrepared(
                      product.requestedProductId
                    );

                    return (
                      <AccordionItem key={product.requestedProductId}>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {console.log(product)}
                              <Text fontWeight="bold">
                                Sản phẩm #{idx + 1} -{" "}
                                {product.category?.categoryName ||
                                  product?.designIdeaVariantDetail?.name}
                              </Text>
                              {isPrepared && (
                                <Badge colorScheme="green" ml={2}>
                                  Đã chuẩn bị
                                </Badge>
                              )}
                              {alreadyHasImages && !isPrepared && (
                                <Badge colorScheme="blue" ml={2}>
                                  Ảnh hiện tại
                                </Badge>
                              )}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {alreadyHasImages && !isPrepared && (
                            <Box mb={4}>
                              <Text fontWeight="bold" mb={2}>
                                Ảnh hoàn thiện hiện tại:
                              </Text>
                              <ImageListSelector
                                imgUrls={finishImgUrls}
                                imgH={300}
                              />
                              <Divider my={4} />
                            </Box>
                          )}

                          {isPrepared ? (
                            <Alert status="success">
                              <AlertIcon />
                              Đã chuẩn bị ảnh hoàn thiện mới
                            </Alert>
                          ) : (
                            <Box>
                              <Text fontWeight="bold" mb={2}>
                                Tải lên ảnh hoàn thiện mới:
                              </Text>
                              <ImageUpdateUploader
                                imgUrls={finishImgUrls}
                                maxFiles={5}
                                onUploadComplete={(urls) =>
                                  handleUploadComplete(
                                    product.requestedProductId,
                                    urls
                                  )
                                }
                              />
                            </Box>
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<FiXCircle />}
              colorScheme="gray"
              mr={3}
              onClick={closeModal}
            >
              Đóng
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<FiUpload />}
              onClick={handleSubmitAllUploads}
              isDisabled={
                !allProductsPrepared ||
                products.length === 0 ||
                requestPayload.length === 0
              }
              isLoading={isSubmitting}
              loadingText="Đang lưu..."
            >
              Lưu tất cả ảnh
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
