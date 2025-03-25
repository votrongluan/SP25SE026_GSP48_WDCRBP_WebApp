import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { appColorTheme } from "../../config/appconfig.js";
import PropTypes from "prop-types";
import PasswordLogin from "./PasswordLogin";
import EmailOTPLogin from "./EmailOTPLogin";
import PhoneOTPLogin from "./PhoneOTPLogin";

export default function Login({ changeTab }) {
  const [loginMethod, setLoginMethod] = useState("password");

  const renderLoginForm = () => {
    switch (loginMethod) {
      case "password":
        return <PasswordLogin />;

      case "emailOTP":
        return <EmailOTPLogin />;

      case "phoneOTP":
        return <PhoneOTPLogin />;

      default:
        return null;
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
        Đăng nhập
      </Box>

      {renderLoginForm()}

      <Box mt={4} mb={2} color="gray.600" fontSize="sm">
        Phương thức đăng nhập
      </Box>

      <Flex gap={2}>
        <Button
          flex={1}
          variant={loginMethod === "password" ? "solid" : "outline"}
          colorScheme={loginMethod === "password" ? "blue" : "gray"}
          onClick={() => setLoginMethod("password")}
        >
          Mật khẩu
        </Button>
        <Button
          flex={1}
          variant={loginMethod === "emailOTP" ? "solid" : "outline"}
          colorScheme={loginMethod === "emailOTP" ? "blue" : "gray"}
          onClick={() => setLoginMethod("emailOTP")}
        >
          Email OTP
        </Button>
        <Button
          flex={1}
          variant={loginMethod === "phoneOTP" ? "solid" : "outline"}
          colorScheme={loginMethod === "phoneOTP" ? "blue" : "gray"}
          onClick={() => setLoginMethod("phoneOTP")}
        >
          Số điện thoại OTP
        </Button>
      </Flex>

      <Flex mt="20px" justifyContent="space-between">
        <Box
          onClick={() => changeTab("forgetPassword")}
          cursor="pointer"
          color={appColorTheme.brown_2}
        >
          Quên mật khẩu
        </Box>
        <Box
          onClick={() => changeTab("register")}
          cursor="pointer"
          color={appColorTheme.brown_2}
        >
          Đăng ký
        </Box>
      </Flex>
    </>
  );
}

Login.propTypes = {
  changeTab: PropTypes.func.isRequired,
};
