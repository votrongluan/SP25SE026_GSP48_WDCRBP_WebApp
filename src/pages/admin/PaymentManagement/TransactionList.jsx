import {
  Box,
  HStack,
  Text,
  Select,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { formatPrice, formatDateTimeString } from "../../../utils/utils";
import { useState, useMemo, useCallback } from "react";
import { appColorTheme } from "../../../config/appconfig";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default function TransactionList({ transactions }) {
  const [filterType, setFilterType] = useState("all");
  const [filterPaymentFor, setFilterPaymentFor] = useState("all");

  // Filter only successful transactions (status = true)
  const successfulTransactions = transactions.filter((tx) => tx.status);

  // Further filter transactions based on custom filters
  const filteredTransactions = successfulTransactions.filter((tx) => {
    if (filterType !== "all" && tx.transactionType !== filterType) {
      return false;
    }
    if (filterPaymentFor !== "all" && tx.paymentFor !== filterPaymentFor) {
      return false;
    }
    return true;
  });

  // Get unique transaction types and payment purposes
  const transactionTypes = [
    ...new Set(successfulTransactions.map((tx) => tx.transactionType)),
  ];
  const paymentPurposes = [
    ...new Set(successfulTransactions.map((tx) => tx.paymentFor)),
  ].filter((purpose) => purpose !== null);

  // Convert timestamps to Date objects for AG Grid
  const rowData = useMemo(() => {
    return filteredTransactions.map((tx) => ({
      ...tx,
    }));
  }, [filteredTransactions]);

  // AG Grid column definitions
  const [colDefs] = useState([
    {
      headerName: "ID",
      field: "transactionId",
      width: 80,
      filter: "agNumberColumnFilter",
      sort: "desc",
    },
    {
      headerName: "Loại giao dịch",
      field: "transactionType",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Mục đích",
      field: "paymentFor",
      filter: "agTextColumnFilter",
      valueFormatter: (params) => {
        return params.value || "N/A";
      },
    },
    {
      headerName: "Số tiền",
      field: "amount",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => formatPrice(params.value),
      cellStyle: {
        color: appColorTheme.brown_2,
        fontWeight: "bold",
      },
    },
    {
      headerName: "Thời gian",
      field: "createdAt",
      filter: "agDateColumnFilter",
      valueFormatter: (params) => formatDateTimeString(params.value),
    },
    {
      headerName: "Tên người dùng",
      field: "username",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Số điện thoại",
      field: "userPhone",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Email",
      field: "userEmail",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Loại người dùng",
      field: "role",
      filter: "agTextColumnFilter",
      valueFormatter: (params) => {
        return params.value === "Woodworker" ? "Xưởng mộc" : "Khách hàng";
      },
    },
  ]);

  // Default column definition
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      flex: 1,
      resizable: true,
      sortable: true,
    };
  }, []);

  // Handle grid ready event
  const onGridReady = useCallback(() => {
    // Any grid initialization code can go here
  }, []);

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4} mb={4} wrap="wrap">
          <FormControl w={{ base: "100%", md: "200px" }}>
            <FormLabel>Loại giao dịch</FormLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tất cả</option>
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl w={{ base: "100%", md: "200px" }}>
            <FormLabel>Mục đích giao dịch</FormLabel>
            <Select
              value={filterPaymentFor}
              onChange={(e) => setFilterPaymentFor(e.target.value)}
            >
              <option value="all">Tất cả</option>
              {paymentPurposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        <Box>
          <div
            className="ag-theme-quartz"
            style={{ height: 700, width: "100%", fontSize: "15px" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={20}
              paginationPageSizeSelector={[10, 20, 50, 100]}
            />
          </div>
        </Box>

        {rowData.length === 0 && (
          <Text textAlign="center" py={4}>
            Không có giao dịch nào
          </Text>
        )}
      </VStack>
    </Box>
  );
}
