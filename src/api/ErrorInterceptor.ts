import { fetchRefresh } from "@services/auth";
import { message } from "antd";
import { Api } from "./axios";

export const errorInterceptor = async (error: any) => {
  const originalConfig = error.config;

  if (error.message === "Network Error") {
    message.error("Network error");
    return Promise.reject(new Error("Network Error"));
  }

  const refreshToken = localStorage.getItem("refreshToken");

  if (error.response.status === 401 && refreshToken !== null && !originalConfig._retry) {
    originalConfig._retry = true;

    const data = await fetchRefresh(refreshToken);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return Api.request(originalConfig);
  }

  return Promise.reject(error);
};
