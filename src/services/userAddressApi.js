import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const userAddressApi = createApi({
  reducerPath: "userAddressApi",
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
    getAllUserAddresses: builder.query({
      query: () => ({
        url: `/api/v1/useraddresses/`,
        method: "GET",
      }),
    }),
    getUserAddressById: builder.query({
      query: (id) => ({
        url: `/api/v1/useraddresses/${id}`,
        method: "GET",
      }),
    }),
    getUserAddressesByUserId: builder.query({
      query: (userId) => ({
        url: `/api/v1/useraddresses/user/${userId}`,
        method: "GET",
      }),
    }),
    createUserAddress: builder.mutation({
      query: (data) => ({
        url: `/api/v1/useraddresses/create`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/useraddresses/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUserAddress: builder.mutation({
      query: (id) => ({
        url: `/api/v1/useraddresses/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserAddressesQuery,
  useGetUserAddressByIdQuery,
  useGetUserAddressesByUserIdQuery,
  useCreateUserAddressMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
} = userAddressApi;
