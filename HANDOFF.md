# Portfolio Website — Project Handoff

Paste this into a fresh Claude Code chat (working in `/Users/muhammadosamasohail/portfolio-website`) to resume with full context. Pick up at the **Outstanding / Open Items** section.

---

## 1. What This Is

A single-page static portfolio website for **Muhammad Osama Sohail** (product/growth professional), built for his job search. Constraint: **zero cost** until he can afford a real domain. No backend, no build step, no framework — plain HTML/CSS/JS only.

The user is not writing any code. Claude builds everything ("you're building everything for me").

---

## 2. Repo & Infrastructure

| Item | Value |
|------|-------|
| Local repo | `/Users/muhammadosamasohail/portfolio-website` (git initialized, branch `main`, no other branches) |
| GitHub repo | `https://github.com/muhammadosamasohail/portfolio-website` |
| GitHub account | `muhammadosamasohail` |
| Hosting | Cloudflare Pages via GitHub git integration (push to `main` auto-deploys) |
| Cloudflare output dir | `public` (NOT `/`) — set deliberately so `docs/` is never served publicly |
| Live URL | `https://portfolio-website-4fm.pages.dev/` |

### GitHub CLI warning
The machine has **two** `gh` CLI accounts logged in:
- `muhammadosamasohail` (correct — use this)
- `osamasohaila8s` (inactive, do not use)

**Always run `gh auth status` and confirm `muhammadosamasohail` is the active account before pushing.** The active account had to be switched from `osamasohaila8s` to `muhammadosamasohail` when the repo was first created.

### Cloudflare subdomain note
Cloudflare appended the `-4fm` suffix (base `portfolio-website.pages.dev` was likely taken/reserved). It **can** be renamed:
Cloudflare dashboard → Workers & Pages → the project → Settings → General → rename project field.
Renaming only changes the `*.pages.dev` subdomain, not the GitHub repo name. **User has not yet decided whether to rename** (open item).

---

## 3. File Structure

```
portfolio-website/
├── public/                          ← deployed (Cloudflare output dir)
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   └── assets/resume.pdf
└── docs/                            ← NEVER deployed
    └── superpowers/
        ├── specs/2026-07-08-pm-portfolio-design.md
        └── plans/2026-07-08-pm-portfolio-implementation.md
```

`docs/` must stay out of the deployed site — this is why the Cloudflare output dir is `public` and not `/`.

The design spec and implementation plan in `docs/superpowers/` are the **authoritative detailed references** for anything not covered in this handoff.

---

## 4. Design Decisions (Locked — Already Built)

### Visual style: Swiss / International
- White background `#ffffff`, near-black text `#0a0a0a`, cobalt blue accent `#0033ff`.
- **Hard edges everywhere** — `border-radius: 0` forced via `*, *::before, *::after`. No softness, no rounding.
- Fonts: **Space Grotesk** (headings/nav) + **IBM Plex Sans** (body), both via Google Fonts CDN, no self-hosting.

### Layout
- Single-page scroll.
- Sticky nav with mobile hamburger toggle (vanilla JS, no framework).
- Nav has a **deliberately de-emphasized "Resume" text link** (not a button) in the corner — explicit design choice so visitors scroll through case studies first instead of bailing after grabbing the resume.

### Section order
Hero → About → Case Studies (3) → Skills → Testimonials → Contact → Footer.

### Case study framework (per study)
Problem/Context → Process → Solution → **Impact (bolded metric)** → Learnings.

The 3 case studies (all real content):
1. **Open-source AI sentiment analysis tool** (MSBA capstone) — 80% classification accuracy, 0.35s inference latency.
2. **Autonomous organic social growth from zero** — 35K+ LinkedIn impressions, 1,100+ visitors, 400+ followers, 14.5K+ Instagram views in 90 days.
3. **DevOps performance/financial audit data pipeline** — surfaced 66.67% change failure rate and 3.5x budget overrun; directly led to an accepted feature-freeze recommendation.

### Testimonials (real, no fabrication)
Two real LinkedIn recommendations, live with real attribution:
- **Syeda Mahrukh Raza**, Founder of Lean Outset
- **Ahmed Abdullah**, data/BI professional from AIESEC

No fabricated quotes were ever used. Section is intentionally lean — only add more if the user supplies additional real recommendations.

### Contact (backend-free)
- `mailto:` link → `muhammadosamasohail99@gmail.com`
- LinkedIn → `https://linkedin.com/in/muhammadosamasohail`
- No contact form, no third-party form service — deliberately keeps the site backend-free.

### Resume
Real resume PDF copied from `/Users/muhammadosamasohail/Documents/Professional/Job-Application-Workflow/Employment/resume.pdf` → `public/assets/resume.pdf`.

