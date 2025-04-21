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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Divider,
} from "@chakra-ui/react";
import { ShoppingCart } from "@mui/icons-material";
import { NavLink as RouterNavLink } from "react-router-dom";
import DesignCartItem from "../Design/DesignCartItem.jsx";
import ProductCartItem from "../Product/ProductCartItem.jsx";
import useCart from "../../../../hooks/useCart.js";
import { useState } from "react";

export default function CartSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart, getCartItemCount } = useCart();
  const [tabIndex, setTabIndex] = useState(0);

  // Function to determine the link based on active tab
  const getCartPageLink = () => {
    return tabIndex === 0 ? "/cart?tab=design" : "/cart?tab=product";
  };

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
          bgColor="white"
          color="black"
          padding="3px"
          borderRadius="10px"
          fontWeight="bold"
          fontSize="12px"
          top="-5px"
          right="-10px"
          position="absolute"
        >
          {getCartItemCount()}
        </Text>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent
          fontFamily="Nunito Sans"
          position="relative"
          bgColor="app_grey.1"
          color="black"
        >
          <DrawerCloseButton p={5} bgColor="white" color="black" />
          <DrawerHeader fontFamily="Montserrat" color="white" bgColor="black">
            Giỏ hàng
          </DrawerHeader>

          <DrawerBody p={0}>
            <Tabs onChange={(index) => setTabIndex(index)} index={tabIndex}>
              <TabList mb="1em">
                <Tab
                  _selected={{
                    color: "app_brown.2",
                    borderColor: "app_brown.2",
                  }}
                >
                  Thiết kế
                </Tab>
                <Tab
                  _selected={{
                    color: "app_brown.2",
                    borderColor: "app_brown.2",
                  }}
                >
                  Sản phẩm
                </Tab>
              </TabList>

              <TabPanels px={4}>
                {/* Designs Tab */}
                <TabPanel p={0}>
                  {Object.keys(cart.designs).length === 0 ? (
                    <Box textAlign="center" py={10}>
                      <Text>Không có thiết kế trong giỏ hàng</Text>
                    </Box>
                  ) : (
                    Object.entries(cart.designs).map(
                      ([woodworkerId, designs]) => (
                        <VStack
                          key={woodworkerId}
                          alignItems="flex-start"
                          spacing="20px"
                          mb={6}
                        >
                          <Text fontWeight="bold" fontSize="18px">
                            Xưởng mộc: {designs?.[0]?.woodworkerName}
                          </Text>

                          {designs.map((design) => (
                            <DesignCartItem
                              key={design.designIdeaVariantId}
                              item={design}
                              type="design"
                              woodworkerId={woodworkerId}
                            />
                          ))}
                          <Divider />
                        </VStack>
                      )
                    )
                  )}
                </TabPanel>

                {/* Products Tab */}
                <TabPanel p={0}>
                  {Object.keys(cart.products).length === 0 ? (
                    <Box textAlign="center" py={10}>
                      <Text>Không có sản phẩm trong giỏ hàng</Text>
                    </Box>
                  ) : (
                    Object.entries(cart.products).map(
                      ([woodworkerId, products]) => (
                        <VStack
                          key={woodworkerId}
                          alignItems="flex-start"
                          spacing="20px"
                          mb={6}
                        >
                          <Text fontWeight="bold" fontSize="18px">
                            Xưởng mộc: {products?.[0]?.woodworkerName}
                          </Text>

                          {products.map((product) => (
                            <ProductCartItem
                              key={product.productId}
                              item={product}
                              woodworkerId={woodworkerId}
                            />
                          ))}
                          <Divider />
                        </VStack>
                      )
                    )
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Button
              _hover={{
                backgroundColor: "app_brown.1",
                color: "white",
              }}
              px="40px"
              py="25px"
              bgColor="app_brown.2"
              color="white"
              mt="40px"
              zIndex="1"
              position="absolute"
              bottom="20px"
              left="20px"
              right="20px"
              as={RouterNavLink}
              to={getCartPageLink()}
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
