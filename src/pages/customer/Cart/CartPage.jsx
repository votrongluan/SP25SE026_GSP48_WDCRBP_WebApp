import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DesignCartTab from "./components/DesignCartTab.jsx";
import { appColorTheme } from "../../../config/appconfig.js";

export default function CartPage() {
  const navigate = useNavigate();

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
            <Box
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="sm"
              textAlign="center"
              py={10}
            >
              <Text fontSize="lg">Không có sản phẩm trong giỏ hàng</Text>
              <Button mt={4} onClick={() => navigate("/")}>
                Tiếp tục mua sắm
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
