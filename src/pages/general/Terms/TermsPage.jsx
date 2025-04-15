import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useGetConfigurationByDescriptionMutation } from "../../../services/configurationApi";
import { appColorTheme } from "../../../config/appconfig";

export default function TermsPage() {
  const [platformTerms, setPlatformTerms] = useState("");
  const [getConfigurationByDescription, { isLoading }] =
    useGetConfigurationByDescriptionMutation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatformTerms = async () => {
      try {
        const response = await getConfigurationByDescription({
          description: "SampleContract",
          value: "string",
        }).unwrap();

        if (response.data?.[0]?.value) {
          setPlatformTerms(response.data[0].value);
        } else {
          setError("Không tìm thấy điều khoản nền tảng");
        }
      } catch (error) {
        console.error("Error fetching platform terms:", error);
        setError("Không thể lấy điều khoản từ hệ thống");
      }
    };

    fetchPlatformTerms();
  }, [getConfigurationByDescription]);

  if (isLoading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container maxW="container.lg" py={10}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Lỗi!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      <Heading
        color={appColorTheme.brown_2}
        fontSize="2xl"
        fontFamily="Montserrat"
        mb={6}
      >
        Điều Khoản Nền Tảng
      </Heading>
      <Box
        boxShadow="md"
        borderRadius="md"
        p={5}
        bgColor="white"
        whiteSpace="pre-wrap"
      >
        {platformTerms ? (
          <Text>{platformTerms}</Text>
        ) : (
          <Text color="gray.500" fontStyle="italic">
            Không có điều khoản nào được cung cấp.
          </Text>
        )}
      </Box>
    </Box>
  );
}
