import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Lấy token từ state
      const token = getState()?.auth?.token;

      // Nếu có token thì thêm vào header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
    register: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getUserInformation: builder.query({
      query: (id) => `/api/v1/auth/getUserInformationById/${id}`,
      transformResponse: (response) => {
        // Transform response nếu cần
        return response.data;
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useLoginWithPasswordMutation,
  useRegisterMutation,
  useGetUserInformationQuery,
} = authApi;
