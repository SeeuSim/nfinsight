"use client";

import { useRouter } from "next/navigation";

const CollectionDetailsPage = ({
  params,
}: {
  params: { collectionAddress: string };
}) => {
  const router = useRouter();
  if (!params.collectionAddress) {
    router.push("/");
  }
  return (
    <div className="mx-auto mt-20 text-6xl font-black">
      {params.collectionAddress}
    </div>
  );
};

export default CollectionDetailsPage;
