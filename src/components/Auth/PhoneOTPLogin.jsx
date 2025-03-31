import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { appColorTheme } from "../../config/appconfig.js";
import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotify } from "../Utility/Notify.jsx";
import { FiLogIn } from "react-icons/fi";

export default function PhoneOTPLogin({ onSuccess }) {
  const notify = useNotify();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement phone OTP login
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login/phone-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, otp: phoneOTP }),
        }
      );

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const user = await response.json();
      user.token = user.accessTokenToken;

      const decodedToken = jwtDecode(user.accessTokenToken);
      const userWithToken = { ...user, ...decodedToken };

      switch (userWithToken.role) {
        case 1:
          setAuth(userWithToken);
          navigate(from);
          break;
        case 2:
          setAuth(userWithToken);
          navigate("/supplier");
          break;
        case 3:
          setAuth(userWithToken);
          navigate("/admin");
          break;
        default:
          setAuth(userWithToken);
          navigate(from);
          break;
      }

      onSuccess?.();
    } catch (err) {
      notify("Đăng nhập thất bại", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/send-phone-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );

      if (!response.ok) {
        throw new Error("Gửi OTP thất bại");
      }

      notify(
        "Gửi OTP thành công",
        "Vui lòng kiểm tra tin nhắn của bạn",
        "success"
      );
    } catch (err) {
      notify("Gửi OTP thất bại", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl isRequired mb="20px">
        <FormLabel>Số điện thoại</FormLabel>
        <InputGroup>
          <Input
            bgColor="white"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button onClick={handleSendOTP} ml={2} colorScheme="blue">
            Gửi OTP
          </Button>
        </InputGroup>
      </FormControl>

      <FormControl isRequired mb="20px">
        <FormLabel>Mã OTP</FormLabel>
        <Input
          bgColor="white"
          type="text"
          value={phoneOTP}
          onChange={(e) => setPhoneOTP(e.target.value)}
        />
      </FormControl>

      <Button
        color="white"
        bgColor={appColorTheme.brown_2}
        width="100%"
        type="submit"
        mt="30px"
        isLoading={isLoading}
        leftIcon={<FiLogIn />}
      >
        Đăng nhập
      </Button>
    </Form>
  );
}
