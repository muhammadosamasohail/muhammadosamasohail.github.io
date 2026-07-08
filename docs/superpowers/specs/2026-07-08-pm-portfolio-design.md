# PM Portfolio Website — Design Spec

## Purpose

Personal portfolio site for a Product Manager job search. Primary audience: recruiters and hiring managers who will skim the site in 15–120 seconds before deciding whether to read further.

## Constraints

- Zero cost until a real domain can be purchased.
- User will not write or edit code directly — Claude builds and maintains the site.
- Content is a mix of ready material (e.g. resume) and placeholders to be filled in later.

## Tech Stack

- Plain HTML, CSS, and vanilla JS. No framework, no build step.
- Fonts loaded via Google Fonts CDN (free): Space Grotesk (headings/nav), IBM Plex Sans (body).
- No backend, no database, no server-rendered logic.

## Hosting & Deployment

- **Host:** Cloudflare Pages (free tier — unlimited bandwidth, no forced branding, public URL requiring no viewer account).
- **Deploy method:** Git integration. Code lives in a GitHub repo (account: `muhammadosamasohail`); Cloudflare Pages watches the repo and auto-deploys on every push to `main`.
- **Interim URL:** `<project-name>.pages.dev` subdomain, issued free by Cloudflare.
- **Future domain:** when the user buys a real domain, it's added in the Cloudflare Pages dashboard as a custom domain — no code or rebuild changes required.
- Free/throwaway domains (Freenom-style) are explicitly avoided due to spam-reputation and revocation risk; the interim `.pages.dev` subdomain is used until a real domain is purchased.

## Visual Design System

**Style direction:** Swiss / International — high contrast, structured, no softness.

- **Background:** white (`#ffffff`)
- **Text:** near-black (`#0a0a0a`)
- **Accent:** cobalt blue (`#0033ff`), used sparingly for CTAs, links, and section markers
- **Corners:** hard edges, no border-radius
- **Headline font:** Space Grotesk (bold, geometric)
- **Body font:** IBM Plex Sans
- **Imagery:** no stock photos initially; use simple geometric blocks/dividers and icons until the user supplies real project visuals

## Page Structure

Single-page scroll (chosen over multi-page: faster for a recruiter to skim end-to-end, simpler to build/maintain; can be revisited if case studies grow too long for one page).

Section order:

1. **Hero** — name, one-line positioning statement, primary CTA button "View Case Studies ↓" that scrolls to case studies. Nav bar (sticky) has small text links: About, Work, Testimonials, Contact, and a quiet "Resume" text link (not a button) in the corner — deliberately de-emphasized so the primary path is scrolling through the work, not bailing early with just the resume.
2. **About** — short background/bio, positioning for PM roles.
3. **Case Studies** — 3 to 4 entries max (quality over quantity, per research). Each case study follows this framework:
   - **Problem/Context** — business challenge, constraints, user's role
   - **Process** — research, alternatives considered, reasoning
   - **Solution** — the shipped work
   - **Impact** — quantified outcome, called out visually (bold/large metric)
   - **Learnings** — trade-offs, what would be done differently
   - Target length: 600–800 words per case study, broken into scannable subheadings.
   - **Confidential data handling:** generalize exact figures to percentages/relative terms, omit employer/client names where needed, never use blurred/redacted visuals.
4. **Skills** — tools/methodologies, presented as a scannable grid or tag list.
5. **Testimonials** — short pull-quotes (e.g. from LinkedIn recommendations), attributed by role relationship (manager, cross-functional partner) even if full name/company is withheld for privacy.
6. **Contact** — mailto link and LinkedIn button. No contact form (avoids third-party form service dependency and keeps the stack backend-free).

## Content Readiness

Some sections (e.g. resume, possibly one case study) have real content ready at build time; others get placeholder copy/structure for the user to fill in after launch. The spec does not block on having all final content — structure ships first, content backfills.

## Out of Scope

- Blog / long-form writing section (explicitly excluded).
- Contact form backend / third-party form service.
- Custom domain purchase and setup (future work, once budget allows).
- Analytics (can be added later for free via a privacy-friendly provider if desired — not required for launch).
