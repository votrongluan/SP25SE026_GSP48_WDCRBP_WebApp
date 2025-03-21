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
  getDateNow,
} from "../../../../../utils/utils.js";
import { appColorTheme } from "../../../../../config/appconfig.js";

// Static process updates (Simulating woodworker uploads)
const processUpdates = [
  {
    id: 3,
    image:
      "https://sangonguyenkim.com/wp-content/uploads/2019/09/quy-trinh-san-xuat-go.jpg",
    description: "Đặt cọc lần 3",
    timestamp: "03/03/2025 - 04:00 PM",
  },
  {
    id: 2,
    image:
      "https://sangonguyenkim.com/wp-content/uploads/2019/09/quy-trinh-san-xuat-go.jpg",
    description: "Đặt cọc lần 2",
    timestamp: "02/03/2025 - 02:30 PM",
  },
  {
    id: 1,
    image:
      "https://sangonguyenkim.com/wp-content/uploads/2019/09/quy-trinh-san-xuat-go.jpg",
    description: "Đặt cọc lần 1",
    timestamp: "01/03/2025 - 10:00 AM",
  },
];

export default function TransactionTab() {
  return (
    <>
      <Heading fontWeight="bold" fontSize="20px" mb={5} textAlign="center">
        Thông tin giao dịch
      </Heading>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="bold">Mã giao dịch:</Text>

            <Text>202509382</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Ngày tạo:</Text>

            <Text>{convertTimeStampToDateTimeString(new Date())}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Loại hình giao dịch:</Text>

            <Text>Thanh toán bằng số dư ví</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Thành tiền:</Text>

            <Text>{formatPrice(15000000)}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Số tiền đã thanh toán:</Text>

            <Text>{formatPrice(1000000)}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Số tiền còn lại:</Text>

            <Text>{formatPrice(5000000)}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Trạng thái:</Text>

            <Text>Chưa hoàn tất</Text>
          </HStack>

          <HStack>
            <Text fontWeight="bold">Chi tiết các khoản giao dịch:</Text>
          </HStack>
        </Stack>

        <Box mt={4}>
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
                      <Text fontWeight="bold">{update.description}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <Stack spacing={4}>
                      <HStack>
                        <Text fontWeight="bold">Mã truy vấn:</Text>:
                        <Text>202509382</Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="bold">Ngày thanh toán:</Text>:
                        <Text>
                          {convertTimeStampToDateTimeString(new Date())}
                        </Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="bold">Số tiền phải thanh toán:</Text>:
                        <Text>{formatPrice(1000000)}</Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="bold">Trạng thái:</Text>:
                        <Text>Chưa hoàn tất</Text>
                      </HStack>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Box>
      </Box>
    </>
  );
}
