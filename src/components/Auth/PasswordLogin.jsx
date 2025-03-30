import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { appColorTheme } from "../../config/appconfig.js";
import useAuth from "../../hooks/useAuth.js";
import { jwtDecode } from "jwt-decode";
import { useNotify } from "../Utility/Notify.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginWithPasswordMutation } from "../../services/authApi.js";
import PasswordInput from "../Input/PasswordInput";

export default function PasswordLogin() {
  const notify = useNotify();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
        case "Admin":
          setAuth(auth);
          navigate("/ad");
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
        <Input
          placeholder="Nhập email"
          bgColor="white"
          type="text"
          name="email"
        />
      </FormControl>

      <PasswordInput
        label="Mật khẩu"
        name="password"
        placeholder="Nhập mật khẩu"
        isRequired
        variant="outline"
        mb="20px"
      />

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
