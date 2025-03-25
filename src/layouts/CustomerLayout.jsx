import { useState } from "react";
import { Box, Container, Icon, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/Sidebar/CustomerSidebar.jsx";
import Header from "../components/Header/Header.jsx";
import { appColorTheme } from "../config/appconfig.js";
import { FiMenu } from "react-icons/fi";

export default function CustomerLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box fontFamily="Nunito Sans">
      <Header />
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
            color={appColorTheme.brown_2}
            mt={2}
            mb={2}
            textAlign="center"
            borderBottom="2px solid"
            fontWeight="bold"
            borderColor={appColorTheme.brown_1}
          >
            {!isCollapsed ? "Menu khách hàng" : <Icon as={FiMenu} />}
          </Text>

          <CustomerSidebar
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
