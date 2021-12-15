"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("input10", { encoding: "ascii" }).split("\n");
input.pop();
const scores = {
    ')' : 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};
const autoComplete = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
}
const pairs = {
    '(' : ')',
    '[' : ']',
    '{' : '}',
    '<' : '>',
}
const openChars = Object.keys(pairs);
let totalScore = 0;
let acScores = [];
input.forEach((line) => {
    let stack = [];
    const offender = line.split('').find((char) => {
        if (openChars.includes(char)) {
            stack.push(char);
            return false;
        }
        else {
            const open = stack.pop();
            if (pairs[open] === char) {
                return false;
            }
            else {
                return true;
            }
        }
    })
    if (offender !== undefined) {
        totalScore += scores[offender];
    }
    else {
        let acScore = 0;
        while (stack.length > 0) {
            const closer = stack.pop();
            acScore *= 5;
            acScore += autoComplete[closer];
            console.log(closer, autoComplete[closer]);
        }
        acScores.push(acScore);
        // console.log(acScore);
    }
})
acScores.sort((a,b) => a - b);
console.log(acScores[(acScores.length - 1) / 2])

console.log(totalScore);