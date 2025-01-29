import { AxiosResponse } from "axios";

export const responseInterceptor = async (response: AxiosResponse) => {
  return response.data;
};
