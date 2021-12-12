"use strict";
exports.__esModule = true;
var fs = require("fs");
/**
 * 2 -> 1
3 -> 7
4 -> 4
4 shares 2 with 2 (cd)
4 shares 3 with 3 (cdf) 2 shares 4 with 3 (acdg)
4 shares 3 with 5 (bdf) 2 shares 3 with 5 (adg)
4 shares 3 with 0 (bcf) 1 shares 2 with 0 (cf)
4 shares 3 with 6 (bdf) 1 shares 1 with 6 (cf)
4 shares 4 with 9 (bcdf)
*/
function sharesWith(s1, s2) {
    return s1.split('').reduce(function (acc, cur) {
        if (s2.includes(cur)) {
            return acc + cur;
        }
        else {
            return acc;
        }
    }, '').length;
}
function equals(s1, s2) {
    if (s1.length !== s2.length) {
        return false;
    }
    return s1.length === sharesWith(s1, s2);
}
var input = fs.readFileSync("input8", { encoding: "ascii" }).split("\n");
input.pop();
var pairs = input.map(function (line) { return line.split(' | '); });
var count = 0;
pairs.forEach(function (pair) {
    var input = pair[0];
    var output = pair[1];
    var nums = input.split(' ').sort(function (a, b) { return a.length - b.length; });
    var one = nums[0];
    var seven = nums[1];
    var four = nums[2];
    var fivers = nums.slice(3, 6);
    var two = fivers.find(function (num) { return sharesWith(num, four) === 2; });
    if (two === undefined) {
        console.error('two not found!');
        return;
    }
    var three = fivers.find(function (num) { return sharesWith(num, four) === 3 && sharesWith(num, two) === 4; });
    var five = fivers.find(function (num) { return sharesWith(num, four) === 3 && sharesWith(num, two) === 3; });
    var sixers = nums.slice(6, 9);
    var zero = sixers.find(function (num) { return sharesWith(num, four) === 3 && sharesWith(num, one) === 2; });
    var six = sixers.find(function (num) { return sharesWith(num, four) === 3 && sharesWith(num, one) === 1; });
    var nine = sixers.find(function (num) { return sharesWith(num, four) === 4; });
    var eight = nums[9];
    var ordered = [zero, one, two, three, four, five, six, seven, eight, nine,];
    var outNum = 0;
    output.split(' ').forEach(function (n, i) {
        outNum *= 10;
        var num = ordered.findIndex(function (ordN) {
            if (ordN === undefined) {
                console.error('undefined in ordered');
                return false;
            }
            return equals(n, ordN);
        });
        outNum += num;
    });
    count += outNum;
});
console.log(count);
