import React from "react";
import { Box, Heading, Text, VStack, HStack, Circle } from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";

const processUpdates = [
  {
    id: 1,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Đã nhận",
  },
  {
    id: 2,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Chờ duyệt lịch hẹn",
  },
  {
    id: 3,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Đã duyệt lịch hẹn",
  },
  {
    id: 4,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Chờ duyệt hợp đồng",
  },
  {
    id: 5,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Đã duyệt hợp đồng",
  },
  {
    id: 6,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Chờ duyệt thiết kế",
  },
  {
    id: 7,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Đã duyệt thiết kế",
  },
  {
    id: 8,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Đã thi công xong",
  },
  {
    id: 9,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Đang giao hàng / lắp đặt",
  },
  {
    id: 10,
    timestamp: "03/03/2025 - 04:00 PM",
    status: "Hoàn tất",
  },
];

export default function ProcessTab() {
  return (
    <Box bg="white" borderRadius="10px" p={5} boxShadow="md">
      <Heading textAlign="center" fontWeight={500} fontSize="20px" mb={5}>
        Quá trình
      </Heading>

      <VStack align="start" spacing={4} position="relative" ml={5}>
        {processUpdates.map((update, index) => (
          <HStack key={index} align="start">
            {/* Icon bước với số thứ tự */}
            <Box position="relative">
              <Circle
                size="32px"
                bg={appColorTheme.brown_2}
                color="white"
                fontWeight="bold"
              >
                {index + 1}
              </Circle>
              {/* Vẽ đường nối từ bước này xuống bước tiếp theo */}
              {index < processUpdates.length - 1 && (
                <Box
                  position="absolute"
                  top="32px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="2px"
                  height="40px"
                  bg="gray.300"
                />
              )}
            </Box>

            {/* Nội dung bước */}
            <Box>
              <Text fontWeight="500">{update.status}</Text>
              <Text>{update.timestamp}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
