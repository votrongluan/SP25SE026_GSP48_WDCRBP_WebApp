import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
    getAllNestedCategory: builder.query({
      query: () => ({
        url: "/api/v1/Category/nested",
        method: "GET",
      }),
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "/api/v1/Category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllNestedCategoryQuery, useGetAllCategoryQuery } =
  categoryApi;
