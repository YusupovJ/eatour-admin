import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "react-query";
import { handleEncrypted } from "@lib/encrypt";
import { Api, MediaApi } from "./axios";

interface IEditData<T> {
  url: string;
  item: T;
}

const useGetList = <T>(key: string | [string, string], url: string) => {
  const get = async () => {
    const urlQuery = Array.isArray(key) ? url + key[1] : url;
    const data: T = await Api.get(`${urlQuery}`);
    return data;
  };
  return useQuery(key, () => get());
};

const useCustomGetQuery = <T>(key: string | [string, string], url: string) => {
  const get = async () => {
    const data = await Api.get<T>(url);
    return data;
  };

  return useQuery(key, get);
};

const useCreate = <T, U, V = Error>(url: string) => {
  return useMutation<U, AxiosError<V>, T>(async (body) => {
    const data: U = await Api.post(url, body);
    return data;
  });
};

const useUpdate = <T, U>() => {
  return useMutation(async ({ url, item }: IEditData<T>) => {
    const data: U = await Api.patch(`${url}`, item);
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
    const data: AxiosResponse<U> = await MediaApi.post(`${url}`, body, {
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

export { useGetList, useCreate, useUpdate, useDeleteApi, useCustomGetQuery, useCreateMedia, useDeleteMedia };
