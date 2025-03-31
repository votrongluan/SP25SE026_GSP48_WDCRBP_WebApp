import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import {
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiEye,
  FiShoppingBag,
  FiTrash,
  FiTrash2,
} from "react-icons/fi";
import TaskFilter from "./TaskFilter";
import TypeFilter from "./TypeFilter.jsx";
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

export default function CusGuaranteeOrderListPage() {
  const [rowData, setRowData] = useState([
    {
      orderId: "DH0001",
      serviceType: "Cá nhân",
      orderDate: "2025-03-19",
      customerPhone: "0901234567",
      customerAddress: "123 Lý Thường Kiệt, Q.10, TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      orderId: "DH0002",
      serviceType: "Tùy chỉnh",
      orderDate: "2023-09-02",
      customerPhone: "0987654321",
      customerAddress: "456 Hai Bà Trưng, Q.3, TP.HCM",
      status: "Đã xác nhận",
    },
    {
      orderId: "DH0003",
      serviceType: "Mua hàng",
      orderDate: "2023-09-05",
      customerPhone: "0912345678",
      customerAddress: "789 Lê Duẩn, Q.1, TP.HCM",
      status: "Hoàn thành",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { headerName: "Mã đơn hàng", field: "orderId", sort: "desc" },
    { headerName: "Loại dịch vụ", field: "serviceType" },
    {
      headerName: "Ngày đặt",
      field: "orderDate",
      valueFormatter: (p) => p.value + " l",
    },
    { headerName: "SĐT k.hang", field: "customerPhone" },
    { headerName: "Địa chỉ khách", field: "customerAddress" },
    { headerName: "Trạng thái", field: "status" },
    { headerName: "Thao tác", cellRenderer: ActionButton },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      // flex: 1,
    };
  }, []);

  return (
    <Box>
      <Box mb={6}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Danh sách đơn đặt dịch vụ
        </Heading>
      </Box>

      <Box mb={6}></Box>

      <Box mb={6}>
        <TypeFilter />
      </Box>

      <Box mb={6}>
        <TaskFilter />
      </Box>

      <Box>
        <div
          className="ag-theme-quartz"
          style={{ height: 700, fontSize: "16px" }}
        >
          <AgGridReact
            pagination
            paginationPageSize={20}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            defaultColDef={defaultColDef}
            rowData={rowData}
            columnDefs={colDefs}
          />
        </div>
      </Box>
    </Box>
  );
}
