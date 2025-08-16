// File: src/redux/features/admin/videoApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const VIDEO_URL = "/videos";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVideo: build.mutation({
      query: (videoData) => ({
        url: `${VIDEO_URL}`,
        method: "POST",
        data: videoData,
      }),
      invalidatesTags: [tagTypes.video],
    }),
    getAllVideos: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${VIDEO_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.video],
    }),
    getVideoById: build.query({
      query: (id) => ({
        url: `${VIDEO_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.video],
    }),
    updateVideo: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${VIDEO_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.video],
    }),
    deleteVideo: build.mutation({
      query: (id) => ({
        url: `${VIDEO_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.video],
    }),
  }),
});

export const {
  useCreateVideoMutation,
  useGetAllVideosQuery,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
