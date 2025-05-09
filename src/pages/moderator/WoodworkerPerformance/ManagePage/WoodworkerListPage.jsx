import {
  Box,
  Stack,
  Spinner,
  Text,
  Center,
  HStack,
  Badge,
  Avatar,
  Tooltip,
  useToast,
  Link,
  Button,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo, useRef } from "react";
import { useListWoodworkersQuery } from "../../../../services/woodworkerApi";
import { appColorTheme, getPackTypeLabel } from "../../../../config/appconfig";
import { FiStar, FiBarChart2 } from "react-icons/fi";
import { format, parseISO, isValid } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function WoodworkerListPage() {
  const toast = useToast();
  const gridRef = useRef();
  const navigate = useNavigate();

  const {
    data: woodworkersResponse,
    isLoading,
    isError,
  } = useListWoodworkersQuery();

  // Avatar cell renderer
  const AvatarCellRenderer = (params) => {
    return (
      <Link
        color={appColorTheme.brown_2}
        href={`/woodworker/${params.data.woodworkerId}`}
        isExternal
      >
        <HStack>
          <Avatar
            size="sm"
            name={params.data.brandName}
            src={params.data.imgUrl}
            bg={appColorTheme.brown_2}
          />
          <Text>{params.value}</Text>
        </HStack>
      </Link>
    );
  };

  // Rating cell renderer
  const RatingCellRenderer = (params) => {
    const { totalStar, totalReviews } = params.data;

    if (!totalStar || !totalReviews || totalReviews === 0) {
      return <Text>Chưa có đánh giá</Text>;
    }

    const rating = totalStar / totalReviews;

    return (
      <HStack>
        <FiStar color="#F6E05E" />
        <Text>{rating.toFixed(1)}</Text>
        <Text color="gray.500" fontSize="sm">
          ({totalReviews} đánh giá)
        </Text>
      </HStack>
    );
  };

  // Service Pack cell renderer
  const ServicePackRenderer = (params) => {
    const servicePack = params.value;

    if (!servicePack) {
      return <Badge colorScheme="gray">Chưa đăng ký</Badge>;
    }

    const colorScheme =
      servicePack.name === "Gold"
        ? "yellow"
        : servicePack.name === "Silver"
        ? "gray"
        : servicePack.name === "Bronze"
        ? "orange"
        : "gray";

    return (
      <Tooltip
        label={`Thời hạn: ${servicePack.duration} tháng, Số bài đăng mỗi tháng: ${servicePack.postLimitPerMonth}`}
      >
        <Badge colorScheme={colorScheme}>
          {getPackTypeLabel(servicePack.name)}
        </Badge>
      </Tooltip>
    );
  };

  // Status cell renderer
  const StatusRenderer = (params) => {
    const isActive = params.value;

    return (
      <Badge colorScheme={isActive ? "green" : "red"}>
        {isActive ? "Đang hoạt động" : "Tạm ngưng"}
      </Badge>
    );
  };

  // Action cell renderer
  const ActionCellRenderer = (params) => {
    return (
      <Button
        leftIcon={<FiBarChart2 />}
        colorScheme="blue"
        size="sm"
        onClick={() => navigate(`/mod/performance/${params.data.woodworkerId}`)}
      >
        Chi tiết
      </Button>
    );
  };

  // Date formatter
  const dateFormatter = (params) => {
    try {
      const date = parseISO(params.value);
      if (!isValid(date)) return "Không xác định";
      return format(date, "dd/MM/yyyy", { locale: vi });
    } catch (error) {
      return "Không xác định";
    }
  };

  const [colDefs] = useState([
    {
      headerName: "Mã xưởng",
      field: "woodworkerId",
      width: 100,
      sort: "desc",
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Tên xưởng mộc",
      field: "brandName",
      cellRenderer: AvatarCellRenderer,
      flex: 2,
    },
    {
      headerName: "Đánh giá",
      field: "totalStar",
      cellRenderer: RatingCellRenderer,
      flex: 1.5,
    },
    {
      headerName: "Gói dịch vụ",
      field: "servicePack",
      cellRenderer: ServicePackRenderer,
      flex: 1,
    },
    {
      headerName: "Ngày hết hạn",
      field: "servicePackEndDate",
      valueFormatter: dateFormatter,
      flex: 1,
    },
    {
      headerName: "Hành động",
      field: "woodworkerId",
      cellRenderer: ActionCellRenderer,
      flex: 1,
      filter: false,
      sortable: false,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
      sortable: true,
      resizable: true,
    };
  }, []);

  if (isLoading) {
    return (
      <Center h="500px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isError) {
    toast({
      title: "Lỗi",
      description: "Đã xảy ra lỗi khi tải dữ liệu xưởng mộc",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  const woodworkers = woodworkersResponse?.data || [];

  const onGridReady = (params) => {
    // Auto-size columns after data loads
    setTimeout(() => {
      const allColumnIds = params.columnApi
        .getColumns()
        .map((column) => column.getId());
      params.columnApi.autoSizeColumns(allColumnIds, false);
    }, 100);
  };

  return (
    <Stack spacing={6}>
      <Box>
        <div
          className="ag-theme-quartz"
          style={{ height: 700, fontSize: "16px" }}
        >
          <AgGridReact
            ref={gridRef}
            pagination
            paginationPageSize={20}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            defaultColDef={defaultColDef}
            rowData={woodworkers}
            columnDefs={colDefs}
            onGridReady={onGridReady}
          />
        </div>
      </Box>
    </Stack>
  );
}
