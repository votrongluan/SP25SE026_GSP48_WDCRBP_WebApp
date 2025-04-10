import { Flex, IconButton, Image, Stack, Text, HStack } from "@chakra-ui/react";
import { Add, Remove } from "@mui/icons-material";
import useCart from "../../../../hooks/useCart.js";
import { formatPrice } from "../../../../utils/utils.js";
import ConfigDisplay from "../../../../components/Utility/ConfigDisplay.jsx";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function DesignCartItemDetail({ design, type, woodworkerId }) {
  const { changeDesignQuantity, removeDesignFromCart, MAX_QUANTITY } =
    useCart();

  // Get the first image URL if there are multiple
  const getImageUrl = (imgUrls) => {
    if (!imgUrls) return "";
    if (typeof imgUrls === "string") {
      // Handle comma-separated string of URLs
      const urlArray = imgUrls.split(",");
      return urlArray[0].trim();
    }
    return imgUrls;
  };

  const handleIncrease = () => {
    if (type === "design" && design.quantity < MAX_QUANTITY) {
      changeDesignQuantity(
        woodworkerId,
        design.designIdeaVariantId,
        design.quantity + 1
      );
    }
  };

  const handleDecrease = () => {
    if (design.quantity > 1 && type === "design") {
      changeDesignQuantity(
        woodworkerId,
        design.designIdeaVariantId,
        design.quantity - 1
      );
    }
  };

  const handleRemove = () => {
    if (type === "design") {
      removeDesignFromCart(woodworkerId, design.designIdeaVariantId);
    }
  };

  return (
    <Stack spacing={4} width="100%">
      {/* design Info Row */}
      <Flex gap={5}>
        <Image
          src={getImageUrl(design.img_urls)}
          alt="Image"
          boxSize="150px"
          objectFit="cover"
          borderRadius="md"
        />

        <Stack fontSize="16px" flex="1">
          <Flex justifyContent="space-between">
            <Link to={`/design/${design.designId}`}>
              <Text
                _hover={{
                  textDecoration: "underline",
                }}
                fontSize="lg"
                fontWeight="bold"
                noOfLines={2}
              >
                {design.name}
              </Text>
            </Link>
            <IconButton
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label="Remove item"
              icon={<FiTrash2 />}
              onClick={handleRemove}
            />
          </Flex>

          {/* Installation status badge */}
          {design.isInstall ? (
            <HStack>
              <Text fontSize="sm" color="blue.600">
                Cần lắp đặt
              </Text>
            </HStack>
          ) : (
            <Text fontSize="sm" color="orange.600">
              Không cần lắp đặt
            </Text>
          )}

          {/* Config information with more space */}
          <ConfigDisplay
            config={design.designIdeaVariantConfig}
            compact={false}
          />

          <Text fontSize="16px" fontWeight="semibold" mt={1}>
            {formatPrice(design.price)}
          </Text>

          {/* Quantity Controls Row */}
          <Flex justifyContent="space-between" alignItems="center" pt={2}>
            <HStack spacing={4}>
              <Text fontSize="sm" color="gray.600">
                Số lượng:
              </Text>
              <Flex
                alignItems="center"
                height="fit-content"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
              >
                <IconButton
                  size="sm"
                  color="black"
                  icon={<Remove sx={{ fontSize: "14px" }} />}
                  bg="transparent"
                  _hover={{ color: "app_brown.0" }}
                  onClick={handleDecrease}
                  isDisabled={design.quantity <= 1}
                  aria-label="Decrease quantity"
                />
                <Text px={3}>{design.quantity}</Text>
                <IconButton
                  size="sm"
                  color="black"
                  icon={<Add sx={{ fontSize: "14px" }} />}
                  bg="transparent"
                  _hover={{ color: "app_brown.0" }}
                  onClick={handleIncrease}
                  isDisabled={design.quantity >= MAX_QUANTITY}
                  aria-label="Increase quantity"
                />
              </Flex>
            </HStack>

            <Text fontSize="18px" fontWeight="bold" color="app_brown.2">
              {formatPrice(design.price * design.quantity)}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
}
