import {
  Box,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
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
import { format, parseISO, eachDayOfInterval } from "date-fns";
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

export default function TransactionChart({
  transactions,
  dateRange,
  setDateRange,
}) {
  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: new Date(value),
    }));
  };

  const chartData = useMemo(() => {
    // Filter transactions within date range
    const filteredTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      return (
        txDate >= dateRange.startDate &&
        txDate <= dateRange.endDate &&
        tx.status
      );
    });

    // Get all days in the range
    const daysInRange = eachDayOfInterval({
      start: dateRange.startDate,
      end: dateRange.endDate,
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
      const txDate = format(parseISO(tx.createdAt), "yyyy-MM-dd");
      const dayData = dailyData.find((d) => d.date === txDate);

      if (dayData) {
        if (tx.paymentFor === paymentForConstants.SERVICE_PACK_PAYMENT) {
          dayData.revenue += tx.amount;
        }
        dayData.volume += tx.amount;
      }
    });

    // Prepare chart data
    return {
      labels: dailyData.map((d) => d.displayDate),
      datasets: [
        {
          label: "Doanh thu",
          data: dailyData.map((d) => d.revenue / 1000000), // Convert to millions for better display
          borderColor: "rgba(56, 161, 105, 1)", // Green
          backgroundColor: "rgba(56, 161, 105, 0.1)",
          yAxisID: "y",
        },
        {
          label: "Tổng số tiền đã giao dịch trên nền tảng",
          data: dailyData.map((d) => d.volume / 1000000), // Convert to millions
          borderColor: "rgba(49, 130, 206, 1)", // Blue
          backgroundColor: "rgba(49, 130, 206, 0.1)",
          yAxisID: "y",
        },
      ],
    };
  }, [transactions, dateRange]);

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

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Biểu đồ doanh thu và giao dịch</Heading>

      <HStack spacing={4}>
        <FormControl>
          <FormLabel>Từ ngày</FormLabel>
          <Input
            type="date"
            value={dateRange.startDate.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Đến ngày</FormLabel>
          <Input
            type="date"
            value={dateRange.endDate.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
          />
        </FormControl>
      </HStack>

      <Box height="400px">
        <Line data={chartData} options={chartOptions} />
      </Box>
    </VStack>
  );
}
