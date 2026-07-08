# PM Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page static portfolio site for a PM job search, live on a free Cloudflare Pages URL.

**Architecture:** Site files live under `public/` (`public/index.html`, `public/css/style.css`, `public/js/main.js`, `public/assets/`) so Cloudflare Pages can be pointed at `public/` as its output directory — planning docs in `docs/` stay out of the deployed site. No framework, no build step, no backend. Google Fonts loaded via CDN `<link>` tags. Deployed via a GitHub repo connected to Cloudflare Pages (git integration — push to `main` auto-deploys). A pre-launch checklist task gates the deploy so a placeholder-filled site can't go live by accident.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, flexbox/grid, media queries), vanilla JS (mobile nav toggle only). Google Fonts: Space Grotesk, IBM Plex Sans. Git + GitHub CLI (`gh`). Cloudflare Pages.

## Global Constraints

- Zero cost: no paid services, no paid domain. Free tier of every tool only.
- No framework, no build step — plain HTML/CSS/vanilla JS only.
- Colors: background `#ffffff`, text `#0a0a0a`, accent `#0033ff`. Hard edges — `border-radius: 0` everywhere.
- Headline font: `Space Grotesk`. Body font: `IBM Plex Sans`. Both loaded free via Google Fonts CDN.
- Single-page scroll layout — no multi-page routing.
- Case studies: 3 entries, each following Problem/Context → Process → Solution → Impact → Learnings, 600–800 words target, confidential data generalized to percentages, no real company names.
- Resume link: plain text link in nav corner, not a button — must not visually compete with the primary CTA.
- Contact section: `mailto:` link + LinkedIn link only. No contact form, no third-party form service.
- No blog section. No analytics.
- Deploy target: Cloudflare Pages via GitHub git integration, account `muhammadosamasohail`.
- Only `public/` is served publicly — planning docs (`docs/`) must never be reachable from the live URL.
- The site must not go live with placeholder text, placeholder contact info, or a missing resume file (see Task 11).

---

### Task 1: Project scaffold

**Files:**
- Create: `public/index.html`
- Create: `public/css/style.css`
- Create: `public/js/main.js`
- Create: `.gitignore`
- Create: `README.md`

**Interfaces:**
- Produces: `public/index.html` with `<head>` Google Fonts links, favicon, Open Graph/Twitter meta tags, `<link rel="stylesheet" href="css/style.css">`, `<script src="js/main.js" defer></script>`, and HTML comment anchors `<!-- NAV -->`, `<!-- HERO -->`, `<!-- ABOUT -->`, `<!-- CASE-STUDIES -->`, `<!-- SKILLS -->`, `<!-- TESTIMONIALS -->`, `<!-- CONTACT -->`, `<!-- FOOTER -->` inside `<body>`, in that order. Later tasks replace these comments with real markup. All hrefs/srcs inside the HTML stay relative to `public/` (e.g. `css/style.css`, not `public/css/style.css`) since the browser loads `public/index.html` as its base.

- [ ] **Step 1: Write the failing check**

```bash
test -f public/index.html && grep -q "Space+Grotesk" public/index.html && echo PASS || echo FAIL
```

