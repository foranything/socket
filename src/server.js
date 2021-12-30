import express from "express";
import WebSocket from "ws";
import http from "http";
import { nicknames } from "./const";

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("", (req, res) => {
  console.l0g("sendfile");
  res.sendFile(__dirname + "/public/index.html");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server }, () => {
  console.log("web socket server");
});

const sockets = [];

wss.on("connection", (socket) => {
  socket.nickname = nicknames[~~(Math.random() * 101)];
  sockets.push(socket);
  socket.on("message", (message) => {
    sockets.forEach((s) => {
      s.send([socket.nickname, message.toString()].join(" : "));
    });
  });
  console.log("connected");
});

server.listen(3000, "0.0.0.0");
