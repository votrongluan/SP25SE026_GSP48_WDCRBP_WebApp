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
      <Heading fontWeight={500} fontSize="20px" mb={5} textAlign="center">
        Thông tin chung
      </Heading>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
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
                <Text fontWeight="500">Mã đơn hàng:</Text>
                <Text>
                  <Link color="blue">12333</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Loại dịch vụ:</Text>
                <Text>Cá nhân hóa</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Trạng thái:</Text>
                <Text>Chờ duyệt thiết kế</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Giá trị đơn hàng:</Text>
                <Text>Chưa cập nhật</Text>
              </HStack>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="500">Ngày đặt:</Text>
                <Text>
                  <Link color="blue">12-03-2025 05:00 AM</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Ngày hoàn thành mong muốn:</Text>
                <Text>12-04-2025</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Số tiền có thể chi trả:</Text>
                <Text>12.000.000 đ</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Số lượng sản phẩm:</Text>
                <Text>2</Text>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>

        <Box mt={4}>
          <Text fontWeight="500">Ghi chú:</Text>
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
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              Thông tin khách hàng
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight={500}>Tên:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight={500}>Email:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight={500}>Số điện thoại:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight={500}>Địa chỉ giao hàng:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>
            </Stack>
          </Box>

          <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              Thông tin xưởng mộc
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text fontWeight={500}>Tên xưởng:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight={500}>Địa chỉ xưởng:</Text>
                <Text>
                  <Link color="blue">Lorem</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight={500}>Số điện thoại:</Text>
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
