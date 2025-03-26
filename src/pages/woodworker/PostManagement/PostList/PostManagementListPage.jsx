import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import PostCreateModal from "../ActionModal/PostCreateModal";
import PostDetailModal from "../ActionModal/PostDetailModal";
import PostUpdateModal from "../ActionModal/PostUpdateModal";
import PostDeleteModal from "../ActionModal/PostDeleteModal";
import { appColorTheme } from "../../../../config/appconfig";

export default function PostManagementListPage() {
  const [rowData, setRowData] = useState([
    {
      id: "BV001",
      title: "Cách chọn gỗ tốt cho nội thất",
      description:
        "Hướng dẫn chi tiết cách chọn gỗ phù hợp cho từng loại nội thất...",
      imgUrls:
        "https://i.pinimg.com/1200x/17/99/2a/17992af2512a41db6b739c546a95944e.jpg;https://i.pinimg.com/1200x/aa/b0/ad/aab0ad2b357f91c06718f4177fd4932f.jpg",
      createdAt: "2024-03-25T10:00:00Z",
    },
    {
      id: "BV002",
      title: "Xu hướng thiết kế nội thất 2024",
      description:
        "Tổng hợp các xu hướng thiết kế nội thất mới nhất trong năm 2024...",
      imgUrls:
        "https://i.pinimg.com/1200x/17/99/2a/17992af2512a41db6b739c546a95944e.jpg;https://i.pinimg.com/1200x/aa/b0/ad/aab0ad2b357f91c06718f4177fd4932f.jpg",
      createdAt: "2024-03-24T15:30:00Z",
    },
  ]);

  const [colDefs] = useState([
    { headerName: "Mã bài viết", field: "id" },
    { headerName: "Tiêu đề", field: "title" },
    {
      headerName: "Ngày tạo",
      field: "createdAt",
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString("vi-VN");
      },
    },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={2}>
            <PostDetailModal post={data} />
            <PostUpdateModal post={data} refetch={() => {}} />
            <PostDeleteModal post={data} refetch={() => {}} />
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
          Quản lý bài viết
        </Heading>
        <PostCreateModal />
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
