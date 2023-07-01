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

export interface RankResultType {
  image: string;
  name: string;
  floor: string;
  address: string;
  value: string;
}

export const getRankTable = async ({
  rank,
  duration,
}: {
  rank: string;
  duration: string;
}) => {
  if (
    !(
      (mnemonicRanks.includes(rank) && mnemonicDurations.includes(duration)) ||
      (gallopRanks.includes(rank) && gallopDurations.includes(duration))
    )
  ) {
    return undefined;
  }

  const pool = getPool();
  const res = await pool.query<RankResultType>(`
    SELECT c.image, c.name, c.address, c.floor, r.value
    FROM ranking AS r
    INNER JOIN collection AS c
    ON r.collection = c.address
    WHERE r.rank = '${rank}'
    AND r.duration = '${duration}'
    ORDER BY r.value DESC
  `);
  return res;
};
