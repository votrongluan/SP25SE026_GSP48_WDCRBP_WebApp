import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const walletApi = createApi({
  reducerPath: "walletApi",
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
    getUserWallet: builder.query({
      query: (userId) => ({
        url: `/api/wallet/user/${userId}`,
        method: "GET",
      }),
    }),
    updateWallet: builder.mutation({
      query: (data) => ({
        url: "/api/wallet/update",
        method: "PUT",
        body: data,
      }),
    }),
    servicePackPayment: builder.mutation({
      query: (data) => ({
        url: "/api/wallet/service/pack/payment",
        method: "POST",
        body: data,
      }),
    }),
    orderPayment: builder.mutation({
      query: (data) => ({
        url: "/api/wallet/order/payment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserWalletQuery,
  useUpdateWalletMutation,
  useServicePackPaymentMutation,
  useOrderPaymentMutation,
} = walletApi;
