---
title: "MWC 2026: What Every Developer Building AI Features Should Know"
date: "2026-03-10"
description: "Notes from three days at MWC Barcelona, where nearly every booth had its own AI assistant, and what that means if you build AI features: think multi-assistant, and lean on open standards."
tags: ["AI", "MWC", "Agents"]
coverImage: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jaqy8tyfo86lpk02oqfz.png"
---

I spent three days at Fira Gran Via in Barcelona last week, walking the floor with my Alexa+ hat on and paying attention to how AI and voice are showing up in everyday products. The thing I kept running into: almost everyone now treats an AI assistant as table stakes. Xiaomi, Samsung, LG, Lenovo, Honor, TECNO, Deutsche Telekom, Origen, all of them had arrived at more or less the same idea without coordinating on it.

It reminded me of the moment the web stopped being built for specific browsers and started being built against standards. That same shift is underway with assistants.

## What the booths were showing

Most of these were not chatbots or summarization demos. They were full assistants with names, personalities, and a story about how they fit across a company's devices.

Xiaomi showed [Miloco](https://www.hardwarezone.com.sg/lifestyle/home/xiaomi-miloco-smart-home-ai-appliances-mwc-2026), a smart home setup built around its "Xiaomi Local Copilot." It runs on HyperOS 3 across phones, tablets, wearables, home devices, and EVs, sharing one context model across what Xiaomi calls "[Human x Car x Home](https://www.vrsus.io/xiaomi-shows-off-its-human-x-car-x-home-ai-ecosystem-at-mwc-2026/)." LG Uplus brought [ixi-O](https://en.sedaily.com/technology/2026/03/03/lg-uplus-ceo-unveils-ai-voice-agent-ixi-o-at-mwc-2026), which has grown from a call assistant into [something broader](https://www.businesskorea.co.kr/news/articleView.html?idxno=264374); their CEO described where it's headed as "AI will evolve into an agent that understands context and finds tasks on its own." Samsung's [Galaxy AI](https://news.samsung.com/global/samsung-advances-galaxy-ai-and-its-connected-ecosystem-at-mwc-2026) now lets you pick between Bixby, Gemini, and Perplexity, which tells you the orchestration layer is starting to matter as much as the model underneath.

Not everyone went the pure software route. [Honor's Robot Phone](https://www.honor.com/global/news/honor-mwc2026-launch/) mounts a 200MP camera on a robotic arm, with spatial awareness and a bit of theater: it nods when it agrees and shakes its head when it doesn't. [Deutsche Telekom's Magenta AI Call Assistant](https://www.telekom.com/en/media/media-information/archive/mwc-2026-world-premiere-of-ai-powered-call-assistant-1102906) lives in the network rather than on the phone, and handles live translation, call summaries, and mid-call Q&A. [Lenovo's Qira](https://www.digitalapplied.com/blog/lenovo-qira-ai-assistant-mwc-2026-cross-device) keeps a shared memory across devices, so you can start some research on a ThinkPad, pick it up on a tablet, and finish on a phone without repeating yourself.

A couple of them were clearly built for markets I don't spend enough time thinking about. [TECNO's Ella](https://www.prnewswire.com/news-releases/tecno-unveils-ai-investment-strategies-and-upgraded-ella-ai-assistant-at-mwc-2026-302701574.html) reads and replies to WhatsApp messages, summarizes YouTube videos, and organizes tasks; TECNO says it handled over 500M AI requests in 2025, mostly in non-English languages and aimed at emerging markets. [Origen's DOMIA](https://aiunplugged.io/blog/origen-unveils-domia-at-mwc-2026-bringing-agentic-intelligence-into-the-home/) throws out if-this-then-that home automation in favor of an LLM-driven multi-agent setup, so 2pm and 10pm mean different things to it.

## The chips are there too

The silicon caught up to the pitch. [Qualcomm](https://www.qualcomm.com/news/releases/2026/03/qualcomm-powers-the-rise-of-personal-ai-with-new-snapdragon-wear) showed the [Snapdragon Wear Elite](https://www.qualcomm.com/snapdragon/news/unveiled-at-mwc-2026--truly-personal-ai-powered-by-snapdragon-we), the first wearable chip with a dedicated NPU, running 2-billion-parameter models on-device at 10 tokens per second. That's agentic AI on your wrist, no round trip to a server. [MediaTek](https://www.mediatek.com/press-room/mediatek-exemplifies-ai-and-connectivity-leadership-at-mwc-2026) went one level up with what it calls a "personal device cloud," where agents on your family's devices cooperate over Wi-Fi or 6G.

## People are building their own, too

The part I didn't expect was how much of this is happening outside the big vendors. [OpenClaw](https://en.wikipedia.org/wiki/OpenClaw) picked up [250,000 GitHub stars](https://finance.yahoo.com/news/openclawd-releases-major-platform-openclaw-150000544.html) in 60 days. It's a local agent that connects to Claude, DeepSeek, or GPT and reaches you through WhatsApp, Telegram, and Signal, and it turned into [a whole thing](https://www.cnbc.com/2026/02/02/openclaw-open-source-ai-agent-rise-controversy-clawdbot-moltbot-moltbook.html) online.

Hardware tells the same story. The Rabbit R1 sold out at $199. The Humane AI Pin never really worked commercially, and people bought it anyway. Both point in the same direction: people want AI that does something in their actual lives, not one more chat window.

## What this means if you're building

The assistant itself isn't the thing that sets you apart anymore. What matters is how deeply you fit into someone's day, and that comes down to context. An integration wired to a single assistant is fragile; the moment your user switches, you're gone. Working across several assistants is the safer bet, and that's where open standards earn their keep.

A few worth knowing:

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io): write a tool once, and any compatible assistant can use it.
- [MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview): build UIs any host can render.
- [Agent Skills](https://agentskills.io/home): package a capability any agent can invoke.
- [Context Hub](https://github.com/andrewyng/context-hub): let agents pull curated API documentation.
- [Agent-to-Agent (A2A)](https://google.github.io/A2A/): let agents find and talk to each other.
- On-device model APIs like the [Apple Foundation Model](https://developer.apple.com/documentation/FoundationModels), [Qualcomm's](https://www.qualcomm.com/developer/software/list?displayType=SDK&taxonomyFinder=/Features+and+Technologies/Artificial+Intelligence), and [MediaTek's](https://neuropilot.mediatek.com/) trade some capability for latency and privacy.

If you want concrete next steps: put an MCP server in front of your tools or product so agents can reach them, and add an MCP App if you need a UI. Publish an Agent Skill so any agent can figure out how to use what you offer. And design for context rather than commands, exposing state and history, not just actions, so an agent has enough to make a good call on the user's behalf.

## Where that leaves us

What stuck with me was how unanimous it felt. Company after company, none of them comparing notes, landed on the same bet: people want AI that genuinely helps them run their lives. If you write software, the opening right now is the assistant layer, and the way to take it is to build for the plumbing underneath rather than for any one assistant on top of it.
