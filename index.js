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

var rooms = {};
io.on("connection", (socket) => {
  console.log(`Connected with id: ${socket.id}`);

  socket.on("createRoom", (roomName) => {
    console.log("Room create: ", roomName);
    if (roomName in rooms) {
      console.log("Room is already exist");
      socket.emit("error", "Room is already exist");
    } else {
      console.log("Shoudl create room");
      rooms[roomName] = new Gomoku(socket.id, null);
      socket.join(roomName);
      socket.emit("changeStatus", "WAITING");
    }
    console.log(rooms);
  });

  socket.on("connectRoom", (connectRoom) => {
    console.log("connect room: ", connectRoom);
    if (connectRoom in rooms) {
      if (
        rooms[connectRoom].players.first !== null &&
        rooms[connectRoom].players.second !== null
      ) {
        console.log("Room is full!");
        socket.emit("error", "Room is full!");
        return;
      }

      if (rooms[connectRoom].players.first === socket.id) {
        console.log("You already connected!");
        socket.emit("error", "Your already connected to this room!");
      } else {
        console.log("Now Connect!");
        socket.join(connectRoom);

        var players = Array.from(io.sockets.adapter.rooms.get(connectRoom));
        console.log(players);

        io.to(players[0]).emit("start", true);
        io.to(players[1]).emit("start", false);
        rooms[connectRoom] = new Gomoku(players[0], players[1]);
      }
    } else {
      console.log("Room not exist");
      socket.emit("error", "Room not exist");
    }
  });

  socket.on("move", (roomName, x, y) => {
    console.log(roomName);
    console.log(rooms);
    if (!(roomName in rooms)) {
      console.log("Room not exist!");
      socket.emit("error", "Room not exist");
      return;
    }
    if (rooms[roomName].move(x, y, socket.id)) {
      socket
        .to(roomName)
        .emit("opponentMove", x, y, rooms[roomName].activePlayer);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Disconnect with id: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("listening on: 3000");
});
