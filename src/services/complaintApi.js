import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const complaintApi = createApi({
  reducerPath: "complaintApi",
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
    getAllComplaints: builder.query({
      query: () => ({
        url: "/api/v1/complaints",
        method: "GET",
      }),
    }),
    getUserComplaints: builder.query({
      query: (userId) => ({
        url: `/api/v1/complaints/user/${userId}`,
        method: "GET",
      }),
    }),
    getServiceOrderComplaints: builder.query({
      query: (id) => ({
        url: `/api/v1/complaints/service-order/${id}`,
        method: "GET",
      }),
    }),
    createComplaint: builder.mutation({
      query: (data) => ({
        url: "/api/v1/complaints",
        method: "POST",
        body: data,
      }),
    }),
    updateComplaintWoodworker: builder.mutation({
      query: (data) => ({
        url: "/api/v1/complaints/woodworker",
        method: "PUT",
        body: data,
      }),
    }),
    updateComplaintStaff: builder.mutation({
      query: (data) => ({
        url: "/api/v1/complaints/staff",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllComplaintsQuery,
  useGetUserComplaintsQuery,
  useGetServiceOrderComplaintsQuery,
  useCreateComplaintMutation,
  useUpdateComplaintWoodworkerMutation,
  useUpdateComplaintStaffMutation,
} = complaintApi;
