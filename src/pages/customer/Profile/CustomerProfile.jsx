import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { appColorTheme } from "../../../config/appconfig";
import UserAddress from "./UserAddress";
import { useGetUserInformationQuery } from "../../../services/authApi";
import useAuth from "../../../hooks/useAuth";

export default function CustomerProfile() {
  const toast = useToast();
  const { auth } = useAuth();
  const {
    data: userData,
    isLoading,
    error,
  } = useGetUserInformationQuery(auth?.userId);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData]);

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

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={appColorTheme.brown_2}
          size="xl"
        />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="200px">
        <Text color="red.500">
          Có lỗi xảy ra khi tải thông tin. Vui lòng thử lại sau.
        </Text>
      </Center>
    );
  }

  return (
    <Box maxW="container.md" mx="auto">
      <form onSubmit={handleSubmit}>
        {/* Thông tin cá nhân */}
        <Stack spacing={6} mb={8}>
          <Heading
            color={appColorTheme.brown_2}
            fontFamily="Montserrat"
            fontSize="2xl"
          >
            Thông tin cá nhân
          </Heading>
          <FormControl>
            <FormLabel>Tên của bạn</FormLabel>
            <Input
              name="username"
              value={formData.username}
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
          bg={appColorTheme.brown_2}
          color="white"
          _hover={{ bg: appColorTheme.brown_1 }}
        >
          Lưu thông tin
        </Button>
      </form>

      <Stack mt={10} spacing={6}>
        <UserAddress />
      </Stack>
    </Box>
  );
}
