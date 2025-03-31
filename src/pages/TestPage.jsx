import { useEffect } from "react";
import { useGetDistrictByProvinceIdQuery } from "../services/ghnApi";
import CategorySearchCombobox from "../components/Utility/CategorySearchCombobox";

const TestPage = () => {
  const data = useGetDistrictByProvinceIdQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <CategorySearchCombobox />
    </>
  );
};

export default TestPage;
