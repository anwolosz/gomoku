class Gomoku {
  boardSize = 15;
  nInARow = 5;
  board = [];
  maxTime = 10 * 60;
  players = {
    first: { id: null, timer: this.maxTime },
    second: { id: null, timer: this.maxTime },
  };
  activePlayer = null;
  winner = null;
  lastMove = [null, null];
  winLine = [];
  notation = [];

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
    var startedAt = Date.now();
    var counter = setInterval(() => {
      if (this.activePlayer === this.players.first.id) {
        this.players.first.timer =
          this.maxTime - (Date.now() - startedAt) / 1000;
      } else {
        this.players.second.timer =
          this.maxTime - (Date.now() - startedAt) / 1000;
      }

      if (this.players.first.timer <= 0) {
        this.players.first.timer = 0;
        this.winner = this.players.second.id;
        clearInterval(counter);
      }
      if (this.players.second.timer <= 0) {
        this.players.second.timer = 0;
        this.winner = this.players.first.id;
        clearInterval(counter);
      }
      if (this.winner !== null) {
        clearInterval(counter);
      }
    }, 100);
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
      this.noteMove(x, y);
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

  getInRow(x, y, direction) {
    var rowElems = [];
    var i = 0;
    do {
      i++;
      var checkX = x + i * direction.toX;
      var checkY = y + i * direction.toY;
      rowElems.push([checkX, checkY]);
    } while (
      !this.isOutOfBounds(checkX, checkY) &&
      this.board[checkY][checkX] === this.activePlayer
    );
    rowElems.pop();
    return rowElems;
  }

  isWin(x, y) {
    const directions = [
      { toX: 1, toY: 0 },
      { toX: 0, toY: 1 },
      { toX: 1, toY: 1 },
      { toX: 1, toY: -1 },
    ];

    for (const direction of directions) {
      var getForward = this.getInRow(x, y, direction);
      var countForward = getForward.length;
      direction.toX *= -1;
      direction.toY *= -1;
      var getBackward = this.getInRow(x, y, direction);
      var countBackward = getBackward.length;
      if (countForward + countBackward + 1 === this.nInARow) {
        this.winLine = getBackward.concat(getForward);
        return true;
      }
    }
    return false;
  }

  isInWinLine(x, y) {
    for (let i = 0; i < this.winLine.length; i++) {
      if (this.winLine[i][0] === x && this.winLine[i][1] === y) {
        return true;
      }
    }
    return false;
  }

  formatTime(timer) {
    return Math.floor(timer / 60) + ":" + Math.floor(timer % 60);
  }

  noteMove(x, y) {
    // let column = String.fromCharCode("A".charCodeAt(0) + x);
    // let row = this.boardSize - y;
    // this.notation.push([column, row]);
    this.notation.push([x, y]);
  }

  formatNote(x, y)
  {
    let column = String.fromCharCode("A".charCodeAt(0) + x);
    let row = this.boardSize - y;
    return column+row;
  }

  stepTo(nthStep)
  {
    console.log(this.board);
    for (var i = 0; i < this.boardSize; i++) {
      for (var j = 0; j < this.boardSize; j++) {
        for (var n = 0; n<=nthStep; n++)
        {
          console.log(i, j, this.notation[n]);
          if (j === this.notation[n][0] && i === this.notation[n][1]) // TODO: out of bounds!!!
          {
            if (n % 2 == 0)
            {
              this.board[i][j] = this.players.first.id;
            }
            else {
              this.board[i][j] = this.players.second.id;
            }
            break;
          }
          else {
            this.board[i][j] = null;
          }
        }
      }
    }
    this.lastMove = [this.notation[nthStep][1], this.notation[nthStep][0]] 
    console.log(this.board);
  }
}
