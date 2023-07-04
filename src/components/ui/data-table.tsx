"use client";

import { Space_Grotesk } from "next/font/google";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import DataTablePagination from "./data-table/data-table-pagination";

const font = Space_Grotesk({
  subsets: ["latin"],
});

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-clip border-2 border-slate-900">
      <Table className={font.className}>
        <TableHeader className="border-b-2 border-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-b-2 border-slate-900 odd:bg-blue-300 even:bg-purple-200 hover:bg-yellow-400"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : loading ? (
            <TableRow>
              <TableCell>
                <Skeleton key="Index" className=" h-5 w-8 bg-slate-300" />
              </TableCell>
              <TableCell>
                <Skeleton
                  key="Image"
                  className=" h-16 w-16 rounded-2xl bg-slate-300"
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  key="Name"
                  className=" h-5 w-[150px] rounded-xl bg-slate-300"
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  key="Floor"
                  className=" hidden h-5 w-20 rounded-xl bg-slate-300 md:block"
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  key="Value"
                  className=" h-5 w-20 rounded-xl bg-slate-300"
                />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="border-t-2 border-slate-900 bg-blue-200">
          <TableRow className="bg-inherit hover:bg-inherit">
            <TableCell colSpan={columns.length} className="p-4">
              <DataTablePagination loading={loading} table={table} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
