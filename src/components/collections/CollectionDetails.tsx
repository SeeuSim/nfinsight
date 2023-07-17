import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CollectionArtwork from "@/components/images/CollectionArtwork";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ICollectionMetaResult } from "@/lib/database/postgres/getCollectionMetadata";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Space_Grotesk({
  subsets: ["latin"],
});

interface ICollectionDetailsProps {
  collectionAddress: string;
}

const CollectionDetails = ({ collectionAddress }: ICollectionDetailsProps) => {
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
      <div>
        <span>Loading</span>
      </div>
    </>
  ) : isError ? (
    <>
      <div>
        <span>{error.message}</span>
      </div>
    </>
  ) : (
    <>
      <div className="">
        <div className="relative mb-8 sm:mb-12">
          <div className="max-h-[320px] w-full overflow-clip">
            <AspectRatio ratio={2}>
              <CollectionArtwork
                src={data.banner_image}
                alt="Collection Banner"
                altSrc="/images/collection_banner_fallback.png"
              />
            </AspectRatio>
          </div>
          <div className="absolute left-4 top-full z-50 w-[128px] -translate-y-[80%] overflow-clip rounded-2xl border-4 border-gray-400 bg-gradient-to-tr from-fuchsia-200 to-blue-200 shadow-md sm:left-8 sm:w-[200px]">
            <AspectRatio ratio={1}>
              <CollectionArtwork src={data.image} alt="Collection Artwork" />
            </AspectRatio>
          </div>
        </div>
        <div className="px-4 sm:px-8">
          <div
            className={cn(
              "relative flex w-full flex-col space-y-1 border-0 !border-transparent px-1 outline-none sm:space-y-2",
              font.className
            )}
          >
            <span className="text-xl font-bold sm:text-4xl">{data.name}</span>
            <div className="mobp:max-w-[calc(100%-300px)]">
              <ReactMarkdown
                className="prose prose-rose text-sm prose-h1:font-black prose-a:text-blue-600 sm:prose-a:font-light md:text-lg"
                remarkPlugins={[remarkGfm]}
              >
                {data.description}
              </ReactMarkdown>
            </div>
            <div className="flex flex-col rounded-md border-2 border-slate-900 px-4 py-2 mobp:absolute mobp:right-0 mobp:w-[300px]">
              <span className="mb-2 text-xl font-black">Stats</span>
              <div className="inline-flex w-full justify-between space-x-1">
                <span className="font-medium">Tokens:</span>
                <span>{data.tokens}</span>
              </div>
              <div className="inline-flex w-full justify-between space-x-1">
                <span className="font-medium">Owners:</span>
                <span>{data.owners}</span>
              </div>
              <div className="inline-flex w-full  justify-between space-x-1">
                <span className="font-medium">Floor Price:</span>
                <span>
                  {new Number(data.floor).toLocaleString("en-GB", {
                    maximumFractionDigits: 3,
                  })}
                  &nbsp;ETH
                </span>
              </div>
              <div className="inline-flex w-full justify-between space-x-1">
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
      </div>
    </>
  );
};

export default CollectionDetails;
