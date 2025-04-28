import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  HStack,
  VStack,
  Text,
  Heading,
  Badge,
  Progress,
} from "@chakra-ui/react";
import { getPackTypeLabel } from "../../../../config/appconfig";
import { FiStar, FiUsers, FiCheckCircle } from "react-icons/fi";
import { useMemo } from "react";

export default function WoodworkersOverview({ woodworkers }) {
  const metrics = useMemo(() => {
    // Count woodworkers by service pack
    const servicePackCounts = woodworkers.reduce((counts, woodworker) => {
      const packName = woodworker.servicePack?.name || "None";
      counts[packName] = (counts[packName] || 0) + 1;
      return counts;
    }, {});

    // Calculate averages
    const totalWoodworkers = woodworkers.length;
    const activeWoodworkers = woodworkers.filter(
      (ww) => ww.publicStatus
    ).length;
    const activeRate =
      totalWoodworkers > 0 ? (activeWoodworkers / totalWoodworkers) * 100 : 0;

    // Reviews and ratings
    const woodworkersWithReviews = woodworkers.filter(
      (ww) => ww.totalReviews && ww.totalReviews > 0
    );
    const totalReviews = woodworkersWithReviews.reduce(
      (sum, ww) => sum + (ww.totalReviews || 0),
      0
    );
    const averageRating =
      woodworkersWithReviews.length > 0
        ? woodworkersWithReviews.reduce(
            (sum, ww) => sum + (ww.totalStar || 0),
            0
          ) /
          woodworkersWithReviews.reduce(
            (sum, ww) => sum + (ww.totalReviews || 0),
            0
          )
        : 0;

    return {
      totalWoodworkers,
      activeWoodworkers,
      activeRate,
      servicePackCounts,
      totalReviews,
      averageRating,
    };
  }, [woodworkers]);

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Tổng quan xưởng mộc</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={4}>
        {/* Total woodworkers */}
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiUsers} mr={2} /> Tổng số xưởng mộc
            </StatLabel>
            <StatNumber color="blue.500">{metrics.totalWoodworkers}</StatNumber>
            <HStack>
              <Badge colorScheme="green" fontSize="sm">
                {metrics.activeWoodworkers} đang hoạt động
              </Badge>
            </HStack>
          </Stat>
        </Box>

        {/* Average rating */}
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiStar} mr={2} /> Đánh giá trung bình
            </StatLabel>
            <StatNumber color="yellow.500">
              {metrics.averageRating.toFixed(1)}
            </StatNumber>
            <StatHelpText>Tổng {metrics.totalReviews} đánh giá</StatHelpText>
          </Stat>
        </Box>

        {/* Active rate */}
        <Box
          bg="white"
          p={5}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiCheckCircle} mr={2} /> Tỷ lệ hoạt động
            </StatLabel>
            <Progress
              value={metrics.activeRate}
              colorScheme={
                metrics.activeRate > 70
                  ? "green"
                  : metrics.activeRate > 40
                  ? "yellow"
                  : "red"
              }
              size="sm"
              mt={2}
              mb={1}
              borderRadius="md"
            />
            <StatNumber color="green.500">
              {metrics.activeRate.toFixed(1)}%
            </StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>

      <Box
        p={5}
        borderRadius="lg"
        boxShadow="sm"
        border="1px"
        borderColor="gray.100"
      >
        <Heading size="sm" mb={4}>
          Phân bố gói dịch vụ
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {Object.entries(metrics.servicePackCounts).map(
            ([packName, count]) => (
              <Box
                key={packName}
                p={3}
                borderRadius="md"
                bg={
                  packName === "Gold"
                    ? "yellow.50"
                    : packName === "Silver"
                    ? "gray.50"
                    : packName === "Bronze"
                    ? "orange.50"
                    : "gray.50"
                }
              >
                <Text fontWeight="medium">{getPackTypeLabel(packName)}</Text>
                <HStack justify="space-between" mt={2}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {count}
                  </Text>
                  <Badge
                    colorScheme={
                      packName === "Gold"
                        ? "yellow"
                        : packName === "Silver"
                        ? "gray"
                        : packName === "Bronze"
                        ? "orange"
                        : "gray"
                    }
                  >
                    {((count / metrics.totalWoodworkers) * 100).toFixed(1)}%
                  </Badge>
                </HStack>
              </Box>
            )
          )}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
