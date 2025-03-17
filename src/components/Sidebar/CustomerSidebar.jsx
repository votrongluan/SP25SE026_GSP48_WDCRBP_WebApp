import {
  Box,
  Flex,
  Icon,
  List,
  ListItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    color: isActive ? appColorTheme.brown_1 : null,
    fontWeight: isActive ? "500" : null,
    cursor: "pointer",
  });

  const navItems = [
    { label: "Trang chủ", path: "/", icon: FiHome },
    { label: "Đơn hàng", path: "order-detail", icon: FiShoppingCart },
    { label: "Bảo hành, sửa chữa", path: "guarantee", icon: FiSettings },
    { label: "Giao dịch", path: "transaction", icon: FiCreditCard },
    { label: "Khiếu nại", path: "complaint", icon: FiAlertTriangle },
    { label: "Tài khoản", path: "account", icon: FiUser },
    { label: "Đăng xuất", path: "/logout", icon: FiLogOut },
  ];

  return (
    <Box position="relative">
      <IconButton
        position="absolute"
        bottom="0"
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
            p={0}
            key={index}
            transition="margin ease 0.3s"
            _hover={{
              color: "app_brown.1",
              ml: "8px",
            }}
          >
            <NavLink style={navLinkStyle} to={item.path}>
              {isCollapsed ? (
                <Flex justifyContent="center" align="center" gap={2}>
                  <Icon as={item.icon} />
                </Flex>
              ) : (
                <Flex align="center" gap={2}>
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
