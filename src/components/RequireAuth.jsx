import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles, children }) => {
  const { auth } = useAuth();

  // Check if allowedRoles is an array and if the user's role exists in that array
  const hasAccess = Array.isArray(allowedRoles)
    ? allowedRoles.includes(auth?.Role)
    : auth?.Role == allowedRoles;

  return hasAccess ? (
    children
  ) : auth?.Role ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default RequireAuth;
