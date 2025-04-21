import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import { Box, Container } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer.jsx";

export default function RootLayout() {
  return (
    <Box fontFamily="Nunito Sans">
      <Header />
      <Box minH="70vh" pb={10} pt={10} bgColor="app_grey.1" color="black">
        <Container w="90%" maxW="1400px">
          <Outlet />
        </Container>
      </Box>
      <Footer />
      <ScrollRestoration />
    </Box>
  );
}
