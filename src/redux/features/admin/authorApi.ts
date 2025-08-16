// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/authors";

export const authorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAuthor: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.author],
    }),
    getAllAuthors: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.author],
    }),
    getAuthorById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.author],
    }),
    updateAuthor: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.author],
    }),
    deleteAuthor: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.author],
    }),
  }),
});

export const {
  useCreateAuthorMutation,
  useGetAllAuthorsQuery,
  useGetAuthorByIdQuery,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorApi;
