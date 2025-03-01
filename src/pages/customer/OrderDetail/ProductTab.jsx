import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Image,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { appColorTheme } from "../../../data/globalData";

// Static product history data
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
      },
    ],
  },
  {
    version: 2,
    products: [
      {
        id: 1,
        name: "Giường 2 tầng",
        dimensions: "200cm x 160cm x 180cm",
        woodType: "Gỗ sồi",
        finish: "Sơn PU bóng",
        color: "Nâu đậm",
        designFiles: [
          "https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg",
          "https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg",
        ],
      },
      {
        id: 2,
        name: "Tủ quần áo",
        dimensions: "120cm x 60cm x 200cm",
        woodType: "Gỗ óc chó",
        finish: "Dầu lau",
        color: "Nâu đỏ",
        designFiles: [
          "https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg",
          "https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg",
        ],
      },
    ],
  },
];

export default function ProductTab() {
  const [currentVersion, setCurrentVersion] = useState(productHistory.length); // Start at latest version

  const handleNext = () => {
    if (currentVersion < productHistory.length) {
      setCurrentVersion(currentVersion + 1);
    }
  };

  const handlePrev = () => {
    if (currentVersion > 1) {
      setCurrentVersion(currentVersion - 1);
    }
  };

  const currentProducts =
    productHistory.find((v) => v.version === currentVersion)?.products || [];

  return (
    <Box>
      <HStack justify="center" my={4}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrev}
          isDisabled={currentVersion === 1}
          aria-label="Previous Version"
        />
        <Text fontSize="lg" fontWeight="bold">
          Bản thứ {currentVersion}
        </Text>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNext}
          isDisabled={currentVersion === productHistory.length}
          aria-label="Next Version"
        />
      </HStack>

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={4}>
        {currentProducts.map((product) => (
          <Box
            key={product.id}
            border="1px solid black"
            p="20px"
            borderRadius="10px"
            bg={appColorTheme.grey_0}
          >
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              Thông tin sản phẩm
            </Heading>

            <Stack spacing="12px">
              <HStack>
                <Text fontWeight="500">Loại sản phẩm:</Text>
                <Text>{product.name}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="500">Kích thước:</Text>
                <Text>{product.dimensions} (dài x rộng x cao)</Text>
              </HStack>
              <HStack>
                <Text fontWeight="500">Loại gỗ:</Text>
                <Text>{product.woodType}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="500">Hoàn thiện:</Text>
                <Text>{product.finish}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="500">Màu sắc:</Text>
                <Text>{product.color}</Text>
              </HStack>

              {product.designFiles && (
                <Accordion allowToggle mt={4}>
                  <AccordionItem border="1px solid #ddd" borderRadius="5px">
                    <AccordionButton _expanded={{ bg: "gray.100" }} p={3}>
                      <Box flex="1" textAlign="left">
                        <Heading fontWeight="500" fontSize="18px">
                          Thiết kế sản phẩm
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                      <Stack spacing={2}>
                        {product.designFiles.map((file, idx) => (
                          <HStack key={idx} p={2}>
                            <Image
                              src={file}
                              alt="Design File"
                              objectFit="cover"
                              width="100%"
                              borderRadius="5px"
                            />
                          </HStack>
                        ))}
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
