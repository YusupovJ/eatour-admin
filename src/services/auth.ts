import { Api } from "@api/axios";
import { baseURL, urls } from "@constants/urls";
import axios from "axios";
import { IAdmin, IApiResponse, ILogin, ITokens } from "src/types";

export const fetchLogin = async (dto: ILogin) => {
  const res = await Api.post<void, IApiResponse<ITokens>>(urls.admin.login, dto);
  return res.data;
};

export const fetchRefresh = async (refreshToken: string) => {
  const { data } = await axios.post<IApiResponse<ITokens>>(baseURL + urls.admin.refresh, {
    refreshToken,
  });
  return data.data;
};

export const fetchLogout = async () => {
  const res = await Api.post<void, IApiResponse<string>>(urls.admin.logout);
  return res.data;
};

export const fetchAllAdmins = async () => {
  return await Api.get<void, IApiResponse<IAdmin[]>>(urls.admin.getAll, {
    params: {
      page: 1,
      limit: 15,
    },
  });
};
