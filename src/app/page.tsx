"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { DataTable } from "@/components/ui/data-table";
import { RankResultType } from "@/lib/database/postgres/dashClient";
import { homeColumns } from "@/lib/tables/(home)/columns";
import { useQuery } from "@tanstack/react-query";
import { QueryResult } from "pg";

export default function MainPage() {
  const { data, isFetching, isLoading, isError } = useQuery<QueryResult<RankResultType>>({
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
            rank: "avg_price",
            duration: "DURATION_1_DAY",
          },
        }),
      }).then((res) => res.json());
    },
    // enabled: false
  });
  return (
    <MainLayout>
      <DataTable columns={homeColumns} data={data?.rows?? []}/>
    </MainLayout>
  );
}
