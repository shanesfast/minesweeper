function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
        board[randomRowIndex][randomColIndex] = "B";
        numberOfBombsPlaced ++;
        /* currently, this while loop can place bombs on top of previously placed bombs. Fix This! */
    }
    return board;
}

const printBoard = (board) => {
    board.map(row => row.join(' | ')).join('\n');
    return console.log(board);
}

let playerBoard = (generatePlayerBoard(3,4));
let bombBoard = (generateBombBoard(3,4,5));

console.log(" ");
console.log("Player Board: " + "\n");
printBoard(playerBoard);
console.log(" ");
console.log("Bomb Board: " + "\n");
printBoard(bombBoard);
