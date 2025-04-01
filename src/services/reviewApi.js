import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
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
    getWoodworkerReviews: builder.query({
      query: (id) => ({
        url: `/api/v1/reviews/woodworker/${id}`,
        method: "GET",
      }),
    }),
    getProductReviews: builder.query({
      query: (id) => ({
        url: `/api/v1/reviews/product/${id}`,
        method: "GET",
      }),
    }),
    getDesignReviews: builder.query({
      query: (id) => ({
        url: `/api/v1/reviews/design/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetWoodworkerReviewsQuery,
  useGetProductReviewsQuery,
  useGetDesignReviewsQuery,
} = reviewApi;