### Recently added polish
- Scroll-reveal animations (IntersectionObserver-based, respects `prefers-reduced-motion`).
- Hover micro-interactions on buttons/cards/skill-tags.
- Hero load-in fade animation.
- One inline SVG flow-diagram per case study — hand-drawn in the Swiss black/blue style. These are **honest illustrative substitutes, not real screenshots** (no real product screenshots exist on the machine).

---

## 5. Copy / Voice Rules (IMPORTANT)

User feedback, verbatim: **"I hate the AI slop and the em dashes."**

All site copy was rewritten to remove every em dash and every generic/formulaic AI-sounding phrase. **Any future copy added to this site must:**
- Contain **no em dashes**.
- Avoid AI-cliché phrasing: "in today's landscape," "unlock," "seamless," rule-of-three sentence patterns, etc.
- Be written plainly and directly.

### Content sourcing (no invention)
Content for About / Case Studies / Skills was **not invented**. A Sonnet agent read the user's existing `Job-Application-Workflow` directory (resume.html, project/employment markdown, skills_matrix.md, metrics_repository.md, references.md, interview_prep.md), then an Opus agent synthesized it into final copy.

- No confidential/NDA-flagged information used.
- One client name (**"Silver Mirror"**) was deliberately excluded from case study copy out of caution — it's a third-party client relationship, not the user's own product.

---

## 6. Process History

Full superpowers workflow was followed:
1. Brainstorming
2. Design spec (written + committed)
3. Implementation plan (written + committed) — 12 tasks
4. Opus adversarial red-team review of the plan, which found and fixed 2 real blockers:
   - Resume link would have 404'd on launch.
   - Site could have deployed with unchecked placeholder content.
   - Both fixed via a hard **pre-launch checklist gate task** that blocks deploy until real content, resume, and contact info are all in place.
5. Inline execution of all 12 plan tasks (all completed and committed, each with its own commit).

Bug fixed along the way: a zsh-incompatible `$status` variable in the checklist script (zsh treats `status` as read-only) — renamed to `check_status`.

---

## 7. Outstanding / Open Items (START HERE)

### 1. Headshot photo (action needed from user)
User shared a professional headshot in chat (navy suit, palm-tree background) but Claude could **not** extract the binary from the chat attachment — no accessible file path was found on disk. (A search turned up only a different passport-style photo on a blue background at `/Users/muhammadosamasohail/Documents/Personal Identity/Photos/MuhammadOsamaSohail_PassportSizedPhoto.jpeg`, which the user did NOT confirm using.)

**Action:** User must save the actual photo to
`/Users/muhammadosamasohail/portfolio-website/public/assets/headshot.jpg`
(Finder drag-and-drop or "Save Image As"), then tell Claude. Claude will wire it into the hero/about section with matching Swiss treatment — likely a hard-edged bordered frame, no rounded corners, possibly duotone/high-contrast to match the black/white/blue palette.

### 2. Cloudflare subdomain rename (open decision)
User asked if `portfolio-website-4fm.pages.dev` can be renamed — yes (see §2). User has not yet decided on a new name or whether to keep the current one.

### 3. OG tag URL not finalized (needs a commit once decided)
`public/index.html`'s `og:url` meta tag still says `https://portfolio-website.pages.dev` (the originally assumed URL). Real live URL is `https://portfolio-website-4fm.pages.dev/` (or whatever it becomes if renamed per item 2).
**Action:** Correct once the final URL is settled, then commit and push (Cloudflare auto-redeploys).

### 4. Testimonials intentionally lean
Only 2 real testimonials exist and are used. Do not fabricate more. Add more only if the user collects additional real recommendations.

### 5. Case study visuals are illustrative diagrams
The inline SVGs are stylized diagrams, not real screenshots. If the user later obtains real product screenshots/dashboard images, those could replace or supplement the SVGs — optional, not required.

### 6. Deployment verification note (not a bug)
Task 12 verification confirmed the site returns 200, and a direct `docs/` path also returns 200. This is **Cloudflare Pages' default catch-all fallback** (any unmatched path serves `index.html` with 200 — confirmed by testing a nonsense random path that also returned 200 with the homepage). It is **not** a `docs/` content leak. Cosmetically imperfect (a proper 404 page would be nicer) but not a security issue; left as-is.

---

## 8. How to Resume

1. Open a new Claude Code chat in `/Users/muhammadosamasohail/portfolio-website`.
2. Paste this document (or reference its path).
3. Confirm `gh auth status` shows `muhammadosamasohail` active before any push.
4. Pick up at §7 Outstanding / Open Items.
5. Consult `docs/superpowers/specs/2026-07-08-pm-portfolio-design.md` and `docs/superpowers/plans/2026-07-08-pm-portfolio-implementation.md` for authoritative detail on anything not covered here.
