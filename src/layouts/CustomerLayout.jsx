import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/Sidebar/CustomerSidebar.jsx";
import Header from "../components/Header/Header.jsx";

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
          <Container w="90%" maxW="1400px">
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
