import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const woodworkerApi = createApi({
  reducerPath: "woodworkerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["WoodworkerProfile"],
  endpoints: (builder) => ({
    // Get list of woodworkers
    listWoodworkers: builder.query({
      query: () => "/api/v1/ww/listWW",
      providesTags: ["WoodworkerProfile"],
    }),

    // Get woodworker by ID
    getWoodworkerById: builder.query({
      query: (wwId) => `/api/v1/ww/listWW/${wwId}`,
      providesTags: ["WoodworkerProfile"],
    }),

    // Register new woodworker
    registerWoodworker: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/ww-register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WoodworkerProfile"],
    }),

    // Update woodworker status
    updateWoodworkerStatus: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ww/ww-update-status",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["WoodworkerProfile"],
    }),
  }),
});

export const {
  useListWoodworkersQuery,
  useGetWoodworkerByIdQuery,
  useRegisterWoodworkerMutation,
  useUpdateWoodworkerStatusMutation,
} = woodworkerApi;
