import { create } from "zustand";

interface IAuthStore {
  isAuth: boolean;
  auth: () => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: true,
  auth: () => set(() => ({ isAuth: true })),
  logout: () => set(() => ({ isAuth: false })),
}));
