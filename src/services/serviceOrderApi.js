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
      query: (data) => ({
        url: "/api/v1/service-orders/feedback",
        method: "POST",
        body: data,
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
        serviceOrderId = "a",
        timeMeeting = "a",
        linkMeeting = "a",
        form = "",
        desc = "",
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
