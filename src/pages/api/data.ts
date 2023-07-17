import { NextApiRequest, NextApiResponse } from "next";
import { getDataPoints } from "@/lib/database/astra/getDatapoints";
import { type Metrics, MetricSet } from "@/lib/database/types";
import { withMethods } from "@/lib/middlewares/withMethods";

interface IDataPayload {
  collectionAddress: string;
  metric: string;
  limit?: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params: IDataPayload = req.body;
  if (
    params.collectionAddress.match(/0x[A-Z0-9]{40,}/gi) === null ||
    !MetricSet.has(params.metric as (typeof Metrics)[number])
  ) {
    return res.status(422).json({ message: "Wrong parameters" });
  }

  try {
    const response = await getDataPoints({
      metric: params.metric as (typeof Metrics)[number],
      collectionAddress: params.collectionAddress,
      limit: params.limit,
    });
    if (response === undefined) {
      return res.status(422).json({ message: "Wrong parameters" });
    }
    return res.status(200).json({ ...response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default withMethods(["POST"], handler);
