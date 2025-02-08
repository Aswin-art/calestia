"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Settings } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TVote = {
  id: string;
  profile: string;
  token: string;
  choice: "For" | "Againt";
  dates: {
    day: string;
    full_date: string;
  };
  voting_power: {
    count: number;
    total: string;
  };
};

export const columnsVotes: ColumnDef<TVote>[] = [
  {
    accessorKey: "token",
    header: "Profile",
    cell: ({ row }) => {
      console.log(row.original.profile);

      return (
        <div className="flex items-center gap-x-2.5">
          <Image
            src={"/vercel.svg"}
            width={40}
            height={40}
            className="size-8 rounded-full"
            alt="cat"
          />
          <div>
            <p className="font-semibold">{row.original.token}</p>
            <p className="text-muted-foreground">{row.original.token}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "choice",
    header: "Choice",
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.choice}</p>;
    },
  },
  {
    accessorKey: "day",
    header: "Day",
    cell: ({ row }) => {
      return <p className="font-semibold">{row.original.dates.day}</p>;
    },
  },
  {
    accessorKey: "full_date",
    header: "Full Date",
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground">{row.original.dates.full_date}</p>
      );
    },
  },
  {
    accessorKey: "voting_power",
    header: "Voting Power",
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-semibold">{row.original.voting_power.count}</p>
          <p className="text-muted-foreground">
            {row.original.voting_power.total}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Settings />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
