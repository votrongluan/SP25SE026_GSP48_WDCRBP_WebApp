import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function CartItem({ product }) {
  return (
    <>
      <Flex columnGap={4}>
        <Image
          height="80px"
          width="80px"
          src={product.img}
          objectFit="cover"
          objectPosition="center"
        />
        <Box>
          <Text noOfLines={1} fontSize="16px">
            {product.name}
          </Text>
          <Text fontSize="16px" fontWeight="bold">
            {product.price * product.quantity}
          </Text>
          <Text>Số lượng: {product.quantity}</Text>
        </Box>
      </Flex>
    </>
  );
}
