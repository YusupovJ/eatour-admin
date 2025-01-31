export const baseURL = import.meta.env.VITE_API_URL;
export const mediaApiBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL;

export const urls = {
  media: {
    create: "/api/v1/aws",
    delete: "/api/v1/aws/delete",
  },
  admin: {
    create: "/admin",
    getAll: "/admin",
    getOne: (id: number) => `/admin/${id}`,
    login: "/admin/login",
    logout: "/admin/logout",
    refresh: "/admin/refresh",
    delete: (id: number) => `/admin/${id}`,
  },
};
