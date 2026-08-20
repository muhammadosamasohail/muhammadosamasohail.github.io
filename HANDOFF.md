# Portfolio Website: Handoff

Paused **2026-08-21** at commit `956c4ff`. Working tree clean, both remotes in sync.

Section 9 is where to start.

---

## 1. What this is

A single-page static portfolio for **Muhammad Osama Sohail**, product and growth, built for a job search. Zero cost. No backend, no build step, no framework, plain HTML/CSS/JS only.

The owner does not write code. Claude builds everything.

## 2. Where it lives

| Item | Value |
|---|---|
| Local repo | `/Users/muhammadosamasohail/portfolio-website` |
| **Primary URL** | `https://muhammadosamasohail.github.io/` |
| Mirror URL | `https://portfolio-website-4fm.pages.dev/` |
| `origin` | `github.com/muhammadosamasohail/muhammadosamasohail.github.io` (GitHub Pages) |
| `pages-old` | `github.com/muhammadosamasohail/portfolio-website` (Cloudflare Pages) |
| GitHub account | `muhammadosamasohail` |

### Two remotes: push both, every time

```bash
git push origin main && git push pages-old main
```

Miss one and the hosts drift. The mirror exists so links shared before the move keep working. Its canonical tag points at github.io, so search engines treat github.io as the original.

### Before any push

Run `gh auth status` and confirm **`muhammadosamasohail`** is active. The machine also has `osamasohaila8s` logged in, and it has been the active account before. Switch with `gh auth switch --user muhammadosamasohail`.

### How GitHub Pages is wired

`.github/workflows/pages.yml` uploads **only `public/`**, so `docs/` is never served. Pages is set to `build_type=workflow`.

**Do not let Pages fall back to legacy branch mode.** GitHub auto-enabled it that way once. Legacy mode serves the repo root, which would publish `docs/` and serve no homepage. Verify:

```bash
gh api repos/muhammadosamasohail/muhammadosamasohail.github.io/pages --jq .build_type   # must be "workflow"
curl -sSL -o /dev/null -w "%{http_code}" https://muhammadosamasohail.github.io/docs/     # must be 404
```

### The site URL is hardcoded in seven places

`og:url`, `og:image`, `twitter:image`, `canonical`, `robots.txt`, `sitemap.xml`, and the text printed inside `assets/og-card.png`. Change them together or not at all.

## 3. File structure

```
portfolio-website/
├── .github/workflows/pages.yml      ← uploads public/ only
├── CLAUDE.md                        ← project instructions
├── HANDOFF.md                       ← this file
├── public/                          ← the deployed site
│   ├── index.html          46.2 KB
│   ├── 404.html             1.3 KB
│   ├── robots.txt, sitemap.xml
│   ├── css/style.css       19.8 KB
│   ├── js/main.js           3.8 KB
│   └── assets/
│       ├── resume.pdf                182 KB
│       ├── og-card.png               215 KB
│       ├── headshot.jpg / @2x.jpg    17 / 57 KB
│       └── clips/                    18 mp4 (9.38 MB) + 18 jpg (470 KB)
└── docs/superpowers/                ← NEVER deployed
```

## 4. Page structure, in order

**Nav** (sticky) → **Hero** → **About** → **Content** → **Case Studies** → **Skills** → **Testimonials** → **Contact** → **Footer**

Content sits above Case Studies deliberately. It is the only section with motion, it costs nothing until scrolled to, so it earns attention before anyone has to read prose.

### Nav
Name, five section links, a deliberately de-emphasised text "Resume" link (not a button, so visitors scroll the work before grabbing the PDF), then LinkedIn and GitHub icon buttons. Hamburger below 720px.

### Hero
Two columns from **760px** up: copy left, portrait right. Stacks below that, **portrait first**. The portrait is `loading="eager"` with `fetchpriority="high"` because above the fold it is the LCP candidate.

Hero and About were deliberately **not merged**. The hero's job is one claim a reader grasps immediately; About's job is substance. Merged, the headline stops landing first.

### About
Two short paragraphs plus a four item path list (Autonomous, Lean Outset, JS Bank, KSBL). Was 201 words of prose, now 142 plus the list.

### Content
18 clips produced for Autonomous, in three labelled groups:
- **On camera** (9), clips the owner appears in
- **Produced, not on camera** (8), he scripted, shot and edited, colleagues front them
- **On LinkedIn** (1), a wide 16:9 tile

### Case Studies
Three, each **collapsible**. Open state shows the gist only: title, badges, data figure, Impact line, 40 to 53 words. My Role, Problem, Process, Solution and Learnings sit behind a native `<details>`.

| Order | Badges | Study |
|---|---|---|
| 1 | `AUTONOMOUS` · `PROFESSIONAL WORK` | Building Organic Presence From Zero |
| 2 | `KSBL MSBA` · `CAPSTONE PROJECT` | Turning Customer Feedback Into Product Signals |
| 3 | `KSBL MSBA` · `COURSE PROJECT` | Giving Leadership a Single View of DevOps Health |

