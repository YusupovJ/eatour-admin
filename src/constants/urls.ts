export const baseURL = import.meta.env.VITE_API_URL;
export const mediaApiBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL;

export const urls = {
  media: {
    create: "/api/v1/aws",
    delete: "/api/v1/aws/delete",
    multiple: "/api/v1/aws/multiple",
  },
  admin: {
    create: "/admin",
    getAll: "/admin",
    getOne: (id: number) => `/admin/${id}`,
    login: "/admin/login",
    logout: "/admin/logout",
    refresh: "/admin/refresh",
    delete: "/admin",
  },
  country: {
    create: "/country",
    getAll: "/country",
    remove: "/country",
    update: (id: number) => `/country/${id}`,
    getOne: (id: number) => `/country/${id}`,
  },
  place: {
    create: "/place",
    getAll: "/place",
    remove: "/place",
    update: (id: number) => `/place/${id}`,
    getOne: (id: number) => `/place/${id}`,
  },
  tour: {
    create: "/tour",
    getAll: "/tour",
    remove: "/tour",
    update: (id: number) => `/tour/${id}`,
    getOne: (id: number) => `/tour/${id}`,
  },
  testimonial: {
    create: "/testimonial",
    getAll: "/testimonial",
    remove: "/testimonial",
    update: (id: number) => `/testimonial/${id}`,
    getOne: (id: number) => `/testimonial/${id}`,
  },
};
