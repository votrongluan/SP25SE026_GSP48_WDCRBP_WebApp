import { HStack, Link, Stack, Text, Box, Flex, Circle } from "@chakra-ui/react";
import { appColorTheme } from "../../../../../config/appconfig";
import {
  formatDateString,
  formatDateTimeString,
  translateShippingStatus,
} from "../../../../../utils/utils";

export default function GHNProgress({ shipment, trackingData }) {
  return (
    <Stack mt={5}>
      <HStack>
        <Text fontWeight="bold" minW="120px">
          Mã vận đơn:
        </Text>
        <Text>{shipment.orderCode}</Text>
      </HStack>
      <Link
        target="_blank"
        href={`https://donhang.ghn.vn/?order_code=${shipment.orderCode}`}
        color={appColorTheme.brown_2}
        mb={2}
      >
        Tra cứu
      </Link>
      <HStack>
        <Text fontWeight="bold" minW="120px">
          Ngày giao dự kiến:{" "}
        </Text>
        <Text>
          {trackingData[shipment.orderCode]?.leadtime
            ? formatDateString(trackingData[shipment.orderCode].leadtime)
            : "Không có thông tin"}
        </Text>
      </HStack>

      <HStack>
        <Text fontWeight="bold" minW="120px">
          Trạng thái vận chuyển:{" "}
        </Text>
        <Text>
          {trackingData[shipment.orderCode]?.status
            ? translateShippingStatus(trackingData[shipment.orderCode].status)
            : "Không có thông tin"}
        </Text>
      </HStack>

      {trackingData[shipment.orderCode]?.finish_date && (
        <>
          <HStack>
            <Text fontWeight="bold" minW="120px">
              Ngày giao hàng cho khách:{" "}
            </Text>
            <Text>
              {formatDateTimeString(
                trackingData[shipment.orderCode]?.finish_date
              )}
            </Text>
          </HStack>
        </>
      )}

      {/* Shipping Progress Timeline */}
      {trackingData[shipment.orderCode]?.log &&
        trackingData[shipment.orderCode].log.length > 0 && (
          <>
            <Text fontWeight="bold" mt={4} mb={2}>
              Tiến trình vận chuyển:
            </Text>
            <Flex overflowX="auto" pb={4} columnGap={4}>
              {trackingData[shipment.orderCode].log.map(
                (item, index, array) => (
                  <Flex
                    key={index}
                    direction="column"
                    align="center"
                    minW="150px"
                    position="relative"
                  >
                    <Circle size="10px" bg={appColorTheme.brown_2} mb={2} />
                    {index < array.length - 1 && (
                      <Box
                        position="absolute"
                        height="2px"
                        bg={appColorTheme.brown_2}
                        top="5px"
                        right="0"
                        left="50%"
                        zIndex="-1"
                      />
                    )}
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      {formatDateTimeString(item.updated_date)}
                    </Text>
                    <Text mt={2} fontWeight="medium" textAlign="center">
                      {translateShippingStatus(item.status)}
                    </Text>
                  </Flex>
                )
              )}
            </Flex>
          </>
        )}
    </Stack>
  );
}
