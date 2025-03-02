import {
  Box,
  Heading,
  Stack,
  HStack,
  VStack,
  Image,
  Text,
  Divider,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

// Static process updates (Simulating woodworker uploads)
const processUpdates = [
  {
    id: 3,
    image:
      "https://sangonguyenkim.com/wp-content/uploads/2019/09/quy-trinh-san-xuat-go.jpg",
    note: "Sơn lớp đầu tiên, chờ sấy khô.",
    timestamp: "03/03/2025 - 04:00 PM",
  },
  {
    id: 2,
    image:
      "https://sangonguyenkim.com/wp-content/uploads/2019/09/quy-trinh-san-xuat-go.jpg",
    note: "Khung giường đã được lắp ráp.",
    timestamp: "02/03/2025 - 02:30 PM",
  },
  {
    id: 1,
    image:
      "https://sangonguyenkim.com/wp-content/uploads/2019/09/quy-trinh-san-xuat-go.jpg",
    note: "Đã cắt gỗ theo kích thước yêu cầu.",
    timestamp: "01/03/2025 - 10:00 AM",
  },
];

export default function ProcessTab() {
  return (
    <Box>
      <Heading fontWeight={500} fontSize="20px" mb={5} textAlign="center">
        Quá trình thi công sản phẩm
      </Heading>

      <VStack spacing={4} align="stretch">
        <Accordion allowMultiple>
          {processUpdates.map((update) => (
            <AccordionItem
              key={update.id}
              bgColor="white"
              boxShadow="md"
              borderRadius="10px"
              mb={4}
            >
              <AccordionButton
                _expanded={{ bg: "gray.100", borderRadius: "10px" }}
                p={4}
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight="500">{update.timestamp}</Text>
                  <Text>{update.note}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text fontSize="md" fontWeight="500" mb={3}></Text>

                <Image
                  src={update.image}
                  alt="Process Image"
                  borderRadius="5px"
                  width="100%"
                  objectFit="cover"
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
}
