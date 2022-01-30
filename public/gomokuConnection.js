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

  receiveRoomNumber(roomNumber) {
    socket.on("roomNumber", (roomNumber) => {
      this.roomNumber = roomNumber;
    });
  }
}
