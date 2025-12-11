import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

let clients = {};

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "register") {
      clients[data.session] = socket;
      return;
    }

    if (data.type === "signal") {
      const target = clients[data.to];
      if (target) {
        target.send(JSON.stringify({
          type: "signal",
          from: data.from,
          signal: data.signal
        }));
      }
    }
  });

  socket.on("close", () => {
    for (const id in clients) {
      if (clients[id] === socket) delete clients[id];
    }
  });
});