Run it now — expect `FAIL` (file doesn't exist yet).

- [ ] **Step 2: Create `public/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name — Product Manager</title>
  <meta name="description" content="Product Manager portfolio — case studies, skills, and background.">

  <meta property="og:title" content="Your Name — Product Manager">
  <meta property="og:description" content="Product Manager portfolio — case studies, skills, and background.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://portfolio-website.pages.dev">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Your Name — Product Manager">
  <meta name="twitter:description" content="Product Manager portfolio — case studies, skills, and background.">

  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230033ff'/%3E%3C/svg%3E">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- NAV -->
  <!-- HERO -->
  <!-- ABOUT -->
  <!-- CASE-STUDIES -->
  <!-- SKILLS -->
  <!-- TESTIMONIALS -->
  <!-- CONTACT -->
  <!-- FOOTER -->
  <script src="js/main.js" defer></script>
</body>
</html>
```

Note: the favicon is a flat cobalt-blue square — a neutral placeholder that already matches the site's accent color. Swap it for a real initials/logo mark later if desired; it's not a launch blocker.

- [ ] **Step 3: Create empty `public/css/style.css` and `public/js/main.js`**

```bash
mkdir -p public/css public/js
touch public/css/style.css public/js/main.js
```

- [ ] **Step 4: Create `.gitignore`**

```
.DS_Store
```

- [ ] **Step 5: Create `README.md`**

```markdown
# Portfolio Site

Plain HTML/CSS/JS. No build step. Site files live in `public/`.

## Local preview
```bash
cd public
python3 -m http.server 8000
```
Visit `localhost:8000`.

## Deploy
Pushed to GitHub, connected to Cloudflare Pages via git integration with output directory `public`. Every push to `main` auto-deploys.
```

- [ ] **Step 6: Run the check to verify it passes**

```bash
test -f public/index.html && grep -q "Space+Grotesk" public/index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 7: Commit**

```bash
git add public/index.html public/css/style.css public/js/main.js .gitignore README.md
git commit -m "Scaffold portfolio site structure"
```

---

### Task 2: Design system (CSS variables, reset, typography)

**Files:**
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: CSS custom properties `--color-bg`, `--color-text`, `--color-accent`, `--font-heading`, `--font-body`, `--nav-height`, `--space-1` through `--space-6` (spacing scale), and a `.container` class (max-width wrapper) — every later task's CSS relies on these names.

- [ ] **Step 1: Write the failing check**

```bash
grep -q "\-\-color-accent: #0033ff" public/css/style.css && echo PASS || echo FAIL
```

Run it — expect `FAIL` (file is empty).

- [ ] **Step 2: Write the design system CSS**

```css
:root {
  --color-bg: #ffffff;
  --color-text: #0a0a0a;
  --color-accent: #0033ff;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;
  --nav-height: 72px;
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 40px;
  --space-5: 64px;
  --space-6: 96px;
}

*, *::before, *::after {
  box-sizing: border-box;
  border-radius: 0 !important;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 var(--space-2) 0;
}

h1 { font-size: 48px; }
h2 { font-size: 32px; }
h3 { font-size: 20px; }

p { margin: 0 0 var(--space-2) 0; }

a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover { text-decoration: underline; }

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 var(--space-3);
}

section {
  padding: var(--space-6) 0;
}

.btn {
  display: inline-block;
  background: var(--color-accent);
  color: #ffffff;
  font-family: var(--font-heading);
  font-weight: 700;
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--color-accent);
  cursor: pointer;
}

.btn:hover {
  background: #ffffff;
  color: var(--color-accent);
  text-decoration: none;
}

.btn-outline {
  background: #ffffff;
  color: var(--color-text);
  border: 2px solid var(--color-text);
}

.btn-outline:hover {
  background: var(--color-text);
  color: #ffffff;
}
```

Note: `scroll-padding-top: var(--nav-height)` prevents the sticky nav (built in Task 3) from covering section headings when a nav link or the hero CTA scrolls the page to an anchor. `--nav-height: 72px` is a safe upper-bound estimate of the actual nav's rendered height (padding + content + border); if the real nav ends up taller after Task 3, bump this value to match.

- [ ] **Step 3: Run the check to verify it passes**

```bash
grep -q "\-\-color-accent: #0033ff" public/css/style.css && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 4: Commit**

```bash
git add public/css/style.css
git commit -m "Add design system: colors, typography, spacing, buttons"
```

---

### Task 3: Sticky nav + mobile toggle

**Files:**
- Modify: `public/index.html` (replace `<!-- NAV -->`)
- Modify: `public/css/style.css`
- Modify: `public/js/main.js`

