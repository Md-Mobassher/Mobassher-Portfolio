// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/publications";

export const publicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPublication: build.mutation({
      query: (publicationData) => ({
        url: `${URL}`,
        method: "POST",
        data: publicationData,
      }),
      invalidatesTags: [tagTypes.publication],
    }),
    getAllPublications: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.publication],
    }),
    getPublicationById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.event],
    }),
    updatePublication: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.publication],
    }),
    deletePublication: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.publication],
    }),
  }),
});

export const {
  useCreatePublicationMutation,
  useGetAllPublicationsQuery,
  useGetPublicationByIdQuery,
  useUpdatePublicationMutation,
  useDeletePublicationMutation,
} = publicationApi;
