# Portfolio — Paritosh Kumar

A premium, self-branded product-designer portfolio. **Refined Dark** design
system, built on Next.js 16 (App Router) + React 19 + Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000 (or `-p 3200` to match the editor launch config).

## Where the content lives

Everything you edit is in two files — no need to touch components:

| File | What it holds |
| --- | --- |
| `src/lib/profile.ts` | Name, role, bio, highlights, expertise, tools, experience, socials, résumé link |
| `src/lib/case-studies.ts` | Case studies. One is fully written (`self-serve-go-live`); a copy-paste `TEMPLATE` at the bottom shows how to add more |

## TODO before launch (search the code for `TODO(paritosh)`)

- **`profile.ts`** — fill `bio[1]`/`bio[2]` brackets, real `highlights` number, real `experience`, real `socials`.
- **`case-studies.ts`** — replace the two `comingSoon` placeholders with real studies (or delete them). Add cover + gallery images under `public/work/<slug>/`.
- **Images** — drop `public/resume.pdf`; missing case-study images show a graceful "coming soon" placeholder until added.
- **`src/app/layout.tsx`** — set `metadataBase` to your real domain (fixes social-share images).

## Design system

Defined once in `src/app/globals.css`. **Change the whole brand color by
editing a single token** — `--accent` in `:root` (default warm gold `#c8a24c`).
Type pairing: Instrument Serif (display) + Geist (body) + Geist Mono (labels).
