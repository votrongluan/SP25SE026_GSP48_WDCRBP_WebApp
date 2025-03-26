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
  Tooltip,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import PropTypes from "prop-types";
import { appColorTheme } from "../../../../config/appconfig";
import ImageUpdateUploader from "../../../../components/Utility/ImageUpdateUploader";

export default function PostUpdateModal({ post, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [imgUrls, setImgUrls] = useState(post?.imgUrls || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description"),
      imgUrls: imgUrls,
      createdAt: post.createdAt,
    };
    console.log(data);
    onClose();
    refetch?.();
  };

  return (
    <>
      <Tooltip label="Chỉnh sửa" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.blue_0}
          bg="none"
          border={`1px solid ${appColorTheme.blue_0}`}
          _hover={{ bg: appColorTheme.blue_0, color: "white" }}
          onClick={onOpen}
        >
          <FiEdit2 />
        </Button>
      </Tooltip>

      <Modal
        size="6xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="app_grey.2">Chỉnh sửa bài viết</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Mã bài viết</FormLabel>
                  <Input
                    name="id"
                    placeholder="Nhập mã bài viết"
                    bg="white"
                    defaultValue={post?.id}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tiêu đề</FormLabel>
                  <Input
                    name="title"
                    placeholder="Nhập tiêu đề bài viết"
                    bg="white"
                    defaultValue={post?.title}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Mô tả</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Nhập mô tả bài viết"
                    bg="white"
                    rows={10}
                    defaultValue={post?.description}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Hình ảnh</FormLabel>
                  <ImageUpdateUploader
                    maxFiles={5}
                    onUploadComplete={(result) => {
                      console.log(result);
                      setImgUrls(result);
                    }}
                    imgUrls={imgUrls}
                  />
                </FormControl>

                <Stack direction="row" justify="flex-end" spacing={4}>
                  <Button onClick={onClose}>Hủy</Button>
                  <Button colorScheme="blue" type="submit">
                    Cập nhật
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

PostUpdateModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgUrls: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func,
};

PostUpdateModal.defaultProps = {
  refetch: undefined,
};
