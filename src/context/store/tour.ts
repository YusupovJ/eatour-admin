import { create } from "zustand";
import { IExtraPrice, IRoute } from "src/types";

interface ITourDto {
  title: string;
  description: string;
  images: string[];
  includes: string[];
  excludes: string[];
  routes: IRoute[];
  placeId: number;
  price: number;
  pricePerChild: number;
  pricePerAdult: number;
  extraPrices: IExtraPrice[];
}

interface TourStore {
  tour: ITourDto | null;
  setTour: (tour: ITourDto | null) => void;
}

export const useTourStore = create<TourStore>((set) => ({
  tour: null,
  setTour: (tour) => set({ tour }),
}));
