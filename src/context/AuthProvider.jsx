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
      Cookies.set("auth", JSON.stringify(auth), { expires: 5 });
    } else {
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
