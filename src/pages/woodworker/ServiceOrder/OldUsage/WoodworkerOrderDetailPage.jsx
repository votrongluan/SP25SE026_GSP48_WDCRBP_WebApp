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
  FiStar,
} from "react-icons/fi";
import GeneralInformation from "./Tab/GeneralInformation.jsx";
import ProductTab from "./Tab/ProductTab.jsx";
import DeliveryTab from "./Tab/DeliveryTab.jsx";
import AppointmentTab from "./Tab/AppointmentTab.jsx";
import TransactionTab from "./Tab/TransactionTab.jsx";
import ReviewTab from "./Tab/ReviewTab.jsx";
import ActionBar from "./ActionBar.jsx";
import ProcessLogTab from "./Tab/ProcessLogTab.jsx";
import ContractTab from "./Tab/ContractTab.jsx";

export default function WoodworkerOrderDetailPage() {
  return (
    <Container px="40px" maxW="1400px">
      <ActionBar />
      <Box mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Thông tin đặt dịch vụ chi tiết
        </Heading>
      </Box>

      <Box boxShadow="md" bgColor="app_grey.1" color="black">
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
              { label: "Lịch hẹn", icon: FiCalendar },
              { label: "Quá trình", icon: FiActivity },
              { label: "Giao hàng", icon: FiTruck },
              { label: "Hợp đồng", icon: FiFile },
              { label: "Giao dịch", icon: FiCreditCard },
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
            <TabPanel p={5}>
              <GeneralInformation />
            </TabPanel>
            <TabPanel p={5}>
              <ProductTab />
            </TabPanel>
            <TabPanel p={5}>
              <AppointmentTab />
            </TabPanel>
            <TabPanel p={5}>
              <ProcessLogTab />
            </TabPanel>
            <TabPanel p={5}>
              <DeliveryTab />
            </TabPanel>
            <TabPanel p={5}>
              <ContractTab />
            </TabPanel>
            <TabPanel p={5}>
              <TransactionTab />
            </TabPanel>
            <TabPanel p={5}>
              <ReviewTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
