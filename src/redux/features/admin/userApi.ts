// File: src/redux/features/admin/userApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getMe: build.query({
      query: () => ({
        url: `${USER_URL}/me`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateMyProfile: build.mutation({
      query: (updatedData) => ({
        url: `${USER_URL}/me`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    giveToken: build.mutation({
      query: ({ id, token }) => ({
        url: `${USER_URL}/${id}/give-token`,
        method: "POST",
        data: token,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetMeQuery,
  useUpdateMyProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGiveTokenMutation,
} = userApi;
