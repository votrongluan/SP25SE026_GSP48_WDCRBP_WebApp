import React from "react";
import { Box, Text, HStack, Circle, Spacer, Stack } from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";

const processUpdates = [
  {
    id: 1,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Đang chờ",
  },
  {
    id: 2,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được chấp nhận xử lý",
    status: "Đã nhận",
  },
  {
    id: 3,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Thợ đã lên lịch hẹn tư vấn và chờ phản hồi từ bạn",
    status: "Chờ duyệt lịch hẹn",
  },
  {
    id: 4,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Đã duyệt lịch hẹn",
  },
  {
    id: 5,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Chờ duyệt hợp đồng",
  },
  {
    id: 6,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Đã duyệt hợp đồng",
  },
  {
    id: 7,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Chờ duyệt thiết kế",
  },
  {
    id: 8,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Đã duyệt thiết kế",
  },
  {
    id: 9,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Đã thi công xong",
  },
  {
    id: 10,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Đang giao hàng / lắp đặt",
  },
  {
    id: 11,
    timestamp: "03/03/2025 - 04:00 PM",
    description: "Yêu cầu của bạn đã được gửi đến xưởng mộc",
    status: "Hoàn tất",
  },
];

export default function ProcessTab() {
  return (
    <Box bg="white" borderRadius="10px" p={5} boxShadow="md">
      <Stack spacing={6} position="relative">
        {processUpdates.map((update, index) => (
          <HStack key={index} spacing={4}>
            <Box position="relative">
              <Circle
                size="32px"
                bg={appColorTheme.brown_2}
                color="white"
                fontWeight="bold"
              >
                {index + 1}
              </Circle>
              {index < processUpdates.length - 1 && (
                <Box
                  position="absolute"
                  top="32px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="2px"
                  height="70px"
                  bg="gray.300"
                />
              )}
            </Box>

            <Box flex="1">
              <Text fontWeight="500">{update.status}</Text>
              <Text>{update.description}</Text>
            </Box>

            <Text whiteSpace="nowrap">{update.timestamp}</Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
}
