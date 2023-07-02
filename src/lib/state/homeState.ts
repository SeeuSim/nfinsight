import { create } from "zustand";

interface HomeState {
  rank: string;
  duration: string;
  set: (newValue: string, modType: "rank" | "duration") => void;
}

export const useHomeState = create<HomeState>()((set) => ({
  rank: "avg_price",
  duration: "DURATION_1_DAY",
  set: (newValue, modType) =>
    set((state) => {
      if (modType === "duration") {
        return {
          ...state,
          duration: newValue,
        };
      }
      return {
        ...state,
        rank: newValue,
      };
    }),
}));
