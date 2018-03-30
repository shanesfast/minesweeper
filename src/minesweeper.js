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
        if (board[randomRowIndex][randomColIndex] !== "B") {
          board[randomRowIndex][randomColIndex] = "B";
          numberOfBombsPlaced ++;
        }
    }
    return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, colIndex) => {
    const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[rowIndex].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColIndex = colIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows
        && neighborColIndex >= 0 && neighborColIndex <= numberOfColumns) {
              if (bombBoard[neighborRowIndex][neighborColIndex] === "B") {
                numberOfBombs ++;
              }
        }
    });
    return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
    if (playerBoard[rowIndex][colIndex] !== " ") {
        console.log("\n" + "This tile has already been flipped!");
        return;
    } else if (bombBoard[rowIndex][colIndex] === "B") {
        playerBoard[rowIndex][colIndex] = "B";
    } else {
        playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex);
    }
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
flipTile(playerBoard, bombBoard, 0, 0);
console.log(" ");
console.log("Updated Player Board: " + "\n");
printBoard(playerBoard);
