import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const postApi = createApi({
  reducerPath: "postApi",
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
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPostById: builder.query({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "GET",
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/posts/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "DELETE",
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: `/api/v1/posts`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/api/v1/posts`,
        method: "POST",
        body: data,
      }),
    }),
    getWoodworkerPosts: builder.query({
      query: (wwId) => ({
        url: `/api/v1/posts/woodworker/${wwId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetWoodworkerPostsQuery,
} = postApi;
