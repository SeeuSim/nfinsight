"use client";

import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import PopoutIcon from "@/components/buttons/PopoutIcon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useSearchState } from "@/lib/state/searchState";

const Searchbar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useSearchState((state) => [
    state.searchValue,
    state.setSearchValue,
  ]);
  const debouncedSetQuery = useCallback(debounce(setSearchInput), []);
  const escapeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Searchbar event listener
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger
        className={cn(
          "group relative inline-flex max-h-min items-center !outline-none",
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <span className="absolute left-0 hidden -translate-x-[calc(100%+4px)] -translate-y-0.5 lg:block">
          Search:
        </span>
        <PopoutIcon
          className="border-2 border-b-4 border-r-4 px-2 py-1"
          hoverBg="bg-blue-700"
        >
          <span className="hidden text-slate-900 duration-100 ease-linear group-hover:hidden lg:block">
            ⌘&nbsp;K
          </span>
          <Search className="block duration-100 ease-linear group-hover:block group-hover:text-slate-100 lg:hidden" />
        </PopoutIcon>
      </AlertDialogTrigger>
      <AlertDialogContent className="top-[150px] inline-flex !w-[80vw] max-w-screen-md items-center border-2 border-slate-900 p-0 pr-1.5">
        <input
          autoFocus
          className="h-full w-full rounded-md object-cover px-4 py-3 text-lg text-slate-900 !outline-none"
          placeholder="Search for collections"
          value={searchInput}
          onChange={(e) => debouncedSetQuery(e.target.value)}
        />
        <button
          className={cn(
            "max-h-min",
            "rounded-lg border-2 border-b-4 border-r-4 border-slate-900 p-1 font-medium",
            "bg-slate-50 shadow-sm hover:border-2 hover:shadow-none"
          )}
        >
          <Search />
          <label className="sr-only">Search</label>
        </button>
        <div className="absolute right-0 -translate-y-[calc(100%+12px)] items-center font-mono !outline-none md:translate-x-[calc(100%+12px)] md:translate-y-0.5">
          <button
            ref={escapeRef}
            className={cn(
              "cursor-pointer select-none px-4 py-2 font-bold",
              "rounded-lg border-2 border-b-4 border-r-4 hover:border-2 ",
              "border-slate-500 bg-slate-100/70 text-slate-600 hover:text-slate-600"
            )}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Esc
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Searchbar;
