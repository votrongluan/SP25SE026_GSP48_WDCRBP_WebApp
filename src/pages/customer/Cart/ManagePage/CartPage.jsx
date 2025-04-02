import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import DesignCartTab from "../Design/DesignCartTab.jsx";
import ProductCartTab from "../Product/ProductCartTab.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";
import useAuth from "../../../../hooks/useAuth.js";

export default function CartPage() {
  const { auth } = useAuth();

  if (auth?.role == "Woodworker") return <Navigate to="/ww/service-order" />;

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Giỏ hàng
        </Heading>
      </Box>

      <Tabs>
        <TabList mb={2}>
          <Tab
            _selected={{
              color: "app_brown.2",
              borderColor: "app_brown.2",
            }}
          >
            Thiết kế
          </Tab>
          <Tab
            _selected={{
              color: "app_brown.2",
              borderColor: "app_brown.2",
            }}
          >
            Sản phẩm
          </Tab>
        </TabList>

        <TabPanels>
          {/* Designs Tab */}
          <TabPanel p={0}>
            <DesignCartTab />
          </TabPanel>

          {/* Products Tab */}
          <TabPanel p={0}>
            <ProductCartTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
