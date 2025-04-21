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
  FiShoppingCart,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiTool,
  FiPenTool,
  FiBox,
  FiStar,
  FiSettings,
  FiFileText,
} from "react-icons/fi";
import {
  appColorTheme,
  servicePackNameConstants,
} from "../../config/appconfig.js";
import useAuth from "../../hooks/useAuth.js";

export default function WoodworkerSideBar({ isCollapsed, setIsCollapsed }) {
  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  });
  const { auth } = useAuth();
  const packType =
    auth?.woodworker?.servicePackEndDate &&
    Date.now() <= new Date(auth?.woodworker?.servicePackEndDate).getTime()
      ? auth?.woodworker?.servicePack?.name
      : null;

  const navItems = [
    {
      label: "Đơn hàng",
      path: "service-order",
      icon: FiShoppingCart,
      needPack: true,
    },
    {
      label: "BH & Sữa chữa",
      path: "guarantee-order",
      icon: FiSettings,
      needPack: true,
    },
    { label: "Dịch vụ", path: "service", icon: FiTool, needPack: true },
    { label: "Thiết kế", path: "design", icon: FiPenTool, needPack: true },
    { label: "Sản phẩm", path: "product", icon: FiBox, needPack: true },
    { label: "Bài đăng", path: "post", icon: FiFileText, needPack: true },
    {
      label: "Khiếu nại",
      path: "complaint",
      icon: FiAlertTriangle,
      needPack: true,
    },
    { label: "Đánh giá", path: "review", icon: FiStar, needPack: true },
    { label: "Ví", path: "wallet", icon: FiCreditCard },
    { label: "Hồ sơ", path: "profile", icon: FiUser },
  ];

  return (
    <Box position="relative">
      <IconButton
        position="absolute"
        top="0"
        right="-35px"
        size="sm"
        variant="ghost"
        bg={appColorTheme.green_3}
        color="white"
        borderRadius="full"
        icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      />

      <List>
        {navItems.map((item, index) => {
          if (
            packType == servicePackNameConstants.BRONZE &&
            item.path == "product"
          ) {
            return null;
          }

          if (!packType && item.needPack) {
            return null;
          }

          return (
            <ListItem
              overflowY="auto"
              height="65px"
              fontSize="1.2rem"
              key={index}
              transition="all 0.2s ease"
              borderRadius="10px"
              mb={2}
              _hover={{
                transform: "translateX(8px)",
              }}
            >
              <NavLink style={navLinkStyle} to={item.path}>
                {({ isActive }) => (
                  <>
                    {isCollapsed ? (
                      <Flex
                        p={3}
                        justifyContent="center"
                        align="center"
                        gap={2}
                        bg={isActive ? appColorTheme.green_2 : "transparent"}
                        color={isActive ? "white" : appColorTheme.green_3}
                        borderRadius="md"
                      >
                        <Icon as={item.icon} />
                      </Flex>
                    ) : (
                      <Flex
                        bgColor={
                          isActive
                            ? appColorTheme.green_3
                            : "rgba(154, 230, 180, 0.2)"
                        }
                        color={isActive ? "white" : "gray.700"}
                        p={4}
                        align="center"
                        gap={3}
                        borderRadius="12px"
                        boxShadow={isActive ? "md" : "none"}
                        _hover={{
                          bgColor: isActive
                            ? appColorTheme.green_3
                            : appColorTheme.green_1,
                          color: isActive ? "white" : "gray.800",
                        }}
                      >
                        <Icon
                          as={item.icon}
                          color={isActive ? "white" : appColorTheme.green_3}
                        />
                        <Text>{item.label}</Text>
                      </Flex>
                    )}
                  </>
                )}
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
