import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useCart from "../../../../hooks/useCart.js";
import useAuth from "../../../../hooks/useAuth.js";
import ProductCartItemDetail from "./ProductCartItemDetail.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";
import { useGetUserAddressesByUserIdQuery } from "../../../../services/userAddressApi.js";
import { Link } from "react-router-dom";
import ProductOrderSummary from "./ProductOrderSummary.jsx";
import { FiCheckCircle } from "react-icons/fi";

export default function ProductCartTab() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();

  // State to track which woodworker is selected for checkout (single selection)
  const [selectedWoodworker, setSelectedWoodworker] = useState(null);
  // State to track which address is selected
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Fetch user addresses
  const {
    data: addressesResponse,
    isLoading: isLoadingAddresses,
    error: addressError,
  } = useGetUserAddressesByUserIdQuery(auth?.userId, {
    skip: !auth?.userId,
  });

  const addresses = addressesResponse?.data || [];

  // Reset selection when cart changes
  useEffect(() => {
    setSelectedWoodworker(null);
  }, [cart.products]);

  // Check for selectedWoodworker in URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const preSelectedWoodworker = queryParams.get("selectedWoodworker");

    if (preSelectedWoodworker && cart.products[preSelectedWoodworker]) {
      setSelectedWoodworker(preSelectedWoodworker);
    }
  }, [location.search, cart.products]);

  // Handle woodworker selection
  const handleWoodworkerSelect = (woodworkerId) => {
    setSelectedWoodworker(woodworkerId);
  };

  // Get the currently selected woodworker's products
  const selectedWoodworkerProducts = selectedWoodworker
    ? cart.products[selectedWoodworker]
    : [];

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={6}>
      {/* CartSidebar Items List */}
      <Box flex="2" bg="white" borderRadius="md" boxShadow="md">
        {Object.keys(cart.products).length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg">Giỏ hàng trống</Text>
            <Button mt={4} onClick={() => navigate("/product")}>
              Tiếp tục mua sắm
            </Button>
          </Box>
        ) : (
          <Stack spacing={6}>
            {Object.entries(cart.products).map(([woodworkerId, products]) => (
              <Box
                key={woodworkerId}
                bg={selectedWoodworker === woodworkerId ? "gray.50" : "white"}
                borderRadius="md"
                p={4}
                borderWidth="1px"
                borderColor={
                  selectedWoodworker === woodworkerId ? "green.500" : "gray.200"
                }
                cursor="pointer"
                onClick={() => handleWoodworkerSelect(woodworkerId)}
                _hover={{
                  borderColor:
                    selectedWoodworker === woodworkerId
                      ? "green.500"
                      : "gray.300",
                }}
                position="relative"
              >
                {selectedWoodworker === woodworkerId && (
                  <Icon
                    as={FiCheckCircle}
                    position="absolute"
                    top={4}
                    left={4}
                    color="green.500"
                    boxSize={6}
                  />
                )}

                <Flex alignItems="center" mb={4} pl={10}>
                  {selectedWoodworker != woodworkerId && (
                    <Icon
                      as={FiCheckCircle}
                      position="absolute"
                      top={4}
                      left={4}
                      color="grey.500"
                      boxSize={6}
                    />
                  )}

                  <Link to={`/woodworker/${woodworkerId}`}>
                    <Text
                      color={appColorTheme.brown_2}
                      fontWeight="bold"
                      fontSize="xl"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Xưởng mộc: {products?.[0]?.woodworkerName}
                    </Text>
                  </Link>
                </Flex>

                <VStack divider={<Divider />} spacing={4} align="stretch">
                  {products.map((product) => (
                    <ProductCartItemDetail
                      key={product.productId}
                      product={product}
                      woodworkerId={woodworkerId}
                    />
                  ))}
                </VStack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Order Summary */}
      {Object.keys(cart.products).length > 0 && (
        <Box flex="1">
          <ProductOrderSummary
            auth={auth}
            selectedWoodworker={selectedWoodworker}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            cartProducts={selectedWoodworkerProducts}
            addresses={addresses}
            isLoadingAddresses={isLoadingAddresses}
            addressError={addressError}
          />
        </Box>
      )}
    </Flex>
  );
}
