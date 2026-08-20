# Portfolio Website — Project Instructions

Single-page static portfolio for Muhammad Osama Sohail (product/growth job search). Zero cost. No backend, no build step, no framework — plain HTML/CSS/JS only. User does not write code; Claude builds everything.

See `HANDOFF.md` for full project state, open items, and history. Read it at the start of any session here.

## Structure
- `public/` — deployed (Cloudflare Pages output dir). Only this gets served.
- `docs/` — NEVER deployed. Superpowers specs/plans live here.
- Do not change the Cloudflare output dir from `public`; `docs/` must stay unreachable.

## Deploy
- Hosting: Cloudflare Pages via GitHub git integration. Push to `main` auto-deploys.
- Two `gh` accounts exist on this machine: `muhammadosamasohail` (correct) and `osamasohaila8s` (inactive). Run `gh auth status` and confirm `muhammadosamasohail` is active before any push.
- Live URL: `https://portfolio-website-4fm.pages.dev/`

## Design (locked)
- Swiss/International style: white bg `#ffffff`, near-black text `#0a0a0a`, cobalt accent `#0033ff`.
- Hard edges everywhere, `border-radius: 0` forced globally. No rounding.
- Fonts: Space Grotesk (headings/nav) + IBM Plex Sans (body), Google Fonts CDN.
- Section order: Hero → About → Case Studies (3) → Skills → Testimonials → Contact → Footer.
- Case study framework: Problem/Context → Process → Solution → Impact (bolded metric) → Learnings.
- Contact stays backend-free: `mailto:` + LinkedIn link only, no form service.

## Copy rules (hard requirement)
User feedback, verbatim: "I hate the AI slop and the em dashes."
- No em dashes, anywhere.
- No AI-cliché phrasing ("in today's landscape," "unlock," "seamless," rule-of-three patterns).
- Plain, direct writing only.
- Never invent content — testimonials, metrics, and case study details must come from real source material (resume, Job-Application-Workflow docs) or the user directly. Do not add testimonials beyond the real ones already on the site unless the user supplies new real ones.

## Process
Follow the superpowers workflow (brainstorm → spec → plan → red-team review → execute) for any non-trivial change, matching what's documented in `docs/superpowers/`.
