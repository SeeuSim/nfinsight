import { Value } from "@stargate-oss/stargate-grpc-node-client";

import { Metrics } from "../types";

export interface IGetDataPointParams {
  metric: (typeof Metrics)[number];
  collectionAddress: string;
  limit?: number;
}

export interface ITimeSeriesPoint {
  date: string;
  values: {
    [key: string]: number;
  };
}

export interface ITimeSeriesResult {
  rows: ITimeSeriesPoint[];
}

export const getQueryValue = (v: string | number, t: "str" | "int") => {
  const out = new Value();
  if (t === "str") {
    out.setString(v as string);
  } else {
    out.setInt(v as number);
  }
  return out;
};

export const fmtDecimal = (v?: Value) => {
  if (v === undefined) {
    return 0;
  }
  const out = v.getDecimal()?.toObject();
  if (out === undefined) {
    return 0;
  }
  return (
    Number.parseInt(
      Buffer.from(out.value as string, "base64").toString("hex"),
      16
    ) / Math.pow(10, out.scale)
  );
};

export const getFieldValue = {
  decimal: (v: Value) => {
    return fmtDecimal(v);
  },
  bigint: (v: Value) => {
    return v.getInt();
  },
};
