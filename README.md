# Rishi Kolluru — Portfolio

> I build AI systems that retrieve, reason, route, and ship.

A cinematic, interactive portfolio for **Rishi Kolluru**, an AI Research Engineer
(MS Computer Science, University at Buffalo) working on multimodal retrieval, LLM
agents, RAG infrastructure, and production-grade ML systems.

The site is built as a *living systems portfolio* rather than a résumé page — a
dark, motion-led experience with a real WebGL hero, an interactive system map,
and case studies that show projects as engineered systems with architecture and
metrics.

**Live:** https://rishi-kolluru.vercel.app <!-- updated after first deploy -->

---

## ✦ Highlights

- **Custom WebGL hero** — a GLSL flowing-aurora fragment shader (React Three
  Fiber) that reacts to the cursor, with a reduced-motion fallback.
- **Two-color techno design system** — electric blue + red on midnight navy,
  driven entirely by CSS design tokens.
- **Cinematic motion** — Lenis smooth scroll, a custom blend-difference cursor,
  a sequenced preloader, magnetic buttons, masked line reveals, and a
  text-scramble "decode" effect.
- **Interactive system map** — click through the pipeline behind the work:
  data → embeddings → retrieval → reasoning → routing → evaluation → deployment.
- **Case studies** — each project rendered with a sticky progress sidebar,
  architecture diagram, metric grid, failure modes, and a recruiter takeaway.
- **Command menu** — `⌘ / Ctrl + K` to jump to any page, project, or link.
- **Accessible & fast** — semantic HTML, `prefers-reduced-motion` support,
  fully static prerendering.

---

## ✦ Tech Stack

| Area        | Tools                                                        |
| ----------- | ----------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router) · React 19    |
| Language    | TypeScript                                                  |
| Styling     | Tailwind CSS v4 (CSS-first `@theme` tokens)                 |
| 3D / WebGL  | Three.js · React Three Fiber · Drei · custom GLSL shaders   |
| Motion      | Lenis (smooth scroll) · GSAP · CSS keyframes · IntersectionObserver |
| Fonts       | Space Grotesk · IBM Plex Mono (`next/font`)                 |
| Deployment  | Vercel                                                       |

---

## ✦ Project Structure

```text
app/
  layout.tsx            # root layout: fonts, providers, metadata
  page.tsx              # home (hero → work → system map → field guide → timeline → lab → contact)
  work/                 # work index + dynamic case studies (/work/[slug])
  systems/              # systems thinking page
  lab/                  # experiments / build-logs archive
  about/                # about, education, experience, skills by capability
  contact/              # contact + recruiter conversion
  globals.css           # design tokens + component styles + keyframes
components/
  hero/                 # WebGL shader hero
  home/                 # home-page sections
  work/  lab/           # page-specific components
  Header, Footer, Cursor, Preloader, CommandMenu, SmoothScroll, ...
lib/
  site.ts               # central config (name, role, links)
  projects.ts           # case-study + repo data
  lab.ts                # lab entries
```

---

## ✦ Getting Started

Requires Node.js 18.18+ (Node 20+ recommended).

```bash
# install dependencies
npm install

# run the dev server
npm run dev          # http://localhost:3000

# production build
npm run build
npm run start
```

---

## ✦ Customising

Most content is data-driven and lives in `lib/`:

- **Profile & links** — `lib/site.ts`
- **Projects / case studies** — `lib/projects.ts`
- **Lab entries** — `lib/lab.ts`
- **Colors & type** — the `@theme` block at the top of `app/globals.css`

---

## ✦ Deployment

Deployed on **Vercel**. Every push to `main` triggers a production build.
The site is fully statically prerendered, so it runs on the edge with no server.

```bash
vercel --prod
```

---

## ✦ Contact

- **Email:** rishikolluru.work@gmail.com
- **LinkedIn:** [in/rishi-kolluru](https://www.linkedin.com/in/rishi-kolluru/)
- **GitHub:** [@RishDevs](https://github.com/RishDevs)

---

<sub>Designed & built by Rishi Kolluru · Next.js · Three.js · GSAP</sub>
