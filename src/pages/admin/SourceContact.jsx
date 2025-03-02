import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  GridItem,
  Select,
} from "@chakra-ui/react";

const optionStyle = {
  backgroundColor: "#00060F",
  color: "white",
};

export default function SourceContact() {
  const contactData = [
    { id: 1, name: "Tìm kiếm tự nhiên", newContacts: 9, sessions: 131 },
    {
      id: 2,
      name: "Lưu lượng truy cập trực tiếp",
      newContacts: 21,
      sessions: 485,
    },
    { id: 3, name: "Giới thiệu", newContacts: 4, sessions: 11 },
    { id: 4, name: "Tìm kiếm có trả phí", newContacts: 2, sessions: 12 },
    { id: 5, name: "Mạng xã hội có trả phí", newContacts: 0, sessions: 45 },
    { id: 6, name: "Email Marketing", newContacts: 0, sessions: 16 },
    { id: 7, name: "Mạng xã hội", newContacts: 0, sessions: 27 },
    { id: 8, name: "Khác", newContacts: 0, sessions: 12 },
  ];

  return (
    <>
      {/* Contacts / Visits by Source */}
      <GridItem color="white" bgColor="black" border="1px solid black" p="12px">
        <Box w="100%">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading fontWeight="normal" fontSize="18px">
              Liên hệ / Truy cập theo Nguồn
            </Heading>
            <Select
              bgColor="black"
              color="white"
              cursor="pointer"
              width="fit-content"
              fontSize="12px"
              ml="8px"
              border="none"
              outline="none"
            >
              <option style={optionStyle}>30 ngày qua</option>
            </Select>
          </Flex>

          <Table mt="20px" variant="simple">
            <Thead>
              <Tr>
                <Th color="gray.400">#</Th>
                <Th color="gray.400">Tên</Th>
                <Th color="gray.400">Liên hệ mới</Th>
                <Th color="gray.400">Phiên</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contactData.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.newContacts}</Td>
                  <Td>{item.sessions}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </GridItem>
    </>
  );
}
