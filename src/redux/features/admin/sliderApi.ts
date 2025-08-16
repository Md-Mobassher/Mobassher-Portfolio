// File: src/redux/features/admin/favouriteApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/sliders";

export const sliderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSlider: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.slider],
    }),
    getAllSliders: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.slider],
    }),
    getSliderById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.slider],
    }),
    updateSlider: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.slider],
    }),
    deleteSlider: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.slider],
    }),
  }),
});

export const {
  useCreateSliderMutation,
  useGetAllSlidersQuery,
  useGetSliderByIdQuery,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi;
