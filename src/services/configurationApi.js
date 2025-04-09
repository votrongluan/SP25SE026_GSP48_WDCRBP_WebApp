import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const configurationApi = createApi({
  reducerPath: "configurationApi",
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
    updateConfiguration: builder.mutation({
      query: (data) => ({
        url: `/api/v1/configuration/update`,
        method: "PUT",
        body: data,
      }),
    }),
    getConfigurationByDescription: builder.mutation({
      query: (data) => ({
        url: `/api/v1/configuration/getByDescription`,
        method: "POST",
        body: data,
      }),
    }),
    getAllConfigurations: builder.query({
      query: () => ({
        url: `/api/v1/configuration/getAll`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateConfigurationMutation,
  useGetConfigurationByDescriptionMutation,
  useGetAllConfigurationsQuery,
} = configurationApi;
