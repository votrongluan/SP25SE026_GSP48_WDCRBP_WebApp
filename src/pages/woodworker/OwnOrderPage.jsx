import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import OwnProductOrder from "./OwnProductOrder";
import OwnPrintOrder from "./OwnPrintOrder";

export default function OwnOrderPage() {
  return (
    <>
      <Heading as="h2" size="lg" textAlign="center">
        Đơn hàng đã nhận
      </Heading>

      <Box mt="5" h="40px"></Box>

      <Tabs colorScheme="black">
        <TabList>
          <Tab>Sản phẩm</Tab>
          <Tab>Đơn in</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OwnProductOrder />
          </TabPanel>
          <TabPanel>
            <OwnPrintOrder />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
