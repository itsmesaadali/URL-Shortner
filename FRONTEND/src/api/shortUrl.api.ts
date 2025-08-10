import { type AxiosResponse } from "axios";
import axiosInstance from "../utils/axiosInstance";

interface ShortUrlResponse {
  statusCode: number;
  data: {
    short_url: string;
  };
  message: string;
  success: boolean;
}

export const createShortUrl = async (
  url: string
): Promise<AxiosResponse<ShortUrlResponse>> => {
  return await axiosInstance.post<ShortUrlResponse>("/create", { url });
};
