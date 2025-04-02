import {
  Box,
  Button,
  Text,
  Flex,
  Divider,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { formatPrice } from "../../../../utils/utils.js";
import { appColorTheme } from "../../../../config/appconfig.js";
import AddressSelection from "../components/AddressSelection.jsx";
import { useCreateCustomizeOrderMutation } from "../../../../services/serviceOrderApi.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import { FiLogIn } from "react-icons/fi";
import useCart from "../../../../hooks/useCart.js";

export default function DesignOrderSummary({
  auth,
  selectedWoodworker,
  selectedAddress,
  setSelectedAddress,
  cartDesigns,
  addresses,
  isLoadingAddresses,
  addressError,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createCustomizeOrder] = useCreateCustomizeOrderMutation();
  const navigate = useNavigate();
  const notify = useNotify();
  const { removeDesignFromCart } = useCart();

  // Helper function to get total price for the selected woodworker
  const getSelectedDesignsTotal = () => {
    if (!selectedWoodworker) return 0;

    let total = 0;
    const designs = cartDesigns || [];
    designs.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Get the total quantity of items in cart
  const getTotalQuantity = () => {
    return cartDesigns?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  // Check if both woodworker and address are selected
  const canProceed =
    selectedWoodworker !== null &&
    selectedAddress !== null &&
    cartDesigns?.length > 0;

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
      };

      // Call the API
      setIsSubmitting(true);
      const response = await createCustomizeOrder(orderData).unwrap();

      if (response.code === 200) {
        // Clear cart items for this woodworker after successful order
        cartDesigns.forEach((item) => {
          removeDesignFromCart(selectedWoodworker, item.designIdeaVariantId);
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
        Tổng tiền đơn hàng
      </Text>

      {!selectedWoodworker ? (
        <Text color="gray.500" mb={4}>
          Vui lòng chọn một xưởng mộc để tiến hành đặt hàng
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

          {/* Woodworker Information Section */}
          {woodworkerInfo && (
            <Box mb={4} p={3} bg="gray.50" borderRadius="md">
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">Thông tin xưởng mộc:</Text>
                <Text>{woodworkerInfo.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {woodworkerInfo.address}
                </Text>
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

          <Divider my={4} />

          <Flex justify="space-between" mb={4}>
            <Text fontSize="lg">Tổng thanh toán:</Text>
            <Text fontSize="lg" fontWeight="bold" color="app_brown.2">
              {formatPrice(getSelectedDesignsTotal())}
            </Text>
          </Flex>
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
          isDisabled={!canProceed || getTotalQuantity() > 4}
          onClick={handlePlaceOrder}
          isLoading={isSubmitting}
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
          >
            Đăng nhập để sử dụng dịch vụ
          </Button>
        </Link>
      )}
    </Box>
  );
}
