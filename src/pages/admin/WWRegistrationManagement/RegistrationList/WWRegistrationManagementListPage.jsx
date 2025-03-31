import {
  Box,
  Flex,
  Heading,
  Stack,
  Spinner,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import WWRegistrationDetailModal from "../ActionModal/WWRegistrationDetailModal";
import { useGetInactiveWoodworkersQuery } from "../../../../services/woodworkerApi";

export default function WWRegistrationManagementListPage() {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetInactiveWoodworkersQuery();

  const [colDefs] = useState([
    { headerName: "Mã đăng ký", field: "woodworkerId", sort: "desc" },
    { headerName: "Họ và tên", field: "fullName" },
    { headerName: "Email", field: "email" },
    { headerName: "Số điện thoại", field: "phone" },
    { headerName: "Tên xưởng mộc", field: "brandName" },
    { headerName: "Loại hình", field: "businessType" },
    {
      headerName: "Trạng thái",
      field: "status",
      valueFormatter: (params) =>
        params.value === "false" ? "Chờ duyệt" : "Đã duyệt",
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

  if (isLoading) {
    return (
      <Center h="500px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
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
          Quản lý đăng ký thợ mộc
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
            rowData={response?.data || []}
            columnDefs={colDefs}
          />
        </div>
      </Box>
    </Stack>
  );
}
