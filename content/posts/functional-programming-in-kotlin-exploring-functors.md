---
title: "Functional Programming in Kotlin: Exploring Functors"
date: "2023-05-22"
description: "Understanding functors in Kotlin — a pattern for applying functions to values inside containers, with practical examples using List, Optional, and custom types."
tags: ["Kotlin", "Functional Programming", "Software Development"]
coverImage: ""
---

Functional programming is all about writing concise, modular, and maintainable code. One of the key concepts that enables this is the **Functor** — a design pattern that provides a mechanism to apply a function to values inside a container.

## What is a Functor?

At its core, a functor is a data type that:

1. **Encapsulates a value** (or values)
2. **Provides a `map` function** that applies a transformation to the encapsulated value(s) while preserving the container structure

In Kotlin, we can define a functor using an interface:

```kotlin
interface Functor<out A> {
    fun <B> map(f: (A) -> B): Functor<B>
}
```

## Functor Laws

For something to be a proper functor, it must obey two laws:

### Identity Law

Mapping the identity function over a functor should return the same functor:

```kotlin
functor.map { it } == functor
```

### Composition Law

Mapping two functions sequentially should be the same as mapping their composition:

```kotlin
functor.map(f).map(g) == functor.map { g(f(it)) }
```

## Built-in Functors in Kotlin

Kotlin provides several built-in types that act as functors:

### List as a Functor

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }
// [2, 4, 6, 8, 10]
```

### Nullable Types as a Functor

Kotlin's nullable types can be treated as a functor using `let`:

```kotlin
val name: String? = "Giovanni"
val length = name?.let { it.length }
// 8
```

### Result as a Functor

```kotlin
val result: Result<Int> = Result.success(42)
val mapped = result.map { it * 2 }
// Result.success(84)
```

## Custom Functor: Either

In our [previous article on pure and total functions](/blog/functional-programming-in-kotlin-pure-and-total-functions), we used an `Either` data class to handle exceptions. That class was implementing a `map` function, so it can be considered a Functor:

```kotlin
sealed class Either<out L, out R> {
    data class Left<out L>(val value: L) : Either<L, Nothing>()
    data class Right<out R>(val value: R) : Either<Nothing, R>()

    fun <T> map(f: (R) -> T): Either<L, T> = when (this) {
        is Left -> this
        is Right -> Right(f(value))
    }
}
```

Using it:

```kotlin
val result: Either<String, Int> = Either.Right(21)
val doubled = result.map { it * 2 }
// Either.Right(42)

val error: Either<String, Int> = Either.Left("Error")
val errorDoubled = error.map { it * 2 }
// Either.Left("Error") - transformation is skipped
```

## Custom Functor: Box

Let's create a simple `Box` functor to illustrate the concept:

```kotlin
data class Box<out A>(val value: A) : Functor<A> {
    override fun <B> map(f: (A) -> B): Box<B> = Box(f(value))
}

val box = Box(42)
val mapped = box.map { it.toString() }
// Box("42")
```

## Practical Example: Data Pipeline

Functors shine when building data transformation pipelines:

```kotlin
data class User(val name: String, val email: String)
data class UserDTO(val displayName: String, val contactEmail: String)

fun transformUser(user: User): UserDTO =
    UserDTO(
        displayName = user.name.uppercase(),
        contactEmail = user.email.lowercase()
    )

val users = listOf(
    User("Giovanni", "Gio@Email.com"),
    User("Alice", "Alice@Email.com")
)

val dtos = users.map(::transformUser)
```

## Conclusion

Functors provide a consistent way to apply transformations to values inside containers. By understanding functors, you gain a powerful tool for writing clean, composable, and reusable code.

This concludes our series on functional programming in Kotlin! We've covered higher-order functions, common collection operations, recursion, lazy evaluation, pure functions, and functors. With these concepts in your toolkit, you're well-equipped to write elegant functional code in Kotlin.
