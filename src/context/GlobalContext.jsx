import { createContext } from "react";
import { useDispatch } from "react-redux";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
