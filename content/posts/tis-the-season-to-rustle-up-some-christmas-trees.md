---
title: "Tis the Season to Rustle Up Some Christmas Trees!"
date: "2022-12-24"
description: "A fun Rust tutorial for building a colorful Christmas tree CLI application using termion and clap."
tags: ["Rust", "CLI", "Christmas"]
coverImage: ""
---

Ho ho ho! It's that time of year again, when the jolly old man in red comes down the chimney and the air is filled with the scent of pine and eggnog. And what better way to get into the holiday spirit than by rustling up some festive Christmas trees in Rust? In this tutorial, we'll be using the [termion](https://crates.io/crates/termion) crate to handle terminal input and output, and the [clap](https://crates.io/crates/clap) crate to parse command line arguments. So grab your hot cocoa, put on your ugly Christmas sweater, and let's get coding!

## Step 1: Create a New Rust Project and Add Dependencies

First things first, let's create a new Rust project using [cargo](https://doc.rust-lang.org/cargo/), the Rust package manager. Open up a terminal and run the following command:

```sh
$ cargo new christmas_tree --bin
```

This creates a new Rust project called `christmas_tree` with a binary target (a standalone executable). Next, add the `termion` and `clap` crates to your `Cargo.toml` file by adding the following lines to the `dependencies` section:

```toml
termion = "1.5.5"
clap = "2.33.0"
```

We also need another crate: `rand`, to add some randomized color to our project:

```toml
rand = "0.7"
```

## Step 2: Import the Crates

Add the following lines at the top of your `src/main.rs` file:

```rust
use termion::{color, style};
use clap::{App, Arg};
```

The `color` module provides functions for setting the foreground and background colors of text in the terminal, and the `style` module provides functions for setting the text style (e.g. bold, italic, underline). The `App` and `Arg` macros are provided by the `clap` crate to define and parse command line arguments.

## Step 3: Define the Command Line Arguments

Use the `App` and `Arg` macros provided by the `clap` crate to define the command line arguments for your program:

```rust
let matches = App::new("my_program")
    .arg(
        Arg::with_name("tree_height")
            .help("The height of the tree")
            .required(true)
            .takes_value(true),
    )
    .arg(
        Arg::with_name("color")
            .help("Whether to color the asterisks or not")
            .short("c")
            .long("color")
            .takes_value(false),
    )
    .get_matches();
```

## Step 4: Parse the Command Line Arguments

```rust
let tree_height: usize = matches
    .value_of("tree_height")
    .unwrap()
    .parse()
    .unwrap();
```

## Step 5: Print the Top of the Tree

```rust
println!("{}{}{}", color::Fg(color::Yellow), " ".repeat(tree_height-1), "*");
```

This prints a shiny yellow star at the top of the tree.

## Step 6: Loop Through the Rows of the Tree

```rust
for i in 1..tree_height {
    let color_index = rand::random::<usize>() % 3;
    let indent = " ".repeat(tree_height - i - 1);
    match color_index {
        0 => println!("{}{}{}", color::Fg(color::Green), indent, "*".repeat(2 * i + 1)),
        1 => println!("{}{}{}", color::Fg(color::Red), indent, "*".repeat(2 * i + 1)),
        2 => println!("{}{}{}", color::Fg(color::LightBlue), indent, "*".repeat(2 * i + 1)),
        _ => unreachable!(),
    };
}
```

## Step 7: Put It All Together

Here is the complete code for the Christmas tree command line application:

```rust
use clap::{App, Arg};
use termion::color;

fn main() {
    let matches = App::new("my_program")
        .arg(
            Arg::with_name("tree_height")
                .help("The height of the tree")
                .required(true)
                .takes_value(true),
        )
        .arg(
            Arg::with_name("color")
                .help("Whether to color the asterisks or not")
                .short("c")
                .long("color")
                .takes_value(false),
        )
        .get_matches();

    let tree_height: usize = matches
        .value_of("tree_height")
        .unwrap()
        .parse()
        .unwrap();

    println!("{}{}{}", color::Fg(color::Yellow), " ".repeat(tree_height-1), "*");

    for i in 1..tree_height {
        let color_index = rand::random::<usize>() % 3;
        let indent = " ".repeat(tree_height - i - 1);
        match color_index {
            0 => println!("{}{}{}", color::Fg(color::Green), indent, "*".repeat(2 * i + 1)),
            1 => println!("{}{}{}", color::Fg(color::Red), indent, "*".repeat(2 * i + 1)),
            2 => println!("{}{}{}", color::Fg(color::LightBlue), indent, "*".repeat(2 * i + 1)),
            _ => unreachable!(),
        };
    }
}
```

To run the program:

```sh
cargo run 7
```

## All the Code

If you want to check the complete project, head to the [christmastree GitHub repo](https://github.com/giolaq/christmastree).

## Conclusion

Well, that's it! You've just rustled up a Christmas tree command line application in Rust. You can now sit back with a mug of eggnog and admire your handiwork, or add your own festive touches to the code. I hope you've had a jolly good time following this tutorial and learned something new. Merry Christmas and Happy Holidays to all, and to all a good night!
