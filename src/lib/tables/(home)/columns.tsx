import { ColumnDef } from "@tanstack/react-table";

import type { RankResultType } from "@/lib/database/postgres/dashClient";
import CollectionThumbnail from "@/components/images/CollectionThumbnail";

export const homeColumns: ColumnDef<RankResultType>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const href = row.getValue("image");
      return <CollectionThumbnail src={href as string} size={64} />;
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
          minimumFractionDigits: 1,
          maximumFractionDigits: 3,
        })
        .replace("NaN", "  0");
      return (
        <div>
          <span>{numValue}&nbsp;ETH</span>
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
