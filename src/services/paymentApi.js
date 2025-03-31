import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
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
    topUpWallet: builder.mutation({
      query: (data) => ({
        url: "/api/v1/payment/top-up-wallet",
        method: "POST",
        body: data,
      }),
    }),
    payServicePack: builder.mutation({
      query: (data) => ({
        url: "/api/v1/payment/pay-service-pack",
        method: "POST",
        body: data,
      }),
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/api/v1/payment/create-payment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useTopUpWalletMutation,
  usePayServicePackMutation,
  useCreatePaymentMutation,
} = paymentApi;
