import { getAstraClient } from "@/lib/database/astra";
import { withMethods } from "@/lib/middlewares/withMethods";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const astra = await getAstraClient();
  return res.status(200).json({ message: "hello" });
};

export default withMethods(["POST"], handler);
