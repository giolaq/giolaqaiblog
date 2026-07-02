---
title: "Functional Programming in Kotlin: Recursion"
date: "2023-04-01"
description: "Understanding recursion in functional programming with Kotlin, from basic recursion to tail recursion optimization using the tailrec keyword."
tags: ["Kotlin", "Functional Programming", "Software Development"]
coverImage: ""
---

Recursion is a fundamental concept in functional programming. Instead of using loops with mutable state, functional programmers use recursion to express repetitive computations.

## What is Recursion?

A recursive function is a function that calls itself to solve a problem. Each recursive call works on a smaller subproblem until a **base case** is reached:

```kotlin
fun factorial(n: Int): Int {
    return if (n <= 1) 1
    else n * factorial(n - 1)
}

println(factorial(5)) // 120
```

## The Problem with Recursion: Stack Overflow

Each recursive call adds a new frame to the call stack. For large inputs, this can lead to a `StackOverflowError`:

```kotlin
// This will crash for large n!
fun factorial(n: Long): Long {
    return if (n <= 1) 1L
    else n * factorial(n - 1)
}
```

## Tail Recursion to the Rescue

A function is **tail-recursive** when the recursive call is the very last operation in the function. Kotlin can optimize tail-recursive functions with the `tailrec` keyword, transforming the recursion into a loop under the hood:

```kotlin
tailrec fun factorialTailRec(n: Long, accumulator: Long = 1): Long {
    return if (n <= 1) accumulator
    else factorialTailRec(n - 1, n * accumulator)
}

println(factorialTailRec(20)) // 2432902008176640000
```

The `tailrec` modifier tells the compiler to optimize the recursion. The recursive call must be in the **tail position**: it has to be the last thing the function does.

## Fibonacci with Tail Recursion

The classic Fibonacci sequence can be implemented with tail recursion:

```kotlin
tailrec fun fibonacci(n: Int, a: Long = 0, b: Long = 1): Long {
    return if (n == 0) a
    else fibonacci(n - 1, b, a + b)
}

println(fibonacci(10)) // 55
println(fibonacci(50)) // 12586269025
```

## Recursive Data Processing

Recursion is particularly useful for processing recursive data structures like lists and trees:

```kotlin
fun <T> List<T>.head(): T = first()
fun <T> List<T>.tail(): List<T> = drop(1)

fun sumList(numbers: List<Int>): Int {
    return if (numbers.isEmpty()) 0
    else numbers.head() + sumList(numbers.tail())
}
```

And with tail recursion:

```kotlin
tailrec fun sumListTailRec(
    numbers: List<Int>,
    accumulator: Int = 0
): Int {
    return if (numbers.isEmpty()) accumulator
    else sumListTailRec(numbers.tail(), accumulator + numbers.head())
}
```

## When to Use Recursion

Recursion works well for:

- Tree-like structures such as file systems, DOM trees, and JSON parsing
- Divide and conquer algorithms like merge sort and quicksort
- Mathematical computations such as factorial, Fibonacci, and power functions
- Problems that naturally decompose into smaller subproblems

## Conclusion

Recursion is a core part of the functional programmer's toolkit. With Kotlin's `tailrec` keyword, you can write clean recursive solutions without worrying about stack overflow errors.

The next article covers **lazy evaluation**, a technique that defers computation until the result is actually needed.
