---
title: "Functional Programming in Kotlin: Immutability"
date: "2023-04-04"
description: "Understanding immutability in functional programming with Kotlin: immutable data structures, thread safety, and using val properties and data classes."
tags: ["Kotlin", "Functional Programming", "Software Development"]
coverImage: ""
---

Immutability is one of the core principles of functional programming. An immutable object is one whose state cannot be modified after it is created. Instead of changing existing data, you create new data with the desired modifications.

## Why Immutability Matters

Immutable data structures offer several important advantages:

### Thread Safety Without Locking

When data cannot be modified, it's inherently safe to share between threads. There's no need for locks, synchronization, or other concurrency primitives:

```kotlin
// Immutable - safe to share between threads
val config = AppConfig(
    host = "localhost",
    port = 8080,
    debug = false
)
```

### Predictability

With immutable data, you can be confident that a value won't change unexpectedly. This makes code easier to reason about and debug:

```kotlin
val original = listOf(1, 2, 3)
val modified = original + 4
// original is still [1, 2, 3]
// modified is [1, 2, 3, 4]
```

### Easier Testing

Immutable objects are easier to test because they don't have hidden state changes. You can create a value, pass it through functions, and verify the output without worrying about side effects.

## Immutability in Kotlin

Kotlin provides excellent support for immutability through several language features:

### `val` vs `var`

The simplest form of immutability in Kotlin is using `val` instead of `var`:

```kotlin
val name = "Giovanni"  // Cannot be reassigned
var age = 30           // Can be reassigned
```

### Data Classes

Data classes with `val` properties create immutable value objects:

```kotlin
data class User(
    val name: String,
    val email: String,
    val age: Int
)

val user = User("Giovanni", "gio@example.com", 30)
// user.name = "New Name"  // Compilation error!
```

### The `copy` Function

Data classes provide a `copy` function for creating modified copies:

```kotlin
val user = User("Giovanni", "gio@example.com", 30)
val updatedUser = user.copy(age = 31)
// user is unchanged, updatedUser has the new age
```

### Immutable Collections

Kotlin distinguishes between mutable and immutable collections:

```kotlin
// Immutable (read-only)
val numbers: List<Int> = listOf(1, 2, 3)
val map: Map<String, Int> = mapOf("a" to 1, "b" to 2)

// Mutable
val mutableNumbers: MutableList<Int> = mutableListOf(1, 2, 3)
mutableNumbers.add(4) // OK
```

## Mutable vs Immutable: A Comparison

Here are the mutable and immutable approaches to a common task, updating items in a list:

### Mutable Approach

```kotlin
fun updateUserAge(users: MutableList<User>, name: String, newAge: Int) {
    for (i in users.indices) {
        if (users[i].name == name) {
            users[i] = users[i].copy(age = newAge)
        }
    }
}
```

### Immutable Approach

```kotlin
fun updateUserAge(users: List<User>, name: String, newAge: Int): List<User> =
    users.map { user ->
        if (user.name == name) user.copy(age = newAge)
        else user
    }
```

The immutable approach:
- Returns a new list instead of modifying the original
- Uses `map` to transform elements
- Is easier to test and reason about
- Is safe to use in concurrent contexts

## Persistent Data Structures

For performance-critical applications, consider using persistent data structures that share structure between versions. Libraries like `kotlinx.collections.immutable` provide efficient immutable collections:

```kotlin
val list = persistentListOf(1, 2, 3)
val newList = list.add(4)
// Both lists share internal structure for efficiency
```

## Wrapping Up

Immutability leads to safer, more predictable code, and Kotlin makes it easy to work this way with `val` properties, data classes, and read-only collections. Default to immutability, reach for mutability only when you actually need it, and your code will be easier to understand, test, and maintain.

The next article covers lazy evaluation, an optimization technique that defers computation until the result is actually needed.
