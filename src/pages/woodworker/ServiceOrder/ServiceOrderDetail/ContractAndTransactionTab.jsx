import React from "react";
import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  SimpleGrid,
  Badge,
  Link as ChakraLink,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";

export default function ContractAndTransactionTab() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={5}>
        <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
          <Heading fontWeight="bold" as="h3" fontSize="20px" mb={6}>
            Thông tin hợp đồng
          </Heading>

          <Stack spacing={4}>
            <HStack>
              <Text fontWeight="bold">Họ tên thợ mộc:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">SĐT thợ mộc:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Địa chỉ thợ mộc:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <Box height="10px" />

            <HStack>
              <Text fontWeight="bold">Họ tên khách hàng:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">SĐT khách hàng:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Địa chỉ khách hàng:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <Box height="10px" />

            <HStack>
              <Text fontWeight="bold">Mã hợp đồng:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Ngày tạo:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Ngày ký:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Ngày cam kết giao sản phẩm:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Giá trị hợp đồng:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <HStack>
              <Text fontWeight="bold">Thời gian bảo hành:</Text>
              <Text>Chưa cập nhật</Text>
            </HStack>

            <Box>
              <Text fontWeight="bold">Chính sách bảo hành:</Text>
              <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Reiciendis harum, voluptates quas, laudantium inventore debitis
                aspernatur aperiam voluptate distinctio perspiciatis doloremque
                cupiditate cum facere iste reprehenderit totam tempora impedit
                non.
              </Text>
            </Box>

            <HStack>
              <Box>
                <Text fontWeight="bold">Chữ ký thợ mộc</Text>
                <Image
                  mt={4}
                  height="100px"
                  src="https://ketoanthuecat.com/uploads/bai-viet/2021_09/image-20210904155617-1.png"
                />
              </Box>
              <Spacer />

              <Box>
                <Text fontWeight="bold">Chữ ký khách hàng</Text>
                <Image
                  mt={4}
                  height="100px"
                  src="https://ketoanthuecat.com/uploads/bai-viet/2021_09/image-20210904155617-1.png"
                />
              </Box>
            </HStack>

            <HStack>
              <ChakraLink
                target="_blank"
                textDecoration="underline"
                color={appColorTheme.brown_2}
                href="/cus/contract"
              >
                Xem điều khoản hợp đồng
              </ChakraLink>

              <Spacer />

              <ChakraLink
                target="_blank"
                textDecoration="underline"
                color={appColorTheme.brown_2}
              >
                Xem chi tiết
              </ChakraLink>
            </HStack>
          </Stack>
        </Box>

        <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
          <Heading fontWeight="bold" as="h3" fontSize="20px" mb={6}>
            Thông tin giao dịch
          </Heading>

          <Stack spacing={4}>
            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Chi tiết giao dịch của đơn hàng</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Thành tiền:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số tiền đã thanh toán:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số tiền còn lại:</Text>
              </HStack>
            </Stack>

            <Box />

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Đặt cọc lần 1</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày thanh toán:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số tiền thanh toán:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Phần trăm cọc:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Trạng thái:</Text>
              </HStack>
            </Stack>

            <Box />

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Đặt cọc lần 2</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày thanh toán:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số tiền thanh toán:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Phần trăm cọc:</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Trạng thái:</Text>
              </HStack>

              <Box />

              <Stack spacing={4}>
                <HStack>
                  <Text fontWeight="bold">Đặt cọc lần 3</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Ngày thanh toán:</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Số tiền thanh toán:</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Phần trăm cọc:</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="bold">Trạng thái:</Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
