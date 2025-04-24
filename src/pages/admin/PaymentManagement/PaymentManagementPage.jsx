import { Box, Spinner, Text, Center, VStack } from "@chakra-ui/react";
import { useGetAllTransactionsQuery } from "../../../services/transactionApi";
import { appColorTheme } from "../../../config/appconfig";
import RevenueOverview from "./components/RevenueOverview";
import TransactionChart from "./components/TransactionChart";
import TransactionList from "./components/TransactionList";
import { useState } from "react";

export default function PaymentManagementPage() {
  const {
    data: transactionsData,
    isLoading,
    isError,
  } = useGetAllTransactionsQuery();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    endDate: new Date(),
  });

  if (isLoading) {
    return (
      <Center h="300px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="300px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu giao dịch</Text>
      </Center>
    );
  }

  const transactions = transactionsData?.data || [];

  return (
    <VStack spacing={6} align="stretch">
      <Text
        fontSize="2xl"
        color={appColorTheme.brown_2}
        fontFamily="Montserrat"
        fontWeight="bold"
      >
        Các khoản giao dịch trên nền tảng
      </Text>

      <RevenueOverview transactions={transactions} />

      <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <TransactionChart
          transactions={transactions}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </Box>

      <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <TransactionList transactions={transactions} />
      </Box>
    </VStack>
  );
}
