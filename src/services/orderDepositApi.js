import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const orderDepositApi = createApi({
  reducerPath: "orderDepositApi",
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
    getAllOrderDepositByOrderId: builder.query({
      query: (id) => ({
        url: `/api/v1/OrderDeposit/service-order/${id}`,
        method: "GET",
      }),
    }),
    getAllOrderDepositByGuaranteeOrderId: builder.query({
      query: (id) => ({
        url: `/api/v1/OrderDeposit/guarantee-order/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllOrderDepositByOrderIdQuery,
  useGetAllOrderDepositByGuaranteeOrderIdQuery,
} = orderDepositApi;
