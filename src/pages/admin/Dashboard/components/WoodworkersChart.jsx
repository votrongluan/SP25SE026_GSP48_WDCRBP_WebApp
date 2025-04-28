import {
  Box,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  VStack,
  RadioGroup,
  Radio,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Pie, Bar } from "react-chartjs-2";
import { useMemo, useState } from "react";
import { getPackTypeLabel } from "../../../../config/appconfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define chart colors
const chartColors = {
  Gold: {
    backgroundColor: "rgba(246, 224, 94, 0.7)",
    borderColor: "rgba(246, 224, 94, 1)",
  },
  Silver: {
    backgroundColor: "rgba(192, 192, 192, 0.7)",
    borderColor: "rgba(192, 192, 192, 1)",
  },
  Bronze: {
    backgroundColor: "rgba(205, 127, 50, 0.7)",
    borderColor: "rgba(205, 127, 50, 1)",
  },
  default: {
    backgroundColor: "rgba(160, 174, 192, 0.7)",
    borderColor: "rgba(160, 174, 192, 1)",
  },
  cityColors: [
    "rgba(56, 161, 105, 0.7)", // Green
    "rgba(49, 130, 206, 0.7)", // Blue
    "rgba(237, 137, 54, 0.7)", // Orange
    "rgba(159, 122, 234, 0.7)", // Purple
    "rgba(229, 62, 62, 0.7)", // Red
    "rgba(246, 173, 85, 0.7)", // Light orange
    "rgba(113, 128, 150, 0.7)", // Gray
  ],
};

export default function WoodworkersChart({ woodworkers }) {
  const [chartType, setChartType] = useState("servicePack"); // "servicePack" or "city" or "rating"
  const [chartStyle, setChartStyle] = useState("pie"); // "pie" or "bar"

  // Get all unique cities
  const cityNames = useMemo(() => {
    const cities = new Set();
    woodworkers.forEach((ww) => {
      if (ww.cityId) {
        cities.add(ww.cityId);
      }
    });
    return Array.from(cities);
  }, [woodworkers]);

  // Get city name mapping
  const cityNameMap = useMemo(() => {
    const cityMap = {
      202: "TP. Hồ Chí Minh",
      203: "Đà Nẵng",
      201: "Hà Nội",
      // Add more city mappings as needed
    };
    return cityMap;
  }, []);

  const chartData = useMemo(() => {
    if (chartType === "servicePack") {
      // Group by service pack
      const packCounts = woodworkers.reduce((acc, ww) => {
        const packName = ww.servicePack?.name || "None";
        acc[packName] = (acc[packName] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(packCounts).map((pack) =>
        getPackTypeLabel(pack)
      );
      const data = Object.values(packCounts);
      const backgroundColor = Object.keys(packCounts).map(
        (pack) =>
          chartColors[pack]?.backgroundColor ||
          chartColors.default.backgroundColor
      );
      const borderColor = Object.keys(packCounts).map(
        (pack) =>
          chartColors[pack]?.borderColor || chartColors.default.borderColor
      );

      return {
        labels,
        datasets: [
          {
            label: "Số lượng xưởng mộc",
            data,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
        ],
      };
    } else if (chartType === "city") {
      // Group by city
      const cityCounts = woodworkers.reduce((acc, ww) => {
        const cityId = ww.cityId || "Unknown";
        acc[cityId] = (acc[cityId] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(cityCounts).map(
        (cityId) => cityNameMap[cityId] || cityId
      );
      const data = Object.values(cityCounts);

      return {
        labels,
        datasets: [
          {
            label: "Số lượng xưởng mộc",
            data,
            backgroundColor: chartColors.cityColors,
            borderWidth: 1,
          },
        ],
      };
    } else if (chartType === "rating") {
      // Group by rating range
      const ratingRanges = {
        "5 sao": 0,
        "4 - 4.9 sao": 0,
        "3 - 3.9 sao": 0,
        "2 - 2.9 sao": 0,
        "1 - 1.9 sao": 0,
        "Chưa có đánh giá": 0,
      };

      woodworkers.forEach((ww) => {
        if (!ww.totalReviews || ww.totalReviews === 0) {
          ratingRanges["Chưa có đánh giá"]++;
          return;
        }

        const rating = ww.totalStar / ww.totalReviews;

        if (rating === 5) {
          ratingRanges["5 sao"]++;
        } else if (rating >= 4) {
          ratingRanges["4 - 4.9 sao"]++;
        } else if (rating >= 3) {
          ratingRanges["3 - 3.9 sao"]++;
        } else if (rating >= 2) {
          ratingRanges["2 - 2.9 sao"]++;
        } else {
          ratingRanges["1 - 1.9 sao"]++;
        }
      });

      const labels = Object.keys(ratingRanges);
      const data = Object.values(ratingRanges);
      const backgroundColor = [
        "rgba(56, 161, 105, 0.7)", // Green (5 stars)
        "rgba(49, 130, 206, 0.7)", // Blue (4-4.9)
        "rgba(237, 137, 54, 0.7)", // Orange (3-3.9)
        "rgba(246, 173, 85, 0.7)", // Light orange (2-2.9)
        "rgba(229, 62, 62, 0.7)", // Red (1-1.9)
        "rgba(160, 174, 192, 0.7)", // Gray (no rating)
      ];

      return {
        labels,
        datasets: [
          {
            label: "Số lượng xưởng mộc",
            data,
            backgroundColor,
            borderWidth: 1,
          },
        ],
      };
    }

    return {
      labels: [],
      datasets: [],
    };
  }, [woodworkers, chartType, cityNameMap]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    scales:
      chartStyle === "bar"
        ? {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Số lượng xưởng mộc",
              },
            },
          }
        : {},
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack justifyContent="space-between">
        <Heading size="md">Phân tích xưởng mộc</Heading>

        <HStack spacing={4}>
          <FormControl maxW="180px">
            <FormLabel>Hiển thị dữ liệu</FormLabel>
            <Select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="servicePack">Theo gói dịch vụ</option>
              <option value="city">Theo thành phố</option>
              <option value="rating">Theo đánh giá</option>
            </Select>
          </FormControl>

          <FormControl maxW="150px">
            <FormLabel>Kiểu biểu đồ</FormLabel>
            <RadioGroup value={chartStyle} onChange={setChartStyle}>
              <Stack direction="row">
                <Radio value="pie">Tròn</Radio>
                <Radio value="bar">Cột</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </HStack>
      </HStack>

      <Box
        height="400px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {chartStyle === "pie" ? (
          <Box maxWidth="500px" width="100%">
            <Pie data={chartData} options={chartOptions} />
          </Box>
        ) : (
          <Box width="100%">
            <Bar data={chartData} options={chartOptions} />
          </Box>
        )}
      </Box>
    </VStack>
  );
}
