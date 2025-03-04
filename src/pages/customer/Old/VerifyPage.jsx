import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import axios from "../../../api/axios.js";
import { useState } from "react";

export default function VerifyPage({ changeTab }) {
  const toast = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const res = await axios.post(
        `/Employee/VerifyOTPCreateAccount?email=${data.email}`,
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const user = res.data;

      if (!user) {
        toast({
          title: "Thao tác thất bại",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Kích hoạt thành công, bạn có thể đăng nhập",
          description: "Bạn có thể đăng nhập vào hệ thống bằng tài khoản này",
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
        Kích hoạt tài khoản
      </Box>

      <Form onSubmit={handleRegister}>
        <FormControl isRequired mb="20px">
          <FormLabel>Nhập email</FormLabel>
          <Input bgColor="white" type="email" name="email" />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Nhập OTP</FormLabel>
          <Input bgColor="white" type="text" name="otp" />
        </FormControl>

        <Button
          color="black"
          bgColor="app_brown.0"
          width="100%"
          type="submit"
          isLoading={isSending}
        >
          Kích hoạt
        </Button>
      </Form>

      <Flex mt="20px" justifyContent="space-between">
        <Spacer />

        <Box
          onClick={() => changeTab("login")}
          cursor="pointer"
          color="app_brown.0"
        >
          Đăng nhập
        </Box>
      </Flex>
    </>
  );
}
