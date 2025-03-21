import React, { useState } from "react";
import { Box, Heading, Stack, HStack, Text, Input } from "@chakra-ui/react";
import { convertTimeStampToDateTimeString } from "../../../../../utils/utils.js";

const initialContract = {
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
  contract_word_file: "https://example.com/contract_template.docx",
};

// Hàm chuyển đổi Date sang định dạng "YYYY-MM-DDTHH:mm" cho input datetime-local
const formatDateForInput = (date) => {
  if (!date) return "";
  const dt = new Date(date);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
    dt.getDate()
  )}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
};

export default function ContractEditSection() {
  const [contract, setContract] = useState({
    ...initialContract,
    created_at: formatDateForInput(initialContract.created_at),
    sign_date: formatDateForInput(initialContract.sign_date),
    complete_date: formatDateForInput(initialContract.complete_date),
  });

  const handleChange = (field, value) => {
    setContract((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Heading fontWeight="bold" fontSize="20px" mb={5} textAlign="center">
        Thông tin hợp đồng
      </Heading>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="bold" width="150px">
              Số hợp đồng:
            </Text>
            <Input
              value={contract.contract_number}
              onChange={(e) => handleChange("contract_number", e.target.value)}
              placeholder="Số hợp đồng"
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              File hợp đồng (Word):
            </Text>
            <Input
              type="file"
              onChange={(e) =>
                handleChange("contract_word_file", e.target.value)
              }
              placeholder="File hợp đồng (Word)"
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Ngày tạo:
            </Text>
            <Input
              type="datetime-local"
              value={contract.created_at}
              onChange={(e) => handleChange("created_at", e.target.value)}
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Ngày ký:
            </Text>
            <Input
              type="datetime-local"
              value={contract.sign_date}
              onChange={(e) => handleChange("sign_date", e.target.value)}
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Ngày hoàn thành:
            </Text>
            <Input
              type="datetime-local"
              value={contract.complete_date}
              onChange={(e) => handleChange("complete_date", e.target.value)}
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Chính sách bảo hành:
            </Text>
            <Input
              value={contract.warranty_policy}
              onChange={(e) => handleChange("warranty_policy", e.target.value)}
              placeholder="Chính sách bảo hành"
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Tổng giá trị hợp đồng:
            </Text>
            <Input
              type="number"
              value={contract.contract_total_amount}
              onChange={(e) =>
                handleChange("contract_total_amount", e.target.value)
              }
              placeholder="Tổng giá trị hợp đồng"
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Bên A đã ký:
            </Text>
            <Input
              value={contract.is_sign_by_a ? "Đã ký" : "Chưa ký"}
              isReadOnly
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Bên B đã ký:
            </Text>
            <Input
              value={contract.is_sign_by_b ? "Đã ký" : "Chưa ký"}
              isReadOnly
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Thông tin Bên A:
            </Text>
            <Input
              value={contract.a_information}
              onChange={(e) => handleChange("a_information", e.target.value)}
              placeholder="Thông tin Bên A"
            />
          </HStack>

          <HStack>
            <Text fontWeight="bold" width="150px">
              Thông tin Bên B:
            </Text>
            <Input
              value={contract.b_information}
              onChange={(e) => handleChange("b_information", e.target.value)}
              placeholder="Thông tin Bên B"
            />
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
