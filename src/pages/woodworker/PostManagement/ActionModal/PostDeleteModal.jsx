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
import { FiTrash2, FiX } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import { useDeletePostMutation } from "../../../../services/postApi";
import { useNotify } from "../../../../components/Utility/Notify";

export default function PostDeleteModal({ post, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const notify = useNotify();

  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(post.postId).unwrap();

      notify("Bài viết đã được xóa thành công", "", "success", 3000);

      onClose();
      refetch?.();
    } catch (error) {
      notify(
        "Lỗi khi xóa bài viết",
        error.data?.message || "Vui lòng thử lại sau",
        "error",
        3000
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
          {!isLoading && <ModalCloseButton />}
          <ModalBody bgColor="app_grey.1">
            <p>Bạn có chắc chắn muốn xóa bài viết &quot;{post?.title}&quot;?</p>
            <p>Hành động này không thể hoàn tác.</p>
          </ModalBody>
          <ModalFooter bgColor="app_grey.1" gap={2}>
            <Button leftIcon={<FiX />} onClick={onClose} isDisabled={isLoading}>
              Hủy
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              isLoading={isLoading}
              leftIcon={<FiTrash2 />}
            >
              Xóa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
