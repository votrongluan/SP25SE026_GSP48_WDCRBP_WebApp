import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  VStack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { appColorTheme } from "../../../../config/appconfig";
import { useGetWoodworkerReviewsQuery } from "../../../../services/reviewApi";
import { useGetServiceOrdersQuery } from "../../../../services/serviceOrderApi";
import { useState, useEffect } from "react";
import WoodworkerServiceOrdersDashboard from "./sections/WoodworkerServiceOrdersDashboard";
import ReviewsOverview from "./components/ReviewsOverview";
import ReviewsChart from "./components/ReviewsChart";
import ReviewsTable from "./components/ReviewsTable";
import WoodworkerInfo from "./components/WoodworkerInfo";

export default function WWPerformanceDetailPage() {
  const { id } = useParams();
  const toast = useToast();
  const [woodworkerName, setWoodworkerName] = useState("");

  // Fetch woodworker reviews
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
    error: reviewsError,
  } = useGetWoodworkerReviewsQuery(id);

  // Fetch woodworker service orders
  const {
    data: serviceOrdersData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    error: ordersError,
  } = useGetServiceOrdersQuery({ id, role: "Woodworker" });

  // Set woodworker name from reviews data
  useEffect(() => {
    if (reviewsData?.data && reviewsData.data.length > 0) {
      setWoodworkerName(reviewsData.data[0].brandName);
    } else if (serviceOrdersData?.data && serviceOrdersData.data.length > 0) {
      // Fallback to get name from orders if available
      const order = serviceOrdersData.data.find((o) => o.woodworkerName);
      if (order) {
        setWoodworkerName(order.woodworkerName);
      }
    }
  }, [reviewsData, serviceOrdersData]);

  // Handle errors
  useEffect(() => {
    if (isErrorReviews) {
      toast({
        title: "Lỗi khi tải đánh giá",
        description:
          reviewsError?.data?.message ||
          "Không thể tải dữ liệu đánh giá xưởng mộc",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    if (isErrorOrders) {
      toast({
        title: "Lỗi khi tải đơn dịch vụ",
        description:
          ordersError?.data?.message || "Không thể tải dữ liệu đơn dịch vụ",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isErrorReviews, isErrorOrders, reviewsError, ordersError, toast]);

  // Loading state
  if (isLoadingReviews && isLoadingOrders) {
    return (
      <Center h="500px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Reviews data
  const reviews = reviewsData?.data || [];
  // Service orders data
  const serviceOrders = serviceOrdersData?.data || [];

  return (
    <Box p={5}>
      {/* Breadcrumb navigation */}
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
        mb={5}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/mod">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/mod/performance">
            Hiệu suất xưởng mộc
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Chi tiết</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" color={appColorTheme.brown_2} mb={2}>
            Chi tiết hiệu suất xưởng mộc
          </Heading>
        </Box>

        {/* Woodworker basic info */}
        <WoodworkerInfo
          id={id}
          reviews={reviews}
          serviceOrders={serviceOrders}
        />

        {/* Tabs for different sections */}
        <Tabs colorScheme="brown" variant="enclosed">
          <TabList>
            <Tab>Đơn dịch vụ</Tab>
            <Tab>Đánh giá</Tab>
          </TabList>

          <TabPanels>
            {/* Service Orders Tab */}
            <TabPanel>
              <WoodworkerServiceOrdersDashboard
                serviceOrders={serviceOrders}
                isLoading={isLoadingOrders}
                isError={isErrorOrders}
              />
            </TabPanel>

            {/* Reviews Tab */}
            <TabPanel>
              <VStack spacing={8} align="stretch">
                {/* Reviews Overview */}
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  <ReviewsOverview reviews={reviews} />
                </Box>

                {/* Reviews Chart */}
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  <ReviewsChart reviews={reviews} />
                </Box>

                {/* Reviews Table */}
                <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
                  <ReviewsTable reviews={reviews} />
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
}
