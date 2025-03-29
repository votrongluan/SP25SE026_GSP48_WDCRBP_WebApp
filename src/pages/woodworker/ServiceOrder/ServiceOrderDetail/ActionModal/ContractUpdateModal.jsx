import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiEdit2 } from "react-icons/fi";
import ContractEditSection from "./ContractEditSection.jsx";
import ProductEditSection from "./ProductEditSection.jsx";
import { appColorTheme } from "../../../../../config/appconfig.js";

export default function ContractUpdateModal({ order, refetch }) {
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Button
        py={1}
        px={2}
        color={appColorTheme.blue_0}
        bg="none"
        border={`1px solid ${appColorTheme.blue_0}`}
        _hover={{ bg: appColorTheme.blue_0, color: "white" }}
        leftIcon={<FiEdit2 />}
        onClick={onOpen}
      >
        Soạn hợp đồng
      </Button>

      <Modal
        size="6xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">
            Tạo, điều chỉnh hợp đồng và sản phẩm yêu cầu
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const putData = Object.fromEntries(formData);
                putData.orderStatus = +putData.orderStatus;
              }}
            >
              <Box>
                <ContractEditSection />
              </Box>

              <HStack mt={10}>
                <Spacer />
                <Button colorScheme="blue" mr={3} type="submit">
                  Cập nhật
                </Button>
                <Button onClick={onClose}>Hủy</Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
