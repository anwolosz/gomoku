var socket = io();

class GomokuConnection {
  roomNumber;
  id;
  sendMove(roomNumber, x, y) {
    socket.emit("sendMove", this.roomNumber, x, y);
  }

  receiveMove(gomoku) {
    socket.on("receiveMove", (x, y, player) => {
      gomoku.move(x, y, "X");
    });
  }

  receiveRoomNumber() {
    socket.on("roomNumber", (roomNumber) => {
      this.id = socket.id;
      this.roomNumber = roomNumber;
    });
  }

  receiveIsFirstPlayer(gomoku) {
    socket.on("isFirstPlayer", (isFirstPlayer) => {
      if (isFirstPlayer) {
        gomoku.players.first = socket.id;
        gomoku.players.second = "X";
        gomoku.activePlayer = socket.id;
      } else {
        gomoku.players.first = "X";
        gomoku.players.second = socket.id;
        gomoku.activePlayer = "X";
      }
      console.log("You are the first:", isFirstPlayer);
    });
  }
}
