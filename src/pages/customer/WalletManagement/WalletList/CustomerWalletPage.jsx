import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import TransactionDetailModal from "../ActionModal/TransactionDetailModal";
import { formatDateTimeString, formatPrice } from "../../../../utils/utils";
import WalletInformation from "../WalletInformation/WalletInformation";
import { useGetUserTransactionsQuery } from "../../../../services/walletApi";
import useAuth from "../../../../hooks/useAuth";

export default function CustomerWalletPage() {
  const { auth } = useAuth();
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetUserTransactionsQuery(auth?.userId);

  const transactions = response?.data?.map((transaction) => {
    return {
      ...transaction,
      createdAt: new Date(transaction.createdAt),
    };
  });

  const [colDefs] = useState([
    { headerName: "Mã giao dịch", field: "transactionId" },
    {
      headerName: "Loại giao dịch",
      field: "transactionType",
      cellStyle: (params) => {
        if (params.value === "Nạp ví") {
          return { color: appColorTheme.green_0 };
        } else if (params.value === "Thanh toán") {
          return { color: appColorTheme.red_0 };
        }
        return { color: appColorTheme.blue_0 };
      },
    },
    {
      headerName: "Số tiền",
      field: "amount",
      valueFormatter: (params) => formatPrice(params.value),
      cellStyle: () => {
        return { color: appColorTheme.brown_2, fontWeight: "bold" };
      },
    },
    {
      headerName: "Ngày tạo",
      field: "createdAt",
      valueFormatter: (params) => formatDateTimeString(params.value),
    },
    {
      headerName: "Trạng thái",
      valueFormatter: (params) =>
        params?.data?.status ? "Đã thanh toán" : "Chưa thanh toán",
      cellStyle: (params) => {
        if (params?.data?.status) {
          return { color: appColorTheme.green_0 };
        }
        return { color: appColorTheme.red_0 };
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

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="200px">
        <Text>Đã có lỗi xảy ra khi tải danh sách giao dịch</Text>
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
            rowData={transactions || []}
            columnDefs={colDefs}
          />
        </div>
      </Box>
    </Stack>
  );
}
