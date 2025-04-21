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

  // Enhanced selection state: [woodworkerId, installType]
  const [selection, setSelection] = useState(null);
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
    setSelection(null);
  }, [cart.products]);

  // Check for selectedWoodworker in URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const preSelectedWoodworker = queryParams.get("selectedWoodworker");

    if (preSelectedWoodworker && cart.products[preSelectedWoodworker]) {
      // Initially select the first group (install or non-install) available
      const products = cart.products[preSelectedWoodworker];
      const hasInstall = products.some((product) => product.isInstall);
      const hasNonInstall = products.some((product) => !product.isInstall);

      if (hasInstall) {
        setSelection([preSelectedWoodworker, "install"]);
      } else if (hasNonInstall) {
        setSelection([preSelectedWoodworker, "non-install"]);
      }
    }
  }, [location.search, cart.products]);

  // Group products by woodworker and installation status
  const groupedProducts = Object.entries(cart.products).map(
    ([woodworkerId, products]) => {
      // Split products into install and non-install groups
      const installProducts = products.filter((product) => product.isInstall);
      const nonInstallProducts = products.filter(
        (product) => !product.isInstall
      );

      return {
        woodworkerId,
        woodworkerName: products[0]?.woodworkerName || "Unknown Woodworker",
        installProducts,
        nonInstallProducts,
      };
    }
  );

  // Handle group selection (woodworker + installation type)
  const handleGroupSelect = (woodworkerId, installType) => {
    setSelection([woodworkerId, installType]);
  };

  // Get the currently selected products based on woodworker and installation status
  const selectedProducts = selection
    ? cart.products[selection[0]]?.filter((product) =>
        selection[1] === "install" ? product.isInstall : !product.isInstall
      )
    : [];

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={6}>
      {/* CartSidebar Items List */}
      <Box flex="2" bg="white" borderRadius="md" boxShadow="md">
        {groupedProducts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg">Giỏ hàng trống</Text>
            <Button mt={4} onClick={() => navigate("/product")}>
              Tiếp tục mua sắm
            </Button>
          </Box>
        ) : (
          <Stack spacing={6}>
            {groupedProducts.map(
              ({
                woodworkerId,
                woodworkerName,
                installProducts,
                nonInstallProducts,
              }) => (
                <Box key={woodworkerId} mb={6}>
                  <Link to={`/woodworker/${woodworkerId}`}>
                    <Text
                      color={appColorTheme.brown_2}
                      fontWeight="bold"
                      fontSize="xl"
                      _hover={{ textDecoration: "underline" }}
                      px={4}
                      pt={4}
                    >
                      Xưởng mộc: {woodworkerName}
                    </Text>
                  </Link>

                  {/* Installation required items */}
                  {installProducts.length > 0 && (
                    <Box
                      bg={
                        selection &&
                        selection[0] === woodworkerId &&
                        selection[1] === "install"
                          ? "gray.50"
                          : "white"
                      }
                      borderRadius="md"
                      p={4}
                      borderWidth="1px"
                      borderColor={
                        selection &&
                        selection[0] === woodworkerId &&
                        selection[1] === "install"
                          ? "green.500"
                          : "gray.200"
                      }
                      cursor="pointer"
                      onClick={() => handleGroupSelect(woodworkerId, "install")}
                      _hover={{
                        borderColor:
                          selection &&
                          selection[0] === woodworkerId &&
                          selection[1] === "install"
                            ? "green.500"
                            : "gray.300",
                      }}
                      position="relative"
                      mt={4}
                    >
                      {selection &&
                        selection[0] === woodworkerId &&
                        selection[1] === "install" && (
                          <Icon
                            as={FiCheckCircle}
                            position="absolute"
                            top={4}
                            left={4}
                            color="green.500"
                            boxSize={6}
                          />
                        )}

                      <Flex alignItems="center" mb={2} pl={10}>
                        <Text fontWeight="semibold">Cần lắp đặt</Text>
                      </Flex>

                      <VStack divider={<Divider />} spacing={4} align="stretch">
                        {installProducts.map((product) => (
                          <ProductCartItemDetail
                            key={product.productId}
                            product={product}
                            woodworkerId={woodworkerId}
                          />
                        ))}
                      </VStack>
                    </Box>
                  )}

                  {/* No installation required items */}
                  {nonInstallProducts.length > 0 && (
                    <Box
                      bg={
                        selection &&
                        selection[0] === woodworkerId &&
                        selection[1] === "non-install"
                          ? "gray.50"
                          : "white"
                      }
                      borderRadius="md"
                      p={4}
                      borderWidth="1px"
                      borderColor={
                        selection &&
                        selection[0] === woodworkerId &&
                        selection[1] === "non-install"
                          ? "green.500"
                          : "gray.200"
                      }
                      cursor="pointer"
                      onClick={() =>
                        handleGroupSelect(woodworkerId, "non-install")
                      }
                      _hover={{
                        borderColor:
                          selection &&
                          selection[0] === woodworkerId &&
                          selection[1] === "non-install"
                            ? "green.500"
                            : "gray.300",
                      }}
                      position="relative"
                      mt={4}
                    >
                      {selection &&
                        selection[0] === woodworkerId &&
                        selection[1] === "non-install" && (
                          <Icon
                            as={FiCheckCircle}
                            position="absolute"
                            top={4}
                            left={4}
                            color="green.500"
                            boxSize={6}
                          />
                        )}

                      <Flex alignItems="center" mb={2} pl={10}>
                        <Text fontWeight="semibold">Không cần lắp đặt</Text>
                      </Flex>

                      <VStack divider={<Divider />} spacing={4} align="stretch">
                        {nonInstallProducts.map((product) => (
                          <ProductCartItemDetail
                            key={product.productId}
                            product={product}
                            woodworkerId={woodworkerId}
                          />
                        ))}
                      </VStack>
                    </Box>
                  )}
                </Box>
              )
            )}
          </Stack>
        )}
      </Box>

      {/* Order Summary */}
      {groupedProducts.length > 0 && (
        <Box flex="1">
          <ProductOrderSummary
            auth={auth}
            selectedGroup={selection}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            cartProducts={selectedProducts}
            addresses={addresses}
            isLoadingAddresses={isLoadingAddresses}
            addressError={addressError}
          />
        </Box>
      )}
    </Flex>
  );
}
