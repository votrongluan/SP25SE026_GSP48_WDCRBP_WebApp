import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useSendOTPMutation,
  useResetPasswordMutation,
} from "../../services/authApi";
import { useNotify } from "../Utility/Notify";
import PasswordInput from "../Input/PasswordInput";
import { FiLock } from "react-icons/fi";

export default function ForgetPassword({ changeTab }) {
  const notify = useNotify();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const [sendOTP] = useSendOTPMutation();
  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendOTP = async () => {
    try {
      setSendOTPLoading(true);
      await sendOTP(email).unwrap();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData);

    try {
      await resetPassword(postData).unwrap();

      notify("Đổi mật khẩu thành công", "Vui lòng đăng nhập lại", "success");
      changeTab("login");
    } catch (error) {
      notify(
        "Đổi mật khẩu thất bại",
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
        Quên mật khẩu
      </Box>

      <Form onSubmit={handleSubmit}>
        <FormControl isRequired mb="20px">
          <FormLabel>Email</FormLabel>
          <Input
            bgColor="white"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb="20px">
          <HStack>
            <FormLabel mr="auto">Mã OTP</FormLabel>

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
          <Input bgColor="white" type="text" name="otp" />
          <HStack>
            <FormHelperText ml="auto">
              Hệ thống sẽ gửi mã OTP về mail của bạn
            </FormHelperText>
          </HStack>
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Mật khẩu mới</FormLabel>
          <PasswordInput
            name="newPassword"
            placeholder="Nhập mật khẩu mới"
            variant="outline"
          />
        </FormControl>

        <FormControl isRequired mb="20px">
          <FormLabel>Xác nhận mật khẩu</FormLabel>
          <PasswordInput
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu mới"
            variant="outline"
          />
        </FormControl>

        <Button
          color="white"
          bgColor="app_brown.2"
          width="100%"
          type="submit"
          mt="30px"
          leftIcon={<FiLock />}
        >
          Xác nhận
        </Button>

        <Flex mt="20px" justifyContent="space-between">
          <Spacer />
          <Box
            onClick={() => changeTab("login")}
            cursor="pointer"
            color="app_brown.2"
          >
            Đăng nhập
          </Box>
        </Flex>
      </Form>
    </>
  );
}
