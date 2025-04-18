import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  Divider,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Highlight,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import {
  FaArrowUp,
  FaCalculator,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const ServicePackUpgradeExample = () => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      maxW="4xl"
      mx="auto"
      p={6}
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
    >
      <VStack spacing={6} align="start">
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <Icon as={FaArrowUp} color="teal.400" />
          Hướng dẫn cách quy đổi ngày nâng cấp gói dịch vụ
        </Heading>

        <Text fontSize="md">
          Khi nâng cấp gói, hệ thống sẽ tự động chuyển đổi thời gian còn lại từ
          gói cũ sang gói mới theo **tỷ lệ trọng số**.
        </Text>

        <Heading size="md">💎 Tỷ lệ quy đổi giữa các gói:</Heading>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Gói dịch vụ</Th>
              <Th>Tên tiếng Việt</Th>
              <Th isNumeric>Trọng số</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Bronze</Td>
              <Td>Đồng</Td>
              <Td isNumeric>1.0</Td>
            </Tr>
            <Tr>
              <Td>Silver</Td>
              <Td>Bạc</Td>
              <Td isNumeric>1.75</Td>
            </Tr>
            <Tr>
              <Td>Gold</Td>
              <Td>Vàng</Td>
              <Td isNumeric>2.5</Td>
            </Tr>
          </Tbody>
        </Table>

        <Heading size="md">📘 Ví dụ minh hoạ:</Heading>
        <Text fontSize="sm">
          ➤ Bạn còn <strong>10 ngày</strong> ở gói <strong>Đồng</strong> (trọng
          số 1.0). Nếu bạn nâng lên gói <strong>Bạc</strong> (trọng số 1.75),
          thì thời gian còn lại sẽ được chuyển thành:
        </Text>
        <Text fontSize="sm" fontStyle="italic">
          → 10 * 1.0 / 1.75 = <strong>5.7 ngày</strong>
        </Text>

        <Text fontSize="sm">
          ➤ Sau đó, hệ thống cộng thêm thời gian sử dụng mới tương ứng với gói
          bạn vừa mua (theo số tháng của gói).
        </Text>

        <Heading size="md">⚠️ Lưu ý:</Heading>
        <Text fontSize="sm" color="red.400">
          ✘ Bạn không thể hạ cấp xuống gói thấp hơn nếu gói hiện tại vẫn còn
          hiệu lực.
        </Text>

        <Divider />

        <Text fontSize="sm" color="gray.500">
          ⏳ Nếu gói cũ đã hết hạn hoặc bạn chưa từng mua gói nào, hệ thống sẽ
          bắt đầu thời hạn mới từ ngày hiện tại.
        </Text>
      </VStack>

      <VStack mt={10} spacing={5} align="start">
        <Heading size="md" display="flex" alignItems="center" gap={2}>
          <Icon as={FaCalculator} color="teal.400" />
          Ví dụ cụ thể: Nâng cấp từ gói Đồng → Bạc
        </Heading>

        <Text fontSize="sm">
          Bạn đang sử dụng gói <strong>Đồng</strong> từ{" "}
          <strong>01/01/2025</strong> đến <strong>01/02/2025</strong>.
        </Text>

        <Text fontSize="sm">
          Vào ngày <strong>15/01/2025</strong>, bạn nâng cấp lên gói{" "}
          <strong>Bạc</strong> trong vòng <strong>1 tháng</strong>.
        </Text>

        <Divider />

        <Heading size="sm">🧮 Quy đổi thời gian còn lại:</Heading>
        <List spacing={2} fontSize="sm">
          <ListItem>
            <ListIcon as={FaClock} color="blue.400" />
            Thời gian còn lại của gói <strong>Đồng</strong>:{" "}
            <strong>17 ngày</strong>
          </ListItem>
          <ListItem>
            <ListIcon as={FaClock} color="blue.400" />
            Trọng số quy đổi: Đồng = 1.0, Bạc = 1.75
          </ListItem>
          <ListItem>
            <ListIcon as={FaClock} color="blue.400" />
            Số ngày sau quy đổi: <strong>(17 × 1.0) / 1.75 = ~10 ngày</strong>
          </ListItem>
        </List>

        <Divider />

        <Heading size="sm">📅 Kết quả:</Heading>
        <List spacing={2} fontSize="sm">
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.400" />
            Gói mới: <strong>Bạc</strong>
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.400" />
            Ngày bắt đầu mới: <strong>15/01/2025</strong>
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.400" />
            Tổng thời hạn: <strong>1 tháng + 10 ngày = 40 ngày</strong>
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.400" />
            Ngày hết hạn mới: <strong>24/02/2025</strong>
          </ListItem>
        </List>

        <Divider />

        <Text fontSize="sm" color="gray.500">
          ⚠️ Bạn không thể hạ cấp xuống gói thấp hơn khi gói hiện tại vẫn còn
          hiệu lực.
        </Text>
      </VStack>
    </Box>
  );
};

export default ServicePackUpgradeExample;
