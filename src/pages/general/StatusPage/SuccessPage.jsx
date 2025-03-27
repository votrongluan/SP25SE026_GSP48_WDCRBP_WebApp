import { Box, Heading, Stack, Text, Button, HStack } from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title") || "Thành công";
  const desc =
    searchParams.get("desc") || "Thao tác của bạn đã được thực hiện thành công";
  const path = searchParams.get("path");
  const buttonText = searchParams.get("buttonText") || "Tiếp tục";

  return (
    <Box>
      {/* Title Section */}
      <Stack spacing={6} align="center" mb={8}>
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
        <Text fontSize="lg" color={appColorTheme.brown_1} textAlign="center">
          {desc}
        </Text>
      </Stack>

      {/* Action Buttons */}
      <HStack spacing={4} justify="center">
        <Button
          variant="outline"
          colorScheme="brown"
          size="lg"
          onClick={() => navigate("/")}
          _hover={{
            bg: appColorTheme.brown_2,
            color: "white",
          }}
        >
          Về trang chủ
        </Button>
        {path && (
          <Button colorScheme="blue" size="lg" onClick={() => navigate(path)}>
            {buttonText}
          </Button>
        )}
      </HStack>
    </Box>
  );
}
