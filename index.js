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
io.on("connection", (socket) => {
  var game = new Gomoku();
  console.log(`Connected with id: ${socket.id}`);
  socket.on("sendMove", (x, y) => {
    if (game.isLegalMove(x, y)) {
      io.emit("receiveMove", x, y);
    }
    game.move(x, y);
  });
});
server.listen(3000, () => {
  console.log("listening on: 3000");
});
