import { Box, Flex, Heading, HStack, Stack, useToast } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo, useEffect, useCallback } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import DetailModal from "../ActionModal/DetailModal";
import { formatDateTimeString } from "../../../../utils/utils";
import { FiStar } from "react-icons/fi";
import { useGetPendingWoodworkerResponsesQuery } from "../../../../services/reviewApi";

export default function WWResponseManagementPage() {
  const toast = useToast();
  const [rowData, setRowData] = useState([]);

  // Fetch reviews with woodworker responses that need approval
  const {
    data: reviewsResponse,
    isLoading,
    error,
    refetch,
  } = useGetPendingWoodworkerResponsesQuery();

  useEffect(() => {
    if (reviewsResponse?.data) {
      setRowData(
        reviewsResponse.data.map((el) => ({
          ...el,
          createdAt: new Date(el.createdAt),
          updatedAt: new Date(el.updatedAt),
          responseAt: el.responseAt ? new Date(el.responseAt) : null,
        }))
      );
    }
  }, [reviewsResponse]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Lỗi khi tải dữ liệu",
        description: error.message || "Không thể tải danh sách phản hồi",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  const [colDefs] = useState([
    {
      headerName: "Mã đánh giá",
      field: "reviewId",
      sort: "desc",
    },
    {
      headerName: "Khách hàng",
      field: "username",
      valueFormatter: (params) => params.value || "Không có thông tin",
    },
    {
      headerName: "Thợ mộc",
      field: "woodworkerUser.username",
      valueGetter: (params) => {
        return params.data.woodworkerUser?.username || "Không có thông tin";
      },
    },
    {
      headerName: "Loại đơn",
      valueGetter: (params) => {
        if (params.data.serviceOrderId) return "Đơn thiết kế";
        if (params.data.guaranteeOrderId) return "Đơn bảo hành";
        return "Không xác định";
      },
    },
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
      headerName: "Ngày đánh giá",
      field: "createdAt",
      valueFormatter: (params) => formatDateTimeString(params.value),
    },
    {
      headerName: "Ngày phản hồi",
      field: "responseAt",
      valueFormatter: (params) =>
        params.value ? formatDateTimeString(params.value) : "Chưa có",
    },
    {
      headerName: "Trạng thái",
      valueGetter: (params) => {
        if (params.data.woodworkerResponseStatus === true) return "Đã duyệt";
        if (params.data.woodworkerResponseStatus === false) return "Từ chối";
        return "Chờ duyệt";
      },
      cellStyle: (params) => {
        if (params.value === "Đã duyệt") {
          return { color: "#38A169" };
        } else if (params.value === "Từ chối") {
          return { color: "#E53E3E" };
        }
        return { color: "#F6AD55" };
      },
    },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={1}>
            <DetailModal review={data} refetch={handleRefetch} />
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
          Duyệt Phản Hồi Đánh Giá
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
            loadingOverlayComponent={() => "Đang tải dữ liệu..."}
            overlayNoRowsTemplate="Không có phản hồi nào cần duyệt"
            overlayLoadingTemplate="Đang tải dữ liệu..."
          />
        </div>
      </Box>
    </Stack>
  );
}
