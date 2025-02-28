import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const cookieAuth = Cookies.get("auth");
    return cookieAuth ? JSON.parse(cookieAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      // Set cookie with an expiration of 5 days
      Cookies.set("auth", JSON.stringify(auth), { expires: 5 });
    } else {
      // Remove the cookie if auth is null
      Cookies.remove("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
