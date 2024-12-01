const input = await Bun.file("./day-01/input.txt").text();

function calculateDifference(number1: number, number2: number) {
  return Math.abs(number1 - number2);
}

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
  let total = 0;

  left.forEach((value) => {
    leftCounter[value] = (leftCounter[value] || 0) + 1;
  });

  right.forEach((value) => (total += value * leftCounter[value] || 0));

  return total;
}

// Output
console.log("Total distance:", getTotalDistance());
console.log("Total similarity score:", getTotalSimilarityScore());
