import { useContext } from "react";
import SplineModalContext from "../context/SplineModalProvider.jsx";

const useSplineModal = () => {
  return useContext(SplineModalContext);
};

export default useSplineModal;
