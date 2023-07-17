import { getPool } from "@/lib/database/postgres";

export interface ICollectionMetaResult {
  address: string;
  name: string;
  type: string;
  tokens: number;
  owners: number;
  sales_volume: number;
  floor: number;
  image: string;
  banner_image: string;
  description: string;
  external_url: string;
}

export const getCollectionMetadata = async (collectionAddress: string) => {
  const address = collectionAddress.trim();
  if (address.length < 40 && !address.startsWith("0x")) {
    return undefined;
  }
  const pool = getPool();
  const res = await pool.query<ICollectionMetaResult>(
    `
    SELECT * FROM collection
    WHERE LOWER(address) = LOWER($1)
    `,
    [address]
  );
  return res.rows ? res.rows[0] : undefined;
};
