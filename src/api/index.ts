import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery, useMutation } from "react-query";
import { handleEncrypted } from "@lib/encrypt";
import { Api, MediaApi } from "./axios";
import { IApiResponse, QueryOptions } from "src/types";

interface IEditData<T> {
  url: string;
  item: T;
}

const useGetList = <T>(key: string, url: string, config?: AxiosRequestConfig, options?: QueryOptions) => {
  const get = async () => {
    const data = await Api.get<void, IApiResponse<T>>(url, config);
    return data;
  };
  return useQuery(key, () => get(), options);
};

const useCreate = <T, U, V = Error>(url: string) => {
  return useMutation<IApiResponse<U>, AxiosError<V>, T>(async (body) => {
    const data = await Api.post<void, IApiResponse<U>>(url, body);
    return data;
  });
};

const useUpdate = <T, U, V = Error>() => {
  return useMutation<IApiResponse<U>, AxiosError<V>, IEditData<T>>(async ({ url, item }) => {
    const data: IApiResponse<U> = await Api.patch(url, item);
    return data;
  });
};

const useDeleteApi = <T>(url: string) => {
  return useMutation(async (id: number | string) => {
    const data: T = await Api.delete(`${url}/${id}`);
    return data;
  });
};

// MediaApi
const useCreateMedia = <T, U, V = Error>(url: string) => {
  return useMutation<U, AxiosError<V>, T>(async (body) => {
    const data: AxiosResponse<U> = await MediaApi.post(url, body, {
      headers: {
        "x-auth-key": handleEncrypted(),
      },
    });
    return data.data;
  });
};

const useDeleteMedia = <T>(url: string) => {
  return useMutation(async (item: { key: string }) => {
    const data: AxiosResponse<T> = await MediaApi.post(url, item, {
      headers: {
        "x-auth-key": handleEncrypted(),
      },
    });
    return data.data;
  });
};

export { useGetList, useCreate, useUpdate, useDeleteApi, useCreateMedia, useDeleteMedia };
