import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { RankResultType } from "@/lib/database/postgres/dashClient";

export const homeColumns: ColumnDef<RankResultType>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const href = row.getValue("image");
      return (
        <Image
          src={href as string}
          width={64}
          height={64}
          alt="Collection Artwork"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Collection Name",
    cell: ({ row }) => (
      <div>
        <span>{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "floor",
    header: "Floor Price",
    cell: ({ row }) => {
      const decimalValue: string = row.getValue("floor");
      const numValue = Number.parseFloat(decimalValue)
        .toLocaleString("en-GB", {
          maximumFractionDigits: 3,
          style: "currency",
          currency: "ETH",
        })
        .replace("NaN", "  0");
      return (
        <div>
          <span>{numValue}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const decimalValue: string = row.getValue("value");
      const numValue = Number.parseFloat(decimalValue).toLocaleString("en-GB", {
        maximumFractionDigits: 3,
      });
      return (
        <div>
          <span>{numValue}</span>
        </div>
      );
    },
  },
];
