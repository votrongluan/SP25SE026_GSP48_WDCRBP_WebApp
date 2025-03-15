import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  SimpleGrid,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Link,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";

// Example array of two deliveries
const deliveries = [
  {
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
    shipper: "GHN (Giao hàng nhanh)",
    ship_type: "Giao hàng cho khách",
    log: [
      { status: "picking", updated_date: "2025-03-01T10:40:46Z" },
      { status: "picked", updated_date: "2025-03-01T11:00:00Z" },
      { status: "storing", updated_date: "2025-03-01T13:30:19Z" },
      { status: "return", updated_date: "2025-03-01T15:45:59Z" },
    ],
  },
];

export default function DeliveryTab() {
  return (
    <>
      <Heading fontWeight={500} fontSize="20px" mb={5} textAlign="center">
        Thông tin giao hàng
      </Heading>

      {deliveries.map((delivery, index) => (
        <Box borderBottom="1px solid black" pb={5} key={index} mb={4}>
          {/* Thông tin giao hàng */}
          <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
            <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
              Thông tin giao hàng
            </Heading>

            <SimpleGrid mt={4} columns={{ base: 1, xl: 2 }} spacing={10}>
              <Box>
                <Stack spacing={4}>
                  <HStack>
                    <Text fontWeight="500">Mã giao hàng (GHN):</Text>
                    <Text>{delivery.order_code}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Đơn vị vận chuyển:</Text>
                    <Text>{delivery.shipper}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Loại vận chuyển:</Text>
                    <Text>Giao hàng cho khách</Text>
                  </HStack>
                </Stack>
              </Box>

              <Box>
                <Stack spacing={4}>
                  <HStack>
                    <Text fontWeight="500">Trọng lượng:</Text>
                    <Text>{delivery.weight} gram</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Kích thước:</Text>
                    <Text>
                      {delivery.length} x {delivery.width} x {delivery.height}{" "}
                      cm
                    </Text>
                  </HStack>
                </Stack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Thông tin người gửi & người nhận */}
          <SimpleGrid mt={5} columns={{ base: 1, xl: 2 }} spacing={5}>
            {/* Sender Information */}
            <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
              <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
                Thông tin người gửi
              </Heading>

              <Stack spacing={4}>
                <HStack>
                  <Text fontWeight="500">Tên:</Text>
                  <Text>{delivery.from_name}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="500">Số điện thoại:</Text>
                  <Text>{delivery.from_phone}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="500">Địa chỉ:</Text>
                  <Text>{delivery.from_address}</Text>
                </HStack>
              </Stack>
            </Box>

            {/* Receiver Information */}
            <Box bgColor="white" boxShadow="md" p={5} borderRadius="10px">
              <Heading fontWeight={500} as="h3" fontSize="20px" mb={4}>
                Thông tin người nhận
              </Heading>

              <Stack spacing={4}>
                <HStack>
                  <Text fontWeight="500">Tên:</Text>
                  <Text>{delivery.to_name}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="500">Số điện thoại:</Text>
                  <Text>{delivery.to_phone}</Text>
                </HStack>

                <HStack>
                  <Text fontWeight="500">Địa chỉ:</Text>
                  <Text>{delivery.to_address}</Text>
                </HStack>
              </Stack>
            </Box>
          </SimpleGrid>

          {/* Delivery Tracking Logs */}
          <Box mt={4} p={5} bgColor="white" boxShadow="md" borderRadius="10px">
            <Heading fontSize="18px" mb={4}>
              Lịch sử giao hàng
            </Heading>

            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Trạng thái</Th>
                  <Th>Thời gian cập nhật</Th>
                </Tr>
              </Thead>
              <Tbody>
                {delivery.log.map((logEntry, idx) => (
                  <Tr key={idx}>
                    <Td>{logEntry.status}</Td>
                    <Td>{new Date(logEntry.updated_date).toLocaleString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      ))}
    </>
  );
}
