import { Loader2 } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";
import { QueryResult } from "pg";

import CollectionThumbnail from "@/components/images/CollectionThumbnail";
import { ISearchResultType } from "@/lib/database/postgres/searchClient";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MouseEventHandler } from "react";

const font = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const SearchResultsRow = ({
  row,
  closeSearchbarCallback,
}: {
  row: ISearchResultType;
  closeSearchbarCallback: MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <div className="mr-auto inline-flex h-min w-full max-w-screen-md items-center justify-between space-x-4">
      <div className="h-16 w-16 flex-shrink-0 overflow-clip rounded-md">
        <CollectionThumbnail src={row.image} size={64} />
      </div>
      <div className="flex w-[calc(100%-84px)] grow-0 flex-col space-y-1 pr-2">
        <Link
          href={`/collections/${row.address}`}
          onClick={closeSearchbarCallback}
        >
          <p className="cursor-pointer truncate font-medium hover:font-semibold">
            {row.name}
          </p>
        </Link>
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
  );
};

const SearchResultsDisplay = ({
  closeSearchbarCallback,
  isLoading,
  isError,
  data,
}: {
  closeSearchbarCallback: MouseEventHandler<HTMLAnchorElement>;
  isLoading: boolean;
  isError: boolean;
  data?: QueryResult<ISearchResultType>;
}) => (
  <div
    className={cn(
      "absolute top-[calc(100%+12px)] grid w-full grid-cols-1 flex-col place-items-center items-start gap-y-3 rounded-lg border-2 border-slate-900 bg-white px-3 py-3 md:grid-cols-2",
      font.className
    )}
  >
    {isLoading ? (
      <div className="col-span-2 mx-auto inline-flex max-w-min items-center space-x-2">
        <span>Loading</span>
        <Loader2 className="animate-spin duration-500" />
      </div>
    ) : isError ? (
      <div className="col-span-2 mx-auto max-w-min items-center">
        <span className="whitespace-nowrap font-medium text-red-600">
          An error has occurred. Please try again later.
        </span>
      </div>
    ) : data != undefined && data?.rows?.length > 0 ? (
      <>
        {data?.rows.map((row, index) => (
          <SearchResultsRow
            row={row}
            key={index}
            closeSearchbarCallback={closeSearchbarCallback}
          />
        ))}
      </>
    ) : (
      <div className="col-span-2 mx-auto max-w-min items-center">
        <span className="whitespace-nowrap font-medium text-red-600">
          No results. Please try a different search.
        </span>
      </div>
    )}
  </div>
);

export default SearchResultsDisplay;
