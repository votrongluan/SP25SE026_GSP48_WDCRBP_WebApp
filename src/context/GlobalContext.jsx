import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetProvincesQuery,
  useGetDistrictsQuery,
  useGetWardsQuery,
} from "../services/vnLocationApi";
import {
  setProvinces,
  setDistricts,
  setWards,
} from "../slices/vnLocationSlice.js";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Fetch data from API
  const { data: provincesData, isLoading: isLoadingProvinces } =
    useGetProvincesQuery();
  const { data: districtsData, isLoading: isLoadingDistricts } =
    useGetDistrictsQuery();
  const { data: wardsData, isLoading: isLoadingWards } = useGetWardsQuery();

  // Transform and set data to Redux store
  useEffect(() => {
    if (provincesData) {
      const provincesMap = {};
      provincesData.forEach((p) => {
        provincesMap[p.value] = p.label;
      });
      dispatch(setProvinces(provincesMap));
    }
  }, [provincesData, dispatch]);

  useEffect(() => {
    if (districtsData) {
      const districtsMap = {};
      districtsData.forEach((d) => {
        districtsMap[d.value] = d.label;
      });
      dispatch(setDistricts(districtsMap));
    }
  }, [districtsData, dispatch]);

  useEffect(() => {
    if (wardsData) {
      const wardsMap = {};
      wardsData.forEach((w) => {
        wardsMap[w.value] = w.label;
      });
      dispatch(setWards(wardsMap));
    }
  }, [wardsData, dispatch]);

  const value = {
    isLoading: isLoadingProvinces || isLoadingDistricts || isLoadingWards,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
