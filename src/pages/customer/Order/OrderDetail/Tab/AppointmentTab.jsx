import {
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";

// Static appointment data
const appointmentData = {
  type: "Online",
  location: "https://google.com",
  date: "05/03/2025 - 14:00",
  description:
    "Bàn bạc chi tiết mô tả và chỉnh sửa lại các yêu cầu để đảm báo tính khả thi",
};

export default function AppointmentTab() {
  return (
    <>
      <Heading fontWeight={500} fontSize="20px" mb={5} textAlign="center">
        Thông tin lịch hẹn
      </Heading>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Stack spacing={4}>
          <HStack>
            <Text fontWeight="500">Hình thức:</Text>
            <Text>{appointmentData.type}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Địa điểm:</Text>
            <Text>{appointmentData.location}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Ngày hẹn:</Text>
            <Text>{appointmentData.date}</Text>
          </HStack>

          <HStack>
            <Text fontWeight="500">Mô tả:</Text>
            <Text>{appointmentData.description}</Text>
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
