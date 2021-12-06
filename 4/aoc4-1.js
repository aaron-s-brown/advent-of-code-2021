"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input4", { encoding: "ascii" }).split("\n");
var numbers = input[0].split(",").map(function (n) { return Number(n); });
function checkBoard(board) {
    var b = board.board;
    var rowChecks = new Array(5).fill(true);
    var colChecks = new Array(5).fill(true);
    b.forEach(function (row, rowIx) {
        row.forEach(function (slot, colIx) {
            if (!slot.picked) {
                rowChecks[rowIx] = false;
                colChecks[colIx] = false;
            }
        });
    });
    return rowChecks.some(function (c) { return c === true; }) || colChecks.some(function (c) { return c === true; });
}
function pickNumberOnBoard(board, num) {
    var b = board.board;
    b.forEach(function (row, rowIx) {
        row.forEach(function (slot, colIx) {
            if (slot.num === num) {
                slot.picked = true;
                return;
            }
        });
    });
}
function calculateScore(board, lastNum) {
    var b = board.board;
    var sum = 0;
    b.forEach(function (row, rowIx) {
        row.forEach(function (slot, colIx) {
            if (!slot.picked) {
                sum += slot.num;
            }
        });
    });
    return sum * lastNum;
}
var boards = [];
var currentBoard = { board: [] };
input.forEach(function (line, i) {
    if (i === 0) {
        return;
    }
    var lineNums = line
        .split(" ")
        .filter(function (val) { return val !== ""; })
        .map(function (n) { return ({ num: Number(n), picked: false }); });
    if (lineNums.length !== 5) {
        return;
    }
    currentBoard.board.push(lineNums);
    if (currentBoard.board.length === 5) {
        boards.push(currentBoard);
        currentBoard = { board: [] };
    }
});
numbers.forEach(function (n) {
    boards.forEach(function (board) {
        pickNumberOnBoard(board, n);
        if (checkBoard(board)) {
            console.log(n);
            console.log(JSON.stringify(board, null, 2));
            console.log(calculateScore(board, n));
            process.exit(0);
        }
    });
});
