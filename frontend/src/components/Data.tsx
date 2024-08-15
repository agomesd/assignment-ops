import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useSocket } from "../utils/useSocket";
import { ServerData } from "@/utils/types";

import { Services } from "./Services";
import { Health } from "./Health";
import { Roles } from "./Roles";
import { ServerStats } from "./ServerStats";
import { WorkersTable } from "./WorkersTable";
import { Separator } from "./ui/separator";
// import Spinner from "./Spinner";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

interface DataProps {
  region: string;
}

export function Data({ region }: DataProps) {
  const [data, setData] = useState<ServerData | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [timeConnected, setTimeConnected] = useState<string>("");

  const socket = useSocket(`ws://${SERVER_HOST}/${region}`);

  useEffect(() => {
    if (!socket) return;
    socket.onopen = () => {
      setTimeConnected(new Date().toLocaleTimeString());
      setConnected(true);
      console.log("Socket opened");
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setLastMessage(new Date().toLocaleTimeString());
      setData(data);
    };

    socket.onclose = () => {
      console.log("Socket closed");
      setData(null);
      setLastMessage("");
      setTimeConnected("");
      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [socket, region]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Card className="relative flex flex-col h-full">
      <div className="absolute flex items-center gap-2 top-4 right-4">
        {connected ? <span className="text-xs">connected</span> : null}
        <BoolMarker bool={connected} />
      </div>
      <CardHeader>
        <CardTitle>Socket Data</CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription>
            Live feed from <em className="font-bold text-primary">{region}</em>{" "}
            service
          </CardDescription>
          <span className="text-sm">
            <p>
              Time connected: <span>{timeConnected}</span>
            </p>
            <p>
              Last message: <span>{lastMessage}</span>
            </p>
          </span>
        </div>
      </CardHeader>

      {data ? (
        <CardContent className="flex flex-col flex-1">
          <div className="flex">
            <div className="flex items-center justify-center flex-1">
              <Health
                server_issue={data.server_issue}
                status={data.status}
                strict={data.strict}
              />
            </div>
            <div className="flex items-center justify-center flex-1">
              <Services services={data.results.services} />
            </div>
            <div className="flex items-center justify-center flex-1">
              <Roles roles={data.roles} />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex-1 w-full">
            <ServerStats stats={data.results.stats} />
          </div>
          <div className="w-full">
            <WorkersTable workers={data.results.stats.server.workers} />
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}

interface BoolMarkerProps {
  bool: boolean;
}

function BoolMarker({ bool }: BoolMarkerProps) {
  return (
    <div
      className={`w-2 h-2 rounded-full ${
        bool ? "bg-emerald-500" : "bg-red-500"
      }`}
    />
  );
}
