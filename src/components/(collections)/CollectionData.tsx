"use client";

import { useQuery } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import type { ITimeSeriesResult } from "@/lib/database/astra/utils";
import { Metrics } from "@/lib/database/types";
import { useDimensions } from "@/lib/viewport/useDimensions";

import DataChart from "./DataChart";
import DataSelector from "./DataSelector";
import { cn } from "@/lib/utils";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const timePeriods = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "365", label: "1 year" },
];

interface ICollectionDataProps {
  collectionAddress: string;
}

const CollectionData = ({ collectionAddress }: ICollectionDataProps) => {
  const [metric, setMetric] = useState<string>(Metrics[0]);
  const [timePeriod, setTimePeriod] = useState(timePeriods[0].value);

  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    ITimeSeriesResult,
    Error
  >({
    queryKey: [`collections/data/${collectionAddress}`],
    queryFn: async () => {
      return await fetch(`/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric: metric,
          collectionAddress: collectionAddress,
          limit: timePeriod,
        }),
      }).then((res) => res.json());
    },
  });

  useEffect(() => {
    refetch();
  }, [metric, timePeriod, refetch]);

  return (
    <div
      className={cn(
        "mt-4 w-full space-y-4 border-t-2 border-slate-900 px-8 py-4",
        font.className
      )}
    >
      <div className="inline-flex w-full items-center justify-between">
        <span className="text-xl font-bold sm:text-2xl">Analytics</span>
        <div className="inline-flex space-x-2">
          <DataSelector
            value={metric}
            onValueChange={(value) => {
              setMetric(value);
              setTimePeriod("7");
            }}
            options={Metrics.map((metric) => ({
              value: metric,
              label: metric,
            }))}
          />
          <DataSelector
            value={timePeriod}
            onValueChange={setTimePeriod}
            options={timePeriods}
          />
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className="grid h-[35vw] grid-cols-12 gap-4">
          <div className="col-span-1 animate-pulse bg-accent" />
          <div className="col-span-11 grid grid-rows-4 gap-4">
            <div className=" row-span-3 animate-pulse rounded-xl bg-accent" />
            <div className=" row-span-1 animate-pulse rounded-xl bg-accent" />
          </div>
        </div>
      ) : isError ? (
        <div className="flex h-[35vw] flex-col rounded-xl py-4">
          <span>
            An error occurred while loading the data for this collection. Please
            try again later. You may take reference of this error message first.
          </span>
          <span className="mb-2 mt-4 font-bold">Error Message:</span>
          <pre className="relative rounded-xl  border-2 border-slate-900 bg-red-100 p-4">
            {error.message}
            <Copy className="absolute right-2 top-2 h-5 w-5 text-slate-900 duration-200 ease-in-out hover:scale-105" />
          </pre>
        </div>
      ) : (
        <div className="w-full border-2 border-slate-900 p-2 pr-4">
          <div ref={containerRef} className="flex w-full">
            <DataChart
              metric={metric as (typeof Metrics)[number]}
              width={width}
              data={data.rows}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionData;
