import {
  Box,
  Text,
  VStack,
  Spinner,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { useGetAllTransactionsQuery } from "../../../services/transactionApi";
import { useGetAllServiceOrdersQuery } from "../../../services/serviceOrderApi";
import { useListWoodworkersQuery } from "../../../services/woodworkerApi";
import { appColorTheme } from "../../../config/appconfig";
import RevenueOverview from "./components/RevenueOverview";
import RevenueChart from "./components/RevenueChart";
import ServiceOrdersOverview from "./components/ServiceOrdersOverview";
import ServiceOrdersChart from "./components/ServiceOrdersChart";
import WoodworkersOverview from "./components/WoodworkersOverview";
import WoodworkersChart from "./components/WoodworkersChart";
import { useState } from "react";

export default function DashboardPage() {
  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useGetAllTransactionsQuery();

  const {
    data: serviceOrdersData,
    isLoading: isLoadingServiceOrders,
    isError: isErrorServiceOrders,
  } = useGetAllServiceOrdersQuery();

  const {
    data: woodworkersData,
    isLoading: isLoadingWoodworkers,
    isError: isErrorWoodworkers,
  } = useListWoodworkersQuery();

  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    endDate: new Date(),
  });

  if (isLoadingTransactions || isLoadingServiceOrders || isLoadingWoodworkers) {
    return (
      <Center h="300px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isErrorTransactions || isErrorServiceOrders || isErrorWoodworkers) {
    return (
      <Center h="300px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu</Text>
      </Center>
    );
  }

  const transactions = transactionsData?.data || [];
  const serviceOrders = serviceOrdersData?.data || [];
  const woodworkers = woodworkersData?.data || [];

  return (
    <VStack spacing={8} align="stretch">
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Revenue Section */}
        <VStack spacing={6} align="stretch">
          <Text
            fontSize="2xl"
            color={appColorTheme.brown_2}
            fontFamily="Montserrat"
            fontWeight="bold"
          >
            Tổng quan doanh thu
          </Text>

          <RevenueOverview
            transactions={transactions}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <RevenueChart
              transactions={transactions}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </Box>
        </VStack>

        {/* Service Orders Section */}
        <VStack spacing={6} align="stretch">
          <Text
            fontSize="2xl"
            color={appColorTheme.brown_2}
            fontFamily="Montserrat"
            fontWeight="bold"
          >
            Đơn đặt dịch vụ
          </Text>

          <ServiceOrdersOverview
            serviceOrders={serviceOrders}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <ServiceOrdersChart
              serviceOrders={serviceOrders}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </Box>
        </VStack>
      </SimpleGrid>

      {/* Woodworkers Section */}
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
    </VStack>
  );
}
