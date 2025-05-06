import {
  Box,
  Text,
  VStack,
  Spinner,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig";
import WoodworkersOverview from "../components/WoodworkersOverview";
import WoodworkersChart from "../components/WoodworkersChart";
import { useListWoodworkersQuery } from "../../../../services/woodworkerApi";

export default function WoodworkersDashboard() {
  const {
    data: woodworkersData,
    isLoading: isLoadingWoodworkers,
    isError: isErrorWoodworkers,
  } = useListWoodworkersQuery();

  if (isLoadingWoodworkers) {
    return (
      <Center h="200px">
        <Spinner size="lg" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isErrorWoodworkers) {
    return (
      <Center h="200px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu xưởng mộc</Text>
      </Center>
    );
  }

  const woodworkers = woodworkersData?.data || [];

  return (
    <VStack spacing={6} align="stretch">
      <Text
        fontSize="2xl"
        color={appColorTheme.brown_2}
        fontFamily="Montserrat"
        fontWeight="bold"
      >
        Xưởng mộc
      </Text>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
          <WoodworkersOverview woodworkers={woodworkers} />
        </Box>

        <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
          <WoodworkersChart woodworkers={woodworkers} />
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