**Interfaces:**
- Consumes: `--color-bg`, `--color-text`, `--color-accent`, `--font-heading`, `--nav-height` from Task 2.
- Produces: nav element `id="site-nav"`, mobile toggle button `id="nav-toggle"`, JS function `toggleNav()` bound to `#nav-toggle` click, toggling class `.is-open` on `.nav-links`. Later tasks link to `#about`, `#case-studies`, `#skills`, `#testimonials`, `#contact` anchors — these ids must exist on those sections when built.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="site-nav"' public/index.html && echo PASS || echo FAIL
```

Run it — expect `FAIL`.

- [ ] **Step 2: Replace `<!-- NAV -->` in `public/index.html`**

```html
<nav id="site-nav">
  <div class="container nav-inner">
    <span class="nav-name">Your Name</span>
    <button id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#case-studies">Work</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#contact">Contact</a>
      <a href="assets/resume.pdf" class="nav-resume" target="_blank" rel="noopener">Resume</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 3: Add nav CSS to `public/css/style.css`**

```css
#site-nav {
  position: sticky;
  top: 0;
  min-height: var(--nav-height);
  background: var(--color-bg);
  border-bottom: 2px solid var(--color-text);
  z-index: 100;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--nav-height);
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
}

.nav-name {
  font-family: var(--font-heading);
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.nav-links a {
  color: var(--color-text);
  font-weight: 500;
}

.nav-links a:hover { color: var(--color-accent); }

.nav-resume {
  font-size: 14px;
  opacity: 0.7;
}

#nav-toggle {
  display: none;
  background: none;
  border: 2px solid var(--color-text);
  font-size: 20px;
  padding: 4px 10px;
  cursor: pointer;
}

@media (max-width: 720px) {
  #nav-toggle { display: block; }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-bg);
    border-bottom: 2px solid var(--color-text);
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: var(--space-2) var(--space-3);
  }

  .nav-links a {
    padding: var(--space-1) 0;
    width: 100%;
  }

  .nav-links.is-open { display: flex; }
}
```

- [ ] **Step 4: Add toggle JS to `public/js/main.js`**

```javascript
function toggleNav() {
  var links = document.querySelector('.nav-links');
  var btn = document.getElementById('nav-toggle');
  var isOpen = links.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.getElementById('nav-toggle').addEventListener('click', toggleNav);
```

- [ ] **Step 5: Run the check to verify it passes**

```bash
grep -q 'id="site-nav"' public/index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 6: Manual verification**

```bash
cd public && python3 -m http.server 8000
```

Open `localhost:8000`. Shrink window below 720px, click the `☰` button — nav links should show/hide. Measure the nav's actual rendered height in devtools; if it differs meaningfully from 72px, update `--nav-height` in Task 2's CSS.

- [ ] **Step 7: Commit**

```bash
git add public/index.html public/css/style.css public/js/main.js
git commit -m "Add sticky nav with mobile toggle"
```

---

### Task 4: Hero section

**Files:**
- Modify: `public/index.html` (replace `<!-- HERO -->`)
- Modify: `public/css/style.css`

**Interfaces:**
- Consumes: `.btn` from Task 2, `#case-studies` anchor (defined in Task 6).
- Produces: `<section id="hero">` with CTA `<a class="btn" href="#case-studies">`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="hero"' public/index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- HERO -->` in `public/index.html`**

```html
<section id="hero">
  <div class="container hero-inner">
    <h1>Product Manager who turns ambiguity into shipped, measurable outcomes.</h1>
    <p class="hero-subline">I've spent the last few years leading 0-to-1 features from problem discovery through launch. Below are three case studies showing how I think, decide, and measure impact.</p>
    <a class="btn" href="#case-studies">View Case Studies ↓</a>
  </div>
</section>
```

- [ ] **Step 3: Add hero CSS to `public/css/style.css`**

```css
#hero {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
}

.hero-inner {
  max-width: 700px;
}

.hero-subline {
  font-size: 18px;
  max-width: 560px;
}
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
grep -q 'id="hero"' public/index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "Add hero section"
```

---

### Task 5: About section

**Files:**
- Modify: `public/index.html` (replace `<!-- ABOUT -->`)
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `<section id="about">`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="about"' public/index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- ABOUT -->` in `public/index.html`**

```html
<section id="about">
  <div class="container">
    <h2>About</h2>
    <p>[Placeholder — replace with your background: how you got into product management, the domains you've worked in, and what kind of problems you gravitate toward.]</p>
  </div>
</section>
```

