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
import { FiTrash } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";

export default function ProductDeleteModal({ product, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const handleDelete = async () => {
    console.log("Xóa sản phẩm:", product);
    onClose();
    refetch?.();
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
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">Xác nhận xóa sản phẩm</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" py={6}>
            Bạn có chắc chắn muốn xóa sản phẩm &ldquo;{product?.name}&rdquo;
            không? Hành động này không thể hoàn tác.
          </ModalBody>
          <ModalFooter bgColor="app_grey.1" pb={6}>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Hủy
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Xóa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
