import { create } from "zustand";

interface ISearchState {
  searchValue: string;
  setSearchValue: (newValue: string) => void;
}

export const useSearchState = create<ISearchState>()((set) => ({
  searchValue: "",
  setSearchValue: (newValue) => set((__unused) => ({
    searchValue: newValue
  }))
}))