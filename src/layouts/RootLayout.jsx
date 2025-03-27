import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import { Box, Container } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer.jsx";
import useAuth from "../hooks/useAuth.js";

export default function RootLayout() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth?.Role == 2) {
    navigate("/supplier");
  }

  if (auth?.Role == 3) {
    navigate("/admin");
  }

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