- [ ] **Step 3: Add about CSS to `public/css/style.css`**

```css
#about {
  border-top: 2px solid var(--color-text);
}

#about .container p {
  max-width: 640px;
}
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
grep -q 'id="about"' public/index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "Add about section"
```

---

### Task 6: Case studies section

**Files:**
- Modify: `public/index.html` (replace `<!-- CASE-STUDIES -->`)
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `<section id="case-studies">` containing three `<article class="case-study">` blocks, each with `.cs-problem`, `.cs-process`, `.cs-solution`, `.cs-impact`, `.cs-learnings` subsections.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="case-studies"' public/index.html && [ "$(grep -c 'class="case-study"' public/index.html)" -eq 3 ] && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- CASE-STUDIES -->` in `public/index.html`**

```html
<section id="case-studies">
  <div class="container">
    <h2>Case Studies</h2>

    <article class="case-study">
      <h3>[Placeholder — Case Study 1 Title]</h3>
      <div class="cs-problem">
        <h4>Problem</h4>
        <p>[Placeholder — the business challenge, constraints, and your specific role in it.]</p>
      </div>
      <div class="cs-process">
        <h4>Process</h4>
        <p>[Placeholder — research done, alternatives considered, how you decided.]</p>
      </div>
      <div class="cs-solution">
        <h4>Solution</h4>
        <p>[Placeholder — what was actually shipped.]</p>
      </div>
      <div class="cs-impact">
        <h4>Impact</h4>
        <p class="cs-metric">[Placeholder — e.g. "+18% activation" — use relative percentages, not exact confidential figures.]</p>
      </div>
      <div class="cs-learnings">
        <h4>Learnings</h4>
        <p>[Placeholder — trade-offs made, what you'd do differently.]</p>
      </div>
    </article>

    <article class="case-study">
      <h3>[Placeholder — Case Study 2 Title]</h3>
      <div class="cs-problem">
        <h4>Problem</h4>
        <p>[Placeholder]</p>
      </div>
      <div class="cs-process">
        <h4>Process</h4>
        <p>[Placeholder]</p>
      </div>
      <div class="cs-solution">
        <h4>Solution</h4>
        <p>[Placeholder]</p>
      </div>
      <div class="cs-impact">
        <h4>Impact</h4>
        <p class="cs-metric">[Placeholder]</p>
      </div>
      <div class="cs-learnings">
        <h4>Learnings</h4>
        <p>[Placeholder]</p>
      </div>
    </article>

    <article class="case-study">
      <h3>[Placeholder — Case Study 3 Title]</h3>
      <div class="cs-problem">
        <h4>Problem</h4>
        <p>[Placeholder]</p>
      </div>
      <div class="cs-process">
        <h4>Process</h4>
        <p>[Placeholder]</p>
      </div>
      <div class="cs-solution">
        <h4>Solution</h4>
        <p>[Placeholder]</p>
      </div>
      <div class="cs-impact">
        <h4>Impact</h4>
        <p class="cs-metric">[Placeholder]</p>
      </div>
      <div class="cs-learnings">
        <h4>Learnings</h4>
        <p>[Placeholder]</p>
      </div>
    </article>
  </div>
</section>
```

- [ ] **Step 3: Add case study CSS to `public/css/style.css`**

```css
#case-studies {
  border-top: 2px solid var(--color-text);
  background: #fafafa;
}

.case-study {
  padding: var(--space-4) 0;
  border-bottom: 1px solid #ddd;
}

.case-study:last-child { border-bottom: none; }

.case-study h4 {
  font-family: var(--font-heading);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 4px;
}

.case-study > div { margin-bottom: var(--space-2); }

.cs-metric {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 700;
}
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
grep -q 'id="case-studies"' public/index.html && [ "$(grep -c 'class="case-study"' public/index.html)" -eq 3 ] && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "Add case studies section with 3 placeholder studies"
```

---

### Task 7: Skills section

