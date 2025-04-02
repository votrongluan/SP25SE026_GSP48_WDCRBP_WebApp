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
  Image,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../../config/appconfig.js";
import { formatPrice } from "../../../../../../utils/utils.js";
import ImageListSelector from "../../../../../../components/Utility/ImageListSelector.jsx";

const products = [
  {
    designId: "TK001",
    name: "Bàn gỗ thủ công",
    imgUrls:
      "https://i.pinimg.com/1200x/aa/b0/ad/aab0ad2b357f91c06718f4177fd4932f.jpg;https://i.pinimg.com/1200x/17/99/2a/17992af2512a41db6b739c546a95944e.jpg",
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
    prices: { config: [1, 2], configValue: [101, 201], price: 12000000 },
  },
];

const ConfigurationItem = ({ config, selectedValue }) => (
  <HStack justify="space-between" w="100%">
    <Text fontWeight="bold">{config.name}:</Text>
    <Text>{selectedValue.name}</Text>
  </HStack>
);

export default function CustomizationProductList() {
  return (
    <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
      <Heading fontWeight="bold" fontSize="20px" mb={6}>
        Thông tin sản phẩm
      </Heading>

      <Accordion allowMultiple>
        {products.map((product) => (
          <AccordionItem
            key={product.designId}
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
                <HStack>
                  <Image
                    src={product.imgUrls.split(";")[0]}
                    alt={product.name}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box>
                    <Text fontWeight="bold">{product.name}</Text>
                    <Badge colorScheme="green">{product.category}</Badge>
                  </Box>
                  <Text
                    fontSize="xl"
                    color={appColorTheme.brown_2}
                    fontWeight="bold"
                    marginLeft="auto"
                  >
                    {formatPrice(products[0].prices.price)}
                  </Text>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Stack spacing={6}>
                {/* Mô tả sản phẩm */}
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Mô tả:
                  </Text>
                  <Text color="gray.600">{product.description}</Text>
                </Box>

                <Divider />

                {/* Cấu hình đã chọn */}
                <Box>
                  <Text fontWeight="bold" mb={3}>
                    Cấu hình đã chọn:
                  </Text>
                  <Stack spacing={3}>
                    {product.configurations.map((config) => {
                      const selectedValue = config.values.find(
                        (value) =>
                          value.id ===
                          product.prices.configValue[
                            product.prices.config.indexOf(config.id)
                          ]
                      );
                      return (
                        <ConfigurationItem
                          key={config.id}
                          config={config}
                          selectedValue={selectedValue}
                        />
                      );
                    })}
                  </Stack>
                </Box>

                <Divider />

                {/* Ảnh sản phẩm */}
                <Box>
                  <Text fontWeight="bold" mb={3}>
                    Ảnh sản phẩm:
                  </Text>
                  <ImageListSelector imgH={150} imgUrls={product.imgUrls} />
                </Box>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Flex alignItems="center" my={4} p={5} bgColor={appColorTheme.grey_0}>
        <Text mr={4} fontSize="20px">
          Thành tiền:
        </Text>
        <Text
          ml="auto"
          fontSize="30px"
          color={appColorTheme.brown_2}
          fontWeight="bold"
        >
          {formatPrice(products[0].prices.price)}
        </Text>
      </Flex>
    </Box>
  );
}
