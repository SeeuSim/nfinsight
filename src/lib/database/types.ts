export const Metrics = ["prices", "owners", "sales", "tokens"] as const;

export const MetricSet = new Set(Metrics);

interface IField {
  key: string;
  type: "decimal" | "bigint";
}

type MetricsMap = {
  [k in (typeof Metrics)[number]]: Array<IField>;
};

export const ALLOWED_METRICS: MetricsMap = {
  prices: [
    { key: "max_price", type: "decimal" },
    { key: "average_price", type: "decimal" },
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
