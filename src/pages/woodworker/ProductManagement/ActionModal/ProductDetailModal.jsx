import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiEye } from "react-icons/fi";
import PropTypes from "prop-types";
import { appColorTheme } from "../../../../config/appconfig";
import ImageListSelector from "../../../../components/Utility/ImageListSelector";
import { formatPrice } from "../../../../utils/utils";

export default function ProductDetailModal({ product, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <Tooltip label="Chi tiết" hasArrow>
        <Button
          p="1px"
          color={appColorTheme.brown_2}
          bg="none"
          border={`1px solid ${appColorTheme.brown_2}`}
          _hover={{ bg: appColorTheme.brown_2, color: "white" }}
          onClick={onOpen}
        >
          <FiEye />
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
          <ModalHeader bgColor="app_grey.2">Chi tiết sản phẩm</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <Stack gap={6}>
              <SimpleGrid
                columns={{
                  base: 1,
                  xl: 2,
                }}
                gap={6}
              >
                {/* Phần hình ảnh */}
                <Box>
                  <Heading size="md" mb={4}>
                    Hình ảnh sản phẩm
                  </Heading>
                  <ImageListSelector imgH={300} imgUrls={product?.imgUrls} />
                </Box>

                {/* Phần thông tin cơ bản */}
                <Box>
                  <Heading size="md" mb={4}>
                    Thông tin cơ bản
                  </Heading>
                  <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
                    <VStack align="stretch" spacing={4}>
                      <Box>
                        <Text fontWeight="bold">Mã sản phẩm:</Text>
                        <Text>{product?.id}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Tên sản phẩm:</Text>
                        <Text>{product?.name}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Danh mục:</Text>
                        <Text>{product?.category}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Mô tả:</Text>
                        <Text>{product?.description}</Text>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </SimpleGrid>

              {/* Phần thông tin kỹ thuật */}
              <Box gridColumn="span 2">
                <Heading size="md" mb={4}>
                  Thông tin kỹ thuật
                </Heading>
                <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box>
                      <Text fontWeight="bold">Giá:</Text>
                      <Text fontSize="xl" as="b" color={appColorTheme.brown_2}>
                        {formatPrice(product?.price)}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Tồn kho:</Text>
                      <Text>{product?.stock}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Cân nặng:</Text>
                      <Text>{product?.weight} kg</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Kích thước:</Text>
                      <Text>
                        {product?.length} x {product?.width} x {product?.height}{" "}
                        cm
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Loại gỗ:</Text>
                      <Text>{product?.wood_type}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Màu sắc:</Text>
                      <Text>{product?.color}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Tính năng đặc biệt:</Text>
                      <Text>{product?.special_feature}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Phong cách:</Text>
                      <Text>{product?.style}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Điêu khắc:</Text>
                      <Text>{product?.sculpture}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Mùi hương:</Text>
                      <Text>{product?.scent}</Text>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </Stack>

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

ProductDetailModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    imgUrls: PropTypes.string.isRequired,
    wood_type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    special_feature: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    sculpture: PropTypes.string.isRequired,
    scent: PropTypes.string.isRequired,
  }).isRequired,
};
