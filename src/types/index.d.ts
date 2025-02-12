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
  description: string;
  image: string;
}

export interface ITestimonial extends IRoot {
  fullName: string;
  title: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface IPlace extends IRoot {
  name: string;
  description: string;
  image: string;
  country: ICountry;
}

export interface IRoute {
  title: string;
  description: string;
}

export interface IExtraPrice {
  title: string;
  value: number | null;
}

export interface ITour extends IRoot {
  title: string;
  description: string;
  images: string[];
  includes: string[];
  excludes: string[];
  routes: IRoute[];
  bookings: number;
  views: number;
  price: number;
  pricePerAdult: number;
  pricePerChild: number;
  place: IPlace;
  extraPrices: [];
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
