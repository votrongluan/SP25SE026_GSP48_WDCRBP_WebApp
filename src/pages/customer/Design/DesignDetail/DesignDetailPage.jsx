import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import ReviewSection from "./ReviewSection.jsx";
import StarRating from "../../../../components/Utility/StarRating.jsx";
import { FiShoppingBag } from "react-icons/fi";

export default function DesignDetailPage() {
  // Ví dụ dữ liệu lấy từ bảng CustomizationDesign (giả lập)
  const design = {
    customization_design_id: "123",
    name: "Giường 2 tầng Bubu",
    media_urls:
      "https://noithatthaibinh.com/wp-content/uploads/2023/10/Giuong-2-tang-tre-em-1m2-MS-3014-1.jpg;https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp",
    description: "Giường 2 tầng xinh xắn, thiết kế tùy chỉnh phù hợp phòng nhỏ",
    category: "Giường 1 tầng",
    design_code: "BUBU-2TANG",
    woodworker_profile_id: 456,
  };

  // Tách chuỗi media_urls thành mảng các URL
  const imageList = design.media_urls ? design.media_urls.split(";") : [];

  // Ảnh chính ban đầu lấy từ phần tử đầu của imageList (nếu có)
  const [mainImage, setMainImage] = useState(imageList[0] || "");

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  return (
    <Container w="90%" maxW="1400px" pb="50px">
      {/* Tiêu đề */}
      <Box height="70px">
        <Heading
          fontWeight="normal"
          as="h2"
          fontSize="26px"
          fontFamily="Montserrat"
        >
          Chi tiết thiết kế
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
                  alt={design.name}
                  borderRadius="md"
                  w="100%"
                  h="400px"
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
                  alt={`${design.name || "Thiết kế"} - ${index}`}
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

          {/* Cột thông tin thiết kế */}
          <Stack borderRadius="10px" p={5} bgColor="white" boxShadow="md">
            <Stack spacing={4}>
              <Flex justifyContent="space-between" alignContent="center">
                <Heading fontWeight="500" fontSize="20px">
                  {design.name}
                </Heading>
                <Flex alignContent="center" gap={2}>
                  <StarRating rating={4.5} />
                  13 đánh giá
                </Flex>
              </Flex>

              <Text>
                <strong>Mã thiết kế:</strong>{" "}
                {design.design_code || "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Loại sản phẩm:</strong>{" "}
                {design.category ?? "Đang cập nhật..."}
              </Text>

              <Text>
                <strong>Mô tả:</strong>{" "}
                {design.description || "Đang cập nhật..."}
              </Text>

              <Stack mt={5} gap={4}>
                <Text>
                  <strong>Thông tin xưởng mộc thiết kế và gia công</strong>{" "}
                </Text>

                <Text>
                  <strong>Tên:</strong> An Nam xưởng
                </Text>

                <Text>
                  <strong>Địa chỉ:</strong> 183 đường Lê Thánh Tông, phường số 2
                  quận 1, Hồ Chí Minh
                </Text>

                <Text>
                  <strong>Mô tả dịch vụ:</strong>{" "}
                  {design.description || "Đang cập nhật..."}
                </Text>
              </Stack>
            </Stack>

            <Spacer />

            <Box>
              {/* Nút "Đặt ngay" (đã đổi tên, bỏ nút Thêm vào giỏ) */}
              <Flex gap={4} alignItems="center">
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
              </Flex>
            </Box>
          </Stack>
        </Grid>

        {/* Khu vực đánh giá */}
        <ReviewSection />
      </Box>
    </Container>
  );
}
