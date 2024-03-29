import { getPool } from "../postgres";

const mnemonicRanks = ["max_price", "avg_price"];

const gallopRanks = ["sales_count", "eth_volume"];

const mnemonicDurations = [
  "DURATION_1_DAY",
  "DURATION_7_DAYS",
  "DURATION_30_DAYS",
  "DURATION_365_DAYS",
];

const gallopDurations = [
  "thirty_days",
  "all_time",
  "seven_days",
  "one_day",
  "ninety_days",
];

export interface IRankResultType {
  image: string;
  name: string;
  floor: string;
  address: string;
  value: string;
}

export const getRankedCollections = async ({
  rank,
  duration,
  limit = 100,
  skip = 0,
}: {
  rank: string;
  duration: string;
  limit?: number;
  skip?: number;
}) => {
  if (
    !(
      (mnemonicRanks.includes(rank) && mnemonicDurations.includes(duration)) ||
      (gallopRanks.includes(rank) && gallopDurations.includes(duration))
    )
  ) {
    return undefined;
  }

  const validatedSkip = skip < 0 || skip > 90 ? 0 : skip;
  const validatedLimit = limit < 0 || limit > 100 ? 10 : limit;

  const pool = getPool();
  const res = await pool.query<IRankResultType>(
    `
    SELECT c.image, c.name, c.address, c.floor, r.value
    FROM ranking AS r
    INNER JOIN collection AS c
    ON r.collection = c.address
    WHERE r.rank = $1
    AND r.duration = $2
    ORDER BY r.value DESC
    LIMIT $3 OFFSET $4
  `,
    [rank, duration, validatedLimit, validatedSkip]
  );
  return res;
};
