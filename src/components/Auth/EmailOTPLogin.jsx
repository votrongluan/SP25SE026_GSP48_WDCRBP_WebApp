import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { appColorTheme } from "../../config/appconfig.js";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth.js";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLoginWithOTPMutation,
  useSendOTPMutation,
} from "../../services/authApi";
import { useNotify } from "../Utility/Notify";

export default function EmailOTPLogin() {
  const notify = useNotify();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginWithOTP, { isLoading: isLoggingIn }] = useLoginWithOTPMutation();
  const [sendOTP] = useSendOTPMutation();
  const [countdown, setCountdown] = useState(0);
  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const from = location.state?.from?.pathname || "/";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginWithOTP(formData).unwrap();
      const user = res.data;

      const decodedToken = jwtDecode(user.accessToken);
      const auth = {
        token: user.accessToken,
        ...decodedToken,
        refreshToken: user.refreshToken,
      };

      switch (auth.role) {
        case "Customer":
          setAuth(auth);
          navigate(from);
          break;
        case "Woodworker":
          setAuth(auth);
          navigate("/ww");
          break;
      }
    } catch (error) {
      notify(
        "Đăng nhập thất bại",
        error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        "error"
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl isRequired mb="20px">
        <FormLabel>Email</FormLabel>
        <Input
          bgColor="white"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
        bgColor={appColorTheme.brown_2}
        width="100%"
        type="submit"
        mt="30px"
        isLoading={isLoggingIn}
      >
        Đăng nhập
      </Button>
    </Form>
  );
}