**Files:**
- Modify: `public/index.html` (replace `<!-- SKILLS -->`)
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `<section id="skills">` with `.skills-grid` of `.skill-tag` spans.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="skills"' public/index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- SKILLS -->` in `public/index.html`**

```html
<section id="skills">
  <div class="container">
    <h2>Skills</h2>
    <div class="skills-grid">
      <span class="skill-tag">Product Strategy</span>
      <span class="skill-tag">Roadmapping</span>
      <span class="skill-tag">User Research</span>
      <span class="skill-tag">A/B Testing</span>
      <span class="skill-tag">SQL</span>
      <span class="skill-tag">Figma</span>
      <span class="skill-tag">Jira</span>
      <span class="skill-tag">Stakeholder Management</span>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add skills CSS to `public/css/style.css`**

```css
#skills {
  border-top: 2px solid var(--color-text);
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-tag {
  border: 2px solid var(--color-text);
  padding: var(--space-1) var(--space-2);
  font-family: var(--font-heading);
  font-size: 14px;
}
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
grep -q 'id="skills"' public/index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "Add skills section"
```

---

### Task 8: Testimonials section

**Files:**
- Modify: `public/index.html` (replace `<!-- TESTIMONIALS -->`)
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `<section id="testimonials">` with `.testimonial-grid` of `<blockquote class="testimonial">`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="testimonials"' public/index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- TESTIMONIALS -->` in `public/index.html`**

```html
<section id="testimonials">
  <div class="container">
    <h2>Testimonials</h2>
    <div class="testimonial-grid">
      <blockquote class="testimonial">
        <p>"[Placeholder — pull quote from a LinkedIn recommendation or manager feedback.]"</p>
        <cite>— [Placeholder role, e.g. "Engineering Manager, cross-functional partner"]</cite>
      </blockquote>
      <blockquote class="testimonial">
        <p>"[Placeholder — second pull quote.]"</p>
        <cite>— [Placeholder role]</cite>
      </blockquote>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add testimonials CSS to `public/css/style.css`**

```css
#testimonials {
  border-top: 2px solid var(--color-text);
  background: #fafafa;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.testimonial {
  margin: 0;
  padding: var(--space-3);
  border-left: 4px solid var(--color-accent);
}

.testimonial cite {
  display: block;
  margin-top: var(--space-1);
  font-style: normal;
  font-weight: 500;
  opacity: 0.7;
}

