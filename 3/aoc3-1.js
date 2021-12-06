"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input3", { encoding: "ascii" }).split("\n"); 
const counts = new Array(input[0].length).fill(0);
input.forEach((item) => {
  console.log(item);
  item.split('').forEach((bit, i) => {
    if (bit === '1') {
      counts[i] += 1;
    }
    else {
      counts[i] -= 1;
    }
  })
})
let gamma = 0;
let epsilon = 0;
counts.forEach((count) => {
  gamma *= 2;
  epsilon *= 2;
  if (count > 0) {
    gamma += 1;
  }
  else {
    epsilon += 1;
  }
})
console.log(counts);
console.log(gamma);
console.log(epsilon);
console.log(gamma * epsilon);