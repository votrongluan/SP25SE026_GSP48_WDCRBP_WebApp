import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const twilioApi = createApi({
  reducerPath: "twilioApi",
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
    startVerification: builder.mutation({
      query: (data) => ({
        url: "/api/v1/otp/start-verification",
        method: "POST",
        body: data,
      }),
    }),
    checkVerification: builder.mutation({
      query: (data) => ({
        url: "/api/v1/otp/check-verification",
        method: "POST",
        body: data,
      }),
    }),
    fetchVerification: builder.query({
      query: (sid) => ({
        url: `/api/v1/otp/fetch-verification/${sid}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useStartVerificationMutation,
  useCheckVerificationMutation,
  useFetchVerificationQuery,
} = twilioApi;
