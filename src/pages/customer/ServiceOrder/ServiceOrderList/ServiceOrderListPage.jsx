import { Box, Button, Heading, HStack, Tooltip } from "@chakra-ui/react";
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

const ActionButton = (params) => {
  return (
    <HStack columnGap="4px">
      <Tooltip label="Chi tiết" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.brown_2}
          bg="none"
          border={`1px solid ${appColorTheme.brown_2}`}
          _hover={{ bg: appColorTheme.brown_2, color: "white" }}
        >
          <FiEye />
        </Button>
      </Tooltip>

      <Tooltip label="Cập nhật" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.blue_0}
          bg="none"
          border={`1px solid ${appColorTheme.blue_0}`}
          _hover={{ bg: appColorTheme.blue_0, color: "white" }}
        >
          <FiEdit2 />
        </Button>
      </Tooltip>

      <Tooltip label="Xóa" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.red_0}
          bg="none"
          border={`1px solid ${appColorTheme.red_0}`}
          _hover={{ bg: appColorTheme.red_0, color: "white" }}
        >
          <FiTrash />
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default function ServiceOrderListPage() {
  // English field names, Vietnamese content
  const [rowData, setRowData] = useState([
    {
      orderId: "DH0001",
      serviceType: "Dọn nhà",
      orderDate: "2025-03-19",
      customerPhoneName: "0901234567 - Nguyễn Văn A",
      customerAddress: "123 Lý Thường Kiệt, Q.10, TP.HCM",
      status: "Đang xử lý",
    },
    {
      orderId: "DH0002",
      serviceType: "Sửa ống nước",
      orderDate: "2023-09-02",
      customerPhoneName: "0987654321 - Trần Thị B",
      customerAddress: "456 Hai Bà Trưng, Q.3, TP.HCM",
      status: "Đã xác nhận",
    },
    {
      orderId: "DH0003",
      serviceType: "Vệ sinh máy lạnh",
      orderDate: "2023-09-05",
      customerPhoneName: "0912345678 - Phạm Văn C",
      customerAddress: "789 Lê Duẩn, Q.1, TP.HCM",
      status: "Hoàn thành",
    },
  ]);

  // Vietnamese headerNames for the columns
  const [colDefs, setColDefs] = useState([
    { headerName: "Mã đơn hàng", field: "orderId" },
    { headerName: "Loại dịch vụ", field: "serviceType" },
    {
      headerName: "Ngày đặt",
      field: "orderDate",
      valueFormatter: (p) => p.value + " l",
    },
    { headerName: "SĐT + tên khách", field: "customerPhoneName" },
    { headerName: "Địa chỉ khách", field: "customerAddress" },
    { headerName: "Trạng thái", field: "status" },
    { headerName: "Thao tác", cellRenderer: ActionButton },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      // flex: 1, // uncomment if you want columns to fill space
    };
  }, []);

  return (
    <Box>
      <Box mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Danh sách đơn đặt dịch vụ
        </Heading>
      </Box>

      <Box>
        <div
          className="ag-theme-quartz"
          style={{ height: 600, fontSize: "16px" }}
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
