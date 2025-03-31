import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import ComplaintDetailModal from "../ActionModal/ComplaintDetailModal";
import { formatDateTimeString } from "../../../../utils/utils";

export default function CustomerComplaintPage() {
  const [rowData, setRowData] = useState([
    {
      complaintId: "KN001",
      orderId: "DH001",
      userId: "KH001",
      description: "Sản phẩm không đúng với thiết kế đã thống nhất",
      status: "Chờ phản hồi",
      createdAt: "2024-03-27T10:00:00",
      explanation: "",
    },
  ]);

  const [colDefs] = useState([
    { headerName: "Mã khiếu nại", field: "complaintId", sort: "desc" },
    { headerName: "Mã đơn hàng", field: "orderId" },
    { headerName: "Mã khách hàng", field: "userId" },
    {
      headerName: "Nội dung",
      field: "description",
      flex: 2,
    },
    {
      headerName: "Ngày tạo",
      field: "createdAt",
      valueFormatter: (params) => formatDateTimeString(params.value),
    },
    {
      headerName: "Trạng thái",
      field: "status",
      cellStyle: (params) => {
        if (params.value === "Chờ phản hồi") {
          return { color: "#E53E3E" };
        } else if (params.value === "Đã phản hồi") {
          return { color: "#38A169" };
        }
        return { color: "#718096" };
      },
    },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={1}>
            <ComplaintDetailModal complaint={data} refetch={null} />
          </HStack>
        );
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      flex: 1,
    };
  }, []);

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Quản lý Khiếu nại
        </Heading>
      </Flex>

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
    </Stack>
  );
}
