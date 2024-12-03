const input = await Bun.file("./day-03/input.txt").text();

const REGEX_MUL = /mul\(\d{1,3},\d{1,3}\)/g;
const REGEX_MUL_WITH_STATE = new RegExp(
  `(do\\(\\)|don't\\(\\)|${REGEX_MUL.source})`,
  "g"
);

const mulInstructions = input.match(REGEX_MUL) || [];

// Solution - Part 1

function extractNumbers(input: string) {
  return input.match(/\d{1,3}/g)?.map(Number) || [0];
}

function getSumOfMultiplications(instructions: string[]) {
  const numbersToMultiply = instructions.map((m) => extractNumbers(m));

  const multipliedResults = numbersToMultiply.map((n) =>
    n.reduce((acc, value) => acc * value, 1)
  );

  return multipliedResults.reduce((acc, value) => acc + value, 0);
}

// Solution - Part 2

function serializeInstructions() {
  const instructions = input.match(REGEX_MUL_WITH_STATE);
  if (!instructions) return [];

  let isEnabled = true;
  const data: { value: string; isEnabled: boolean }[] = [];

  instructions.map((inst) => {
    if (inst.startsWith("mul")) {
      data.push({ value: inst, isEnabled });
      return;
    }

    if (inst === "do()") {
      isEnabled = true;
      return;
    }

    if (inst === "don't()") {
      isEnabled = false;
      return;
    }
  });

  return data;
}

const activeInstructions = serializeInstructions().filter(
  (inst) => inst.isEnabled
);

// Output
console.log("Part 1:", getSumOfMultiplications(mulInstructions));

console.log(
  "Part 2:",
  getSumOfMultiplications(activeInstructions.map((inst) => inst.value))
);
