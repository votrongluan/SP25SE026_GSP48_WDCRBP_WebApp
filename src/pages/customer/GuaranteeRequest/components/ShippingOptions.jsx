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
} from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig.js";

export default function ShippingOptions({
  isInstall,
  setIsInstall,
  isCalculatingShipping,
  shippingFee,
  note,
  setNote,
}) {
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
              : "Sản phẩm sẽ được gửi về qua đơn vị vận chuyển sau khi sửa chữa / bảo hành (phí vận chuyển x2 cho chiều đi và về)."}
          </Text>
        </FormControl>

        <Divider />

        <Box>
          <Text fontWeight="medium" mb={2}>
            Chi phí vận chuyển:
          </Text>

          {isCalculatingShipping ? (
            <Flex align="center">
              <Spinner size="sm" mr={2} />
              <Text>Đang tính phí vận chuyển...</Text>
            </Flex>
          ) : shippingFee > 0 ? (
            <Text fontWeight="bold" color={appColorTheme.brown_2}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(shippingFee)}
              {!isInstall && " (x2 chiều đi và về)"}
            </Text>
          ) : (
            <Text color="red.500">Không thể tính phí vận chuyển</Text>
          )}
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
