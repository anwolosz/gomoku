var socket = io();

class GomokuConnection {
  roomName;
  userId;
  opponent = "Opponent";
  status = "SETUP";
  errorMessage;

  onConnect() {
    socket.on("connect", () => {
      this.userId = socket.id;
    });
  }

  createRoom() {
    socket.emit("createRoom", this.roomName);
  }

  connectRoom() {
    socket.emit("connectRoom", this.roomName);
  }

  sendMove(gomoku, x, y) {
    if (gomoku.move(x, y, this.userId)) {
      socket.emit("move", this.roomName, x, y);
    }
  }

  receiveMove(gomoku) {
    socket.on("opponentMove", (x, y, player) => {
      gomoku.move(x, y, this.opponent);
    });
  }

  changeStatus() {
    socket.on("changeStatus", (status) => {
      this.status = status;
    });
  }

  start(gomoku) {
    socket.on("start", (isFirstPlayer) => {
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

  error() {
    socket.on("error", (errorMessage) => {
      console.log("ERROR");
      this.errorMessage = errorMessage;
    });
  }
}
