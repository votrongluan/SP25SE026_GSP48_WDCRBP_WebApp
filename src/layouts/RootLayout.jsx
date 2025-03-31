import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import { Box, Container } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer.jsx";
import useAuth from "../hooks/useAuth.js";

export default function RootLayout() {
  const { auth } = useAuth();

  if (auth?.role == "Admin") {
    return <Navigate to="/ad" />;
  }

  if (auth?.role == "Staff") {
    return <Navigate to="/staff" />;
  }

  if (auth?.role == "Moderator") {
    return <Navigate to="/mod" />;
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
