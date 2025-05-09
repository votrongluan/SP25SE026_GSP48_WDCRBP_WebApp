import {
  Box,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
  RadioGroup,
  Radio,
  Stack,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { Line, Bar } from "react-chartjs-2";
import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format, parseISO, eachDayOfInterval, isValid } from "date-fns";
import { vi } from "date-fns/locale";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ServiceOrdersChart({ serviceOrders = [] }) {
  const [chartType, setChartType] = useState("value"); // "value" or "count"
  const [chartStyle, setChartStyle] = useState("line"); // "line" or "bar"
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

  const chartData = useMemo(() => {
    if (serviceOrders.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Validate dates
    const start = isValid(dateRange.startDate)
      ? dateRange.startDate
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = isValid(dateRange.endDate) ? dateRange.endDate : new Date();

    // Filter orders within date range
    const filteredOrders = serviceOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return isValid(orderDate) && orderDate >= start && orderDate <= end;
    });

    // Get all days in the range
    const daysInRange = eachDayOfInterval({
      start,
      end,
    });

    // Initialize data for each day
    const dailyData = daysInRange.map((day) => {
      const formattedDate = format(day, "yyyy-MM-dd");
      return {
        date: formattedDate,
        displayDate: format(day, "dd/MM", { locale: vi }),
        totalAmount: 0,
        orderCount: 0,
      };
    });

    // Populate data
    filteredOrders.forEach((order) => {
      if (!order.createdAt) return;

      try {
        const orderDate = format(parseISO(order.createdAt), "yyyy-MM-dd");
        const dayData = dailyData.find((d) => d.date === orderDate);

        if (dayData) {
          dayData.totalAmount += order.totalAmount;
          dayData.orderCount += 1;
        }
      } catch (error) {
        console.error("Error processing order date:", error, order);
      }
    });

    // Prepare datasets based on chart type
    let datasets = [];

    if (chartType === "value") {
      datasets = [
        {
          label: "Giá trị đơn dịch vụ",
          data: dailyData.map((d) => d.totalAmount / 1000000), // Convert to millions
          borderColor: "rgba(159, 122, 234, 1)", // Purple
          backgroundColor: "rgba(159, 122, 234, 0.1)",
        },
      ];
    } else if (chartType === "count") {
      datasets = [
        {
          label: "Số lượng đơn dịch vụ",
          data: dailyData.map((d) => d.orderCount),
          borderColor: "rgba(246, 173, 85, 1)", // Orange
          backgroundColor: "rgba(246, 173, 85, 0.1)",
        },
      ];
    }

    return {
      labels: dailyData.map((d) => d.displayDate),
      datasets,
    };
  }, [serviceOrders, dateRange, chartType]);

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (chartType === "value") {
              return `${context.dataset.label}: ${context.parsed.y.toFixed(
                2
              )} triệu VNĐ`;
            }
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: chartType === "value" ? "Triệu VNĐ" : "Số lượng",
        },
      },
      x: {
        title: {
          display: true,
          text: "Ngày",
        },
      },
    },
  };

  // Safely get ISO string for input value
  const getDateInputValue = (date) => {
    return isValid(date) ? date.toISOString().split("T")[0] : "";
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Biểu đồ đơn đặt dịch vụ</Heading>

      {serviceOrders.length === 0 ? (
        <Center h="200px">
          <Text color="gray.500">
            Không có dữ liệu đơn dịch vụ để hiển thị biểu đồ
          </Text>
        </Center>
      ) : (
        <>
          <HStack spacing={4} wrap="wrap" justifyContent="space-between">
            <HStack spacing={4}>
              <FormControl maxW="150px">
                <FormLabel>Từ ngày</FormLabel>
                <Input
                  type="date"
                  value={getDateInputValue(tempDateRange.startDate)}
                  onChange={(e) =>
                    handleDateChange("startDate", e.target.value)
                  }
                />
              </FormControl>

              <FormControl maxW="150px">
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

            <HStack spacing={4}>
              <FormControl maxW="180px">
                <FormLabel>Hiển thị dữ liệu</FormLabel>
                <RadioGroup value={chartType} onChange={setChartType}>
                  <Stack direction="column">
                    <Radio value="value">Giá trị</Radio>
                    <Radio value="count">Số lượng</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl maxW="150px">
                <FormLabel>Kiểu biểu đồ</FormLabel>
                <RadioGroup value={chartStyle} onChange={setChartStyle}>
                  <Stack direction="column">
                    <Radio value="line">Đường</Radio>
                    <Radio value="bar">Cột</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </HStack>
          </HStack>

          <Box height="400px">
            {chartStyle === "line" ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <Bar data={chartData} options={chartOptions} />
            )}
          </Box>
        </>
      )}
    </VStack>
  );
}
