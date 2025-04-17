import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const shipmentApi = createApi({
  reducerPath: "shipmentApi",
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
    getShipmentsByServiceOrderId: builder.query({
      query: (serviceOrderId) => ({
        url: `/api/v1/Shipment/service-order/${serviceOrderId}`,
      }),
    }),
    updateShipmentOrderCode: builder.mutation({
      query: ({ serviceOrderId, orderCode }) => ({
        url: `/api/v1/Shipment/service-order/${serviceOrderId}`,
        method: "PUT",
        body: { orderCode },
      }),
    }),

    // New endpoints for guarantee orders
    getShipmentsByGuaranteeOrderId: builder.query({
      query: (guaranteeOrderId) => ({
        url: `/api/v1/Shipment/guarantee-order/${guaranteeOrderId}`,
      }),
    }),
    updateGuaranteeOrderShipmentOrderCode: builder.mutation({
      query: ({ guaranteeOrderId, ...body }) => ({
        url: `/api/v1/Shipment/guarantee-order/${guaranteeOrderId}`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetShipmentsByServiceOrderIdQuery,
  useUpdateShipmentOrderCodeMutation,
  useGetShipmentsByGuaranteeOrderIdQuery,
  useUpdateGuaranteeOrderShipmentOrderCodeMutation,
} = shipmentApi;
