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
  Button,
} from "@chakra-ui/react";
import { paymentForConstants } from "../../../../config/appconfig";
import { formatPrice } from "../../../../utils/utils";
import { FiDollarSign, FiTrendingUp, FiCalendar } from "react-icons/fi";
import { useMemo, useState } from "react";
import { format, isValid } from "date-fns";
import { vi } from "date-fns/locale";

export default function RevenueOverview({ transactions }) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    endDate: new Date(),
  });
  const [tempDateRange, setTempDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const handleDateChange = (field, value) => {
    if (!value) {
      // Handle empty value
      setTempDateRange((prev) => ({
        ...prev,
        [field]:
          field === "startDate"
            ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            : new Date(),
      }));
    } else {
      const newDate = new Date(value);
      if (isValid(newDate)) {
        setTempDateRange((prev) => ({
          ...prev,
          [field]: newDate,
        }));
      }
    }
  };

  const handleApplyDateFilter = () => {
    setDateRange(tempDateRange);
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

  // Safe formatting function that checks if date is valid before formatting
  const safeFormat = (date, formatString) => {
    return isValid(date)
      ? format(date, formatString, { locale: vi })
      : "Invalid date";
  };

  // Safely get ISO string for input value
  const getDateInputValue = (date) => {
    return isValid(date) ? date.toISOString().split("T")[0] : "";
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={4}>
          {/* Daily revenue */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiCalendar} mr={2} /> Thu nhập hôm nay
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
                <Icon as={FiTrendingUp} mr={2} /> Thu nhập tháng này
              </StatLabel>
              <StatNumber color="blue.500">
                {formatPrice(metrics.monthlyRevenue)}
              </StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>

        <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
          <Heading size="md" mb={4}>
            Tổng Thu nhập (từ ngày{" "}
            {safeFormat(dateRange.startDate, "dd/MM/yyyy")} - đến ngày{" "}
            {safeFormat(dateRange.endDate, "dd/MM/yyyy")})
          </Heading>

          <HStack spacing={4} mb={4}>
            <FormControl>
              <FormLabel>Từ ngày</FormLabel>
              <Input
                type="date"
                value={getDateInputValue(tempDateRange.startDate)}
                onChange={(e) => handleDateChange("startDate", e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Đến ngày</FormLabel>
              <Input
                type="date"
                value={getDateInputValue(tempDateRange.endDate)}
                onChange={(e) => handleDateChange("endDate", e.target.value)}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              mt="auto"
              onClick={handleApplyDateFilter}
            >
              Xem
            </Button>
          </HStack>

          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiDollarSign} mr={2} /> Tổng Thu nhập trong khoảng thời
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
