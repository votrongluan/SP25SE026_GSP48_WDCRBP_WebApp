import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  useGetAllProvinceQuery,
  useGetDistrictByProvinceIdQuery,
} from "../services/ghnApi";

const TestPage = () => {
  const data = useGetDistrictByProvinceIdQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <></>;
};

export default TestPage;
