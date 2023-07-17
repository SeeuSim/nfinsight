"use client";
import { useQuery } from "@tanstack/react-query";
import type { QueryResult } from "pg";

import MainLayout from "@/components/layouts/MainLayout";
import { DataTable } from "@/components/ui/data-table";
import type { IRankResultType } from "@/lib/database/postgres/getRankedCollections";
import { getHomeColumns } from "@/lib/tables/(home)/columns";
import { useEffect } from "react";
import { useHomeState } from "@/lib/state/homeState";
import DataSelector from "@/components/(home)/DataSelector";

export default function MainPage() {
  const [rank, duration, label] = useHomeState((state) => [
    state.rank,
    state.duration,
    state.label,
  ]);
  const { data, isLoading, refetch } = useQuery<QueryResult<IRankResultType>>({
    queryKey: ["meta"],
    queryFn: async () => {
      return await fetch(`/api/meta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "/",
          queries: {
            rank: rank,
            duration: duration,
          },
        }),
      }).then((res) => res.json());
    },
  });

  useEffect(() => {
    refetch();
  }, [rank, duration]);

  return (
    <MainLayout>
      <div className="flex w-full flex-col space-y-4 p-2 pb-8 sm:p-4 xl:p-8 xl:pt-4">
        <DataSelector />
        <DataTable
          loading={isLoading}
          columns={getHomeColumns({ displayValue: label })}
          data={data?.rows ?? []}
        />
      </div>
    </MainLayout>
  );
}
