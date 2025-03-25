import { useState } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import WoodworkerSideBar from "../components/Sidebar/WoodworkerSideBar.jsx";
import { appColorTheme } from "../config/appconfig.js";
import { FiMenu } from "react-icons/fi";

export default function WoodworkerLayout() {
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
            {!isCollapsed ? "Menu thợ mộc" : <Icon as={FiMenu} />}
          </Text>

          <WoodworkerSideBar
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
