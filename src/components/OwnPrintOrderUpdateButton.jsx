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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "../api/axios";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";

export default function OwnPrintOrderUpdateButton({ order, reFetch }) {
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

                axios
                  .put(
                    `/PrintOrder/UpdatePrintOrderStatus?printOrderId=${order.printOrderId}`,
                    {
                      status: 3,
                      price: order?.price,
                      supplierId: order?.supplierId,
                    }
                  )
                  .then((response) => {
                    toast({
                      title: `${order.printOrderId} đã cập nhật thành công`,
                      status: "success",
                      duration: 500,
                      isClosable: true,
                    });

                    reFetch();
                  })
                  .catch((error) => {
                    console.error("Error placing order", error);
                  });
              }}
            >
              <FormControl isRequired>
                <FormLabel>Giá</FormLabel>
                <Input
                  value={order?.price?.toLocaleString() + " đ"}
                  readOnly
                  name="price"
                  type="text"
                  ref={initialRef}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Trạng thái</FormLabel>
                <Select name="status" type="text" ref={initialRef}>
                  <option value={3}>Đã hoàn thành</option>
                </Select>
              </FormControl>

              <HStack mt={10}>
                <Spacer />
                {order?.status == 2 ? (
                  <Button colorScheme="blue" mr={3} type="submit">
                    Xác nhận
                  </Button>
                ) : (
                  <Text>Khách hàng chưa xác nhận</Text>
                )}
                <Button onClick={onClose}>Hủy</Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
