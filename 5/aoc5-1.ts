import * as fs from "fs";
var input = fs.readFileSync("5/input5", { encoding: "ascii" }).split("\n");
interface Point {
  x: number;
  y: number;
}
interface Line {
  point1: Point;
  point2: Point;
}
const lines: Line[] = input
  .filter((s) => s !== "")
  .map((s) => {
    const points = s.split(" -> ");
    const p1 = points[0].split(",").map((n) => Number(n));
    const p2 = points[1].split(",").map((n) => Number(n));
    return {
      point1: { x: p1[0], y: p1[1] },
      point2: { x: p2[0], y: p2[1] },
    };
  });

const grid: number[][] = [];
for (let i = 0; i < 1000; i++) {
  const row = [];
  for (let j = 0; j < 1000; j++) {
    row.push(0);
  }
  grid.push(row);
}
let countTwos = 0;
lines.forEach((line) => {
  if (line.point1.x === line.point2.x) {
    const x = line.point1.x;
    const y1 = line.point1.y >= line.point2.y ? line.point2.y : line.point1.y;
    const y2 = line.point1.y >= line.point2.y ? line.point1.y : line.point2.y;
    for (let y = y1; y <= y2; y++) {
      grid[x][y] = grid[x][y] + 1;
      if (grid[x][y] === 2) {
        countTwos += 1;
      }
    }
  } else if (line.point1.y === line.point2.y) {
    const y = line.point1.y;
    const x1 = line.point1.x >= line.point2.x ? line.point2.x : line.point1.x;
    const x2 = line.point1.x >= line.point2.x ? line.point1.x : line.point2.x;
    for (let x = x1; x <= x2; x++) {
      grid[x][y] = grid[x][y] + 1;
      if (grid[x][y] === 2) {
        countTwos += 1;
      }
    }
  } else {
    const p1 = line.point1.x >= line.point2.x ? line.point2 : line.point1;
    const p2 = line.point1.x >= line.point2.x ? line.point1 : line.point2;
    const y1 = p1.y;
    const y2 = p2.y;
    const x1 = p1.x;
    const x2 = p2.x;
    let x = x1;
    let y = y1;
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
    } else {
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
