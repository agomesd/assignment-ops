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

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export function Data() {
  const [data, setData] = useState<ServerData>();
  const [connected, setConnected] = useState(false);
  const [region, setRegion] = useState<string>("");
  const socket = useSocket(`ws://${SERVER_HOST}/${region}`);

  useEffect(() => {
    const region = window.location.search.split("=")[1];
    setRegion(region);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.onopen = () => {
      console.log("Socket opened");
      setConnected(true);
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setData(data);
    };

    socket.onclose = () => {
      console.log("Socket closed");
      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Card className="h-full relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="text-xs">connected</span>
        <div
          className={`rounded-full w-3 h-3 ${
            connected ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
      </div>
      <CardHeader>
        <CardTitle>Socket Data</CardTitle>
        <CardDescription className="text-foreground">
          Live feed from <em className="font-bold text-primary">{region}</em>{" "}
          service
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data ? (
          <div className="flex flex-col gap-4">
            <Card className="bg-slate-950">
              <CardHeader>
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-center">
                  <span className="text-sm">Database </span>
                  <BoolMarker bool={data.results.services.database} />
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-sm">Redis </span>
                  <BoolMarker bool={data.results.services.database} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950">
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Online:{" "}
                  <span className="font-bold">{data.results.stats.online}</span>
                </p>
                <p>
                  Servers Count:{" "}
                  <span className="font-bold">
                    {data.results.stats.servers_count}
                  </span>
                </p>
                <p>
                  Session:{" "}
                  <span className="font-bold">
                    {data.results.stats.session}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <span>No data</span>
          </div>
        )}
      </CardContent>
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
