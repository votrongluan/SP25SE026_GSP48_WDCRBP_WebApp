import React from "react";
import {
  Box,
  Container,
  Heading,
  Flex,
  VStack,
  HStack,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import MarketingDashboard from "./MarketingDashboard";
import RevenueDashboard from "./RevenueDashboard";

const DashboardPage = () => {
  const chartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Số lượng",
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        data: [4500, 5300, 6250, 7800, 9800, 15000],
      },
    ],
  };

  return (
    <>
      <Heading as="h2" size="lg" textAlign="center">
        Bảng điều khiển
      </Heading>

      <Tabs colorScheme="black">
        <TabList>
          <Tab>Doanh thu</Tab>
          <Tab>Marketing</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RevenueDashboard />
          </TabPanel>
          <TabPanel>
            <MarketingDashboard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default DashboardPage;
