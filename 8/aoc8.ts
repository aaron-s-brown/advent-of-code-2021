import * as fs from "fs";

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

function sharesWith(s1: string, s2: string): number {
    return s1.split('').reduce((acc, cur) => {
        if (s2.includes(cur)) {
            return acc + cur;
        }
        else {
            return acc;
        }
    }, '').length;
}

function equals(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) {
        return false;
    }
    return s1.length === sharesWith(s1, s2);
}

var input = fs.readFileSync("input8", { encoding: "ascii" }).split("\n");
input.pop();
const pairs = input.map((line) => line.split(' | '));
let count = 0;
pairs.forEach((pair) => {
    const input = pair[0];
    const output = pair[1];
    const nums = input.split(' ').sort((a, b) => a.length - b.length);
    const one = nums[0];
    const seven = nums[1];
    const four = nums[2];
    const fivers = nums.slice(3,6);
    const two = fivers.find((num) => sharesWith(num, four) === 2);
    if (two === undefined) {
        console.error('two not found!');
        return;
    }
    const three = fivers.find((num) => sharesWith(num, four) === 3 && sharesWith(num, two) === 4);
    const five = fivers.find((num) => sharesWith(num, four) === 3 && sharesWith(num, two) === 3);
    const sixers = nums.slice(6, 9);
    const zero = sixers.find((num) => sharesWith(num, four) === 3 && sharesWith(num, one) === 2);
    const six = sixers.find((num) => sharesWith(num, four) === 3 && sharesWith(num, one) === 1);
    const nine = sixers.find((num) => sharesWith(num, four) === 4);
    const eight = nums[9];
    const ordered = [zero, one, two, three, four, five, six, seven, eight, nine, ];
    let outNum = 0;
    output.split(' ').forEach((n, i) => {
        outNum *= 10;
        const num = ordered.findIndex((ordN) => {
            if (ordN === undefined) {
                console.error('undefined in ordered');
                return false;
            }
            return equals(n, ordN)
        });
        outNum += num;
    })
    count += outNum;
});
console.log(count);