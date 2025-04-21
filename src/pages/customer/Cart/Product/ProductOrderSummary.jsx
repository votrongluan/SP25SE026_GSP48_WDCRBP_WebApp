import {
  Box,
  Button,
  Text,
  Flex,
  Divider,
  Alert,
  AlertIcon,
  VStack,
  Textarea,
  FormControl,
  FormLabel,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { formatPrice } from "../../../../utils/utils.js";
import {
  calculateCheapestShipping,
  extractDimensionsFromProduct,
} from "../../../../utils/shippingUtils.js";
import { appColorTheme } from "../../../../config/appconfig.js";
import AddressSelection from "../components/AddressSelection.jsx";
import { useCreateSaleOrderMutation } from "../../../../services/serviceOrderApi.js";
import {
  useCalculateShippingFeeMutation,
  useGetAvailableServicesMutation,
} from "../../../../services/ghnApi.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { MdLocationOn, MdStorefront } from "react-icons/md";
import useCart from "../../../../hooks/useCart.js";

export default function ProductOrderSummary({
  auth,
  selectedGroup,
  selectedAddress,
  setSelectedAddress,
  cartProducts,
  addresses,
  isLoadingAddresses,
  addressError,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  const [createProductOrder] = useCreateSaleOrderMutation();
  const [calculateShippingFee] = useCalculateShippingFeeMutation();
  const [getAvailableServices] = useGetAvailableServicesMutation();

  const navigate = useNavigate();
  const notify = useNotify();
  const { removeProductFromCart } = useCart();

  // Check if we have items with installation requirement
  const isInstall = selectedGroup ? selectedGroup[1] === "install" : false;

  // Calculate shipping fee when address changes for non-installation orders
  useEffect(() => {
    const calculateShipping = async () => {
      // Only calculate shipping fee for non-installation orders
      if (isInstall || !selectedAddress || !cartProducts?.length) {
        setShippingFee(0);
        setSelectedService(null);
        return;
      }

      const selectedAddressObj = addresses.find(
        (addr) => addr.userAddressId.toString() === selectedAddress
      );

      if (!selectedAddressObj || !selectedAddressObj.districtId) {
        return;
      }

      // Get the first item for origin details
      const firstItem = cartProducts[0];
      if (!firstItem || !firstItem.fromDistrictId) {
        return;
      }

      try {
        setIsLoadingServices(true);
        setIsCalculatingShipping(true);

        // Prepare items data with dimensions
        const items = cartProducts.map((item) => {
          const dimensions = extractDimensionsFromProduct(item);
          return {
            name: item.productName,
            quantity: item.quantity,
            height: dimensions.height,
            width: dimensions.width,
            length: dimensions.length,
            weight: 0,
          };
        });

        // Use the extracted shipping calculation utility
        const { selectedService: cheapestService, shippingFee: calculatedFee } =
          await calculateCheapestShipping({
            fromDistrictId: +firstItem.fromDistrictId,
            fromWardCode: firstItem.fromWardCode,
            toDistrictId: +selectedAddressObj.districtId,
            toWardCode: selectedAddressObj.wardCode,
            items,
            getAvailableServices,
            calculateShippingFee,
          });

        // Update state with results
        setSelectedService(cheapestService);
        setShippingFee(calculatedFee);
      } catch (error) {
        console.error("Error in shipping calculation process:", error);
        setSelectedService(null);
        setShippingFee(0);
      } finally {
        setIsLoadingServices(false);
        setIsCalculatingShipping(false);
      }
    };

    calculateShipping();
  }, [
    selectedAddress,
    cartProducts,
    isInstall,
    addresses,
    calculateShippingFee,
    getAvailableServices,
  ]);

  // Helper function to get total price for the selected products
  const getSelectedProductsTotal = () => {
    let total = 0;
    const products = cartProducts || [];
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Get the total order amount including shipping fee
  const getTotalAmount = () => {
    return getSelectedProductsTotal() + shippingFee;
  };

  // Get the total quantity of items in cart
  const getTotalQuantity = () => {
    return cartProducts?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  // Check if both woodworker and address are selected
  const canProceed =
    selectedGroup !== null &&
    selectedAddress !== null &&
    cartProducts?.length > 0 &&
    !isCalculatingShipping &&
    !isLoadingServices &&
    (isInstall || selectedService !== null);

  // Get woodworker information from the first cart item
  const woodworkerInfo =
    cartProducts?.length > 0
      ? {
          name: cartProducts[0].woodworkerName,
          address: cartProducts[0].address,
        }
      : null;

  // Handle order submission
  const handlePlaceOrder = async () => {
    try {
      // Validate total quantity
      const totalQuantity = getTotalQuantity();
      if (totalQuantity > 4) {
        notify(
          "Số lượng vượt quá giới hạn",
          "Tổng số lượng sản phẩm không được vượt quá 4.",
          "error"
        );
        return;
      }

      // Check if we have valid selected items
      if (!selectedGroup || !cartProducts.length) {
        notify("Lỗi", "Vui lòng chọn nhóm sản phẩm để đặt hàng.", "error");
        return;
      }

      // For non-install orders, check if shipping service is selected
      if (!isInstall && !selectedService) {
        notify(
          "Lỗi",
          "Không có dịch vụ vận chuyển phù hợp cho đơn hàng này.",
          "error"
        );
        return;
      }

      // Prepare request data
      const availableServiceId = cartProducts[0].availableServiceId;
      const selectedAddressObj = addresses.find(
        (addr) => addr.userAddressId.toString() === selectedAddress
      );

      if (!selectedAddressObj) {
        notify("Lỗi", "Không tìm thấy thông tin địa chỉ.", "error");
        return;
      }

      const orderData = {
        availableServiceId: availableServiceId,
        userId: auth.userId,
        productIds: cartProducts.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        address: selectedAddressObj.address,
        woodworkerId: selectedGroup[0],
        description: description.trim(),
        isInstall: isInstall,
        // Add shipping information for non-installation orders
        toDistrictId: !isInstall ? selectedAddressObj.districtId : "",
        toWardCode: !isInstall ? selectedAddressObj.wardCode : "",
        priceShipping: !isInstall ? shippingFee : 0,
        ghnServiceId:
          !isInstall && selectedService ? selectedService.service_id : 0,
        ghnServiceTypeId:
          !isInstall && selectedService ? selectedService.service_type_id : 0,
      };

      // Call the API
      setIsSubmitting(true);
      const response = await createProductOrder(orderData).unwrap();

      if (response.code === 200) {
        // Clear cart items for this woodworker after successful order
        const woodworkerId = selectedGroup[0];
        cartProducts.forEach((item) => {
          removeProductFromCart(woodworkerId, item.productId);
        });

        notify(
          "Đặt hàng thành công",
          "Đơn hàng của bạn đã được tạo",
          "success"
        );

        // Redirect to success page
        navigate(
          "/success?title=Đặt hàng thành công&desc=Đơn hàng của bạn đã được tạo thành công, vui lòng đợi xưởng mộc xác nhận đơn hàng.&buttonText=Xem danh sách đơn hàng&path=/cus/service-order"
        );
      } else {
        throw new Error(response.message || "Có lỗi xảy ra khi đặt hàng");
      }
    } catch (error) {
      console.error("Order error:", error);
      notify(
        "Đặt hàng thất bại",
        error.message || "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="sm" height="fit-content">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Thông tin đặt hàng
      </Text>

      {!selectedGroup ? (
        <Text color="gray.500" mb={4}>
          Vui lòng chọn một nhóm sản phẩm để tiến hành đặt hàng
        </Text>
      ) : (
        <>
          {getTotalQuantity() > 4 && (
            <Alert status="warning" mt={2} mb={2} borderRadius="md">
              <AlertIcon />
              Số lượng sản phẩm vượt quá giới hạn (tối đa 4)
            </Alert>
          )}

          <Divider my={4} />

          {/* Order Type Information */}
          <Flex
            align="center"
            bg={isInstall ? "blue.50" : "orange.50"}
            p={3}
            borderRadius="md"
            mb={3}
          >
            <Text fontWeight="medium">
              {isInstall ? "Đơn hàng có lắp đặt" : "Đơn hàng không cần lắp đặt"}
            </Text>
          </Flex>

          {/* Woodworker Information Section */}
          {woodworkerInfo && (
            <Box mb={4} p={3} bg="gray.50" borderRadius="md">
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">Thông tin xưởng mộc:</Text>

                <Flex alignItems="center" mt={1}>
                  <Icon as={MdStorefront} mr={1} color="gray.600" />
                  <Text noOfLines={1} fontWeight="medium" fontSize="sm">
                    {woodworkerInfo.name || "Không có tên xưởng"}
                  </Text>
                </Flex>

                <Flex alignItems="center">
                  <Icon as={MdLocationOn} mr={1} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {woodworkerInfo.address || "Không có địa chỉ"}
                  </Text>
                </Flex>
              </VStack>
            </Box>
          )}

          {/* Address Selection Section */}
          {auth && (
            <Box mt={4} mb={4}>
              <AddressSelection
                addresses={addresses}
                isLoading={isLoadingAddresses}
                error={addressError}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            </Box>
          )}

          {/* Shipping Service Info for non-installation orders */}
          {!isInstall &&
            selectedAddress &&
            (isLoadingServices || isCalculatingShipping) && (
              <Box mt={4} mb={4}>
                <Flex align="center" justify="center" py={3}>
                  <Spinner size="sm" mr={2} color="blue.500" />
                </Flex>
              </Box>
            )}

          {/* Note Section */}
          <FormControl mt={4}>
            <FormLabel fontWeight="medium">Ghi chú đơn hàng</FormLabel>
            <Textarea
              placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt cho đơn hàng này"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="md"
              resize="vertical"
              maxLength={500}
            />
          </FormControl>

          <Divider my={4} />

          {/* Order Summary */}
          <VStack spacing={2} align="stretch">
            <Flex justify="space-between">
              <Text>Tiền sản phẩm:</Text>
              <Text>{formatPrice(getSelectedProductsTotal())}</Text>
            </Flex>

            {!isInstall && (
              <Flex justify="space-between" align="center">
                <Text>Phí vận chuyển </Text>
                {isCalculatingShipping || isLoadingServices ? (
                  <Spinner size="sm" color="blue.500" />
                ) : selectedService ? (
                  <Text>
                    {shippingFee > 0 ? formatPrice(shippingFee) : "Miễn phí"}
                  </Text>
                ) : (
                  <Text color="red.500">Không khả dụng</Text>
                )}
              </Flex>
            )}

            <Divider my={2} />

            <Flex justify="space-between">
              <Text fontSize="lg" fontWeight="medium">
                Tổng giá trị:
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="app_brown.2">
                {formatPrice(getTotalAmount())}
              </Text>
            </Flex>
          </VStack>
        </>
      )}

      {auth ? (
        <Button
          bgColor={appColorTheme.brown_2}
          _hover={{
            backgroundColor: "app_brown.1",
            color: "white",
          }}
          color="white"
          size="lg"
          width="full"
          mt={4}
          isDisabled={!canProceed || getTotalQuantity() > 4}
          onClick={handlePlaceOrder}
          isLoading={isSubmitting}
          leftIcon={<FiShoppingCart />}
        >
          Tiến hành đặt hàng
        </Button>
      ) : (
        <Link to="/auth">
          <Button
            color="white"
            bgColor={appColorTheme.brown_2}
            _hover={{
              backgroundColor: "app_brown.1",
            }}
            width="100%"
            leftIcon={<FiLogIn />}
            mt={4}
          >
            Đăng nhập để sử dụng dịch vụ
          </Button>
        </Link>
      )}
    </Box>
  );
}
