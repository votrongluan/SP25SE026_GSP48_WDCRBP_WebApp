import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "../api/axios";
import { useRef } from "react";
import { AddIcon } from "@chakra-ui/icons";

export default function ProductAddButton() {
  const toast = useToast();

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <HStack>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          _hover={{
            color: "app_black.0",
            bgColor: "app_white.0",
          }}
          color="app_white.0"
          bgColor="app_black.0"
          onClick={onOpen}
        >
          Thêm
        </Button>
      </HStack>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm sản phẩm</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              onSubmit={async (e) => {
                return;

                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);

                if (!data.phone.match(/^[0-9]{9,11}$/)) {
                  toast({
                    title: "Cập nhật thất bại",
                    description: "Số điện thoại không hợp lệ",
                    status: "error",
                    duration: 700,
                    isClosable: true,
                  });
                  return;
                }

                const res = await axios.post(
                  "/v1/clubInsert",
                  JSON.stringify(data),
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (res.data.status == "Ok") {
                  toast({
                    title: "Thêm thành công",
                    description: "Club đã được thêm vào hệ thống",
                    status: "success",
                    duration: 700,
                    isClosable: true,
                  });
                  onClose();
                  window.location.reload();
                } else {
                  toast({
                    title: "Thêm thất bại",
                    description: "Club không được thêm vào hệ thống",
                    status: "error",
                    duration: 700,
                    isClosable: true,
                  });
                }
              }}
            >
              <FormControl isRequired>
                <FormLabel>Tên</FormLabel>
                <Input name="name" type="text" ref={initialRef} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Giá</FormLabel>
                <Input name="price" type="text" ref={initialRef} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Loại</FormLabel>
                <Input name="category" type="tel" ref={initialRef} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Mô tả</FormLabel>
                <Textarea name="description" type="text" ref={initialRef} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Ảnh</FormLabel>
                <Input type="imageFile" ref={initialRef} />
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
