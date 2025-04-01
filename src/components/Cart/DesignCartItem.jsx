import { Box, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { formatPrice } from "../../utils/utils.js";
import useCart from "../../hooks/useCart.js";
import { appColorTheme } from "../../config/appconfig.js";
import { FiTrash } from "react-icons/fi";
import ConfigDisplay from "../Utility/ConfigDisplay.jsx";

export default function DesignCartItem({ item, type, woodworkerId }) {
  const { removeDesignFromCart } = useCart();

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

  const handleRemove = () => {
    if (type === "design") {
      removeDesignFromCart(woodworkerId, item.designIdeaVariantId);
    }
  };

  return (
    <Flex columnGap={5} width="100%" position="relative">
      <Image
        height="80px"
        width="80px"
        src={getImageUrl(item.img_urls)}
        objectFit="cover"
        objectPosition="center"
        borderRadius="4px"
      />
      <Box flex="1">
        <Flex justifyContent="space-between">
          <Text noOfLines={1} fontSize="16px" fontWeight="medium">
            {item.name}
          </Text>
          <IconButton
            size="sm"
            variant="ghost"
            icon={<FiTrash />}
            colorScheme="red"
            onClick={handleRemove}
            aria-label="Remove item"
          />
        </Flex>

        {/* Use the ConfigDisplay component with compact mode */}
        <ConfigDisplay config={item.designIdeaVariantConfig} compact={true} />

        <Flex justifyContent="space-between" mt={2}>
          <Text fontSize="14px">SL: {item.quantity}</Text>
          <Text color={appColorTheme.brown_2} fontSize="16px" fontWeight="bold">
            {formatPrice(item.price * item.quantity)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
