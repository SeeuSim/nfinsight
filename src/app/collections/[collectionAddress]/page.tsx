import { redirect } from "next/navigation";

import CollectionDetails from "@/components/(collections)/CollectionDetails";
import CollectionData from "@/components/(collections)/CollectionData";
import MainLayout from "@/components/layouts/MainLayout";
import { getPool } from "@/lib/database/postgres";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { collectionAddress: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const address = params.collectionAddress;

  const pool = getPool();
  const name = await pool.query<{ name: string }>(
    `SELECT name FROM collection WHERE address = $1`,
    [address]
  );

  return {
    title: `${name.rows[0].name} | NFInsight`,
  };
}

const CollectionDetailsPage = async ({ params }: Props) => {
  if (
    !params.collectionAddress ||
    params.collectionAddress.match(/0x[A-Z0-9]{40,}/gi) === null
  ) {
    redirect("/");
  }

  return (
    <MainLayout>
      <CollectionDetails collectionAddress={params.collectionAddress} />
      <CollectionData collectionAddress={params.collectionAddress} />
    </MainLayout>
  );
};

export default CollectionDetailsPage;
