import {
  Box,
  Flex,
  Heading,
  Stack,
  Spinner,
  Center,
  HStack,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import WWRegistrationDetailModal from "../ActionModal/WWRegistrationDetailModal";
import { useGetInactiveWoodworkersQuery } from "../../../../services/woodworkerApi";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import WoodworkerListPage from "./WoodworkerListPage";

export default function WWRegistrationManagementListPage() {
  const [viewMode, setViewMode] = useState("inactive"); // "inactive" or "all"
  const toast = useToast();

  const {
    data: inactiveResponse,
    isLoading: isLoadingInactive,
    isError: isErrorInactive,
    refetch: refetchInactive,
  } = useGetInactiveWoodworkersQuery();

  // Only load inactive woodworkers initially to improve performance
  const isLoading = isLoadingInactive;
  const isError = isErrorInactive;

  const refetch = () => {
    if (viewMode === "inactive") {
      refetchInactive();
    }
  };

  const woodworkersData = useMemo(() => {
    return inactiveResponse?.data || [];
  }, [inactiveResponse]);

  const [colDefs] = useState([
    { headerName: "Mã đăng ký", field: "woodworkerId", sort: "desc" },
    { headerName: "Họ và tên", field: "fullName" },
    { headerName: "Email", field: "email" },
    { headerName: "Số điện thoại", field: "phone" },
    { headerName: "Tên xưởng mộc", field: "brandName" },
    { headerName: "Loại hình", field: "businessType" },
    {
      headerName: "Trạng thái",
      field: "publicStatus",
      valueFormatter: (params) => {
        return params.data.status === false ? "Chờ duyệt" : "Đã duyệt";
      },
    },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack>
            <WWRegistrationDetailModal registration={data} refetch={refetch} />
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

  if (isLoading && viewMode === "inactive") {
    return (
      <Center h="500px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isError && viewMode === "inactive") {
    toast({
      title: "Lỗi",
      description: "Đã xảy ra lỗi khi tải dữ liệu xưởng mộc",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Stack spacing={6}>
      <Flex justify="space-between" align="center">
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          {viewMode === "inactive"
            ? "Quản lý đăng ký xưởng mộc"
            : "Danh sách xưởng mộc"}
        </Heading>

        <ButtonGroup isAttached variant="outline">
          <Button
            leftIcon={<FiUserPlus />}
            colorScheme={viewMode === "inactive" ? "brown" : "gray"}
            onClick={() => setViewMode("inactive")}
          >
            Đăng ký mới
          </Button>
          <Button
            leftIcon={<FiUsers />}
            colorScheme={viewMode === "all" ? "brown" : "gray"}
            onClick={() => setViewMode("all")}
          >
            Tất cả xưởng mộc
          </Button>
        </ButtonGroup>
      </Flex>

      {viewMode === "inactive" ? (
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
              rowData={woodworkersData}
              columnDefs={colDefs}
            />
          </div>
        </Box>
      ) : (
        <WoodworkerListPage />
      )}
    </Stack>
  );
}
