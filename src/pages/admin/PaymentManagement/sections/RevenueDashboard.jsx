import { Box, Text, VStack, Spinner, Center } from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig";
import RevenueOverview from "../components/RevenueOverview";
import RevenueChart from "../components/RevenueChart";
import { useGetAllTransactionsQuery } from "../../../../services/transactionApi";

export default function RevenueDashboard() {
  const {
    data,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useGetAllTransactionsQuery();

  if (isLoadingTransactions) {
    return (
      <Center h="200px">
        <Spinner size="lg" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isErrorTransactions) {
    return (
      <Center h="200px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu doanh thu</Text>
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
        Tổng quan thu nhập
      </Text>

      <RevenueOverview transactions={data?.data} />

      <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <RevenueChart transactions={data?.data} />
      </Box>
    </VStack>
  );
}
