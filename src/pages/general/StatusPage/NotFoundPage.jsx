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
import { FiHome, FiSearch } from "react-icons/fi";

function NotFoundPage() {
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
            <FiSearch size={50} color="white" />
          </Box>

          <Heading
            color={appColorTheme.brown_2}
            fontFamily="Montserrat"
            fontSize="3xl"
            fontWeight="bold"
          >
            Oops! Trang không tồn tại
          </Heading>

          <Text color="gray.600" fontSize="lg" maxW="md" mx="auto">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </Text>

          <Link to="/">
            <Button leftIcon={<FiHome />} size="lg" px={8} mt={4}>
              Về trang chủ
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
