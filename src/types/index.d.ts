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
  limit: number | null;
  skip: number;
  totalPages: number;
  total: number;
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
