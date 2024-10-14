import { getDataPoints } from "@/lib/database/astra/getDatapoints";
import { MetricSet } from "@/lib/database/types";
import { withMethods } from "@/lib/middlewares/withMethods";
import { NextApiHandler } from "next";

// TO keep database alive
const handler: NextApiHandler = async (_req, res) => {
  const addresses = [
    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // bape
    "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb", // cryptopunk
    "0xeaa4c58427c184413b04db47889b28b5c98ebb7b", // nftrees
    "0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0", // superrare
    "0x00723c39194f7f449be736da0d1c4ec809dde793", // you are the champion
  ];
  const metrics = Array.from(MetricSet);
  const response = await getDataPoints({
    metric: metrics[Math.floor(Math.random() * metrics.length)],
    collectionAddress: addresses[Math.floor(Math.random() * addresses.length)],
    limit: 10,
  });
  console.log(`Received response: ${JSON.stringify(response)}`);
  return res.status(200).json("OK");
};

export default withMethods(["GET"], handler);
