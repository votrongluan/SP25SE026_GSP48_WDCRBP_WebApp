import {
  Box,
  Grid,
  GridItem,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Icon,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { FiStar, FiPackage, FiDollarSign } from "react-icons/fi";
import {
  appColorTheme,
  serviceOrderStatusConstants,
} from "../../../../../config/appconfig";
import { useMemo } from "react";
import { isValid } from "date-fns";
import { formatPrice, formatDateString } from "../../../../../utils/utils";

export default function WoodworkerInfo({
  id,
  reviews = [],
  serviceOrders = [],
}) {
  // Calculate basic stats
  const stats = useMemo(() => {
    // Get woodworker info from first review or order
    const firstReview = reviews[0] || {};
    const brandName = firstReview.brandName || `Xưởng mộc #${id}`;
    const imgUrl = firstReview.woodworkerImgUrl || "";

    // Calculate review stats
    const totalReviews = reviews.length;
    let totalRating = 0;
    let fiveStarReviews = 0;
    let fourStarReviews = 0;
    let threeStarReviews = 0;
    let twoStarReviews = 0;
    let oneStarReviews = 0;

    reviews.forEach((review) => {
      totalRating += review.rating;

      switch (Math.floor(review.rating)) {
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
    });

    const avgRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // Calculate order stats
    const totalOrders = serviceOrders.length;
    const completedOrders = serviceOrders.filter(
      (order) => order.status === serviceOrderStatusConstants.DA_HOAN_TAT
    ).length;
    const pendingOrders = serviceOrders.filter(
      (order) => order.status === serviceOrderStatusConstants.DANG_CHO_THO_DUYET
    ).length;
    const inProgressOrders = serviceOrders.filter(
      (order) =>
        ![
          serviceOrderStatusConstants.DA_HOAN_TAT,
          serviceOrderStatusConstants.DA_HUY,
          serviceOrderStatusConstants.DANG_CHO_THO_DUYET,
        ].includes(order.status)
    ).length;

    const totalRevenue = serviceOrders
      .filter(
        (order) => order.status === serviceOrderStatusConstants.DA_HOAN_TAT
      )
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Last active date (from either reviews or orders)
    let lastActiveDate = null;

    if (reviews.length > 0 || serviceOrders.length > 0) {
      const reviewDates = reviews
        .map((r) => new Date(r.createdAt))
        .filter(isValid);
      const orderDates = serviceOrders
        .map((o) => new Date(o.createdAt))
        .filter(isValid);

      const allDates = [...reviewDates, ...orderDates];
      if (allDates.length > 0) {
        lastActiveDate = new Date(Math.max(...allDates));
      }
    }

    return {
      brandName,
      imgUrl,
      avgRating,
      totalReviews,
      ratingDistribution: {
        five: fiveStarReviews,
        four: fourStarReviews,
        three: threeStarReviews,
        two: twoStarReviews,
        one: oneStarReviews,
      },
      totalOrders,
      completedOrders,
      pendingOrders,
      inProgressOrders,
      totalRevenue,
      lastActiveDate,
    };
  }, [id, reviews, serviceOrders]);

  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {/* Brand info */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <HStack spacing={4} align="flex-start">
            <Avatar
              size="xl"
              name={stats.brandName}
              src={stats.imgUrl}
              bg={appColorTheme.brown_2}
            />
            <Box>
              <Link isExternal href={`/woodworker/${id}`}>
                <Text
                  color={appColorTheme.brown_2}
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  {stats.brandName}
                </Text>
              </Link>
              <Text>Mã xưởng: #{id}</Text>

              <HStack mt={2}>
                <Badge colorScheme="green">Xưởng mộc</Badge>
                {stats.lastActiveDate && (
                  <Text fontSize="sm" color="gray.500">
                    Hoạt động cuối: {formatDateString(stats.lastActiveDate)}
                  </Text>
                )}
              </HStack>
            </Box>
          </HStack>
        </GridItem>

        {/* Reviews stat */}
        <GridItem>
          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiStar} mr={2} color="yellow.400" />
              Đánh giá
            </StatLabel>
            <StatNumber color="yellow.400">
              {stats.avgRating.toFixed(1)}
            </StatNumber>
            <StatHelpText>{stats.totalReviews} đánh giá</StatHelpText>
          </Stat>
        </GridItem>

        {/* Orders stat */}
        <GridItem>
          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiPackage} mr={2} color="blue.500" />
              Đơn dịch vụ
            </StatLabel>
            <StatNumber color="blue.500">{stats.totalOrders}</StatNumber>
            <StatHelpText>
              {stats.completedOrders} hoàn tất, {stats.pendingOrders} chờ xác
              nhận
            </StatHelpText>
          </Stat>
        </GridItem>

        {/* Revenue stat */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Stat>
            <StatLabel display="flex" alignItems="center">
              <Icon as={FiDollarSign} mr={2} color="green.500" />
              Doanh thu
            </StatLabel>
            <StatNumber color="green.500">
              {formatPrice(stats.totalRevenue)}
            </StatNumber>
            <StatHelpText>
              Từ {stats.completedOrders} đơn dịch vụ hoàn tất
            </StatHelpText>
          </Stat>
        </GridItem>
      </Grid>
    </Box>
  );
}
