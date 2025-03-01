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
import useAuth from "../hooks/useAuth.js";
import logo from "/src/assets/images/logo.jpg";
import { AccountCircleRounded, ShoppingCart } from "@mui/icons-material";
import Cart from "./Cart.jsx";
import BrandLogo from "./BrandLogo.jsx";
import AccountMenu from "./AccountMenu.jsx";

function Header() {
  const { auth, setAuth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const links = [
    { path: "/products", label: "Lorem" },
    { path: "/print", label: "Lorem" },
    { path: "/personalized", label: "Lorem" },
    { path: "/material", label: "Lorem" },
    { path: "/contact", label: "Lorem" },
    { path: "/about", label: "Lorem" },
  ];
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "#3A6AFD" : null,
    };
  };

  const isDesktop = useBreakpointValue({
    base: false,
    xl: true,
  });

  return (
    <Box
      bgColor="app_grey.0"
      color="app_black.0"
      zIndex="1"
      w="100%"
      padding="10px 20px"
    >
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
              bgColor="app_white.0"
              px="16px"
            >
              {links.map((link, index) => (
                <ChakraLink
                  padding="15px 8px"
                  key={index}
                  as={RouterNavLink}
                  to={link.path}
                  _hover={{ color: "app_brown.0" }}
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
            bgColor="app_white.0"
            color="white"
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={onOpen}
            _hover={{
              color: "app_white.0",
              bgColor: "app_black.0",
            }}
          />
        )}
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bgColor="app_grey.0" color="app_black.0">
            <DrawerCloseButton
              p={4}
              bgColor="app_white.0"
              color="app_black.0"
            />
            <DrawerHeader
              fontFamily="Montserrat"
              color="app_white.0"
              bgColor="app_black.0"
            >
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
