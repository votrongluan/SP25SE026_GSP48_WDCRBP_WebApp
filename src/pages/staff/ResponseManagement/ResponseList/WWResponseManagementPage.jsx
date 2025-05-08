import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo, useCallback } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import DetailModal from "../ActionModal/DetailModal";
import { formatDateTimeString } from "../../../../utils/utils";
import { FiStar } from "react-icons/fi";
import { useGetPendingWoodworkerResponsesQuery } from "../../../../services/reviewApi";

export default function WWResponseManagementPage() {
  // Fetch reviews with woodworker responses that need approval
  const {
    data: reviewsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetPendingWoodworkerResponsesQuery();

  // Transform data directly
  const reviews = reviewsResponse?.data?.map((el) => ({
    ...el,
  }));

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
      headerName: "Xưởng mộc",
      field: "brandName",
      valueGetter: (params) => {
        return params.data?.brandName || "Không có thông tin";
      },
    },
    {
      headerName: "Loại đơn",
      valueGetter: (params) => {
        if (params.data.serviceOrderId) return "Đơn dịch vụ";
        if (params.data.guaranteeOrderId) return "Đơn BH / sửa";
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
      headerName: "Ngày phản hồi",
      field: "responseAt",
      valueFormatter: (params) =>
        params.value ? formatDateTimeString(params.value) : "Chưa có",
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

  // Show loading state
  if (isLoading) {
    return (
      <Center h="500px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Center h="500px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu.</Text>
      </Center>
    );
  }

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
            rowData={reviews || []}
            columnDefs={colDefs}
            overlayNoRowsTemplate="Không có phản hồi nào cần duyệt"
          />
        </div>
      </Box>
    </Stack>
  );
}
