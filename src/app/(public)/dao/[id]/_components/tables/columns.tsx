/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columnsVotes: ColumnDef<any>[] = [
  {
    accessorKey: "voter",
    header: "Voter",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div>
            <p className="font-semibold">{row.original.voter}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "support",
    header: "Choice",
    cell: ({ row }) => {
      return (
        <p className="font-semibold">
          {row.original.support ? "For" : "Against"}
        </p>
      );
    },
  },
  {
    accessorKey: "weight",
    header: "Voting Power",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-semibold">{row.original.weight}</p>
        </div>
      );
    },
  },
];
