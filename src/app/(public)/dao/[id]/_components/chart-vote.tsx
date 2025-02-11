/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
const chartData = [
  { browser: "for", visitors: 0, fill: "var(--color-chrome)" },
  { browser: "againts", visitors: 0, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Voters",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ChartVote({ result }: { result: any }) {
  chartData[0].visitors = Number(result?.votesFor);
  chartData[1].visitors = Number(result?.votesAgainst);

  return result?.votesFor == 0 && result?.votesAgainst == 0 ? (
    <p className="text-muted-foreground mt-5 h-[100px]">
      There is still no voters, chart result will be updating in here.
    </p>
  ) : (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          innerRadius={60}
          data={chartData}
          dataKey="visitors"
          label
          nameKey="browser"
        />
      </PieChart>
    </ChartContainer>
  );
}
