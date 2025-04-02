import { Box, Flex, Image, Text, Tooltip, IconButton } from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { formatPrice } from "../../../../utils/utils.js";
import useCart from "../../../../hooks/useCart.js";
import { appColorTheme } from "../../../../config/appconfig.js";
import ConfigDisplay from "../../../../components/Utility/ConfigDisplay.jsx";
import { Link } from "react-router-dom";

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
    <Flex
      bgColor="white"
      boxShadow="sm"
      borderRadius="4px"
      padding={3}
      width="full"
      gap={3}
    >
      {/* Design image */}
      <Image
        src={getImageUrl(item.img_urls)}
        alt={item.name}
        height="100px"
        width="100px"
        objectFit="cover"
        borderRadius="4px"
      />

      {/* Design details */}
      <Flex flex={1} direction="column" justify="space-between">
        {/* Top row: Design name and delete button */}
        <Flex justify="space-between" align="start">
          <Box _hover={{ textDecoration: "underline" }}>
            <Link to={`/design/${item.designId}`}>
              <Text fontWeight="medium" noOfLines={1}>
                {item.name}
              </Text>
            </Link>
          </Box>

          <Tooltip label="Xóa" placement="top" hasArrow>
            <IconButton
              aria-label="Remove item"
              icon={<FiTrash />}
              size="sm"
              colorScheme="red"
              variant="ghost"
              onClick={handleRemove}
            />
          </Tooltip>
        </Flex>

        {/* Middle row: Design variant configuration */}
        <Box>
          <ConfigDisplay
            config={item.designIdeaVariantConfig}
            compact={true}
            color="gray.600"
          />
        </Box>

        {/* Bottom row: Price and quantity */}
        <Flex justify="space-between" align="center" mt={2}>
          <Text fontSize="sm">SL: {item.quantity}</Text>

          <Text fontWeight="bold" color={appColorTheme.brown_2}>
            {formatPrice(item.price)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
