import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Circle,
  Stack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../../config/appconfig.js";
import { useGetAllOrderProgressByOrderIdQuery } from "../../../../../../services/orderProgressApi.js";
import { formatDateTimeString } from "../../../../../../utils/utils.js";

export default function ProgressTab() {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    error,
  } = useGetAllOrderProgressByOrderIdQuery(id);

  const progressItems = response?.data || [];

  // Display loading state
  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Display error state
  if (error) {
    return (
      <Center h="200px">
        <Text>Đã có lỗi xảy ra khi tải tiến độ đơn hàng</Text>
      </Center>
    );
  }

  // Display empty state
  if (progressItems.length === 0) {
    return (
      <Box bg="white" borderRadius="10px" p={5} boxShadow="md">
        <Center p={8}>
          <Text fontSize="lg" color="gray.500">
            Chưa có thông tin tiến độ
          </Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box bg="white" borderRadius="10px" p={5} boxShadow="md">
      <Stack spacing={6} position="relative">
        {progressItems.map((progress, index) => (
          <HStack align="start" key={progress.progressId} spacing={4}>
            <Box position="relative">
              <Circle
                size="32px"
                bg={appColorTheme.brown_2}
                color="white"
                fontWeight="bold"
              >
                {index + 1}
              </Circle>
              {index < progressItems.length - 1 && (
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
              <Text fontWeight="bold">{progress.status}</Text>
              {/* Description is omitted as per requirements */}
            </Box>

            <Text whiteSpace="nowrap">
              {formatDateTimeString(new Date(progress.createdTime))}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
}
