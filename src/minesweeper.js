class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get board() {
    return this._board;
  }

  playMove(rowIndex, colIndex) {
    this.board.flipTile(rowIndex, colIndex);
    if (this.board.playerBoard[rowIndex][colIndex] === "B") {
      console.log("Oh no, a bomb! GAME OVER!", "\n");
      this.board.print();
    } else if (this.board.hasSafeTiles()) {
      console.log("You've avoided all the bombs! Wee-ow!! YOU WIN!!!");
    } else {
      console.log("Current Board:", "\n");
      this.board.print();
    }
  }

}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get bombBoard() {
    return this._bombBoard;
  }

  get numberOfTiles() {
    return this._numberOfTiles;
  }

  get numberOfBombs() {
    return this._numberOfBombs;
  }

  flipTile(rowIndex, colIndex) {
      if (this.playerBoard[rowIndex][colIndex] !== " ") {
          console.log("\n" + "This tile has already been flipped!");
          return;
      } else if (this.bombBoard[rowIndex][colIndex] === "B") {
          this.playerBoard[rowIndex][colIndex] = "B";
      } else {
          this.playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
      }
      this._numberOfTiles --;
  }

  getNumberOfNeighborBombs(rowIndex, colIndex) {
      const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
      const numberOfRows = this.bombBoard.length;
      const numberOfColumns = this.bombBoard[rowIndex].length;
      let numberOfBombs = 0;
      neighborOffsets.forEach(offset => {
          const neighborRowIndex = rowIndex + offset[0];
          const neighborColIndex = colIndex + offset[1];
          if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows
          && neighborColIndex >= 0 && neighborColIndex <= numberOfColumns) {
                if (this.bombBoard[neighborRowIndex][neighborColIndex] === "B") {
                  numberOfBombs ++;
                }
          }
      });
      return numberOfBombs;
  }

  print() {
      let board = this.playerBoard.map(row => row.join(' | ')).join('\n');
      return console.log(board);
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
      let board = [];
      for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex ++) {
          let row = [];
          for (let colIndex = 0; colIndex < numberOfColumns; colIndex ++) {
              row.push(' ');
          }
          board.push(row);
        }
      return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      let board = [];
      for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex ++) {
          let row = [];
          for (let colIndex = 0; colIndex < numberOfColumns; colIndex ++) {
              row.push(null);
          }
          board.push(row);
        }
      let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
          let randomRowIndex = getRandomInt(numberOfRows);
          let randomColIndex = getRandomInt(numberOfColumns);
          if (board[randomRowIndex][randomColIndex] !== "B") {
            board[randomRowIndex][randomColIndex] = "B";
            numberOfBombsPlaced ++;
          }
      }
      return board;
  }

  hasSafeTiles() {
    return this.numberOfTiles === this.numberOfBombs;
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let g = new Game(3,3,3);
g.playMove(1,1);
