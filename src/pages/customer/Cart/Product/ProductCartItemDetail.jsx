import { Box, Flex, HStack, Image, Text, IconButton } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { Add, Remove } from "@mui/icons-material";
import { formatPrice } from "../../../../utils/utils.js";
import useCart from "../../../../hooks/useCart.js";
import { Link } from "react-router-dom";

export default function ProductCartItemDetail({ product, woodworkerId }) {
  const { changeProductQuantity, removeProductFromCart, MAX_QUANTITY } =
    useCart();

  const handleIncrease = () => {
    if (product.quantity < MAX_QUANTITY) {
      changeProductQuantity(
        woodworkerId,
        product.productId,
        product.quantity + 1
      );
    }
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      changeProductQuantity(
        woodworkerId,
        product.productId,
        product.quantity - 1
      );
    }
  };

  return (
    <Flex gap={4}>
      {/* Product image */}
      <Link to={`/product/${product.productId}`}>
        <Image
          src={
            product.mediaUrls
              ? product.mediaUrls.split(";")[0]
              : "https://via.placeholder.com/150"
          }
          alt={product.productName}
          boxSize="150px"
          objectFit="cover"
          borderRadius="md"
        />
      </Link>

      {/* Product details */}
      <Flex
        direction="column"
        justify="space-between"
        flex="1"
        minH="150px"
        gap={1}
      >
        {/* First row: name and delete button */}
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Link to={`/product/${product.productId}`}>
            <Text
              _hover={{
                textDecoration: "underline",
              }}
              fontSize="lg"
              fontWeight="bold"
              noOfLines={2}
            >
              {product.productName}
            </Text>
          </Link>

          <IconButton
            size="sm"
            variant="ghost"
            colorScheme="red"
            aria-label="Remove item"
            icon={<FiTrash2 />}
            onClick={() =>
              removeProductFromCart(woodworkerId, product.productId)
            }
          />
        </Flex>

        {/* Product specs */}
        <Box>
          <Text fontSize="sm" color="gray.600">
            Loại gỗ: {product.woodType}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Kích thước: {product.length}cm x {product.width}cm x{" "}
            {product.height}cm
          </Text>
        </Box>

        {/* Quantity Controls Row - Updated to match DesignCartItemDetail */}
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
      </Flex>
    </Flex>
  );
}
