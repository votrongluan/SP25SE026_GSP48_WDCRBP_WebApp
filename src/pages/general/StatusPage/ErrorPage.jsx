import { Link, ScrollRestoration, useRouteError } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import Header from "../../../components/Header/Header.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { appColorTheme } from "../../../config/appconfig";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Box fontFamily="Nunito Sans">
      <Header />
      <Box minH="100vh" bg="gray.50" py={20}>
        <Container maxW="container.md">
          <VStack spacing={8} textAlign="center">
            <Box
              w="100px"
              h="100px"
              borderRadius="full"
              bg={appColorTheme.brown_2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
            >
              <FiAlertCircle size={50} color="white" />
            </Box>

            <Heading
              color={appColorTheme.brown_2}
              fontFamily="Montserrat"
              fontSize="3xl"
              fontWeight="bold"
            >
              Oops! Có lỗi xảy ra
            </Heading>

            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="md"
              w="full"
              maxW="md"
              mx="auto"
            >
              <Text
                color="gray.600"
                fontSize="lg"
                fontFamily="monospace"
                whiteSpace="pre-wrap"
              >
                {error.message}
              </Text>
            </Box>

            <Link to="/">
              <Button leftIcon={<FiHome />} size="lg" px={8} mt={4}>
                Về trang chủ
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>
      <Footer />
      <ScrollRestoration />
    </Box>
  );
}
