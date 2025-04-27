import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import { useDeleteDesignIdeaMutation } from "../../../../services/designIdeaApi";
import { useNotify } from "../../../../components/Utility/Notify";

export default function DesignDeleteModal({ design, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [deleteDesignIdea, { isLoading }] = useDeleteDesignIdeaMutation();
  const [error, setError] = useState(null);
  const notify = useNotify();

  const handleDelete = async () => {
    try {
      setError(null);
      await deleteDesignIdea(design?.designIdeaId).unwrap();
      notify("Xóa thiết kế thành công");
      onClose();
      refetch?.();
    } catch (error) {
      console.error("Lỗi khi xóa thiết kế:", error);
      setError(
        error.data?.message || "Không thể xóa thiết kế. Vui lòng thử lại sau."
      );
      notify(
        "Xóa thiết kế thất bại",
        error.data?.message || "Vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <>
      <Tooltip label="Xóa" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.red_0}
          bg="none"
          border={`1px solid ${appColorTheme.red_0}`}
          _hover={{ bg: appColorTheme.red_0, color: "white" }}
          onClick={onOpen}
        >
          <FiTrash />
        </Button>
      </Tooltip>

      <Modal
        size="md"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
        onClose={isLoading ? null : onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xác nhận xóa</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody bgColor="app_grey.1" pb={6}>
            <VStack spacing={4} align="stretch">
              <Text>
                Bạn có chắc chắn muốn xóa thiết kế &ldquo;{design?.name}&rdquo;
                không? Hành động này không thể hoàn tác.
              </Text>

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Box display="flex" justifyContent="flex-end" gap={3}>
                <Button onClick={onClose} isDisabled={isLoading}>
                  Hủy
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleDelete}
                  isLoading={isLoading}
                  loadingText="Đang xóa..."
                >
                  Xóa
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
