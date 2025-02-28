import { Box, List, ListItem } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import BrandLogo from "./BrandLogo.jsx";

export default function SupplierSideBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const navLinkStyle = ({ isActive }) => {
    return {
      display: "block",
      color: isActive ? "#3A6AFD" : null,
      paddingTop: "20px",
      paddingBottom: "20px",
      cursor: "pointer",
    };
  };

  return (
    <>
      <BrandLogo />

      <List mt="20px" fontSize="1.2em">
        <ListItem
          transition="margin ease 0.3s"
          _hover={{
            color: "app_brown.0",
            ml: "8px",
          }}
        >
          <NavLink style={navLinkStyle} to={`dashboard`}>
            Tổng quan
          </NavLink>
        </ListItem>

        <ListItem
          transition="margin ease 0.3s"
          _hover={{
            color: "app_brown.0",
            ml: "8px",
          }}
        >
          <NavLink style={navLinkStyle} to={`task`}>
            Đơn in đang chờ
          </NavLink>
        </ListItem>

        <ListItem
          transition="margin ease 0.3s"
          _hover={{
            color: "app_brown.0",
            ml: "8px",
          }}
        >
          <NavLink style={navLinkStyle} to={`own`}>
            Đơn hàng đã nhận
          </NavLink>
        </ListItem>

        {/* <ListItem
          transition="margin ease 0.3s"
          _hover={{
            color: "app_brown.0",
            ml: "8px",
          }}
        >
          <NavLink style={navLinkStyle} to={`/`}>
            Quay về trang chủ
          </NavLink>
        </ListItem> */}

        <ListItem
          transition="margin ease 0.3s"
          _hover={{
            color: "app_brown.0",
            ml: "8px",
          }}
        >
          <Box
            onClick={() => {
              setAuth(null);
              navigate("/auth");
            }}
            style={navLinkStyle(false)}
          >
            Đăng xuất{" "}
          </Box>
        </ListItem>
      </List>
    </>
  );
}
