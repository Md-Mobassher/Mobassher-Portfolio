// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/tags";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTag: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.tag],
    }),
    getAllTags: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tag],
    }),
    getTagById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.tag],
    }),
    updateTag: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.tag],
    }),
    deleteTag: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.tag],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useGetAllTagsQuery,
  useGetTagByIdQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;
