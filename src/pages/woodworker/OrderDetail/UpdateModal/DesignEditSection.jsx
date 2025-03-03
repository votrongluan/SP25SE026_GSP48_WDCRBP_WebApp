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
  Input,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DesignFileRow from "../Tab/DesignFileRow"; // Điều chỉnh đường dẫn nếu cần

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

export default function DesignEditSection() {
  // Lấy phiên bản cuối cùng (latest)
  const latestVersion = productHistory[productHistory.length - 1];
  const [currentProducts] = useState(latestVersion.products);

  // State quản lý file mới được chọn cho upload (giả lập upload)
  const [newFiles, setNewFiles] = useState({}); // key: product.id, value: array of File

  const handleFileChange = (e, productId) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => ({
      ...prev,
      [productId]: files,
    }));
  };

  // Hàm upload file (mô phỏng upload: chuyển file thành URL tạm thời và thêm vào designFiles)
  const handleUpload = (productId) => {
    if (!newFiles[productId] || newFiles[productId].length === 0) return;
    // Tạo mảng file upload (mỗi file tạo URL và giả lập version tiếp theo)
    const product = currentProducts.find((p) => p.id === productId);
    const nextVersion =
      (product.designFiles && product.designFiles.length) + 1 || 1;
    const uploadedFiles = newFiles[productId].map((file, index) => ({
      version: nextVersion + index,
      mediaUrls: URL.createObjectURL(file), // Lưu ý: định dạng thực tế có thể là chuỗi các URL nối với dấu ";"
      uploadDate: new Date().toLocaleString(),
    }));
    // Ở đây, bạn có thể gọi API để cập nhật backend, sau đó refresh state.
    // Ví dụ: cập nhật trực tiếp vào product.designFiles (chỉ mô phỏng)
    product.designFiles = [...(product.designFiles || []), ...uploadedFiles];
    // Reset file mới cho sản phẩm này
    setNewFiles((prev) => ({
      ...prev,
      [productId]: [],
    }));
  };

  return (
    <Box>
      <Heading fontWeight={500} fontSize="20px" mb={5} textAlign="center">
        Thông tin sản phẩm
      </Heading>

      <Accordion allowMultiple>
        {currentProducts.map((product) => (
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
                <Box flex="1" textAlign="left">
                  <Text fontWeight="500">
                    {product.name} (Gia công theo yêu cầu)
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
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
                <HStack>
                  <Text fontWeight="500">Số lượng:</Text>
                  <Text>1</Text>
                </HStack>

                {/* Hiển thị file thiết kế hiện có */}
                <DesignFileRow designFiles={product.designFiles} />

                {/* Phần tải lên file thiết kế mới */}
                <Box mt={4}>
                  <Text fontWeight="500" mb={2}>
                    Tải thiết kế lên:
                  </Text>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, product.id)}
                  />
                </Box>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
