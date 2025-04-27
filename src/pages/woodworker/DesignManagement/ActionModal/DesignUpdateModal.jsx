import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  HStack,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Flex,
  Textarea,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import { formatPrice } from "../../../../utils/utils";
import ImageUpdateUploader from "../../../../components/Utility/ImageUpdateUploader";
import {
  useUpdateDesignIdeaMutation,
  useGetDesignIdeaVariantQuery,
} from "../../../../services/designIdeaApi";
import { useNotify } from "../../../../components/Utility/Notify";
import CheckboxList from "../../../../components/Utility/CheckboxList";

export default function DesignUpdateModal({ design, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [imgUrls, setImgUrls] = useState(design?.img_urls || "");
  const [isInstall, setIsInstall] = useState(design?.isInstall || false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const notify = useNotify();

  const [updateDesignIdea, { isLoading }] = useUpdateDesignIdeaMutation();

  // Fetch variant data when modal opens
  const { data: variantData, isLoading: isVariantLoading } =
    useGetDesignIdeaVariantQuery(design?.designIdeaId, {
      skip: !isOpen || !design?.designIdeaId,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const variants = variantData?.data || [];

  // Track variant prices to update
  const [variantPrices, setVariantPrices] = useState([]);

  useEffect(() => {
    if (isOpen && design) {
      // Initialize with actual data once the modal is opened and variants loaded
      setIsInstall(design?.isInstall || false);
      setImgUrls(design?.img_urls || "");

      // Initialize variant prices from fetched data
      if (variants.length > 0) {
        const initialPrices = variants.map((variant) => ({
          designIdeaVariantId: variant.designIdeaVariantId,
          price: variant.price,
        }));
        setVariantPrices(initialPrices);
      }
    }
  }, [isOpen, design, variants]);

  const handlePriceChange = (variantId, newPrice) => {
    setVariantPrices((prev) =>
      prev.map((item) =>
        item.designIdeaVariantId === variantId
          ? { ...item, price: newPrice }
          : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Format data according to the API's expected structure
    const data = {
      designIdeaId: design.designIdeaId,
      name: formData.get("name"),
      img: imgUrls,
      description: formData.get("description"),
      isInstall: isInstall,
      prices: variantPrices,
    };

    try {
      await updateDesignIdea(data).unwrap();
      notify("Cập nhật thiết kế thành công");
      refetch?.();
      onClose();
    } catch (error) {
      notify(
        "Cập nhật thiết kế thất bại",
        error.data?.message || "Vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <>
      <Tooltip label="Chỉnh sửa" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.blue_0}
          bg="none"
          border={`1px solid ${appColorTheme.blue_0}`}
          _hover={{ bg: appColorTheme.blue_0, color: "white" }}
          onClick={onOpen}
        >
          <FiEdit2 />
        </Button>
      </Tooltip>

      <Modal
        size="6xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={isLoading ? null : onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thiết kế</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody bgColor="app_grey.1" pb={6}>
            {isVariantLoading ? (
              <Box textAlign="center" py={10}>
                <Text mb={4}>Đang tải dữ liệu thiết kế...</Text>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Tên thiết kế</FormLabel>
                    <Input
                      name="name"
                      placeholder="Nhập tên thiết kế"
                      bg="white"
                      defaultValue={design?.name || ""}
                    />
                  </FormControl>

                  <Box py={2}>
                    <Checkbox
                      isChecked={isInstall}
                      onChange={(e) => setIsInstall(e.target.checked)}
                      size="md"
                      colorScheme="green"
                    >
                      <Text fontWeight="medium">
                        Cần giao hàng + lắp đặt bởi xưởng
                      </Text>
                    </Checkbox>
                  </Box>

                  <FormControl isRequired>
                    <FormLabel>Mô tả</FormLabel>
                    <Textarea
                      name="description"
                      placeholder="Nhập mô tả"
                      bg="white"
                      rows={5}
                      defaultValue={design?.description || ""}
                    />
                  </FormControl>

                  {/* Price Table */}
                  {variants.length > 0 && (
                    <Box>
                      <Text fontWeight="bold" mb={4}>
                        Bảng giá theo cấu hình
                      </Text>
                      <VStack spacing={4} align="stretch">
                        {variants.map((variant) => (
                          <Box
                            key={variant.designIdeaVariantId}
                            p={5}
                            borderWidth="1px"
                            borderRadius="lg"
                            bg="white"
                          >
                            <HStack justify="space-between">
                              <Box pr={4} borderRight="1px solid #CCC" flex="1">
                                {variant.designIdeaVariantConfig.map((config) =>
                                  config.designVariantValues.map((value) => (
                                    <Flex
                                      justify="space-between"
                                      key={value.designIdeaConfigValueId}
                                    >
                                      <Text>
                                        {value.designIdeaConfig.specifications}:
                                      </Text>
                                      <Text as="b">{value.value}</Text>
                                    </Flex>
                                  ))
                                )}
                              </Box>

                              <HStack justifyContent="flex-end" flex="1">
                                <Text as="b" color={appColorTheme.brown_2}>
                                  {formatPrice(
                                    variantPrices.find(
                                      (p) =>
                                        p.designIdeaVariantId ===
                                        variant.designIdeaVariantId
                                    )?.price || variant.price
                                  )}
                                </Text>

                                <FormControl isRequired maxW="200px">
                                  <NumberInput
                                    value={
                                      variantPrices.find(
                                        (p) =>
                                          p.designIdeaVariantId ===
                                          variant.designIdeaVariantId
                                      )?.price || variant.price
                                    }
                                    onChange={(value) =>
                                      handlePriceChange(
                                        variant.designIdeaVariantId,
                                        parseInt(value)
                                      )
                                    }
                                    min={0}
                                    max={50000000}
                                    step={1000}
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>
                              </HStack>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  <FormControl isRequired>
                    <FormLabel>Hình ảnh</FormLabel>
                    <ImageUpdateUploader
                      maxFiles={4}
                      onUploadComplete={(result) => {
                        setImgUrls(result);
                      }}
                      imgUrls={imgUrls}
                    />
                  </FormControl>

                  <HStack mt={6}>
                    <CheckboxList
                      items={[
                        {
                          isOptional: false,
                          description:
                            "Tôi đã kiểm tra thông tin và xác nhận thao tác",
                        },
                      ]}
                      setButtonDisabled={setButtonDisabled}
                    />
                  </HStack>

                  <HStack justify="flex-end" mt={4}>
                    <Button onClick={onClose} isDisabled={isLoading}>
                      Hủy
                    </Button>
                    <Button
                      colorScheme="blue"
                      type="submit"
                      isLoading={isLoading}
                      isDisabled={buttonDisabled}
                    >
                      Cập nhật
                    </Button>
                  </HStack>
                </Stack>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
