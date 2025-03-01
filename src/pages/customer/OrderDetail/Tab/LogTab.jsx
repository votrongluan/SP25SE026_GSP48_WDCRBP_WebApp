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
} from "../../../../utils/utils.js";

// Static process updates (Simulating woodworker uploads)
const processUpdates = [
  {
    id: 3,
    note: "Sơn lớp đầu tiên, chờ sấy khô.",
    timestamp: "03/03/2025 - 04:00 PM",
  },
  {
    id: 2,
    note: "Khung giường đã được lắp ráp.",
    timestamp: "02/03/2025 - 02:30 PM",
  },
  {
    id: 1,
    note: "Đã cắt gỗ theo kích thước yêu cầu.",
    timestamp: "01/03/2025 - 10:00 AM",
  },
];

export default function LogTab() {
  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Accordion allowMultiple>
          {processUpdates.map((update) => (
            <AccordionItem
              key={update.id}
              border="1px solid black"
              borderRadius="10px"
              mb={2}
            >
              <AccordionButton
                _expanded={{ bg: "gray.100", borderRadius: "10px" }}
                p={4}
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight="500">
                    {update.timestamp} - Đã chuyển sang trạng thái {'"'}Chờ lấy
                    hàng
                    {'"'}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Stack spacing={4}>
                  <HStack>
                    <Text fontWeight="500">Ngày cập nhật:</Text>
                    <Text>{convertTimeStampToDateTimeString(new Date())}</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Trạng thái đơn hàng trước đó:</Text>
                    <Text>Đã đăng thiết kế sản phẩm</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Trạng thái đơn hàng cập nhật:</Text>
                    <Text>Đã duyệt thiết kế sản phẩm</Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Ghi chú:</Text>
                    <Text>
                      Có thể chuyển sang ngày 21/12/2025 lúc 18h không ạ
                    </Text>
                  </HStack>

                  <HStack>
                    <Text fontWeight="500">Người cập nhật:</Text>
                    <Text>Xưởng mộc ABC</Text>
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
