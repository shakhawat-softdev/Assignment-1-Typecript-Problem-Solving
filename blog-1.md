# Why `any` is a Type Safety Hole and Why `unknown` is Safer in TypeScript

## Introduction

TypeScript is designed to bring type safety to JavaScript. However, not all types are equally safe. Among them, `any` is often referred to as a **"type safety hole"**. On the other hand, `unknown` provides a safer alternative when dealing with uncertain or dynamic data.

In this blog, we will explore:
- Why `any` is dangerous
- Why `unknown` is safer
- What type narrowing is and why it matters

---

## Why `any` is a Type Safety Hole

When you use `any`, you are basically telling TypeScript:

> "Trust me, I know what I'm doing."

This disables type checking entirely.

### Example:

```ts
let value: any = "Hello";
value = 10;
value.toUpperCase(); // ❌ Runtime error (number has no toUpperCase)