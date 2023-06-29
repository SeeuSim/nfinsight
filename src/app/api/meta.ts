import { getPool } from "@/lib/database/postgres";
import { NextApiRequest, NextApiResponse } from "next";

type Payload = {
  route: string,
  params: {
    [key: string]: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pool = getPool();
}