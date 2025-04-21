import { useState } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { appColorTheme } from "../config/appconfig.js";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "../components/Sidebar/AdminSideBar.jsx";
import RequireAuth from "../components/Utility/RequireAuth.jsx";
import Header from "../components/Header/Header.jsx";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <RequireAuth allowedRoles={["Admin"]}>
      <Box fontFamily="Nunito Sans" position="relative" pb="50px">
        <Header />
        <Box>
          <Box
            as="aside"
            position="fixed"
            bg="white"
            color="black"
            minHeight="100vh"
            px={5}
            width={isCollapsed ? "80px" : "350px"}
            transition="width 0.3s"
          >
            <Text
              color={appColorTheme.pink_3}
              mt={2}
              mb={2}
              fontWeight="bold"
              textAlign="center"
              borderBottom="2px solid"
              borderColor={appColorTheme.pink_2}
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
            ml={isCollapsed ? "80px" : "350px"}
            transition="margin-left 0.3s"
          >
            <Outlet />
          </Box>

          {/* Fixed Footer */}
          <Box
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            height="50px"
            bg="white"
            borderTop="1px solid"
            borderColor={appColorTheme.pink_1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 -2px 10px rgba(0,0,0,0.05)"
            zIndex={10}
          >
            <Text fontSize="xl" fontWeight="bold" color={appColorTheme.pink_3}>
              Trang dành cho quản trị viên nền tảng WDCRBP
            </Text>
          </Box>
        </Box>
      </Box>
    </RequireAuth>
  );
}
