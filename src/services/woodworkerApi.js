import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const woodworkerApi = createApi({
  reducerPath: "woodworkerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const cookieAuth = Cookies.get("auth");
      const auth = cookieAuth ? JSON.parse(cookieAuth) : null;

      if (auth && auth?.token) {
        headers.set("authorization", `Bearer ${auth?.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["WoodworkerProfile", "ServicePack"],
  endpoints: (builder) => ({
    // Get list of woodworkers
    listWoodworkers: builder.query({
      query: () => "/api/v1/ww",
      providesTags: ["WoodworkerProfile"],
    }),

    // Get woodworker by ID
    getWoodworkerById: builder.query({
      query: (wwId) => `/api/v1/ww/${wwId}`,
      providesTags: ["WoodworkerProfile"],
    }),

    // Get woodworker by userId
    getWoodworkerByUserId: builder.query({
      query: (userId) => `/api/v1/ww/user/${userId}`,
      providesTags: ["WoodworkerProfile"],
    }),

    // Get inactive woodworkers
    getInactiveWoodworkers: builder.query({
      query: () => "/api/v1/ww/inactive",
      providesTags: ["WoodworkerProfile"],
    }),

    // Register new woodworker
    registerWoodworker: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/ww-register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WoodworkerProfile"],
    }),

    // Update woodworker status
    updateWoodworkerStatus: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/ww-update-status",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["WoodworkerProfile"],
    }),

    // Add service pack
    addServicePack: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/addServicePack",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ServicePack", "WoodworkerProfile"],
    }),

    // Add service pack by woodworker ID
    addServicePackById: builder.mutation({
      query: ({ wwId, ...data }) => ({
        url: `/api/v1/ww/addServicePack/${wwId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServicePack", "WoodworkerProfile"],
    }),
  }),
});

export const {
  useListWoodworkersQuery,
  useGetWoodworkerByUserIdQuery,
  useGetWoodworkerByIdQuery,
  useGetInactiveWoodworkersQuery,
  useRegisterWoodworkerMutation,
  useUpdateWoodworkerStatusMutation,
  useAddServicePackMutation,
  useAddServicePackByIdMutation,
} = woodworkerApi;
