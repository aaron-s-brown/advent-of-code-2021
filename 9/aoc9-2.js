"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input9", { encoding: "ascii" }).split("\n");
input.pop();

function basinSize(rowIx, colIx, nums) {
    let size = 0;
    const n = nums[rowIx][colIx];
    if (n === 9) {
        return size;
    }
    if (n === -1) {
        return size;
    }
    nums[rowIx][colIx] = -1;
    size += 1;
    if (rowIx !== 0) {
        size += basinSize(rowIx - 1, colIx, nums);
    }
    if (colIx !== 0) {
        size += basinSize(rowIx, colIx - 1, nums);
    }
    if (rowIx !== nums.length - 1) {
        size += basinSize(rowIx + 1, colIx, nums);
    }
    if (colIx !== nums[0].length - 1) {
        size += basinSize(rowIx, colIx + 1, nums);
    }
    return size;
}

const nums = input.map((line) => line.split('').map((s) => Number(s)));
let basins = [];

for (let rowIx = 0; rowIx < nums.length; rowIx++) {
    for (let colIx = 0; colIx < nums[0].length; colIx++) {
        const n = nums[rowIx][colIx];
        if (n !== -1 && n !== 9) {
            const basin = basinSize(rowIx, colIx, nums);
            basins.push(basin);
        }
    }
}
basins.sort((a, b) => b - a);
console.log(basins);
console.log(basins[0] * basins[1] * basins[2]);
