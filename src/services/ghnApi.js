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

    // Lấy danh sách tỉnh/thành thành value và label
    getAllProvinceSelect: builder.query({
      query: () => "/api/v1/GHNApi/provinces",
      transformResponse: (response) => {
        if (!response?.data) return [];
        return response.data.data.map((province) => ({
          value: province.ProvinceID,
          label: province.ProvinceName,
        }));
      },
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

    // Get available shipping services
    getAvailableServices: builder.mutation({
      query: (data) => ({
        url: "/api/v1/GHNApi/services",
        method: "POST",
        body: data,
      }),
    }),

    // Tính phí vận chuyển
    calculateShippingFee: builder.mutation({
      query: (data) => ({
        url: "/api/v1/GHNApi/calculate-fee",
        method: "POST",
        body: data,
      }),
    }),

    // Create shipment for service order
    createShipmentForServiceOrder: builder.mutation({
      query: ({ serviceOrderId, data }) => ({
        url: `/api/v1/GHNApi/service-order/${serviceOrderId}`,
        method: "POST",
        body: data,
      }),
    }),

    // Track order by order code
    trackOrderByCode: builder.mutation({
      query: (data) => ({
        url: "/api/v1/GHNApi/order-code",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProvinceQuery,
  useGetAllProvinceSelectQuery,
  useGetDistrictByProvinceIdQuery,
  useGetWardByDistrictIdQuery,
  useGetAvailableServicesMutation,
  useCalculateShippingFeeMutation,
  useCreateShipmentForServiceOrderMutation,
  useTrackOrderByCodeMutation,
} = ghnApi;
