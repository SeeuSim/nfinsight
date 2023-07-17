import { Value } from "@stargate-oss/stargate-grpc-node-client";

export const Metrics = ["prices", "owners", "sales", "tokens"] as const;

export const MetricSet = new Set(Metrics);

type MetricsMap = {
  [k in (typeof Metrics)[number]]: Array<IField>;
};

interface IField {
  key: string;
  type: "decimal" | "bigint";
}

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

export const ALLOWED_METRICS: MetricsMap = {
  prices: [
    { key: "average_price", type: "decimal" },
    { key: "max_price", type: "decimal" },
    { key: "min_price", type: "decimal" },
  ],
  owners: [{ key: "owners_count", type: "bigint" }],
  sales: [
    { key: "sales_count", type: "bigint" },
    { key: "sales_volume", type: "decimal" },
  ],
  tokens: [
    { key: "tokens_burned", type: "bigint" },
    { key: "tokens_minted", type: "bigint" },
    { key: "total_burned", type: "bigint" },
    { key: "total_minted", type: "bigint" },
  ],
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

export const getValue = (v: string | number, t: "str" | "int") => {
  const out = new Value();
  if (t === "str") {
    out.setString(v as string);
  } else {
    out.setInt(v as number);
  }
  return out;
};

export const getFieldValue = {
  decimal: (v: Value) => {
    return fmtDecimal(v);
  },
  bigint: (v: Value) => {
    return v.getInt();
  },
};
