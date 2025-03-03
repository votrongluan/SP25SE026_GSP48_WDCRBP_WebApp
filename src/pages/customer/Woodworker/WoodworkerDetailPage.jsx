import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../data/globalData";
import ReviewSection from "./ReviewSection";

export default function WoodworkerDetailPage() {
  const product = {
    product_id: "111",
    product_name: "Sản phẩm mặc định",
    description: "Đang cập nhật mô tả",
    price: "1.000.000 VND",
    stock: 0,
    status: "Đang cập nhật",
    imageUrl:
      "https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp",
    media_urls:
      "https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp;https://noithatthaibinh.com/wp-content/uploads/2023/10/Giuong-2-tang-tre-em-1m2-MS-3014-1.jpg",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    wood_type: "Đang cập nhật",
    color: "Đang cập nhật",
    special_feature: "Đang cập nhật",
    style: "Đang cập nhật",
    sculpture: "Đang cập nhật",
    scent: "Đang cập nhật",
  };

  // Tách chuỗi media_urls thành mảng các URL
  const imageList = product.media_urls ? product.media_urls.split(";") : [];

  // Ảnh chính ban đầu lấy từ imageUrl, nếu không có thì lấy phần tử đầu của imageList
  const [mainImage, setMainImage] = useState(
    product.imageUrl || imageList[0] || ""
  );

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  return (
    <Container w="90%" maxW="1400px" pb="50px">
      <Box height="70px">
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="26px"
          fontFamily="Montserrat"
        >
          Chi tiết sản phẩm
        </Heading>
      </Box>

      <Box>
        <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={5}>
          {/* Cột hình ảnh */}
          <Box borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            {/* Hình ảnh chính */}
            <Box mb={4}>
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.product_name}
                  borderRadius="md"
                  w="100%"
                  h="500px"
                  objectFit="contain"
                />
              ) : (
                <Box
                  w="100%"
                  h="300px"
                  bgColor="gray.200"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>Không có ảnh</Text>
                </Box>
              )}
            </Box>

            {/* Danh sách ảnh nhỏ phía dưới hình ảnh chính */}
            <Flex gap={4} overflowX="auto">
              {imageList.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`${product.product_name || "Sản phẩm"} - ${index}`}
                  w="80px"
                  h="80px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                  border={
                    mainImage === img
                      ? "2px solid #3182CE"
                      : "2px solid transparent"
                  }
                  onClick={() => handleThumbnailClick(img)}
                />
              ))}
            </Flex>
          </Box>

          {/* Cột thông tin sản phẩm */}
          <Stack borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <Stack spacing={4}>
              <Heading fontWeight="500" fontSize="20px">
                {product.product_name || "Tên sản phẩm"}
              </Heading>

              <Text>
                <strong>Số lượng trong kho:</strong>{" "}
                {product.stock ?? "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Tình trạng:</strong> {status || "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Kích thước (D x R x C):</strong>{" "}
                {length && product.width && product.height
                  ? `${length} x ${product.width} x ${product.height}`
                  : "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Trọng lượng:</strong>{" "}
                {product.weight ?? "Đang cập nhật..."} kg
              </Text>

              <Text>
                <strong>Loại gỗ:</strong>{" "}
                {product.wood_type || "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Màu sắc:</strong> {product.color || "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Tính năng đặc biệt:</strong>{" "}
                {product.special_feature || "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Kiểu dáng:</strong>{" "}
                {product.style || "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Chạm khắc:</strong>{" "}
                {product.sculpture || "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Hương thơm:</strong>{" "}
                {product.scent || "Đang cập nhật..."}
              </Text>
            </Stack>

            <Spacer />

            <Box>
              {/* Nút "Mua ngay" và "Thêm vào giỏ" */}
              <Flex gap={4} jus alignItems="center">
                {/* Mua ngay */}
                <Button
                  bg={appColorTheme.brown_2}
                  color="white"
                  borderRadius="30px"
                  px={8}
                  py={6}
                  _hover={{ bg: `${appColorTheme.brown_1}` }}
                >
                  MUA NGAY
                </Button>

                <Spacer />

                {/* Thêm vào giỏ */}
                <Button
                  variant="outline"
                  borderColor={appColorTheme.brown_2}
                  color={appColorTheme.brown_2}
                  borderRadius="30px"
                  px={4}
                  py={6}
                  _hover={{ opacity: ".9" }}
                >
                  Thêm vào giỏ
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Grid>

        <ReviewSection />
      </Box>
    </Container>
  );
}
