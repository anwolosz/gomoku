var socket = io();

class GomokuConnection {
  roomName;
  userId;
  opponent = "Opponent";
  status = "SETUP";
  firstPlayer = "RANDOM";
  errorMessage;

  onConnect() {
    socket.on("connect", () => {
      this.userId = socket.id;
    });
  }

  createRoom() {
    if (this.firstPlayer === "RANDOM") {
      if (Math.random() < 0.5) {
        this.firstPlayer = "CREATOR";
      } else {
        this.firstPlayer = "OPPONENT";
      }
    }
    console.log(this.firstPlayer);
    socket.emit("createRoom", this.roomName, this.firstPlayer);
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
      gomoku.countDown();
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
