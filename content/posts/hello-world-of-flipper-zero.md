---
title: "Hello World App for Flipper Zero"
date: "2022-11-23"
description: "A step-by-step guide to building your first Flipper Zero app: a Hello World application that displays a movable airplane on the screen."
tags: ["Flipper Zero", "Hardware", "C", "Tutorial"]
coverImage: ""
---

In the [previous article](/blog/flipper-zero-a-developers-first-look), we took a first look at the Flipper Zero and set up the development environment. Now it's time to write our first app!

One of the most interesting features of the Flipper Zero is that it's fully open-source and customizable. Extending the capabilities of Flipper Zero requires some knowledge of **C** and the building system of the Flipper Zero firmware.

In this tutorial, we'll build a Hello World app that displays a little airplane on the built-in display. You'll be able to move the airplane around using the Flipper's control pad.

## App Structure

Apps built for Flipper Zero are located inside the `applications_user/` directory of the firmware repository. Each app is developed in C and requires a **manifest file** to define its basic attributes and its relationship with the overall system.

Let's create a new directory for our app:

```bash
mkdir applications_user/helloflipper
```

## The Manifest File

Create a new file named `application.fam` in the `helloflipper` directory. This manifest file defines the app ID, name, type, entry point, and dependencies:

```python
App(
    appid="helloflipper",
    name="Hello Flipper",
    apptype=FlipperAppType.EXTERNAL,
    entry_point="helloflipper_app",
    requires=[
        "gui",
    ],
    stack_size=1 * 1024,
    fap_icon="icon.png",
    fap_category="Misc",
)
```

## The C Code

Now let's create the main source file `helloflipper.c`. We'll need the following headers:

```c
#include <furi.h>
#include <furi_hal.h>
#include <gui/gui.h>
#include <input/input.h>
```

Here, `furi` is short for **Flipper Universal Registry Implementation**.

### Data Model

To control the screen position for the airplane, we need to store the x and y coordinates:

```c
typedef struct {
    int x;
    int y;
} HelloFlipperModel;

typedef struct {
    HelloFlipperModel model;
    FuriMutex* model_mutex;
    FuriMessageQueue* event_queue;
    ViewPort* view_port;
    Gui* gui;
} HelloFlipper;
```

### Drawing the Screen

The draw callback function renders the airplane on screen at the current coordinates:

```c
static void helloflipper_draw_callback(Canvas* canvas, void* ctx) {
    HelloFlipper* app = ctx;
    furi_mutex_acquire(app->model_mutex, FuriWaitForever);

    canvas_clear(canvas);
    canvas_set_font(canvas, FontPrimary);
    canvas_draw_str(canvas, app->model.x, app->model.y, ">");

    furi_mutex_release(app->model_mutex);
}
```

### Handling Input

The input callback handles directional pad events to move the airplane:

```c
static void helloflipper_input_callback(InputEvent* input_event, void* ctx) {
    HelloFlipper* app = ctx;
    furi_message_queue_put(app->event_queue, input_event, FuriWaitForever);
}
```

In the main loop, we process these events and update the position:

```c
if(event.key == InputKeyUp) app->model.y -= 2;
if(event.key == InputKeyDown) app->model.y += 2;
if(event.key == InputKeyLeft) app->model.x -= 2;
if(event.key == InputKeyRight) app->model.x += 2;
```

## Running the App

Build and flash the app to your Flipper Zero, and you'll see the airplane on the screen. Use the directional pad to move it around!

You can check the complete code on GitHub: [github.com/giolaq/helloflipper](https://github.com/giolaq/helloflipper)

Tested with firmware version **0.82.3**.

Feel free to reach out on [Twitter](https://x.com/giolaq) or in the [Flipper Zero Discord community](https://flipperzero.one/discord) if you have any questions!
