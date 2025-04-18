import { useState } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { appColorTheme } from "../config/appconfig.js";
import { FiMenu } from "react-icons/fi";
import RequireAuth from "../components/Utility/RequireAuth.jsx";
import StaffSideBar from "../components/Sidebar/StaffSideBar.jsx";

export default function StaffLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <RequireAuth allowedRoles={["Staff"]}>
      <Box fontFamily="Nunito Sans">
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
              color={appColorTheme.brown_1}
              mt={2}
              mb={2}
              fontWeight="bold"
              textAlign="center"
              borderBottom="2px solid"
              borderColor={appColorTheme.brown_2}
            >
              {!isCollapsed ? "Menu nhân viên" : <Icon as={FiMenu} />}
            </Text>

            <StaffSideBar
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
        </Box>
      </Box>
    </RequireAuth>
  );
}
