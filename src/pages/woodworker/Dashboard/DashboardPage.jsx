import {
  Box,
  SimpleGrid,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Heading,
  Text,
  Card,
  CardBody,
  Stack,
  HStack,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../config/appconfig";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { FaBox, FaUsers, FaStar, FaExclamationTriangle } from "react-icons/fa";

// Mock data - TODO: Replace with API data
const revenueData = [
  { month: "T1", value: 4000000 },
  { month: "T2", value: 3000000 },
  { month: "T3", value: 5000000 },
  { month: "T4", value: 4500000 },
  { month: "T5", value: 6000000 },
  { month: "T6", value: 5500000 },
];

const orderStatusData = [
  { status: "Đã hoàn thành", value: 45 },
  { status: "Đang xử lý", value: 30 },
  { status: "Chờ xác nhận", value: 15 },
  { status: "Đã hủy", value: 10 },
];

const recentOrders = [
  {
    id: "ORD001",
    customer: "Nguyễn Văn A",
    amount: 2500000,
    status: "Đang xử lý",
    date: "2024-03-15",
  },
  {
    id: "ORD002",
    customer: "Trần Thị B",
    amount: 1800000,
    status: "Đã hoàn thành",
    date: "2024-03-14",
  },
  {
    id: "ORD003",
    customer: "Lê Văn C",
    amount: 3200000,
    status: "Chờ xác nhận",
    date: "2024-03-13",
  },
];

const recentReviews = [
  {
    id: "REV001",
    customer: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất đẹp, đúng như mong đợi",
    date: "2024-03-15",
  },
  {
    id: "REV002",
    customer: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng tốt, giao hàng nhanh",
    date: "2024-03-14",
  },
];

const StatCard = ({ label, value, change, icon }) => (
  <Card>
    <CardBody>
      <HStack justify="space-between">
        <Box>
          <StatLabel color="gray.600">{label}</StatLabel>
          <StatNumber fontSize="2xl">{value}</StatNumber>
          <StatHelpText>
            <StatArrow type={change >= 0 ? "increase" : "decrease"} />
            {Math.abs(change)}% so với tháng trước
          </StatHelpText>
        </Box>
        <Icon as={icon} w={10} h={10} color={appColorTheme.brown_2} />
      </HStack>
    </CardBody>
  </Card>
);

export default function DashboardPage() {
  return (
    <Stack spacing={6}>
      <Heading
        color={appColorTheme.brown_2}
        fontSize="2xl"
        fontFamily="Montserrat"
      >
        Tổng quan
      </Heading>

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <StatCard label="Tổng đơn hàng" value="156" change={12} icon={FaBox} />
        <StatCard label="Khách hàng mới" value="45" change={8} icon={FaUsers} />
        <StatCard
          label="Đánh giá trung bình"
          value="4.8"
          change={2}
          icon={FaStar}
        />
        <StatCard
          label="Khiếu nại"
          value="3"
          change={-25}
          icon={FaExclamationTriangle}
        />
      </SimpleGrid>

      {/* Charts */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Revenue Chart */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Doanh thu theo tháng
            </Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) =>
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(value)
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={appColorTheme.brown_2}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Order Status Chart */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Trạng thái đơn hàng
            </Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill={appColorTheme.brown_2}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Recent Orders & Reviews */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Recent Orders */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Đơn hàng gần đây
            </Heading>
            <Stack spacing={4}>
              {recentOrders.map((order) => (
                <Box
                  key={order.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{ shadow: "md" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <Text fontWeight="bold">{order.id}</Text>
                      <Text color="gray.600">{order.customer}</Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontWeight="bold">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.amount)}
                      </Text>
                      <Badge
                        colorScheme={
                          order.status === "Đã hoàn thành"
                            ? "green"
                            : order.status === "Đang xử lý"
                            ? "blue"
                            : order.status === "Chờ xác nhận"
                            ? "yellow"
                            : "red"
                        }
                      >
                        {order.status}
                      </Badge>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Đánh giá gần đây
            </Heading>
            <Stack spacing={4}>
              {recentReviews.map((review) => (
                <Box
                  key={review.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  _hover={{ shadow: "md" }}
                >
                  <HStack justify="space-between">
                    <Box>
                      <Text fontWeight="bold">{review.customer}</Text>
                      <Text color="gray.600">{review.comment}</Text>
                    </Box>
                    <Box textAlign="right">
                      <HStack spacing={1}>
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            as={FaStar}
                            color={
                              i < review.rating ? "yellow.400" : "gray.300"
                            }
                          />
                        ))}
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        {review.date}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
