import { IBM_Plex_Mono } from "next/font/google";

import { useHomeState } from "@/lib/state/homeState";
import { cn } from "@/lib/utils";
import Selector from "./Selector";

const font = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const rankOptions = [
  { value: "avg_price", label: "Average Price" },
  { value: "max_price", label: "Maximum Price" },
  { value: "sales_count", label: "Sales Count" },
  { value: "eth_volume", label: "Sales Volume (ETH)" },
];

const timeOptions = [
  { value: "DURATION_1_DAY", label: "1 Day", index: "Mnemonic" },
  { value: "DURATION_7_DAYS", label: "7 Days", index: "Mnemonic" },
  { value: "DURATION_30_DAYS", label: "30 Days", index: "Mnemonic" },
  { value: "DURATION_365_DAYS", label: "One Year", index: "Mnemonic" },
  { value: "one_day", label: "1 Day", index: "Gallop" },
  { value: "seven_days", label: "7 Days", index: "Gallop" },
  { value: "thirty_days", label: "30 Days", index: "Gallop" },
  { value: "ninety_days", label: "90 Days", index: "Gallop" },
  { value: "all_time", label: "All Time", index: "Gallop" },
];

const MnemonicRanks = ["avg_price", "max_price"];

const DataSelector = () => {
  const [rank, duration, set, setLabel] = useHomeState((state) => [
    state.rank,
    state.duration,
    state.set,
    state.setLabel,
  ]);

  const onSelectRank = (value: string) => {
    if (MnemonicRanks.includes(value) && !MnemonicRanks.includes(rank)) {
      set(
        timeOptions.filter((v) => v.index === "Mnemonic")[0].value,
        "duration"
      );
    } else if (!MnemonicRanks.includes(value) && MnemonicRanks.includes(rank)) {
      set(timeOptions.filter((v) => v.index === "Gallop")[0].value, "duration");
    }
    set(value, "rank");
    setLabel(rankOptions.find((v) => v.value === value)?.label ?? "");
  };

  return (
    <div
      className={cn(
        "grid w-fit grid-cols-2 grid-rows-2 items-center gap-1 mobp:gap-0",
        font.className
      )}
    >
      <span className="whitespace-nowrap text-end text-xs font-semibold mobp:text-sm md:text-xl">
        Top Collections by&nbsp;
      </span>
      <Selector
        options={rankOptions}
        value={rank}
        onValueChange={onSelectRank}
        fontClassName={font.className}
      />
      <span className="whitespace-nowrap text-end text-xs font-semibold mobp:text-sm md:text-xl">
        For&nbsp;
      </span>
      <Selector
        fontClassName={font.className}
        value={duration}
        onValueChange={(value) => set(value, "duration")}
        options={timeOptions}
        hideOption={(v) =>
          (MnemonicRanks.includes(rank) && v.index != "Mnemonic") ||
          (!MnemonicRanks.includes(rank) && v.index != "Gallop")
        }
      />
    </div>
  );
};

export default DataSelector;
