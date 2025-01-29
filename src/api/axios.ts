import axios from "axios";
import { errorInterceptor } from "./ErrorInterceptor";
import { responseInterceptor } from "./ResponseInterceptor";
import { baseURL, mediaApiBaseUrl } from "@constants/urls";

export const Api = axios.create({
  baseURL,
});

export const MediaApi = axios.create({
  baseURL: mediaApiBaseUrl,
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);
