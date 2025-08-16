// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/research";

export const researchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createResearch: build.mutation({
      query: (researchData) => ({
        url: `${URL}`,
        method: "POST",
        data: researchData,
      }),
      invalidatesTags: [tagTypes.research],
    }),
    getAllResearches: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.research],
    }),
    getResearchById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.research],
    }),
    updateResearch: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.research],
    }),
    deleteResearch: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.research],
    }),
  }),
});

export const {
  useCreateResearchMutation,
  useGetAllResearchesQuery,
  useGetResearchByIdQuery,
  useUpdateResearchMutation,
  useDeleteResearchMutation,
} = researchApi;
