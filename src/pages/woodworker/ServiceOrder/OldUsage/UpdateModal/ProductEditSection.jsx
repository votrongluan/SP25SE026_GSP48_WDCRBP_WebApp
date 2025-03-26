import React, { useState } from "react";
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Input,
  Text,
  Stack,
  SimpleGrid,
  HStack,
  Box as ChakraBox,
} from "@chakra-ui/react";

// Dữ liệu lịch sử sản phẩm mẫu
const productHistory = [
  {
    version: 1,
    products: [
      {
        id: 1,
        name: "Giường 2 tầng",
        dimensions: "200cm x 160cm x 180cm",
        woodType: "Gỗ sồi",
        finish: "Sơn PU bóng",
        color: "Nâu đậm",
        quantity: 1,
      },
      {
        id: 2,
        name: "Tủ quần áo",
        dimensions: "120cm x 60cm x 200cm",
        woodType: "Gỗ óc chó",
        finish: "Dầu lau",
        color: "Nâu đỏ",
        quantity: 1,
      },
    ],
  },
  // Có thể có nhiều phiên bản nhưng ta chỉ lấy phiên bản cuối cùng
];

export default function ProductEditSection() {
  // Lấy phiên bản cuối cùng
  const latestVersion = productHistory[productHistory.length - 1];
  const [editableProducts, setEditableProducts] = useState(
    latestVersion.products
  );

  const handleProductChange = (id, field, value) => {
    setEditableProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === id ? { ...prod, [field]: value } : prod
      )
    );
  };

  return (
    <Box>
      <Heading fontWeight="bold" fontSize="20px" mb={6} textAlign="center">
        Thông tin sản phẩm
      </Heading>

      <Accordion allowMultiple>
        {editableProducts.map((product) => (
          <AccordionItem
            key={product.id}
            border="1px solid #ddd"
            bg="white"
            borderRadius="10px"
            mb={4}
          >
            <h2>
              <AccordionButton
                _expanded={{ bg: "gray.100" }}
                p={5}
                borderRadius="10px"
              >
                <ChakraBox flex="1" textAlign="left">
                  <Text fontWeight="bold">
                    {product.name} (Gia công theo yêu cầu)
                  </Text>
                </ChakraBox>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <SimpleGrid templateColumns="150px 1fr" gap={4}>
                  <Box>
                    <Text fontWeight="bold">Kích thước:</Text>
                  </Box>
                  <Box>
                    <Input
                      value={product.dimensions}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "dimensions",
                          e.target.value
                        )
                      }
                      placeholder="Kích thước (dài x rộng x cao)"
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Loại gỗ:</Text>
                  </Box>
                  <Box>
                    <Input
                      value={product.woodType}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "woodType",
                          e.target.value
                        )
                      }
                      placeholder="Loại gỗ"
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Hoàn thiện:</Text>
                  </Box>
                  <Box>
                    <Input
                      value={product.finish}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "finish",
                          e.target.value
                        )
                      }
                      placeholder="Hoàn thiện"
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Màu sắc:</Text>
                  </Box>
                  <Box>
                    <Input
                      value={product.color}
                      onChange={(e) =>
                        handleProductChange(product.id, "color", e.target.value)
                      }
                      placeholder="Màu sắc"
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="bold">Số lượng:</Text>
                  </Box>
                  <Box>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "quantity",
                          e.target.value
                        )
                      }
                      placeholder="Số lượng"
                    />
                  </Box>
                </SimpleGrid>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
