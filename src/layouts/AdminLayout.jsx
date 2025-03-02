import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/Sidebars/AdminSideBar.jsx";
import RequireAuth from "../components/Utilities/RequireAuth.jsx";

function AdminLayout(props) {
  return (
    <RequireAuth allowedRoles={3}>
      <Box bg="gray.50">
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
          <AdminSideBar />
        </Box>

        {/* main content & navbar */}
        <Box
          color="black"
          minH="100svh"
          bgColor="app_grey.1"
          as="main"
          p="40px"
          ml="280px"
        >
          <Outlet />
        </Box>
      </Box>
    </RequireAuth>
  );
}

export default AdminLayout;
