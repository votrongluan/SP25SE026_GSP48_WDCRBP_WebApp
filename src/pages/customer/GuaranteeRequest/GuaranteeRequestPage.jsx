import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Divider,
  FormControl,
  FormLabel,
  Textarea,
  Checkbox,
  Alert,
  AlertIcon,
  Spinner,
  Center,
  Badge,
  Card,
  CardBody,
  Stack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { addMonths, format } from "date-fns";
import { vi } from "date-fns/locale";
import { appColorTheme } from "../../../config/appconfig.js";
import { useNotify } from "../../../components/Utility/Notify.jsx";
import useAuth from "../../../hooks/useAuth.js";
import WoodworkerBox from "../PersonalizationRequest/WoodworkerBox.jsx";
import AddressSelection from "../Cart/components/AddressSelection.jsx";
import ImageUpdateUploader from "../../../components/Utility/ImageUpdateUploader.jsx";
import ImageListSelector from "../../../components/Utility/ImageListSelector.jsx";
import {
  useGetServiceOrdersQuery,
  useGetServiceOrderByIdQuery,
} from "../../../services/serviceOrderApi.js";
import { useCreateGuaranteeOrderMutation } from "../../../services/guaranteeOrderApi.js";
import { useGetUserAddressesByUserIdQuery } from "../../../services/userAddressApi.js";
import { useGetWoodworkerByIdQuery } from "../../../services/woodworkerApi.js";
import {
  useCalculateShippingFeeMutation,
  useGetAvailableServicesMutation,
} from "../../../services/ghnApi";
import {
  calculateCheapestShipping,
  extractDimensionsFromProduct,
} from "../../../utils/shippingUtils.js";
import { formatDateString } from "../../../utils/utils.js";

