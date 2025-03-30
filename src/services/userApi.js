import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
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
    getUserInformation: builder.query({
      query: (id) => ({
        url: `/api/v1/user/getUserInformationById/${id}`,
        method: "GET",
      }),
    }),
    updateUserInformation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/user/updateUserInformation/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/api/v1/user/change-password/${userId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserInformationQuery,
  useUpdateUserInformationMutation,
  useChangePasswordMutation,
} = userApi;
