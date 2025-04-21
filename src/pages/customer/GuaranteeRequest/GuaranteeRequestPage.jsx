import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Button,
  SimpleGrid,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { addMonths, format } from "date-fns";
import { vi } from "date-fns/locale";
import { appColorTheme } from "../../../config/appconfig.js";
import { useNotify } from "../../../components/Utility/Notify.jsx";
import useAuth from "../../../hooks/useAuth.js";
import WoodworkerBox from "../PersonalizationRequest/WoodworkerBox.jsx";
import AddressSelection from "../Cart/components/AddressSelection.jsx";
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

// Import our custom components
import OrderSelection from "./components/OrderSelection.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductStatusForm from "./components/ProductStatusForm.jsx";
import ShippingOptions from "./components/ShippingOptions.jsx";
import ProductSelectionModal from "./components/ProductSelectionModal.jsx";
import { useDisclosure } from "@chakra-ui/react";

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

        // Update state with results
        setSelectedService(cheapestService);
        setShippingFee(isInstall ? calculatedFee : calculatedFee * 2);
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
          {/* Order Selection Component */}
          <OrderSelection
            completedOrders={completedOrders}
            selectedOrderId={selectedOrderId}
            handleOrderSelect={handleOrderSelect}
          />

          {/* Product Selection Component */}
          {selectedOrder && (
            <ProductCard
              selectedProduct={selectedProduct}
              orderDetail={orderDetail}
              getWarrantyEndDate={getWarrantyEndDate}
              formatDate={formatDate}
              onOpen={onOpen}
            />
          )}

          {/* Product Status Component */}
          {selectedProduct && (
            <ProductStatusForm
              currentProductStatus={currentProductStatus}
              setCurrentProductStatus={setCurrentProductStatus}
              currentProductImages={currentProductImages}
              handleUploadComplete={handleUploadComplete}
            />
          )}
        </VStack>

        <VStack spacing={5} align="stretch">
          {/* Address Selection Component */}
          <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
            <AddressSelection
              addresses={addresses}
              isLoading={isLoadingAddresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </Box>

          {/* Shipping Options Component */}
          {selectedProduct && selectedAddress && (
            <ShippingOptions
              isInstall={isInstall}
              setIsInstall={setIsInstall}
              isCalculatingShipping={isCalculatingShipping}
              shippingFee={shippingFee}
              note={note}
              setNote={setNote}
            />
          )}

          {/* Woodworker Box Component */}
          {woodworkerInfo && (
            <WoodworkerBox woodworkerProfile={woodworkerInfo} />
          )}

          {/* Submit Button */}
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

      {/* Product Selection Modal */}
      <ProductSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        orderDetail={orderDetail}
        isLoadingOrderDetail={isLoadingOrderDetail}
        getWarrantyEndDate={getWarrantyEndDate}
        formatDate={formatDate}
        handleSelectProduct={handleSelectProduct}
      />
    </>
  );
}
