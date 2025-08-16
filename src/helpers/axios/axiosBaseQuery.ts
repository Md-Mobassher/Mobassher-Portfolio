/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { instance as axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, contentType }) => {
    // console.log({ baseUrl, url, method, data, params, headers, contentType });
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...(headers || {}),
          "Content-Type": contentType || "application/json",
        },
      });
      // console.log(result);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      // console.log("axiosError", err);
      return {
        error: {
          status: err.response?.status || err.status || 500,
          message: err.response?.data || err.message || "Something went wrong!",
        },
      };
    }
  };
