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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "../api/axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderUpdateButton({ order, reFetch }) {
  const toast = useToast();
  const navigate = useNavigate();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);  

  return (
    <>
      <Box p="8px" width="100%" onClick={onOpen}>
        Cập nhật
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật đơn hàng</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const putData = Object.fromEntries(formData);
                putData.orderStatus = +putData.orderStatus;

                axios
                  .put(
                    `/Order/UpdateOrderStatus?orderId=${order.orderId}`,
                    putData
                  )
                  .then((response) => {
                    toast({
                      title: `${order.orderId} đã cập nhật thành công`,
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
                <FormLabel>Trạng thái</FormLabel>
                <Select name="orderStatus" type="text" ref={initialRef}>
                  <option value={2}>Đã hoàn thành</option>
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
