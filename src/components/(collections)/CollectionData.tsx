"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import DataSelector from "./DataSelector";
import type { ITimeSeriesResult } from "@/lib/database/astra/utils";
import { Metrics } from "@/lib/database/types";
import { useDimensions } from "@/lib/viewport/useDimensions";

import DataChart from "./DataChart";

const timePeriods = ["7", "30", "90", "365"];

interface ICollectionDataProps {
  collectionAddress: string;
}

const CollectionData = ({ collectionAddress }: ICollectionDataProps) => {
  const [metric, setMetric] = useState<string>(Metrics[0]);
  const [timePeriod, setTimePeriod] = useState(timePeriods[0]);

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
    <div className="mt-4 w-full space-y-4 border-t-2 border-slate-900 px-4 py-4">
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
          options={timePeriods.map((time) => ({
            value: time,
            label: time,
          }))}
        />
      </div>
      {isLoading || isFetching ? (
        <div>
          <span>Loading</span>
        </div>
      ) : isError ? (
        <div>
          <span>{error.message}</span>
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
