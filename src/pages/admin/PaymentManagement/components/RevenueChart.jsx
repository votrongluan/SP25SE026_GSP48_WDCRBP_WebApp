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
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { useMemo, useState } from "react";
import { paymentForConstants } from "../../../../config/appconfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

export default function RevenueChart({ transactions }) {
  const [chartType, setChartType] = useState("revenue"); // "revenue" or "volume"
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
    // Validate dates
    const start = isValid(dateRange.startDate)
      ? dateRange.startDate
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = isValid(dateRange.endDate) ? dateRange.endDate : new Date();

    // Filter transactions within date range
    const filteredTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      return isValid(txDate) && txDate >= start && txDate <= end && tx.status;
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
        revenue: 0,
        volume: 0,
      };
    });

    // Populate data
    filteredTransactions.forEach((tx) => {
      if (!tx.createdAt) return;

      try {
        const txDate = format(parseISO(tx.createdAt), "yyyy-MM-dd");
        const dayData = dailyData.find((d) => d.date === txDate);

        if (dayData) {
          if (tx.paymentFor === paymentForConstants.SERVICE_PACK_PAYMENT) {
            dayData.revenue += tx.amount;
          }
          dayData.volume += tx.amount;
        }
      } catch (error) {
        console.error("Error processing transaction date:", error, tx);
      }
    });

    // Prepare dataset based on chart type
    let datasets = [];
    if (chartType === "revenue") {
      datasets = [
        {
          label: "Thu nhập",
          data: dailyData.map((d) => d.revenue / 1000000), // Convert to millions for better display
          borderColor: "rgba(56, 161, 105, 1)", // Green
          backgroundColor: "rgba(56, 161, 105, 0.1)",
        },
      ];
    } else if (chartType === "volume") {
      datasets = [
        {
          label: "Tổng số tiền đã giao dịch trên nền tảng",
          data: dailyData.map((d) => d.volume / 1000000), // Convert to millions
          borderColor: "rgba(49, 130, 206, 1)", // Blue
          backgroundColor: "rgba(49, 130, 206, 0.1)",
        },
      ];
    } else if (chartType === "both") {
      datasets = [
        {
          label: "Thu nhập",
          data: dailyData.map((d) => d.revenue / 1000000),
          borderColor: "rgba(56, 161, 105, 1)", // Green
          backgroundColor: "rgba(56, 161, 105, 0.1)",
          yAxisID: "y",
        },
        {
          label: "Tổng số tiền đã giao dịch trên nền tảng",
          data: dailyData.map((d) => d.volume / 1000000),
          borderColor: "rgba(49, 130, 206, 1)", // Blue
          backgroundColor: "rgba(49, 130, 206, 0.1)",
          yAxisID: "y",
        },
      ];
    }

    return {
      labels: dailyData.map((d) => d.displayDate),
      datasets,
    };
  }, [transactions, dateRange, chartType]);

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
            return `${context.dataset.label}: ${context.parsed.y.toFixed(
              2
            )} triệu VNĐ`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Triệu VNĐ",
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
      <Heading size="md">Biểu đồ Thu nhập và giao dịch</Heading>

      <HStack spacing={4} justifyContent="space-between" wrap="wrap">
        <HStack spacing={4}>
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

          <Button colorScheme="blue" mt="auto" onClick={handleApplyDateFilter}>
            Xem
          </Button>
        </HStack>

        <FormControl maxW="300px">
          <FormLabel>Hiển thị dữ liệu</FormLabel>
          <RadioGroup value={chartType} onChange={setChartType}>
            <Stack direction="column">
              <Radio value="revenue">Thu nhập</Radio>
              <Radio value="volume">Tổng giao dịch</Radio>
              <Radio value="both">Cả hai</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </HStack>

      <Box height="400px">
        <Line data={chartData} options={chartOptions} />
      </Box>
    </VStack>
  );
}
