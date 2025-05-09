import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  useToast,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../../services/userApi";
import { appColorTheme } from "../../../../config/appconfig";

export default function UpdateRoleModal({ isOpen, onClose, user, refetch }) {
  const [newRole, setNewRole] = useState(user?.role || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const [updateUserRole] = useUpdateUserRoleMutation();

  const availableRoles = [
    "Admin",
    "Moderator",
    "Staff",
    "Woodworker",
    "Customer",
  ];

  // Define badge color based on user role
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "red";
      case "Moderator":
        return "purple";
      case "Staff":
        return "blue";
      default:
        return "gray";
    }
  };

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleSubmit = async () => {
    if (!newRole || newRole === user.role) {
      onClose();
      return;
    }

    try {
      setIsSubmitting(true);

      await updateUserRole({
        userId: user.id,
        newRole: newRole,
      }).unwrap();

      toast({
        title: "Thành công",
        description: `Đã cập nhật vai trò của ${user.username} thành ${newRole}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Refresh data
      refetch();
      onClose();
    } catch (error) {
      toast({
        title: "Lỗi",
        description:
          error.data?.message ||
          "Đã xảy ra lỗi khi cập nhật vai trò người dùng",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={appColorTheme.brown_2}>
          Cập nhật vai trò người dùng
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="start">
            <Text>
              <Text as="span" fontWeight="bold">
                ID:
              </Text>{" "}
              {user?.id}
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Tên đăng nhập:
              </Text>{" "}
              {user?.username}
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Email:
              </Text>{" "}
              {user?.email}
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Vai trò hiện tại:
              </Text>{" "}
              <Badge
                colorScheme={getRoleBadgeColor(user?.role)}
                px={2}
                py={1}
                borderRadius="full"
              >
                {user?.role}
              </Badge>
            </Text>

            <FormControl>
              <FormLabel>Chọn vai trò mới</FormLabel>
              <Select
                value={newRole}
                onChange={handleRoleChange}
                placeholder="Chọn vai trò"
              >
                {availableRoles.map((role) => (
                  <option
                    key={role}
                    value={role}
                    disabled={role === user?.role}
                  >
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            isDisabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isSubmitting}
            onClick={handleSubmit}
            isDisabled={!newRole || newRole === user?.role}
          >
            Cập nhật
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
