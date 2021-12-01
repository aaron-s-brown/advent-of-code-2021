"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input1", { encoding: "ascii" }).split("\n");
let increaseCount = 0;
for (let i = 1; i < input.length; i++) {
  if (Number(input[i]) > Number(input[i-1])) {
    increaseCount+= 1;
  }
}
console.log(increaseCount)
