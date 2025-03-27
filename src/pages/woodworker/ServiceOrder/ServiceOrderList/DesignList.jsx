import { Box, Button, HStack, Tooltip, Text, Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ActionButton = () => {
  const navigate = useNavigate();

  return (
    <HStack columnGap="4px">
      <Tooltip label="Chi tiết" hasArrow>
        <Button
          p="1px"
          onClick={() => navigate("1")}
          color={appColorTheme.brown_2}
          bg="none"
          border={`1px solid ${appColorTheme.brown_2}`}
          _hover={{ bg: appColorTheme.brown_2, color: "white" }}
        >
          <FiEye />
        </Button>
      </Tooltip>
    </HStack>
  );
};

const StatusBox = ({ label, isSelected, onClick, count }) => {
  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="md"
      cursor="pointer"
      onClick={onClick}
      bg={isSelected ? appColorTheme.brown_2 : "white"}
      color={isSelected ? "white" : appColorTheme.brown_2}
      borderColor={appColorTheme.brown_2}
      _hover={{ bg: isSelected ? appColorTheme.brown_2 : "gray.50" }}
      transition="all 0.2s"
    >
      <Text fontWeight="medium">{label}</Text>
      <Text textAlign="right" fontSize="xl" fontWeight="bold">
        {count}
      </Text>
    </Box>
  );
};

export default function DesignList() {
  const [rowData] = useState([
    {
      designId: "TK001",
      orderId: "DH001",
      status: "Làm / Điều chỉnh",
    },
    {
      designId: "TK003",
      orderId: "DH003",
      status: "Chờ khách duyệt",
    },
    {
      designId: "TK004",
      orderId: "DH004",
      status: "Khách đã duyệt",
    },
  ]);

  const [colDefs] = useState([
    { field: "designId", headerName: "Mã thiết kế" },
    { field: "orderId", headerName: "Mã đơn hàng" },
    { field: "status", headerName: "Trạng thái" },
    { field: "action", headerName: "Thao tác", cellRenderer: ActionButton },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = rowData.filter((row) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "in_progress") {
      return row.status === "Làm" || row.status === "Điều chỉnh";
    }
    if (statusFilter === "pending") {
      return row.status === "Chờ khách duyệt";
    }
    if (statusFilter === "approved") {
      return row.status === "Khách đã duyệt";
    }
    return true;
  });

  const getStatusCount = (status) => {
    if (status === "all") return rowData.length;
    if (status === "in_progress") {
      return rowData.filter(
        (row) => row.status === "Làm" || row.status === "Điều chỉnh"
      ).length;
    }
    if (status === "pending") {
      return rowData.filter((row) => row.status === "Chờ khách duyệt").length;
    }
    if (status === "approved") {
      return rowData.filter((row) => row.status === "Khách đã duyệt").length;
    }
    return 0;
  };

  return (
    <Box>
      <Flex gap={5} mb={6}>
        <StatusBox
          label="Tất cả"
          isSelected={statusFilter === "all"}
          onClick={() => setStatusFilter("all")}
          count={getStatusCount("all")}
        />
        <StatusBox
          label="Làm / Điều chỉnh"
          isSelected={statusFilter === "in_progress"}
          onClick={() => setStatusFilter("in_progress")}
          count={getStatusCount("in_progress")}
        />
        <StatusBox
          label="Chờ khách duyệt"
          isSelected={statusFilter === "pending"}
          onClick={() => setStatusFilter("pending")}
          count={getStatusCount("pending")}
        />
        <StatusBox
          label="Khách đã duyệt"
          isSelected={statusFilter === "approved"}
          onClick={() => setStatusFilter("approved")}
          count={getStatusCount("approved")}
        />
      </Flex>

      <Box
        className="ag-theme-quartz"
        style={{ height: "600px", width: "100%", fontSize: "16px" }}
      >
        <AgGridReact
          rowData={filteredData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={defaultColDef}
        />
      </Box>
    </Box>
  );
}
