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

// Problem 4:
const getProperty = <ObjectType, KeyType extends keyof ObjectType>(
  obj: ObjectType,
  key: KeyType,
): ObjectType[KeyType] => {
  return obj[key];
};

// Problem 5:
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}
interface ReadableBook extends Book {
  isRead: boolean;
}

const toggleReadStatus = (book: Book): ReadableBook => {
  return {
    ...book,
    isRead: true,
  };
};

const myBook: Book = {
  title: "TypeScript Guide",
  author: "Jane Doe",
  publishedYear: 2024,
};

const result = toggleReadStatus(myBook);

// Problem 6:
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

const student = new Student("Alice", 20, "A");

// Problem 7:
const getIntersection = (array1: number[], array2: number[]): number[] => {
  return array1.filter((item) => array2.includes(item));
};
