import { useState } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { appColorTheme } from "../config/appconfig.js";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "../components/Sidebar/AdminSideBar.jsx";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box fontFamily="Nunito Sans">
      <Box>
        <Box
          as="aside"
          position="fixed"
          bg="white"
          color="black"
          minHeight="100vh"
          px={5}
          width={isCollapsed ? "80px" : "300px"}
          transition="width 0.3s"
        >
          <Text
            color={appColorTheme.brown_1}
            mt={2}
            mb={2}
            fontWeight="bold"
            textAlign="center"
            borderBottom="2px solid"
            borderColor={appColorTheme.brown_2}
          >
            {!isCollapsed ? "Menu quản trị viên" : <Icon as={FiMenu} />}
          </Text>

          <AdminSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </Box>

        <Box
          as="main"
          bgColor="app_grey.1"
          color="black"
          minH="100svh"
          p={10}
          ml={isCollapsed ? "80px" : "300px"}
          transition="margin-left 0.3s"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
