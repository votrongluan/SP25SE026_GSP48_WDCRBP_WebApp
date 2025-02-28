import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth.js";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx";
import { AccountCircleRounded } from "@mui/icons-material";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function AccountMenu() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth and redirect to login page
    setAuth(null);
    navigate("/auth");
  };

  return (
    <>
      {auth?.token ? (
        <Flex zIndex={999} alignItems="center" columnGap="20px">
          <Cart />
          <Box bgColor="app_white.0" color="app_black.0">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <HStack>
                  <Avatar src={auth?.avatarLink} size="sm" />
                  <Text>{auth.EmployeeName}</Text>
                </HStack>
              </MenuButton>
              <MenuList bg="app_white.0" color="app_black.0">
                <MenuItem
                  bg="app_white.0"
                  color="app_black.0"
                  as={RouterLink}
                  to="/account"
                >
                  Tài khoản
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  bg="app_white.0"
                  color="app_black.0"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      ) : (
        <Flex alignItems="center" columnGap="20px">
          <Cart />
          <RouterLink to="auth">
            <Flex fontSize="18px" alignItems="center" columnGap={3}>
              <AccountCircleRounded sx={{ fontSize: "30px" }} />
              <Text transition="opacity 0.3s ease" _hover={{ opacity: ".66" }}>
                Đăng nhập
              </Text>
            </Flex>
          </RouterLink>
        </Flex>
      )}
    </>
  );
}
