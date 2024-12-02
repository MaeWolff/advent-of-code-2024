import { calculateDifference } from "../utils/calculations";

const input = await Bun.file("./day-01/input.txt").text();

// Solution - Part 1

function createLists() {
  const left = input.split("\n").map((line) => Number(line.split(/\s/)[0]));
  const right = input.split("\n").map((line) => Number(line.split(/\s+/)[1]));

  return [left, right];
}

function getTotalDistance() {
  const [left, right] = createLists();

  const sortedLeftList = left.sort((a, b) => a - b);
  const sortedRightList = right.sort((a, b) => a - b);

  return sortedLeftList.reduce(
    (acc, value, index) =>
      acc + calculateDifference(value, sortedRightList[index]),
    0
  );
}

// Solution - Part 2

function getTotalSimilarityScore() {
  const [left, right] = createLists();
  const leftCounter: Record<number, number> = {};

  left.forEach((value) => {
    leftCounter[value] = (leftCounter[value] || 0) + 1;
  });

  return right.reduce((acc, value) => {
    return acc + value * (leftCounter[value] || 0);
  }, 0);
}

// Output
console.log("Total distance:", getTotalDistance());
console.log("Total similarity score:", getTotalSimilarityScore());
