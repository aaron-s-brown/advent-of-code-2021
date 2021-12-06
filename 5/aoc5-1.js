"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync("5/input5", { encoding: "ascii" }).split("\n");
var lines = input
    .filter(function (s) { return s !== ""; })
    .map(function (s) {
    var points = s.split(" -> ");
    var p1 = points[0].split(",").map(function (n) { return Number(n); });
    var p2 = points[1].split(",").map(function (n) { return Number(n); });
    return {
        point1: { x: p1[0], y: p1[1] },
        point2: { x: p2[0], y: p2[1] }
    };
});
var grid = [];
for (var i = 0; i < 1000; i++) {
    var row = [];
    for (var j = 0; j < 1000; j++) {
        row.push(0);
    }
    grid.push(row);
}
var countTwos = 0;
lines.forEach(function (line) {
    if (line.point1.x === line.point2.x) {
        var x = line.point1.x;
        var y1 = line.point1.y >= line.point2.y ? line.point2.y : line.point1.y;
        var y2 = line.point1.y >= line.point2.y ? line.point1.y : line.point2.y;
        for (var y = y1; y <= y2; y++) {
            grid[x][y] = grid[x][y] + 1;
            if (grid[x][y] === 2) {
                countTwos += 1;
            }
        }
    }
    else if (line.point1.y === line.point2.y) {
        var y = line.point1.y;
        var x1 = line.point1.x >= line.point2.x ? line.point2.x : line.point1.x;
        var x2 = line.point1.x >= line.point2.x ? line.point1.x : line.point2.x;
        for (var x = x1; x <= x2; x++) {
            grid[x][y] = grid[x][y] + 1;
            if (grid[x][y] === 2) {
                countTwos += 1;
            }
        }
    }
    else {
        var p1 = line.point1.x >= line.point2.x ? line.point2 : line.point1;
        var p2 = line.point1.x >= line.point2.x ? line.point1 : line.point2;
        var y1 = p1.y;
        var y2 = p2.y;
        var x1 = p1.x;
        var x2 = p2.x;
        var x = x1;
        var y = y1;
        if (y2 > y1) {
            console.log(line);
            // descending on depth, ascending in number
            while (x <= x2) {
                console.log(x, y);
                grid[x][y] = grid[x][y] + 1;
                if (grid[x][y] === 2) {
                    countTwos += 1;
                }
                x++;
                y++;
            }
        }
        else {
            // ascending in depth, descending in number
            console.log(line);
            while (x <= x2) {
                console.log(x, y);
                grid[x][y] = grid[x][y] + 1;
                if (grid[x][y] === 2) {
                    countTwos += 1;
                }
                x++;
                y--;
            }
        }
    }
});
console.log(countTwos);
