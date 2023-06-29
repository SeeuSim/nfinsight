import { getAstraClient } from "@/lib/database/astra";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const astra = await getAstraClient();
  
}