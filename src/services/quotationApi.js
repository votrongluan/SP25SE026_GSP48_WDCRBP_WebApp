import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const quotationApi = createApi({
  reducerPath: "quotationApi",
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
    saveQuotationDetails: builder.mutation({
      query: (data) => ({
        url: `/api/v1/quotation/save-quotation-details`,
        method: "POST",
        body: data,
      }),
    }),
    getByServiceOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/quotation/get-by-service-order`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveQuotationDetailsMutation, useGetByServiceOrderMutation } =
  quotationApi;
