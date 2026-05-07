// Problem 1:
const filterEvenNumbers = (numbers: number[]): number[] => {
  return numbers.filter((num) => num % 2 === 0);
};

// Problem 2:
const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};
