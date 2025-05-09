import {
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  HStack,
  Text,
  Progress,
  Icon,
  Flex,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import { useMemo } from "react";
import { format, isValid } from "date-fns";
import { vi } from "date-fns/locale";

export default function ReviewsOverview({ reviews = [] }) {
  const stats = useMemo(() => {
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: {
          five: 0,
          four: 0,
          three: 0,
          two: 0,
          one: 0,
        },
        percentages: {
          five: 0,
          four: 0,
          three: 0,
          two: 0,
          one: 0,
        },
        latestReviewDate: null,
        statusDistribution: {
          approved: 0,
          pending: 0,
        },
        responseDistribution: {
          responded: 0,
          pending: 0,
        },
      };
    }

    let totalRating = 0;
    let fiveStarReviews = 0;
    let fourStarReviews = 0;
    let threeStarReviews = 0;
    let twoStarReviews = 0;
    let oneStarReviews = 0;
    let approvedReviews = 0;
    let pendingReviews = 0;
    let respondedReviews = 0;
    let pendingResponseReviews = 0;
    let latestReviewDate = null;

    reviews.forEach((review) => {
      const rating = review.rating;
      totalRating += rating;

      // Rating distribution
      switch (Math.floor(rating)) {
        case 5:
          fiveStarReviews++;
          break;
        case 4:
          fourStarReviews++;
          break;
        case 3:
          threeStarReviews++;
          break;
        case 2:
          twoStarReviews++;
          break;
        case 1:
          oneStarReviews++;
          break;
        default:
          break;
      }

      // Status distribution
      if (review.status) {
        approvedReviews++;
      } else {
        pendingReviews++;
      }

      // Response distribution
      if (review.woodworkerResponse) {
        respondedReviews++;
      } else {
        pendingResponseReviews++;
      }

      // Latest review date
      const reviewDate = new Date(review.createdAt);
      if (isValid(reviewDate)) {
        if (!latestReviewDate || reviewDate > latestReviewDate) {
          latestReviewDate = reviewDate;
        }
      }
    });

    const averageRating = totalRating / totalReviews;

    return {
      totalReviews,
      averageRating,
      ratingDistribution: {
        five: fiveStarReviews,
        four: fourStarReviews,
        three: threeStarReviews,
        two: twoStarReviews,
        one: oneStarReviews,
      },
      percentages: {
        five: (fiveStarReviews / totalReviews) * 100,
        four: (fourStarReviews / totalReviews) * 100,
        three: (threeStarReviews / totalReviews) * 100,
        two: (twoStarReviews / totalReviews) * 100,
        one: (oneStarReviews / totalReviews) * 100,
      },
      latestReviewDate,
      statusDistribution: {
        approved: approvedReviews,
        pending: pendingReviews,
      },
      responseDistribution: {
        responded: respondedReviews,
        pending: pendingResponseReviews,
      },
    };
  }, [reviews]);

  // Format date
  const formatDate = (date) => {
    if (!date || !isValid(date)) return "Không xác định";
    return format(date, "dd/MM/yyyy", { locale: vi });
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Tổng quan đánh giá
      </Heading>

      {stats.totalReviews === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            Hiện chưa có đánh giá nào cho xưởng mộc này
          </Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
          {/* Left column - Summary */}
          <GridItem>
            <Stat mb={4}>
              <StatLabel fontSize="md">Đánh giá trung bình</StatLabel>
              <HStack alignItems="center" spacing={2}>
                <StatNumber fontSize="3xl">
                  {stats.averageRating.toFixed(1)}
                </StatNumber>
                <Icon as={FiStar} color="yellow.400" boxSize={6} />
              </HStack>
              <StatHelpText>
                Dựa trên {stats.totalReviews} đánh giá
              </StatHelpText>
            </Stat>

            <Box mb={4}>
              <Text fontWeight="medium" mb={2}>
                Đánh giá gần nhất: {formatDate(stats.latestReviewDate)}
              </Text>
            </Box>

            <SimpleGrid columns={2} spacing={4} mb={4}>
              <Box>
                <Text fontWeight="medium" mb={1}>
                  Trạng thái đánh giá
                </Text>
                <HStack>
                  <Badge colorScheme="green">
                    {stats.statusDistribution.approved} đã duyệt
                  </Badge>
                  <Badge colorScheme="orange">
                    {stats.statusDistribution.pending} chờ duyệt
                  </Badge>
                </HStack>
              </Box>

              <Box>
                <Text fontWeight="medium" mb={1}>
                  Phản hồi xưởng mộc
                </Text>
                <HStack>
                  <Badge colorScheme="blue">
                    {stats.responseDistribution.responded} đã phản hồi
                  </Badge>
                  <Badge colorScheme="gray">
                    {stats.responseDistribution.pending} chưa phản hồi
                  </Badge>
                </HStack>
              </Box>
            </SimpleGrid>
          </GridItem>

          {/* Right column - Rating distribution */}
          <GridItem>
            <Text fontWeight="medium" mb={3}>
              Phân bố đánh giá
            </Text>

            <Box>
              {/* 5 stars */}
              <Flex align="center" mb={2}>
                <HStack minW="60px" mr={3}>
                  <Text>5</Text>
                  <Icon as={FiStar} color="yellow.400" />
                </HStack>
                <Progress
                  flex="1"
                  value={stats.percentages.five}
                  colorScheme="yellow"
                  size="sm"
                  borderRadius="full"
                  mr={2}
                />
                <Text minW="50px" textAlign="right">
                  {stats.ratingDistribution.five} (
                  {stats.percentages.five.toFixed(0)}%)
                </Text>
              </Flex>

              {/* 4 stars */}
              <Flex align="center" mb={2}>
                <HStack minW="60px" mr={3}>
                  <Text>4</Text>
                  <Icon as={FiStar} color="yellow.400" />
                </HStack>
                <Progress
                  flex="1"
                  value={stats.percentages.four}
                  colorScheme="yellow"
                  size="sm"
                  borderRadius="full"
                  mr={2}
                />
                <Text minW="50px" textAlign="right">
                  {stats.ratingDistribution.four} (
                  {stats.percentages.four.toFixed(0)}%)
                </Text>
              </Flex>

              {/* 3 stars */}
              <Flex align="center" mb={2}>
                <HStack minW="60px" mr={3}>
                  <Text>3</Text>
                  <Icon as={FiStar} color="yellow.400" />
                </HStack>
                <Progress
                  flex="1"
                  value={stats.percentages.three}
                  colorScheme="yellow"
                  size="sm"
                  borderRadius="full"
                  mr={2}
                />
                <Text minW="50px" textAlign="right">
                  {stats.ratingDistribution.three} (
                  {stats.percentages.three.toFixed(0)}%)
                </Text>
              </Flex>

              {/* 2 stars */}
              <Flex align="center" mb={2}>
                <HStack minW="60px" mr={3}>
                  <Text>2</Text>
                  <Icon as={FiStar} color="yellow.400" />
                </HStack>
                <Progress
                  flex="1"
                  value={stats.percentages.two}
                  colorScheme="yellow"
                  size="sm"
                  borderRadius="full"
                  mr={2}
                />
                <Text minW="50px" textAlign="right">
                  {stats.ratingDistribution.two} (
                  {stats.percentages.two.toFixed(0)}%)
                </Text>
              </Flex>

              {/* 1 star */}
              <Flex align="center" mb={2}>
                <HStack minW="60px" mr={3}>
                  <Text>1</Text>
                  <Icon as={FiStar} color="yellow.400" />
                </HStack>
                <Progress
                  flex="1"
                  value={stats.percentages.one}
                  colorScheme="yellow"
                  size="sm"
                  borderRadius="full"
                  mr={2}
                />
                <Text minW="50px" textAlign="right">
                  {stats.ratingDistribution.one} (
                  {stats.percentages.one.toFixed(0)}%)
                </Text>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}
