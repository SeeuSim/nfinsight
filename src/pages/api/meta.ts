import { NextApiRequest, NextApiResponse } from "next";

import { getRankTable } from "@/lib/database/postgres/dashClient";
import { withMethods } from "@/lib/middlewares/withMethods";

interface Payload {
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
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params: Payload = req.body;

  //Check for missing parameters
  if (params["route"] == undefined || params["queries"] == undefined) {
    return res.status(422).json({ message: "Invalid parameters provided :p" });
  }

  //Check for invalid parameters
  if (queryRouter[params.route] == undefined) {
    return res.status(404).json({ message: "That API is not supported yet" });
  }
  for (let requiredQueryParam of queryRouter[params.route]) {
    if (params.queries[requiredQueryParam] == undefined) {
      return res.status(422).json({ message: "Missing required parameters" });
    }
  }
  
  if (params.route === "/") {
    const result = await getRankTable({
      rank: params.queries['rank'],
      duration: params.queries['duration']
    })
    if (result == undefined) {
      return res.status(422).json({ message: "Wrong parameters"})
    }
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json({
      ...result,
    })
  }

  return res.status(200).json({
    message: "Hello",
  });
};

export default withMethods(["POST"], handler);
