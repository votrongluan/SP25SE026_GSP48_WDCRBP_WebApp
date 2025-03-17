import { Box, Container, Text, useToast } from "@chakra-ui/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import Login from "../../../components/Auth/Login.jsx";
import Register from "../../../components/Auth/Register.jsx";
import ForgetPassword from "../../../components/Auth/ForgetPassword.jsx";
import { useState } from "react";
import VerifyPage from "../Old/VerifyPage.jsx";
import { appColorTheme } from "../../../config/appconfig.js";

function AuthPage() {
  const { auth } = useAuth();

  // Define state to control which component to show
  const [currentTab, setCurrentTab] = useState("login");

  // Redirect if already authenticated
  if (auth) return <Navigate to="/" />;

  // Function to change the current tab
  const changeTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <Container maxW="1200px" as="main">
      <Box
        borderRadius="10px"
        bgColor="white"
        color="black"
        margin="0 auto"
        p="40px"
        width={{
          base: "calc(100% - 40px)",
          xl: "60%",
        }}
      >
        {/* Conditional rendering based on currentTab state */}
        {currentTab === "login" && <Login changeTab={changeTab} />}
        {currentTab === "register" && <Register changeTab={changeTab} />}
        {currentTab === "forgetPassword" && (
          <ForgetPassword changeTab={changeTab} />
        )}
        {currentTab === "verify" && <VerifyPage changeTab={changeTab} />}
      </Box>

      <Box
        margin="8px auto 0"
        width={{
          base: "calc(100% - 40px)",
          xl: "50%",
        }}
      >
        <Text textAlign="right" p="16px" pb="50px">
          Bạn muốn trở thành nhà cung cấp của chúng tôi?{" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            rel="noreferrer"
            target="_blank"
            href="https://www.facebook.com/profile.php?id=61566307373631&locale=vi_VN"
          >
            Liên hệ tại đây
          </a>
        </Text>
      </Box>
    </Container>
  );
}

export default AuthPage;
