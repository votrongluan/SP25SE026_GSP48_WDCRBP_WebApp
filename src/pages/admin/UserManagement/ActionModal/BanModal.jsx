import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useToast,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBanUserMutation } from "../../../../services/userApi";

export default function BanModal({
  isOpen,
  onClose,
  user,
  isBanning,
  refetch,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const [banUser] = useBanUserMutation();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      await banUser({
        userId: user.id,
        banned: isBanning,
      }).unwrap();

      toast({
        title: "Thành công",
        description: isBanning
          ? `Đã khóa tài khoản của ${user.username}`
          : `Đã mở khóa tài khoản của ${user.username}`,
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
          `Đã xảy ra lỗi khi ${
            isBanning ? "khóa" : "mở khóa"
          } tài khoản người dùng`,
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
        <ModalHeader color={isBanning ? "red.500" : "green.500"}>
          {isBanning
            ? "Khóa tài khoản người dùng"
            : "Mở khóa tài khoản người dùng"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="start">
            <Alert
              status={isBanning ? "error" : "success"}
              variant="left-accent"
              borderRadius="md"
            >
              <AlertIcon />
              <AlertTitle>{isBanning ? "Cảnh báo!" : "Thông báo!"}</AlertTitle>
              <AlertDescription>
                {isBanning
                  ? "Người dùng sẽ không thể đăng nhập vào tài khoản sau khi bị khóa."
                  : "Người dùng sẽ có thể đăng nhập vào tài khoản sau khi được mở khóa."}
              </AlertDescription>
            </Alert>

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
                Vai trò:
              </Text>{" "}
              <Badge
                colorScheme={
                  user?.role === "Admin"
                    ? "red"
                    : user?.role === "Moderator"
                    ? "purple"
                    : user?.role === "Staff"
                    ? "blue"
                    : user?.role === "Woodworker"
                    ? "green"
                    : "yellow"
                }
                px={2}
                py={1}
                borderRadius="full"
              >
                {user?.role}
              </Badge>
            </Text>
            <Text>
              <Text as="span" fontWeight="bold">
                Trạng thái hiện tại:
              </Text>{" "}
              <Badge
                colorScheme={user?.status ? "green" : "red"}
                px={2}
                py={1}
                borderRadius="full"
              >
                {user?.status ? "Hoạt động" : "Đã bị khóa"}
              </Badge>
            </Text>

            <Text fontWeight="medium" mt={2}>
              Bạn có chắc chắn muốn {isBanning ? "khóa" : "mở khóa"} tài khoản
              này?
            </Text>
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
            colorScheme={isBanning ? "red" : "green"}
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            {isBanning ? "Khóa tài khoản" : "Mở khóa tài khoản"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
