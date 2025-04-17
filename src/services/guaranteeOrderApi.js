import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const guaranteeOrderApi = createApi({
  reducerPath: "guaranteeOrderApi",
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
    getGuaranteeOrders: builder.query({
      query: (params) => ({
        url: `/api/v1/guarantee-orders`,
        method: "GET",
        params,
      }),
    }),
    createGuaranteeOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/guarantee-orders`,
        method: "POST",
        body: data,
      }),
    }),
    submitFeedback: builder.mutation({
      query: (data) => ({
        url: `/api/v1/guarantee-orders/feedback`,
        method: "POST",
        body: data,
      }),
    }),
    acceptGuaranteeOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/guarantee-orders/accept`,
        method: "POST",
        body: data,
      }),
    }),
    confirmReceiveProduct: builder.mutation({
      query: (data) => ({
        url: `/api/v1/guarantee-orders/receive-confirmation`,
        method: "POST",
        body: data,
      }),
    }),
    finishConfirmation: builder.mutation({
      query: (data) => ({
        url: `/api/v1/guarantee-orders/finish-confirmation`,
        method: "POST",
        body: data,
      }),
    }),
    getGuaranteeOrderById: builder.query({
      query: (id) => `/api/v1/guarantee-orders/${id}`,
    }),
  }),
});

export const {
  useGetGuaranteeOrdersQuery,
  useCreateGuaranteeOrderMutation,
  useSubmitFeedbackMutation,
  useAcceptGuaranteeOrderMutation,
  useGetGuaranteeOrderByIdQuery,
  useConfirmReceiveProductMutation,
  useFinishConfirmationMutation,
} = guaranteeOrderApi;
