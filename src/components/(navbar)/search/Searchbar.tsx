"use client";

import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { Search, X } from "lucide-react";
import { QueryResult } from "pg";
import { useCallback, useEffect, useRef, useState } from "react";

import KeyboardStyleButton from "@/components/buttons/KeyboardStyleButton";
import PopoutIcon from "@/components/buttons/PopoutIcon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ISearchResultType } from "@/lib/database/postgres/searchClient";
import { useSearchQueryState } from "@/lib/state/searchState";
import { cn } from "@/lib/utils";

import SearchResultsDisplay from "./SearchResultsDisplay";

const FUNCTION_DELAY = 300;

const Searchbar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useSearchQueryState((state) => [
    state.searchValue,
    state.setSearchValue,
  ]);
  const debouncedSetQuery = useCallback(debounce(setSearchInput), []);
  const escapeRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, refetch, isLoading, isError } = useQuery<
    QueryResult<ISearchResultType>
  >({
    queryKey: [`search`],
    queryFn: async () => {
      return await fetch("/api/meta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "search",
          queries: {
            name: searchInput,
          },
        }),
      }).then((res) => res.json());
    },
    enabled: !!searchInput,
    retry: false,
  });

  const throttledRefetch = useCallback(
    throttle(debounce(refetch, FUNCTION_DELAY), FUNCTION_DELAY),
    []
  );

  useEffect(() => {
    // Searchbar event listener
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        debouncedSetQuery("");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  useEffect(() => {
    throttledRefetch();
  }, [searchInput, throttledRefetch]);

  const inputClear = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    searchRef.current?.focus();
  };

  const searchEventHandler = <T,>(
    value: string,
    cb?: (__param?: T) => void,
    param?: T
  ) => {
    const out = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      debouncedSetQuery(value);
      if (cb) cb(param);
    };
    return out;
  };

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
          ref={searchRef}
          className="h-full w-full rounded-md object-cover px-4 py-3 text-lg text-slate-900 !outline-none"
          placeholder="Search for collections"
          onChange={(e) => searchEventHandler(e.target.value)(e)}
        />
        {!!searchInput && (
          <button
            className="rounded-xl border-2 border-transparent p-1 duration-300 ease-linear hover:border-b-4 hover:border-r-4 hover:border-slate-900"
            onClick={searchEventHandler("", inputClear)}
          >
            <X />
            <span className="sr-only">Reset</span>
          </button>
        )}
        <div className="absolute right-0 -translate-y-[calc(100%+12px)] items-center font-mono !outline-none lg:translate-x-[calc(100%+12px)] lg:translate-y-0.5">
          <KeyboardStyleButton
            ref={escapeRef}
            onClick={searchEventHandler("", () => setIsOpen(false))}
          >
            Esc
          </KeyboardStyleButton>
        </div>
        {!!searchInput && (
          <SearchResultsDisplay
            data={data}
            isError={isError}
            isLoading={isLoading}
            closeSearchbarCallback={() => {
              debouncedSetQuery("");
              setIsOpen(false);
            }}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Searchbar;
