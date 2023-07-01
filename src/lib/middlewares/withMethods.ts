import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { corsAllowedOrigins } from "./corsOrigins";

export const withMethods = (
  methods: Array<string>,
  handler: NextApiHandler
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.origin || !corsAllowedOrigins.includes(req.headers.origin)) {
      return res.status(403).end();
    }
    if (!req.method || !methods.includes(req.method)) {
      return res.status(405).end();
    }
    return handler(req, res);
  };
};
