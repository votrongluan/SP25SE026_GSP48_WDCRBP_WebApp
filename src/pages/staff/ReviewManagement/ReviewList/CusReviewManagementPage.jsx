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
import ReviewDetailModal from "../ActionModal/ReviewDetailModal";
import { formatDateTimeString } from "../../../../utils/utils";
import { FiStar } from "react-icons/fi";
import { useGetPendingReviewsQuery } from "../../../../services/reviewApi";

export default function CusReviewManagementPage() {
  // Fetch pending reviews
  const {
    data: reviewsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetPendingReviewsQuery();

  // Transform data directly
  const reviews = reviewsResponse?.data;

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
      headerName: "Nội dung",
      field: "comment",
      flex: 2,
    },
    {
      headerName: "Ngày tạo",
      field: "createdAt",
      valueFormatter: (params) => formatDateTimeString(params.value),
    },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={1}>
            <ReviewDetailModal review={data} refetch={handleRefetch} />
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
          Duyệt Đánh Giá Khách Hàng
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
            overlayNoRowsTemplate="Không có đánh giá nào cần duyệt"
          />
        </div>
      </Box>
    </Stack>
  );
}
