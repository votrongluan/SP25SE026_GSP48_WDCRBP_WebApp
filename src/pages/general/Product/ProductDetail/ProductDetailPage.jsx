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
  Link as ChakraLink,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import ReviewSection from "./ReviewSection.jsx";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import ImageListSelector from "../../../../components/Utility/ImageListSelector.jsx";
import { formatPrice } from "../../../../utils/utils.js";
import PackageFrame from "../../../../components/Utility/PackageFrame.jsx";
import useAuth from "../../../../hooks/useAuth.js";

export default function ProductDetailPage() {
  const { auth } = useAuth();
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
    special_feature: "Tích hợp ngăn kéo",
    style: "Hiện đại",
    sculpture: "Không",
    scent: "Gỗ tự nhiên",
  };

  return (
    <>
      <Box mb={6}>
        <Heading
          color={appColorTheme.brown_2}
          as="h2"
          fontSize="2xl"
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

          <Stack borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <Stack spacing={4}>
              <Flex justifyContent="space-between" alignContent="center">
                <Heading fontWeight="bold" fontSize="20px">
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
              <Box my={4} p={5} bgColor={appColorTheme.grey_0}>
                <Text
                  fontSize="30px"
                  color={appColorTheme.brown_2}
                  fontWeight="bold"
                >
                  {formatPrice(12000000)}
                </Text>
              </Box>

              {auth?.role != "Woodworker" && (
                <Flex gap={5} alignItems="center">
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
              )}
            </Box>
          </Stack>
        </Grid>

        <Box mt={6}>
          <PackageFrame packageType="Gold">
            <Flex
              flexDirection={{
                base: "column",
                xl: "row",
              }}
              borderRadius="10px"
              p={5}
              bgColor="white"
              boxShadow="md"
              gap={5}
            >
              <Box>
                <Image
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  width="150px"
                  height="150px"
                  objectFit="cover"
                  objectPosition="center"
                  borderRadius="50%"
                />
              </Box>

              <Stack flex={1}>
                <Stack spacing={4}>
                  <Flex justifyContent="space-between" alignContent="center">
                    <Heading fontWeight="bold" fontSize="20px">
                      Xưởng mộc Hòa Bình Quận 5
                    </Heading>
                    <Flex alignContent="center" gap={2}>
                      {" "}
                      <StarRating rating={3.5} />
                      13 đánh giá
                    </Flex>
                  </Flex>

                  <HStack>
                    <Text fontWeight="bold">Địa chỉ xưởng:</Text>
                    <Text>Chưa cập nhật</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="bold">Loại hình kinh doanh:</Text>
                    <Text>Chưa cập nhật</Text>
                  </HStack>

                  <HStack>
                    <Spacer />
                    <Text>
                      <ChakraLink
                        target="_blank"
                        textDecoration="underline"
                        color={appColorTheme.brown_2}
                      >
                        Xem xưởng
                      </ChakraLink>
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Flex>
          </PackageFrame>
        </Box>

        <ReviewSection />
      </Box>
    </>
  );
}
