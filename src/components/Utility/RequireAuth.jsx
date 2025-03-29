import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const RequireAuth = ({ allowedRoles, children }) => {
  const { auth } = useAuth();

  const hasAccess = Array.isArray(allowedRoles)
    ? allowedRoles.includes(auth?.role)
    : auth?.role == allowedRoles;

  return hasAccess ? (
    children
  ) : auth?.role ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default RequireAuth;
