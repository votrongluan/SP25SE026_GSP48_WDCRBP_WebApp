import { Link, ScrollRestoration, useRouteError } from "react-router-dom";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Box fontFamily="Nunito Sans">
        <Header />
        <Box pt="100px" minH="100vh" bgColor="app_white.0" color="app_black.0">
          <Container maxW="1200px" as="main" py={10}>
            <Box textAlign="center" minH="70vh">
              <Heading fontFamily="Montserrat" fontSize="26px">
                Có lỗi xảy ra trong quá trình xử lý
              </Heading>
              <Text fontSize="18px" mt={10} mb={10}>
                {error.message}
              </Text>
              <Link to="/">
                <Button>Về trang chủ</Button>
              </Link>
            </Box>
          </Container>
        </Box>
        <Footer />
        <ScrollRestoration />
      </Box>
    </>
  );
}
