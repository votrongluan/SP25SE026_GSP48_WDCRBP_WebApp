import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { formatDateTimeString, formatPrice } from "../../../../utils/utils";

export default function RefundTransactionCard({ complaintItem }) {
  return (
    <>
      {(complaintItem.refundAmount > 0 ||
        complaintItem.refundCreditTransaction ||
        complaintItem.refundDebitTransaction) && (
        <Box p={4} bg="green.50" borderRadius="md">
          <Heading size="sm" mb={3}>
            Thông tin hoàn tiền
          </Heading>

          {/* Refund Percent */}
          <HStack mb={2}>
            <Text fontWeight="bold">
              Phần trăm hoàn trả (trên tổng giá trị đơn hàng):
            </Text>
            <Text fontWeight="semibold" color="green.500">
              {complaintItem.refundPercent}%
            </Text>
          </HStack>

          {/* Refund Amount */}
          <HStack mb={2}>
            <Text fontWeight="bold">Số tiền hoàn trả:</Text>
            <Text fontWeight="semibold" color="green.500">
              {formatPrice(complaintItem.refundAmount)}
            </Text>
          </HStack>

          {/* Refund Credit Transaction */}
          {complaintItem.refundCreditTransaction && (
            <Box
              p={3}
              bg="white"
              borderRadius="md"
              mb={2}
              border="1px solid"
              borderColor="green.200"
            >
              <Flex align="center" mb={2}>
                <Icon as={FiArrowDown} color="green.500" mr={2} />
                <Text fontWeight="bold" color="green.600">
                  Giao dịch nhận tiền hoàn lại cho khách hàng
                </Text>
              </Flex>
              <Grid templateColumns="140px 1fr" gap={1}>
                <GridItem>
                  <Text fontWeight="semibold">Mã giao dịch:</Text>
                </GridItem>
                <GridItem>
                  <Text>
                    #{complaintItem.refundCreditTransaction.transactionId}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Loại giao dịch:</Text>
                </GridItem>
                <GridItem>
                  <Text>
                    {complaintItem.refundCreditTransaction.transactionType}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Số tiền:</Text>
                </GridItem>
                <GridItem>
                  <Text color="green.500" fontWeight="bold">
                    {formatPrice(complaintItem.refundCreditTransaction.amount)}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Ngày giao dịch:</Text>
                </GridItem>
                <GridItem>
                  <Text>
                    {formatDateTimeString(
                      new Date(complaintItem.refundCreditTransaction.createdAt)
                    )}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Mô tả:</Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm">
                    {complaintItem.refundCreditTransaction.description}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          )}

          {/* Refund Debit Transaction */}
          {complaintItem.refundDebitTransaction && (
            <Box
              p={3}
              bg="white"
              borderRadius="md"
              border="1px solid"
              borderColor="red.200"
            >
              <Flex align="center" mb={2}>
                <Icon as={FiArrowUp} color="red.500" mr={2} />
                <Text fontWeight="bold" color="red.600">
                  Giao dịch hoàn tiền cho khách hàng từ xưởng mộc
                </Text>
              </Flex>
              <Grid templateColumns="140px 1fr" gap={1}>
                <GridItem>
                  <Text fontWeight="semibold">Mã giao dịch:</Text>
                </GridItem>
                <GridItem>
                  <Text>
                    #{complaintItem.refundDebitTransaction.transactionId}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Loại giao dịch:</Text>
                </GridItem>
                <GridItem>
                  <Text>
                    {complaintItem.refundDebitTransaction.transactionType}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Số tiền:</Text>
                </GridItem>
                <GridItem>
                  <Text color="red.500" fontWeight="bold">
                    {formatPrice(complaintItem.refundDebitTransaction.amount)}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Ngày giao dịch:</Text>
                </GridItem>
                <GridItem>
                  <Text>
                    {formatDateTimeString(
                      new Date(complaintItem.refundDebitTransaction.createdAt)
                    )}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="semibold">Mô tả:</Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="sm">
                    {complaintItem.refundDebitTransaction.description}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
