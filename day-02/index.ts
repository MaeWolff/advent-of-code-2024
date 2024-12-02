import { calculateDifference } from "../utils/calculations";

const input = await Bun.file("./day-02/input.txt").text();

const reports = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(/\s+/).map(Number));

//   Solution - Part 1

const MIN_DIFFERENCE = 1;
const MAX_DIFFERENCE = 3;

function isIncreasing(numbers: number[]) {
  return numbers.every((value, i) => i === 0 || value > numbers[i - 1]);
}

function isDecreasing(numbers: number[]) {
  return numbers.every((value, i) => i === 0 || value < numbers[i - 1]);
}

function isValidDifference(numbers: number[]) {
  return numbers.every(
    (value, i) =>
      i === 0 ||
      (calculateDifference(value, numbers[i - 1]) >= MIN_DIFFERENCE &&
        calculateDifference(value, numbers[i - 1]) <= MAX_DIFFERENCE)
  );
}

function isSafeReportWithoutRemoval(report: number[]) {
  return (
    (isIncreasing(report) || isDecreasing(report)) && isValidDifference(report)
  );
}

const reportsSafeWithoutRemoval = reports.filter((report) =>
  isSafeReportWithoutRemoval(report)
);

// Solution - Part 2

function isSafeReport(report: number[]) {
  if (isSafeReportWithoutRemoval(report)) return true;

  return report.some((_, i) => {
    const newReport = report.slice(0, i).concat(report.slice(i + 1));
    return isSafeReportWithoutRemoval(newReport);
  });
}

const reportsSafe = reports.filter((report) => isSafeReport(report));

// Output
console.log(
  "Total safe reports without removal:",
  reportsSafeWithoutRemoval.length
);

console.log("Total safe reports:", reportsSafe.length);
