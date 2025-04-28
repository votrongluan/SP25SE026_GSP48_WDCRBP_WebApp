import {
  Box,
  Spinner,
  Text,
  Center,
  VStack,
  Badge,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState, useRef, useCallback } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import { useGetAllUsersQuery } from "../../../../services/userApi";
import { FiUserX, FiUserCheck, FiShield } from "react-icons/fi";
import UpdateRoleModal from "../ActionModal/UpdateRoleModal";
import BanModal from "../ActionModal/BanModal";

export default function UserManagementPage() {
  const gridRef = useRef();

  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null); // 'ban', 'unban', or 'updateRole'

  const updateRoleModal = useDisclosure();
  const banModal = useDisclosure();

  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersQuery();

  // Define badge color based on user role
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "red";
      case "Moderator":
        return "purple";
      case "Staff":
        return "blue";
      case "Woodworker":
        return "green";
      case "Customer":
        return "yellow";
      default:
        return "gray";
    }
  };

  // Status badge renderer
  const StatusBadgeRenderer = useCallback((params) => {
    return (
      <Badge
        colorScheme={params.value ? "green" : "red"}
        px={2}
        py={1}
        borderRadius="full"
      >
        {params.value ? "Hoạt động" : "Chưa kích hoạt"}
      </Badge>
    );
  }, []);

  // Role badge renderer
  const RoleBadgeRenderer = useCallback((params) => {
    return (
      <Badge
        colorScheme={getRoleBadgeColor(params.value)}
        px={2}
        py={1}
        borderRadius="full"
      >
        {params.value}
      </Badge>
    );
  }, []);

  // Action buttons renderer
  const ActionsRenderer = useCallback((params) => {
    const { data } = params;

    return (
      <HStack spacing={2}>
        <Tooltip label={data.status ? "Ban User" : "Unban User"}>
          <IconButton
            icon={data.status ? <FiUserX /> : <FiUserCheck />}
            colorScheme={data.status ? "red" : "green"}
            variant="outline"
            size="sm"
            onClick={() => handleBanAction(data, data.status)}
          />
        </Tooltip>

        <Tooltip label="Đổi Role">
          <IconButton
            icon={<FiShield />}
            colorScheme="blue"
            variant="outline"
            size="sm"
            onClick={() => handleUpdateRoleAction(data)}
          />
        </Tooltip>
      </HStack>
    );
  }, []);

  const handleBanAction = (user, shouldBan) => {
    setSelectedUser(user);
    setActionType(shouldBan ? "ban" : "unban");
    banModal.onOpen();
  };

  const handleUpdateRoleAction = (user) => {
    setSelectedUser(user);
    setActionType("updateRole");
    updateRoleModal.onOpen();
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "ID",
        field: "id",
        width: 80,
        sortable: true,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Tên người dùng",
        field: "username",
        flex: 1,
      },
      {
        headerName: "Email",
        field: "email",
        flex: 1.5,
      },
      {
        headerName: "SĐT",
        field: "phone",
        flex: 1,
      },
      {
        headerName: "Role",
        field: "role",
        flex: 1,
        cellRenderer: RoleBadgeRenderer,
      },
      {
        headerName: "Trạng thái",
        field: "status",
        flex: 1,
        cellRenderer: StatusBadgeRenderer,
      },
      {
        headerName: "Actions",
        flex: 1,
        cellRenderer: ActionsRenderer,
        sortable: false,
        filter: false,
      },
    ],
    [RoleBadgeRenderer, StatusBadgeRenderer, ActionsRenderer]
  );

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    };
  }, []);

  if (isLoading) {
    return (
      <Center h="300px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="300px">
        <Text color="red.500">Đã xảy ra lỗi khi tải dữ liệu người dùng</Text>
      </Center>
    );
  }

  const users = usersData?.data?.filter((item) => item?.role != "Admin") || [];

  return (
    <VStack spacing={6} align="stretch">
      <Text
        fontSize="2xl"
        color={appColorTheme.brown_2}
        fontFamily="Montserrat"
        fontWeight="bold"
      >
        Quản lý người dùng
      </Text>

      <div className="ag-theme-quartz" style={{ height: 650, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div>

      {/* Modals */}
      {selectedUser && (
        <>
          <UpdateRoleModal
            isOpen={updateRoleModal.isOpen}
            onClose={updateRoleModal.onClose}
            user={selectedUser}
            refetch={refetch}
          />

          <BanModal
            isOpen={banModal.isOpen}
            onClose={banModal.onClose}
            user={selectedUser}
            isBanning={actionType === "ban"}
            refetch={refetch}
          />
        </>
      )}
    </VStack>
  );
}
