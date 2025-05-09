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
import {
  format,
  parseISO,
  eachMonthOfInterval,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isValid,
  subMonths,
  startOfDay,
  endOfDay,
} from "date-fns";
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

export default function ReviewsChart({ reviews = [] }) {
  const [chartType, setChartType] = useState("rating"); // "rating" or "count"
  const [chartStyle, setChartStyle] = useState("line"); // "line" or "bar"
  const [timeFrame, setTimeFrame] = useState("monthly"); // "monthly" or "daily"
  const [dateRange, setDateRange] = useState({
    startDate: subMonths(new Date(), 6), // Last 6 months by default
    endDate: new Date(),
  });
  const [tempDateRange, setTempDateRange] = useState({
    startDate: subMonths(new Date(), 6),
    endDate: new Date(),
  });

  const handleDateChange = (field, value) => {
    if (!value) {
      // Handle empty value
      setTempDateRange((prev) => ({
        ...prev,
        [field]: field === "startDate" ? subMonths(new Date(), 6) : new Date(),
      }));
    } else {
      const newDate = new Date(value);
      if (isValid(newDate)) {
        setTempDateRange((prev) => ({
          ...prev,
          [field]:
            field === "startDate" ? startOfDay(newDate) : endOfDay(newDate),
        }));
      }
    }
  };

  const handleApplyDateFilter = () => {
    setDateRange(tempDateRange);
  };

  const chartData = useMemo(() => {
    if (reviews.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Không có dữ liệu",
            data: [],
            borderColor: "rgba(159, 122, 234, 1)",
            backgroundColor: "rgba(159, 122, 234, 0.1)",
          },
        ],
      };
    }

    // Validate dates
    const start = isValid(dateRange.startDate)
      ? dateRange.startDate
      : subMonths(new Date(), 6);
    const end = isValid(dateRange.endDate) ? dateRange.endDate : new Date();

    // Filter reviews within date range
    const filteredReviews = reviews.filter((review) => {
      if (!review.createdAt) return false;

      const reviewDate = new Date(review.createdAt);
      return isValid(reviewDate) && reviewDate >= start && reviewDate <= end;
    });

    // Get time intervals based on selected timeframe
    let timeIntervals = [];
    let formatString = "";

    if (timeFrame === "monthly") {
      timeIntervals = eachMonthOfInterval({ start, end });
      formatString = "MM/yyyy";
    } else {
      timeIntervals = eachDayOfInterval({ start, end });
      formatString = "dd/MM";
    }

    // Initialize data for each interval
    const timeData = timeIntervals.map((date) => {
      const displayDate = format(date, formatString, { locale: vi });
      const intervalStart =
        timeFrame === "monthly" ? startOfMonth(date) : startOfDay(date);
      const intervalEnd =
        timeFrame === "monthly" ? endOfMonth(date) : endOfDay(date);

      return {
        start: intervalStart,
        end: intervalEnd,
        displayDate,
        totalRating: 0,
        reviewCount: 0,
      };
    });

    // Populate data
    filteredReviews.forEach((review) => {
      if (!review.createdAt) return;

      try {
        const reviewDate = new Date(review.createdAt);
        if (!isValid(reviewDate)) return;

        const timeDataItem = timeData.find(
          (d) => reviewDate >= d.start && reviewDate <= d.end
        );

        if (timeDataItem) {
          timeDataItem.totalRating += review.rating;
          timeDataItem.reviewCount += 1;
        }
      } catch (error) {
        console.error("Error processing review date:", error, review);
      }
    });

    // Prepare datasets based on chart type
    let datasets = [];

    if (chartType === "rating") {
      datasets = [
        {
          label: "Đánh giá trung bình",
          data: timeData.map((d) =>
            d.reviewCount > 0 ? (d.totalRating / d.reviewCount).toFixed(1) : 0
          ),
          borderColor: "rgba(246, 173, 85, 1)", // Orange
          backgroundColor: "rgba(246, 173, 85, 0.1)",
        },
      ];
    } else if (chartType === "count") {
      datasets = [
        {
          label: "Số lượng đánh giá",
          data: timeData.map((d) => d.reviewCount),
          borderColor: "rgba(159, 122, 234, 1)", // Purple
          backgroundColor: "rgba(159, 122, 234, 0.1)",
        },
      ];
    }

    return {
      labels: timeData.map((d) => d.displayDate),
      datasets,
    };
  }, [reviews, dateRange, chartType, timeFrame]);

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
            if (chartType === "rating") {
              return `${context.dataset.label}: ${context.parsed.y}`;
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
          text: chartType === "rating" ? "Đánh giá trung bình" : "Số lượng",
        },
        min: chartType === "rating" ? 0 : undefined,
        max: chartType === "rating" ? 5 : undefined,
      },
      x: {
        title: {
          display: true,
          text: timeFrame === "monthly" ? "Tháng" : "Ngày",
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
      <Heading size="md">Biểu đồ đánh giá theo thời gian</Heading>

      {reviews.length === 0 ? (
        <Center h="200px">
          <Text color="gray.500">
            Không có dữ liệu đánh giá để hiển thị biểu đồ
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
                    <Radio value="rating">Đánh giá trung bình</Radio>
                    <Radio value="count">Số lượng đánh giá</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <VStack spacing={4} align="flex-start">
                <FormControl maxW="150px">
                  <FormLabel>Kiểu biểu đồ</FormLabel>
                  <RadioGroup value={chartStyle} onChange={setChartStyle}>
                    <Stack direction="column">
                      <Radio value="line">Đường</Radio>
                      <Radio value="bar">Cột</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl maxW="150px">
                  <FormLabel>Thời gian</FormLabel>
                  <RadioGroup value={timeFrame} onChange={setTimeFrame}>
                    <Stack direction="column">
                      <Radio value="monthly">Theo tháng</Radio>
                      <Radio value="daily">Theo ngày</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </VStack>
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
