"use client";

import { Space_Grotesk } from "next/font/google";

import {
  ColumnDef,
  VisibilityState,
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
import { Skeleton } from "./skeleton";
import DataTablePagination from "./data-table/data-table-pagination";
import { useState } from "react";

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
  //Hide columns initially
  const [columnVisibility] = useState<VisibilityState>(
    Object.fromEntries(
      (columns as { accessorKey: string; show?: boolean }[])
        .filter((col) => col.show !== undefined && col.show === false)
        .map((col) => [col.accessorKey, col.show as boolean])
    )
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnVisibility: columnVisibility,
    },
  });

  return (
    <div className="overflow-clip border-2 border-slate-900">
      <Table className={font.className}>
        <TableHeader className="border-b-2 border-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="px-0.5 py-2 first:pl-1 last:pl-2 sm:p-4 sm:first:p-4 sm:last:p-4"
                    key={header.id}
                  >
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
                  <TableCell
                    key={cell.id}
                    className="px-0.5 py-2 first:pl-1 last:pl-2 sm:p-4 sm:first:p-4 sm:last:p-4"
                  >
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
