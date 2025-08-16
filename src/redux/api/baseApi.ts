// File: src/redux/api/baseApi.ts
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-Types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
