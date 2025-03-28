import {
  Box,
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
  Select,
  Stack,
  Text,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import ImageUpload from "../../../../components/Utility/ImageUpload";
import { formatPrice } from "../../../../utils/utils";

export default function ProductCreateModal({ refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [imgUrls, setImgUrls] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    setImgUrls([]);
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
        Thêm sản phẩm mới
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
          <ModalHeader bgColor="app_grey.2">Thêm sản phẩm mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Hình ảnh</FormLabel>
                  <ImageUpload
                    maxFiles={4}
                    onUploadComplete={(result) => {
                      setImgUrls(result);
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Danh mục</FormLabel>
                  <Select
                    name="category"
                    placeholder="Chọn danh mục"
                    bg="white"
                  >
                    <option value="Bàn ăn">Bàn ăn</option>
                    <option value="Tủ quần áo">Tủ quần áo</option>
                    <option value="Giường ngủ">Giường ngủ</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <Input
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                    bg="white"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Mô tả</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Nhập mô tả"
                    bg="white"
                    rows={5}
                  />
                </FormControl>

                <HStack spacing={4}>
                  <FormControl flex="1" isRequired>
                    <FormLabel>Giá</FormLabel>
                    <HStack>
                      <Text flex="1" as="b" color={appColorTheme.brown_2}>
                        {formatPrice(price)}
                      </Text>

                      <NumberInput
                        name="price"
                        min={0}
                        flex="1"
                        max={50000000}
                        step={1000}
                        value={price}
                        onChange={(value) => setPrice(Number(value))}
                      >
                        <NumberInputField bg="white" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                  </FormControl>

                  <FormControl flex="1" isRequired>
                    <FormLabel>Tồn kho</FormLabel>
                    <NumberInput name="stock" min={0} max={1000} step={1}>
                      <NumberInputField bg="white" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </HStack>

                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Cân nặng (kg)</FormLabel>
                    <NumberInput name="weight" min={0} max={1000} step={0.1}>
                      <NumberInputField bg="white" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Chiều dài (cm)</FormLabel>
                    <NumberInput name="length" min={0} max={1000} step={1}>
                      <NumberInputField bg="white" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </HStack>

                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Chiều cao (cm)</FormLabel>
                    <NumberInput name="height" min={0} max={1000} step={1}>
                      <NumberInputField bg="white" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Chiều rộng (cm)</FormLabel>
                    <NumberInput name="width" min={0} max={1000} step={1}>
                      <NumberInputField bg="white" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <FormLabel>Loại gỗ</FormLabel>
                  <Select
                    name="wood_type"
                    placeholder="Chọn loại gỗ"
                    bg="white"
                  >
                    <option value="Gỗ công nghiệp">Gỗ công nghiệp</option>
                    <option value="Gỗ tự nhiên">Gỗ tự nhiên</option>
                    <option value="Gỗ ép">Gỗ ép</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Màu sắc</FormLabel>
                  <Input name="color" placeholder="Nhập màu sắc" bg="white" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tính năng đặc biệt</FormLabel>
                  <Input
                    name="special_feature"
                    placeholder="Nhập tính năng đặc biệt"
                    bg="white"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phong cách</FormLabel>
                  <Select name="style" placeholder="Chọn phong cách" bg="white">
                    <option value="Hiện đại">Hiện đại</option>
                    <option value="Cổ điển">Cổ điển</option>
                    <option value="Tối giản">Tối giản</option>
                    <option value="Đương đại">Đương đại</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Điêu khắc</FormLabel>
                  <Select
                    name="sculpture"
                    placeholder="Chọn kiểu điêu khắc"
                    bg="white"
                  >
                    <option value="Không">Không</option>
                    <option value="Đơn giản">Đơn giản</option>
                    <option value="Phức tạp">Phức tạp</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Mùi hương</FormLabel>
                  <Select name="scent" placeholder="Chọn mùi hương" bg="white">
                    <option value="Không">Không</option>
                    <option value="Gỗ thông">Gỗ thông</option>
                    <option value="Gỗ sồi">Gỗ sồi</option>
                    <option value="Gỗ trầm">Gỗ trầm</option>
                  </Select>
                </FormControl>

                <HStack justify="flex-end" mt={4}>
                  <Button onClick={onClose}>Hủy</Button>
                  <Button colorScheme="blue" type="submit">
                    Lưu
                  </Button>
                </HStack>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
