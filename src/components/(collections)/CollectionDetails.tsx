import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Copy, Globe } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CollectionArtwork from "@/components/images/CollectionArtwork";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ICollectionMetaResult } from "@/lib/database/postgres/getCollectionMetadata";
import { cn } from "@/lib/utils";

import CollectionExternalLink from "./CollectionExternalLink";

const font = Space_Grotesk({
  subsets: ["latin"],
});

interface ICollectionDetailsProps {
  collectionAddress: string;
}

const CollectionDetails = ({ collectionAddress }: ICollectionDetailsProps) => {
  const [hide, setHide] = useState(true);
  const { data, isLoading, isFetching, isError, error } = useQuery<
    ICollectionMetaResult,
    Error
  >({
    queryKey: [`collections/${collectionAddress}`],
    queryFn: async () => {
      return await fetch(`/api/meta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "collection",
          queries: {
            address: collectionAddress,
          },
        }),
      }).then((res) => res.json());
    },
  });

  return isLoading || isFetching ? (
    <>
      <div className="flex flex-col">
        <div className="relative mb-8 sm:mb-12">
          <div className="h-[300px] w-full animate-pulse rounded-md bg-accent " />
          <div className="absolute left-4 top-full h-32 w-32 -translate-y-[80%] animate-pulse rounded-md bg-slate-200 sm:left-8 sm:h-[200px] sm:w-[200px]" />
        </div>
        <div className="p-4 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-4">
          <div className="col-span-3">
            <div className="flex flex-row items-center space-x-10 sm:space-x-24">
              <div className="h-10 w-48 animate-pulse rounded-full bg-accent" />
              <div className="h-10 w-16 animate-pulse rounded-xl bg-accent" />
            </div>
            <div className="mt-4 h-6 w-[50vw] animate-pulse rounded-xl bg-accent lg:w-full" />
            <div className="mt-4 hidden h-6 w-[50vw] animate-pulse rounded-xl bg-accent lg:block lg:w-full" />
          </div>
          <div className="mt-4 h-32 w-[90vw] animate-pulse bg-accent sm:w-full" />
        </div>
      </div>
    </>
  ) : isError ? (
    <div className="flex h-[35vw] flex-col rounded-xl p-4 py-4 sm:p-8">
      <span>
        An error occurred while loading the metadata for this collection. Please
        try again later. You may take reference of this error message first.
      </span>
      <span className="mb-2 mt-4 font-bold">Error Message:</span>
      <pre className="relative rounded-xl  border-2 border-slate-900 bg-red-100 p-4">
        {error.message}
        <Copy className="absolute right-2 top-2 h-5 w-5 text-slate-900 duration-200 ease-in-out hover:scale-105" />
      </pre>
    </div>
  ) : (
    <>
      <div className="flex flex-col">
        <div className="relative mb-8 border-b-2 border-slate-900 sm:mb-12">
          <div className="max-h-[320px] w-full overflow-clip">
            <AspectRatio ratio={2}>
              <CollectionArtwork
                src={data.banner_image}
                alt="Collection Banner"
                altSrc="/images/collection_banner_fallback.png"
              />
            </AspectRatio>
          </div>
          <div className="absolute left-4 top-full w-[128px] -translate-y-[80%] overflow-clip rounded-2xl border-4 border-gray-400 bg-gradient-to-tr from-fuchsia-200 to-blue-200 shadow-md sm:left-8 sm:w-[200px]">
            <AspectRatio ratio={1}>
              <CollectionArtwork src={data.image} alt="Collection Artwork" />
            </AspectRatio>
          </div>
        </div>
        <div
          className={cn(
            "grid space-y-4 px-4 sm:space-y-2 sm:px-8 lg:grid-cols-4",
            font.className
          )}
        >
          <div
            className={cn(
              "relative flex w-full flex-col space-y-1 border-0 !border-transparent px-1 outline-none sm:space-y-2",
              "lg:col-span-3"
            )}
          >
            <div className="inline-flex items-center space-x-6 mobp:space-x-10 sm:space-x-24">
              <span className="text-xl font-bold mob:text-2xl mobp:text-3xl sm:text-4xl">
                {data.name}
              </span>
              <div className="inline-flex space-x-1 rounded-sm border-2 border-slate-900 p-0.5 sm:space-x-3 sm:p-2">
                <CollectionExternalLink
                  href={data.external_url ?? "#"}
                  helperText="Collection External Website"
                >
                  <Globe className="h-6 w-6 text-slate-900 duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:text-blue-800" />
                </CollectionExternalLink>
                <CollectionExternalLink
                  helperText="View on Etherscan"
                  href={`https://etherscan.io/address/${collectionAddress}`}
                >
                  <Image
                    className="shrink-0 text-slate-900 duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:text-blue-800"
                    alt="Etherscan"
                    src={"/images/etherscan-logo-circle.svg"}
                    height={24}
                    width={24}
                  />
                </CollectionExternalLink>
              </div>
            </div>
            <div className="">
              <ReactMarkdown
                className={cn(
                  "prose prose-rose text-sm prose-h1:font-black prose-a:text-blue-600 sm:text-base sm:prose-a:font-light md:text-lg",
                  hide
                    ? "h-6 overflow-clip prose-p:w-[90vw] prose-p:truncate md:prose-p:w-full lg:h-full lg:prose-p:overflow-visible lg:prose-p:whitespace-pre-wrap"
                    : ""
                )}
                remarkPlugins={[remarkGfm]}
              >
                {data.description}
              </ReactMarkdown>
              <button
                className="inline-flex w-20 items-center justify-between space-x-2 font-medium text-violet-600 lg:hidden"
                onClick={() => setHide(!hide)}
              >
                {hide ? <span>Expand</span> : <span>Hide</span>}
                {hide ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronUp className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex h-[min-content] w-full flex-col rounded-md border-2 border-slate-900 px-4 py-2 mobp:max-w-[80%] lg:col-span-1 lg:max-w-full">
            <span className="text-lg font-black sm:text-xl">Stats</span>
            <hr className="mb-2 mt-0.5" />
            <div className="inline-flex w-full justify-between space-x-1 text-sm md:text-base">
              <span className="font-medium">Tokens:</span>
              <span>{data.tokens}</span>
            </div>
            <div className="inline-flex w-full justify-between space-x-1 text-sm md:text-base">
              <span className="font-medium">Owners:</span>
              <span>{data.owners}</span>
            </div>
            <div className="inline-flex w-full  justify-between space-x-1 text-sm md:text-base">
              <span className="font-medium">Floor Price:</span>
              <span>
                {new Number(data.floor).toLocaleString("en-GB", {
                  maximumFractionDigits: 3,
                })}
                &nbsp;ETH
              </span>
            </div>
            <div className="inline-flex w-full justify-between space-x-1 text-sm md:text-base">
              <span className="whitespace-nowrap font-medium">
                Sales Volume:
              </span>
              <span>
                {new Number(data.sales_volume).toLocaleString("en-GB", {
                  maximumFractionDigits: 0,
                })}
                &nbsp;ETH
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionDetails;
