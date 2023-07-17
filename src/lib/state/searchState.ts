import { create } from "zustand";

interface ISearchQueryState {
  searchValue: string;
  setSearchValue: (newValue: string) => void;
}

export const useSearchQueryState = create<ISearchQueryState>()((set) => ({
  searchValue: "",
  setSearchValue: (newValue) =>
    set((__state) => ({
      searchValue: newValue,
    })),
}));
