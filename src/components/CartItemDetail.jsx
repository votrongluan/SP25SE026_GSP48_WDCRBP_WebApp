import {
  Flex,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Add, Delete, Remove } from "@mui/icons-material";
import useCart from "../hooks/useCart"; // Using custom hook for cart

export default function CartItemDetail({ product }) {
  const { changeQuantity, removeCartItem } = useCart(); // Get cart functions from context

  const handleIncrease = () => {
    // Pass both employeeId and productId when changing quantity
    changeQuantity(
      product.employee.employeeId,
      product.productId,
      product.quantity + 1
    );
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      // Pass both employeeId and productId when changing quantity
      changeQuantity(
        product.employee.employeeId,
        product.productId,
        product.quantity - 1
      );
    }
  };

  const handleRemove = () => {
    // Pass both employeeId and productId when removing the item
    removeCartItem(product.employee.employeeId, product.productId);
  };

  return (
    <Flex
      flexDirection={{
        base: "column",
        sm: "row",
      }}
      borderBottom="1px solid rgba(256,256,256,0.4)"
      py="20px"
    >
      <Image
        src={product.img}
        w="100px"
        h="150px"
        objectFit="contain"
        objectPosition="center"
      />

      <Stack fontSize="16px" ml="20px">
        <Text fontSize="16px">{product.name}</Text>
        <Text fontSize="16px">{product.price.toLocaleString()}đ</Text>
      </Stack>

      <Spacer />

      <Flex
        flexDirection={{
          base: "column",
          xl: "row",
        }}
        columnGap="40px"
        rowGap="20px"
        height="fit-content"
        alignItems="center"
      >
        <Flex alignItems="center" height="fit-content" border="solid 1px white">
          <IconButton
            p={5}
            color="app_black.0"
            icon={<Remove sx={{ fontSize: "16px" }} />}
            bg="transparent"
            _hover={{ color: "app_brown.0" }}
            onClick={handleDecrease} // Decrease quantity
          />
          <Text px="10px">{product.quantity}</Text>
          <IconButton
            p={5}
            color="app_black.0"
            icon={<Add sx={{ fontSize: "16px" }} />}
            bg="transparent"
            _hover={{ color: "app_brown.0" }}
            onClick={handleIncrease} // Increase quantity
          />
        </Flex>

        <Text width="100px" fontSize="16px">
          {(product.price * product.quantity).toLocaleString()}đ
        </Text>

        <IconButton
          p={5}
          color="app_black.0"
          icon={<Delete sx={{ fontSize: "16px" }} />}
          bg="transparent"
          _hover={{ color: "app_brown.0" }}
          onClick={handleRemove} // Remove item
        />
      </Flex>
    </Flex>
  );
}
