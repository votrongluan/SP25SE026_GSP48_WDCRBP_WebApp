import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const contractApi = createApi({
  reducerPath: "contractApi",
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
    getContractByServiceOrderId: builder.query({
      query: (id) => ({
        url: `/api/v1/Contract/getContractByserviceorderId/${id}`,
        method: "GET",
      }),
    }),

    createContractCustomize: builder.mutation({
      query: (data) => ({
        url: "/api/v1/Contract/createContractCustomize",
        method: "POST",
        body: data,
      }),
    }),

    customerSignContract: builder.mutation({
      query: ({ serviceOrderId, customerSign, cusId }) => ({
        url: `/api/v1/Contract/customer-sign?serviceOrderId=${serviceOrderId}&customerSign=${customerSign}&cusId=${cusId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetContractByServiceOrderIdQuery,
  useCreateContractCustomizeMutation,
  useCustomerSignContractMutation,
} = contractApi;
