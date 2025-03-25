import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
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
      name: "Bàn ăn gỗ công nghiệp",
      description: "Bàn ăn 6 người, gỗ công nghiệp MDF phủ melamine",
      category: "Bàn ăn",
    },
    {
      designId: "TK002",
      name: "Tủ quần áo gỗ tự nhiên",
      description: "Tủ 3 cánh, gỗ xoan đào, thiết kế hiện đại",
      category: "Tủ quần áo",
    },
    {
      designId: "TK003",
      name: "Giường ngủ gỗ sồi",
      description: "Giường đôi 1.6m, gỗ sồi tự nhiên, có hộc tủ",
      category: "Giường ngủ",
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
          <HStack columnGap="4px">
            <DesignDetailModal />
            <DesignUpdateModal />
            <DesignDeleteModal />
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
    <Box>
      <HStack mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Quản lý ý tưởng thiết kế
        </Heading>

        <Spacer />

        <Box>
          <DesignCreateModal />
        </Box>
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
            rowData={rowData}
            columnDefs={colDefs}
          />
        </div>
      </Box>
    </Box>
  );
}
