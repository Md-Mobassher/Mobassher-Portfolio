// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/persons";

export const committeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCommittee: build.mutation({
      query: (committeeData) => ({
        url: `${URL}`,
        method: "POST",
        data: committeeData,
      }),
      invalidatesTags: [tagTypes.committee],
    }),
    getAllCommittees: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.committee],
    }),
    getCommitteeById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.committee],
    }),
    updateCommittee: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.committee],
    }),
    deleteCommittee: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.committee],
    }),
  }),
});

export const {
  useCreateCommitteeMutation,
  useGetAllCommitteesQuery,
  useGetCommitteeByIdQuery,
  useUpdateCommitteeMutation,
  useDeleteCommitteeMutation,
} = committeeApi;
