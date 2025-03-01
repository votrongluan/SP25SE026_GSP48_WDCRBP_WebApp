import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/Sidebars/CustomerSidebar.jsx";

function CustomerLayout(props) {
  return (
    <Box bg="gray.50">
      {/* sidebar */}
      <Box
        position="fixed"
        as="aside"
        bg="app_grey.0"
        color="app_black.0"
        minHeight={{ lg: "100vh" }}
        minWidth="280px"
        p={{ base: "20px", lg: "30px" }}
      >
        <CustomerSidebar />
      </Box>

      {/* main content & navbar */}
      <Box
        color="app_black.0"
        minH="100svh"
        bgColor="app_white.0"
        as="main"
        p="40px"
        ml="280px"
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default CustomerLayout;
