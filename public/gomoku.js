class Gomoku {
  boardSize = 15;
  nInARow = 5;
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

  move(x, y) {
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

  isOutOfBounds(x, y) {
    return x >= 15 || y >= 15 || x < 0 || y < 0;
  }

  countInRow(x, y, direction) {
    var i = 0;
    do {
      i++;
      var checkX = x + i * direction.toX;
      var checkY = y + i * direction.toY;
    } while (
      !this.isOutOfBounds(checkX, checkY) &&
      this.board[checkY][checkX] === this.activePlayer
    );
    return i - 1;
  }

  isWin(x, y) {
    const directions = [
      { toX: 1, toY: 0 },
      { toX: 0, toY: 1 },
      { toX: 1, toY: 1 },
      { toX: 1, toY: -1 },
    ];

    for (const direction of directions) {
      const countForward = this.countInRow(x, y, direction);
      direction.toX *= -1;
      direction.toY *= -1;
      const countBackward = this.countInRow(x, y, direction);
      if (countForward + countBackward + 1 === this.nInARow) {
        return true;
      }
    }
    return false;
  }
}
