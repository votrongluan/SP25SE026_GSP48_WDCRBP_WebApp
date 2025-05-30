import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
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
    getAllTransactions: builder.query({
      query: () => ({
        url: "/api/v1/transaction/all",
        method: "GET",
      }),
    }),
    getTransactionById: builder.query({
      query: (transactionId) => ({
        url: `/api/v1/transaction/${transactionId}`,
        method: "GET",
      }),
    }),
    getUserTransactions: builder.query({
      query: (userId) => ({
        url: `/api/v1/transaction/user/${userId}`,
        method: "GET",
      }),
    }),
    getTransactionStatus: builder.query({
      query: () => ({
        url: "/api/v1/transaction/status",
        method: "GET",
      }),
    }),
    updateTransactionStatus: builder.mutation({
      query: (data) => ({
        url: "/api/v1/transaction/update-status",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetUserTransactionsQuery,
  useGetTransactionStatusQuery,
  useUpdateTransactionStatusMutation,
} = transactionApi;
