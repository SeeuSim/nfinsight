import { getPool } from "@/lib/database/postgres";

export interface ISearchResultType {
  image: string;
  address: string;
  name: string;
  floor: string;
}

export const searchCollections = async (collectionName: string) => {
  if (collectionName.length === 0) {
    return undefined;
  }
  const pool = getPool();
  //tsvector has issues - maybe use embeddings?
  // const tsquery = `
  // SELECT image, address, name, floor
  // FROM collection
  // WHERE to_tsvector('english', name) @@ to_tsquery('english', ${collectionName})
  // `

  return await pool.query<ISearchResultType>(`
  SELECT image, address, name, floor
  FROM collection
  WHERE LOWER(name) LIKE '%${collectionName
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/g, "%")}%'
  LIMIT 10
  `);
};
