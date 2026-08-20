# Portfolio Website — Project Instructions

Single-page static portfolio for Muhammad Osama Sohail (product/growth job search). Zero cost. No backend, no build step, no framework — plain HTML/CSS/JS only. User does not write code; Claude builds everything.

See `HANDOFF.md` for full project state, open items, and history. Read it at the start of any session here.

## Structure
- `public/` — deployed (Cloudflare Pages output dir). Only this gets served.
- `docs/` — NEVER deployed. Superpowers specs/plans live here.
- Do not change the Cloudflare output dir from `public`; `docs/` must stay unreachable.

## Deploy
- Primary: GitHub Pages at `https://muhammadosamasohail.github.io/`, built by
  `.github/workflows/pages.yml`, which uploads only `public/` so `docs/` is never served.
- Mirror: Cloudflare Pages at `https://portfolio-website-4fm.pages.dev/`, still live so old
  links keep working. Its canonical tag points at the github.io URL.
- Two remotes. Push BOTH on every change or the two hosts drift:
  `git push origin main && git push pages-old main`
- `origin` is `muhammadosamasohail.github.io`, `pages-old` is `portfolio-website`.
- Two `gh` accounts exist on this machine: `muhammadosamasohail` (correct) and `osamasohaila8s` (inactive). Run `gh auth status` and confirm `muhammadosamasohail` is active before any push.
- The URL is hardcoded in six places: `og:url`, `og:image`, `twitter:image`, `canonical`,
  `robots.txt`, `sitemap.xml`, plus the text printed on `assets/og-image.png`. Change all of them together.

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
