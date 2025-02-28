import {
  Box,
  Flex,
  GridItem,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function MarketingPerformance() {
  const optionStyle = {
    backgroundColor: "#00060F",
    color: "white",
  };

  const performanceData = [
    {
      label: "Lượt truy cập",
      value: "142",
      change: "▲ 0%",
      changeColor: "green.500",
    },
    {
      label: "Liên hệ",
      value: "20",
      change: "▲ 0%",
      changeColor: "green.500",
    },
    {
      label: "Khách hàng tiềm năng",
      value: "12",
      change: "▲ 0%",
      changeColor: "green.500",
    },
    {
      label: "Khách hàng",
      value: "12",
      change: "▲ 0%",
      changeColor: "green.500",
    },
    {
      label: "Tỷ lệ thoát",
      value: "12%",
      change: "▲ 0%",
      changeColor: "green.500",
    },
    {
      label: "Thời lượng phiên trung bình",
      value: "0h 5m",
      change: "▲ 0%",
      changeColor: "green.500",
    },
    {
      label: "Phiên trung bình",
      value: "2.2",
      change: "▲ 0%",
      changeColor: "green.500",
    },
    {
      label: "Lượt xem trang",
      value: "350",
      change: "▲ 0%",
      changeColor: "green.500",
    },
  ];

  return (
    <>
      {/* Marketing Performance */}
      <GridItem
        color="app_white.0"
        bgColor="app_black.0"
        border="1px solid black"
        p="12px"
      >
        <Box w="100%">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading fontWeight="normal" fontSize="18px" color="app_white.0">
              Hiệu suất tiếp thị
            </Heading>
            <Select
              bgColor="app_black.0"
              color="app_white.0"
              cursor="pointer"
              width="fit-content"
              fontSize="12px"
              ml="8px"
              border="none"
              outline="none"
            >
              <option style={optionStyle}>Last 30 days</option>
            </Select>
          </Flex>

          <Table mt="20px" variant="simple" color="app_white.0">
            <Thead>
              <Tr>
                <Th color="gray.400">Chỉ số</Th>
                <Th color="gray.400">30 Ngày qua</Th>
                <Th color="gray.400">▲</Th>
              </Tr>
            </Thead>
            <Tbody>
              {performanceData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.label}</Td>
                  <Td>{item.value}</Td>
                  <Td color={item.changeColor}>{item.change}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </GridItem>
    </>
  );
}
