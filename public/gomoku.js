class Gomoku {
  boardSize = 15;
  board;
  activePlayer;
  winner;

  constructor() {
    this.board = [];
    for (var i = 0; i < this.boardSize; i++) {
      this.board.push([]);
      for (var j = 0; j < this.boardSize; j++) {
        this.board[i].push(null);
      }
    }
    this.activePlayer = "X";
    this.winner = null;
  }

  onClick(x, y) {
    if (this.isLegalMove(x, y)) {
      this.board[y][x] = this.activePlayer;
      if (this.isWin(x, y)) {
        this.winner = this.activePlayer;
        return;
      }
      this.switchPlayer();
    }
  }

  switchPlayer() {
    if (this.activePlayer === "X") {
      this.activePlayer = "Y";
    } else {
      this.activePlayer = "X";
    }
  }

  isLegalMove(x, y) {
    return this.board[y][x] === null;
  }

  isWin(x, y) {
    var count = 1;
    var i = 1;
    while (
      x + i < this.boardSize &&
      this.board[y][x + i] === this.activePlayer
    ) {
      count++;
      i++;
    }
    i = 1;
    while (x - i >= 0 && this.board[y][x - i] === this.activePlayer) {
      count++;
      i++;
    }
    if (count === 5) {
      return true;
    }
    console.log("Vertical: " + count);

    count = 1;
    i = 1;
    while (
      y + i < this.boardSize &&
      this.board[y + i][x] === this.activePlayer
    ) {
      count++;
      i++;
    }
    i = 1;
    while (y - i >= 0 && this.board[y - i][x] === this.activePlayer) {
      count++;
      i++;
    }
    if (count === 5) {
      return true;
    }
    console.log("Horizontal: " + count);

    count = 1;
    i = 1;
    while (
      y + i < this.boardSize &&
      x + i < this.boardSize &&
      this.board[y + i][x + i] === this.activePlayer
    ) {
      count++;
      i++;
    }
    i = 1;
    while (
      y - i >= 0 &&
      x - i >= 0 &&
      this.board[y - i][x - i] === this.activePlayer
    ) {
      count++;
      i++;
    }
    if (count === 5) {
      return true;
    }
    console.log("DiagonalDown: " + count);

    count = 1;
    i = 1;
    while (
      y + i < this.boardSize &&
      x - i >= 0 &&
      this.board[y + i][x - i] === this.activePlayer
    ) {
      count++;
      i++;
    }
    i = 1;
    while (
      y - i >= 0 &&
      x + i < this.boardSize &&
      this.board[y - i][x + i] === this.activePlayer
    ) {
      count++;
      i++;
    }
    if (count === 5) {
      return true;
    }

    return false;
  }
}
