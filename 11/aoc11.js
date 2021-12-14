"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input11", { encoding: "ascii" }).split("\n");
input.pop();
const rows = input.map((line) => line.split('').map((n) => Number(n)));
let flashCount = 0;
function flash(rowIx, colIx, octopi) {
  flashCount += 1;
  octopi[rowIx][colIx] = 0;
  for (let r = rowIx - 1; r <= rowIx + 1; r++) {
    for (let c = colIx - 1; c <= colIx + 1; c++) {
      if (rowIx === r && colIx === c) {
        continue;
      }
      if (r >= 0 && c >= 0 && r < octopi.length && c < octopi[0].length) {
        const n = octopi[r][c];
        if (n !== 0) {
          octopi[r][c] += 1;
        }
        if (n === 9) {
          flash(r,c,octopi);
        }
      }
    }
  }
}

let count = 0;
let prevFlashCount = flashCount;
while (count < 100000) {

  rows.forEach((row, rowIx) => {
    row.forEach((n, colIx) => {
      rows[rowIx][colIx] += 1;
    })
  })
  rows.forEach((row, rowIx) => {
    row.forEach((n, colIx) => {
      if (n > 9) {
        flash(rowIx, colIx, rows);
      }
    })
  })
  if (flashCount - prevFlashCount === rows.length * rows[0].length) {
    console.log(count, flashCount, prevFlashCount);
    count = 100000;
  }
  prevFlashCount = flashCount;
  count++;
}
console.log(flashCount);