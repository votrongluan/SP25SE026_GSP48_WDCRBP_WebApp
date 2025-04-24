import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const serviceDepositApi = createApi({
  reducerPath: "serviceDepositApi",
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
    getAllServiceDeposits: builder.query({
      query: () => ({
        url: `/api/v1/service-deposits/all`,
        method: "GET",
      }),
    }),
    updateServiceDeposit: builder.mutation({
      query: (data) => ({
        url: `/api/v1/service-deposits/update-percent`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllServiceDepositsQuery,
  useUpdateServiceDepositMutation,
} = serviceDepositApi;
