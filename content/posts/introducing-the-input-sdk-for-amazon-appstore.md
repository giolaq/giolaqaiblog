---
title: "Introducing the Input SDK for Amazon Appstore"
date: "2023-07-28"
description: "An introduction to the Input SDK for Amazon Appstore — enabling game developers to support keyboard, mouse, and game controller inputs."
tags: ["Amazon Appstore", "Gaming", "SDK", "Android"]
coverImage: ""
---

Imagine a skilled game developer who successfully launches a popular game for Android. Now they want to bring that experience to Amazon devices — Fire TV, Fire Tablets, and PCs via **Amazon Appstore for Windows 11 / WSA**. The **Input SDK for Amazon Appstore** helps make this transition smooth by providing on-screen display information for available inputs.

## What is the Input SDK?

The Input SDK provides a unified way to handle multiple input types across Amazon devices:

- **Game controllers** — Support for various Bluetooth and USB controllers
- **Remote controls** — Fire TV remote and third-party remotes
- **Keyboard and mouse** — Especially important for games on Windows 11 via WSA
- **Touch input** — For Fire Tablets and touch-enabled devices

## Why It Matters

Different Amazon devices support different input methods. The Input SDK abstracts away these differences, allowing you to:

- Write input handling code once
- Support multiple device types seamlessly
- Map game actions to appropriate inputs per device
- Provide consistent user experiences across the ecosystem

## Getting Started

### Native Android (Java/Kotlin)

Add the dependency: `implementation 'com.amazon.device.inputmapping:inputsdklib:1.0.0'` and implement `InputMappingProvider`.

### Unity

Download the Amazon Input SDK for Unity (`.unitypackage`) and import via **Assets > Import Package > Custom Package**.

The SDK provides a simple API for:

1. **Discovering available input devices**
2. **Mapping actions to inputs**
3. **Handling input events** consistently across device types
4. **Displaying input hints** to users based on their active controller

## Best Practices

- Always support the Fire TV remote as a baseline input method
- Provide customizable key mappings for gamers
- Test with multiple controller types
- Show context-appropriate button prompts

*Originally published on [dev.to/amazonappdev](https://dev.to/amazonappdev/introducing-the-input-sdk-for-amazon-appstore-3760)*
