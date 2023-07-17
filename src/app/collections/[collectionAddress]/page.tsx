"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { QueryResult } from "pg";
import type { ITimeSeriesResult } from "@/lib/database/astra/utils";
import type { ICollectionMetaResult } from "@/lib/database/postgres/getCollectionMetadata";

const CollectionDetailsPage = ({
  params,
}: {
  params: { collectionAddress: string };
}) => {
  const router = useRouter();
  if (!params.collectionAddress) {
    router.push("/");
  }

  const { data } = useQuery<QueryResult<ICollectionMetaResult>>({
    queryKey: [`collections/${params.collectionAddress}`],
    queryFn: async () => {
      return await fetch(`/api/meta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "collection",
          queries: {
            address: params.collectionAddress,
          },
        }),
      }).then((res) => res.json());
    },
  });

  const dataPoints = useQuery<ITimeSeriesResult>({
    queryKey: [`collections/data/${params.collectionAddress}`],
    queryFn: async () => {
      return await fetch(`/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric: "tokens",
          collectionAddress: params.collectionAddress,
        }),
      }).then((res) => res.json());
    },
  });

  return (
    <div className="mx-auto mt-20 flex flex-col">
      <span className="cursor-pointer text-6xl font-black">
        {params.collectionAddress}
      </span>
      {dataPoints.data !== undefined && (
        <>
          {dataPoints.data.rows.map((v, idx) => (
            <pre key={idx}>{JSON.stringify(v)}</pre>
          ))}
        </>
      )}
    </div>
  );
};

export default CollectionDetailsPage;
