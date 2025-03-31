import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useState } from "react";
import { useNotify } from "../Utility/Notify";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRegisterMutation } from "../../services/authApi";
import { validateRegister } from "../../validations";
import { FiUserPlus } from "react-icons/fi";

export default function Register({ setRegisterEmail, changeTab }) {
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const notify = useNotify();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // Validate data
      const errors = validateRegister(data);
      if (errors.length > 0) {
        notify("Đăng ký thất bại", errors.join(" [---] "), "info", 5000);
        return;
      }

      // Remove rePassword before sending to server
      const { rePassword, ...registerData } = data;
      const res = await register(registerData).unwrap();

      notify(
        "Đăng ký thành công",
        `Vui lòng xác nhận bằng OTP đã gửi về email ${data.email}`,
        "success"
      );

      setRegisterEmail(data.email);
      changeTab("verify");
    } catch (err) {
      console.log(err);

      notify(
        "Đăng ký thất bại",
        err?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
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
          <Input bgColor="white" type="text" name="username" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập email</FormLabel>
          <Input bgColor="white" type="email" name="email" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập mật khẩu</FormLabel>
          <InputGroup>
            <Input
              bgColor="white"
              type={showPassword ? "text" : "password"}
              name="password"
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập lại mật khẩu</FormLabel>
          <InputGroup>
            <Input
              bgColor="white"
              type={showRePassword ? "text" : "password"}
              name="rePassword"
            />
            <InputRightElement>
              <IconButton
                aria-label={showRePassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                icon={showRePassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowRePassword(!showRePassword)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập số điện thoại</FormLabel>
          <Input bgColor="white" type="tel" name="phone" />
        </FormControl>

        <Button
          color="white"
          bgColor="app_brown.2"
          width="100%"
          type="submit"
          mt="30px"
          isLoading={isRegisterLoading}
          leftIcon={<FiUserPlus />}
        >
          Đăng ký
        </Button>
      </Form>

      <Flex mt="20px" justifyContent="space-between">
        <Box
          onClick={() => changeTab("login")}
          cursor="pointer"
          color="app_brown.2"
        >
          Đăng nhập
        </Box>
        <Box
          onClick={() => changeTab("verify")}
          cursor="pointer"
          color="app_brown.2"
        >
          Xác nhận tài khoản
        </Box>
      </Flex>
    </>
  );
}
