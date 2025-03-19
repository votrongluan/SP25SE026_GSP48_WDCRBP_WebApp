import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Heading,
  Divider,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { appColorTheme } from "../config/appconfig";

const TestPage = () => {
  // Sản phẩm, cấu hình, giá
  const woodworkProduct = {
    name: "Bàn gỗ thủ công",
    img: "https://via.placeholder.com/300", // Ảnh tạm
    configurations: [
      {
        id: 1,
        name: "Loại gỗ",
        values: [
          { id: 101, name: "Gỗ Sồi" },
          { id: 102, name: "Gỗ Óc Chó" },
        ],
      },
      {
        id: 2,
        name: "Bề mặt hoàn thiện",
        values: [
          { id: 201, name: "Tự nhiên" },
          { id: 202, name: "Sơn bóng" },
        ],
      },
    ],
    prices: [
      { config: [1, 2], configValue: [101, 201], price: 120 },
      { config: [1, 2], configValue: [101, 202], price: 140 },
      { config: [1, 2], configValue: [102, 201], price: 150 },
      { config: [1, 2], configValue: [102, 202], price: 170 },
    ],
  };

  // State lưu lựa chọn của người dùng
  const [selectedValues, setSelectedValues] = useState([
    woodworkProduct.configurations[0].values[0].id, // Mặc định: Gỗ Sồi
    woodworkProduct.configurations[1].values[0].id, // Mặc định: Tự nhiên
  ]);

  // Tìm giá dựa trên cấu hình được chọn (so sánh sau khi sắp xếp)
  const selectedPrice = woodworkProduct.prices.find(
    (p) =>
      JSON.stringify([...selectedValues].sort()) ===
      JSON.stringify([...p.configValue].sort())
  )?.price;

  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <VStack align="stretch" spacing={4}>
        {woodworkProduct.configurations.map((config, configIndex) => (
          <Flex gap={4} justifyContent="space-between" key={config.id}>
            <Text width="200px" fontWeight="bold">
              {config.name}
            </Text>
            <Flex flex="1" gap={4}>
              {config.values.map((value) => (
                <Box key={value.id}>
                  <Box
                    p={2}
                    textAlign="center"
                    border={
                      selectedValues.includes(value.id)
                        ? `1px solid ${appColorTheme.brown_2}`
                        : "1px solid black"
                    }
                    cursor="pointer"
                    color={
                      selectedValues.includes(value.id) ? `white` : "black"
                    }
                    bg={
                      selectedValues.includes(value.id)
                        ? `${appColorTheme.brown_2}`
                        : "none"
                    }
                    onClick={() => {
                      const updatedValues = [...selectedValues];
                      updatedValues[configIndex] = value.id;
                      setSelectedValues(updatedValues);
                    }}
                  >
                    {value.name}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Flex>
        ))}
      </VStack>

      <Text fontWeight="bold">
        Giá tổng: {selectedPrice ? `${selectedPrice}₫` : "Không có giá"}
      </Text>
    </Box>
  );
};

export default TestPage;
