import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useVerifyOTPMutation,
  useSendOTPMutation,
} from "../../services/authApi.js";
import { useNotify } from "../Utility/Notify.jsx";
import { FiCheck } from "react-icons/fi";

export default function VerifyPage({ changeTab, registerEmail }) {
  const notify = useNotify();
  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [sendOTP] = useSendOTPMutation();
  const [countdown, setCountdown] = useState(registerEmail ? 60 : 0);
  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: registerEmail || "",
    otp: "",
  });

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResendOTP = async () => {
    try {
      setSendOTPLoading(true);
      await sendOTP(formData.email).unwrap();
      notify(
        "Gửi mã OTP thành công",
        "Vui lòng kiểm tra email của bạn",
        "success"
      );

      setCountdown(60);
      setSendOTPLoading(false);
    } catch (error) {
      notify(
        "Gửi mã OTP thất bại",
        error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
      setSendOTPLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await verifyOTP(formData).unwrap();
      notify(
        "Xác thực thành công",
        "Bạn có thể đăng nhập vào hệ thống bằng tài khoản này",
        "success"
      );
      changeTab("login");
    } catch (error) {
      notify(
        "Xác thực thất bại",
        error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
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
        Xác nhận tài khoản
      </Box>

      <Form onSubmit={handleVerify}>
        <FormControl isRequired mb="20px">
          <FormLabel>Nhập email</FormLabel>
          <Input
            bgColor="white"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!!registerEmail}
          />
        </FormControl>

        <FormControl isRequired mb="20px">
          <HStack>
            <FormLabel mr="auto">Nhập OTP</FormLabel>
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleResendOTP}
              isDisabled={countdown > 0 || sendOTPLoading}
              color={countdown > 0 ? "gray.500" : "app_brown.2"}
              variant="ghost"
            >
              {countdown > 0
                ? `Vui lòng chờ ${countdown} giây để gửi lại OTP`
                : "Gửi OTP"}
            </Button>
          </HStack>
          <Input
            bgColor="white"
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          color="white"
          bgColor="app_brown.2"
          width="100%"
          type="submit"
          isLoading={isVerifying}
          leftIcon={<FiCheck />}
        >
          Xác nhận
        </Button>
      </Form>

      <Flex mt="20px" justifyContent="flex-end">
        <Box
          onClick={() => changeTab("login")}
          cursor="pointer"
          color="app_brown.2"
        >
          Đăng nhập
        </Box>
      </Flex>
    </>
  );
}
