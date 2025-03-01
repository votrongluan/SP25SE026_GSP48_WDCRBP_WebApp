import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AllPrintOrder from "./AllPrintOrder";

export default function AllOrderPage() {
  return (
    <>
      <Heading as="h2" size="lg" textAlign="center">
        Đơn in đang chờ
      </Heading>

      <Box mt="5" h="40px"></Box>

      <Tabs colorScheme="black">
        <TabList>
          <Tab>Đơn in</Tab>
        </TabList>
    
        <TabPanels>
          <TabPanel>
            <AllPrintOrder />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
