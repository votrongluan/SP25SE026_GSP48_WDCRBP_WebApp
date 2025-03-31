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
import { FiHome, FiLock } from "react-icons/fi";

function UnauthorizedPage() {
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
            <FiLock size={50} color="white" />
          </Box>

          <Heading
            color={appColorTheme.brown_2}
            fontFamily="Montserrat"
            fontSize="3xl"
            fontWeight="bold"
          >
            Oops! Không có quyền truy cập
          </Heading>

          <Text color="gray.600" fontSize="lg" maxW="md" mx="auto">
            Xin lỗi, bạn không có quyền truy cập vào trang này. Vui lòng kiểm
            tra lại quyền của bạn hoặc liên hệ quản trị viên nếu bạn tin rằng
            đây là lỗi.
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

export default UnauthorizedPage;
