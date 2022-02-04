const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Gomoku = require("./gomoku");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

var countClient = 0;
var games = [];
var gamesRoomName = {};
io.on("connection", (socket) => {
  console.log(`Connected with id: ${socket.id}`);

  socket.on("createRoom", (roomName) => {
    console.log("Room create: ", roomName);
    if (roomName in gamesRoomName) {
      console.log("Room is already exist");
    } else {
      console.log("Shoudl create room");
      gamesRoomName[roomName] = socket.id;
      socket.join(roomName);
      socket.emit("changeStatus", "WAITING");
    }
    console.log(gamesRoomName);
  });

  socket.on("connectRoom", (connectRoom) => {
    console.log("connect room: ", connectRoom);
    if (connectRoom in gamesRoomName) {
      // TODO: If room is full
      if (gamesRoomName[connectRoom] === socket.id) {
        console.log("You already connected!");
      } else {
        console.log("Now Connect!");
        socket.join(connectRoom);

        var players = Array.from(io.sockets.adapter.rooms.get(connectRoom));
        console.log(players);

        io.to(players[0]).emit("start", true);
        io.to(players[1]).emit("start", false);
        gamesRoomName[connectRoom] = new Gomoku(players[0], players[1]);
      }
    } else {
      console.log("Room not exist");
    }
  });

  socket.on("sendMove", (roomName, x, y) => {
    console.log(roomName);
    console.log(gamesRoomName);
    if (!(roomName in gamesRoomName)) {
      console.log("Room not exist!");
      return;
    }
    if (gamesRoomName[roomName].move(x, y, socket.id)) {
      socket
        .to(roomName)
        .emit("receiveMove", x, y, gamesRoomName[roomName].activePlayer);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Disconnect with id: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("listening on: 3000");
});
