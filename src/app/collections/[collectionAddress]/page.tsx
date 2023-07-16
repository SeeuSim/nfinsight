"use client";

import { ICollectionMetaResult } from "@/lib/database/postgres/getCollectionMetadata";
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
  return (
    <div className="mx-auto mt-20 text-6xl font-black">
      {params.collectionAddress}
    </div>
  );
};

export default CollectionDetailsPage;
