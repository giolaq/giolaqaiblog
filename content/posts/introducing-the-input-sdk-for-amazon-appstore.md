---
title: "Introducing the Input SDK for Amazon Appstore"
date: "2023-07-28"
description: "An introduction to the Input SDK for Amazon Appstore, enabling game developers to support keyboard, mouse, and game controller inputs."
tags: ["Amazon Appstore", "Gaming", "SDK", "Android"]
coverImage: ""
---

Say you've launched a popular game on Android and now want to bring it to Amazon devices: Fire TV, Fire Tablets, and PCs through the Amazon Appstore for Windows 11 / WSA. The Input SDK for Amazon Appstore helps make that transition smooth by providing on-screen display information for the inputs available on each device.

## What is the Input SDK?

The Input SDK gives you a single way to handle several input types across Amazon devices:

- Game controllers, including a range of Bluetooth and USB controllers
- Remote controls, such as the Fire TV remote and third-party remotes
- Keyboard and mouse, which matter especially for games on Windows 11 via WSA
- Touch input for Fire Tablets and touch-enabled devices

## Why It Matters

Different Amazon devices support different input methods. The Input SDK hides those differences, so you can:

- Write input handling code once
- Support multiple device types seamlessly
- Map game actions to the right inputs on each device
- Give players a consistent experience across Amazon devices

## Getting Started

### Native Android (Java/Kotlin)

Add the dependency: `implementation 'com.amazon.device.inputmapping:inputsdklib:1.0.0'` and implement `InputMappingProvider`.

### Unity

Download the Amazon Input SDK for Unity (`.unitypackage`) and import it via Assets > Import Package > Custom Package.

The SDK gives you a simple API to:

1. Discover the available input devices
2. Map actions to inputs
3. Handle input events consistently across device types
4. Show input hints to users based on their active controller

## Best Practices

- Always support the Fire TV remote as a baseline input method
- Provide customizable key mappings for gamers
- Test with multiple controller types
- Show context-appropriate button prompts

*Originally published on [dev.to/amazonappdev](https://dev.to/amazonappdev/introducing-the-input-sdk-for-amazon-appstore-3760)*
