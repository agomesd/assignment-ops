import { createServer } from "http";
import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { URL } from "url";

config(); //Configure environment variables
const server = createServer();
const ws = new WebSocketServer({ noServer: true });
const SERVICE_HOST = process.env.SERVICE_HOST;
const PORT = process.env.PORT || 8081;
const DELAY = 5_000;
const SUPPORTED_REGIONS = [
  "us-east",
  "eu-west",
  "eu-central",
  "us-west",
  "sa-east",
  "ap-southeast",
];

ws.on("connection", (socket, request) => {
  if (!request.url) return;
  const region = getRegion(request.url);
  const endpoint = buildEnpointString(region);
  const interval = setInterval(() => {
    socket.send(endpoint);
  }, DELAY);

  socket.onmessage = (message) => {
    console.log("Message received: ", message.data);
  };

  socket.onerror = (err) => {
    console.error("Socket error: ", err);
  };

  socket.onclose = () => {
    clearInterval(interval);
    console.log("Socket closed");
  };
});

server.on("upgrade", (request, socket, head) => {
  if (!request.url) return;
  const { pathname } = new URL(request.url, `http://${request.headers.host}`);
  const region = getRegion(pathname);
  if (!validateRegion(region)) {
    socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
    socket.destroy();
    return;
  }
  for (const supRegion of SUPPORTED_REGIONS) {
    if (supRegion === region) {
      ws.handleUpgrade(request, socket, head, (socket) => {
        ws.emit("connection", socket, request);
      });
      break;
    }
  }
});

function getRegion(url: string): string {
  return url.split("/")[1];
}

function validateRegion(region: string): boolean {
  return SUPPORTED_REGIONS.includes(region);
}

function buildEnpointString(region: string): string {
  return `https://data--${region}.${SERVICE_HOST}`;
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
