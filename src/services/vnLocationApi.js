import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vnLocationApi = createApi({
  reducerPath: "vnLocationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://provinces.open-api.vn/api",
  }),
  endpoints: (builder) => ({
    // Lấy danh sách tỉnh/thành phố
    getProvinces: builder.query({
      query: () => "/p",
      transformResponse: (response) => {
        return response.map((province) => ({
          value: province.code,
          label: province.name,
          codename: province.codename,
          phone_code: province.phone_code,
        }));
      },
    }),

    // Lấy thông tin tỉnh/thành phố theo mã
    getProvinceByCode: builder.query({
      query: (code) => `/p/${+code}`,
      transformResponse: (response) => ({
        value: response.code,
        label: response.name,
        codename: response.codename,
        phone_code: response.phone_code,
      }),
    }),

    // Lấy danh sách quận/huyện
    getDistricts: builder.query({
      query: () => "/d",
      transformResponse: (response) => {
        return response.map((district) => ({
          value: district.code,
          label: district.name,
          codename: district.codename,
          province_code: district.province_code,
        }));
      },
    }),

    // Lấy thông tin quận/huyện theo mã
    getDistrictByCode: builder.query({
      query: (code) => `/d/${+code}`,
      transformResponse: (response) => ({
        value: response.code,
        label: response.name,
        codename: response.codename,
        province_code: response.province_code,
      }),
    }),

    // Lấy danh sách phường/xã
    getWards: builder.query({
      query: () => "/w",
      transformResponse: (response) => {
        return response.map((ward) => ({
          value: ward.code,
          label: ward.name,
          codename: ward.codename,
          district_code: ward.district_code,
        }));
      },
    }),

    // Lấy thông tin phường/xã theo mã
    getWardByCode: builder.query({
      query: (code) => `/w/${+code}`,
      transformResponse: (response) => ({
        value: response.code,
        label: response.name,
        codename: response.codename,
        district_code: response.district_code,
      }),
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetProvinceByCodeQuery,
  useGetDistrictsQuery,
  useGetDistrictByCodeQuery,
  useGetWardsQuery,
  useGetWardByCodeQuery,
} = vnLocationApi;
