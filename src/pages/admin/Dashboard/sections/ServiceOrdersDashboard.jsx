import { Box, Text, VStack, Spinner, Center } from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig";
import ServiceOrdersOverview from "../components/ServiceOrdersOverview";
import ServiceOrdersChart from "../components/ServiceOrdersChart";
import { useGetAllServiceOrdersQuery } from "../../../../services/serviceOrderApi";

export default function ServiceOrdersDashboard() {
  const {
    data,
    isLoading: isLoadingServiceOrders,
    isError: isErrorServiceOrders,
  } = useGetAllServiceOrdersQuery();

  if (isLoadingServiceOrders) {
    return (
      <Center h="200px">
        <Spinner size="lg" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isErrorServiceOrders) {
    return (
      <Center h="200px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu đơn dịch vụ</Text>
      </Center>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <Text
        fontSize="2xl"
        color={appColorTheme.brown_2}
        fontFamily="Montserrat"
        fontWeight="bold"
      >
        Đơn đặt dịch vụ
      </Text>

      <ServiceOrdersOverview serviceOrders={data?.data} />

      <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <ServiceOrdersChart serviceOrders={data?.data} />
      </Box>
    </VStack>
  );
}
