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
} from "@chakra-ui/react";
import { formatPrice } from "../../../../utils/utils.js";
import { appColorTheme } from "../../../../config/appconfig.js";
import AddressSelection from "../components/AddressSelection.jsx";
import { useCreateProductOrderMutation } from "../../../../services/productOrderApi.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotify } from "../../../../components/Utility/Notify.jsx";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";

export default function ProductOrderSummary({
  auth,
  selectedWoodworker,
  selectedAddress,
  setSelectedAddress,
  cartProducts,
  addresses,
  isLoadingAddresses,
  addressError,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [createProductOrder] = useCreateProductOrderMutation();
  const navigate = useNavigate();
  const notify = useNotify();

  // Helper function to get total price for the selected woodworker
  const getSelectedProductsTotal = () => {
    if (!selectedWoodworker) return 0;

    let total = 0;
    const products = cartProducts || [];
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  // Get the total quantity of items in cart
  const getTotalQuantity = () => {
    return cartProducts?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  // Check if both woodworker and address are selected
  const canProceed =
    selectedWoodworker !== null &&
    selectedAddress !== null &&
    cartProducts?.length > 0;

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

      // Prepare request data
      const selectedAddressObj = addresses.find(
        (addr) => addr.userAddressId.toString() === selectedAddress
      );

      if (!selectedAddressObj) {
        notify("Lỗi", "Không tìm thấy thông tin địa chỉ.", "error");
        return;
      }

      const orderData = {
        userId: auth.userId,
        productItems: cartProducts.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        address: selectedAddressObj.address,
        woodworkerId: selectedWoodworker,
        description: description.trim(), // Include the description in the API request
      };

      // Call the API
      setIsSubmitting(true);
      const response = await createProductOrder(orderData).unwrap();

      if (response.code === 200) {
        notify(
          "Đặt hàng thành công",
          "Đơn hàng của bạn đã được tạo",
          "success"
        );
        // Redirect to orders page or show success message
        navigate("/cus/product-orders");
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

          <Flex justify="space-between" mb={4}>
            <Text fontSize="lg">Tổng thanh toán:</Text>
            <Text fontSize="lg" fontWeight="bold" color="app_brown.2">
              {formatPrice(getSelectedProductsTotal())}
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
          >
            Đăng nhập để sử dụng dịch vụ
          </Button>
        </Link>
      )}
    </Box>
  );
}
