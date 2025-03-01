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
  Spacer,
} from "@chakra-ui/react";
import {
  convertTimeStampToDateTimeString,
  formatPrice,
} from "../../../utils/utils";

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

export default function LogTab() {
  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Accordion allowToggle>
          {processUpdates.map((update) => (
            <AccordionItem
              key={update.id}
              border="1px solid black"
              borderRadius="10px"
              mb={2}
            >
              <h2>
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
              </h2>

              <AccordionPanel pb={4}>
                <Stack spacing={4}>
                  <HStack>
                    <Text fontWeight="500">Mã truy vấn:</Text>
                    <Text>202509382</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Ngày thanh toán:</Text>
                    <Text>{convertTimeStampToDateTimeString(new Date())}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Ngày hết hạn:</Text>
                    <Text>{convertTimeStampToDateTimeString(new Date())}</Text>
                  </HStack>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
}
