---
title: "TV Apps in React Native - React Native London"
date: "2024-03-19"
description: "Talk at React Native London about building TV apps with React Native, a lesser-known but increasingly mature use case that's having a resurgence."
tags: ["React Native", "TV Development", "Talks"]
coverImage: ""
---

I recently had the pleasure of speaking at **React Native London** about one of my favorite topics: building TV apps with React Native.

## A Lesser-Known Use Case

React Native is widely known for mobile development, but you can also use it to build TV apps. This isn't new. **React Native has been available on TV for years**. What's changed is that the tooling around it has matured, and it's having a real resurgence in popularity.

## Why React Native for TV?

TV app development has long been split across multiple platforms, each with its own requirements:

- Apple TV (tvOS)
- Android TV
- Amazon Fire TV
- Samsung Tizen
- LG webOS

React Native lets you share significant portions of your codebase while still handling the platform-specific bits.

## Key Challenges

Building TV apps comes with unique challenges that differ from mobile development:

### 10-Foot UI
TV interfaces are viewed from across the room (the "10-foot experience"), which calls for:
- Larger text and UI elements
- Higher contrast designs
- Simplified layouts

### Focus Management
Unlike touch-based mobile apps, TV apps rely on **directional navigation**:
- Users move around with a remote control (D-pad)
- Focus states need to be clearly visible
- Navigation order has to be intuitive

### Remote Control Interaction
Different platforms have different remote control designs, but they all share the concept of directional navigation plus a select button.

### Performance
TV devices often have less processing power than modern smartphones, so performance optimization is crucial.

## The Growing Toolset

There's a solid set of libraries and tools built specifically for React Native on the big screen:

- Focus management libraries
- TV-specific UI components
- Platform-specific modules for Apple TV, Android TV, and Fire TV

## Looking Forward

Mobile and TV development are converging through React Native, and it's a fun space to work in. As the tooling keeps improving, I expect more developers to bring their mobile skills over to the TV.

## Watch the Talk

- [Part 1 on YouTube](https://www.youtube.com/watch?v=CBZTX39n2yc)
- [Part 2 on YouTube](https://www.youtube.com/watch?v=Sx9Cd1hmJns)

If you're interested in getting started, check out my [React Native for TV Workshop](https://rntv.giolaq.dev)!
