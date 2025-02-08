import { Button } from "@/components/ui/button";
import React from "react";
import { ChartVote } from "./chart-vote";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

const DetailVote: React.FC<{ show: boolean }> = ({ show = true }) => {
  return (
    <aside
      className={cn("mt-10 h-full w-full md:col-span-4 md:mt-24", {
        "block md:hidden": !show,
        "hidden md:block": show,
      })}
    >
      <div className="flex w-full gap-x-2.5 space-y-3.5">
        <Button
          type="button"
          className="w-full cursor-pointer rounded-full border-2 border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] py-6 text-base font-semibold text-[rgba(255,255,255,0.8)] uppercase no-underline backdrop-blur-[30px] hover:bg-[rgba(255,255,255,0.2)] lg:text-lg"
        >
          For
        </Button>
        <Button
          type="button"
          className="w-full cursor-pointer rounded-full border-2 border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] py-6 text-base font-semibold text-[rgba(255,255,255,0.8)] uppercase no-underline backdrop-blur-[30px] hover:bg-[rgba(255,255,255,0.2)] lg:text-lg"
        >
          Againts
        </Button>
      </div>

      <Button
        type="button"
        className="w-full cursor-pointer rounded-full border-2 border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] py-6 text-base font-semibold text-[rgba(255,255,255,0.8)] uppercase no-underline backdrop-blur-[30px] hover:bg-[rgba(255,255,255,0.2)] lg:text-lg"
      >
        Vote
      </Button>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Result</h3>
        <ChartVote />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Timeline</h3>

        <Timeline>
          <TimelineItem status="done">
            <TimelineHeading>Created</TimelineHeading>
            <TimelineDot status="current" />
            <TimelineLine done />
            <TimelineContent>Jan 29, 2025 - 6:11 PM</TimelineContent>
          </TimelineItem>

          <TimelineItem status="done">
            <TimelineHeading>Start</TimelineHeading>
            <TimelineDot status="current" />
            <TimelineLine done />
            <TimelineContent>Jan 29, 2025 - 6:11 PM</TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>Test</TimelineHeading>
            <TimelineDot status="done" />
            <TimelineContent>Jan 29, 2025 - 6:11 PM</TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </aside>
  );
};

export default DetailVote;
