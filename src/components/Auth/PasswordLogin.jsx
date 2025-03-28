import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { appColorTheme } from "../../config/appconfig.js";
import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { jwtDecode } from "jwt-decode";
import { useNotify } from "../Utility/Notify.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginWithPasswordMutation } from "../../services/authApi.js";

export default function PasswordLogin() {
  const notify = useNotify();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginWithPasswordMutation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.emailOrPhone = data.email;
      delete data.email;

      const res = await login(data).unwrap();
      const user = res.data;

      const decodedToken = jwtDecode(user.access_token);
      const auth = {
        token: user.access_token,
        ...decodedToken,
        refreshToken: user.refresh_token,
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
    } catch (err) {
      notify(
        "Đăng nhập thất bại",
        err.data?.message || "Vui lòng kiểm tra lại thông tin đăng nhập",
        "error"
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl isRequired mb="20px">
        <FormLabel>Email</FormLabel>
        <Input bgColor="white" type="text" name="email" />
      </FormControl>

      <FormControl isRequired mb="20px">
        <FormLabel>Mật khẩu</FormLabel>
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
