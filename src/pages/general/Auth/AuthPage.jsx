import { Box } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import Login from "../../../components/Auth/Login.jsx";
import Register from "../../../components/Auth/Register.jsx";
import ForgetPassword from "../../../components/Auth/ForgetPassword.jsx";
import { useState } from "react";
import VerifyPage from "../Verify/VerifyPage.jsx";
import { appColorTheme } from "../../../config/appconfig.js";

function AuthPage() {
  const { auth } = useAuth();

  const [currentTab, setCurrentTab] = useState("login");
  const [registerEmail, setRegisterEmail] = useState("");

  if (auth) return <Navigate to="/" />;

  const changeTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <Box
        borderRadius="10px"
        bgColor="white"
        color="black"
        margin="0 auto"
        p={5}
        width={{
          base: "calc(100% - 40px)",
          xl: "50%",
        }}
      >
        {/* Conditional rendering based on currentTab state */}
        {currentTab === "login" && <Login changeTab={changeTab} />}
        {currentTab === "register" && (
          <Register setRegisterEmail={setRegisterEmail} changeTab={changeTab} />
        )}
        {currentTab === "forgetPassword" && (
          <ForgetPassword changeTab={changeTab} />
        )}
        {currentTab === "verify" && (
          <VerifyPage changeTab={changeTab} registerEmail={registerEmail} />
        )}
      </Box>

      <Link to="/ww-register">
        <Box
          color={appColorTheme.brown_2}
          textDecor={"underline"}
          cursor={"pointer"}
          margin="0 auto"
          mt={6}
          width={{
            base: "calc(100% - 40px)",
            xl: "50%",
          }}
          textAlign={"center"}
        >
          Đăng ký trở thành thợ mộc
        </Box>
      </Link>
    </>
  );
}

export default AuthPage;
