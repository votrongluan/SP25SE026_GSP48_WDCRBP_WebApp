import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  Textarea,
  VStack,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FiCheck, FiX } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { appColorTheme } from "../../../../config/appconfig";
import { formatPrice } from "../../../../utils/utils";

export default function StaffResponseSection({
  complaint,
  orderDetail,
  response,
  setResponse,
  refundAmount,
  setRefundAmount,
  maxRefundableAmount,
  totalRefundedAmount,
  isLoading,
  isLoadingComplaints,
  handleSubmit,
  isAccept,
  setIsAccept,
  isCancel,
  setIsCancel,
  refundPercent,
  setRefundPercent,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const totalOrderAmount = orderDetail?.totalAmount || 0;
  const [maxAllowedPercent, setMaxAllowedPercent] = useState(100);

  // Calculate max allowed percentage based on maxRefundableAmount
  useEffect(() => {
    if (totalOrderAmount > 0 && maxRefundableAmount >= 0) {
      // Calculate what percentage of the total order amount the maxRefundableAmount represents
      const calculatedMaxPercent = Math.floor(
        (maxRefundableAmount / totalOrderAmount) * 100
      );

      // Ensure percentage is between 10 and 100
      const newMaxAllowedPercent = Math.max(
        10,
        Math.min(100, calculatedMaxPercent)
      );
      setMaxAllowedPercent(newMaxAllowedPercent);

      // If current selected percentage exceeds the maximum, adjust it
      if (refundPercent > newMaxAllowedPercent) {
        setRefundPercent(newMaxAllowedPercent);
      }
    }
  }, [maxRefundableAmount, totalOrderAmount, refundPercent, setRefundPercent]);

  // Calculate refundAmount based on percentage when percentage changes
  useEffect(() => {
    if (isAccept && totalOrderAmount) {
      const calculatedAmount = (totalOrderAmount * refundPercent) / 100;
      // Ensure we don't exceed maxRefundableAmount
      const finalAmount = Math.min(calculatedAmount, maxRefundableAmount);
      setRefundAmount(finalAmount);
    } else if (!isAccept) {
      setRefundAmount(0);
    }
  }, [
    refundPercent,
    isAccept,
    totalOrderAmount,
    maxRefundableAmount,
    setRefundAmount,
  ]);

  // Handle percentage change with validation
  const handlePercentChange = useCallback(
    (val) => {
      const newValue = Math.min(val, maxAllowedPercent);
      setRefundPercent(newValue);
    },
    [maxAllowedPercent, setRefundPercent]
  );

  if (complaint?.staffResponse) return null;

  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={4}>
      <Heading size="md" mb={4}>
        Phản hồi của nhân viên
      </Heading>

      {/* Cancel order */}
      {orderDetail?.status != "Đã hủy" && (
        <>
          <Box
            mb={4}
            p={4}
            borderRadius="md"
            bg={!isCancel ? "green.50" : "red.50"}
            borderWidth="1px"
            borderColor={!isCancel ? "green.200" : "red.200"}
          >
            <Flex justify="space-between" align="center">
              <HStack>
                <Icon
                  as={!isCancel ? FiCheck : FiX}
                  color={!isCancel ? "green.500" : "red.500"}
                  boxSize={5}
                />
                <Text fontWeight="bold">
                  {isCancel
                    ? "Hủy đơn hàng (dừng việc tiếp tục xử lý đơn hàng)"
                    : "Không hủy đơn hàng (tiếp tục để xưởng mộc hoàn thành đơn hàng)"}
                </Text>
              </HStack>
              <Switch
                colorScheme="green"
                size="lg"
                isChecked={isCancel}
                onChange={(e) => setIsCancel(e.target.checked)}
                isDisabled={isLoading}
              />
            </Flex>
          </Box>
        </>
      )}

      {maxRefundableAmount > 0 && (
        <>
          {/* Accept/Reject Complaint Switch */}
          <Box
            mb={4}
            p={4}
            borderRadius="md"
            bg={isAccept ? "green.50" : "red.50"}
            borderWidth="1px"
            borderColor={isAccept ? "green.200" : "red.200"}
          >
            <Flex justify="space-between" align="center">
              <HStack>
                <Icon
                  as={isAccept ? FiCheck : FiX}
                  color={isAccept ? "green.500" : "red.500"}
                  boxSize={5}
                />
                <Text fontWeight="bold">
                  {isAccept ? "Chấp nhận hoàn tiền" : "Từ chối hoàn tiền"}
                </Text>
              </HStack>
              <Switch
                colorScheme="green"
                size="lg"
                isChecked={isAccept}
                onChange={(e) => setIsAccept(e.target.checked)}
                isDisabled={isLoading}
              />
            </Flex>
          </Box>

          {/* Display refund information */}
          <Box mb={4} p={3} bg="gray.50" borderRadius="md">
            <Heading size="sm" mb={3}>
              Thông tin hoàn tiền cho đơn hàng #{orderDetail?.orderId}
            </Heading>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem>
                <Text fontWeight="bold">Tổng tiền đã thanh toán:</Text>
                <Text fontSize="xl" color={appColorTheme.brown_2}>
                  {formatPrice(totalOrderAmount)}
                </Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold">Đã hoàn trả (các khiếu nại khác):</Text>
                <Text fontSize="xl" color="orange.500">
                  {isLoadingComplaints
                    ? "Đang tải..."
                    : formatPrice(totalRefundedAmount)}
                </Text>
              </GridItem>

              <GridItem colSpan={2}>
                <Divider my={2} />
                <Text fontWeight="bold">Số tiền có thể hoàn trả tối đa:</Text>
                <Text fontSize="xl" fontWeight="bold" color="green.500">
                  {isLoadingComplaints
                    ? "Đang tính toán..."
                    : formatPrice(maxRefundableAmount)}
                </Text>
              </GridItem>
            </Grid>
          </Box>
        </>
      )}

      <VStack spacing={4} align="stretch">
        <Textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Nhập nội dung phản hồi đối với khiếu nại này..."
          rows={6}
          isDisabled={complaint?.staffResponse || isLoading}
        />

        {/* Refund percentage slider - only shown if complaint is accepted */}
        {isAccept && (
          <FormControl>
            <FormLabel>
              Phần trăm hoàn trả (5% - {maxAllowedPercent}%)
              {maxAllowedPercent < 100 && (
                <Text as="span" color="red.500" fontSize="sm" ml={2}>
                  (Giới hạn bởi số tiền có thể hoàn trả tối đa)
                </Text>
              )}
            </FormLabel>
            <Flex>
              <Text flex="1" fontWeight="bold" color={appColorTheme.brown_2}>
                {refundPercent}%
              </Text>
              <Box flex="2" position="relative" px={2}>
                <Slider
                  min={5}
                  max={maxAllowedPercent}
                  step={5}
                  value={refundPercent}
                  onChange={handlePercentChange}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  isDisabled={isLoading || isLoadingComplaints}
                  colorScheme="green"
                >
                  <SliderMark value={5} mt={2} ml={-2} fontSize="sm">
                    5%
                  </SliderMark>
                  {maxAllowedPercent < 100 && (
                    <SliderMark
                      value={maxAllowedPercent}
                      mt={2}
                      ml={-2}
                      fontSize="sm"
                    >
                      {maxAllowedPercent}%
                    </SliderMark>
                  )}
                  {maxAllowedPercent >= 50 && (
                    <SliderMark
                      value={Math.min(50, maxAllowedPercent)}
                      mt={2}
                      ml={-2}
                      fontSize="sm"
                    >
                      {Math.min(50, maxAllowedPercent)}%
                    </SliderMark>
                  )}
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="green.500"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${refundPercent}%`}
                  >
                    <SliderThumb boxSize={6} />
                  </Tooltip>
                </Slider>
              </Box>
            </Flex>
          </FormControl>
        )}

        {/* Calculated refund amount - only shown if complaint is accepted */}
        {isAccept && (
          <FormControl>
            <FormLabel>Số tiền hoàn trả (tự động tính)</FormLabel>
            <HStack>
              <Text flex="1" as="b" color={appColorTheme.brown_2}>
                {formatPrice(refundAmount)}
              </Text>
              <Box
                flex="1"
                p={2}
                bg="gray.50"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.600">
                  Tính toán từ {refundPercent}% tổng giá trị đơn hàng
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {formatPrice(totalOrderAmount)} × {refundPercent}%
                </Text>
              </Box>
            </HStack>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Tối đa:{" "}
              {isLoadingComplaints
                ? "Đang tính toán..."
                : formatPrice(maxRefundableAmount)}
            </Text>
            {refundAmount > maxRefundableAmount && (
              <Text fontSize="sm" color="red.500" mt={1}>
                Số tiền hoàn trả đã được điều chỉnh để không vượt quá giới hạn
                tối đa có thể hoàn trả.
              </Text>
            )}
          </FormControl>
        )}

        <HStack justify="space-between">
          <Button
            leftIcon={isAccept ? <FiCheck /> : <FiX />}
            colorScheme={isAccept ? "green" : "red"}
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={
              !response.trim() || response.length > 1000 || isLoadingComplaints
            }
          >
            {isAccept ? "Xác nhận và Chấp nhận hoàn tiền" : "Từ chối hoàn tiền"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
