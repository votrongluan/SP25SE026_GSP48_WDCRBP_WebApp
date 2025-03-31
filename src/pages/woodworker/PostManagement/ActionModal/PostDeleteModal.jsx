import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiTrash2 } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";

export default function PostDeleteModal({ post, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const handleDelete = async () => {
    try {
      // TODO: Gọi API xóa bài viết
      console.log("Xóa bài viết:", post);
      onClose();
      refetch?.();
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
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
          <FiTrash2 />
        </Button>
      </Tooltip>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xác nhận xóa bài viết</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1">
            <p>Bạn có chắc chắn muốn xóa bài viết &quot;{post?.title}&quot;?</p>
            <p>Hành động này không thể hoàn tác.</p>
          </ModalBody>
          <ModalFooter bgColor="app_grey.1" gap={2}>
            <Button onClick={onClose}>Hủy</Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Xóa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
