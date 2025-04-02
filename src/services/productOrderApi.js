import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const productOrderApi = createApi({
  reducerPath: "productOrderApi",
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
    createProductOrder: builder.mutation({
      query: (data) => ({
        url: "/api/v1/product-orders/create",
        method: "POST",
        body: data,
      }),
    }),

    getProductOrders: builder.query({
      query: ({ id, role }) => ({
        url: "/api/v1/product-orders/listOrder",
        params: { id, role },
      }),
    }),
  }),
});

export const { useCreateProductOrderMutation, useGetProductOrdersQuery } =
  productOrderApi;
