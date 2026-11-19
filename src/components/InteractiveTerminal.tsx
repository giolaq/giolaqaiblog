"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { PostMeta } from "@/lib/posts";

interface TerminalProps {
  posts: PostMeta[];
  tags: string[];
}

interface Line {
  type: "input" | "output" | "error" | "ascii";
  text: string;
}

const SOCIAL = {
  github: "https://github.com/giolaq",
  twitter: "https://x.com/giolaq",
  linkedin: "https://linkedin.com/in/glaquidara",
  medium: "https://medium.com/@giolaq",
};

const MOTD = [
  "",
  "  Welcome to giolaq.dev interactive terminal",
  "  Type 'help' to see available commands.",
  "",
];

export default function InteractiveTerminal({ posts, tags }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(
    MOTD.map((text) => ({ type: "output", text }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const out = (text: string): Line => ({ type: "output", text });
  const err = (text: string): Line => ({ type: "error", text });
  const ascii = (text: string): Line => ({ type: "ascii", text });

  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      const parts = trimmed.split(/\s+/);
      const command = parts[0]?.toLowerCase() || "";
      const args = parts.slice(1).join(" ");

      addLines([{ type: "input", text: `~/giolaq $ ${trimmed}` }]);

      if (!command) return;

      switch (command) {
        case "help":
          addLines([
            out(""),
            out("  Available commands:"),
            out(""),
            out("  whoami          Who is Giovanni?"),
            out("  ls              List sections of the site"),
            out("  ls posts/       List all blog posts"),
            out("  ls projects/    List featured projects"),
            out("  ls tags/        List all blog tags"),
            out("  cat <slug>      Read a post summary"),
            out("  grep <query>    Search posts by keyword"),
            out("  find --tag <t>  Find posts by tag"),
            out("  man giovanni    Full manual page"),
            out("  latest          Show latest posts"),
            out("  topics          Show top topics by post count"),
            out("  contact         Show contact info & socials"),
            out("  neofetch        System info"),
            out("  clear           Clear terminal"),
            out("  help            Show this message"),
            out(""),
          ]);
          break;

        case "whoami":
          addLines([
            out(""),
            out("  Giovanni Laquidara"),
            out("  Senior Developer Advocate @ Amazon"),
            out("  Builder & Generalist | London, UK"),
            out(""),
            out('  "The title software engineer is giving way to builder."'),
            out(""),
          ]);
          break;

        case "man":
          addLines([
            out(""),
            ascii("  GIOVANNI(1)            giolaq.dev Manual           GIOVANNI(1)"),
            out(""),
            out("  NAME"),
            out("      Giovanni Laquidara - builder, generalist, advocate"),
            out(""),
            out("  SYNOPSIS"),
            out("      gio [--speak] [--build] [--write] TOPIC"),
            out(""),
            out("  DESCRIPTION"),
            out("      Senior Developer Advocate at Amazon. Crosses disciplines"),
            out("      across mobile, TV, agentic AI, and developer communities."),
            out("      Based in London. Builder at heart."),
            out(""),
            out("      Studied at Universita di Roma Tor Vergata. Has built"),
            out("      across mobile, VR/AR, real-time defence systems, and IoT."),
            out("      For fun: low-level programming, IoT hacking, CLI apps."),
            out(""),
            out("  OPTIONS"),
            out("      --speak    Conference talks & podcasts on React Native,"),
            out("                 TV development, agentic AI, and more"),
            out("      --build    Multi-agent AI systems, TV apps, cross-platform"),
            out("                 tools, comic generators, and vibe-coded experiences"),
            out("      --write    Blog posts on agentic AI, mobile dev, Kotlin,"),
            out("                 functional programming, hardware hacking"),
            out(""),
            out("  SEE ALSO"),
            out("      github.com/giolaq, x.com/giolaq, giolaq.dev/blog"),
            out(""),
          ]);
          break;

        case "ls": {
          const target = args.replace(/\/$/, "").toLowerCase();
          if (!target) {
            addLines([
              out(""),
              out("  posts/     blog/      about/"),
              out("  talks/     resume/    projects/"),
              out("  tags/      terminal/"),
              out(""),
            ]);
          } else if (target === "posts" || target === "blog") {
            const postLines = posts.map(
              (p) =>
                `  ${p.date.slice(0, 10)}  ${p.readingTime.padEnd(10)} ${p.title}`
            );
            addLines([out(""), ...postLines.map(out), out("")]);
          } else if (target === "tags") {
            addLines([
              out(""),
              out("  " + tags.join("  ")),
              out(""),
            ]);
          } else if (target === "projects") {
            addLines([
              out(""),
              out("  ad-genius-system/        Multi-agent AI ad generator (Python)"),
              out("  tv-mcp-app/              AI-powered TV streaming assistant (TS)"),
              out("  devtoagent/              Dev.to article generator agent (Python)"),
              out("  vibepope/                Vibe-coded experience (HTML)"),
              out("  react-native-multi-tv/   React Native TV multi-platform (TS)"),
              out("  gio-comic/               AI comic generator (Python)"),
              out(""),
            ]);
          } else {
            addLines([err(`ls: cannot access '${args}': No such file or directory`)]);
          }
          break;
        }

        case "cat": {
          if (!args) {
            addLines([err("cat: missing operand")]);
            break;
          }
          const slug = args.replace(/\.md$/, "").toLowerCase();
          const post = posts.find(
            (p) =>
              p.slug.toLowerCase() === slug ||
              p.title.toLowerCase().includes(slug)
          );
          if (!post) {
            addLines([err(`cat: ${args}: No such file or directory`)]);
          } else {
            addLines([
              out(""),
              ascii(`  --- ${post.slug}.md ---`),
              out(""),
              out(`  Title:       ${post.title}`),
              out(`  Date:        ${post.date}`),
              out(`  Reading:     ${post.readingTime}`),
              out(`  Tags:        ${post.tags.join(", ")}`),
              out(""),
              out(`  ${post.description}`),
              out(""),
              out(`  Read more: /blog/${post.slug}`),
              out(""),
            ]);
          }
          break;
        }

        case "grep": {
          if (!args) {
            addLines([err("grep: missing search pattern")]);
            break;
          }
          const q = args.toLowerCase();
          const results = posts.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.tags.some((t) => t.toLowerCase().includes(q))
          );
          if (results.length === 0) {
            addLines([out(`  No matches for "${args}"`)]);
          } else {
            addLines([
              out(""),
              out(`  Found ${results.length} match${results.length === 1 ? "" : "es"}:`),
              out(""),
              ...results.map((p) =>
                out(`  ${p.date.slice(0, 10)}  ${p.title}`)
              ),
              out(""),
            ]);
          }
          break;
        }

        case "find": {
          if (args.startsWith("--tag ")) {
            const tag = args.slice(6).trim().toLowerCase();
            const results = posts.filter((p) =>
              p.tags.some((t) => t.toLowerCase() === tag)
            );
            if (results.length === 0) {
              addLines([out(`  No posts with tag "${args.slice(6).trim()}"`)]);
            } else {
              addLines([
                out(""),
                out(`  Posts tagged "${args.slice(6).trim()}" (${results.length}):`),
                out(""),
                ...results.map((p) =>
                  out(`  ${p.date.slice(0, 10)}  ${p.title}`)
                ),
                out(""),
              ]);
            }
          } else {
            addLines([err("Usage: find --tag <tagname>")]);
          }
          break;
        }

        case "latest":
          addLines([
            out(""),
            out("  Latest posts:"),
            out(""),
            ...posts.slice(0, 5).map((p) =>
              out(`  ${p.date.slice(0, 10)}  ${p.title}`)
            ),
            out(""),
          ]);
          break;

        case "topics": {
          const counts: Record<string, number> = {};
          posts.forEach((p) => p.tags.forEach((t) => {
            counts[t] = (counts[t] || 0) + 1;
          }));
          const sorted = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
          const maxCount = sorted[0]?.[1] || 0;
          addLines([
            out(""),
            out("  Top topics by post count:"),
            out(""),
            ...sorted.map(([tag, count]) => {
              const bar = "#".repeat(Math.ceil((count / maxCount) * 20));
              return out(`  ${tag.padEnd(25)} ${bar} ${count}`);
            }),
            out(""),
          ]);
          break;
        }

        case "contact":
          addLines([
            out(""),
            out("  Get in touch:"),
            out(""),
            out(`  GitHub:    ${SOCIAL.github}`),
            out(`  Twitter:   ${SOCIAL.twitter}`),
            out(`  LinkedIn:  ${SOCIAL.linkedin}`),
            out(`  Medium:    ${SOCIAL.medium}`),
            out(`  Web:       https://giolaq.dev`),
            out(""),
          ]);
          break;

        case "neofetch":
          addLines([
            out(""),
            ascii("       ╔══════════════╗"),
            ascii("       ║  > giolaq_   ║"),
            ascii("       ║   ┌──┐ ┌──┐  ║"),
            ascii("       ║   │ .  . │    ║"),
            ascii("       ║   │  v   │    ║"),
            ascii("       ║    /|   |\\   ║"),
            ascii("       ╚══════════════╝"),
            out(""),
            out(`  OS:        giolaq.dev v1.0`),
            out(`  Kernel:    Next.js 16.1.6`),
            out(`  Shell:     terminal-ui`),
            out(`  Theme:     Tokyo Night (dark)`),
            out(`  Posts:     ${posts.length}`),
            out(`  Tags:      ${tags.length}`),
            out(`  Uptime:    since 2022`),
            out(`  Location:  London, UK`),
            out(`  Role:      Sr. DevAdvocate @ Amazon`),
            out(""),
          ]);
          break;

        case "clear":
          setLines([]);
          return;

        case "sudo":
          addLines([
            out(""),
            out("  Nice try. Giovanni is not in the sudoers file."),
            out("  This incident will be reported."),
            out(""),
          ]);
          break;

        case "rm":
          addLines([
            out(""),
            out("  rm: refusing to remove '/': the blog must go on"),
            out(""),
          ]);
          break;

        case "vim":
        case "nano":
        case "emacs":
          addLines([
            out(""),
            out(`  ${command}: this is a read-only terminal. Try 'cat' instead.`),
            out(""),
          ]);
          break;

        case "exit":
          addLines([
            out(""),
            out("  logout"),
            out("  Connection to giolaq.dev closed."),
            out("  (just kidding, you can keep typing)"),
            out(""),
          ]);
          break;

        case "cd": {
          const dest = args.replace(/\/$/, "").toLowerCase();
          const routes: Record<string, string> = {
            "": "/",
            "~": "/",
            home: "/",
            blog: "/blog",
            posts: "/blog",
            about: "/about",
            resume: "/resume",
            talks: "/talks",
            terminal: "/terminal",
          };
          if (dest in routes) {
            addLines([out(`  Navigating to ${routes[dest]}...`)]);
            setTimeout(() => {
              window.location.href = routes[dest];
            }, 500);
          } else {
            addLines([err(`cd: ${args}: No such directory`)]);
          }
          break;
        }

        default:
          addLines([
            err(`command not found: ${command}`),
            out("  Type 'help' for available commands."),
          ]);
      }
    },
    [posts, tags, addLines]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
    }
    execute(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "help", "whoami", "ls", "cat", "grep", "find", "man",
        "latest", "topics", "contact", "neofetch", "clear", "cd", "exit",
      ];
      const match = commands.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="terminal-box flex flex-col overflow-hidden"
      style={{ height: "calc(100vh - 200px)", minHeight: "400px" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-dashed border-border px-4 py-3 shrink-0">
        <span className="h-2 w-2 rounded-full bg-term-red" />
        <span className="h-2 w-2 rounded-full bg-term-yellow" />
        <span className="h-2 w-2 rounded-full bg-term-green" />
        <span className="ml-2 text-xs text-muted">giolaq@dev: ~/terminal</span>
      </div>

      {/* Terminal output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "input"
                ? "text-term-green"
                : line.type === "error"
                ? "text-term-red"
                : line.type === "ascii"
                ? "text-accent"
                : "text-muted"
            }
          >
            <pre className="whitespace-pre-wrap m-0 font-[inherit]">{line.text || "\u00A0"}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-dashed border-border px-4 py-3 shrink-0"
      >
        <span className="text-xs text-term-green">~/giolaq $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-border"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
        <span className="cursor-blink text-accent text-xs">█</span>
      </form>
    </div>
  );
}
