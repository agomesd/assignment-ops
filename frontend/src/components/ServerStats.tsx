import { ServerData } from "@/utils/types";
import { CPULoad } from "./CPULoad";

interface ServerStatsProps {
  stats: ServerData["results"]["stats"];
}

export function ServerStats({ stats }: ServerStatsProps) {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="grid grid-cols-3 gap-4 p-4 rounded-md bg-popover-foreground">
        <Stat label="Online" value={stats.online} />
        <Stat label="Servers Count" value={stats.servers_count} />
        <Stat label="Session" value={stats.session} />
        <Stat
          label="Active connections"
          value={stats.server.active_connections}
        />
        <Stat label="Timers" value={stats.server.timers} />
        <Stat label="Wait time" value={stats.server.wait_time} />
      </div>
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <CPULoad stats={stats} />
        </div>
      </div>
    </div>
  );
}

interface StatProps {
  label: string;
  value: number;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="flex items-center justify-center flex-1">
      <p className="text-xs">
        {label}: <span className="font-bold text-primary">{value}</span>
      </p>
    </div>
  );
}
