---
title: "Flipper Zero - A Developer's First Look"
date: "2022-11-22"
description: "An introduction to the Flipper Zero device from a developer's perspective: what it is, what it can do, and how to get started with development."
tags: ["Flipper Zero", "Hardware", "IoT", "Open Source"]
coverImage: ""
---

If you haven't heard of the [Flipper Zero](https://flipperzero.one/) yet, you're in for a treat. It's an open-source, multi-tool device for hardware hacking and exploration, small enough to fit in your pocket. With its cute design reminiscent of a Tamagotchi, the Flipper Zero is packed with sensors and antennas that let you interface with millions of devices.

## What is Flipper Zero?

The Flipper Zero is a portable multi-tool for pentesters and hardware geeks. It's useful for exploring the world of IoT, radio frequencies, access control systems, and more. The device includes:

- An NFC reader/writer that can emulate NFC devices, including tap-to-pay credit cards
- Bluetooth for wireless communication
- An infrared transceiver that can control IR devices like TVs and air conditioners
- A sub-GHz radio for interacting with devices on various radio frequencies
- GPIO pins for connecting to external hardware
- A USB-C port for connecting to your computer
- A micro-SD card reader for expanding storage

The best part is that it's fully open-source and customizable. You can extend its capabilities by writing your own apps and plugins.

## Getting Started with Development

When I first got my Flipper Zero, I was eager to start developing for it. However, I found the development workflow somewhat unclear from the official docs and the project's README. That's why I decided to write this post and create a sample app to help others get up and running quickly.

### Step 0: Clone the Firmware

The first step is to clone the Flipper Zero firmware repository:

```bash
git clone --recursive https://github.com/flipperdevices/flipperzero-firmware.git
cd flipperzero-firmware
```

### The Flipper Build Tool (FBT)

The Flipper Build Tool (FBT) is the command-line tool you'll use for building firmware and apps. From within the firmware repo's root directory, you can launch it with:

```bash
./fbt
```

This will build the firmware. The build system handles all dependencies and compilation automatically.

### Flashing the Firmware

Once the build is complete, you can install the firmware on your Flipper Zero by connecting it via USB-C and running:

```bash
./fbt flash_usb
```

This will flash the newly built firmware to your device.

## What's Next?

Now that you have the development environment set up and know how to build and flash firmware, you're ready to start creating your own apps! In the next post, I'll walk through creating a Hello World app for the Flipper Zero.

The Flipper Zero community is active and helpful. You can join the [Discord community](https://flipperzero.one/discord) to connect with other developers and get help.

The next post gets into actual app development.
