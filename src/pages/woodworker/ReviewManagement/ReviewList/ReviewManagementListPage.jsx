import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import ReviewDetailModal from "../ActionModal/ReviewDetailModal";
import { convertTimeStampToDateTimeString } from "../../../../utils/utils";
import { FiStar } from "react-icons/fi";

export default function ReviewManagementListPage() {
  const [rowData, setRowData] = useState([
    {
      reviewId: "DG001",
      orderId: "DH001",
      userId: "KH001",
      rating: 4,
      comment: "Sản phẩm đẹp, chất lượng tốt, giao hàng đúng hẹn",
      status: "Chờ phản hồi",
      updatedAt: "2024-03-27T10:00:00",
      response: "",
    },
  ]);

  const [colDefs] = useState([
    { headerName: "Mã đánh giá", field: "reviewId" },
    { headerName: "Mã đơn hàng", field: "orderId" },
    { headerName: "Mã khách hàng", field: "userId" },
    {
      headerName: "Đánh giá",
      field: "rating",
      cellRenderer: ({ value }) => {
        return (
          <HStack spacing={1}>
            {[...Array(5)].map((_, index) => (
              <FiStar
                key={index}
                color={index < value ? appColorTheme.brown_2 : "#CBD5E0"}
                size={16}
              />
            ))}
          </HStack>
        );
      },
    },
    {
      headerName: "Nội dung",
      field: "comment",
      flex: 2,
    },
    {
      headerName: "Ngày cập nhật",
      field: "updatedAt",
      valueFormatter: (params) =>
        convertTimeStampToDateTimeString(params.value),
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
            <ReviewDetailModal review={data} refetch={null} />
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
          Quản lý đánh giá
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
