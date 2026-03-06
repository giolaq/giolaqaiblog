---
title: "Functional Programming in Kotlin: Pure and Total Functions"
date: "2023-04-11"
description: "Understanding pure functions and total functions in Kotlin — writing side-effect-free code and using the Either data type for error handling."
tags: ["Kotlin", "Functional Programming", "Software Development"]
coverImage: ""
---

In functional programming, **pure functions** and **total functions** are fundamental concepts that help us write predictable, testable, and reliable code.

## Pure Functions

A pure function has two key properties:

1. **No side effects** — It doesn't modify any external state, perform I/O, or depend on anything other than its inputs
2. **Deterministic** — Given the same inputs, it always returns the same output

### Example: Pure vs Impure

```kotlin
// Impure - depends on external state
var counter = 0
fun incrementAndGet(): Int {
    counter++
    return counter
}

// Pure - depends only on inputs
fun add(a: Int, b: Int): Int = a + b
```

### Benefits of Pure Functions

- **Testability** — Easy to test since output depends only on input
- **Cacheability** — Results can be memoized safely
- **Parallelism** — Safe to run in parallel since there's no shared state
- **Reasoning** — Easy to understand and debug

## Total Functions

A **total function** is a function that returns a valid result for **every possible input** in its domain. In contrast, a **partial function** may throw exceptions or fail for some inputs:

```kotlin
// Partial function - throws for empty list
fun List<Int>.unsafeHead(): Int = this[0]

// Total function - handles all cases
fun List<Int>.safeHead(): Int? = this.firstOrNull()
```

## Error Handling with Either

In functional programming, it is common to avoid exceptions and use data types that represent possible failures instead. This helps to ensure that the program's behavior is predictable and the handling of errors is more explicit.

Instead of throwing exceptions, we can use the **Either** data type to represent either a success (Right) or a failure (Left):

```kotlin
sealed class Either<out L, out R> {
    data class Left<out L>(val value: L) : Either<L, Nothing>()
    data class Right<out R>(val value: R) : Either<Nothing, R>()

    fun <T> map(f: (R) -> T): Either<L, T> = when (this) {
        is Left -> this
        is Right -> Right(f(value))
    }

    fun <T> flatMap(f: (R) -> Either<L, T>): Either<L, T> = when (this) {
        is Left -> this
        is Right -> f(value)
    }
}
```

### Using Either for Error Handling

```kotlin
sealed class AppError {
    data class NotFound(val message: String) : AppError()
    data class ValidationError(val message: String) : AppError()
}

fun divide(a: Int, b: Int): Either<AppError, Int> {
    return if (b == 0)
        Either.Left(AppError.ValidationError("Division by zero"))
    else
        Either.Right(a / b)
}

fun parseAge(input: String): Either<AppError, Int> {
    val age = input.toIntOrNull()
    return if (age != null && age > 0)
        Either.Right(age)
    else
        Either.Left(AppError.ValidationError("Invalid age: $input"))
}
```

### Pattern Matching with Either

We can use Kotlin's `when` expression to handle Either values:

```kotlin
when (val result = divide(10, 2)) {
    is Either.Left -> println("Error: ${result.value}")
    is Either.Right -> println("Result: ${result.value}")
}
```

The Either type is a powerful tool for functional programming. It makes error handling explicit and composable, allowing you to chain operations together without worrying about exceptions.

## Conclusion

Pure and total functions are the building blocks of reliable functional code. By avoiding side effects and handling all possible inputs explicitly, you create code that is easier to test, reason about, and maintain.

In the next article, we'll explore **Functors** — a pattern that generalizes the concept of mapping over values in a container.
