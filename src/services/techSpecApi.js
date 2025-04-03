import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const techSpecApi = createApi({
  reducerPath: "techSpecApi",
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
    getAllTechSpec: builder.query({
      query: () => ({
        url: "/api/v1/tech-spec/listAllTechSpec",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllTechSpecQuery } = techSpecApi;
