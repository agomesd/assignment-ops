interface HealthProps {
  status: string;
  strict: boolean;
  server_issue: string | null;
}

export function Health({ server_issue, status, strict }: HealthProps) {
  return (
    <div className="w-full h-full text-sm">
      <p>Server Health</p>
      <div className="px-2 py-1">
        <div className="flex items-center gap-2">
          <span className="text-xs">Status: </span>
          <span
            className={`font-bold ${
              status === "ok" ? "text-primary" : "text-foreground"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex gap-2">
          {strict ? <span className="text-destructive">Strict</span> : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Server Issue:</span>
          <span className="font-bold">{server_issue ?? "None"}</span>
        </div>
      </div>
    </div>
  );
}
