import { Box, Text, VStack, Spinner, Center } from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig";
import ServiceOrdersOverview from "../components/ServiceOrdersOverview";
import ServiceOrdersChart from "../components/ServiceOrdersChart";

export default function WoodworkerServiceOrdersDashboard({
  serviceOrders = [],
  isLoading = false,
  isError = false,
}) {
  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="lg" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="200px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu đơn dịch vụ</Text>
      </Center>
    );
  }

  if (!serviceOrders || serviceOrders.length === 0) {
    return (
      <Center h="200px">
        <Text>Xưởng mộc này chưa có đơn dịch vụ nào</Text>
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

      <ServiceOrdersOverview serviceOrders={serviceOrders} />

      <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <ServiceOrdersChart serviceOrders={serviceOrders} />
      </Box>
    </VStack>
  );
}
