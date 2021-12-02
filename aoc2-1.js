"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input2", { encoding: "ascii" }).split("\n");
let depth = 0;
let hor = 0; 
input.forEach((item) => {
  const arr = item.split(' ');
  const dir = arr[0];
  const length = Number(arr[1]);
  if (dir === 'forward') {
    hor += length;
  }
  else if (dir === 'down') {
    depth += length;
  }
  else if (dir === 'up') {
    depth -= length;
  }
})
console.log(depth)
console.log(hor);
