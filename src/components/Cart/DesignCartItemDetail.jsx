import { Flex, IconButton, Image, Stack, Text, HStack } from "@chakra-ui/react";
import { Add, Delete, Remove } from "@mui/icons-material";
import useCart from "../../hooks/useCart.js";
import { formatPrice } from "../../utils/utils.js";
import ConfigDisplay from "../Utility/ConfigDisplay.jsx";
import { FiTrash2 } from "react-icons/fi";

export default function DesignCartItemDetail({ product, type, woodworkerId }) {
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
    if (type === "design" && product.quantity < MAX_QUANTITY) {
      changeDesignQuantity(
        woodworkerId,
        product.designIdeaVariantId,
        product.quantity + 1
      );
    }
  };

  const handleDecrease = () => {
    if (product.quantity > 1 && type === "design") {
      changeDesignQuantity(
        woodworkerId,
        product.designIdeaVariantId,
        product.quantity - 1
      );
    }
  };

  const handleRemove = () => {
    if (type === "design") {
      removeDesignFromCart(woodworkerId, product.designIdeaVariantId);
    }
  };

  return (
    <Stack spacing={4} width="100%">
      {/* Product Info Row */}
      <Flex gap={5}>
        <Image
          src={getImageUrl(product.img_urls)}
          alt="Image"
          boxSize="150px"
          objectFit="cover"
          borderRadius="md"
        />

        <Stack fontSize="16px" flex="1">
          <Flex justifyContent="space-between">
            <Text fontSize="18px" fontWeight="bold">
              {product.name}
            </Text>
            <IconButton
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label="Remove item"
              icon={<FiTrash2 />}
              onClick={handleRemove}
            />
          </Flex>

          {/* Config information with more space */}
          <ConfigDisplay
            config={product.designIdeaVariantConfig}
            compact={false}
          />

          <Text fontSize="16px" fontWeight="semibold" mt={1}>
            {formatPrice(product.price)}
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
                  isDisabled={product.quantity <= 1}
                  aria-label="Decrease quantity"
                />
                <Text px={3}>{product.quantity}</Text>
                <IconButton
                  size="sm"
                  color="black"
                  icon={<Add sx={{ fontSize: "14px" }} />}
                  bg="transparent"
                  _hover={{ color: "app_brown.0" }}
                  onClick={handleIncrease}
                  isDisabled={product.quantity >= MAX_QUANTITY}
                  aria-label="Increase quantity"
                />
              </Flex>
            </HStack>

            <Text fontSize="18px" fontWeight="bold" color="app_brown.2">
              {formatPrice(product.price * product.quantity)}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
}
