# Why `any` Is a Type Safety Hole and Why `unknown` Is Safer

## Introduction

TypeScript helps us write safer JavaScript by checking types before the code runs. But this safety depends on how we use the type system. The `any` type is often called a **type safety hole** because it turns off TypeScript's checking for a value. When data is unpredictable, `unknown` is usually a better choice because it forces us to check the value before using it.

In this post, we will discuss why `any` can be dangerous, why `unknown` is safer, and how **type narrowing** helps us safely work with uncertain data.

## Why `any` Is Dangerous

When we use `any`, we are telling TypeScript to stop checking that value. TypeScript will allow almost any operation, even if the operation is unsafe.

```ts
let value: any = "Hello";

value = 42;

console.log(value.toUpperCase());
```

This code compiles, but it fails at runtime because `42` is a number, and numbers do not have a `toUpperCase()` method. The problem is that `any` hides mistakes from TypeScript.

`any` can also spread through a codebase. Once a value becomes `any`, functions that receive it may also lose type safety.

```ts
function printUserName(user: any) {
  console.log(user.name.toUpperCase());
}

printUserName({ name: "Ayesha" }); // Works
printUserName({ title: "Developer" }); // Runtime error
```

TypeScript could not warn us because `user` was typed as `any`.

## Why `unknown` Is Safer

The `unknown` type also represents a value we do not fully understand yet. However, unlike `any`, TypeScript does not allow us to use an `unknown` value directly.

```ts
let value: unknown = "Hello";

// Error: 'value' is of type 'unknown'
// console.log(value.toUpperCase());
```

This is a good restriction. TypeScript is saying: "Check what this value is before using it."

To use an `unknown` value, we must narrow its type first.

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

Now TypeScript knows that inside the `if` block, `value` is a string. So calling `toUpperCase()` is safe.

## What Is Type Narrowing?

**Type narrowing** means checking a broad type and reducing it to a more specific type. TypeScript understands common JavaScript checks like `typeof`, `instanceof`, truthy checks, and property checks.

### Narrowing with `typeof`

```ts
function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return value.toFixed(2);
  }

  return "Unsupported value";
}
```

Here, `value` starts as `unknown`. After each `typeof` check, TypeScript safely understands whether it is a string or a number.

### Narrowing Object Data

Unpredictable data often comes from APIs, forms, or user input. In those cases, `unknown` helps us validate the shape of the data.

```ts
type User = {
  name: string;
  age: number;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value &&
    typeof (value as { name: unknown }).name === "string" &&
    typeof (value as { age: unknown }).age === "number"
  );
}

function printUser(value: unknown) {
  if (isUser(value)) {
    console.log(`${value.name} is ${value.age} years old.`);
  } else {
    console.log("Invalid user data");
  }
}
```

The function `isUser` is a **type guard**. It checks the data at runtime and tells TypeScript that the value is a `User` when the check passes.

## When Should We Use `unknown`?

Use `unknown` when data can come from an unsafe or unpredictable source:

- API responses
- JSON parsing
- User input
- Third-party libraries
- Error values in `catch` blocks

```ts
try {
  throw new Error("Something went wrong");
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

This is safer than assuming every thrown value is always an `Error`.

## Conclusion

`any` is called a type safety hole because it disables TypeScript's protection and can allow runtime bugs to slip through. `unknown` is safer because it still accepts unpredictable data but forces us to check the type before using it. With type narrowing, we can safely convert uncertain values into specific, reliable types. In short: use `any` only when absolutely necessary, and prefer `unknown` when handling data you do not fully trust.
