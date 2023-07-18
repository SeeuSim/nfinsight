"use client";

import { useRouter } from "next/navigation";

import CollectionDetails from "@/components/(collections)/CollectionDetails";
import CollectionData from "@/components/(collections)/CollectionData";
import MainLayout from "@/components/layouts/MainLayout";

const CollectionDetailsPage = ({
  params,
}: {
  params: { collectionAddress: string };
}) => {
  const router = useRouter();
  if (
    !params.collectionAddress ||
    params.collectionAddress.match(/0x[A-Z0-9]{40,}/gi) === null
  ) {
    router.push("/");
  }

  return (
    <MainLayout>
      <title>NFInsight - Collection</title>
      <CollectionDetails collectionAddress={params.collectionAddress} />
      <CollectionData collectionAddress={params.collectionAddress} />
    </MainLayout>
  );
};

export default CollectionDetailsPage;
