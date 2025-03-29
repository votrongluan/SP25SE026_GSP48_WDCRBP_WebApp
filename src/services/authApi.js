import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const authApi = createApi({
  reducerPath: "authApi",
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
    loginWithPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    loginWithOTP: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login-otp",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => {
        const cookieAuth = Cookies.get("auth");
        const auth = cookieAuth ? JSON.parse(cookieAuth) : null;

        return {
          url: "/api/v1/auth/refresh-token",
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth?.refreshToken}`,
          },
        };
      },
    }),
    sendOTP: builder.mutation({
      query: (email) => ({
        url: `/api/v1/auth/send-otp?email=${email}`,
        method: "POST",
      }),
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/verification-otp",
        method: "POST",
        body: data,
      }),
    }),
    getUserInformation: builder.query({
      query: (id) => `/api/v1/user/getUserInformationById/${id}`,
    }),
  }),
});

export const {
  useLoginWithPasswordMutation,
  useLoginWithOTPMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useGetUserInformationQuery,
} = authApi;
