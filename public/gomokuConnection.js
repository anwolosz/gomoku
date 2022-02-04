var socket = io();

class GomokuConnection {
  roomId;
  id;
  opponent = "Opponent";
  status = "SETUP";
  connectionEstablished = false;

  onConnect() {
    socket.on("connect", () => {
      this.id = socket.id;
    });
  }

  createRoom() {
    socket.emit("createRoom", this.roomId);
  }

  connectRoom() {
    socket.emit("connectRoom", this.roomId);
  }

  sendMove(gomoku, x, y) {
    if (gomoku.move(x, y, this.id)) {
      socket.emit("sendMove", this.roomId, x, y);
    }
  }

  receiveMove(gomoku) {
    socket.on("receiveMove", (x, y, player) => {
      gomoku.move(x, y, this.opponent);
    });
  }

  receiveRoomId() {
    socket.on("roomId", (roomId) => {
      this.status = "WAITING";
      this.roomId = roomId;
    });
  }

  receiveIsFirstPlayer(gomoku) {
    socket.on("isFirstPlayer", (isFirstPlayer) => {
      if (isFirstPlayer) {
        gomoku.setPlayers(socket.id, this.opponent);
      } else {
        gomoku.setPlayers(this.opponent, socket.id);
      }
      gomoku.activePlayer = gomoku.players.first;
      this.status = "PLAY";
      console.log("You are the first:", isFirstPlayer);
    });
  }
}
