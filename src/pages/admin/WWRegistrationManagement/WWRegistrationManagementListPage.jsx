import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { appColorTheme } from "../../../config/appconfig";
import WWRegistrationDetailModal from "./ActionModal/WWRegistrationDetailModal";

export default function WWRegistrationManagementListPage() {
  const [rowData, setRowData] = useState([
    {
      id: "WW001",
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      businessType: "Cá nhân",
      taxCode: "0123456789",
      brandName: "Xưởng Mộc A",
      bio: "Chuyên sản xuất đồ gỗ nội thất theo yêu cầu",
      imgUrl:
        "https://i.pinimg.com/1200x/aa/b0/ad/aab0ad2b357f91c06718f4177fd4932f.jpg;https://i.pinimg.com/1200x/17/99/2a/17992af2512a41db6b739c546a95944e.jpg",
      status: "Chờ duyệt",
    },
  ]);

  const [colDefs] = useState([
    { headerName: "Mã đăng ký", field: "id" },
    { headerName: "Họ và tên", field: "fullName" },
    { headerName: "Email", field: "email" },
    { headerName: "Số điện thoại", field: "phone" },
    { headerName: "Tên thương hiệu", field: "brandName" },
    { headerName: "Loại hình", field: "businessType" },
    { headerName: "Trạng thái", field: "status" },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={1}>
            <WWRegistrationDetailModal registration={data} refetch={null} />
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
            rowData={rowData}
            columnDefs={colDefs}
          />
        </div>
      </Box>
    </Stack>
  );
}
