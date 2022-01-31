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
  countClient++;
  const roomNumber = Math.round(countClient / 2);
  socket.join(roomNumber);
  socket.emit("roomNumber", roomNumber);
  if (countClient % 2 === 1) {
    games.push(new Gomoku("X", "O"));
  }

  console.log(`Connected with id: ${socket.id}`);
  socket.on("sendMove", (roomNumber, x, y) => {
    if (games[roomNumber - 1].isLegalMove(x, y)) {
      io.to(roomNumber).emit("receiveMove", x, y);
    }
    games[roomNumber - 1].move(x, y);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnect with id: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("listening on: 3000");
});
