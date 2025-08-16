// File: src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userRegister: build.mutation({
      query: (registerData) => ({
        url: `${URL}/register`,
        method: "POST",
        data: registerData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    verifyEmail: build.mutation({
      query: (verifyData) => ({
        url: `${URL}/verify-email`,
        method: "POST",
        data: verifyData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resendOTP: build.mutation({
      query: (data) => ({
        url: `${URL}/resend-otp`,
        method: "POST",
        data: data,
      }),
    }),
    changeEmail: build.mutation({
      query: (data) => ({
        url: `${URL}/change-email`,
        method: "POST",
        data: data,
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: `${URL}/change-password`,
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    refreshToken: build.mutation({
      query: (data) => ({
        url: `${URL}/refresh-token`,
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: `${URL}/forgot-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: build.mutation({
      query: ({ resetData, token }) => ({
        url: `${URL}/reset-password`,
        method: "POST",
        data: resetData,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useVerifyEmailMutation,
  useResendOTPMutation,
  useChangeEmailMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
