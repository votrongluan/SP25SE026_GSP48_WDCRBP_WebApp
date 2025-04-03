import { Box, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import AppointmentList from "./AppointmentList.jsx";
import ServiceOrderList from "./ServiceOrderList.jsx";
import { appColorTheme } from "../../../../config/appconfig";
import ContractList from "./ContractList.jsx";
import DesignList from "./DesignList.jsx";
import RequireServicePack from "../../../../components/Utility/RequireServicePack.jsx";

export default function CusServiceOrderListPage() {
  const [currentTab, setCurrentTab] = useState("orders");

  const changeTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <Box>
      <HStack fontSize="20px" spacing={4} mb={2}>
        <Text
          padding={2}
          color={currentTab === "orders" ? appColorTheme.brown_2 : "black"}
          textDecor={currentTab === "orders" ? "underline" : "none"}
          cursor="pointer"
          onClick={() => changeTab("orders")}
        >
          Đơn hàng
        </Text>
        {/* <Text
          padding={2}
          color={
            currentTab === "appointments" ? appColorTheme.brown_2 : "black"
          }
          textDecor={currentTab === "appointments" ? "underline" : "none"}
          cursor="pointer"
          onClick={() => changeTab("appointments")}
        >
          Lịch hẹn
        </Text>
        <Text
          padding={2}
          color={currentTab === "contracts" ? appColorTheme.brown_2 : "black"}
          textDecor={currentTab === "contracts" ? "underline" : "none"}
          cursor="pointer"
          onClick={() => changeTab("contracts")}
        >
          Hợp đồng
        </Text>
        <Text
          padding={2}
          color={currentTab === "designs" ? appColorTheme.brown_2 : "black"}
          textDecor={currentTab === "designs" ? "underline" : "none"}
          cursor="pointer"
          onClick={() => changeTab("designs")}
        >
          Thiết kế
        </Text> */}
      </HStack>

      {currentTab === "orders" && <ServiceOrderList />}
      {currentTab === "appointments" && <AppointmentList />}
      {currentTab === "contracts" && <ContractList />}
      {currentTab === "designs" && <DesignList />}
    </Box>
  );
}
