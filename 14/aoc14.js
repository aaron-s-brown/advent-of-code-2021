"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input14test", { encoding: "ascii" }).split("\n");
input.pop();
let p = input[0];
const rulesin = input.slice(2);
const rules = {};
let counts = {};
const pairs = [];
rulesin.forEach((rule) => {
  const parts = rule.split(" -> ");
  rules[parts[0]] = parts[1];
  counts[parts[0]] = 0;
  pairs.push(parts[0]);
});
for (let i = 0; i < p.length - 1; i++) {
  const pair = p.slice(i, i + 2);
  counts[pair] = counts[pair] + 1;
}

let count = 0;
console.log("first ", counts);
while (count < 10) {
  let newCounts = Object.assign({}, counts);
  pairs.forEach((pair) => {
    if (counts[pair] !== 0) {
      const a = pair[0] + rules[pair];
      const b = rules[pair] + pair[1];
      console.log(pair, a, b);
      newCounts[pair] = counts[pair] - 1;
      newCounts[a] = counts[a] + 1;
      newCounts[b] = counts[b] + 1;
      if (count === 0) {
        console.log(newCounts);
      }
    }
  });
  counts = newCounts;
  console.log(count, counts);
  count++;
}
const lCounts = {};
Object.keys(counts).forEach((c) => {
  const a = c[0];
  console.log(c, a);
  if (!lCounts[a]) {
    lCounts[a] = counts[c];
  } else {
    lCounts[a] = lCounts[a] + counts[c];
  }
});
console.log(lCounts, counts, pairs);
const countlist = Object.values(lCounts).sort((a, b) => a - b);
console.log(countlist);
console.log(countlist[countlist.length - 1] - countlist[0]);
