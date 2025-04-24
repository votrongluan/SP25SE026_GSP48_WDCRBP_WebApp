import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { paymentForConstants } from "../../../../config/appconfig";
import { formatPrice } from "../../../../utils/utils";
import {
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { useMemo } from "react";

export default function RevenueOverview({ transactions }) {
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
    const totalRevenue = servicePackRevenue.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    const dailyRevenue = servicePackRevenue
      .filter((tx) => new Date(tx.createdAt) >= today)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const monthlyRevenue = servicePackRevenue
      .filter((tx) => new Date(tx.createdAt) >= firstDayOfMonth)
      .reduce((sum, tx) => sum + tx.amount, 0);

    // All transactions volume
    const totalVolume = successfulTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    const dailyVolume = successfulTransactions
      .filter((tx) => new Date(tx.createdAt) >= today)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const monthlyVolume = successfulTransactions
      .filter((tx) => new Date(tx.createdAt) >= firstDayOfMonth)
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      totalRevenue,
      dailyRevenue,
      monthlyRevenue,
      totalVolume,
      dailyVolume,
      monthlyVolume,
    };
  }, [transactions]);

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Heading size="md" mb={4}>
          Doanh thu
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
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

          {/* Total revenue */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiDollarSign} mr={2} /> Tổng doanh thu
              </StatLabel>
              <StatNumber color="purple.500">
                {formatPrice(metrics.totalRevenue)}
              </StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>
      </Box>

      <Box>
        <Heading size="md" mb={4}>
          Tổng số tiền đã giao dịch trên nền tảng
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {/* Daily transaction volume */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiCreditCard} mr={2} /> Giao dịch hôm nay
              </StatLabel>
              <StatNumber color="teal.500">
                {formatPrice(metrics.dailyVolume)}
              </StatNumber>
            </Stat>
          </Box>

          {/* Monthly transaction volume */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiCreditCard} mr={2} /> Giao dịch tháng này
              </StatLabel>
              <StatNumber color="cyan.500">
                {formatPrice(metrics.monthlyVolume)}
              </StatNumber>
            </Stat>
          </Box>

          {/* Total transaction volume */}
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel display="flex" alignItems="center">
                <Icon as={FiCreditCard} mr={2} /> Tổng số tiền giao dịch
              </StatLabel>
              <StatNumber color="orange.500">
                {formatPrice(metrics.totalVolume)}
              </StatNumber>
            </Stat>
          </Box>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
