import React from "react";

export function useSocket(url: string) {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return socket;
}
