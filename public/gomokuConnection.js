var socket = io();

class GomokuConnection {
  roomNumber;
  sendMove(roomNumber, x, y) {
    socket.emit("sendMove", this.roomNumber, x, y);
  }

  receiveMove(gomoku) {
    socket.on("receiveMove", (x, y) => {
      gomoku.move(x, y);
    });
  }

  receiveRoomNumber() {
    socket.on("roomNumber", (roomNumber) => {
      this.roomNumber = roomNumber;
    });
  }

  receiveIsFirstPlayer() {
    socket.on("isFirstPlayer", (isFirstPlayer) => {
      // this.roomNumber = roomNumber;
      console.log("You are the first:", isFirstPlayer);
    });
  }
}
