import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../../config/appconfig";

export default function TaskFilter() {
  const [selectedTask, setSelectedTask] = useState("Tất cả");

  const taskList = [
    {
      label: "Tất cả",
      status: 0,
      numberOfTask: 10,
    },
    {
      label: "Duyệt lịch hẹn",
      status: 1,
      numberOfTask: 10,
    },
    {
      label: "Duyệt hợp đồng",
      status: 1,
      numberOfTask: 10,
    },
    {
      label: "Duyệt thiết kế",
      status: 1,
      numberOfTask: 10,
    },
    {
      label: "Xác nhận nhận hàng",
      status: 1,
      numberOfTask: 10,
    },
  ];

  return (
    <>
      <Flex gap={5} justifyContent="space-between">
        <Text width="200px" fontWeight="bold">
          Lọc theo công việc
        </Text>

        <Flex flex="1" flexWrap="wrap" gap={5}>
          {taskList.map((value) => (
            <Box key={value.label}>
              <Box
                p={2}
                textAlign="center"
                borderRadius="10px"
                cursor="pointer"
                bg="none"
                color={
                  selectedTask == value.label
                    ? `white`
                    : `${appColorTheme.brown_2}`
                }
                border={`1px solid ${appColorTheme.brown_2}`}
                onClick={() => setSelectedTask(value.label)}
                bgColor={
                  selectedTask == value.label
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
