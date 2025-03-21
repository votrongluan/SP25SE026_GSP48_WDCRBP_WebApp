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
} from "@chakra-ui/react";
import { FiFileText, FiActivity, FiFile } from "react-icons/fi";
import GeneralInformationTab from "./GeneralInformationTab.jsx";
import ContractAndTransactionTab from "./ContractAndTransactionTab.jsx";
import ProcessTab from "./ProcessTab.jsx";
import ActionBar from "./ActionBar.jsx";

export default function WWGuaranteeOrderDetailPage() {
  return (
    <Box>
      <HStack mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Chi tiết đơn
        </Heading>

        <Spacer />

        <Box>
          <ActionBar />
        </Box>
      </HStack>

      <Box>
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
              <GeneralInformationTab />
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
