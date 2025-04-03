import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const orderProgressApi = createApi({
  reducerPath: "orderProgressApi",
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
    getAllOrderProgressByOrderId: builder.query({
      query: (id) => ({
        url: `/api/v1/OderProgress/getAllOrderProgressByOrderId/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOrderProgressByOrderIdQuery } = orderProgressApi;
