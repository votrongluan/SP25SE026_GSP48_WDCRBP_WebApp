import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Spacer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Static delivery data (Example)
const deliveryData = {
  order_code: "5ENLKKHD",
  from_name: "Nguyen",
  from_phone: "0332190458",
  from_address: "17 Đồng Đen, Hồ Chí Minh",
  to_name: "TinTest124",
  to_phone: "0987654321",
  to_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh",
  weight: 200, // in grams
  length: 15,
  width: 15,
  height: 15,
  status: "Đang giao hàng",
  log: [
    { status: "picking", updated_date: "2025-03-01T10:40:46Z" },
    { status: "picked", updated_date: "2025-03-01T11:00:00Z" },
    { status: "storing", updated_date: "2025-03-01T13:30:19Z" },
    { status: "return", updated_date: "2025-03-01T15:45:59Z" },
  ],
};

export default function DeliveryTab() {
  return (
    <>
      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
          📦 Thông tin giao hàng
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
            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="500">Mã đơn hàng:</Text>
                <Text>
                  <Link color="blue">{deliveryData.order_code}</Link>
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Trạng thái:</Text>
                <Text>{deliveryData.status}</Text>
              </HStack>
            </Stack>
          </Box>

          <Box>
            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="500">Trọng lượng:</Text>
                <Text>{deliveryData.weight} gram</Text>
              </HStack>

              <HStack>
                <Text fontWeight="500">Kích thước:</Text>
                <Text>
                  {deliveryData.length} x {deliveryData.width} x{" "}
                  {deliveryData.height} cm
                </Text>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>
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
          {/* Sender Information */}
          <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              📤 Thông tin người gửi
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text>Tên:</Text>
                <Text>
                  <Link color="blue">{deliveryData.from_name}</Link>
                </Text>
              </HStack>

              <HStack>
                <Text>Số điện thoại:</Text>
                <Text>{deliveryData.from_phone}</Text>
              </HStack>

              <HStack>
                <Text>Địa chỉ:</Text>
                <Text>{deliveryData.from_address}</Text>
              </HStack>
            </Stack>
          </Box>

          {/* Receiver Information */}
          <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              📥 Thông tin người nhận
            </Heading>

            <Stack spacing={4}>
              <HStack>
                <Text>Tên:</Text>
                <Spacer />
                <Text>
                  <Link color="blue">{deliveryData.to_name}</Link>
                </Text>
              </HStack>

              <HStack>
                <Text>Số điện thoại:</Text>
                <Spacer />
                <Text>{deliveryData.to_phone}</Text>
              </HStack>

              <HStack>
                <Text>Địa chỉ:</Text>
                <Spacer />
                <Text>{deliveryData.to_address}</Text>
              </HStack>
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Delivery Tracking Logs */}
      <Box mt={4} p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Heading fontSize="18px" mb={4}>
          📍 Lịch sử giao hàng
        </Heading>

        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Trạng thái</Th>
              <Th>Thời gian cập nhật</Th>
            </Tr>
          </Thead>
          <Tbody>
            {deliveryData.log.map((logEntry, index) => (
              <Tr key={index}>
                <Td>
                  <Badge>{logEntry.status}</Badge>
                </Td>
                <Td>{new Date(logEntry.updated_date).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
