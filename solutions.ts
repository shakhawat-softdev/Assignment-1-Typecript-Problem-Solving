// Problem 1:
const filterEvenNumbers = (numbers: number[]): number[] => {
  return numbers.filter((num) => num % 2 === 0);
};

// Problem 2:
const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};

//Problem 3:
type StringOrNumber = string | number;

const checkType = (input: StringOrNumber): string => {
  if (typeof input === "string") {
    return "String";
  } else if (typeof input === "number") {
    return "Number";
  }

  throw new Error("Invalid input type");
};

console.log(checkType("Hello"));
console.log(checkType(42));
