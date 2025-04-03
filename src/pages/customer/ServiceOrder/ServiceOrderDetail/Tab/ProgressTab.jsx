import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Circle,
  Stack,
  Spinner,
  Center,
  SimpleGrid,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig.js";
import { useGetAllOrderProgressByOrderIdQuery } from "../../../../../services/orderProgressApi.js";
import { useGetShipmentsByServiceOrderIdQuery } from "../../../../../services/shipmentApi.js";
import {
  formatDateTimeString,
  formatPrice,
} from "../../../../../utils/utils.js";

export default function ProgressTab({ activeTabIndex, isActive }) {
  const { id } = useParams();

  const {
    data: progressResponse,
    isLoading: isLoadingProgress,
    error: progressError,
    refetch: refetchProgress,
  } = useGetAllOrderProgressByOrderIdQuery(id);

  const {
    data: shipmentResponse,
    isLoading: isLoadingShipment,
    error: shipmentError,
    refetch: refetchShipment,
  } = useGetShipmentsByServiceOrderIdQuery(id);

  // Refetch data when tab becomes active
  useEffect(() => {
    if (isActive) {
      refetchProgress();
      refetchShipment();
    }
  }, [isActive, refetchProgress, refetchShipment]);

  const progressItems = progressResponse?.data || [];
  const shipmentItems = shipmentResponse?.data || [];

  // Display loading state
  if (isLoadingProgress || isLoadingShipment) {
    return (
      <Center h="200px">
        <Spinner size="xl" color={appColorTheme.brown_2} />
      </Center>
    );
  }

  // Display error state
  if (progressError || shipmentError) {
    return (
      <Center h="200px">
        <Text>Đã có lỗi xảy ra khi tải thông tin</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {/* Left Column - Progress Timeline */}
      <Box bg="white" borderRadius="10px" p={5} boxShadow="md">
        <Heading as="h3" size="md" mb={4}>
          Tiến độ đơn hàng
        </Heading>

        {progressItems.length === 0 ? (
          <Center p={8}>
            <Text fontSize="lg" color="gray.500">
              Chưa có thông tin tiến độ
            </Text>
          </Center>
        ) : (
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
                </Box>

                <Text whiteSpace="nowrap">
                  {formatDateTimeString(new Date(progress.createdTime))}
                </Text>
              </HStack>
            ))}
          </Stack>
        )}
      </Box>

      {/* Right Column - Shipment Information */}
      <Box bg="white" borderRadius="10px" p={5} boxShadow="md">
        <Heading as="h3" size="md" mb={4}>
          Thông tin vận chuyển
        </Heading>

        {shipmentItems.length === 0 ? (
          <Center p={8}>
            <Text fontSize="lg" color="gray.500">
              Chưa có thông tin vận chuyển
            </Text>
          </Center>
        ) : (
          <Stack spacing={4}>
            {shipmentItems.map((shipment) => (
              <Box key={shipment.shipmentId}>
                <Stack spacing={3} divider={<Divider />}>
                  <HStack alignItems="flex-start">
                    <Text fontWeight="bold" minW="120px">
                      Mã vận chuyển:
                    </Text>
                    <Text>{shipment.shipmentId}</Text>
                  </HStack>

                  <HStack alignItems="flex-start">
                    <Text fontWeight="bold" minW="120px">
                      Địa chỉ giao:
                    </Text>
                    <Text>{shipment.toAddress || "Chưa cập nhật"}</Text>
                  </HStack>

                  {shipment.from_address && (
                    <HStack alignItems="flex-start">
                      <Text fontWeight="bold" minW="120px">
                        Địa chỉ lấy hàng:
                      </Text>
                      <Text>{shipment.from_address}</Text>
                    </HStack>
                  )}

                  {shipment.shippingUnit && (
                    <HStack>
                      <Text fontWeight="bold" minW="120px">
                        Đơn vị vận chuyển:
                      </Text>
                      <Text>{shipment.shippingUnit}</Text>
                    </HStack>
                  )}

                  {shipment.orderCode && (
                    <HStack>
                      <Text fontWeight="bold" minW="120px">
                        Mã vận đơn:
                      </Text>
                      <Text>{shipment.orderCode}</Text>
                    </HStack>
                  )}

                  {shipment.shipType && (
                    <HStack>
                      <Text fontWeight="bold" minW="120px">
                        Loại vận chuyển:
                      </Text>
                      <Text>{shipment.shipType}</Text>
                    </HStack>
                  )}

                  {shipment.shipFee && (
                    <HStack>
                      <Text fontWeight="bold" minW="120px">
                        Phí vận chuyển:
                      </Text>
                      <Text>{formatPrice(shipment.shipFee)} đ</Text>
                    </HStack>
                  )}
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </SimpleGrid>
  );
}
