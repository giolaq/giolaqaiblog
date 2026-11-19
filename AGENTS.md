# AGENTS.md — giolaq.dev

Instructions for AI coding agents interacting with this repository.

## Project Overview

This is a Next.js 16 personal website and blog deployed on Vercel at https://giolaq.dev. It features a public read-only JSON API, MCP server endpoint, and agent-discovery files.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** Markdown files in `content/posts/`
- **Deployment:** Vercel

## Key Directories

- `src/app/` — Next.js App Router pages and API routes
- `src/app/api/` — JSON API endpoints (posts, author, agent-view)
- `src/app/.well-known/` — Agent discovery endpoints (agent-card, MCP, api-catalog)
- `src/components/` — React components
- `src/lib/` — Utilities (posts parser, constants)
- `content/posts/` — Markdown blog posts
- `public/` — Static files (llms.txt, openapi.json, images)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```

## API Endpoints

All public, no auth required:

- `GET /api/posts` — List all blog posts
- `GET /api/posts/{slug}` — Get single post with content
- `GET /api/author` — Author info

## Agent Discovery

- `/llms.txt` — LLM context file
- `/.well-known/agent-card.json` — A2A agent card
- `/.well-known/agent-skills/index.json` — Skills index (v0.2.0)
- `/.well-known/mcp` — Streamable HTTP MCP endpoint
- `/.well-known/mcp/server-card.json` — MCP server metadata
- `/.well-known/api-catalog` — RFC 9727 API catalog
- `/auth.md` — Auth guide (none required)
- `/openapi.json` — API specification
- `/index.md` — Markdown homepage
- `/?mode=agent` — Structured JSON agent view

## Conventions

- Blog posts are Markdown with YAML frontmatter (title, date, description, tags)
- API errors return JSON: `{error, message, status}`
- All routes use the App Router convention (route.ts for API, page.tsx for pages)
- No authentication anywhere — everything is public
