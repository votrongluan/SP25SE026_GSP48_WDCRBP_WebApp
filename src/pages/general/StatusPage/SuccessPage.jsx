import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  HStack,
  Container,
  Center,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowRight, FiCheck, FiHome } from "react-icons/fi";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const title = searchParams.get("title") || "Thành công";
  const desc =
    searchParams.get("desc") || "Thao tác của bạn đã được thực hiện thành công";
  const path = searchParams.get("path");
  const buttonText = searchParams.get("buttonText") || "Tiếp tục";

  return (
    <Container maxW="container.md" py={10}>
      <Center>
        <VStack
          spacing={8}
          p={8}
          bg={bgColor}
          borderRadius="xl"
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
          w="full"
        >
          {/* Title Section */}
          <Stack spacing={6} align="center">
            <Box
              w="80px"
              h="80px"
              borderRadius="full"
              bg={appColorTheme.brown_2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiCheck size={40} color="white" />
            </Box>
            <Heading
              color={appColorTheme.brown_2}
              fontFamily="Montserrat"
              as="h3"
              fontSize="2xl"
            >
              {title}
            </Heading>
            <Text fontSize="lg" textAlign="center">
              {desc}
            </Text>
          </Stack>

          {/* Action Buttons */}
          <HStack spacing={4} justify="center">
            <Button
              variant="outline"
              colorScheme="blue"
              size="lg"
              leftIcon={<FiHome />}
              onClick={() => navigate("/")}
            >
              Về trang chủ
            </Button>
            {path && (
              <Button
                variant="outline"
                colorScheme="brown"
                leftIcon={<FiArrowRight />}
                size="lg"
                onClick={() => {
                  navigate(path, { replace: true });
                  window.location.reload();
                }}
                _hover={{
                  bg: appColorTheme.brown_2,
                  color: "white",
                }}
              >
                {buttonText}
              </Button>
            )}
          </HStack>
        </VStack>
      </Center>
    </Container>
  );
}
