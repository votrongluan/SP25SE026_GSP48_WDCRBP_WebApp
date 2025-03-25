import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../../config/appconfig";
import UserAddress from "./UserAddress";

export default function CustomerProfile() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý lưu thông tin
    console.log("Form data:", formData);
    toast({
      title: "Thông tin đã được cập nhật",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="container.md" mx="auto">
      <form onSubmit={handleSubmit}>
        {/* Thông tin cá nhân */}
        <Stack spacing={6} mb={8}>
          <Heading
            fontFamily="Montserrat"
            fontWeight="normal"
            as="h3"
            fontSize="22px"
          >
            Thông tin cá nhân
          </Heading>
          <FormControl>
            <FormLabel>Tên của bạn</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              bg="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              bg="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              bg="white"
            />
          </FormControl>
        </Stack>

        <Button
          type="submit"
          bg={appColorTheme.brown_0}
          color="black"
          size="lg"
          w="full"
          _hover={{ bg: appColorTheme.brown_1, color: "white" }}
        >
          Lưu thông tin
        </Button>
      </form>

      {/* Địa chỉ */}
      <Stack mt={10} spacing={5}>
        <UserAddress />
      </Stack>
    </Box>
  );
}
