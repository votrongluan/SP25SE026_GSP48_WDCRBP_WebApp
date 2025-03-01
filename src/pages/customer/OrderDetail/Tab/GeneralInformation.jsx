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
      <Box p="20px" border="1px solid black" borderRadius="10px">
        <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
          Thông tin đơn hàng
        </Heading>

        <SimpleGrid
          mt={4}
          columns={{
            base: 1,
            xl: 2,
          }}
          spacing={10}
        >
          <Box>
            <Stack spacing="16px">
              <HStack>
                <Text fontWeight="500">Mã đơn hàng:</Text>
                <Text>
                  <Link color="blue">An Highland</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Trạng thái:</Text>
                <Text>ABc</Text>
              </HStack>

              <HStack>
                <Text>Địa chỉ xưởng:</Text>
                <Text>1775 Lê Văn Luong, ap 3 nhon duc nha be</Text>
              </HStack>
            </Stack>
          </Box>

          <Box>
            <Stack spacing="16px">
              <HStack>
                <Text fontWeight="500">Ngày đặt:</Text>
                <Text>
                  <Link color="blue">An Highland</Link>
                </Text>
              </HStack>

              <HStack>
                <Text>Tên thợ mộc:</Text>
                <Text>ABc</Text>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>

      <Box>
        <SimpleGrid
          mt={4}
          columns={{
            base: 1,
            xl: 2,
          }}
          spacing={4}
        >
          <Box border="1px solid black" p="20px" borderRadius="10px">
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              Thông tin khách hàng
            </Heading>

            <Stack spacing="16px">
              <HStack>
                <Text>Tên xưởng:</Text>
                <Text>
                  <Link color="blue">An Highland</Link>
                </Text>
              </HStack>

              <HStack>
                <Text>Tên thợ mộc:</Text>
                <Text>ABc</Text>
              </HStack>

              <HStack>
                <Text>Địa chỉ xưởng:</Text>
                <Text>1775 Lê Văn Luong, ap 3 nhon duc nha be</Text>
              </HStack>

              <HStack>
                <Text>Số điện thoại</Text>
                <Text>0987382382</Text>
              </HStack>
            </Stack>
          </Box>

          <Box border="1px solid black" p="20px" borderRadius="10px">
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              Thông tin xưởng mộc
            </Heading>

            <Stack spacing="16px">
              <HStack>
                <Text>Tên xưởng</Text>
                <Spacer />
                <Text>
                  <Link color="blue">An Highland</Link>
                </Text>
              </HStack>

              <HStack>
                <Text>Tên thợ mộc</Text>
                <Spacer />
                <Text>ABc</Text>
              </HStack>

              <HStack>
                <Text>Địa chỉ xưởng</Text>
                <Spacer />
                <Text>1775 Lê Văn Luong, ap 3 nhon duc nha be</Text>
              </HStack>

              <HStack>
                <Text>Số điện thoại</Text>
                <Spacer />
                <Text>0987382382</Text>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
