import Cors from "cors";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

let corsAllowedOrigins = ["http://localhost:3000", "http://192.168.1.8:3000"];

if (process.env.VERCEL_URL) {
  //for prod
  corsAllowedOrigins = ["https://nfinsight.vercel.app"];
}

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: Function
) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const withMethods = (
  methods: Array<string>,
  handler: NextApiHandler
) => {
  const cors = Cors({
    methods: methods,
    origin: corsAllowedOrigins,
  });

  return async function (req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);
    // custom CORS validation
    // if (
    //   !req.headers.origin ||
    //   !corsAllowedOrigins.includes(req.headers.origin)
    // ) {
    //   return res.status(403).end();
    // }

    // if (!req.method || !methods.includes(req.method)) {
    //   return res.status(405).end();
    // }

    return handler(req, res);
  };
};
