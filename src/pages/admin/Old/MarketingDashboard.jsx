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
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import MarketingPerformance from "./MarketingPerformance.jsx";
import NewContact from "./NewContact.jsx";
import SourceContact from "./SourceContact.jsx";

// Mock data for charts and stats
const sessionsData = {
  labels: ["Apr 9", "Apr 16", "Apr 23", "Apr 30", "May 7"],
  datasets: [
    {
      label: "Visits",
      data: [300, 500, 250, 400, 200],
      borderColor: "blue",
      backgroundColor: "rgba(0, 0, 255, 0.2)",
    },
  ],
};

const contactsData = {
  labels: ["Apr 9", "Apr 16", "Apr 23", "Apr 30", "May 7"],
  datasets: [
    {
      label: "New Contacts",
      data: [1, 3, 5, 2, 4],
      borderColor: "blue",
      backgroundColor: "rgba(0, 0, 255, 0.2)",
    },
  ],
};

const statsData = {
  visits: {
    label: "LƯỢT TRUY CẬP",
    value: 232,
    change: 0, // Negative for decrease, positive for increase
    comparison: 0,
    direction: "up", // Use 'up' or 'down' to determine arrow direction
  },
  newContacts: {
    label: "LIÊN HỆ MỚI (KHÔNG TÍNH NGUỒN NGOẠI TUYẾN)",
    value: 20,
    change: 0,
    comparison: 0,
    direction: "up",
  },
  customerAttractionGoal: {
    label: "Mục tiêu thu hút khách hàng",
    value: 100,
    change: 0,
    comparison: 0,
    direction: "up",
  },
  newUsers: {
    label: "Người dùng mới",
    value: 20,
    change: 0,
    comparison: 0,
    direction: "up",
  },
  emailsOpened: {
    label: "Email đã mở",
    value: 12,
    change: 0,
    comparison: 0,
    direction: "up",
  },
};

function renderStat(stat) {
  return (
    <>
      <Flex mb="8px" alignItems="center" justifyContent="space-between">
        <Heading fontWeight="normal" fontSize="18px" color="white">
          {stat.label}
        </Heading>
        <Select
          bgColor="black"
          color="white"
          cursor="pointer"
          width="fit-content"
          fontSize="12px"
          ml="8px"
          border="none"
          outline="none"
        >
          <option style={optionStyle}>30 ngày qua</option>
        </Select>
      </Flex>

      <Stat color="white" my="16px">
        <StatNumber>{stat.value}</StatNumber>
        <StatHelpText>
          <Text color={stat.direction === "down" ? "red.500" : "green.500"}>
            {stat.direction === "down" ? "▼" : "▲"} {Math.abs(stat.change)}% (Kỳ
            so sánh: {stat.comparison})
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

export default function MarketingDashboard() {
  return (
    <>
      <SimpleGrid columns={2} gap="8px">
        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.visits)}
          <Line data={sessionsData} />
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.newContacts)}
          <Line data={contactsData} />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid mt="8px" columns={3} gap="8px">
        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.customerAttractionGoal)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.newUsers)}
        </GridItem>

        <GridItem bgColor="black" border="1px solid black" p="12px">
          {renderStat(statsData.emailsOpened)}
        </GridItem>
      </SimpleGrid>

      <SimpleGrid mt="8px" columns={3} gap="8px">
        <MarketingPerformance />
        <NewContact />
        <SourceContact />
      </SimpleGrid>
    </>
  );
}
