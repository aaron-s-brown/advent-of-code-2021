"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input1", { encoding: "ascii" }).split("\n");
let increaseCount = 0;
for (let i = 3; i < input.length; i++) {
  const a = Number(input[i-3]);
  const b = Number(input[i]);
  if (b > a) {
    increaseCount+= 1;
  }
}
console.log(increaseCount)
