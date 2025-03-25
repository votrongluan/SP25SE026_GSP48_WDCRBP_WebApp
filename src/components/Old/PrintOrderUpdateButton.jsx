import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "../../api/axios.js";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth.js";

export default function PrintOrderUpdateButton({ order, refetch }) {
  const toast = useToast();
  const { auth } = useAuth();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Box p="8px" onClick={onOpen} width="100%">
        Cập nhật
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật đơn in</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                data.supplierId = auth?.EmployeeId;
                data.status = +data.status;
                data.price = +data.price;

                axios
                  .put(
                    `/PrintOrder/UpdatePrintOrderStatus?printOrderId=${order.printOrderId}`,
                    data
                  )
                  .then((response) => {
                    toast({
                      title: `${order.printOrderId} đã cập nhật thành công`,
                      status: "success",
                      duration: 500,
                      isClosable: true,
                    });

                    refetch();
                  })
                  .catch((error) => {
                    console.error("Error placing order", error);
                  });
              }}
            >
              <FormControl isRequired>
                <FormLabel>Giá</FormLabel>
                <Input name="price" type="text" ref={initialRef} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Trạng thái</FormLabel>
                <Select name="status" type="text" ref={initialRef}>
                  <option value={1}>Chờ xác nhận</option>
                </Select>
              </FormControl>

              <HStack mt={10}>
                <Spacer />
                <Button colorScheme="blue" mr={3} type="submit">
                  Xác nhận
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
