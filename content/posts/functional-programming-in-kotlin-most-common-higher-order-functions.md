---
title: "Functional Programming in Kotlin: Most Common Higher-Order Functions"
date: "2023-03-30"
description: "Exploring the most commonly used higher-order functions in Kotlin — map, filter, fold, reduce, flatMap, and how to compose them together."
tags: ["Kotlin", "Functional Programming", "Software Development"]
coverImage: ""
---

In the [previous article](/blog/functional-programming-in-kotlin-higher-order-functions), we explored higher-order functions and how they work in Kotlin. Now let's dive deeper into the most commonly used higher-order functions available in Kotlin's standard library.

These functions can be used to simplify code and create more expressive and readable programs. The ability to compose them together is one of the key benefits of functional programming.

## map

The `map` function transforms each element in a collection using a given function:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }
// [2, 4, 6, 8, 10]
```

## filter

The `filter` function selects elements that satisfy a predicate:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6)
val evens = numbers.filter { it % 2 == 0 }
// [2, 4, 6]
```

## fold

The `fold` function accumulates a value starting from an initial value, applying an operation from left to right:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val sum = numbers.fold(0) { acc, number -> acc + number }
// 15
```

`fold` is incredibly versatile. You can use it to build strings, transform data structures, and much more:

```kotlin
val words = listOf("Hello", "World", "from", "Kotlin")
val sentence = words.fold("") { acc, word ->
    if (acc.isEmpty()) word else "$acc $word"
}
// "Hello World from Kotlin"
```

## reduce

Similar to `fold`, but uses the first element as the initial value:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val product = numbers.reduce { acc, number -> acc * number }
// 120
```

## flatMap

The `flatMap` function transforms each element into a collection and then flattens the results into a single list:

```kotlin
val sentences = listOf("Hello World", "Functional Programming")
val words = sentences.flatMap { it.split(" ") }
// ["Hello", "World", "Functional", "Programming"]
```

## Composing Higher-Order Functions

The real power comes from composing these functions together:

```kotlin
data class Person(val name: String, val age: Int, val hobbies: List<String>)

val people = listOf(
    Person("Alice", 30, listOf("reading", "coding")),
    Person("Bob", 25, listOf("gaming", "coding", "music")),
    Person("Charlie", 35, listOf("reading", "cooking"))
)

// Find all unique hobbies of people over 28
val hobbies = people
    .filter { it.age > 28 }
    .flatMap { it.hobbies }
    .distinct()
    .sorted()
// ["coding", "cooking", "reading"]
```

This approach allows us to create complex operations by combining simple building blocks. It reduces the complexity of code, makes it easier to reason about, and enables the creation of reusable code.

## Conclusion

These higher-order functions — `map`, `filter`, `fold`, `reduce`, and `flatMap` — are the workhorses of functional programming in Kotlin. Mastering them will make your code more concise, readable, and maintainable.

In the next article, we'll explore **recursion** and how to use it effectively in Kotlin with tail recursion optimization.
