# Ryan Back — Portfolio

Personal portfolio site: React, Vite, Tailwind CSS, and light motion (Framer Motion, GSAP via scroll reveals). Content and tone follow the in-repo design spec (`DESIGN.md`).

**Live site:** [ryanback.vercel.app](https://ryanback.vercel.app)

## Features

- Single-page layout: hero, about, skills, career, projects, contact
- [AOS](https://michalsnik.github.io/aos/) scroll entrances on main content blocks (disabled when the user prefers reduced motion)
- Sticky quick navigation and scroll-linked UI chrome
- Contact form via [EmailJS](https://www.emailjs.com/) (keys live in `ContactSection.jsx`; move to env for production hardening)
- Below-the-fold sections loaded with `React.lazy` and `Suspense` to keep the initial bundle smaller
- Production build splits vendor chunks (`framer-motion`, `gsap`, `@emailjs/browser`, `lucide-react`) in `vite.config.js`

## Prerequisites

- Node.js 18+ recommended
- npm (or pnpm/yarn if you adapt commands)

## Getting started

```bash
git clone https://github.com/ho0405/3D_portfolio.git
cd 3D_portfolio
npm install
npm run dev
```

The dev server prints the local URL (Vite defaults to `http://localhost:5173`).

| Script        | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start Vite dev server    |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist` locally     |
| `npm run lint` | ESLint (JS/JSX)          |

## Project structure

```
src/
├── App.jsx                 # Shell: scroll/nav state, hero timing, lazy section boundaries
├── main.jsx                # React root + SW/cache cleanup for local dev
├── index.css               # Global styles
├── content/
│   ├── siteContent.js      # Copy: career, projects, skills narrative, links
│   └── heroCopy.js         # Hero rotating lines
├── lib/
│   └── siteTokens.js       # Shared layout classes and nav constants
├── hooks/
│   ├── useAos.js             # AOS init + refresh timing
│   └── useProjectCardFloorSync.js   # Project grid equal-height sync
├── utils/
│   └── websiteHostname.js  # Career website label helper
├── components/
│   ├── sections/           # Page sections (Skills/Career/Projects/Contact are lazy-loaded)
│   ├── site/               # Reusable headings, quick links, motion variants
│   ├── ui/                 # AosBlock, scroll reveal, demo video, scroll-to-top
│   ├── aceternity/         # Section backgrounds
│   └── SkillStrengthThemesMobileCarousel.jsx
├── react-bits/             # FadeContent, GlareHover, Magnet
├── constants/              # Skill groups and pill surfaces (includes skill icons)
└── assets/                 # Images, logos, fonts as imported modules
```

Branding and UI rules: see **`DESIGN.md`** at the repo root. Pending tweaks may appear in **`.omd/preferences.md`**.

## Editing content

- **Narrative, projects, career, links:** `src/content/siteContent.js`
- **Hero lines:** `src/content/heroCopy.js`
- **Layout tokens (section padding, glass card class, nav offsets):** `src/lib/siteTokens.js`

## Deploy

Compatible with static hosts (for example Vercel). Build output is `dist/` from `npm run build`. Configure the host to serve `index.html` for SPA routes if you add client-side routing later; this app is hash-friendly for section links (`#about`, `#projects`, etc.).

## Contributing

Issues and pull requests are welcome. For UI changes, align with `DESIGN.md` first.
