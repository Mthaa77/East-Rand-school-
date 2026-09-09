# East Rand School of the Arts — Official Website

> **"The work behind the spotlight."** · *Achievement through excellence.*

The official website of the **East Rand School of the Arts (ERSA)** — a Gauteng Department of Education **School of Specialisation in the Arts** serving the Daveyton community on the East Rand.

## About the site

A fully custom, performance-first marketing and information website covering the school's five specialised disciplines, admissions journey, learner life, gallery, news and contact channels.

**Pages**

| Route | Purpose |
| --- | --- |
| `/` | Landing page — hero, disciplines, proof bar, awards, motto seal, news highlights |
| `/about` | School story, specialisation status, leadership, at-a-glance facts |
| `/programmes` | The five disciplines with deep-dive dossiers (Visual Arts, Design, Music, Dance, Drama) |
| `/admissions` | Application process, requirements, and enrolment guidance |
| `/gallery` | Learner work and campus life in a filterable gallery |
| `/news` | Announcements, matric results and school stories |
| `/contact` | Contact details, map guidance and enquiry channels |

**Highlights**

- Editorial, print-inspired design system (Fraunces · Newsreader · Manrope · Geist Mono)
- Official school brand kit — crest, discipline badges and motto integrated sitewide
- ⌘K command palette with site-wide finder and quick actions
- Floating support dock (call, email, WhatsApp) with a support/intent dialog
- Accessible, mobile-first responsive layout with dark-mode support
- PWA manifest + app icons, AVIF/WebP image pipeline, dynamic chunk splitting

## Tech stack

- **Next.js 16** (App Router) + **TypeScript 5**
- **Tailwind CSS 4** with a custom `@theme` token system
- **shadcn/ui** (New York) + Radix UI primitives + Lucide icons
- **Framer Motion** for scroll choreography and page transitions
- **Prisma ORM** with a local SQLite database
- **z-ai-web-dev-sdk** backend integrations (AI image/search features in tooling scripts)

## Getting started

### Prerequisites

- [Bun](https://bun.sh) 1.x (or Node.js 20+ with npm/yarn/pnpm)
- Git

### Install & run

```bash
# 1. Install dependencies
bun install

# 2. Create your env file
echo 'DATABASE_URL=file:../db/custom.db' > .env

# 3. Create the SQLite database from the Prisma schema
bun run db:push

# 4. Start the dev server (http://localhost:3000)
bun run dev
```

### Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the development server on port 3000 |
| `bun run build` | Production build (standalone output) |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint / Next.js lint checks |
| `bun run db:push` | Push the Prisma schema to the SQLite database |
| `bun run db:generate` | Regenerate the Prisma client |

## Project structure

```
├── src/
│   ├── app/            # App Router pages (7 routes) + layout + PWA manifest
│   ├── components/     # Site sections, UI (shadcn/ui), and shared components
│   ├── lib/            # Data registry, utils, interaction-event bus
│   └── hooks/          # Client hooks
├── public/images/      # Optimised WebP/AVIF photography & official brand kit
├── prisma/             # Prisma schema (SQLite)
├── scripts/            # One-off asset pipeline utilities (image processing/icons)
└── db/                 # SQLite database file (created by `db:push`, not committed)
```

## Content & fact policy

All school facts (contact details, partnerships such as the TUT MoU and NSA collaboration, subject offerings, history) are sourced from the school's official comprehensive profile. No facts, figures or claims are invented; captions and alt text describe only what is visible in the artwork.

## Brand assets

The school crest, discipline badges, motto lockup and related artwork in `public/images/brand/` are the property of the **East Rand School of the Arts** and are used here solely for the school's official web presence.

## Contact

- **Address:** 1 Jones Street, Daveyton, Gauteng
- **Tel:** 010 007 1186
- **Email:** admin@ersa.co.za
