import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const availableServiceApi = createApi({
  reducerPath: "availableServiceApi",
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
    getAvailableServiceByWwId: builder.query({
      query: (wwId) => ({
        url: `/api/v1/AvailableService/getAvailableServiceByWwId/${wwId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAvailableServiceByWwIdQuery } = availableServiceApi;
