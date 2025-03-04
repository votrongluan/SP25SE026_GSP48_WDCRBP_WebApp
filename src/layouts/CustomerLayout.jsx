import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/Sidebar/CustomerSidebar.jsx";

function CustomerLayout(props) {
  return (
    <Box>
      {/* sidebar */}
      <Box
        position="fixed"
        as="aside"
        bg="white"
        color="black"
        minHeight={{ lg: "100vh" }}
        minWidth="280px"
        p={{ base: "20px", lg: "30px" }}
      >
        <CustomerSidebar />
      </Box>

      {/* main content & navbar */}
      <Box
        color="black"
        minH="100svh"
        bgColor="app_grey.0"
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
