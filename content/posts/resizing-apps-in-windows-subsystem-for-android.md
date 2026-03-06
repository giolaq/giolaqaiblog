---
title: "Resizing Apps in Windows Subsystem for Android (WSA)"
date: "2022-11-18"
description: "How to handle app resizing in Windows Subsystem for Android to ensure a great experience on Windows 11 devices."
tags: ["Amazon Appstore", "Android", "Windows", "Tutorial"]
coverImage: ""
---

With the Amazon Appstore available on **Windows 11** through the **Windows Subsystem for Android (WSA)**, Android developers have a new platform to consider. One of the key challenges is handling **app resizing** — since Windows users expect to freely resize application windows.

## The Challenge

Mobile apps are typically designed for fixed screen orientations and sizes. On Windows 11 via WSA, users can:

- **Resize the app window** freely by dragging edges
- **Snap windows** to different screen regions
- **Run apps alongside** other desktop applications
- **Switch between portrait and landscape** layouts

## Best Practices for Resizing

To ensure your app works well on WSA:

### Responsive Layouts

- Use flexible layout containers that adapt to different sizes
- Avoid hardcoded dimensions
- Test at various window sizes and aspect ratios

### Configuration Changes

- Handle configuration changes gracefully
- Preserve state during resize events
- Consider using ViewModel to survive configuration changes

### Multi-Window Support

- Support split-screen and freeform multi-window modes
- Test your app's behavior when resized to very small or very large dimensions

## Testing

The best way to test resizing behavior is directly on a Windows 11 machine with WSA installed. You can also use Android emulators in freeform mode to simulate similar behavior.

## Source Code

[giolaq/android-wsa-demo](https://github.com/giolaq/android-wsa-demo) — Sample Android app showcasing best practices when optimizing for Windows Subsystem for Android.

*Originally published on [dev.to/amazonappdev](https://dev.to/amazonappdev/resizing-apps-in-windows-subsystem-for-android-wsa-jj3)*
