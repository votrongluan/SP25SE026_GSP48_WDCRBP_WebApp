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
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiEye } from "react-icons/fi";
import { appColorTheme } from "../../../../config/appconfig";
import ImageListSelector from "../../../../components/Utility/ImageListSelector";
import { formatPrice } from "../../../../utils/utils";

export default function DesignDetailModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const design = {
    name: "Bàn gỗ thủ công",
    imgUrls:
      "https://i.pinimg.com/1200x/18/82/40/18824088b9a9a8ebe87f79ac35b48ad7.jpg;https://i.pinimg.com/1200x/88/6c/02/886c021fa372379d95990e16c4fbd022.jpg",
    category: "Bàn",
    description: "Không có gì",

    configurations: [
      {
        id: 1,
        name: "Loại gỗ",
        values: [
          { id: 101, name: "Gỗ Sồi" },
          { id: 102, name: "Gỗ Óc Chó" },
        ],
      },
      {
        id: 2,
        name: "Bề mặt hoàn thiện",
        values: [
          { id: 201, name: "Tự nhiên" },
          { id: 202, name: "Sơn bóng" },
        ],
      },
    ],
    prices: [
      { config: [1, 2], configValue: [101, 201], price: 12000000 },
      { config: [1, 2], configValue: [101, 202], price: 14000000 },
      { config: [1, 2], configValue: [102, 201], price: 15000000 },
      { config: [1, 2], configValue: [102, 202], price: 17000000 },
    ],
  };

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
          <ModalHeader bgColor="app_grey.2">Chi tiết thiết kế</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="app_grey.1" pb={6}>
            <Grid templateColumns="1fr 1fr" gap={6}>
              {/* Phần hình ảnh */}
              <Box>
                <Heading size="md" mb={4}>
                  Hình ảnh sản phẩm
                </Heading>
                <ImageListSelector imgH={300} imgUrls={design?.imgUrls} />
              </Box>

              {/* Phần thông tin cơ bản */}
              <Box>
                <Heading size="md" mb={4}>
                  Thông tin cơ bản
                </Heading>
                <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
                  <VStack align="stretch" spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Tên sản phẩm:</Text>
                      <Text>{design?.name}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Danh mục:</Text>
                      <Text>{design?.category}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Mô tả:</Text>
                      <Text>{design?.description}</Text>
                    </Box>
                  </VStack>
                </Box>
              </Box>

              {/* Phần cấu hình */}
              <Box gridColumn="span 2">
                <Heading size="md" mb={4}>
                  Cấu hình sản phẩm
                </Heading>
                <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
                  <VStack align="stretch" spacing={4}>
                    {design?.configurations.map((config) => (
                      <Box key={config.id}>
                        <Text fontWeight="bold" mb={2}>
                          {config.name}:
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {config.values.map((value) => (
                            <Text
                              key={value.id}
                              px={3}
                              py={1}
                              bg="gray.100"
                              borderRadius="full"
                              bgColor="white"
                              border={`1px solid ${appColorTheme.brown_2}`}
                              color={appColorTheme.brown_2}
                            >
                              {value.name}
                            </Text>
                          ))}
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Box>

              {/* Phần bảng giá */}
              <Box gridColumn="span 2">
                <Heading size="md" mb={4}>
                  Bảng giá theo cấu hình
                </Heading>
                <Box
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                  overflowX="auto"
                >
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        {design?.configurations.map((config) => (
                          <Th key={config.id}>{config.name}</Th>
                        ))}
                        <Th>Giá</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {design?.prices.map((price, index) => (
                        <Tr key={index}>
                          {price.configValue.map((valueId) => {
                            const configId = Math.floor(valueId / 100);
                            const config = design.configurations.find(
                              (c) => c.id == configId
                            );
                            const value = config?.values.find(
                              (v) => v.id == valueId
                            );
                            return (
                              <Td key={valueId}>
                                <Text>{value?.name}</Text>
                              </Td>
                            );
                          })}
                          <Td>
                            <Text
                              fontSize="xl"
                              as="b"
                              color={appColorTheme.brown_2}
                            >
                              {formatPrice(price.price)}
                            </Text>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </Grid>

            <HStack justify="flex-end" mt={6}>
              <Button onClick={onClose}>Đóng</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
