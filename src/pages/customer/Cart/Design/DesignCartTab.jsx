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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useCart from "../../../../hooks/useCart.js";
import useAuth from "../../../../hooks/useAuth.js";
import DesignCartItemDetail from "../../../../components/Cart/DesignCartItemDetail.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";
import { useGetUserAddressesByUserIdQuery } from "../../../../services/userAddressApi.js";
import { Link } from "react-router-dom";
import DesignOrderSummary from "./DesignOrderSummary.jsx";
import { FiCheckCircle } from "react-icons/fi";

export default function DesignCartTab() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { auth } = useAuth();

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
  }, [cart.designs]);

  // Handle woodworker selection
  const handleWoodworkerSelect = (woodworkerId) => {
    setSelectedWoodworker(woodworkerId);
  };

  // Get the currently selected woodworker's designs
  const selectedWoodworkerDesigns = selectedWoodworker
    ? cart.designs[selectedWoodworker]
    : [];

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={6}>
      {/* Cart Items List */}
      <Box flex="3" bg="white" borderRadius="md" boxShadow="md">
        {Object.keys(cart.designs).length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg">Giỏ hàng trống</Text>
            <Button mt={4} onClick={() => navigate("/")}>
              Tiếp tục mua sắm
            </Button>
          </Box>
        ) : (
          <Stack spacing={6}>
            {Object.entries(cart.designs).map(([woodworkerId, designs]) => (
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
                      Xưởng mộc: {designs?.[0]?.woodworkerName}
                    </Text>
                  </Link>
                </Flex>

                <VStack divider={<Divider />} spacing={4} align="stretch">
                  {designs.map((design) => (
                    <DesignCartItemDetail
                      key={design.designIdeaVariantId}
                      product={design}
                      type="design"
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
      {Object.keys(cart.designs).length > 0 && (
        <Box flex="1">
          <DesignOrderSummary
            auth={auth}
            selectedWoodworker={selectedWoodworker}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            cartDesigns={selectedWoodworkerDesigns}
            addresses={addresses}
            isLoadingAddresses={isLoadingAddresses}
            addressError={addressError}
          />
        </Box>
      )}
    </Flex>
  );
}
