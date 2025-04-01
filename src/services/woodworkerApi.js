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
    listWoodworkers: builder.query({
      query: () => "/api/v1/ww",
    }),

    getWoodworkerById: builder.query({
      query: (wwId) => `/api/v1/ww/${wwId}`,
    }),

    getWoodworkerByUserId: builder.query({
      query: (userId) => `/api/v1/ww/user/${userId}`,
    }),

    getInactiveWoodworkers: builder.query({
      query: () => "/api/v1/ww/inactive",
    }),

    registerWoodworker: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/ww-register",
        method: "POST",
        body: data,
      }),
    }),

    // Update woodworker status
    updateWoodworkerStatus: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/ww-update-status",
        method: "PUT",
        body: data,
      }),
    }),

    addServicePack: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/addServicePack",
        method: "PUT",
        body: data,
      }),
    }),

    addServicePackById: builder.mutation({
      query: ({ wwId, ...data }) => ({
        url: `/api/v1/ww/addServicePack/${wwId}`,
        method: "POST",
        body: data,
      }),
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
