import {
  Box,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function GeneralInformation() {
  return (
    <>
      <Heading fontWeight="bold" fontSize="20px" mb={5} textAlign="center">
        Thông tin chung
      </Heading>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
          Thông tin đơn hàng
        </Heading>

        <SimpleGrid
          mt={5}
          columns={{
            base: 1,
            xl: 2,
          }}
        >
          <Box>
            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Mã đơn hàng:</Text>
                <Text>
                  <Link color="blue">12333</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Loại dịch vụ:</Text>
                <Text>Cá nhân hóa</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Trạng thái:</Text>
                <Text>Chờ duyệt thiết kế</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Giá trị đơn hàng:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Ngày đặt:</Text>
                <Text>
                  <Link color="blue">12-03-2025 05:00 AM</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Ngày hoàn thành mong muốn:</Text>
                <Text>12-04-2025</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số tiền có thể chi trả:</Text>
                <Text>12.000.000 đ</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số lượng sản phẩm:</Text>
                <Text>2</Text>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>

        <Box mt={4}>
          <Text fontWeight="bold">Ghi chú:</Text>
          <Text mt={4}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
            harum, voluptates quas, laudantium inventore debitis aspernatur
            aperiam voluptate distinctio perspiciatis doloremque cupiditate cum
            facere iste reprehenderit totam tempora impedit non.
          </Text>
        </Box>
      </Box>

      <Box>
        <SimpleGrid
          mt={5}
          columns={{
            base: 1,
            xl: 2,
          }}
          spacing={5}
        >
          <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
              Thông tin khách hàng
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Tên:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Email:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số điện thoại:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Địa chỉ giao hàng:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>
            </Stack>
          </Box>

          <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
            <Heading fontWeight="bold" as="h3" fontSize="20px" mb={4}>
              Thông tin xưởng mộc
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold">Tên xưởng:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Địa chỉ xưởng:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">Số điện thoại:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