Badges rather than two grouped sections. A hard split reads as "one real job, two school projects", which is worse than labelling each honestly.

Data figures are built in **HTML and CSS, not SVG**, because SVG text scales with the viewBox and drops below legibility around 300px wide. Form was chosen before colour: a meter for a single ratio, stat cells for headline numbers in different units, and a two bar comparison only where both values share a unit.

## 5. Design system (locked)

- Swiss / International. White `#ffffff`, near-black `#0a0a0a`, cobalt `#0033ff`.
- **Hard edges everywhere.** `border-radius: 0 !important` globally.
- Space Grotesk (headings, nav, numbers) plus IBM Plex Sans (body), Google Fonts CDN.
- Fluid type via `clamp()`: h1 `28→48px`, h2 `24→32px`, h3 `18→20px`.
- Case study framework: My Role → Problem → Process → Solution → Impact → Learnings.
- Contact stays backend-free: `mailto:` plus links, no form service.
- Brand logos drawn in `currentColor`, never LinkedIn blue or GitHub black, so the palette stays two inks plus cobalt.
- Meter tracks are a lighter step of the cobalt. The neutral grey is de-emphasis only, and always paired with a visible label so nothing is encoded by colour alone.

## 6. Copy rules (hard requirements)

Owner, verbatim: **"I hate the AI slop and the em dashes."**

- **No em dashes, anywhere.** Check with `grep -c '—' public/index.html`.
- No AI-cliché phrasing: "unlock", "seamless", "in today's landscape", "leverage", "delve", rule-of-three patterns.
- **Never the staccato negation pattern** ("No this. Not that.").
- Voice: more character than a CV, without softening any claim. Curious insider, not guru.
- Do not open a section with a technical disclaimer. An earlier Content intro led with browser autoplay policy and was rightly called terrible. Lead with the work; caveats become a small flagged note.
- **Never invent content.** Every metric, testimonial and case study detail must come from the owner or from `~/Documents/Professional/Job-Application-Workflow/`.

### Claims removed for being untrue or unsupported

Both caught by auditing the site against source material. Do not reintroduce either.

1. **"Leadership accepted a feature freeze"** on the DevOps study. It never happened. That work was a graduate course project which required a real client, and the owner used his own employer. Impact now says he *recommended* a freeze.
2. **"Open-source" on the capstone.** No public repo exists on the account and the code is not on this machine. If it is ever published, the word can return and the case study should link it.

## 7. Video pipeline

Sources live in `~/Downloads/Instagram Downloader Pro/autonomous.technologies/` (17 files) plus one pulled from LinkedIn's CDN. **They are not in the repo.**

Proven encode recipe:

```bash
ffmpeg -ss 1.5 -t 12 -i SOURCE \
  -vf "scale=480:854:flags=lanczos,fps=24,format=yuv420p" \
  -c:v libx264 -crf 31 -preset slow -profile:v high \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart OUT.mp4
```

- 151 MB of source became 9.38 MB deployed. Landscape clips use `854:480` and a `.clip-wide` 16:9 tile.
- **Posters are chosen by scoring five candidate timestamps** on brightness and detail. Fixed-timestamp grabs landed on near-black frames and produced useless 5 KB stills.
- Remotion exports in `~/remotion-workspace/out/` are `yuva444p12le`, 12-bit with alpha, which breaks VP9 unless you force `format=yuv420p`. They are components, not finished videos.

### How the clip grid loads

- Posters are plain `<img loading="lazy">`, so they carry layout, work with JS off, and fetch natively only near the viewport.
- Video carries **`data-src`, not `src`**. An IntersectionObserver assigns the real source and plays at 40% visibility. **Zero video bytes for a visitor who never scrolls there.**
- Tiles pause, re-mute and reset when scrolled away, so 18 loops never run at once.
- Skipped entirely under `prefers-reduced-motion`, or when the browser reports `saveData` or a 2G-class connection.
- Sound is opt-in and exclusive: unmuting one clip mutes the rest. Clips are encoded **with** audio, so the button is real.
- A `<button>` cannot be nested in an `<a>`, which is why each tile is a `<figure>` with a stretched link plus a separate sound button layered above it.

## 8. Verification habits that caught real bugs

Keep doing these. Each one caught something that had already shipped or was about to.

**Measure text against real font metrics.** Download the TTFs, compute widths with `fontTools`, do not eyeball. This found a skill tag needing 391px against 382px available on *every* phone size; an h1 word at 317px overflowing 320px viewports; three clip titles silently truncated by a two line clamp; and the nav overflowing by 9px at 721px once the brand buttons went in.

**Validate the HTML after every structural edit.** An unclosed `<div>` shipped once because a `str.replace` silently failed: the button used a literal `↓`, not `&darr;`.

**Watch the shell's working directory.** Commands ran from `scratchpad/` and from `public/` on three occasions, silently writing nothing and committing nothing while appearing to succeed. Always `cd /Users/muhammadosamasohail/portfolio-website` explicitly.

