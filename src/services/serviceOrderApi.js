import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const serviceOrderApi = createApi({
  reducerPath: "serviceOrderApi",
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
    sendServiceOrderFeedback: builder.mutation({
      query: ({ serviceOrderId, feedback }) => ({
        url: `/api/v1/service-orders/feedback?serviceOrderId=${serviceOrderId}&feedback=${feedback}`,
        method: "POST",
      }),
    }),

    createPersonalOrder: builder.mutation({
      query: (data) => ({
        url: "/api/v1/service-orders/createPersonalOrder",
        method: "POST",
        body: data,
      }),
    }),

    createCustomizeOrder: builder.mutation({
      query: (data) => ({
        url: "/api/v1/service-orders/createCustomizeOrder",
        method: "POST",
        body: data,
      }),
    }),

    acceptServiceOrder: builder.mutation({
      query: ({
        serviceOrderId = "1",
        timeMeeting = "2025-05-09T18:25",
        linkMeeting = "1",
        form = "1",
        desc = "1",
      }) => ({
        url: `/api/v1/service-orders/accept?serviceOrderId=${serviceOrderId}&timeMeeting=${timeMeeting}&linkMeeting=${linkMeeting}&form=${form}&desc=${desc}`,
        method: "POST",
      }),
    }),

    getServiceOrders: builder.query({
      query: ({ id, role }) => ({
        url: "/api/v1/service-orders/listOrder",
        params: { id, role },
      }),
    }),

    getServiceOrderById: builder.query({
      query: (id) => ({
        url: `/api/v1/service-orders/${id}`,
      }),
    }),
  }),
});

export const {
  useSendServiceOrderFeedbackMutation,
  useCreatePersonalOrderMutation,
  useCreateCustomizeOrderMutation,
  useAcceptServiceOrderMutation,
  useGetServiceOrdersQuery,
  useGetServiceOrderByIdQuery,
} = serviceOrderApi;
