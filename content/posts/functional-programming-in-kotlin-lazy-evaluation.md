---
title: "Functional Programming in Kotlin: Lazy Evaluation"
date: "2023-04-03"
description: "Understanding lazy evaluation in Kotlin — deferring computation until needed, using the lazy delegate, sequences, and memoization."
tags: ["Kotlin", "Functional Programming", "Software Development"]
coverImage: ""
---

Lazy evaluation is an optimization technique commonly used in functional programming. The basic idea is simple: **don't evaluate a function or expression until you actually need its result**. This can save time and resources, especially when working with large data sets or complex calculations.

## Lazy Properties with `lazy`

In Kotlin, lazy evaluation is implemented through the use of the `lazy` function. This function takes a lambda expression and returns a `Lazy<T>` instance, which represents a value that hasn't yet been evaluated:

```kotlin
val expensiveValue: String by lazy {
    println("Computing...")
    "Hello, World!"
}

println("Before accessing")
println(expensiveValue) // Prints "Computing..." then "Hello, World!"
println(expensiveValue) // Prints "Hello, World!" (cached)
```

When you access the value for the first time, the lambda expression is evaluated and the result is **stored for future use**. Subsequent accesses return the cached result without re-evaluation.

## Sequences: Lazy Collections

Kotlin's `Sequence` type provides lazy evaluation for collection operations:

```kotlin
val result = sequenceOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .filter {
        println("Filtering $it")
        it % 2 == 0
    }
    .map {
        println("Mapping $it")
        it * it
    }
    .take(2)
    .toList()
// Only processes elements until it finds 2 results
// Output: [4, 16]
```

With regular lists, all elements would be processed at each step. With sequences, each element is processed through the entire chain before moving to the next.

## Memoization

Memoization is a technique where you cache the results of expensive function calls. Here's a classic example with Fibonacci:

```kotlin
fun memoize(fn: (Int) -> Long): (Int) -> Long {
    val cache = mutableMapOf<Int, Long>()
    return { n ->
        cache.getOrPut(n) { fn(n) }
    }
}

val fibonacci: (Int) -> Long = memoize { n ->
    if (n <= 1) n.toLong()
    else fibonacci(n - 1) + fibonacci(n - 2)
}

println(fibonacci(50)) // Instant result thanks to memoization
```

Without memoization, calculating `fibonacci(50)` would take an extremely long time due to redundant computations.

## Infinite Data Sets

Another advantage of lazy evaluation is that it can be used to handle **infinite data sets**. For example, suppose we have a function that generates an infinite sequence of prime numbers:

```kotlin
fun primes(): Sequence<Int> = sequence {
    var n = 2
    while (true) {
        if ((2 until n).none { n % it == 0 }) {
            yield(n)
        }
        n++
    }
}

// Get the first 10 prime numbers
val first10Primes = primes().take(10).toList()
println(first10Primes) // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

With lazy evaluation, we can create a Sequence object that only generates the next prime number when it is needed. This allows us to work with potentially infinite data without running out of memory.

## When to Use Lazy Evaluation

Lazy evaluation is beneficial when:

- **Expensive computations** may not always be needed
- Working with **large or infinite data sets**
- You want to **avoid unnecessary work** in conditional logic
- Building **data pipelines** where elements should be processed one at a time

## Conclusion

Lazy evaluation is a powerful optimization technique that helps you write more efficient code. Kotlin provides built-in support through the `lazy` delegate, sequences, and the ability to create custom lazy evaluation patterns.

In the next article, we'll explore **pure and total functions** — functions without side effects that are guaranteed to return a result for every input.
