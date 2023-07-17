import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import type { IRankResultType } from "@/lib/database/postgres/getRankedCollections";
import CollectionThumbnail from "@/components/images/CollectionThumbnail";

interface IGetHomeColumnProps {
  displayValue: string;
}

export const getHomeColumns: ({
  displayValue,
}: IGetHomeColumnProps) => ColumnDef<IRankResultType>[] = ({
  displayValue,
}) => [
  {
    id: "index",
    header: ({ column }) => null,
    cell: ({ row }) => (
      <div className="">
        <span className="text-base font-medium">{row.index + 1}.</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => null,
    cell: ({ row }) => {
      const href = row.getValue("image");
      return <CollectionThumbnail src={href as string} size={80} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div>
        <span className="text-sm font-semibold text-foreground md:text-lg">
          Collection Name
        </span>
      </div>
    ),
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      return (
        <Link href={`/collections/${address}`}>
          <div>
            <span className="text-base font-medium">
              {row.getValue("name")}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "floor",
    header: ({ column }) => (
      <div className="hidden md:block">
        <span className="text-sm font-semibold text-foreground md:text-lg">
          Floor Price
        </span>
      </div>
    ),
    cell: ({ row }) => {
      const decimalValue: string = row.getValue("floor");
      const numValue = Number.parseFloat(decimalValue)
        .toLocaleString("en-GB", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 3,
        })
        .replace("NaN", "  0");
      return (
        <div className="hidden md:block">
          <span className="text-base font-medium">{numValue}&nbsp;ETH</span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <div>
        <span className="text-sm font-semibold text-foreground md:text-lg">
          {displayValue}
        </span>
      </div>
    ),
    cell: ({ row }) => {
      const decimalValue: string = row.getValue("value");
      const numValue = Number.parseFloat(decimalValue).toLocaleString("en-GB", {
        maximumFractionDigits: 3,
      });
      return (
        <div>
          <span className="text-base font-medium">
            {numValue}&nbsp;{displayValue != "Sales Count" ? "ETH" : ""}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => <div className="h-0 w-0" />,
    cell: ({ row }) => <div className="h-0 w-0" />,
    maxSize: 0,
    show: false,
  },
];
