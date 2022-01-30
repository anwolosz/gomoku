var socket = io();

class GomokuConnection {
  sendMove(x, y) {
    socket.emit("sendMove", x, y);
  }

  getMove(gomoku) {
    socket.on("receiveMove", (x, y) => {
      gomoku.move(x, y);
    });
  }
}
