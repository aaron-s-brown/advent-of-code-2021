"use strict";
exports.__esModule = true;

function computeCost(steps) {
    return steps * (steps + 1) / 2;
}

var fs = require("fs");
var input = fs.readFileSync("input7", { encoding: "ascii" }).split(",");
let costs = new Array(2000).fill(0);
input.forEach((n) => {
    const num = Number(n);
    costs = costs.map((old, i) => old + computeCost(Math.abs(n - i)));
})
let minCost = -1;
costs.forEach((cost) => {
    if (minCost === -1) {
        minCost = cost;
        return;
    }
    if (minCost > cost) {
        minCost = cost;
    }
})
console.log(minCost);