import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const designIdeaApi = createApi({
  reducerPath: "designIdeaApi",
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
  tagTypes: ["DesignIdea"],
  endpoints: (builder) => ({
    // Thêm design idea mới
    addDesignIdea: builder.mutation({
      query: (data) => ({
        url: "/api/v1/designIdea/addDesignIdea",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DesignIdea"],
    }),

    // Lấy design idea variant theo design ID
    getDesignIdeaVariant: builder.query({
      query: (designId) =>
        `/api/v1/designIdea/getDesignIdeaVariantByDesignId/${designId}`,
      providesTags: ["DesignIdea"],
    }),

    // Lấy design idea theo ID
    getDesignById: builder.query({
      query: (id) => `/api/v1/designIdea/getDesignById/${id}`,
      providesTags: ["DesignIdea"],
    }),

    // Lấy tất cả design idea theo woodworker ID
    getAllDesignIdeasByWoodworker: builder.query({
      query: (wwId) => `/api/v1/designIdea/getAllDesignIdeasByWWId/${wwId}`,
      providesTags: ["DesignIdea"],
    }),

    // Lấy tất cả design idea
    getAllDesignIdeas: builder.query({
      query: () => "/api/v1/designIdea/getAllDesignIdea",
      providesTags: ["DesignIdea"],
    }),
  }),
});

export const {
  useAddDesignIdeaMutation,
  useGetDesignIdeaVariantQuery,
  useGetDesignByIdQuery,
  useGetAllDesignIdeasByWoodworkerQuery,
  useGetAllDesignIdeasQuery,
} = designIdeaApi;
