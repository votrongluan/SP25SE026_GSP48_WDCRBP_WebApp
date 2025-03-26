import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import ImageUpdateUploader from "../../../../components/Utility/ImageUpdateUploader";

export default function PostCreateModal({ refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [imgUrls, setImgUrls] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description"),
      imgUrls: imgUrls,
      createdAt: new Date().toISOString(),
    };
    console.log(data);
    setImgUrls("");
    onClose();
  };

  return (
    <>
      <Button
        px={2}
        color={appColorTheme.green_0}
        bg="none"
        border={`1px solid ${appColorTheme.green_0}`}
        _hover={{ bg: appColorTheme.green_0, color: "white" }}
        leftIcon={<FiPlus />}
        onClick={onOpen}
      >
        Thêm bài viết mới
      </Button>

      <Modal
        size="6xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">Thêm bài viết mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Mã bài viết</FormLabel>
                  <Input name="id" placeholder="Nhập mã bài viết" bg="white" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tiêu đề</FormLabel>
                  <Input
                    name="title"
                    placeholder="Nhập tiêu đề bài viết"
                    bg="white"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Mô tả</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Nhập mô tả bài viết"
                    bg="white"
                    rows={10}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Hình ảnh</FormLabel>
                  <ImageUpdateUploader
                    maxFiles={5}
                    onUploadComplete={setImgUrls}
                    imgUrls={imgUrls}
                  />
                </FormControl>

                <Stack direction="row" justify="flex-end" spacing={4}>
                  <Button onClick={onClose}>Hủy</Button>
                  <Button colorScheme="blue" type="submit">
                    Lưu
                  </Button>
                </Stack>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
} 