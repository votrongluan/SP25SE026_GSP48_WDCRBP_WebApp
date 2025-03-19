import React from "react";
import { Box, Text, Button, Stack, Icon } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { appColorTheme } from "../../../../../../config/appconfig";

export default function AvailableService() {
  const services = [
    {
      title: "Dịch vụ thiết kế và gia công sản phẩm theo khách hàng",
      description: "Chuyên gia công giường, tủ, bàn ghế,... theo yêu cầu.",
      buttonText: "Đặt dịch vụ",
    },
    {
      title: "Dịch vụ gia công sản phẩm theo ý tưởng thiết kế",
      description: "Cung cấp dịch vụ tùy chỉnh thiết kế nội thất hiện đại.",
      buttonText: "Xem thiết kế",
    },
    {
      title: "Dịch vụ sửa chữa và bảo hành sản phẩm của xưởng trên nền tảng",
      description: "Bảo hành, sửa chữa, thay thế linh kiện,...",
      buttonText: "Đặt dịch vụ",
    },
  ];

  return (
    <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
      <Stack spacing={5}>
        {services.map((service, index) => (
          <Box key={index}>
            <Text as="h3" fontSize="20px" mb={4}>
              {service.title}
            </Text>
            <Text mb={4}>{service.description}</Text>
            <Button
              bg={appColorTheme.brown_2}
              color="white"
              borderRadius="20px"
              px={6}
              py={3}
              _hover={{ bg: appColorTheme.brown_1 }}
              rightIcon={<Icon as={FiArrowRight} />}
            >
              {service.buttonText}
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
