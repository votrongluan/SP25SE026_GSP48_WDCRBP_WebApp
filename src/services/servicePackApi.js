import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const servicePackApi = createApi({
  reducerPath: "servicePackApi",
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
    getAllServicePacks: builder.query({
      query: () => ({
        url: "/api/v1/service-pack/listActive",
        method: "GET",
      }),
    }),
    getAllServicePacksAdmin: builder.query({
      query: () => ({
        url: "/api/v1/service-pack/list",
        method: "GET",
      }),
    }),
    getServicePackDetail: builder.query({
      query: (id) => ({
        url: `/api/v1/service-pack/detail/${id}`,
        method: "GET",
      }),
    }),
    createServicePack: builder.mutation({
      query: (data) => ({
        url: "/api/v1/service-pack/create",
        method: "POST",
        body: data,
      }),
    }),
    updateServicePack: builder.mutation({
      query: (data) => {
        const { servicePackId, ...updateData } = data;
        return {
          url: `/api/v1/service-pack/update?servicePackId=${servicePackId}`,
          method: "PUT",
          body: updateData,
        };
      },
    }),
    deleteServicePack: builder.mutation({
      query: (id) => ({
        url: `/api/v1/service-pack/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllServicePacksQuery,
  useGetServicePackDetailQuery,
  useCreateServicePackMutation,
  useUpdateServicePackMutation,
  useDeleteServicePackMutation,
  useGetAllServicePacksAdminQuery,
} = servicePackApi;
