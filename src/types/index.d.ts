import { UseQueryOptions } from "react-query";

export interface IApiResponse<T> {
  data: T;
  pagination: IPagination | null;
  status: number;
}
export interface IRoot {
  id: number;
  createdAt: string;
  updatedAt: string;
}
export interface IPagination {
  page: number;
  limit?: number;
  skip: number;
  totalPages: number;
  total: number;
}
export interface IAdmin extends IRoot {
  login: string;
}
export interface ICountry extends IRoot {
  name: string;
}

export interface IMenu {
  id: number;
  path: string;
  title: string;
  icon?: ReactElement;
}

export interface IData extends IMenu {
  children?: IMenu[];
}

export interface ILogin {
  login: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type QueryOptions = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">;
