import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  Badge,
  Spacer,
  Center,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";
import { useGetAllOrderDepositByOrderIdQuery } from "../../../../services/orderDepositApi.js";
import { formatPrice, formatDateTimeString } from "../../../../utils/utils.js";

export default function Transaction({ order }) {
  // Fetch deposit data
  const {
    data: depositsResponse,
    isLoading: isDepositsLoading,
    error: depositsError,
  } = useGetAllOrderDepositByOrderIdQuery(order?.orderId);

  const deposits = depositsResponse?.data || [];

  return (
    <Box>
      {/* Deposit/Transaction Information */}
      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Accordion allowToggle defaultIndex={-1}>
          <AccordionItem border="none">
            <h2>
              <AccordionButton px={0}>
                <Heading
                  fontWeight="bold"
                  as="h3"
                  fontSize="20px"
                  flex="1"
                  textAlign="left"
                >
                  Thông tin giao dịch của đơn hàng
                </Heading>
                <AccordionIcon color={appColorTheme.brown_2} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              {isDepositsLoading ? (
                <Center py={8}>
                  <Spinner size="md" color={appColorTheme.brown_2} />
                </Center>
              ) : depositsError ? (
                <Center py={8}>
                  <Text color="red.500">
                    Đã có lỗi xảy ra khi tải thông tin thanh toán
                  </Text>
                </Center>
              ) : deposits.length === 0 ? (
                <Center py={8}>
                  <Text color="gray.500">Chưa có thông tin thanh toán</Text>
                </Center>
              ) : (
                <Stack spacing={4}>
                  <Stack spacing={4}>
                    <HStack>
                      <Text fontWeight="bold">Thành tiền:</Text>
                      <Text fontWeight="bold" color={appColorTheme.brown_2}>
                        {order?.totalAmount
                          ? formatPrice(order?.totalAmount)
                          : "Chưa cập nhật"}
                      </Text>
                    </HStack>

                    <HStack>
                      <Text fontWeight="bold">Số tiền đã thanh toán:</Text>
                      <Text fontWeight="bold" color={appColorTheme.brown_2}>
                        {formatPrice(order?.amountPaid)}
                      </Text>
                    </HStack>

                    <HStack>
                      <Text fontWeight="bold">Số tiền còn lại:</Text>
                      <Text fontWeight="bold" color={appColorTheme.brown_2}>
                        {formatPrice(order?.amountRemaining)}
                      </Text>
                    </HStack>
                  </Stack>

                  <Spacer height="20px" />

                  {deposits.map((deposit) => (
                    <Stack
                      key={deposit.orderDepositId}
                      spacing={4}
                      p={3}
                      bg={deposit.status ? "green.50" : "gray.50"}
                      borderRadius="md"
                    >
                      <HStack>
                        <Text fontWeight="bold">
                          Đặt cọc lần {deposit.depositNumber}
                        </Text>
                        <Badge colorScheme={deposit.status ? "green" : "gray"}>
                          {deposit.status ? "Đã thanh toán" : "Chưa thanh toán"}
                        </Badge>
                      </HStack>

                      <HStack>
                        <Text fontWeight="bold">Ngày tạo:</Text>
                        <Text>
                          {deposit.createdAt
                            ? formatDateTimeString(new Date(deposit.createdAt))
                            : "Chưa cập nhật"}
                        </Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="bold">Ngày thanh toán:</Text>
                        <Text>
                          {deposit.updatedAt
                            ? formatDateTimeString(new Date(deposit.updatedAt))
                            : "Chưa cập nhật"}
                        </Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="bold">Số tiền thanh toán:</Text>
                        <Text fontWeight="bold" color={appColorTheme.brown_2}>
                          {deposit.amount
                            ? formatPrice(deposit.amount)
                            : "Chưa cập nhật"}
                        </Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="bold">Phần trăm cọc:</Text>
                        <Text>
                          {deposit.percent
                            ? `${deposit.percent}%`
                            : "Chưa cập nhật"}
                        </Text>
                      </HStack>
                    </Stack>
                  ))}
                </Stack>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
}
