import {
  Box,
  Flex,
  Icon,
  List,
  ListItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  FiAlertTriangle,
  FiCreditCard,
  FiLogOut,
  FiSettings,
  FiShoppingCart,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";
import { appColorTheme } from "../../config/appconfig.js";

export default function CustomerSidebar({ isCollapsed, setIsCollapsed }) {
  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    color: isActive ? appColorTheme.brown_1 : null,
    fontWeight: isActive ? "bold" : null,
    cursor: "pointer",
  });

  const navItems = [
    { label: "Trang chủ", path: "/", icon: FiHome },
    { label: "Đơn hàng", path: "service-order", icon: FiShoppingCart },
    { label: "BH & Sữa chữa", path: "guarantee-order", icon: FiSettings },
    { label: "Ví", path: "wallet", icon: FiCreditCard },
    { label: "Khiếu nại", path: "complaint", icon: FiAlertTriangle },
    { label: "Hồ sơ", path: "profile", icon: FiUser },
    { label: "Đăng xuất", path: "/logout", icon: FiLogOut },
  ];

  return (
    <Box position="relative">
      <IconButton
        position="absolute"
        top="0"
        right="-35px"
        size="sm"
        variant="ghost"
        bg="black"
        color="white"
        borderRadius="full"
        icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      />

      <List>
        {navItems.map((item, index) => (
          <ListItem
            overflowY="auto"
            height="65px"
            fontSize="1.2rem"
            key={index}
            transition="margin ease 0.3s"
            _hover={{
              color: "app_brown.1",
              ml: 2,
            }}
          >
            <NavLink style={navLinkStyle} to={item.path}>
              {isCollapsed ? (
                <Flex p={3} justifyContent="center" align="center" gap={2}>
                  <Icon as={item.icon} />
                </Flex>
              ) : (
                <Flex
                  bgColor={appColorTheme.grey_0}
                  p={4}
                  align="center"
                  gap={2}
                  borderRadius="20px"
                >
                  <Icon as={item.icon} />
                  <Text>{item.label}</Text>
                </Flex>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
