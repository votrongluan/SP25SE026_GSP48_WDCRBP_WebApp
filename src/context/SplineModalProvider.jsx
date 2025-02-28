import { useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

const SplineModalContext = createContext({});

export const SplineModalProvider = ({ children }) => {
  const { splineIsOpen, splineOnOpen, splineOnClose } = useDisclosure();

  return (
    <SplineModalContext.Provider
      value={{ splineIsOpen, splineOnOpen, splineOnClose }}
    >
      {children}
    </SplineModalContext.Provider>
  );
};

export default SplineModalContext;
