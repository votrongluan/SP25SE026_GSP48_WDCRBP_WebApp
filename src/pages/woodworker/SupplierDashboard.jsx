import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Select,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function renderStat(stat, period) {
  return (
    <>
      <Box mb="8px" alignItems="center" justifyContent="space-between">
        <Heading fontWeight="normal" fontSize="18px" color="app_white.0">
          {stat.label}
        </Heading>
        <Heading
          mt="8px"
          fontWeight="normal"
          fontSize="18px"
          color="app_white.0"
        >
          {period ? `${period}` : ""}
        </Heading>
      </Box>

      <Stat color="app_white.0" my="16px">
        <StatNumber>{(+stat.value).toLocaleString()}</StatNumber>
        <StatHelpText>
          <Text color={stat.direction === "down" ? "red.500" : "green.500"}>
            {stat.direction === "down" ? "▼" : "▲"} {Math.abs(stat.change)}% (
            Kỳ trước: {stat.comparison})
          </Text>
        </StatHelpText>
      </Stat>
    </>
  );
}

const optionStyle = {
  backgroundColor: "#00060F",
  color: "white",
};

export default function SupplierDashboard() {
  const [statsData, setData] = useState(null);
  const { auth } = useAuth();

  const revenueData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Doanh thu",
        data: [300, 500, 250, 400, 200],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  const profitData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Lợi nhuận",
        data: [100, 200, 150, 180, 130],
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
      },
    ],
  };

  function fetchAll() {
    axios
      .get(`/statistic/supplier?supplierId=${auth?.EmployeeId}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }

  useEffect(() => {
    fetchAll();
  }, []);

  if (!statsData) return <Spinner />;

  return (
    <>
      <Heading height={"100px"} as="h2" size="lg" textAlign="center">
        Bảng điều khiển
      </Heading>

      <SimpleGrid mt="8px" columns={3} gap="8px">
        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.todayOrders)}
        </GridItem>

        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.todayPrintOrders)}
        </GridItem>

        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.totalRevenueToday)}
        </GridItem>
      </SimpleGrid>

      <SimpleGrid mt="8px" columns={3} gap="8px">
        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.last30DaysOrders, statsData.monthPeriod)}
        </GridItem>

        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.last30DaysPrintOrders, statsData.monthPeriod)}
        </GridItem>

        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.totalRevenueLast30Days, statsData.monthPeriod)}
        </GridItem>
      </SimpleGrid>

      <SimpleGrid mt="8px" columns={3} gap="8px">
        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.allOrders)}
        </GridItem>

        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.allPrintOrders)}
        </GridItem>

        <GridItem bgColor="app_black.0" border="1px solid black" p="12px">
          {renderStat(statsData.totalRevenueAllTime)}
        </GridItem>
      </SimpleGrid>
    </>
  );
}
