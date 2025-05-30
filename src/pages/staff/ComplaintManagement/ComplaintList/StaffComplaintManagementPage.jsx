import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  Select,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo, useEffect } from "react";
import {
  appColorTheme,
  complaintStatusConstants,
} from "../../../../config/appconfig";
import DetailModal from "../ActionModal/DetailModal";
import { formatDateTimeString } from "../../../../utils/utils";
import { useGetAllComplaintsQuery } from "../../../../services/complaintApi";

export default function StaffComplaintManagementPage() {
  // Use getAllComplaints to get all complaints in the system
  const { data, isLoading, isError, refetch } = useGetAllComplaintsQuery();

  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Get unique status values from the constants for the dropdown
  const statusValues = useMemo(() => {
    return Object.values(complaintStatusConstants);
  }, []);

  // Set initial filtered data when API data is loaded
  useEffect(() => {
    if (data?.data) {
      setFilteredData(
        data.data.map((item) => ({
          ...item,
        }))
      );
    }
  }, [data]);

  // Filter data when filters change
  useEffect(() => {
    if (!data?.data) return;

    let filtered = data.data.map((item) => ({
      ...item,
    }));

    // Apply status filter if selected
    if (statusFilter !== "") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [statusFilter, data]);

  const colDefs = useMemo(
    () => [
      { headerName: "Mã khiếu nại", field: "complaintId", sort: "desc" },
      {
        headerName: "Mã đơn hàng",
        field: "serviceOrderDetail.orderId",
        valueGetter: (params) =>
          params.data?.serviceOrderDetail?.orderId || "N/A",
      },
      {
        headerName: "Khách hàng",
        field: "serviceOrderDetail.user.username",
      },
      {
        headerName: "Xưởng mộc",
        field: "serviceOrderDetail.service.wwDto.brandName",
      },
      {
        headerName: "Loại khiếu nại",
        field: "complaintType",
      },
      {
        headerName: "Ngày tạo",
        field: "createdAt",
        valueFormatter: (params) => formatDateTimeString(params.value),
      },
      {
        headerName: "Trạng thái",
        field: "status",
      },
      {
        headerName: "Thao tác",
        cellRenderer: ({ data }) => {
          return (
            <HStack spacing={1}>
              <DetailModal complaint={data} refetch={refetch} />
            </HStack>
          );
        },
      },
    ],
    []
  );

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
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="500px">
        <Text>Đã xảy ra lỗi khi tải dữ liệu.</Text>
      </Center>
    );
  }

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

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

      <HStack mb={4} spacing={4}>
        <HStack>
          <Text fontWeight="medium">Lọc theo trạng thái:</Text>
          <Select
            width="300px"
            bgColor="white"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="">Tất cả trạng thái</option>
            {statusValues.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>

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
            rowData={filteredData}
            columnDefs={colDefs}
          />
        </div>
      </Box>
    </Stack>
  );
}
