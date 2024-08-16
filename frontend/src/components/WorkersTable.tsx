import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ServerData } from "../utils/types";
import { useMemo } from "react";

interface WorkersTableProps {
  workers: ServerData["results"]["stats"]["server"]["workers"];
}

export function WorkersTable({ workers }: WorkersTableProps) {
  const data = useMemo(() => {
    return workers.map(([key, value]) => {
      return {
        name: key,
        workers: value.workers,
        waiting: value.waiting,
        idle: value.idle,
        wait_time: value.wait_time,
        ttr: value.time_to_return,
      };
    });
  }, [workers]);

  return (
    <Table className="w-full">
      <TableCaption>Workers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6"></TableHead>
          <TableHead className="w-1/6 text-center">Workers</TableHead>
          <TableHead className="w-1/6 text-center">Waiting</TableHead>
          <TableHead className="w-1/6 text-center">Idle</TableHead>
          <TableHead className="w-1/6 text-center">Wait Time</TableHead>
          <TableHead className="w-1/6 text-center">TTR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((worker, index) => (
          <TableRow
            className={`${
              index % 2 === 0 ? "bg-background" : "bg-popover-foreground"
            }`}
          >
            <TableCell className="w-1/6">{worker.name}</TableCell>
            <TableCell className="w-1/6 text-center">
              {worker.workers}
            </TableCell>
            <TableCell className="w-1/6 text-center">
              {worker.waiting}
            </TableCell>
            <TableCell className="w-1/6 text-center">{worker.idle}</TableCell>
            <TableCell className="w-1/6 text-center">
              {worker.wait_time}
            </TableCell>
            <TableCell className="w-1/6 text-center">{worker.ttr}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
