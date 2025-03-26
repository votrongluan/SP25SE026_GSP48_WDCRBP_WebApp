import React, { useState } from "react";
import { Box, Heading, Grid, GridItem, Input, Text } from "@chakra-ui/react";

// Hàm lấy thời gian địa phương theo định dạng "YYYY-MM-DDTHH:mm"
const getLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 16);
};

const appointmentData = {
  type: "Online",
  location: "https://google.com",
  date: getLocalDateTime(),
  description:
    "Bàn bạc chi tiết mô tả và chỉnh sửa lại các yêu cầu để đảm báo tính khả thi",
};

export default function AppointmentEditSection() {
  const [formData, setFormData] = useState(appointmentData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Heading fontWeight="bold" fontSize="20px" mb={6} textAlign="center">
        Thông tin lịch hẹn
      </Heading>

      <Box p={5} bgColor="white" boxShadow="md" borderRadius="10px">
        <Grid templateColumns="100px 1fr" gap={4}>
          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Hình thức:
            </Text>
          </GridItem>
          <GridItem>
            <Input
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              placeholder="Hình thức"
            />
          </GridItem>

          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Địa điểm:
            </Text>
          </GridItem>
          <GridItem>
            <Input
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Địa điểm"
            />
          </GridItem>

          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Ngày hẹn:
            </Text>
          </GridItem>
          <GridItem>
            <Input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              placeholder="Ngày hẹn"
            />
          </GridItem>

          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Mô tả:
            </Text>
          </GridItem>
          <GridItem>
            <Input
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Mô tả"
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
