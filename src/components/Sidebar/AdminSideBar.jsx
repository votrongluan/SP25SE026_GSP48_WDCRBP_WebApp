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
    color: isActive ? appColorTheme.brown_1 : null,
    fontWeight: isActive ? "bold" : null,
    cursor: "pointer",
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
