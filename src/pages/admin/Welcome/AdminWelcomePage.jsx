import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { appColorTheme } from "../../../config/appconfig";
import { FiShield, FiLayout } from "react-icons/fi";

function AdminWelcomePage() {
  return (
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
            <FiShield size={50} color="white" />
          </Box>

          <Heading
            color={appColorTheme.brown_2}
            fontFamily="Montserrat"
            fontSize="3xl"
            fontWeight="bold"
          >
            Chào mừng đến với Trang Quản Trị nền tảng WDCRBP
          </Heading>

          <Text color="gray.600" fontSize="lg" maxW="md" mx="auto">
            Đây là khu vực dành cho quản trị viên của nền tảng WDCRBP
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}

export default AdminWelcomePage;
