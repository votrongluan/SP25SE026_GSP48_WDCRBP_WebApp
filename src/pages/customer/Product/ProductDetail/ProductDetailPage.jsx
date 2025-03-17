import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import ReviewSection from "./ReviewSection.jsx";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import ImageListSelector from "../../../../components/Utility/ImageListSelector.jsx";

export default function ProductDetailPage() {
  const product = {
    product_id: "111",
    product_name: "Giường 2 tầng Bubu",
    media_urls:
      "https://noithatthaibinh.com/wp-content/uploads/2023/10/Giuong-2-tang-tre-em-1m2-MS-3014-1.jpg;https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp",
    description: "Giường 2 tầng xinh xắn, thiết kế tùy chỉnh phù hợp phòng nhỏ",
    category_id: 1,
    woodworker_profile_id: 456,
    price: "3.500.000 VND",
    stock: 10,
    status: "Còn hàng",
    weight: 15,
    length: 200,
    width: 160,
    height: 180,
    wood_type: "Gỗ sồi",
    color: "Nâu đậm",
    special_feature: "Tích hợp ngăn kéo",
    style: "Hiện đại",
    sculpture: "Không",
    scent: "Gỗ tự nhiên",
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
          <Box borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <ImageListSelector imgUrls={product.media_urls} />
          </Box>

          {/* Cột thông tin sản phẩm */}
          <Stack borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <Stack spacing={4}>
              <Flex justifyContent="space-between" alignContent="center">
                <Heading fontWeight="500" fontSize="20px">
                  {product.product_name || "Tên sản phẩm"}
                </Heading>
                <Flex alignContent="center" gap={2}>
                  {" "}
                  <StarRating rating={3.5} />
                  13 đánh giá
                </Flex>
              </Flex>

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
              <Flex gap={4} alignItems="center">
                {/* Mua ngay */}
                <Button
                  bg={appColorTheme.brown_2}
                  color="white"
                  borderRadius="30px"
                  px={8}
                  py={6}
                  leftIcon={<FiShoppingBag />}
                  _hover={{ bg: appColorTheme.brown_1 }}
                >
                  MUA NGAY
                </Button>

                {/* Thêm vào giỏ */}
                <Button
                  variant="outline"
                  borderColor={appColorTheme.brown_2}
                  color={appColorTheme.brown_2}
                  borderRadius="30px"
                  px={4}
                  py={6}
                  leftIcon={<FiShoppingCart />}
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
