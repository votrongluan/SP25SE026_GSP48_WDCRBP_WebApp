import { Box } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import Login from "../../../components/Auth/Login.jsx";
import Register from "../../../components/Auth/Register.jsx";
import ForgetPassword from "../../../components/Auth/ForgetPassword.jsx";
import { useState } from "react";
import VerifyPage from "../Old/VerifyPage.jsx";

function AuthPage() {
  const { auth } = useAuth();

  const [currentTab, setCurrentTab] = useState("login");

  if (auth) return <Navigate to="/" />;

  // Function to change the current tab
  const changeTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <Box
      borderRadius="10px"
      bgColor="white"
      color="black"
      margin="0 auto"
      p="40px"
      width={{
        base: "calc(100% - 40px)",
        xl: "50%",
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
  );
}

export default AuthPage;
