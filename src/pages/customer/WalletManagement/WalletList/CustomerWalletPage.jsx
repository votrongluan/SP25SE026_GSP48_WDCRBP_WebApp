import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import TransactionDetailModal from "../ActionModal/TransactionDetailModal";
import { formatDateTimeString } from "../../../../utils/utils";
import WalletInformation from "../WalletInformation/WalletInformation";

export default function CustomerWalletPage() {
  const [rowData, setRowData] = useState([
    {
      transactionId: "GD001",
      type: "Nạp ví",
      status: "Thành công",
      createdAt: "2024-03-27T10:00:00",
      description: "Nạp tiền qua ngân hàng",
      amount: 1000000,
    },
  ]);

  const [colDefs] = useState([
    { headerName: "Mã giao dịch", field: "transactionId" },
    {
      headerName: "Loại giao dịch",
      field: "type",
      cellStyle: (params) => {
        if (params.value === "Nạp ví") {
          return { color: "#38A169" };
        } else if (params.value === "Thanh toán") {
          return { color: "#E53E3E" };
        }
        return { color: "#3182CE" };
      },
    },
    {
      headerName: "Số tiền",
      field: "amount",
      valueFormatter: (params) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(params.value);
      },
    },
    {
      headerName: "Mô tả",
      field: "description",
      flex: 2,
    },
    {
      headerName: "Ngày tạo",
      field: "createdAt",
      valueFormatter: (params) => formatDateTimeString(params.value),
    },
    {
      headerName: "Trạng thái",
      field: "status",
      cellStyle: (params) => {
        if (params.value === "Thành công") {
          return { color: "#38A169" };
        } else if (params.value === "Thất bại") {
          return { color: "#E53E3E" };
        }
        return { color: "#718096" };
      },
    },
    {
      headerName: "Thao tác",
      cellRenderer: ({ data }) => {
        return (
          <HStack spacing={1}>
            <TransactionDetailModal transaction={data} />
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
          Quản lý Ví
        </Heading>
      </Flex>

      {/* Wallet Information */}
      <WalletInformation />

      <Box>
        <Heading
          color={appColorTheme.brown_2}
          fontSize="2xl"
          fontFamily="Montserrat"
        >
          Các khoản giao dịch
        </Heading>
      </Box>

      {/* Transaction List */}
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
