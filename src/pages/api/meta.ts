import { NextApiRequest, NextApiResponse } from "next";

import { withMethods } from "@/lib/middlewares/withMethods";
import { getRankedCollections } from "@/lib/database/postgres/getRankedCollections";
import { getCollectionMetadata } from "@/lib/database/postgres/getCollectionMetadata";
import { searchCollections } from "@/lib/database/postgres/searchCollections";

interface IMetaPayload {
  route: string;
  queries: {
    [key: string]: string;
  };
}

const queryRouter: {
  [key: string]: Array<string>;
} = {
  "/": ["rank", "duration"],
  search: ["name"],
  collection: ["address"],
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params: IMetaPayload = req.body;

  //Check for missing parameters
  if (params["route"] == undefined || params["queries"] == undefined) {
    return res.status(422).json({ message: "Invalid parameters provided :p" });
  }

  //Check for invalid parameters
  if (queryRouter[params.route] == undefined) {
    return res.status(404).json({ message: "That API is not supported yet" });
  }
  for (const requiredQueryParam of queryRouter[params.route]) {
    if (params.queries[requiredQueryParam] == undefined) {
      return res.status(422).json({ message: "Missing required parameters" });
    }
  }
  let result;
  if (params.route === "/") {
    result = await getRankedCollections({
      rank: params.queries["rank"],
      duration: params.queries["duration"],
    });
  } else if (params.route === "search") {
    result = await searchCollections(params.queries["name"]);
  } else if (params.route === "collection") {
    result = await getCollectionMetadata(params.queries["address"]);
  }
  if (result === undefined) {
    return res.status(422).json({ message: "Wrong parameters" });
  }
  res.setHeader("Cache-Control", "s-maxage=3600");
  return res.status(200).json({
    ...result,
  });
};

export default withMethods(["POST"], handler);
