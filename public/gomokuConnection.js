var socket = io();

class GomokuConnection {
  roomId;
  id;
  sendMove(roomId, x, y) {
    socket.emit("sendMove", this.roomId, x, y);
  }

  receiveMove(gomoku) {
    socket.on("receiveMove", (x, y, player) => {
      gomoku.move(x, y, "X");
    });
  }

  receiveRoomId() {
    socket.on("roomId", (roomId) => {
      this.id = socket.id;
      this.roomId = roomId;
    });
  }

  receiveIsFirstPlayer(gomoku) {
    socket.on("isFirstPlayer", (isFirstPlayer) => {
      if (isFirstPlayer) {
        gomoku.setPlayers(socket.id, "X");
      } else {
        gomoku.setPlayers("X", socket.id);
      }
      gomoku.activePlayer = gomoku.players.first;
      console.log("You are the first:", isFirstPlayer);
    });
  }
}
