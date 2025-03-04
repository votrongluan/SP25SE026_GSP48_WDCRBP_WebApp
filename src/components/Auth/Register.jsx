import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
import axios from "../../api/axios.js";
import { useState } from "react";

export default function Register({ changeTab }) {
  const toast = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // Check if password is same as rePassword
      if (data.password !== data.rePassword) {
        toast({
          title: "Đăng ký thất bại",
          description: "Mật khẩu không trùng nhau",
          status: "error",
          duration: 700,
          isClosable: true,
        });
        return;
      }

      // Check if phone number is valid
      const phoneRegex = /^0[0-9]{9}$/;
      if (!phoneRegex.test(data.phone)) {
        console.log(data.phone);
        toast({
          title: "Đăng ký thất bại",
          description: "Số điện thoại không hợp lệ",
          status: "error",
          duration: 700,
          isClosable: true,
        });
        return;
      }

      const res = await axios.post(
        "/employee/registercustomer",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const user = res.data;

      if (!user) {
        toast({
          title: "Đăng ký thất bại",
          description: "Tài khoản đã tồn tại",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Đăng ký thành công",
          description: "Vui lòng kích hoạt tài khoản bằng OTP đã gửi về email",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Box
        fontWeight="semibold"
        fontSize="20px"
        _selected={{ bg: "gray.100" }}
        fontFamily="Montserrat"
        mb="20px"
        pb="8px"
        borderBottom="1px solid black"
      >
        Đăng ký
      </Box>

      <Form onSubmit={handleRegister}>
        <FormControl isRequired mb="20px">
          <FormLabel>Tên của bạn</FormLabel>
          <Input bgColor="white" type="text" name="name" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập email</FormLabel>
          <Input bgColor="white" type="email" name="email" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập mật khẩu</FormLabel>
          <Input bgColor="white" type="password" name="password" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập lại mật khẩu</FormLabel>
          <Input bgColor="white" type="password" name="rePassword" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập số điện thoại</FormLabel>
          <Input bgColor="white" type="tel" name="phone" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập địa chỉ</FormLabel>
          <Input bgColor="white" type="tel" name="address" />
        </FormControl>

        <Button
          color="black"
          bgColor="app_brown.0"
          width="100%"
          type="submit"
          mt="30px"
          isLoading={isSending}
        >
          Đăng ký
        </Button>
      </Form>

      <Flex mt="20px" justifyContent="space-between">
        <Box
          onClick={() => changeTab("login")}
          cursor="pointer"
          color="app_brown.0"
        >
          Đăng nhập
        </Box>
        <Box
          onClick={() => changeTab("verify")}
          cursor="pointer"
          color="app_brown.0"
        >
          Kích hoạt tài khoản
        </Box>
      </Flex>
    </>
  );
}
