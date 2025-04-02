import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DesignCartTab from "../Design/DesignCartTab.jsx";
import ProductCartTab from "../Product/ProductCartTab.jsx";
import { appColorTheme } from "../../../../config/appconfig.js";
import useAuth from "../../../../hooks/useAuth.js";

export default function CartPage() {
  const { auth } = useAuth();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  // Handle tab index based on query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");

    // Set tab index based on the 'tab' parameter
    if (tabParam === "product") {
      setTabIndex(1); // Product tab
    } else if (tabParam === "design") {
      setTabIndex(0); // Design tab (default)
    }
  }, [location.search]);

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

      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
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
