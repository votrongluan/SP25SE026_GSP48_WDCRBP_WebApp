import {
  Box,
  VStack,
  FormControl,
  Checkbox,
  Text,
  Flex,
  Spinner,
  Divider,
  FormLabel,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";

export default function ShippingAndPriceSection({
  isInstall,
  setIsInstall,
  isCalculatingShipping,
  shippingFee,
  note,
  setNote,
  isGuarantee,
}) {
  // Calculate one-way shipping fee
  const oneWayShippingFee = isInstall ? shippingFee : shippingFee / 2;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Box bg="white" p={5} borderRadius="10px" boxShadow="sm">
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <Checkbox
            isChecked={isInstall}
            onChange={(e) => setIsInstall(e.target.checked)}
            size="md"
          >
            <Text fontWeight="medium">
              Yêu cầu giao hàng + lắp đặt bởi xưởng
            </Text>
          </Checkbox>

          <Text fontSize="sm" color="gray.600" mt={1}>
            {isInstall
              ? "Xưởng sẽ giao và lắp đặt sản phẩm sau khi sửa chữa / bảo hành xong."
              : "Sản phẩm sẽ được gửi về qua đơn vị vận chuyển sau khi sửa chữa / bảo hành."}
          </Text>
        </FormControl>

        <Divider />

        {/* Updated price section with HStack layout */}
        <Box>
          <Text fontWeight="medium" mb={3}>
            Chi phí vận chuyển:
          </Text>

          {isCalculatingShipping ? (
            <Flex align="center">
              <Spinner size="sm" mr={2} />
              <Text>Đang tính phí vận chuyển...</Text>
            </Flex>
          ) : shippingFee > 0 ? (
            <VStack align="stretch" spacing={2}>
              {/* Always show first shipment */}
              <HStack justify="space-between">
                <Text>Chiều đi (Khách hàng → Xưởng):</Text>
                <Text fontWeight="medium" color={appColorTheme.brown_2}>
                  {formatCurrency(oneWayShippingFee)}
                </Text>
              </HStack>

              {/* Only show return shipment if not install */}
              {!isInstall && (
                <HStack justify="space-between">
                  <Text>Chiều về (Xưởng → Khách hàng):</Text>
                  <Text fontWeight="medium" color={appColorTheme.brown_2}>
                    {formatCurrency(oneWayShippingFee)}
                  </Text>
                </HStack>
              )}

              {/* Only show total if there are multiple costs */}
              {!isInstall && (
                <HStack justify="space-between">
                  <Text fontWeight="bold">Tổng phí vận chuyển:</Text>
                  <Text fontWeight="bold" color={appColorTheme.brown_2}>
                    {formatCurrency(shippingFee)}
                  </Text>
                </HStack>
              )}
            </VStack>
          ) : (
            <Text color="red.500">Không thể tính phí vận chuyển</Text>
          )}
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="medium" mb={2}>
            Chi phí sửa chữa / bảo hành:
          </Text>
          <HStack justify="space-between">
            <Text>Phí dịch vụ:</Text>
            <Text
              fontWeight="bold"
              color={isGuarantee ? "green.500" : "blue.500"}
            >
              {isGuarantee ? "Miễn phí" : "Báo giá chi tiết sau"}
            </Text>
          </HStack>
        </Box>

        <Divider />

        <FormControl>
          <FormLabel>Ghi chú bổ sung:</FormLabel>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Thông tin bổ sung về yêu cầu sửa chữa / bảo hành..."
          />
        </FormControl>
      </VStack>
    </Box>
  );
}
