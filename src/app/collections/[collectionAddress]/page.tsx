"use client";

import type { ICollectionMetaResult } from "@/lib/database/postgres/getCollectionMetadata";
import type { Value } from "@stargate-oss/stargate-grpc-node-client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { QueryResult } from "pg";

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

  const dataPoints = useQuery<Value[], Error>({
    queryKey: [`collections/data/${params.collectionAddress}`],
    queryFn: async () => {
      return await fetch(`/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric: "prices",
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
        <pre>{JSON.stringify(dataPoints.data ?? [])}</pre>
      )}
    </div>
  );
};

export default CollectionDetailsPage;
