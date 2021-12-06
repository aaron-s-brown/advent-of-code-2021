import * as fs from "fs";
var input = fs.readFileSync("input4", { encoding: "ascii" }).split("\n");
const numbers = input[0].split(",").map((n) => Number(n));

interface BoardSlot {
  num: number;
  picked: boolean;
}
interface Board {
  board: BoardSlot[][];
}
function checkBoard(board: Board): boolean {
  const b = board.board;
  let rowChecks: boolean[] = new Array(5).fill(true);
  let colChecks: boolean[] = new Array(5).fill(true);
  b.forEach((row, rowIx) => {
    row.forEach((slot, colIx) => {
      if (!slot.picked) {
        rowChecks[rowIx] = false;
        colChecks[colIx] = false;
      }
    });
  });

  return rowChecks.some((c) => c === true) || colChecks.some((c) => c === true);
}
function pickNumberOnBoard(board: Board, num: number) {
  const b = board.board;
  b.forEach((row, rowIx) => {
    row.forEach((slot, colIx) => {
      if (slot.num === num) {
        slot.picked = true;
        return;
      }
    });
  });
}
function calculateScore(board: Board, lastNum: number) {
  const b = board.board;
  let sum = 0;
  b.forEach((row, rowIx) => {
    row.forEach((slot, colIx) => {
      if (!slot.picked) {
        sum += slot.num;
      }
    });
  });
  return sum * lastNum;
}

const boards: Board[] = [];
let currentBoard: Board = { board: [] };
input.forEach((line, i) => {
  if (i === 0) {
    return;
  }
  const lineNums: BoardSlot[] = line
    .split(" ")
    .filter((val) => val !== "")
    .map((n) => ({ num: Number(n), picked: false }));
  if (lineNums.length !== 5) {
    return;
  }
  currentBoard.board.push(lineNums);
  if (currentBoard.board.length === 5) {
    boards.push(currentBoard);
    currentBoard = { board: [] };
  }
});

let winningBoards: Set<number> = new Set();

numbers.forEach((n) => {
  boards.forEach((board, boardIx) => {
    if (winningBoards.has(boardIx)) {
      return;
    }
    pickNumberOnBoard(board, n);
    if (checkBoard(board)) {
      winningBoards.add(boardIx);
      if (winningBoards.size === boards.length) {
        console.log(calculateScore(board, n));
      }
    }
  });
});
