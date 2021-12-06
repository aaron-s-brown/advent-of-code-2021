"use strict";
exports.__esModule = true;
var fs = require("fs");
let input = fs.readFileSync("input3", { encoding: "ascii" }).split("\n"); 
input.pop();
let input2 = input.slice();
let bit = 0;
while (input.length > 1) {
  let count = 0;
  input.forEach((n) => {
    if (n[bit] === '1') {
      count++;
    }
    else {
      count--;
    }
  });
  const keep = count >= 0 ? '1' : '0';
  input = input.filter((n) => n[bit] === keep);
  bit++;
}
bit = 0;
while (input2.length > 1) {
  let count = 0;
  input2.forEach((n) => {

    if (n[bit] === undefined) {
      // nothing
    }
    else if (n[bit] === '1') {
      count++;
    }
    else {
      count--;
    }
  });
  const keep = count >= 0 ? '0' : '1';
  input2 = input2.filter((n) => n[bit] === keep);
  bit++;
}
let O2 = 0;
let CO2 = 0;
input[0].split('').forEach((i) => {
  O2 *= 2;
  if (i === '1') {
    O2 += 1;
  }
})

input2[0].split('').forEach((i) => {
  CO2 *= 2;
  if (i === '1') {
    CO2 += 1;
  }
})
console.log(input[0], input2[0]);
console.log(O2);
console.log(CO2);
console.log(O2 * CO2)