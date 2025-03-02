import { Box, Flex, Icon, List, ListItem } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import BrandLogo from "../Header/BrandLogo.jsx";
import {
  FiCreditCard,
  FiGrid,
  FiLogOut,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { appColorTheme } from "../../data/globalData.js";

export default function WoodworkerSideBar() {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }) => {
    return {
      display: "block",
      color: isActive ? appColorTheme.brown_1 : null,
      fontWeight: isActive ? "500" : null,
      paddingTop: "20px",
      paddingBottom: "20px",
      cursor: "pointer",
      borderBottom: isActive ? `1px solid ${appColorTheme.black_0}` : null,
    };
  };

  const navItems = [
    { label: "Tổng quan", path: "dashboard", icon: FiGrid },
    { label: "Đơn hàng", path: "order-detail", icon: FiShoppingCart },
    { label: "Ví", path: "print", icon: FiCreditCard },
    { label: "Tài khoản", path: "account", icon: FiUser },
  ];

  return (
    <>
      <BrandLogo />

      <List mt="20px" fontSize="1.2em">
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            transition="margin ease 0.3s"
            _hover={{
              color: "app_brown.1",
              ml: "8px",
            }}
          >
            <NavLink style={navLinkStyle} to={item.path}>
              <Flex align="center" gap={2}>
                <Icon as={item.icon} />
                {item.label}
              </Flex>
            </NavLink>
          </ListItem>
        ))}

        {/* Logout Item */}
        <ListItem
          transition="margin ease 0.3s"
          _hover={{
            color: "app_brown.1",
            ml: "8px",
          }}
        >
          <Box
            onClick={() => {
              setAuth(null);
              navigate("/auth");
            }}
            style={navLinkStyle(false)}
          >
            <Flex align="center" gap={2}>
              <Icon as={FiLogOut} />
              Đăng xuất
            </Flex>
          </Box>
        </ListItem>
      </List>
    </>
  );
}
