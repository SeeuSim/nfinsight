import { Pool } from "pg";

export const getPool = () =>
  new Pool({
    connectionString: process.env.PG_URI,
    max: 10,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000,
  });
