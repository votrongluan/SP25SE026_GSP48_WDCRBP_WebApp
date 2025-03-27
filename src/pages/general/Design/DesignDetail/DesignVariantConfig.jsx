import { useState } from "react";
import { Box, Text, VStack, Flex, Stack } from "@chakra-ui/react";
import { appColorTheme } from "../../../../config/appconfig";
import { formatPrice } from "../../../../utils/utils";

export default function DesignVariantConfig() {
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
      { config: [1, 2], configValue: [101, 201], price: 12000000 },
      { config: [1, 2], configValue: [101, 202], price: 14000000 },
      { config: [1, 2], configValue: [102, 201], price: 15000000 },
      { config: [1, 2], configValue: [102, 202], price: 17000000 },
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
    <>
      <Stack spacing={4}>
        {woodworkProduct.configurations.map((config, configIndex) => (
          <Flex gap={4} justifyContent="space-between" key={config.id}>
            <Text width="200px" fontWeight="bold">
              {config.name}
            </Text>
            <Flex flex="1" flexWrap="wrap" gap={4}>
              {config.values.map((value) => (
                <Box key={value.id}>
                  <Box
                    p={2}
                    textAlign="center"
                    cursor="pointer"
                    fontWeight="bold"
                    bg="none"
                    border={
                      selectedValues.includes(value.id)
                        ? `1px solid ${appColorTheme.brown_2}`
                        : "1px solid black"
                    }
                    color={
                      selectedValues.includes(value.id)
                        ? `${appColorTheme.brown_2}`
                        : "black"
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
      </Stack>

      <Box mt={4} p={4} bgColor={appColorTheme.grey_0}>
        <Text fontSize="30px" color={appColorTheme.brown_2} fontWeight="bold">
          {selectedPrice ? `${formatPrice(selectedPrice)}` : "Không có giá"}
        </Text>
      </Box>
    </>
  );
}