export default function GuaranteeRequestPage() {
  const { id: woodworkerId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const notify = useNotify();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentProductStatus, setCurrentProductStatus] = useState("");
  const [currentProductImages, setCurrentProductImages] = useState("");
  const [isInstall, setIsInstall] = useState(true);
  const [note, setNote] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [currentWoodworkerId, setCurrentWoodworkerId] = useState(null);

  // Modal for product selection
  const { isOpen, onOpen, onClose } = useDisclosure();

  // API calls
  const { data: addressesResponse, isLoading: isLoadingAddresses } =
    useGetUserAddressesByUserIdQuery(auth?.userId, { skip: !auth?.userId });

  // Get service orders - either for a specific woodworker or for the customer
  const {
    data: ordersResponse,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useGetServiceOrdersQuery(
    {
      id: woodworkerId || auth?.userId,
      role: woodworkerId ? "Woodworker" : "Customer",
    },
    { skip: !auth?.userId && !woodworkerId }
  );

  // Get detailed order information when selected
  const { data: orderDetailResponse, isLoading: isLoadingOrderDetail } =
    useGetServiceOrderByIdQuery(selectedOrderId, {
      skip: !selectedOrderId,
    });

  // Get woodworker details with districtId and wardCode
  const {
    data: woodworkerDetailResponse,
    isLoading: isLoadingWoodworkerDetail,
  } = useGetWoodworkerByIdQuery(currentWoodworkerId, {
    skip: !currentWoodworkerId,
  });

  const [calculateShippingFee] = useCalculateShippingFeeMutation();
  const [getAvailableServices] = useGetAvailableServicesMutation();

  const [createGuaranteeOrder, { isLoading: isSubmitting }] =
    useCreateGuaranteeOrderMutation();

  // Filter completed orders
  const completedOrders =
    ordersResponse?.data?.filter((order) => order.status === "Đã hoàn tất") ||
    [];

  // Get order detail
  const orderDetail = orderDetailResponse?.data;

  // Get address list
  const addresses = addressesResponse?.data || [];

  // Get woodworker info from API response
  const woodworkerInfo = woodworkerDetailResponse?.data;

  // Update woodworkerId when order changes
  useEffect(() => {
    if (selectedOrder?.service?.wwDto?.woodworkerId) {
      setCurrentWoodworkerId(selectedOrder.service.wwDto.woodworkerId);
    } else if (orderDetail?.service?.wwDto?.woodworkerId) {
      setCurrentWoodworkerId(orderDetail.service.wwDto.woodworkerId);
    } else {
      setCurrentWoodworkerId(null);
    }
  }, [selectedOrder, orderDetail]);

  // Calculate shipping fee when address or product selection changes
  useEffect(() => {
    const calculateShipping = async () => {
      if (!selectedAddress || !selectedProduct || !woodworkerInfo) {
        setShippingFee(0);
        return;
      }

      const selectedAddressObj = addresses.find(
        (addr) => addr.userAddressId.toString() === selectedAddress
      );

      if (!selectedAddressObj || !selectedAddressObj.districtId) {
        return;
      }

      try {
        setIsCalculatingShipping(true);

        // Get dimensions from the product using the utility function
        const dimensions = extractDimensionsFromProduct(selectedProduct);

        // Prepare items data
        const items = [
          {
            name:
              selectedProduct.category?.categoryName ||
              selectedProduct.designIdeaVariantDetail?.name ||
              "Sản phẩm bảo hành",
            quantity: 1,
            height: dimensions.height,
            width: dimensions.width,
            length: dimensions.length,
            weight: 0,
          },
        ];

        // Use the extracted shipping calculation utility
        const { selectedService: cheapestService, shippingFee: calculatedFee } =
          await calculateCheapestShipping({
            fromDistrictId: woodworkerInfo.districtId,
            fromWardCode: woodworkerInfo.wardCode,
            toDistrictId: +selectedAddressObj.districtId,
            toWardCode: selectedAddressObj.wardCode,
            items,
            getAvailableServices,
            calculateShippingFee,
          });

        // Update state with results and handle multiplier for non-install
        setSelectedService(cheapestService);
        setShippingFee(isInstall ? calculatedFee : calculatedFee * 2); // Apply x2 here for guarantee repair
      } catch (error) {
        console.error("Error in shipping calculation process:", error);
        setSelectedService(null);
        setShippingFee(0);
      } finally {
        setIsCalculatingShipping(false);
      }
    };

    calculateShipping();
  }, [
    selectedAddress,
    selectedProduct,
    isInstall,
    addresses,
    woodworkerInfo,
    calculateShippingFee,
    getAvailableServices,
  ]);

  // Handle order selection
  const handleOrderSelect = (e) => {
    const orderId = e.target.value;
    setSelectedOrderId(orderId);

    if (orderId) {
      const order = completedOrders.find(
        (order) => order.orderId.toString() === orderId
      );
      setSelectedOrder(order);
      setSelectedProduct(null);
    } else {
      setSelectedOrder(null);
      setSelectedProduct(null);
    }
  };

  // Handle product selection
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    onClose();
  };

  // Handle image upload completion
  const handleUploadComplete = (urls) => {
    setCurrentProductImages(urls);
  };

  // Calculate warranty end date
  const getWarrantyEndDate = (product) => {
    if (!product || !product.warrantyDuration) return null;

    const orderDate = orderDetail?.updatedAt || orderDetail?.createdAt;
    if (!orderDate) return null;

    const endDate = addMonths(new Date(orderDate), product.warrantyDuration);

    return endDate;
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "Không có";
    return format(new Date(date), "dd/MM/yyyy", { locale: vi });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !selectedProduct ||
      !selectedAddress ||
      !currentProductImages.length ||
      !currentProductStatus
    ) {
      notify(
        "Thông tin không đầy đủ",
        "Vui lòng điền đầy đủ thông tin và cung cấp hình ảnh sản phẩm hiện tại.",
        "error"
      );
      return;
    }

    try {
      const selectedAddressObj = addresses.find(
        (addr) => addr.userAddressId.toString() === selectedAddress
      );

      if (!selectedAddressObj) {
        notify("Lỗi", "Không tìm thấy thông tin địa chỉ.", "error");
        return;
      }

      const requestData = {
        availableServiceId: selectedOrder?.service?.service?.serviceId || 0,
        toDistrictId: selectedAddressObj.districtId,
        toWardCode: selectedAddressObj.wardCode,
        ghnServiceId: selectedService?.service_id || 0,
        ghnServiceTypeId: selectedService?.service_type_id || 0,
        note: note,
        userId: auth?.userId,
        address: selectedAddressObj.address,
        requestedProductId: selectedProduct.requestedProductId,
        isInstall: isInstall,
        priceShipping: shippingFee,
        productCurrentStatus: currentProductStatus,
        currentProductImgUrls: currentProductImages,
      };

      const response = await createGuaranteeOrder(requestData).unwrap();

      notify(
        "Yêu cầu sửa chữa / bảo hành thành công",
        "Yêu cầu của bạn đã được gửi thành công.",
        "success"
      );

      navigate(
        "/success?title=Gửi yêu cầu sửa chữa / bảo hành thành công&desc=Yêu cầu của bạn đã được gửi đi, vui lòng đợi xưởng mộc phản hồi.&buttonText=Xem danh sách yêu cầu&path=/cus/guarantee-order"
      );
    } catch (error) {
      notify(
        "Lỗi",
        error.data?.message || "Có lỗi xảy ra khi gửi yêu cầu.",
        "error"
      );
    }
  };

  // Loading state
  if (
    isLoadingOrders ||
    (isLoadingOrderDetail && selectedOrderId) ||
    isLoadingWoodworkerDetail
  ) {
    return (
      <Center h="400px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Error state
  if (ordersError) {
    return (
      <Box textAlign="center" p={10}>
        <Alert status="error">
          <AlertIcon />
          Có lỗi xảy ra khi tải thông tin đơn hàng. Vui lòng thử lại sau.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Yêu cầu sửa chữa / bảo hành sản phẩm
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={5}>
        <VStack spacing={5} align="stretch">
          <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
            <Heading size="md" mb={4}>
              Chọn đơn hàng đã hoàn thành
            </Heading>

            {completedOrders.length === 0 ? (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                Không tìm thấy đơn hàng đã hoàn thành nào.
              </Alert>
            ) : (
              <FormControl isRequired>
                <Select
                  placeholder="Chọn đơn hàng"
                  value={selectedOrderId}
                  onChange={handleOrderSelect}
                  size="lg"
                >
                  {completedOrders.map((order) => (
                    <option key={order.orderId} value={order.orderId}>
                      Đơn #{order.orderId} -{" "}
                      {format(new Date(order.createdAt), "dd/MM/yyyy")} -
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalAmount)}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {selectedOrder && (
            <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
              <Heading size="md" mb={4}>
                Sản phẩm cần sửa chữa / bảo hành
              </Heading>

              {selectedProduct ? (
                <Card variant="outline">
                  <CardBody>
                    <Flex direction="column">
                      <Flex mb={4}>
                        {(selectedProduct.designIdeaVariantDetail?.img_urls ||
                          selectedProduct.finishImgUrls) && (
                          <Image
                            boxSize="100px"
                            objectFit="cover"
                            src={
                              (
                                selectedProduct.designIdeaVariantDetail
                                  ?.img_urls || selectedProduct.finishImgUrls
                              )?.split(",")[0]
                            }
                            alt={selectedProduct.category?.categoryName}
                            borderRadius="md"
                            mr={4}
                          />
                        )}
                        <Stack>
                          <Text fontWeight="bold">
                            {selectedProduct.designIdeaVariantDetail?.name ||
                              selectedProduct.category?.categoryName ||
                              "Sản phẩm"}
                          </Text>
                          <Text fontSize="sm">
                            Danh mục: {selectedProduct.category?.categoryName}
                          </Text>
                          <Text fontSize="sm">
                            Số lượng: {selectedProduct.quantity}
                          </Text>
                        </Stack>
                      </Flex>

                      <Divider my={2} />

                      <Flex justifyContent="space-between" mt={2}>
                        <Text fontSize="sm">Ngày nhận sản phẩm:</Text>
                        <Text fontSize="sm" fontWeight="medium">
                          {formatDateString(orderDetail.updatedAt)}
                        </Text>
                      </Flex>

                      <Flex justifyContent="space-between" mt={1}>
                        <Text fontSize="sm">Thời hạn bảo hành:</Text>
                        <Text fontSize="sm" fontWeight="medium">
                          {selectedProduct.warrantyDuration || 0} tháng
                        </Text>
                      </Flex>

                      <Flex justifyContent="space-between" mt={1}>
                        <Text fontSize="sm">Hết hạn bảo hành:</Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color={
                            getWarrantyEndDate(selectedProduct) &&
                            new Date() > getWarrantyEndDate(selectedProduct)
                              ? "red.500"
                              : "green.500"
                          }
                        >
                          {formatDate(getWarrantyEndDate(selectedProduct))}
                          {getWarrantyEndDate(selectedProduct) &&
                            new Date() > getWarrantyEndDate(selectedProduct) &&
                            " (Đã hết hạn)"}
                        </Text>
                      </Flex>

                      <Button
                        size="sm"
                        mt={4}
                        colorScheme="blue"
                        variant="outline"
                        onClick={onOpen}
                      >
                        Đổi sản phẩm
                      </Button>
                    </Flex>
                  </CardBody>
                </Card>
              ) : (
                <Button onClick={onOpen} colorScheme="blue" isFullWidth>
                  Chọn sản phẩm cần sửa chữa / bảo hành
                </Button>
              )}
            </Box>
          )}

          {selectedProduct && (
            <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
              <Heading size="md" mb={4}>
                Tình trạng sản phẩm hiện tại
              </Heading>

              <FormControl isRequired mb={4}>
                <FormLabel>Mô tả tình trạng hiện tại:</FormLabel>
                <Textarea
                  value={currentProductStatus}
                  onChange={(e) => setCurrentProductStatus(e.target.value)}
                  placeholder="Mô tả chi tiết tình trạng sản phẩm và nêu rõ vấn đề bạn gặp phải..."
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Hình ảnh tình trạng hiện tại:</FormLabel>
                <ImageUpdateUploader
                  imgUrls=""
                  maxFiles={3}
                  onUploadComplete={handleUploadComplete}
                />
                {currentProductImages.length > 0 && (
                  <Box mt={4}>
                    <Text fontWeight="medium" mb={2}>
                      Hình ảnh đã tải lên:
                    </Text>
                    <ImageListSelector
                      imgUrls={currentProductImages}
                      imgH={100}
                    />
                  </Box>
                )}
              </FormControl>
            </Box>
          )}
        </VStack>

        <VStack spacing={5} align="stretch">
          <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
            <AddressSelection
              addresses={addresses}
              isLoading={isLoadingAddresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </Box>

          {selectedProduct && selectedAddress && (
            <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <Checkbox
                    isChecked={isInstall}
                    onChange={(e) => setIsInstall(e.target.checked)}
                    size="md"
                  >
                    <Text fontWeight="medium">
                      Yêu cầu giao hàng + lắp đặt bởi xưởng
                    </Text>
                  </Checkbox>

                  <Text fontSize="sm" color="gray.600" mt={1}>
                    {isInstall
                      ? "Xưởng sẽ giao và lắp đặt sản phẩm sau khi sửa chữa / bảo hành xong."
                      : "Sản phẩm sẽ được gửi về qua đơn vị vận chuyển sau khi sửa chữa / bảo hành (phí vận chuyển x2 cho chiều đi và về)."}
                  </Text>
                </FormControl>

                <Divider />

                <Box>
                  <Text fontWeight="medium" mb={2}>
                    Chi phí vận chuyển:
                  </Text>

                  {isCalculatingShipping ? (
                    <Flex align="center">
                      <Spinner size="sm" mr={2} />
                      <Text>Đang tính phí vận chuyển...</Text>
                    </Flex>
                  ) : shippingFee > 0 ? (
                    <Text fontWeight="bold" color={appColorTheme.brown_2}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(shippingFee)}
                      {!isInstall && " (x2 chiều đi và về)"}
                    </Text>
                  ) : (
                    <Text color="red.500">Không thể tính phí vận chuyển</Text>
                  )}
                </Box>

                <Divider />

                <FormControl>
                  <FormLabel>Ghi chú bổ sung:</FormLabel>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Thông tin bổ sung về yêu cầu sửa chữa / bảo hành..."
                  />
                </FormControl>
              </VStack>
            </Box>
          )}

          {woodworkerInfo && (
            <WoodworkerBox woodworkerProfile={woodworkerInfo} />
          )}

          <Flex justifyContent="center" mt={4}>
            <Button
              leftIcon={<FiSend />}
              _hover={{ backgroundColor: "app_brown.1", color: "white" }}
              px={8}
              py={6}
              bgColor={appColorTheme.brown_2}
              color="white"
              borderRadius="40px"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              isDisabled={
                !selectedProduct ||
                !selectedAddress ||
                !currentProductImages.length ||
                !currentProductStatus ||
                isCalculatingShipping
              }
            >
              Gửi yêu cầu sửa chữa / bảo hành
            </Button>
          </Flex>
        </VStack>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chọn sản phẩm cần sửa chữa / bảo hành</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoadingOrderDetail ? (
              <Center p={10}>
                <Spinner />
              </Center>
            ) : orderDetail?.requestedProduct?.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {orderDetail.requestedProduct.map((product) => {
                  const warrantyEndDate = getWarrantyEndDate(product);
                  const isExpired =
                    warrantyEndDate && new Date() > warrantyEndDate;

                  return (
                    <Box
                      key={product.requestedProductId}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: "gray.50" }}
                      onClick={() => handleSelectProduct(product)}
                    >
                      <Flex>
                        {(product.designIdeaVariantDetail?.img_urls ||
                          product.finishImgUrls) && (
                          <Image
                            boxSize="80px"
                            objectFit="cover"
                            src={
                              (
                                product.designIdeaVariantDetail?.img_urls ||
                                product.finishImgUrls
                              )?.split(",")[0]
                            }
                            alt={product.category?.categoryName}
                            borderRadius="md"
                            mr={4}
                          />
                        )}
                        <Stack flex="1">
                          <Text fontWeight="bold">
                            {product.designIdeaVariantDetail?.name ||
                              product.category?.categoryName ||
                              "Sản phẩm"}
                          </Text>
                          <Text fontSize="sm">
                            Danh mục: {product.category?.categoryName}
                          </Text>
                          <Flex justifyContent="space-between">
                            <Text fontSize="sm">
                              Thời hạn bảo hành: {product.warrantyDuration || 0}{" "}
                              tháng
                            </Text>
                            {isExpired ? (
                              <Badge colorScheme="red">Đã hết hạn</Badge>
                            ) : (
                              <Badge colorScheme="green">Còn hạn</Badge>
                            )}
                          </Flex>
                          <Text fontSize="sm">
                            Hết hạn ngày: {formatDate(warrantyEndDate)}
                          </Text>
                        </Stack>
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
            ) : (
              <Alert status="info">
                <AlertIcon />
                Không tìm thấy thông tin sản phẩm trong đơn hàng này.
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
