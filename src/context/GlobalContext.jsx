import { createContext } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
