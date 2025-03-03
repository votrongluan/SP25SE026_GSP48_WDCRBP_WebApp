import { Box, Heading, Stack, HStack, Text, Link } from "@chakra-ui/react";
import { convertTimeStampToDateTimeString } from "../../../../utils/utils.js";

export default function ContractTab() {
  // Ví dụ dữ liệu hợp đồng (bạn có thể lấy từ props hoặc API)
  const contract = {
    contract_id: "12345",
    contract_number: "CN-2025-0001",
    is_sign_by_a: true,
    is_sign_by_b: false,
    warranty_policy: "Bảo hành 12 tháng",
    contract_total_amount: 15000000,
    complete_date: new Date("2025-03-05T16:00:00"), // or null if chưa hoàn thành
    sign_date: new Date("2025-03-03T10:00:00"),
    a_information: "Bên A: Công ty A, Địa chỉ A, MST A...",
    b_information: "Bên B: Công ty B, Địa chỉ B, MST B...",
    created_at: new Date("2025-03-01T09:00:00"),
    platform_commission: 500000,
    order_id: "ORD-ABC-123",
    // Trường mới: đường dẫn file Word
    contract_word_file: "https://example.com/contract_template.docx",
  };

  return (
    <>
      <Heading fontWeight={500} fontSize="20px" mb={5} textAlign="center">
        Thông tin hợp đồng
      </Heading>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="500">Số hợp đồng:</Text>
            <Text>{contract.contract_number}</Text>
          </HStack>

          {/* File Word hợp đồng */}
          <HStack>
            <Text fontWeight="500">File hợp đồng (Word):</Text>
            {contract.contract_word_file ? (
              <Link
                href={contract.contract_word_file}
                isExternal
                color="blue.500"
                textDecoration="underline"
              >
                Tải xuống
              </Link>
            ) : (
              <Text>Chưa có file</Text>
            )}
          </HStack>

          <HStack>
            <Text fontWeight="500">Ngày tạo:</Text>
            <Text>
              {contract.created_at
                ? convertTimeStampToDateTimeString(contract.created_at)
                : "Chưa cập nhật"}
            </Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Ngày ký:</Text>
            <Text>
              {contract.sign_date
                ? convertTimeStampToDateTimeString(contract.sign_date)
                : "Chưa ký"}
            </Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Ngày hoàn thành:</Text>
            <Text>
              {contract.complete_date
                ? convertTimeStampToDateTimeString(contract.complete_date)
                : "Chưa hoàn thành"}
            </Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Chính sách bảo hành:</Text>
            <Text>{contract.warranty_policy || "Chưa có thông tin"}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Tổng giá trị hợp đồng:</Text>
            <Text>
              {contract.contract_total_amount
                ? `${contract.contract_total_amount} VND`
                : "0 VND"}
            </Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Bên A đã ký:</Text>
            <Text>{contract.is_sign_by_a ? "Đã ký" : "Chưa ký"}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Bên B đã ký:</Text>
            <Text>{contract.is_sign_by_b ? "Đã ký" : "Chưa ký"}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Thông tin Bên A:</Text>
            <Text>{contract.a_information || "Chưa có thông tin"}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Thông tin Bên B:</Text>
            <Text>{contract.b_information || "Chưa có thông tin"}</Text>
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
