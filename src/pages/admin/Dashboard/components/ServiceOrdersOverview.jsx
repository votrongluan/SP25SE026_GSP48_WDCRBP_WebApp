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
  Badge,
  Button,
} from "@chakra-ui/react";
import { formatPrice } from "../../../../utils/utils";
import { FiDollarSign, FiPackage, FiCalendar } from "react-icons/fi";
import { useMemo, useState } from "react";
import { format, isValid } from "date-fns";
import { vi } from "date-fns/locale";

export default function ServiceOrdersOverview({ serviceOrders }) {
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

    // Filter orders within the selected date range
    const filteredOrders = serviceOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
    });

    // Daily orders (created today)
    const dailyOrders = serviceOrders.filter(
      (order) => new Date(order.createdAt) >= today
    );

    // Monthly orders (created this month)
    const monthlyOrders = serviceOrders.filter(
      (order) => new Date(order.createdAt) >= firstDayOfMonth
    );

    // Calculate metrics
    const totalAmount = filteredOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const totalCount = filteredOrders.length;
    const completedOrders = filteredOrders.filter(
      (order) => order.status === "Đã hoàn tất"
    ).length;
    const completionRate =
      totalCount > 0 ? Math.round((completedOrders / totalCount) * 100) : 0;

    // Daily and monthly metrics
    const dailyOrderCount = dailyOrders.length;
    const monthlyOrderCount = monthlyOrders.length;

    return {
      totalAmount,
      totalCount,
      completedOrders,
      completionRate,
      dailyOrderCount,
      monthlyOrderCount,
    };
  }, [serviceOrders, dateRange]);

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
          {/* Daily orders */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiCalendar} mr={2} /> Đơn dịch vụ hôm nay
              </StatLabel>
              <StatNumber color="green.500">
                {metrics.dailyOrderCount}
              </StatNumber>
            </Stat>
          </Box>

          {/* Monthly orders */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiPackage} mr={2} /> Đơn dịch vụ tháng này
              </StatLabel>
              <StatNumber color="blue.500">
                {metrics.monthlyOrderCount}
              </StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>

        <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
          <Heading size="md" mb={4}>
            Tổng quan đơn đặt dịch vụ (từ ngày{" "}
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

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={4}>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiPackage} mr={2} /> Tổng số đơn đặt dịch vụ
              </StatLabel>
              <HStack>
                <StatNumber color="blue.500" fontSize="2xl">
                  {metrics.totalCount}
                </StatNumber>
                <Badge colorScheme="blue" fontSize="md" ml={2}>
                  {metrics.completedOrders} đơn hoàn tất
                </Badge>
              </HStack>
            </Stat>

            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiDollarSign} mr={2} /> Tổng giá trị đơn hàng
              </StatLabel>
              <StatNumber color="purple.500" fontSize="2xl">
                {formatPrice(metrics.totalAmount)}
              </StatNumber>
            </Stat>
          </SimpleGrid>
        </Box>
      </Box>
    </VStack>
  );
}
