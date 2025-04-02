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
  Divider,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";
import { formatDateTimeString } from "../../../../../utils/utils.js";
import CustomizationProductList from "./CustomizationProductList.jsx";
import StarRating from "../../../../../components/Utility/StarRating.jsx";

export default function GeneralInformationTab() {
  return (
    <Box>
      <CustomizationProductList />

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
      </SimpleGrid>

      <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px" mt={6}>
        <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
          Thông tin khách hàng & Đánh giá
        </Heading>

        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
          {/* Thông tin khách hàng */}
          <Box>
            <Stack spacing={3}>
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

          <Box>
            <Stack spacing={3}>
              <HStack>
                <Text fontWeight="bold">Số sao:</Text>
                <StarRating rating={4} />
              </HStack>

              <HStack>
                <Text fontWeight="bold">Bình luận:</Text>
                <Text>Sản phẩm cũng ok</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày đăng:</Text>
                <Text>{formatDateTimeString(new Date())}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Trạng thái:</Text>
                <Badge colorScheme="green">Đã phê duyệt</Badge>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
