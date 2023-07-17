import {
  Query,
  Value,
  Values,
  Decimal,
} from "@stargate-oss/stargate-grpc-node-client";
import { getAstraClient } from "../astra";

export const Metrics = ["prices", "owners", "sales", "tokens"] as const;

export const MetricSet = new Set(Metrics);

type MetricsMap = {
  [k in (typeof Metrics)[number]]: Array<string>;
};

export const ALLOWED_METRICS: MetricsMap = {
  prices: ["average_price", "max_price", "min_price"],
  owners: ["owners_count"],
  sales: ["sales_count", "sales_volume"],
  tokens: ["tokens_burned", "tokens_minted", "total_burned", "total_minted"],
};

interface IGetDataPointParams {
  metric: Array<string>;
  collectionAddress: string;
  limit?: number;
}

const fmtDecimal = (v?: Value) => {
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

const getValue = (v: string | number, t: "str" | "int") => {
  const out = new Value();
  if (t === "str") {
    out.setString(v as string);
  } else {
    out.setInt(v as number);
  }
  return out;
};

export const getDataPoints = async ({
  limit = 7,
  ...props
}: IGetDataPointParams) => {
  const client = getAstraClient();

  const query = new Query();
  query.setCql(`
  SELECT time_stamp, ${props.metric.join(", ")} FROM nf_main_keyspace.data_point
  WHERE collection = ?
  LIMIT ?
  `);

  const queryValuesList: Array<Value> = [
    getValue(props.collectionAddress, "str"),
    getValue(limit, "int"),
  ];

  const queryValues = new Values();
  queryValues.setValuesList(queryValuesList);
  query.setValues(queryValues);

  const response = await client.executeQuery(query);

  const results = response.getResultSet();
  const rows = results?.getRowsList().map((r) => r.getValuesList());
  if (rows) {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      let out = "";
      out += new Date(row[0].getInt()).toISOString();
      out += "|";
      out += fmtDecimal(row[1]);
      out += "|";
      out += fmtDecimal(row[2]);
      out += "|";
      out += fmtDecimal(row[3]);
      console.log(out);
    }
  }
  return rows;
};
