// src/api/user.api.ts
import axiosInstance from "../utils/axiosInstance";

interface AuthResponse {
  statusCode: number;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  };
  message: string;
  success: boolean;
}

interface LogoutResponse {
  statusCode: number;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  message: string;
  success: boolean;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/login", { email, password });
  localStorage.setItem("accessToken", data.data.accessToken);
  return data;
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/register", { name, email, password });
  localStorage.setItem("accessToken", data.data.accessToken);
  return data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  const { data } = await axiosInstance.post<LogoutResponse>("/auth/logout");
  localStorage.removeItem("accessToken");
  return data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const { data } = await axiosInstance.get<AuthResponse>("/auth/me");
  return data;
};