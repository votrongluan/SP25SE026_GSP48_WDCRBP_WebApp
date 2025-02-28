import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  VStack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ShoppingCart } from "@mui/icons-material";
import { NavLink as RouterNavLink } from "react-router-dom";
import CartItem from "./CartItem";
import useCart from "../hooks/useCart";

export default function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCartLength, getCart, getNameById } = useCart();
  const cart = getCart(); // Fetch the cart data with employeeId and products array

  return (
    <>
      <Flex
        onClick={onOpen}
        cursor="pointer"
        alignItems="center"
        position="relative"
      >
        <ShoppingCart sx={{ fontSize: "30px" }} />
        <Text
          bgColor="app_white.0"
          color="app_black.0"
          padding="3px"
          borderRadius="10px"
          fontWeight="bold"
          fontSize="12px"
          top="-5px"
          right="-10px"
          position="absolute"
        >
          {getCartLength()}
        </Text>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          fontFamily="Nunito Sans"
          position="relative"
          bgColor="app_grey.0"
          color="app_black.0"
        >
          <DrawerCloseButton p={4} bgColor="app_white.0" color="app_black.0" />
          <DrawerHeader
            fontFamily="Montserrat"
            color="app_white.0"
            bgColor="app_black.0"
          >
            Giỏ hàng
          </DrawerHeader>

          <DrawerBody p="20px">
            {/* Loop through the cart array */}
            {cart.map((employeeCart, index) => (
              <VStack
                key={employeeCart.employeeId || index}
                alignItems="flex-start"
                spacing="20px"
              >
                <Text fontWeight="bold" fontSize="18px">
                  Nhà cung cấp: {getNameById(employeeCart.employeeId)}
                </Text>

                {/* Display the products for this employeeId */}
                {employeeCart.products.map((product) => (
                  <CartItem product={product} key={product.productId} />
                ))}
              </VStack>
            ))}

            <Button
              _hover={{
                backgroundColor: "app_white.0",
                color: "app_black.0",
              }}
              px="40px"
              py="25px"
              bgColor="app_brown.0"
              color="app_black.0"
              mt="40px"
              zIndex="1"
              position="absolute"
              bottom="20px"
              left="20px"
              right="20px"
              as={RouterNavLink}
              to="/cart"
              onClick={onClose}
            >
              Xem giỏ hàng
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
