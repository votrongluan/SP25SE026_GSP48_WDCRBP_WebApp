import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig";
import { formatPrice } from "../../../../../utils/utils";

const products = [
  {
    id: 1,
    name: "Giường 2 tầng",
    dimensions: "200cm x 160cm x 180cm",
    woodType: "Gỗ sồi",
    finish: "Sơn PU bóng",
    color: "Nâu đậm",
  },
  {
    id: 2,
    name: "Tủ quần áo",
    dimensions: "120cm x 60cm x 200cm",
    woodType: "Gỗ óc chó",
    finish: "Dầu lau",
    color: "Nâu đỏ",
  },
];

export default function PersonalizationProductList() {
  return (
    <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
      <Heading fontWeight="bold" fontSize="20px" mb={6}>
        Thông tin sản phẩm
      </Heading>

      <Accordion allowMultiple>
        {products.map((product) => (
          <AccordionItem
            key={product.id}
            border="1px solid #ddd"
            bg="white"
            borderRadius="10px"
            mb={4}
          >
            <AccordionButton
              _expanded={{ bg: appColorTheme.brown_0 }}
              borderRadius="10px"
            >
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold">{product.name}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <HStack>
                  <Text fontWeight="bold">Kích thước:</Text>
                  <Text>{product.dimensions} (dài x rộng x cao)</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Loại gỗ:</Text>
                  <Text>{product.woodType}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Hoàn thiện:</Text>
                  <Text>{product.finish}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Màu sắc:</Text>
                  <Text>{product.color}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Bảng giá chi tiết</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Ảnh liên quan đến sản phẩm</Text>
                </HStack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Flex alignItems="center" my={4} p={5} bgColor={appColorTheme.grey_0}>
        <Text mr={4} fontSize="20px">
          Thành tiền:
        </Text>
        <Text fontSize="30px" color={appColorTheme.brown_2} fontWeight="bold">
          {formatPrice(12000000)}
        </Text>
      </Flex>
    </Box>
  );
}
