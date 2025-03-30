import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const decryptApi = createApi({
  reducerPath: "decryptApi",
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
    decryptData: builder.query({
      query: (data) => ({
        url: `/api/v1/decrypt/decrypt-data?value=${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useDecryptDataQuery } = decryptApi;
