import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import Cookies from "js-cookie";

export const productApi = createApi({
  reducerPath: "productApi",
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
    // Get all products
    getAllProducts: builder.query({
      query: () => "/api/v1/products",
    }),

    // Get a specific product by ID
    getProductById: builder.query({
      query: (id) => `/api/v1/products/${id}`,
    }),

    // Get products by woodworker ID
    getProductsByWoodworkerId: builder.query({
      query: (id) => `/api/v1/products/woodworker/${id}`,
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/v1/products",
        method: "POST",
        body: data,
      }),
    }),

    // Update a product
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/v1/products/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByWoodworkerIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
