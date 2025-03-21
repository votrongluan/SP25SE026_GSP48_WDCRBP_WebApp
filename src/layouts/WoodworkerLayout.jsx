import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import WoodworkerSideBar from "../components/Sidebar/WoodworkerSideBar.jsx";

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
