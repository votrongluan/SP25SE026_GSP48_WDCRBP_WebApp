import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { appColorTheme } from "../../config/appconfig.js";
import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmailOTPLogin({ onSuccess }) {
  const toast = useToast();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailOTP, setEmailOTP] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement email OTP login
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login/email-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: emailOTP }),
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
      toast({
        title: "Đăng nhập thất bại",
        description: err.message,
        status: "error",
        colorScheme: "red",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/send-email-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Gửi OTP thất bại");
      }

      toast({
        title: "Gửi OTP thành công",
        description: "Vui lòng kiểm tra email của bạn",
        status: "success",
        colorScheme: "green",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Gửi OTP thất bại",
        description: err.message,
        status: "error",
        colorScheme: "red",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl isRequired mb="20px">
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <Input
            bgColor="white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          value={emailOTP}
          onChange={(e) => setEmailOTP(e.target.value)}
        />
      </FormControl>

      <Button
        color="white"
        bgColor={appColorTheme.brown_2}
        width="100%"
        type="submit"
        mt="30px"
        isLoading={isLoading}
      >
        Đăng nhập
      </Button>
    </Form>
  );
}
