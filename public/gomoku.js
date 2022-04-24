class Gomoku {
  boardSize = 15;
  nInARow = 5;
  board = [];
  players = { first: { id: null, timer: 10 }, second: { id: null, timer: 10 } };
  activePlayer = null;
  winner = null;
  lastMove = [null, null];

  constructor(firstPlayer = null, secondPlayer = null) {
    for (var i = 0; i < this.boardSize; i++) {
      this.board.push([]);
      for (var j = 0; j < this.boardSize; j++) {
        this.board[i].push(null);
      }
    }
    this.setPlayers(firstPlayer, secondPlayer);
    this.activePlayer = this.players.first.id;
  }

  countDown() {
    var counter = setInterval(() => {
      if (this.activePlayer === this.players.first.id) {
        this.players.first.timer--;
      } else {
        this.players.second.timer--;
      }

      if (this.players.first.timer <= 0) {
        this.winner = this.players.second.id;
        clearInterval(counter);
      }
      if (this.players.second.timer <= 0) {
        this.winner = this.players.first.id;
        clearInterval(counter);
      }
      if (this.winner !== null) {
        clearInterval(counter);
      }

      console.log(this.players);
    }, 1000);
  }

  setPlayers(firstPlayer, secondPlayer) {
    this.players.first.id = firstPlayer;
    this.players.second.id = secondPlayer;
    this.activePlayer = this.players.first.id;
  }

  move(x, y, player) {
    if (this.isLegalMove(x, y, player)) {
      console.log("Move is legal!");
      console.log("Active player: ", this.activePlayer);
      this.board[y][x] = this.activePlayer;
      this.lastMove = [y, x];
      if (this.isWin(x, y)) {
        this.winner = this.activePlayer;
        console.log(`End of Game. Winner is ${this.activePlayer}`);
        return true;
      }
      console.log(this.board[0]);
      this.switchPlayer();
      console.log("Next player: ", this.activePlayer);
      return true;
    } else {
      console.log(this.activePlayer);
      console.log("Move is illlegal...");
      return false;
    }
  }

  switchPlayer() {
    if (this.activePlayer === this.players.first.id) {
      this.activePlayer = this.players.second.id;
    } else {
      this.activePlayer = this.players.first.id;
    }
  }

  isLegalMove(x, y, player) {
    return (
      this.winner === null &&
      this.activePlayer === player &&
      !this.isOutOfBounds(x, y) &&
      this.board[y][x] === null
    );
  }

  isOutOfBounds(x, y) {
    return x >= this.boardSize || y >= this.boardSize || x < 0 || y < 0;
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