@media (max-width: 720px) {
  .testimonial-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
grep -q 'id="testimonials"' public/index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "Add testimonials section"
```

---

### Task 9: Contact section + footer

**Files:**
- Modify: `public/index.html` (replace `<!-- CONTACT -->` and `<!-- FOOTER -->`)
- Modify: `public/css/style.css`

**Interfaces:**
- Produces: `<section id="contact">` with `mailto:` link and LinkedIn link, and a `<footer>`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="contact"' public/index.html && grep -q 'mailto:' public/index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- CONTACT -->` and `<!-- FOOTER -->` in `public/index.html`**

```html
<section id="contact">
  <div class="container">
    <h2>Contact</h2>
    <p>Open to Product Manager roles — happy to talk through any of the case studies above in more depth.</p>
    <div class="contact-links">
      <a class="btn" href="mailto:you@example.com">Email Me</a>
      <a class="btn btn-outline" href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
</section>
```

```html
<footer>
  <div class="container">
    <p>&copy; 2026 Your Name.</p>
  </div>
</footer>
```

- [ ] **Step 3: Add contact/footer CSS to `public/css/style.css`**

```css
#contact {
  border-top: 2px solid var(--color-text);
  text-align: center;
}

#contact p {
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.contact-links {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
  margin-top: var(--space-3);
}

footer {
  border-top: 2px solid var(--color-text);
  padding: var(--space-3) 0;
  font-size: 14px;
  opacity: 0.6;
}
```

- [ ] **Step 4: Run the check to verify it passes**

```bash
grep -q 'id="contact"' public/index.html && grep -q 'mailto:' public/index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "Add contact section and footer"
```

---

### Task 10: Resume asset placeholder + full-page manual smoke test

**Files:**
- Create: `public/assets/resume-placeholder.txt`
- Modify: none (verification task)

**Interfaces:**
- None — this task verifies the whole page assembled by Tasks 1–9 works end to end. `public/assets/resume.pdf` referenced by the nav (Task 3) does not exist yet; this task documents that gap. Task 11 hard-blocks deploy until the real file is added — this task does not resolve the 404, only surfaces it clearly.

- [ ] **Step 1: Create a placeholder note for the missing resume file**

```bash
mkdir -p public/assets
cat > public/assets/resume-placeholder.txt << 'EOF'
Replace this file: add your real resume as public/assets/resume.pdf
The nav "Resume" link points to assets/resume.pdf — Task 11 will refuse to let the site deploy until that file exists.
EOF
```

- [ ] **Step 2: Run a full static check across all required sections**

```bash
for id in site-nav hero about case-studies skills testimonials contact; do
  grep -q "id=\"$id\"" public/index.html && echo "PASS: $id" || echo "FAIL: $id"
done
```

Expected: `PASS` for all seven ids.

- [ ] **Step 3: Manual browser smoke test**

```bash
cd public && python3 -m http.server 8000
```

Open `localhost:8000`. Verify: nav links scroll to each section without the sticky nav covering the heading, mobile toggle works below 720px, hero CTA scrolls to case studies, testimonials grid stacks on narrow width, contact buttons show correct `mailto:` and LinkedIn href on hover.

- [ ] **Step 4: Commit**

```bash
git add public/assets/resume-placeholder.txt
git commit -m "Document missing resume.pdf asset"
```

---

### Task 11: Pre-launch content & metadata checklist (deploy gate)

**Files:** none (verification/content-gate task)

**Interfaces:** none. This task must show all `PASS` before Task 12 runs. It is expected that Step 1 fails the first time — stop, fill in your real content and files, then re-run Step 1 until everything passes.

- [ ] **Step 1: Run the checklist script**

```bash
cd public
check_status=0

if grep -rq '\[Placeholder' .; then
  echo "FAIL: placeholder text still present in these locations:"
  grep -rln '\[Placeholder' .
  check_status=1
else
  echo "PASS: no placeholder text remains"
fi

if grep -q 'mailto:you@example.com' index.html; then
  echo "FAIL: replace the mailto: address in the Contact section with your real email"
  check_status=1
else
  echo "PASS: mailto address updated"
fi

if grep -q 'linkedin.com/in/your-profile' index.html; then
  echo "FAIL: replace the LinkedIn URL in the Contact section with your real profile"
  check_status=1
else
  echo "PASS: LinkedIn URL updated"
fi

if grep -q '>Your Name<' index.html; then
  echo "FAIL: replace 'Your Name' in the nav/footer with your real name"
  check_status=1
else
  echo "PASS: name updated"
fi

if [ ! -f assets/resume.pdf ]; then
  echo "FAIL: add your real resume as public/assets/resume.pdf (the nav Resume link 404s without it)"
  check_status=1
else
  echo "PASS: resume.pdf present"
fi

exit $check_status
```

Note: uses `check_status` rather than `status` — `status` is a read-only special variable in zsh and assigning to it errors out.

- [ ] **Step 2: Fill in real content until Step 1 is all-PASS**

Edit `public/index.html` directly: replace every `[Placeholder ...]` block with real copy, swap the example `mailto:`/LinkedIn/name strings for the real ones, and drop a real `resume.pdf` into `public/assets/`. Re-run Step 1's script after each change.

- [ ] **Step 3: Commit the real content**

```bash
git add public/index.html public/assets/resume.pdf
git commit -m "Replace placeholder content with real copy and resume"
```

Do not proceed to Task 12 until Step 1 exits `0`.

---

### Task 12: Push to GitHub and connect Cloudflare Pages

**Files:** none (infra step)

**Interfaces:** none — terminal task. Requires Task 11 fully passing first.

- [ ] **Step 1: Confirm active GitHub account**

```bash
gh auth status
```

Expected: active account is `muhammadosamasohail`.

- [ ] **Step 2: Create the GitHub repo and push**

```bash
gh repo create muhammadosamasohail/portfolio-website --public --source=. --remote=origin --push
```

The local repo already exists on branch `main` with no remote configured, so this attaches `origin` and pushes existing history — it does not re-initialize anything. Expected: output ends with a `https://github.com/muhammadosamasohail/portfolio-website` URL and the push succeeds.

- [ ] **Step 3: Verify the push**

```bash
git log --oneline -1
gh repo view muhammadosamasohail/portfolio-website --web
```

Expected: browser opens the repo page showing the latest commit.

- [ ] **Step 4: Connect Cloudflare Pages (manual, one-time, requires browser OAuth — cannot be scripted)**

In the Cloudflare dashboard:
1. Workers & Pages → Create → Pages → Connect to Git.
2. Authorize Cloudflare for GitHub if prompted, select `portfolio-website`.
3. Build settings: Framework preset "None", build command empty, **output directory `public`** (not `/` — this is what keeps `docs/` out of the public site).
4. Save and Deploy.

- [ ] **Step 5: Verify the live deployment**

```bash
url="https://portfolio-website.pages.dev"
for i in $(seq 1 10); do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" = "200" ]; then
    echo "PASS: $url is live (HTTP 200)"
    break
  fi
  echo "Attempt $i/10: HTTP $code — Cloudflare's first build can take a minute or two, retrying in 15s..."
  sleep 15
done
```

Replace the URL with whatever subdomain Cloudflare actually assigns if it differs from the repo name (shown in the dashboard after Step 4).

- [ ] **Step 6: Also confirm `docs/` is not publicly served**

```bash
curl -s -o /dev/null -w "%{http_code}\n" "https://portfolio-website.pages.dev/docs/superpowers/specs/2026-07-08-pm-portfolio-design.md"
```

Expected: `404` (proves the `public`-only output directory is scoped correctly).

- [ ] **Step 7: Update the Open Graph URL to the real live address**

```bash
sed -i '' 's#https://portfolio-website.pages.dev#'"$url"'#' public/index.html
git add public/index.html
git commit -m "Update og:url to live deployment URL"
git push
```

(On Linux, drop the `''` after `-i`.) This triggers an auto-redeploy via the git integration from Task 12.

---

## Self-Review Notes

- **Spec coverage:** Tech stack (Task 1), hosting/deploy (Task 12), visual design system (Task 2), page structure/all 6 sections + nav (Tasks 3–9), case study framework (Task 6), resume as quiet nav link (Task 3), contact without form (Task 9), out-of-scope items (blog, form backend, analytics) — none added. Confirmed all spec sections map to a task.
- **Placeholder scan:** All `[Placeholder — ...]` text is real shipped content the user will edit post-launch, per spec's "Content Readiness" section — not a plan gap, and Task 11 now hard-blocks deploy until every one is replaced. No TBD/TODO left in the plan itself.
- **Type/name consistency:** `#case-studies` id used consistently in Task 3 nav link, Task 4 hero CTA href, and Task 6 section id. `.btn` / `.btn-outline` classes defined once in Task 2, reused in Tasks 4 and 9 without redefinition.
- **Red-team fixes applied (Opus adversarial review, 2026-07-08):**
  - Blocker: resume 404 on live site → Task 11 now blocks deploy until `public/assets/resume.pdf` exists.
  - Blocker: placeholder site could be deployed and shared as-is → Task 11 checklist gate added before Task 12.
  - Should-fix: sticky nav covering scrolled-to headings → `scroll-padding-top` added in Task 2.
  - Should-fix: no Open Graph/Twitter tags → added in Task 1, URL corrected post-deploy in Task 12 Step 7.
  - Should-fix: no favicon → flat cobalt-blue SVG data-URI favicon added in Task 1.
  - Should-fix: immediate curl after deploy is a false-negative risk → retry loop added in Task 12 Step 5.
  - Should-fix: `docs/` planning files servable on the public domain → site restructured under `public/`, Cloudflare output directory set to `public`, verified with a 404 check in Task 12 Step 6.
