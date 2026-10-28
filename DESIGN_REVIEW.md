# Design and readability review

This pass focuses on the homepage, writing archive, article template, about page, and shared navigation and styling. The existing Next.js app, Vercel setup, published articles, and API routes are retained.

## What was getting in the way

- The homepage led with a 112px slogan and a metrics strip, taking attention away from the author and writing.
- A full-screen photographic background and translucent panels made the reading surface visually busy.
- Post descriptions used 13.5px text, were truncated to two lines, and competed with uppercase tag pills and repeated “Read” labels.
- Scroll-reveal wrappers hid server-rendered content until JavaScript and IntersectionObserver ran.
- The archive exposed 45 topic buttons before its results. Search had no explicit label, and the count did not describe the visible page.
- The mobile menu lacked expanded-state information; the footer's unwrapped links could overflow narrow screens.
- Profile copy repeatedly used abstract phrases such as “teaching AI agents to ship” instead of describing concrete work.

## Changes

- A compact, left-aligned introduction with the existing portrait and plain descriptions of Giovanni's work.
- Solid charcoal surfaces, warm accent links, restrained borders, and the existing serif display font.
- Dated article rows with selectable, untruncated descriptions and quieter topic metadata.
- Article body text at 18px on phones and 19px on larger screens, a restrained reading width, clearer heading spacing, and locally scrollable code and tables.
- Immediately visible content across routes using the shared reveal wrapper.
- Labeled search, whitespace-trimmed queries, expandable topic filters, pressed states, clear-filter recovery, accurate result ranges, and keyboard focus management on pagination.
- Responsive navigation with current-page semantics, Escape handling, and focus return. Footer links wrap.
- Direct profile and project copy. Published posts were not rewritten or given invented personal anecdotes.

## Validation

The production build and TypeScript compilation pass, generating all 98 static outputs. Changed TypeScript/React files pass ESLint with one existing Google Fonts warning. `git diff --check` passes.

Browser checks covered the homepage at 1280px and 390px, the about page, and a Kotlin article on desktop and mobile. Search with surrounding whitespace returned nine matching posts; a nonexistent query exposed the empty state and clear action. Selecting the Kotlin topic returned eight tagged posts. Pagination advanced to posts 11–20 and focused the result status. The mobile menu closed on Escape and restored focus. Tested pages had no horizontal overflow or framework error overlay; browser error collection was empty. A 200% text enlargement check found a section-header overflow on mobile, which was fixed by allowing the heading and archive link to wrap.

The full repository lint command still reports three pre-existing errors in unused legacy components: `AsciiParticleHero.tsx`, `BootSequence.tsx`, and `TypingText.tsx`. These concern synchronous state updates in effects. No imports of those components were found in the app.

Dependency installation reported 13 existing audit findings (1 low, 2 moderate, 9 high, 1 critical). Dependency upgrades were not included in this design change; they need a separate compatibility and security pass. Next.js also reports the existing middleware convention deprecation.

The changes are local and have not been deployed to the live site.

## Color and personality revision

Following feedback that the first pass felt too restrained, the palette now uses chartreuse, lilac, and warm coral on an ink-purple background. The homepage introduction has a chartreuse panel, italic name, and a tilted lilac portrait frame. Article headers use a lilac panel; section headings, topic labels, project borders, and syntax highlighting carry color through the rest of the experience. Body copy retains the same reading size and spacing. Desktop homepage and mobile homepage/article screenshots were checked, including the career-in-AI article; the article has no horizontal overflow at 390px.

## Interactive depth

Added a shared pointer-driven tilt surface to the portrait and project cards. The portrait has separated coral and lilac layers, project titles sit above their card surface, and a pointer-following highlight adds depth. Updates are scheduled with requestAnimationFrame only during mouse movement; leaving the surface or window resets the effect. Coarse pointers and reduced-motion preferences keep the surface static. Browser checks verified real mouse tilt, reset on exit, disabled transforms/highlights under reduced motion, and the mobile portrait layout. No graphics dependencies were added.

## Professional direction

The latest revision replaces the playful palette and interactive depth with navy surfaces, restrained blue accents, and consistent Inter typography. The homepage leads with Giovanni's full name and role beside a straight portrait. Article headers use a simple divider, project cards use subtle borders, and topic metadata uses one accent color. The portrait and projects no longer mount tilt effects. Desktop homepage and mobile homepage/article layouts were visually checked; both mobile pages have no horizontal overflow, and browser error collection was empty. The event edits (BBC removal and AGNTCon + MCPCon China 2026 name) remain intact.

## Agentic AI focus and restrained motion

The homepage now foregrounds Agentic AI in its introduction and describes the work concretely: tools, context, and checking results. Its primary link leads to the existing projects section, which highlights Bedrock, Strands, and MCP. The shared site title and author bio reflect this focus.

Reintroduced the existing tilt component at reduced strengths (5 degrees for the portrait; 2.5 for projects), with a subtle blue depth layer and low-opacity pointer highlight. A short transform-only entrance on the name/focus line and small link-arrow transitions add motion without hiding content. No new dependencies or idle animation loops were introduced. Reduced-motion and coarse-pointer fallbacks remain static.

## Selected theme: Graphite & copper

Applied the chosen palette: graphite #202020, chalk #f2eee8, copper #e0aa83, and warm neutral borders and surfaces. Space Grotesk is used for headings; IBM Plex Sans for body text, with an italic face for quotations. JetBrains Mono remains for code and metadata. Portrait depth and pointer highlights now use warm copper tones. Agentic AI copy, the four selected projects, reading dimensions, and motion behavior are preserved. Browser checks confirmed the fonts loaded and that the homepage and article had no mobile horizontal overflow. Production build passes; the existing font-link lint warning remains.

## Zelda 40th anniversary theme

Applied a forest-green, parchment, and antique-gold palette with Cinzel display headings and IBM Plex Sans reading text. A compact anniversary strip celebrates The Legend of Zelda, 1986–2026, with a geometric Triforce motif and a brief entrance animation. The professional content, Agentic AI introduction, selected projects, reduced-motion support, and restrained 3D effects remain. Homepage checked at desktop and 390px mobile widths, with no horizontal overflow. Production build passes.

## Hidden Ocarina

Removed the anniversary banner and its styles. Type OCARINA outside an editable field (up to two seconds between letters) to reveal a lazy-loaded native dialog. Discovery works by typing OCARINA or tapping the homepage portrait five times within three seconds. The portrait keeps its existing appearance, with no separate music icon. The footer is plain text. Song destination labels are hidden until a melody is completed. A/S/D/F/G play five synthesized notes; audio is created only after the first note and closed on dismissal.

- A D F A D F: GitHub (https://github.com/giolaq).
- S G F S G F: LinkedIn (https://www.linkedin.com/in/glaquidara/).

Songs allow up to eight seconds between notes. Completing one begins a 1.8-second transition in the current tab; Stay here or Escape cancels it. Backspace clears the score. The panel includes mute, touch note buttons, native modal focus handling, and reduced-motion support. These are original short melodies, not game audio assets.

Validation: changed components pass lint; production build passes. Browser checks verified no banner or audio context before discovery, keyboard unlock, running audio after a real keypress, Escape cleanup, ignored unlock typing in search, mobile layout without overflow, LinkedIn song recognition and cancellation, and GitHub song navigation.
