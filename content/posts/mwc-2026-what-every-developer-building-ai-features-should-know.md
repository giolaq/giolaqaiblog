---
title: "MWC 2026: What Every Developer Building AI Features Should Know"
date: "2026-03-10"
description: "Notes from three days at MWC in Barcelona, where nearly every booth had its own AI assistant, and why that pushes anyone building AI features toward multi-assistant thinking and open standards."
tags: ["AI", "MWC", "Agents"]
coverImage: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jaqy8tyfo86lpk02oqfz.png"
---

Last week I spent three days at MWC in Barcelona, at the Fira Gran Via. I work on Alexa+, so I mostly wanted to see how everyone else is thinking about AI and voice. For all the variety on the floor, the assistant itself has become a default feature rather than something that sets a product apart. Xiaomi, Samsung, LG, Lenovo, Honor, TECNO, Deutsche Telekom, and Origen all shipped or showed one, and they seem to have gotten there independently.

The closest comparison I can come up with is the early web, when people stopped building pages for one particular browser and started writing to standards instead. Assistants are roughly at that point now.

## What the booths were showing

These weren't the usual chatbot or summarization demos. Several were full assistants, with names and personalities and a pitch for how they work across a company's devices.

Xiaomi showed [Miloco](https://www.hardwarezone.com.sg/lifestyle/home/xiaomi-miloco-smart-home-ai-appliances-mwc-2026), a smart-home system built on its "Xiaomi Local Copilot." It runs on HyperOS 3 across phones, tablets, wearables, home devices, and EVs, and keeps a single context model behind what Xiaomi calls "[Human x Car x Home](https://www.vrsus.io/xiaomi-shows-off-its-human-x-car-x-home-ai-ecosystem-at-mwc-2026/)." LG Uplus brought [ixi-O](https://en.sedaily.com/technology/2026/03/03/lg-uplus-ceo-unveils-ai-voice-agent-ixi-o-at-mwc-2026), which started life as a call assistant and has since grown into [something broader](https://www.businesskorea.co.kr/news/articleView.html?idxno=264374); their CEO put its direction as "AI will evolve into an agent that understands context and finds tasks on its own." Samsung's [Galaxy AI](https://news.samsung.com/global/samsung-advances-galaxy-ai-and-its-connected-ecosystem-at-mwc-2026) now lets you switch between Bixby, Gemini, and Perplexity, which I read as a sign that the orchestration layer now counts for about as much as whichever model sits under it.

Not all of it was software. [Honor's Robot Phone](https://www.honor.com/global/news/honor-mwc2026-launch/) puts a 200MP camera on a little robotic arm that tracks the room; it nods when it agrees with you and shakes its head when it doesn't, which is either charming or unsettling depending on your mood. [Deutsche Telekom's Magenta AI Call Assistant](https://www.telekom.com/en/media/media-information/archive/mwc-2026-world-premiere-of-ai-powered-call-assistant-1102906) runs inside the network instead of on the handset, and does live translation, call summaries, and mid-call Q&A. [Lenovo's Qira](https://www.digitalapplied.com/blog/lenovo-qira-ai-assistant-mwc-2026-cross-device) holds one memory across devices, so research you start on a ThinkPad carries over to a tablet and then a phone without you re-explaining yourself each time.

A couple were clearly built for markets I don't follow as closely as I should. [TECNO's Ella](https://www.prnewswire.com/news-releases/tecno-unveils-ai-investment-strategies-and-upgraded-ella-ai-assistant-at-mwc-2026-302701574.html) reads and answers WhatsApp messages, summarizes YouTube videos, and keeps track of tasks; TECNO says it served more than 500 million AI requests in 2025, most of them in languages other than English and mostly in emerging markets. [Origen's DOMIA](https://aiunplugged.io/blog/origen-unveils-domia-at-mwc-2026-bringing-agentic-intelligence-into-the-home/) drops the old if-this-then-that model of home automation for an LLM-based multi-agent one, so it treats 2pm and 10pm as genuinely different situations.

## The chips are there too

The hardware has caught up to the sales pitch. [Qualcomm](https://www.qualcomm.com/news/releases/2026/03/qualcomm-powers-the-rise-of-personal-ai-with-new-snapdragon-wear) showed the [Snapdragon Wear Elite](https://www.qualcomm.com/snapdragon/news/unveiled-at-mwc-2026--truly-personal-ai-powered-by-snapdragon-we), which it says is the first wearable chip with a dedicated NPU; it runs 2-billion-parameter models on-device at around 10 tokens per second, so a watch can run an agent without calling home to a server for every step. [MediaTek](https://www.mediatek.com/press-room/mediatek-exemplifies-ai-and-connectivity-leadership-at-mwc-2026) took it a level further with what it calls a "personal device cloud," where the agents on a household's various devices coordinate over Wi-Fi or 6G.

## People are building their own

The thing I didn't see coming was how much of this is happening outside the big companies. [OpenClaw](https://en.wikipedia.org/wiki/OpenClaw) went from nothing to [250,000 GitHub stars](https://finance.yahoo.com/news/openclawd-releases-major-platform-openclaw-150000544.html) in about two months. It's an agent you run locally that talks to Claude, DeepSeek, or GPT and reaches you over WhatsApp, Telegram, or Signal, and it snowballed into [a genuine internet saga](https://www.cnbc.com/2026/02/02/openclaw-open-source-ai-agent-rise-controversy-clawdbot-moltbot-moltbook.html).

The gadgets point the same way. The Rabbit R1 sold out at $199, and the Humane AI Pin flopped as a business yet still had people paying real money for it. Whatever you make of either one, they came from the same impulse, which is wanting AI that does something in your actual life instead of sitting in a chat box waiting to be prompted.

## What this means if you're building

If you're shipping AI features, the assistant is no longer the part that wins you anything on its own. What you compete on is how well you fit into someone's day, and that mostly comes down to context. Tie yourself to a single assistant and you're one user preference away from being cut out of the loop. Spreading across several holds up better over time, and that is the practical reason to care about open standards.

The ones I'd get familiar with:

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io) lets you write a tool once and have any compatible assistant use it.
- [MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) let you build a UI that any host can render.
- [Agent Skills](https://agentskills.io/home) package a capability so any agent can invoke it.
- [Context Hub](https://github.com/andrewyng/context-hub) gives agents a way to pull curated API docs.
- [Agent-to-Agent (A2A)](https://google.github.io/A2A/) lets agents find and talk to each other.
- On-device model APIs, including the [Apple Foundation Model](https://developer.apple.com/documentation/FoundationModels), [Qualcomm's](https://www.qualcomm.com/developer/software/list?displayType=SDK&taxonomyFinder=/Features+and+Technologies/Artificial+Intelligence), and [MediaTek's](https://neuropilot.mediatek.com/), give up a little capability in exchange for lower latency and better privacy.

Concretely, that's a handful of moves. Put an MCP server in front of whatever your product does so an agent can reach it, and add an MCP App if it needs a screen. Publish an Agent Skill so an agent can work out how to use you without a person guiding it. And lean toward context over commands, handing agents your state and history rather than only a set of actions to fire.

## Where that leaves us

The part that stuck with me is how little disagreement there was. A floor full of competitors, working separately, mostly agreed that people want AI woven into the ordinary business of their lives. If you build software, the room to move is at the assistant layer, and the smarter place to put your effort is the plumbing every assistant runs on rather than any single one of them.
