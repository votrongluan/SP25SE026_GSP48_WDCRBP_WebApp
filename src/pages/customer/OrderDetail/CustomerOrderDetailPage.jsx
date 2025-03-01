import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiPackage,
  FiActivity,
  FiTruck,
  FiCalendar,
  FiFile,
  FiCreditCard,
  FiBookOpen,
  FiStar,
} from "react-icons/fi";
import GeneralInformation from "./Tab/GeneralInformation.jsx";
import ProductTab from "./Tab/ProductTab.jsx";
import ProcessTab from "./Tab/ProcessTab.jsx";
import DeliveryTab from "./Tab/DeliveryTab.jsx";
import AppointmentTab from "./Tab/AppointmentTab.jsx";
import TransactionTab from "./Tab/TransactionTab.jsx";
import LogTab from "./Tab/LogTab.jsx";
import ReviewTab from "./Tab/ReviewTab.jsx";
import ActionBar from "./ActionBar";

export default function CustomerOrderDetailPage() {
  return (
    <Container px="40px" maxW="1400px" pb="100px">
      <ActionBar />
      <Box height="80px">
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="26px"
          fontFamily="Montserrat"
        >
          Thông tin đặt dịch vụ chi tiết
        </Heading>
      </Box>

      <Box bgColor="app_grey.0" color="app_black.0">
        <Tabs variant="unstyled">
          <TabList
            overflowX="auto"
            display="flex"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            whiteSpace="nowrap"
          >
            {[
              { label: "Chung", icon: FiFileText },
              { label: "Sản phẩm", icon: FiPackage },
              { label: "Quá trình", icon: FiActivity },
              { label: "Giao hàng", icon: FiTruck },
              { label: "Lịch hẹn", icon: FiCalendar },
              { label: "Hợp đồng", icon: FiFile },
              { label: "Giao dịch", icon: FiCreditCard },
              { label: "Nhật ký", icon: FiBookOpen },
              { label: "Đánh giá", icon: FiStar },
            ].map((tab, index) => (
              <Tab
                key={index}
                _selected={{
                  bgColor: "app_brown.0",
                  borderBottom: "2px solid",
                  borderBottomColor: "app_brown.1",
                }}
                px={4}
              >
                <Flex align="center" gap={1}>
                  <Icon as={tab.icon} />
                  <Text>{tab.label}</Text>
                </Flex>
              </Tab>
            ))}
          </TabList>

          {/* Content Panels (Optional) */}
          <TabPanels>
            <TabPanel>
              <GeneralInformation />
            </TabPanel>
            <TabPanel>
              <ProductTab />
            </TabPanel>
            <TabPanel>
              <ProcessTab />
            </TabPanel>
            <TabPanel>
              <DeliveryTab />
            </TabPanel>
            <TabPanel>
              <AppointmentTab />
            </TabPanel>
            <TabPanel>
              <AppointmentTab />
            </TabPanel>
            <TabPanel>
              <TransactionTab />
            </TabPanel>
            <TabPanel>
              <LogTab />
            </TabPanel>
            <TabPanel>
              <ReviewTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
