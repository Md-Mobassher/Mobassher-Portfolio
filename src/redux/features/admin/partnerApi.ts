// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/partners";

export const partnerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPartner: build.mutation({
      query: (partnerData) => ({
        url: `${URL}`,
        method: "POST",
        data: partnerData,
      }),
      invalidatesTags: [tagTypes.partner],
    }),
    getAllPartners: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.partner],
    }),
    getPartnerById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.partner],
    }),
    updatePartner: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.partner],
    }),
    deletePartner: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.partner],
    }),
  }),
});

export const {
  useCreatePartnerMutation,
  useGetAllPartnersQuery,
  useGetPartnerByIdQuery,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
