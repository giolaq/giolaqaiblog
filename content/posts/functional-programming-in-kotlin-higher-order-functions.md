---
title: "Functional Programming in Kotlin: Higher-Order Functions"
date: "2023-03-29"
description: "Understanding higher-order functions in Kotlin: lambda expressions, anonymous functions, function references, and how they differ in behavior."
tags: ["Kotlin", "Functional Programming", "Software Development"]
coverImage: ""
---

In Kotlin, functions are **first-class citizens**, which means we can use them just like any other value. We can pass functions as arguments to other functions, return functions from functions, and even store functions in variables.

The functions that can receive a function as an argument are called **higher-order functions**, and they show up everywhere once you start writing in a functional style.

## Defining Higher-Order Functions

A higher-order function is simply a function that takes one or more functions as parameters, or returns a function as its result:

```kotlin
fun <T> applyOperation(value: T, operation: (T) -> T): T {
    return operation(value)
}
```

Here, `applyOperation` takes a value and a function `operation` that transforms the value.

## Lambda Expressions

Lambda expressions provide a concise way to define anonymous functions:

```kotlin
val double = { x: Int -> x * 2 }
val result = applyOperation(5, double) // 10
```

You can also pass lambda expressions directly:

```kotlin
val result = applyOperation(5) { it * 2 } // 10
```

## Anonymous Functions

Anonymous functions are similar to lambda expressions but use the `fun` keyword:

```kotlin
val double = fun(x: Int): Int {
    return x * 2
}
```

## Function References

You can reference existing functions using the `::` operator:

```kotlin
fun double(x: Int): Int = x * 2

val result = applyOperation(5, ::double) // 10
```

## Key Difference: Non-Local Returns

Lambda expressions and anonymous functions differ in their behavior of **non-local returns**:

- If we use the `return` statement without a label inside a **lambda expression**, it will return from the **enclosing function**
- If we use `return` inside an **anonymous function**, it will return from the **anonymous function itself**

```kotlin
fun findFirstNegative(numbers: List<Int>): Int? {
    // Using lambda - return exits findFirstNegative
    numbers.forEach {
        if (it < 0) return it
    }
    return null
}

fun findFirstNegativeAnon(numbers: List<Int>): Int? {
    var result: Int? = null
    // Using anonymous function - return exits only the anonymous function
    numbers.forEach(fun(number) {
        if (number < 0) {
            result = number
            return // Returns from anonymous function only
        }
    })
    return result
}
```

## Composing Functions

A big part of what makes higher-order functions useful is **function composition**, combining simple functions to build more complex ones:

```kotlin
fun <A, B, C> compose(f: (B) -> C, g: (A) -> B): (A) -> C {
    return { a -> f(g(a)) }
}

val addOne = { x: Int -> x + 1 }
val double = { x: Int -> x * 2 }

val addOneThenDouble = compose(double, addOne)
println(addOneThenDouble(3)) // 8
```

## Wrapping Up

Higher-order functions are the foundation of functional programming in Kotlin. They let you reuse and abstract logic, and composing them keeps your code expressive and maintainable.

The next article covers the most commonly used higher-order functions in Kotlin's standard library, including `map`, `filter`, and `fold`.
