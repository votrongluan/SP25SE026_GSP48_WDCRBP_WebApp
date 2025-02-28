import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function Product({ product }) {
  const toast = useToast();
  const { addCartItem } = useCart();

  return (
    <>
      <RouterLink to={`/products/${product.productId}`}>
        <Image
          src={product.img}
          objectFit="contain"
          objectPosition="center"
          height="250px"
          w="100%"
        />
        <Text noOfLines={1} mt="20px" mb="10px">
          {product.name}
        </Text>
        <Box width="20px" height="1px" bgColor="app_black.0"></Box>
        <Text color="app_grey.1" mt="10px">
          {product.price.toLocaleString()}
        </Text>
      </RouterLink>
      <Button
        _hover={{
          opacity: ".7",
        }}
        w="100%"
        bgColor="app_black.0"
        color="app_white.0"
        borderRadius="0"
        mt="20px"
        onClick={() => {
          addCartItem(product.employee.employeeId, product);
          toast({
            title: `${product.name} đã được thêm vào giỏ hàng`,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        }}
      >
        Thêm vào giỏ hàng
      </Button>
    </>
  );
}
