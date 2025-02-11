/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { House, PanelsTopLeft } from "lucide-react";
import Image from "next/image";
import { DataTableVotes } from "./tables/data-table";
import { columnsVotes } from "./tables/columns";

export const DetailProposal: React.FC<{ result: any; votesData: any }> = ({
  result,
  votesData,
}) => {
  const convertTimeStamp = (timestamp: number) => {
    const timestampNumber = Number(timestamp);

    const targetDate = new Date(timestampNumber * 1000);
    const now = new Date();

    const utcString = targetDate.toISOString();
    const localString = targetDate.toLocaleString();

    const timeDiffMs = targetDate.getTime() - now.getTime();
    const hoursRemaining = timeDiffMs / (1000 * 60 * 60);

    const hoursRemainingText =
      hoursRemaining < 1
        ? "end in less than 1 hour"
        : `${hoursRemaining.toFixed(2)} hours remaining`;

    return {
      utc: utcString,
      local: localString,
      hoursRemaining: hoursRemainingText,
    };
  };

  return (
    <Tabs defaultValue="overview" className="col-span-12 px-4 md:col-span-8">
      <TabsList className="border-border h-auto rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <House
            className="mb-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="votes"
          className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <PanelsTopLeft
            className="mb-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Votes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-edge-outline font-display z-10 cursor-default bg-white bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-2xl text-transparent md:text-4xl">
              {result?.title}
            </h2>

            <Button
              type="button"
              className="rounded-full bg-green-600 px-9 text-lg font-semibold text-white hover:bg-green-700"
            >
              Active
            </Button>

            <div className="flex items-center gap-x-2">
              <Image
                src={"/vercel.svg"}
                width={35}
                height={35}
                className="rounded-full"
                alt="flag"
              />
              <p className="truncate text-lg font-bold">{result?.creator}</p>
            </div>
            <p className="text-muted-foreground text-sm font-semibold">
              {convertTimeStamp(result?.endTime).local},{" "}
              {convertTimeStamp(result?.endTime).hoursRemaining}
            </p>
          </div>

          <div className="space-y-4">{result?.description}</div>
        </div>
      </TabsContent>

      <TabsContent value="votes" className="mt-8 space-y-8">
        <DataTableVotes columns={columnsVotes} data={votesData} />
      </TabsContent>
    </Tabs>
  );
};
