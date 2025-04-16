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
import { appColorTheme } from "../../../../config/appconfig.js";
import AddressSelection from "../components/AddressSelection.jsx";
import { useCreateCustomizeOrderMutation } from "../../../../services/serviceOrderApi.js";
import {
  useCalculateShippingFeeMutation,
  useGetAvailableServicesMutation,
} from "../../../../services/ghnApi.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import useCart from "../../../../hooks/useCart.js";
import { MdLocationOn, MdStorefront } from "react-icons/md";

export default function DesignOrderSummary({
  auth,
  selectedGroup,
  selectedAddress,
  setSelectedAddress,
  cartDesigns,
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

  const [createCustomizeOrder] = useCreateCustomizeOrderMutation();
  const [calculateShippingFee] = useCalculateShippingFeeMutation();
  const [getAvailableServices] = useGetAvailableServicesMutation();

  const navigate = useNavigate();
  const notify = useNotify();
  const { removeDesignFromCart } = useCart();

  // Check if we have items with installation requirement
  const isInstall = selectedGroup ? selectedGroup[1] === "install" : false;

  // Extract dimensions from variant config (length x width x height)
  const extractDimensions = (config) => {
    try {
      const dimensionStr = config.designVariantValues[0].value;

      const dimensions = dimensionStr
        .split("x")
        .map((dim) => parseFloat(dim.trim()));

      if (dimensions.length === 3) {
        return {
          length: dimensions[0] || 20,
          width: dimensions[1] || 20,
          height: dimensions[2] || 20,
        };
      }

      return { length: 20, width: 20, height: 20 };
    } catch (error) {
      return { length: 20, width: 20, height: 20 };
    }
  };

  // Calculate shipping fee when address changes for non-installation orders
  useEffect(() => {
    const calculateCheapestShipping = async () => {
      // Only calculate shipping fee for non-installation orders
      if (isInstall || !selectedAddress || !cartDesigns?.length) {
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
      const firstItem = cartDesigns[0];
      if (!firstItem || !firstItem.fromDistrictId) {
        return;
      }

      try {
        setIsLoadingServices(true);
        setIsCalculatingShipping(true);

        // Step 1: Fetch available services
        const servicesData = {
          from_district: +firstItem.fromDistrictId,
          to_district: +selectedAddressObj.districtId,
          shop_id: 0,
        };

        const servicesResponse = await getAvailableServices(
          servicesData
        ).unwrap();
        const services = servicesResponse.data.data || [];

        if (!services.length) {
          setShippingFee(0);
          setSelectedService(null);
          return;
        }

        // Step 2: Prepare items data with dimensions
        const items = cartDesigns.map((item) => {
          const dimensions = extractDimensions(item.designIdeaVariantConfig[0]);
          return {
            name: item.name,
            quantity: item.quantity,
            height: dimensions.height,
            width: dimensions.width,
            length: dimensions.length,
            weight: 0,
          };
        });

        // Step 3: Calculate shipping fee for each service
        let cheapestService = null;
        let cheapestFee = Infinity;

        for (const service of services) {
          try {
            const shippingData = {
              from_district_id: +firstItem.fromDistrictId,
              from_ward_code: firstItem.fromWardCode,
              to_district_id: +selectedAddressObj.districtId,
              to_ward_code: selectedAddressObj.wardCode,
              service_id: service.service_id,
              service_type_id: service.service_type_id,
              insurance_value: 0,
              cod_failed_amount: 0,
              coupon: "",
              height: 0,
              length: 0,
              width: 0,
              weight: 0,
              items: items,
            };

            const response = await calculateShippingFee(shippingData).unwrap();
            const fee = response.data.data.total || 0;

            // Compare and save the cheapest option
            if (fee < cheapestFee) {
              cheapestFee = fee;
              cheapestService = { ...service, fee };
            }
          } catch (error) {
            console.error(
              `Error calculating fee for service ${service.service_id}:`,
              error
            );
          }
        }

        // Step 4: Set the selected service and fee
        if (cheapestService) {
          setSelectedService(cheapestService);
          setShippingFee(cheapestService.fee);
        } else {
          setSelectedService(null);
          setShippingFee(0);
        }
      } catch (error) {
        console.error("Error in shipping calculation process:", error);
        setSelectedService(null);
        setShippingFee(0);
      } finally {
        setIsLoadingServices(false);
        setIsCalculatingShipping(false);
      }
    };

    calculateCheapestShipping();
  }, [
    selectedAddress,
    cartDesigns,
    isInstall,
    addresses,
    calculateShippingFee,
    getAvailableServices,
  ]);

  // Helper function to get total price for the selected items
  const getSelectedDesignsTotal = () => {
    let total = 0;
    const designs = cartDesigns || [];
    designs.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Get the total order amount including shipping fee
  const getTotalAmount = () => {
    return getSelectedDesignsTotal() + shippingFee;
  };

  // Get the total quantity of items in cart
  const getTotalQuantity = () => {
    return cartDesigns?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  // Check if both woodworker and address are selected
  const canProceed =
    selectedGroup !== null &&
    selectedAddress !== null &&
    cartDesigns?.length > 0 &&
    !isCalculatingShipping &&
    !isLoadingServices &&
    (isInstall || selectedService !== null);

  // Get woodworker information from the first cart item
  const woodworkerInfo =
    cartDesigns?.length > 0
      ? {
          name: cartDesigns[0].woodworkerName,
          address: cartDesigns[0].address,
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
      if (!selectedGroup || !cartDesigns.length) {
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
      const availableServiceId = cartDesigns[0].availableServiceId;
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
        designIdeaVariantIds: cartDesigns.map((item) => ({
          designIdeaVariantId: item.designIdeaVariantId,
          quantity: item.quantity,
        })),
        address: selectedAddressObj.address,
        description: description.trim(),
        isInstall: isInstall, // Use the installation flag from selected group
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
      const response = await createCustomizeOrder(orderData).unwrap();

      if (response.code === 200) {
        // Clear cart items for this woodworker after successful order
        const woodworkerId = selectedGroup[0];
        cartDesigns.forEach((item) => {
          removeDesignFromCart(woodworkerId, item.designIdeaVariantId);
        });

        notify(
          "Đặt hàng thành công",
          "Đơn hàng của bạn đã được tạo",
          "success"
        );

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
              <Text>{formatPrice(getSelectedDesignsTotal())}</Text>
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
