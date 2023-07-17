import { create } from "zustand";

interface IHomeState {
  rank: string;
  duration: string;
  label: string;
  set: (newValue: string, modType: "rank" | "duration") => void;
  setLabel: (newLabel: string) => void;
}

export const useHomeState = create<IHomeState>()((set) => ({
  rank: "avg_price",
  duration: "DURATION_1_DAY",
  label: "Average Price",
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
  setLabel: (newLabel) => set((state) => ({ ...state, label: newLabel })),
}));
