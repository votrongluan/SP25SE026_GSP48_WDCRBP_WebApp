import {
  Stat,
  StatNumber,
  StatHelpText,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

function renderStat(stat, period) {
  return (
    <>
      <Box mb="8px" alignItems="center" justifyContent="space-between">
        <Heading fontWeight="normal" fontSize="18px" color="white">
          {stat.label}
        </Heading>
        <Heading mt="8px" fontWeight="normal" fontSize="18px" color="white">
          {period ? `${period}` : ""}
        </Heading>
      </Box>

      <Stat color="white" my="16px">
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

export default function RevenueDashboard() {
  const [statsData, setData] = useState(null);

  const revenueData = {
    labels: ["25/10", "26/10", "27/10", "28/10", "29/10", "30/10", "31/10"],
    datasets: [
      {
        label: "Doanh thu",
        data: [3750000, 1500000, 0, 3000000, 0, 3750000, 3000000],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  const profitData = {
    labels: ["25/10", "26/10", "27/10", "28/10", "29/10", "30/10", "31/10"],
    datasets: [
      {
        label: "Doanh thu",
        data: [
          3750000 * 0.3,
          1500000 * 0.3,
          0,
          3000000 * 0.3,
          0,
          3750000 * 0.3,
          3000000 * 0.3,
        ],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  function fetchAll() {
    axios.get("/statistic/admin").then((response) => {
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
      <SimpleGrid mt="20px" columns={3} gap="20px">
        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.allCustomer)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.allSupplier)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.allTransaction)}
        </GridItem>
      </SimpleGrid>

      <Box height="50px"></Box>

      <SimpleGrid mt="20px" columns={4} gap="20px">
        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.todayOrders)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.todayPrintOrders)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.totalRevenueToday)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.totalProfitToday)}
        </GridItem>
      </SimpleGrid>

      <SimpleGrid mt="20px" columns={4} gap="20px">
        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.last30DaysOrders, statsData.monthPeriod)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.last30DaysPrintOrders, statsData.monthPeriod)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.totalRevenueLast30Days, statsData.monthPeriod)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.totalProfitLast30Days, statsData.monthPeriod)}
        </GridItem>
      </SimpleGrid>

      <SimpleGrid mt="20px" columns={4} gap="20px">
        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.allOrders)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.allPrintOrders)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.totalRevenueAllTime)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.totalProfitAllTime)}
        </GridItem>
      </SimpleGrid>

      <Box height="50px"></Box>

      <SimpleGrid mt="20px" columns={2} gap="20px">
        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat({
            label: "Tổng doanh thu (25/10 - 31/10)",
            value: "15000000",
            change: 0,
            comparison: "0%",
            direction: "up",
          })}
          <Line data={revenueData} />
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat({
            label: "Tổng hoa hồng (25/10 -31/10)",
            value: "4500000",
            change: 0,
            comparison: "0%",
            direction: "up",
          })}
          <Line data={profitData} />
        </GridItem>
      </SimpleGrid>
    </>
  );
}
