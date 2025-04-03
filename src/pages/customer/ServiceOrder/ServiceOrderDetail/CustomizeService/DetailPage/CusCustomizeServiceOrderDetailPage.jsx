import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FiFileText, FiActivity, FiFile } from "react-icons/fi";
import GeneralInformationTab from "../Tab/GeneralInformationTab.jsx";
import ContractAndTransactionTab from "../Tab/ContractAndTransactionTab.jsx";
import ProcessTab from "../Tab/ProgressTab.jsx";
import ActionBar from "../ActionModal/ActionBar.jsx";
import { appColorTheme } from "../../../../../../config/appconfig.js";

export default function CusCustomizeServiceOrderDetailPage({ order }) {
  return (
    <Box>
      <HStack mb={6}>
        <Box>
          <Heading
            color={appColorTheme.brown_2}
            fontSize="2xl"
            fontFamily="Montserrat"
          >
            Chi tiết đơn #{order.orderId}
          </Heading>
          <HStack mt={1}>
            <Box
              top={5}
              right={5}
              bgColor={appColorTheme.brown_2}
              p={2}
              color="white"
              borderRadius="15px"
            >
              {order?.status || "Đang xử lý"}
            </Box>
            <Text fontSize="sm">Số lượng: {order.quantity} sản phẩm</Text>
          </HStack>
        </Box>

        <Spacer />

        <Box>
          {order?.role == "Woodworker" ? (
            <ActionBar />
          ) : (
            <>
              <Text>Chờ phản hồi từ thợ mộc</Text>
            </>
          )}
        </Box>
      </HStack>

      <Box color="black">
        <Tabs variant="unstyled">
          <TabList
            overflowX="auto"
            display="flex"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            whiteSpace="nowrap"
          >
            {[
              { label: "Chung", icon: FiFileText },
              { label: "Tiến độ", icon: FiActivity },
              { label: "Hợp đồng & Giao dịch", icon: FiFile },
            ].map((tab, index) => (
              <Tab
                key={index}
                _selected={{
                  bgColor: "app_brown.0",
                }}
                borderBottom="2px solid"
                borderBottomColor="app_brown.1"
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
                mr={1}
              >
                <Flex align="center" gap={1}>
                  <Icon as={tab.icon} />
                  <Text>{tab.label}</Text>
                </Flex>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <GeneralInformationTab order={order} />
            </TabPanel>
            <TabPanel p={0}>
              <ProcessTab />
            </TabPanel>
            <TabPanel p={0}>
              <ContractAndTransactionTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
