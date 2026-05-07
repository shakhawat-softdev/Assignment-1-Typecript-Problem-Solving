# How Generics Build Reusable and Strictly Typed Code in TypeScript

## Introduction

Generics are one of the most powerful features of TypeScript. They allow us to write reusable functions, components, interfaces, and classes without losing type safety. Instead of writing the same logic for many different types, we can write one flexible piece of code that still remembers the exact type of data passed into it.

In simple words, generics let us create code that says: "I do not know the exact type yet, but once you give it to me, I will keep it consistent."

## The Problem Without Generics

Suppose we want to create a function that returns the same value it receives.

```ts
function identity(value: any): any {
  return value;
}

const result = identity("Hello");
```

This works, but it is not type-safe. Because the function uses `any`, TypeScript forgets that `result` is a string. We lose autocomplete, type checking, and protection from mistakes.

We could write separate functions for each type:

```ts
function identityString(value: string): string {
  return value;
}

function identityNumber(value: number): number {
  return value;
}
```

But this creates repeated code. Generics solve this problem elegantly.

## Basic Generic Function

A generic type parameter works like a variable for a type. The common name is `T`, but we can use meaningful names too.

```ts
function identity<T>(value: T): T {
  return value;
}

const message = identity<string>("Hello");
const count = identity<number>(100);
```

Here, `T` becomes `string` for `message` and `number` for `count`. TypeScript keeps the correct type for each call.

TypeScript can also infer the type automatically:

```ts
const isActive = identity(true);
```

In this case, TypeScript understands that `isActive` is a boolean.

## Reusable Functions with Arrays

Generics are very useful when working with arrays because the same logic can apply to many data types.

```ts
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirstItem([10, 20, 30]);
const firstName = getFirstItem(["Ayesha", "Karim", "Nadia"]);
```

`firstNumber` is typed as `number | undefined`, and `firstName` is typed as `string | undefined`. The function is reusable, but it remains strictly typed.

## Generic Interfaces

Generics can also be used in interfaces. This is helpful when building reusable data structures.

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

type User = {
  id: number;
  name: string;
};

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "Rahim",
  },
};
```

The `ApiResponse<T>` interface can now be reused for users, products, orders, or any other data structure.

```ts
type Product = {
  id: number;
  price: number;
};

const productResponse: ApiResponse<Product[]> = {
  success: true,
  data: [
    { id: 101, price: 500 },
    { id: 102, price: 750 },
  ],
};
```

TypeScript knows that `productResponse.data` is an array of `Product` objects.

## Generic Constraints

Sometimes we want a generic function to accept many types, but those types must have a certain property. This is where constraints are useful.

```ts
function printLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}

printLength("Hello");
printLength([1, 2, 3]);
```

The constraint `T extends { length: number }` means the value can be any type, but it must have a `length` property. So strings and arrays work, but a plain number does not.

```ts
// Error: number does not have a length property
// printLength(123);
```

## Generic Utility Function Example

Here is a practical example: finding an item by `id`.

```ts
function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

const users = [
  { id: 1, name: "Ayesha" },
  { id: 2, name: "Karim" },
];

const user = findById(users, 2);
```

The function works with any object that has an `id`, and it returns the same object type that was passed in. So `user` is correctly typed as `{ id: number; name: string } | undefined`.

## Conclusion

Generics allow us to write flexible code without giving up strict typing. They reduce duplication, improve reusability, and help TypeScript preserve exact type information across functions, interfaces, and classes. Instead of using `any`, generics give us a safer way to build code that works with many data structures while still catching mistakes before runtime.
