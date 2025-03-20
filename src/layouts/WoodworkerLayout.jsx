import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import WoodworkerSideBar from "../components/Sidebar/WoodworkerSideBar.jsx";
import RequireAuth from "../components/Utility/RequireAuth.jsx";

function WoodworkerLayout(props) {
  return (
    <Box fontFamily="Nunito Sans" bg="gray.50">
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
        <WoodworkerSideBar />
      </Box>

      {/* main content & navbar */}
      <Box
        color="black"
        minH="100svh"
        bgColor="app_grey.0"
        as="main"
        p="40px"
        ml="280px"
        boxShadow="md"
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default WoodworkerLayout;
