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
    addDesignIdea: builder.mutation({
      query: (data) => ({
        url: "/api/v1/designIdea/addDesignIdea",
        method: "POST",
        body: data,
      }),
    }),

    getDesignIdeaVariant: builder.query({
      query: (designId) =>
        `/api/v1/designIdea/getDesignIdeaVariantByDesignId/${designId}`,
    }),

    getDesignById: builder.query({
      query: (id) => `/api/v1/designIdea/getDesignById/${id}`,
    }),

    getAllDesignIdeasByWoodworker: builder.query({
      query: (wwId) => `/api/v1/designIdea/getAllDesignIdeasByWWId/${wwId}`,
    }),

    getAllDesignIdeas: builder.query({
      query: () => "/api/v1/designIdea/getAllDesignIdea",
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
