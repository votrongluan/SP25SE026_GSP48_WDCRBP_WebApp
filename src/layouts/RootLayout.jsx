import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import { Box } from "@chakra-ui/react";
import Footer from "../components/PageParts/Footer.jsx";
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
      <Box minH="50vh" pt="50px" bgColor="app_grey.1" color="black">
        <Outlet />
      </Box>
      <Footer />
      <ScrollRestoration />
    </Box>
  );
}
