import { useQuery } from "@tanstack/react-query";
import { QueryResult } from "pg";
import { ICollectionMetaResult } from "@/lib/database/postgres/getCollectionMetadata";

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
      <div>
        <span>{data.name}</span>
        <img src={data.image} />
        <img src={data.banner_image} />
      </div>
    </>
  );
};

export default CollectionDetails;
