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
  VStack,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth.js";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import CartSidebar from "../../pages/customer/Cart/ManagePage/CartSidebar.jsx";
import { AccountCircleRounded } from "@mui/icons-material";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiLogOut, FiUsers } from "react-icons/fi";
import PublicProfileSwitch from "./PublicProfileSwitch.jsx";
import { appColorTheme } from "../../config/appconfig.js";

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
        <Flex zIndex={2} alignItems="center" columnGap="20px">
          {auth?.role == "Customer" && <CartSidebar />}

          {auth?.role == "Woodworker" && (
            <VStack alignItems={"start"}>
              <PublicProfileSwitch />
              <Link to={`/woodworker/${auth?.wwId}`}>
                <Text
                  _hover={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: `${appColorTheme.brown_2}`,
                  }}
                >
                  Xem xưởng của bạn
                </Text>
              </Link>
            </VStack>
          )}

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
                  to={(function getNavLinkBaseOnRole() {
                    switch (auth?.role) {
                      case "Woodworker":
                        return "/ww/profile";
                      case "Customer":
                        return "/cus/profile";
                      case "Staff":
                        return "/staff";
                      case "Admin":
                        return "/ad";
                      case "Moderator":
                        return "/mod";
                      default:
                        return "/auth";
                    }
                  })()}
                >
                  <HStack>
                    <FiUsers />
                    <Text>Quản lý thông tin</Text>
                  </HStack>
                </MenuItem>
                <MenuDivider />
                <MenuItem bg="white" color="black" onClick={handleLogout}>
                  <HStack>
                    <FiLogOut />
                    <Text>Đăng xuất</Text>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      ) : (
        <Flex alignItems="center" columnGap="20px">
          <CartSidebar />
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
