import { useState } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { appColorTheme } from "../config/appconfig.js";
import { FiMenu } from "react-icons/fi";
import RequireAuth from "../components/Utility/RequireAuth.jsx";
import Header from "../components/Header/Header.jsx";
import ModeratorSidebar from "../components/Sidebar/ModeratorSidebar.jsx";

export default function ModeratorLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <RequireAuth allowedRoles={["Moderator"]}>
      <Box fontFamily="Nunito Sans" position="relative" pb="50px">
        <Box>
          <Header />
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
              {!isCollapsed ? "Menu người điều hành" : <Icon as={FiMenu} />}
            </Text>

            <ModeratorSidebar
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
              Trang dành cho người điều hành nền tảng WDCRBP
            </Text>
          </Box>
        </Box>
      </Box>
    </RequireAuth>
  );
}
