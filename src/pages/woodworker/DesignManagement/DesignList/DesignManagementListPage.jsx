import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { appColorTheme } from "../../../../config/appconfig.js";
import { FiEdit2, FiEye, FiPlus, FiTrash } from "react-icons/fi";
import { useMemo, useState } from "react";
import DesignCreateModal from "../ActionModal/DesignCreateModal.jsx";
import DesignDetailModal from "../ActionModal/DesignDetailModal.jsx";
import DesignUpdateModal from "../ActionModal/DesignUpdateModal.jsx";
import DesignDeleteModal from "../ActionModal/DesignDeleteModal.jsx";

export default function DesignManagementListPage() {
  const [rowData, setRowData] = useState([
    {
      designId: "TK001",
      name: "Bàn gỗ thủ công",
      imgUrls:
        "https://i.pinimg.com/1200x/18/82/40/18824088b9a9a8ebe87f79ac35b48ad7.jpg;https://i.pinimg.com/1200x/88/6c/02/886c021fa372379d95990e16c4fbd022.jpg",
      category: "Bàn",
      description: "Không có gì",

      configurations: [
        {
          id: 1,
          name: "Loại gỗ",
          values: [
            { id: 101, name: "Gỗ Sồi" },
            { id: 102, name: "Gỗ Óc Chó" },
          ],
        },
        {
          id: 2,
          name: "Bề mặt hoàn thiện",
          values: [
            { id: 201, name: "Tự nhiên" },
            { id: 202, name: "Sơn bóng" },
          ],
        },
      ],
      prices: [
        { config: [1, 2], configValue: [101, 201], price: 12000000 },
        { config: [1, 2], configValue: [101, 202], price: 14000000 },
        { config: [1, 2], configValue: [102, 201], price: 15000000 },
        { config: [1, 2], configValue: [102, 202], price: 17000000 },
      ],
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { headerName: "Mã thiết kế", field: "designId" },
    { headerName: "Tên thiết kế", field: "name" },
    { headerName: "Mô tả", field: "description" },
    { headerName: "Danh mục", field: "category" },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={1}>
            <DesignDetailModal design={data} refetch={null} />
            <DesignUpdateModal design={data} refetch={null} />
            <DesignDeleteModal design={data} refetch={null} />
          </HStack>
        );
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      // flex: 1,
    };
  }, []);

  return (
    <Stack>
      <Flex justify="space-between" align="center">
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Quản lý ý tưởng thiết kế
        </Heading>
        <DesignCreateModal refetch={null} />
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
