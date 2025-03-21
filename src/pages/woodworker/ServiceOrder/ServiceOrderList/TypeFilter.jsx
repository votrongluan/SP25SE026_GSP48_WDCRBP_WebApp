import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../../config/appconfig";

export default function TypeFilter() {
  const [selectedType, setSelectedType] = useState("Tất cả");

  const typeList = [
    {
      label: "Tất cả",
      status: 0,
      numberOfTask: 10,
    },
    {
      label: "Cá nhân",
      status: 1,
      numberOfTask: 10,
    },
    {
      label: "Tùy chỉnh",
      status: 1,
      numberOfTask: 10,
    },
    {
      label: "Mua hàng",
      status: 1,
      numberOfTask: 10,
    },
  ];

  return (
    <>
      <Flex gap={4} justifyContent="space-between">
        <Text width="200px" fontWeight="bold">
          Lọc theo loại dịch vụ
        </Text>

        <Flex flex="1" flexWrap="wrap" gap={4}>
          {typeList.map((value) => (
            <Box key={value.label}>
              <Box
                p={2}
                textAlign="center"
                borderRadius="10px"
                cursor="pointer"
                bg="none"
                color={
                  selectedType == value.label
                    ? `white`
                    : `${appColorTheme.brown_2}`
                }
                border={`1px solid ${appColorTheme.brown_2}`}
                onClick={() => setSelectedType(value.label)}
                bgColor={
                  selectedType == value.label
                    ? `${appColorTheme.brown_2}`
                    : "none"
                }
              >
                {value.label} ({value.numberOfTask})
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
