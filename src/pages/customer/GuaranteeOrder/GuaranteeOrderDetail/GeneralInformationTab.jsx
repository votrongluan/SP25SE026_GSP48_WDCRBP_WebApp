import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Link as ChakraLink,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Badge,
  Image,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import {
  convertTimeStampToDateTimeString,
  formatPrice,
} from "../../../../utils/utils.js";
import ImageListSelector from "../../../../components/Utility/ImageListSelector.jsx";
import { CheckBox } from "@mui/icons-material";

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

const description = {
  repairProduct: "Giường 2 tầng (#23)",
  imgUrls:
    "https://vuaghego.com/wp-content/uploads/2024/06/giuong-sap-co-lap-lai-duoc-khong-nguyen-nhan-giuong-bi-sap.jpg;https://danviet.mediacdn.vn/upload/4-2019/images/2019-10-26/6-giac-mo-la-diem-go-bao-truoc-van-den-can-than-hoa-sat-than-784-1572106777-width800height684.jpg",
  errorDescription:
    "Giường đã bị hư hai chân do lâu ngày sử dụng và bị chuột cắn, bên mình xem có thê sửa lại giúp em được không ạ",
};

export default function GeneralInformationTab() {
  return (
    <Box>
      <SimpleGrid
        mb={5}
        columns={{
          base: 1,
          xl: 2,
        }}
        spacing={5}
      >
        <Box
          position="relative"
          p={5}
          bgColor="white"
          boxShadow="md"
          borderRadius="10px"
        >
          <Badge
            position="absolute"
            top={5}
            right={5}
            bgColor={appColorTheme.brown_2}
            p={2}
            color="white"
            borderRadius="15px"
          >
            Đang xử lý
          </Badge>

          <Box>
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={5}>
              Thông tin đơn hàng
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Mã đơn hàng:</Text>
                <Text>12</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Loại dịch vụ:</Text>
                <Text>Sữa chữa</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày đặt:</Text>
                <Text>12/01/2024 12:00</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Lắp đặt sản phẩm:</Text>
                <Text>✅</Text>
              </HStack>

              <Box>
                <Text fontWeight="bold">Mô tả:</Text>

                <SimpleGrid
                  mt={4}
                  columns={{
                    base: 1,
                    xl: 2,
                  }}
                  columnGap={4}
                >
                  <Box>
                    <ImageListSelector
                      imgUrls={description.imgUrls}
                      imgH="100"
                    />
                  </Box>

                  <Box>
                    <Text>Sản phẩm lỗi: {description.repairProduct}</Text>
                    <Text mt={4}>
                      Mô tả lỗi: {description.errorDescription}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>

              <Flex
                alignItems="center"
                my={4}
                p={4}
                bgColor={appColorTheme.grey_0}
              >
                <Text mr={4} fontSize="20px">
                  Thành tiền:
                </Text>
                <Text
                  fontSize="30px"
                  color={appColorTheme.brown_2}
                  fontWeight="bold"
                >
                  {formatPrice(120000)}
                </Text>
              </Flex>
            </Stack>
          </Box>
        </Box>

        <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
          <Box>
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
              Thông tin xưởng mộc
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Tên xưởng:</Text>
                <Text>Lorem</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Địa chỉ xưởng:</Text>
                <Text>Lorem</Text>
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
          </Box>

          <Box mt={5}>
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
              Thông tin lịch hẹn tư vấn
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Hình thức:</Text>
                <Text>Lorem</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Địa điểm:</Text>
                <Text>Lorem</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày giờ hẹn:</Text>
                <Text>Lorem</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Mô tả:</Text>
                <Text>Lorem</Text>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </SimpleGrid>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Heading fontWeight="bold" fontSize="20px" mb={5}>
          Thông tin sản phẩm đã đặt trước đó
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

        <HStack>
          <Spacer />
          <Text>
            <ChakraLink
              target="_blank"
              textDecoration="underline"
              color={appColorTheme.brown_2}
            >
              Xem chi tiết đơn hàng đã đặt trước đó
            </ChakraLink>
          </Text>
        </HStack>
      </Box>

      <Box
        mt={5}
        p={5}
        bgColor="white"
        boxShadow="md"
        borderRadius="10px"
        position="relative"
      >
        <Heading fontWeight="bold" fontSize="20px" mb={5}>
          Đánh giá đơn hàng
        </Heading>
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="bold">Số sao:</Text>
            <Text>5</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Bình luận:</Text>
            <Text>Sản phẩm cũng ok</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Ngày đăng:</Text>
            <Text>{convertTimeStampToDateTimeString(new Date())}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Trạng thái:</Text>
            <Text>Đã phê duyệt</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Ảnh đính kèm:</Text>
            <Image
              src="https://www.noithatkaya.com/wp-content/uploads/2020/10/Cong-trinh-BIUBIU-STAR-14.webp"
              alt="Ảnh đánh giá"
              maxW="200px"
              borderRadius="md"
            />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
