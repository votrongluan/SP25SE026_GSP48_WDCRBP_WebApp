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
import useAuth from "../../hooks/useAuth.js";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart.jsx";
import { AccountCircleRounded } from "@mui/icons-material";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function AccountMenu() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    navigate("/auth");
  };

  return (
    <>
      {auth?.token ? (
        <Flex zIndex={999} alignItems="center" columnGap="20px">
          {auth?.role == "Customer" && <Cart />}
          <Box bgColor="white" color="black">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <HStack>
                  <Avatar src={auth?.avatarLink} size="sm" />
                  <Text>{auth.EmployeeName}</Text>
                </HStack>
              </MenuButton>
              <MenuList bg="white" color="black">
                <MenuItem
                  bg="white"
                  color="black"
                  as={RouterLink}
                  to={
                    auth?.role == "Woodworker" ? "/ww/profile" : "/cus/profile"
                  }
                >
                  Tài khoản
                </MenuItem>
                <MenuDivider />
                <MenuItem bg="white" color="black" onClick={handleLogout}>
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
