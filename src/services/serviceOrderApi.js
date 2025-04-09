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
        url: `/api/v1/service-orders/feedback`,
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
      query: (data) => ({
        url: `/api/v1/service-orders/accept`,
        method: "POST",
        body: data,
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

    addProductImage: builder.mutation({
      query: ({ serviceId, body }) => ({
        url: `/api/v1/service-orders/addProductImage`,
        method: "POST",
        params: { serviceId },
        body: body, // This will be the array of objects
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
  useAddProductImageMutation,
} = serviceOrderApi;
