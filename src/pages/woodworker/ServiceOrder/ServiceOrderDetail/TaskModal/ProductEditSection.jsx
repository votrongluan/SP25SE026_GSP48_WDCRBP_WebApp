import { useState } from "react";
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
  Box as ChakraBox,
} from "@chakra-ui/react";
import PriceDetailSection from "./PriceDetailSection";

// Dữ liệu lịch sử sản phẩm mẫu
const products = [
  {
    id: 1,
    name: "Giường 2 tầng",
    dimensions: "200cm x 160cm x 180cm",
    woodType: "Gỗ sồi",
    finish: "Sơn PU bóng",
    color: "Nâu đậm",
    quantity: 1,
    priceDetails: [
      { id: 1, type: "Gỗ thông", quantity: "18mm - 1.5m2", price: 500000 },
      { id: 2, type: "Sơn PU", quantity: "0.5 lít", price: 100000 },
    ],
  },
];

export default function ProductEditSection() {
  const [editableProducts, setEditableProducts] = useState(products);

  const handleProductChange = (id, field, value) => {
    setEditableProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === id ? { ...prod, [field]: value } : prod
      )
    );
  };

  const handlePriceDetailsChange = (productId, newPriceDetails) => {
    setEditableProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === productId
          ? {
              ...prod,
              priceDetails: newPriceDetails,
            }
          : prod
      )
    );
  };

  return (
    <Box>
      <Heading fontWeight="bold" fontSize="20px" mb={6} textAlign="center">
        Thông tin sản phẩm
      </Heading>

      <Accordion allowMultiple defaultIndex={[0, editableProducts.length - 1]}>
        {editableProducts.map((product) => (
          <AccordionItem
            key={product.id}
            border="1px solid #ddd"
            bg="white"
            borderRadius="10px"
            mb={4}
          >
            <AccordionButton _expanded={{ bg: "gray.100" }} borderRadius="10px">
              <ChakraBox flex="1" textAlign="left">
                <Text fontWeight="bold">
                  {product.name} (Gia công theo yêu cầu)
                </Text>
              </ChakraBox>
              <AccordionIcon />
            </AccordionButton>

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
                </SimpleGrid>

                <PriceDetailSection
                  productId={product.id}
                  priceDetails={product.priceDetails}
                  onPriceDetailsChange={handlePriceDetailsChange}
                />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
