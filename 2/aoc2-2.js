"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input2", { encoding: "ascii" }).split("\n");
let depth = 0;
let hor = 0; 
let aim = 0;
input.forEach((item) => {
  const arr = item.split(' ');
  const dir = arr[0];
  const length = Number(arr[1]);
  if (dir === 'forward') {
    hor += length;
    depth += length * aim;
  }
  else if (dir === 'down') {
    aim += length;
  }
  else if (dir === 'up') {
    aim -= length;
  }
})
console.log(hor);
console.log(depth);
console.log(hor * depth);