import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DataTablePagination = <TData,>({
  table,
  loading,
}: {
  table: Table<TData>;
  loading: boolean;
}) => {
  return (
    <div className="mx-auto flex w-full justify-between">
      <button
        className={cn(
          "inline-flex items-center space-x-1 rounded-md border-2 bg-slate-50 p-2",
          table.getCanPreviousPage()
            ? "border-slate-900 text-slate-900 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:border-b-4 hover:border-r-4"
            : "border-slate-500 text-slate-500"
        )}
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Previous</span>
      </button>
      <div
        className={cn(
          "flex w-[100px] items-center justify-center text-base font-medium text-foreground",
          loading ? "hidden" : ""
        )}
      >
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
      <button
        className={cn(
          "inline-flex items-center space-x-1 rounded-md border-2 bg-slate-50 p-2",
          table.getCanNextPage()
            ? "border-slate-900 text-slate-900 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:border-b-4 hover:border-r-4"
            : "border-slate-500 text-slate-500"
        )}
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <span>Next</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default DataTablePagination;
