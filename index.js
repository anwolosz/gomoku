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
io.on("connection", (socket) => {
  console.log(`Connected with id: ${socket.id}`);
  countClient++;
  const roomNumber = Math.round(countClient / 2);
  socket.join(roomNumber);
  socket.emit("roomNumber", roomNumber);
  if (countClient % 2 === 0) {
    var players = Array.from(io.sockets.adapter.rooms.get(roomNumber));
    console.log(players);

    io.to(players[0]).emit("isFirstPlayer", true);
    io.to(players[1]).emit("isFirstPlayer", false);
    games.push(new Gomoku(players[0], players[1]));
  }

  // TODO: Dont allow sendMove if only one player in the room
  socket.on("sendMove", (roomNumber, x, y) => {
    if (games[roomNumber - 1].isLegalMove(x, y, socket.id)) {
      games[roomNumber - 1].move(x, y, socket.id);
      socket
        .to(roomNumber)
        .emit("receiveMove", x, y, games[roomNumber - 1].activePlayer);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Disconnect with id: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("listening on: 3000");
});
