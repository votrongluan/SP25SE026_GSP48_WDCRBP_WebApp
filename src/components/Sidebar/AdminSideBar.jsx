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
import { FiChevronLeft, FiChevronRight, FiUserCheck } from "react-icons/fi";
import { appColorTheme } from "../../config/appconfig.js";

export default function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  });

  const navItems = [
    // { label: "Tổng quan", path: "dashboard", icon: FiGrid },
    { label: "Đơn đăng ký xưởng", path: "ww-registration", icon: FiUserCheck },
  ];

  return (
    <Box position="relative">
      <IconButton
        position="absolute"
        top="0"
        right="-35px"
        size="sm"
        variant="ghost"
        bg={appColorTheme.pink_3}
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
                      bg={isActive ? appColorTheme.pink_2 : "transparent"}
                      color={isActive ? "white" : appColorTheme.pink_3}
                      borderRadius="md"
                    >
                      <Icon as={item.icon} />
                    </Flex>
                  ) : (
                    <Flex
                      bgColor={
                        isActive
                          ? appColorTheme.pink_3
                          : "rgba(246, 135, 179, 0.1)"
                      }
                      color={isActive ? "white" : "gray.700"}
                      p={4}
                      align="center"
                      gap={3}
                      borderRadius="12px"
                      boxShadow={isActive ? "md" : "none"}
                      _hover={{
                        bgColor: isActive
                          ? appColorTheme.pink_3
                          : appColorTheme.pink_1,
                        color: isActive ? "white" : "gray.800",
                      }}
                    >
                      <Icon
                        as={item.icon}
                        color={isActive ? "white" : appColorTheme.pink_3}
                      />
                      <Text>{item.label}</Text>
                    </Flex>
                  )}
                </>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
