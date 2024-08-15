import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { ServerData } from "../utils/types";

const MARGIN = { top: 0, right: 25, bottom: 25, left: 0 };

const chartConfig = {
  load: {
    label: "Load",
    color: "#9ae19d",
  },
} satisfies ChartConfig;

interface CPULoadProps {
  stats: ServerData["results"]["stats"];
}

export function CPULoad({ stats }: CPULoadProps) {
  const [data, setData] = useState<{ time: string; load: number }[]>([]);

  useEffect(() => {
    setData((prevData) => {
      const newData = [
        ...prevData,
        {
          time: new Date().toLocaleTimeString(),
          load: stats.server.cpu_load,
        },
      ];
      const sorted = newData.sort((a, b) => a.time.localeCompare(b.time));
      return sorted;
    });
  }, [stats]);

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <LineChart data={data} margin={MARGIN}>
        <Legend verticalAlign="top" />
        <CartesianGrid
          fill="#010101"
          vertical={false}
          strokeDasharray={"2, 2"}
          stroke="#537a5a"
        />
        <Line dataKey="load" stroke="#9ae19d" dot={false} type="monotone" />
        <ChartTooltip
          content={<ChartTooltipContent className="text-white" />}
        />
        <YAxis dataKey={"load"} />
        <XAxis
          dataKey="time"
          tickLine={false}
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 10, fontWeight: 400 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
