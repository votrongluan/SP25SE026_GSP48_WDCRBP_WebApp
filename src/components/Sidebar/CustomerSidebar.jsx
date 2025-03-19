import {
  Box,
  Flex,
  Icon,
  List,
  ListItem,
  IconButton,
  Text,
  useBreakpointValue,
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
import { useEffect } from "react";

export default function CustomerSidebar({ isCollapsed, setIsCollapsed }) {
  const isLargeScreen = useBreakpointValue({ base: false, xl: true });

  useEffect(() => {
    if (!isLargeScreen) {
      setIsCollapsed(true);
    }
  }, [isLargeScreen, setIsCollapsed]);

  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    color: isActive ? appColorTheme.brown_1 : null,
    fontWeight: isActive ? "500" : null,
    cursor: "pointer",
  });

  const navItems = [
    { label: "Trang chủ", path: "/", icon: FiHome },
    { label: "Đơn hàng", path: "order-detail", icon: FiShoppingCart },
    { label: "BH & Sữa chữa", path: "guarantee", icon: FiSettings },
    { label: "Giao dịch", path: "transaction", icon: FiCreditCard },
    { label: "Khiếu nại", path: "complaint", icon: FiAlertTriangle },
    { label: "Tài khoản", path: "account", icon: FiUser },
    { label: "Đăng xuất", path: "/logout", icon: FiLogOut },
  ];

  return (
    <Box mt={5} position="relative">
      <IconButton
        position="absolute"
        top="50%"
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
