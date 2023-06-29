import * as grpc from "@grpc/grpc-js";
import {
  Query,
  StargateBearerToken,
  StargateClient,
  promisifyStargateClient,
} from "@stargate-oss/stargate-grpc-node-client";

const ASTRA_BASE_URL = process.env.ASTRA_BASE_URL;
const ASTRA_REGION = process.env.ASTRA_REGION;
const ASTRA_URI = `${ASTRA_BASE_URL}-${ASTRA_REGION}.apps.astra.datastax.com:443`;
const BEARER_TOKEN = process.env.BEARER_TOKEN ?? "";

const bearerToken = new StargateBearerToken(BEARER_TOKEN);

export const KEYSPACE = process.env.ASTRA_KEYSPACE;

export const getAstraClient = () => {
  const credentials = grpc.credentials.combineChannelCredentials(
    grpc.credentials.createSsl(),
    bearerToken
  );

  const stargateClient = new StargateClient(ASTRA_URI, credentials);
  return promisifyStargateClient(stargateClient);
};
