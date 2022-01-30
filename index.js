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
io.on("connection", (socket) => {
  countClient++;
  const roomNumber = Math.round(countClient / 2);
  socket.join(roomNumber);
  socket.emit("roomNumber", roomNumber);

  var game = new Gomoku();
  console.log(`Connected with id: ${socket.id}`);
  socket.on("sendMove", (roomNumber, x, y) => {
    if (game.isLegalMove(x, y)) {
      io.to(roomNumber).emit("receiveMove", x, y);
    }
    game.move(x, y);
  });
});
server.listen(3000, () => {
  console.log("listening on: 3000");
});
