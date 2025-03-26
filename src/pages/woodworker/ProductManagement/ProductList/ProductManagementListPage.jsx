import {
  Box,
  Button,
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
import { FiSearch, FiPlus } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import ProductCreateModal from "../ActionModal/ProductCreateModal";
import ProductDetailModal from "../ActionModal/ProductDetailModal";
import ProductUpdateModal from "../ActionModal/ProductUpdateModal";
import ProductDeleteModal from "../ActionModal/ProductDeleteModal";
import { formatPrice } from "../../../../utils/utils";

export default function ProductManagementListPage() {
  const [rowData, setRowData] = useState([
    {
      id: "SP001",
      category: "Bàn ăn",
      name: "Bàn ăn gỗ công nghiệp",
      description: "Bàn ăn 6 người, gỗ công nghiệp MDF phủ melamine",
      price: 12000000,
      stock: 10,
      weight: 25,
      length: 160,
      height: 75,
      width: 90,
      imgUrls:
        "https://i.pinimg.com/1200x/17/99/2a/17992af2512a41db6b739c546a95944e.jpg;https://i.pinimg.com/1200x/aa/b0/ad/aab0ad2b357f91c06718f4177fd4932f.jpg",
      wood_type: "Gỗ công nghiệp",
      color: "Nâu đậm",
      special_feature: "Chống nước",
      style: "Hiện đại",
      sculpture: "Không",
      scent: "Không",
    },
  ]);

  const [colDefs] = useState([
    { headerName: "Mã SP", field: "id" },
    { headerName: "Danh mục", field: "category" },
    { headerName: "Tên sản phẩm", field: "name" },
    {
      headerName: "Giá",
      field: "price",
      valueFormatter: (params) => {
        return formatPrice(params.value);
      },
    },
    { headerName: "Tồn kho", field: "stock" },
    { headerName: "Loại gỗ", field: "wood_type" },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={1}>
            <ProductDetailModal product={data} refetch={null} />
            <ProductUpdateModal product={data} refetch={null} />
            <ProductDeleteModal product={data} refetch={null} />
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
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Quản lý sản phẩm
        </Heading>
        <ProductCreateModal />
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
