import { type AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

export interface ShortUrlItem {
  _id: string;
  full_url: string;
  short_url: string;
  clicks: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ShortUrlResponse {
  statusCode: number;
  data: {
    short_url: string;
  };
  message: string;
  success: boolean;
}

interface UserUrlsResponse {
  statusCode: number;
  data: {
    urls:ShortUrlItem[];
    count?:number;
  };
  message: string;
  success: boolean;
}

export const createShortUrl = async (
  url: string
): Promise<AxiosResponse<ShortUrlResponse>> => {
  return await axiosInstance.post<ShortUrlResponse>("/create", { url });
};

export const customUrl = async (
  url: string , slug?:string
): Promise<AxiosResponse<ShortUrlResponse>> => {
  return await axiosInstance.post<ShortUrlResponse>("/create/custom", { url, slug });
};

export const getUserUrls = async (): Promise<AxiosResponse<UserUrlsResponse>> => {
  return await axiosInstance.get<UserUrlsResponse>("/allUrls");
};