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
import DesignVariantConfig from "./DesignVariantConfig.jsx";

export default function DesignDetailPage() {
  const product = {
    product_id: "111",
    product_name: "Giường 2 tầng Bubu",
    media_urls:
      "https://noithatthaibinh.com/wp-content/uploads/2023/10/Giuong-2-tang-tre-em-1m2-MS-3014-1.jpg;https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp",
  };

  return (
    <>
      <Box mb={5}>
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="22px"
          fontFamily="Montserrat"
        >
          Chi tiết thiết kế
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

              <HStack>
                <Text fontWeight="bold">Loại sản phẩm:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Mô tả:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>
            </Stack>

            <Spacer />

            <Box>
              <Box>
                <DesignVariantConfig />
              </Box>
              <Flex mt={4} gap={4} alignItems="center">
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
                  ĐẶT NGAY
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

        <Flex
          mt={5}
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

        <ReviewSection />
      </Box>
    </>
  );
}
