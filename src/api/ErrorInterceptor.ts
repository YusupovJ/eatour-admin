import { message } from "antd";

export const errorInterceptor = async (error: any) => {
  const originalConfig = error.config;

  if (error.message === "Network Error") {
    message.error("Network error");
    return Promise.reject(new Error("Network Error"));
  }

  const refreshToken = localStorage.getItem("refreshToken");

  if (error.response.status === 401 && refreshToken !== null && !originalConfig._retry) {
    /* Refersh logic */
  } else if (error.response?.data.message === "INVALID_JWT") {
    window.location.href = "/logout";
  }

  return Promise.reject(error);
};
