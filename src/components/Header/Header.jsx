import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import logo from "/src/assets/images/logo.jpg";
import { AccountCircleRounded, ShoppingCart } from "@mui/icons-material";
import Cart from "../Cart/Cart.jsx";
import BrandLogo from "./BrandLogo.jsx";
import AccountMenu from "./AccountMenu.jsx";
import { appColorTheme } from "../../data/globalData.js";

function Header() {
  const { auth, setAuth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const links = [
    { path: "/products", label: "Sản phẩm" },
    { path: "/designs", label: "Thiết kế" },
    { path: "/wws", label: "Thợ mộc" },
    { path: "/contact", label: "Liên hệ" },
    { path: "/about", label: "Về chúng tôi" },
  ];
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? `${appColorTheme.brown_2}` : null,
    };
  };

  const isDesktop = useBreakpointValue({
    base: false,
    xl: true,
  });

  return (
    <Box bgColor="white" color="black" zIndex="1" w="100%" padding="10px 20px">
      <Flex as="nav" height="70px" alignItems="center">
        <BrandLogo />

        <Spacer />

        {isDesktop ? (
          <>
            <HStack
              fontFamily="Montserrat"
              fontSize="16px"
              fontWeight="medium"
              spacing={6}
              borderRadius="30px"
              bgColor="app_grey.2"
              px="16px"
            >
              {links.map((link, index) => (
                <ChakraLink
                  padding="15px 8px"
                  key={index}
                  as={RouterNavLink}
                  to={link.path}
                  _hover={{ color: "app_brown.2" }}
                  transition="color 0.3s ease"
                  style={navLinkStyle}
                >
                  {link.label}
                </ChakraLink>
              ))}
            </HStack>

            <Spacer />

            <HStack>
              <AccountMenu />
            </HStack>
          </>
        ) : (
          <IconButton
            bgColor="white"
            color="white"
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={onOpen}
            _hover={{
              color: "white",
              bgColor: "black",
            }}
          />
        )}
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bgColor="app_grey.1" color="black">
            <DrawerCloseButton p={4} bgColor="white" color="black" />
            <DrawerHeader fontFamily="Montserrat" color="white" bgColor="black">
              Menu
            </DrawerHeader>
            <DrawerBody>
              <VStack alignItems="flex-start">
                {links.map((link, index) => (
                  <ChakraLink
                    key={index}
                    as={RouterNavLink}
                    to={link.path}
                    onClick={onClose}
                    py="12px"
                    pr="12px"
                    style={navLinkStyle}
                  >
                    {link.label}
                  </ChakraLink>
                ))}
                <HStack mt="12px">
                  <AccountMenu />
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default Header;
