import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const ghnApi = createApi({
  reducerPath: "ghnApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const cookieAuth = Cookies.get("auth");
      const auth = cookieAuth ? JSON.parse(cookieAuth) : null;

      if (auth?.token) {
        headers.set("authorization", `Bearer ${auth.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Lấy danh sách tỉnh/thành
    getAllProvince: builder.query({
      query: () => ({
        url: "/api/v1/GHNApi/provinces",
        method: "GET",
      }),
    }),

    // Lấy danh sách quận/huyện theo tỉnh/thành
    getDistrictByProvinceId: builder.query({
      query: (provinceId) => ({
        url: `/api/v1/GHNApi/districts/${provinceId}`,
        method: "GET",
      }),
    }),

    // Lấy danh sách phường/xã theo quận/huyện
    getWardByDistrictId: builder.query({
      query: (districtId) => ({
        url: `/api/v1/GHNApi/wards/${districtId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useGetWardByDistrictIdQuery,
} = ghnApi;
