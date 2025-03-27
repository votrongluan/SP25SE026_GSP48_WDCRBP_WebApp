import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Link as ChakraLink,
  Badge,
  Image,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";
import { convertTimeStampToDateTimeString } from "../../../../../utils/utils.js";
import PersonalizationProductList from "./PersonalizationProductList.jsx";

export default function GeneralInformationTab() {
  return (
    <Box>
      <PersonalizationProductList />

      <SimpleGrid
        mt={6}
        columns={{
          base: 1,
          xl: 2,
        }}
        spacing={6}
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
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={6}>
              Thông tin đơn hàng
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Mã đơn hàng:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Loại dịch vụ:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày đặt:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số lượng sản phẩm:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Lắp đặt sản phẩm:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>

              <Box>
                <Text fontWeight="bold">Ghi chú:</Text>
                <Text>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Reiciendis harum, voluptates quas, laudantium inventore
                  debitis aspernatur aperiam voluptate distinctio perspiciatis
                  doloremque cupiditate cum facere iste reprehenderit totam
                  tempora impedit non.
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
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

          <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px" mt={6}>
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
              Thông tin khách hàng
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Tên khách hàng:</Text>
                <Text>Lorem</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số điện thoại:</Text>
                <Text>Lorem</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Địa chỉ khách hàng:</Text>
                <Text>Lorem</Text>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </SimpleGrid>

      <Box
        mt={6}
        p={5}
        bgColor="white"
        boxShadow="md"
        borderRadius="10px"
        position="relative"
      >
        <Heading fontWeight="bold" fontSize="20px" mb={6}>
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
