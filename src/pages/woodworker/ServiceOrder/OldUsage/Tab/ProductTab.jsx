import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DesignFileRow from "./DesignFileRow.jsx"; // Adjust the path as needed

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
        designFiles: [
          {
            version: 1,
            mediaUrls:
              "https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg;https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg",
            uploadDate: "12-03-2025 05:34 AM",
          },
          {
            version: 2,
            mediaUrls:
              "https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg;https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg",
            uploadDate: "12-03-2025 05:34 AM",
          },
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
          {
            version: 1,
            mediaUrls:
              "https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg;https://flexfit.vn/wp-content/uploads/2020/12/uu-diem-giuong-tang.jpg",
            uploadDate: "15-03-2025 10:00 AM",
          },
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
      <Heading fontWeight="bold" fontSize="20px" mb={5} textAlign="center">
        Thông tin sản phẩm
      </Heading>

      <HStack justify="center" mb={4}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrev}
          isDisabled={currentVersion === 1}
          aria-label="Previous Version"
        />
        {productHistory.length !== currentVersion ? (
          <Text fontWeight="300">Bản nháp {currentVersion}</Text>
        ) : (
          <Text fontWeight="300">Bản chính</Text>
        )}
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNext}
          isDisabled={currentVersion === productHistory.length}
          aria-label="Next Version"
        />
      </HStack>

      <Accordion allowMultiple>
        {currentProducts.map((product) => (
          <AccordionItem
            key={product.id}
            border="1px solid #ddd"
            bg={"white"}
            borderRadius="10px"
            mb={4}
          >
            <h2>
              <AccordionButton
                _expanded={{ bg: "gray.100" }}
                p={5}
                borderRadius="10px"
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight="bold">
                    {product.name} (Gia công theo yêu cầu)
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

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
                  <Text fontWeight="bold">Số lượng:</Text>
                  <Text>1</Text>
                </HStack>

                <DesignFileRow designFiles={product.designFiles} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