**Verify live, not locally.** Poll the deployed URL until the change appears, then check status codes and byte counts.

**Run the dataviz palette validator before any chart colour.** It FAILED the neutral on chroma floor and lightness band, which was the useful answer: it proved the palette is emphasis plus a meter track, not categorical.

### Tooling gaps on this machine

| Missing | Consequence |
|---|---|
| **Chrome** | **Lighthouse has never run.** Every performance figure is measured directly with curl and ffprobe. Real-device rendering is unverified. |
| PageSpeed Insights API | anonymous daily quota exhausted |
| poppler (`pdftoppm`) | render PDFs with `qlmanage -t` instead |
| yt-dlp / gallery-dl | no Instagram downloading; the owner exports clips himself |

### Instagram cannot be scraped

Post pages return a 611 KB JavaScript shell with **no `og:title` or `og:description`**, and WebFetch returns nothing. Do not send agents at those URLs. Clip titles were read from **burned-in captions in the video frames**, which is a better source anyway. Five clips whose captions were too fragmentary were titled from captions the owner pasted in directly.

## 9. Open items, START HERE

1. **Run Lighthouse.** The single biggest gap. Paste scores from `pagespeed.web.dev`, or install Chrome. Everything else here is measured; this is not.
2. **Fonts are the largest first-visit download**: 133 KB against a 66 KB shell, render-blocking. Self-hosting is the remaining win, though web.dev's own data says the gain is unclear, which is why it was left alone.
3. **OG previews are cached by platforms, not broken.** The card is live and correct, verified by inspecting its pixels. If a stale preview appears, use LinkedIn Post Inspector or the Facebook Sharing Debugger, or share `?v=2` once.
4. **Case study visuals** could use real product screenshots if any ever exist. Current figures are honest data, not mockups.
5. **Mild remaining redundancy**, owner's call: the hero subline and About's opener circle the same instinct; Skills repeats tech named in case study Process paragraphs, which is probably worth keeping since Skills is a recruiter scan target.
6. **Resume overlap.** The resume lists Lean Outset as Dec 2023 to Aug 2024 and JS Bank as Jul 2023 to Jul 2024, an eight month overlap. Legitimate if concurrent, but an interviewer will notice.
7. **Testimonials are intentionally lean.** Two real LinkedIn recommendations, from Syeda Mahrukh Raza and Ahmed Abdullah. Add more only if the owner supplies real ones.

## 10. Current measurements

| | |
|---|---|
| Critical shell | **65.9 KB** (46 HTML + 20 CSS + 4 JS) |
| Google Fonts | 133 KB, render-blocking, 4 latin woff2 |
| Clip posters | 470 KB, lazy |
| Clip video | 9.38 MB, per tile on view, skipped on data-saver |
| Full-scroll worst case | ~9.9 MB |
| Worst text contrast | **5.25:1** (footer) against a 4.5:1 requirement |
| Overflow at 320 / 360 / 375 / 390 / 430px | none |
| iframes and third-party embeds | **0** |
| Em dashes | **0** |

## 11. What happened this session

19 commits, `2023223` to `956c4ff`.

- **Accessibility**: the site had **no keyboard focus indicator at all**, failing WCAG 2.4.7 and 2.4.11. Added focus rings, a skip link and a `<main>` landmark.
- **Fonts**: dropped IBM Plex Sans 600, used by no rule, saving 40,240 bytes. `.case-study h4` and `.skill-tag` were requesting an unloaded Space Grotesk 400 and rendering a synthesized faux weight; both now specify 500. Added fallback `@font-face` metrics computed from the real font binaries.
- **Mobile**: fixed overflow affecting every phone size, made type fluid, stopped the clip grid collapsing to a single column at 320px.
- **Moved to `muhammadosamasohail.github.io`** from a `pages.dev` URL carrying a random `-4fm` suffix.
- **Removed two false or unsupported claims**, see section 6.
- **Built the Content section**: 18 clips, sound control, hover affordance, three honest groups.
- **Replaced the LinkedIn iframe** with a self-hosted clip. LinkedIn sends `frame-ancestors *` and no `X-Frame-Options`, so nothing server-side blocked it, but it rendered as an empty box in the owner's browser, which points at a blocking extension. There are now zero iframes.
- **Replaced case study flowcharts** with data figures, and separated academic from professional work with badges.
- **Made case studies collapsible**, cutting visible text per study from about 275 words to about 45.
- **Cleaned up a dead GitHub account**: `muhammadosamasohail99` was renamed to `muhammadosamasohail`. Rewrote 9 documentation references and rewired 3 broken git remotes across other repos. The gmail address `muhammadosamasohail99@gmail.com` contains "99" but is **not** the account, and was deliberately left untouched.
- **Rewrote copy** for more character without softening claims, and cut duplicated content: Impact lines were restating the figures directly above them, and one phrase appeared three times.
