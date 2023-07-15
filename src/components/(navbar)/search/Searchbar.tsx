"use client";

import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import PopoutIcon from "@/components/buttons/PopoutIcon";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useSearchState } from "@/lib/state/searchState";
import { useQuery } from "@tanstack/react-query";
import { QueryResult } from "pg";
import { ISearchResultType } from "@/lib/database/postgres/searchClient";
import CollectionThumbnail from "@/components/images/CollectionThumbnail";
import { IBM_Plex_Mono } from "next/font/google";

const font = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const Searchbar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useSearchState((state) => [
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

  const debouncedRefetch = useCallback(
    throttle(debounce(refetch, 300), 300),
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
    debouncedRefetch();
  }, [searchInput, debouncedRefetch]);

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
          value={searchInput}
          onChange={(e) => {
            e.preventDefault();
            debouncedSetQuery(e.target.value);
          }}
        />
        {!!searchInput && (
          <button
            className="rounded-xl border-2 border-transparent p-1 duration-300 ease-linear hover:border-b-4 hover:border-r-4 hover:border-slate-900"
            onClick={() => {
              debouncedSetQuery("");
              searchRef.current?.focus();
            }}
          >
            <X />
            <span className="sr-only">Reset</span>
          </button>
        )}
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
              debouncedSetQuery("");
            }}
          >
            Esc
          </button>
        </div>
        {!!searchInput && (
          <div
            className={cn(
              "absolute top-[calc(100%+12px)] grid w-full grid-cols-1 md:grid-cols-2 flex-col place-items-center items-start gap-y-3 rounded-lg border-2 border-slate-900 bg-white px-3 py-3",
              font.className
            )}
          >
            {isLoading ? (
              <div className="col-span-2 mx-auto inline-flex max-w-min items-center space-x-2">
                <span>Loading</span>
                <Loader2 className="animate-spin duration-500" />
              </div>
            ) : isError ? (
              <div className="col-span-2 mx-auto max-w-min">
                <span className="whitespace-nowrap font-medium text-red-600">
                  An error has occurred. Please try again later.
                </span>
              </div>
            ) : data?.rows?.length > 0 ? (
              <>
                {data?.rows.map((row, index) => (
                  <div
                    key={index}
                    className="mr-auto inline-flex h-min max-w-screen-md items-center justify-between space-x-4"
                  >
                    <CollectionThumbnail src={row.image} size={64} />
                    <div className="flex flex-col space-y-1">
                      <span className="cursor-pointer font-medium hover:font-semibold">
                        {row.name}
                      </span>
                      <div className="inline-flex items-center space-x-2">
                        <span className="text-sm">Floor:</span>
                        <span className="ml-auto flex rounded-full border-[1px] bg-slate-200 px-1.5 py-1 font-mono text-xs">
                          {new Number(row.floor).toLocaleString("en-GB", {
                            maximumFractionDigits: 3,
                          })}
                          &nbsp;ETH
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="mx-auto inline-flex h-10 max-w-min items-center space-x-2 col-span-2">
                <span className="whitespace-nowrap font-medium text-red-600">
                  No results. Please try a different search.
                </span>
              </div>
            )}
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Searchbar;
