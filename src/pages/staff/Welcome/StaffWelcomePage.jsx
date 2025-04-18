import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import { FiShield } from "react-icons/fi";

function StaffWelcomePage() {
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
            Chào mừng đến với Trang Nhân Viên
          </Heading>

          <Text color="gray.600" fontSize="lg" maxW="md" mx="auto">
            Đây là khu vực dành cho nhân viên
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}

export default StaffWelcomePage;
