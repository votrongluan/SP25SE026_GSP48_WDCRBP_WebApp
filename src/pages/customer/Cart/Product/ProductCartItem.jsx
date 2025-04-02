import { Box, Flex, Image, Text, Tooltip, IconButton } from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { formatPrice } from "../../utils/utils";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { appColorTheme } from "../../config/appconfig";

export default function ProductCartItem({ item, woodworkerId }) {
  const { removeProductFromCart } = useCart();

  return (
    <Flex
      bgColor="white"
      boxShadow="sm"
      borderRadius="4px"
      padding={3}
      width="full"
      gap={3}
    >
      {/* Product image */}
      <Link to={`/product/${item.productId}`}>
        <Image
          src={
            item.mediaUrls && item.mediaUrls.includes(";")
              ? item.mediaUrls.split(";")[0]
              : item.mediaUrls || "https://via.placeholder.com/100"
          }
          alt={item.productName}
          height="100px"
          width="100px"
          objectFit="cover"
          borderRadius="4px"
        />
      </Link>

      {/* Product details */}
      <Flex flex={1} direction="column" justify="space-between">
        {/* Top row: Product name and delete button */}
        <Flex justify="space-between" align="start">
          <Box>
            <Link to={`/product/${item.productId}`}>
              <Text fontWeight="medium" noOfLines={1}>
                {item.productName}
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
              onClick={() =>
                removeProductFromCart(woodworkerId, item.productId)
              }
            />
          </Tooltip>
        </Flex>

        {/* Middle row: additional details */}
        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {item.woodType}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {item.length}cm x {item.width}cm x {item.height}cm
        </Text>

        {/* Bottom row: Price and quantity controls */}
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
