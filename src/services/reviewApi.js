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
    createReview: builder.mutation({
      query: (data) => ({
        url: `/api/v1/reviews`,
        method: "POST",
        body: data,
      }),
    }),
    createGuaranteeOrderReview: builder.mutation({
      query: (data) => ({
        url: `/api/v1/reviews/guarantee-order`,
        method: "POST",
        body: data,
      }),
    }),
    updateReviewStatus: builder.mutation({
      query: ({ reviewId, ...body }) => ({
        url: `/api/v1/reviews/${reviewId}/status`,
        method: "PATCH",
        body,
      }),
    }),
    updateReviewResponseStatus: builder.mutation({
      query: ({ reviewId, ...body }) => ({
        url: `/api/v1/reviews/${reviewId}/response-status`,
        method: "PATCH",
        body,
      }),
    }),
    updateReviewResponse: builder.mutation({
      query: (data) => ({
        url: `/api/v1/reviews/response`,
        method: "POST",
        body: data,
      }),
    }),
    getPendingReviews: builder.query({
      query: () => ({
        url: `/api/v1/reviews/status-false`,
        method: "GET",
      }),
    }),
    getPendingWoodworkerResponses: builder.query({
      query: () => ({
        url: `/api/v1/reviews/WWResponse-status-false`,
        method: "GET",
      }),
    }),
    getWoodworkerResponseReviews: builder.query({
      query: (woodworkerId) => ({
        url: `/api/v1/reviews/woodworker/response/${woodworkerId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetWoodworkerReviewsQuery,
  useGetProductReviewsQuery,
  useGetDesignReviewsQuery,
  useCreateReviewMutation,
  useCreateGuaranteeOrderReviewMutation,
  useUpdateReviewStatusMutation,
  useUpdateReviewResponseStatusMutation,
  useUpdateReviewResponseMutation,
  useGetPendingReviewsQuery,
  useGetPendingWoodworkerResponsesQuery,
  useGetWoodworkerResponseReviewsQuery,
} = reviewApi;
