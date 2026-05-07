
---

```markdown
# How Generics Help Build Reusable and Type-Safe Code in TypeScript

## Introduction

One of the most powerful features of TypeScript is **Generics**. They allow developers to create reusable components, functions, and classes that maintain strict type safety regardless of the data passed.

In this blog, we will cover:
- What generics are
- Why they are useful
- Real-world examples

---

## What are Generics?

Generics allow you to write code that works with **multiple types** while preserving type information.

### Basic Example:

```ts
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(10);
const str = identity<string>("Hello");