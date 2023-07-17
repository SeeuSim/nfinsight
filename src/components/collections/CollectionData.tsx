import { useQuery } from "@tanstack/react-query";
import { ITimeSeriesResult } from "@/lib/database/astra/utils";

interface ICollectionDataProps {
  collectionAddress: string;
}

const CollectionData = ({ collectionAddress }: ICollectionDataProps) => {
  const { data, isLoading, isFetching, isError, error } = useQuery<
    ITimeSeriesResult,
    Error
  >({
    queryKey: [`collections/data/${collectionAddress}`],
    queryFn: async () => {
      return await fetch(`/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric: "prices",
          collectionAddress: collectionAddress,
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
      {/* {data.rows.reverse().map((v, i) => (
        <pre key={i}>{JSON.stringify(v)}</pre>
      ))} */}
    </>
  );
};

export default CollectionData;
