import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { paymentForConstants } from "../../../../config/appconfig";
import { formatPrice } from "../../../../utils/utils";
import { FiDollarSign, FiTrendingUp, FiCalendar } from "react-icons/fi";
import { useMemo } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function RevenueOverview({
  transactions,
  dateRange,
  setDateRange,
}) {
  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: new Date(value),
    }));
  };

  const metrics = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter successful transactions only
    const successfulTransactions = transactions.filter((tx) => tx.status);

    // Service pack revenue only
    const servicePackRevenue = successfulTransactions.filter(
      (tx) => tx.paymentFor === paymentForConstants.SERVICE_PACK_PAYMENT
    );

    // Calculate metrics
    const totalRevenue = servicePackRevenue
      .filter((tx) => {
        const txDate = new Date(tx.createdAt);
        return txDate >= dateRange.startDate && txDate <= dateRange.endDate;
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    const dailyRevenue = servicePackRevenue
      .filter((tx) => new Date(tx.createdAt) >= today)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const monthlyRevenue = servicePackRevenue
      .filter((tx) => new Date(tx.createdAt) >= firstDayOfMonth)
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      totalRevenue,
      dailyRevenue,
      monthlyRevenue,
    };
  }, [transactions, dateRange]);

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={4}>
          {/* Daily revenue */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiCalendar} mr={2} /> Doanh thu hôm nay
              </StatLabel>
              <StatNumber color="green.500">
                {formatPrice(metrics.dailyRevenue)}
              </StatNumber>
            </Stat>
          </Box>

          {/* Monthly revenue */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiTrendingUp} mr={2} /> Doanh thu tháng này
              </StatLabel>
              <StatNumber color="blue.500">
                {formatPrice(metrics.monthlyRevenue)}
              </StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>

        <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
          <Heading size="md" mb={4}>
            Tổng doanh thu (từ ngày{" "}
            {format(dateRange.startDate, "dd/MM/yyyy", { locale: vi })} - đến
            ngày {format(dateRange.endDate, "dd/MM/yyyy", { locale: vi })})
          </Heading>

          <HStack spacing={4} mb={4}>
            <FormControl>
              <FormLabel>Từ ngày</FormLabel>
              <Input
                type="date"
                value={dateRange.startDate.toISOString().split("T")[0]}
                onChange={(e) => handleDateChange("startDate", e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Đến ngày</FormLabel>
              <Input
                type="date"
                value={dateRange.endDate.toISOString().split("T")[0]}
                onChange={(e) => handleDateChange("endDate", e.target.value)}
              />
            </FormControl>
          </HStack>

          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiDollarSign} mr={2} /> Tổng doanh thu trong khoảng thời
              gian
            </StatLabel>
            <StatNumber color="purple.500" fontSize="2xl">
              {formatPrice(metrics.totalRevenue)}
            </StatNumber>
          </Stat>
        </Box>
      </Box>
    </VStack>
  );
}
