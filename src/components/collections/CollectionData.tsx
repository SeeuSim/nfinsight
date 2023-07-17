import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITimeSeriesResult } from "@/lib/database/astra/utils";
import { useDimensions } from "@/lib/viewport/useDimensions";
import DataChart from "./DataChart";

interface ICollectionDataProps {
  collectionAddress: string;
}

const CollectionData = ({ collectionAddress }: ICollectionDataProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(containerRef);
  const { data, isLoading, isFetching, isError, error } = useQuery<
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
          metric: "prices",
          collectionAddress: collectionAddress,
        }),
      }).then((res) => res.json());
    },
  });

  return isLoading || isFetching ? (
    <>
      <div>
        <span>Loading</span>
      </div>
    </>
  ) : isError ? (
    <>
      <div>
        <span>{error.message}</span>
      </div>
    </>
  ) : (
    <>
      <div className="mt-4 w-full border-t-2 border-slate-900 px-4 py-4">
        <div className="inline-flex w-full justify-between space-x-2">
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        </div>
        <div ref={containerRef} className="flex w-full">
          <DataChart width={width} data={data.rows} />
        </div>
      </div>
    </>
  );
};

export default CollectionData;
