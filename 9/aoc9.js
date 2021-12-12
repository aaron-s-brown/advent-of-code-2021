"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input9", { encoding: "ascii" }).split("\n");
input.pop();
const nums = input.map((line) => line.split('').map((s) => Number(s)));
let risk = 0;
for (let rowIx = 0; rowIx < nums.length; rowIx++) {
    for (let colIx = 0; colIx < nums[0].length; colIx++) {
        const n = nums[rowIx][colIx];
        let low = true;
        if (rowIx !== 0 && n >= nums[rowIx - 1][colIx]) {
            low = false;
        }
        
        if (colIx !== 0 && n >= nums[rowIx][colIx - 1]) {
            low = false;
        }
        if (rowIx !== nums.length - 1 && n >= nums[rowIx + 1][colIx]) {
            low = false;
        }
        if (colIx !== nums[0].length - 1 && n >= nums[rowIx][colIx + 1]) {
            low = false;
        }
        if (low) {
            risk += n + 1;
        }
    }
}
console.log(risk);
