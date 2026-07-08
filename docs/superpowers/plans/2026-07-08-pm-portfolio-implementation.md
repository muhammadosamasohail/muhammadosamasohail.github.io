# PM Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page static portfolio site for a PM job search, live on a free Cloudflare Pages URL.

**Architecture:** One `index.html`, one `css/style.css`, one `js/main.js`. No framework, no build step, no backend. Google Fonts loaded via CDN `<link>` tags. Deployed via a GitHub repo connected to Cloudflare Pages (git integration — push to `main` auto-deploys).

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

---

### Task 1: Project scaffold

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `.gitignore`
- Create: `README.md`

**Interfaces:**
- Produces: `index.html` with `<head>` Google Fonts links, `<link rel="stylesheet" href="css/style.css">`, `<script src="js/main.js" defer></script>`, and HTML comment anchors `<!-- NAV -->`, `<!-- HERO -->`, `<!-- ABOUT -->`, `<!-- CASE-STUDIES -->`, `<!-- SKILLS -->`, `<!-- TESTIMONIALS -->`, `<!-- CONTACT -->`, `<!-- FOOTER -->` inside `<body>`, in that order. Later tasks replace these comments with real markup.

- [ ] **Step 1: Write the failing check**

```bash
test -f index.html && grep -q "Space+Grotesk" index.html && echo PASS || echo FAIL
```

Run it now — expect `FAIL` (file doesn't exist yet).

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name — Product Manager</title>
  <meta name="description" content="Product Manager portfolio — case studies, skills, and background.">
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

- [ ] **Step 3: Create empty `css/style.css` and `js/main.js`**

```bash
mkdir -p css js
touch css/style.css js/main.js
```

- [ ] **Step 4: Create `.gitignore`**

```
.DS_Store
```

- [ ] **Step 5: Create `README.md`**

```markdown
# Portfolio Site

Plain HTML/CSS/JS. No build step.

## Local preview
Open `index.html` directly in a browser, or run `python3 -m http.server 8000` and visit `localhost:8000`.

## Deploy
Pushed to GitHub, connected to Cloudflare Pages via git integration. Every push to `main` auto-deploys.
```

- [ ] **Step 6: Run the check to verify it passes**

```bash
test -f index.html && grep -q "Space+Grotesk" index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/main.js .gitignore README.md
git commit -m "Scaffold portfolio site structure"
```

---

### Task 2: Design system (CSS variables, reset, typography)

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Produces: CSS custom properties `--color-bg`, `--color-text`, `--color-accent`, `--font-heading`, `--font-body`, `--space-1` through `--space-6` (spacing scale), and a `.container` class (max-width wrapper) — every later task's CSS relies on these names.

- [ ] **Step 1: Write the failing check**

```bash
grep -q "\-\-color-accent: #0033ff" css/style.css && echo PASS || echo FAIL
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

- [ ] **Step 3: Run the check to verify it passes**

```bash
grep -q "\-\-color-accent: #0033ff" css/style.css && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "Add design system: colors, typography, spacing, buttons"
```

---

### Task 3: Sticky nav + mobile toggle

**Files:**
- Modify: `index.html` (replace `<!-- NAV -->`)
- Modify: `css/style.css`
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `--color-bg`, `--color-text`, `--color-accent`, `--font-heading` from Task 2.
- Produces: nav element `id="site-nav"`, mobile toggle button `id="nav-toggle"`, JS function `toggleNav()` bound to `#nav-toggle` click, toggling class `.is-open` on `#site-nav`. Later tasks link to `#about`, `#case-studies`, `#skills`, `#testimonials`, `#contact` anchors — these ids must exist on those sections when built.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="site-nav"' index.html && echo PASS || echo FAIL
```

Run it — expect `FAIL`.

- [ ] **Step 2: Replace `<!-- NAV -->` in `index.html`**

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

- [ ] **Step 3: Add nav CSS to `css/style.css`**

```css
#site-nav {
  position: sticky;
  top: 0;
  background: var(--color-bg);
  border-bottom: 2px solid var(--color-text);
  z-index: 100;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

- [ ] **Step 4: Add toggle JS to `js/main.js`**

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
grep -q 'id="site-nav"' index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 6: Manual verification**

Run `python3 -m http.server 8000`, open `localhost:8000`, shrink window below 720px, click the `☰` button — nav links should show/hide.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "Add sticky nav with mobile toggle"
```

---

### Task 4: Hero section

**Files:**
- Modify: `index.html` (replace `<!-- HERO -->`)
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `.btn` from Task 2, `#case-studies` anchor (defined in Task 6).
- Produces: `<section id="hero">` with CTA `<a class="btn" href="#case-studies">`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="hero"' index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- HERO -->` in `index.html`**

```html
<section id="hero">
  <div class="container hero-inner">
    <h1>Product Manager who turns ambiguity into shipped, measurable outcomes.</h1>
    <p class="hero-subline">I've spent the last few years leading 0-to-1 features from problem discovery through launch. Below are three case studies showing how I think, decide, and measure impact.</p>
    <a class="btn" href="#case-studies">View Case Studies ↓</a>
  </div>
</section>
```

- [ ] **Step 3: Add hero CSS to `css/style.css`**

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
grep -q 'id="hero"' index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "Add hero section"
```

---

### Task 5: About section

**Files:**
- Modify: `index.html` (replace `<!-- ABOUT -->`)
- Modify: `css/style.css`

**Interfaces:**
- Produces: `<section id="about">`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="about"' index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- ABOUT -->` in `index.html`**

```html
<section id="about">
  <div class="container">
    <h2>About</h2>
    <p>[Placeholder — replace with your background: how you got into product management, the domains you've worked in, and what kind of problems you gravitate toward.]</p>
  </div>
</section>
```

- [ ] **Step 3: Add about CSS to `css/style.css`**

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
grep -q 'id="about"' index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "Add about section"
```

---

### Task 6: Case studies section

**Files:**
- Modify: `index.html` (replace `<!-- CASE-STUDIES -->`)
- Modify: `css/style.css`

**Interfaces:**
- Produces: `<section id="case-studies">` containing three `<article class="case-study">` blocks, each with `.cs-problem`, `.cs-process`, `.cs-solution`, `.cs-impact`, `.cs-learnings` subsections.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="case-studies"' index.html && [ "$(grep -c 'class="case-study"' index.html)" -eq 3 ] && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- CASE-STUDIES -->` in `index.html`**

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

- [ ] **Step 3: Add case study CSS to `css/style.css`**

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
grep -q 'id="case-studies"' index.html && [ "$(grep -c 'class="case-study"' index.html)" -eq 3 ] && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "Add case studies section with 3 placeholder studies"
```

---

### Task 7: Skills section

**Files:**
- Modify: `index.html` (replace `<!-- SKILLS -->`)
- Modify: `css/style.css`

**Interfaces:**
- Produces: `<section id="skills">` with `.skills-grid` of `.skill-tag` spans.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="skills"' index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- SKILLS -->` in `index.html`**

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

- [ ] **Step 3: Add skills CSS to `css/style.css`**

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
grep -q 'id="skills"' index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "Add skills section"
```

---

### Task 8: Testimonials section

**Files:**
- Modify: `index.html` (replace `<!-- TESTIMONIALS -->`)
- Modify: `css/style.css`

**Interfaces:**
- Produces: `<section id="testimonials">` with `.testimonial-grid` of `<blockquote class="testimonial">`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="testimonials"' index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- TESTIMONIALS -->` in `index.html`**

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

- [ ] **Step 3: Add testimonials CSS to `css/style.css`**

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
grep -q 'id="testimonials"' index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "Add testimonials section"
```

---

### Task 9: Contact section + footer

**Files:**
- Modify: `index.html` (replace `<!-- CONTACT -->` and `<!-- FOOTER -->`)
- Modify: `css/style.css`

**Interfaces:**
- Produces: `<section id="contact">` with `mailto:` link and LinkedIn link, and a `<footer>`.

- [ ] **Step 1: Write the failing check**

```bash
grep -q 'id="contact"' index.html && grep -q 'mailto:' index.html && echo PASS || echo FAIL
```

Expect `FAIL`.

- [ ] **Step 2: Replace `<!-- CONTACT -->` and `<!-- FOOTER -->` in `index.html`**

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

- [ ] **Step 3: Add contact/footer CSS to `css/style.css`**

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
grep -q 'id="contact"' index.html && grep -q 'mailto:' index.html && echo PASS || echo FAIL
```

Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "Add contact section and footer"
```

---

### Task 10: Resume asset placeholder + full-page manual smoke test

**Files:**
- Create: `assets/resume-placeholder.txt`
- Modify: none (verification task)

**Interfaces:**
- None — this task verifies the whole page assembled by Tasks 1–9 works end to end. `assets/resume.pdf` referenced by the nav (Task 3) does not exist yet; this task documents that gap explicitly instead of leaving a silent 404.

- [ ] **Step 1: Create a placeholder note for the missing resume file**

```bash
mkdir -p assets
cat > assets/resume-placeholder.txt << 'EOF'
Replace this file: add your real resume as assets/resume.pdf
The nav "Resume" link points to assets/resume.pdf — it will 404 until that file is added.
EOF
```

- [ ] **Step 2: Run a full static check across all required sections**

```bash
for id in site-nav hero about case-studies skills testimonials contact; do
  grep -q "id=\"$id\"" index.html && echo "PASS: $id" || echo "FAIL: $id"
done
```

Expected: `PASS` for all seven ids.

- [ ] **Step 3: Manual browser smoke test**

```bash
python3 -m http.server 8000
```

Open `localhost:8000`. Verify: nav links scroll to each section, mobile toggle works below 720px, hero CTA scrolls to case studies, testimonials grid stacks on narrow width, contact buttons show correct `mailto:` and LinkedIn href on hover.

- [ ] **Step 4: Commit**

```bash
git add assets/resume-placeholder.txt
git commit -m "Document missing resume.pdf asset"
```

---

### Task 11: Push to GitHub and connect Cloudflare Pages

**Files:** none (infra step)

**Interfaces:** none — terminal task.

- [ ] **Step 1: Confirm active GitHub account**

```bash
gh auth status
```

Expected: active account is `muhammadosamasohail`.

- [ ] **Step 2: Create the GitHub repo and push**

```bash
gh repo create muhammadosamasohail/portfolio-website --public --source=. --remote=origin --push
```

Expected: output ends with a `https://github.com/muhammadosamasohail/portfolio-website` URL and the push succeeds.

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
3. Build settings: Framework preset "None", build command empty, output directory `/`.
4. Save and Deploy.

- [ ] **Step 5: Verify the live deployment**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://portfolio-website.pages.dev
```

Expected: `200` (replace the URL with whatever subdomain Cloudflare assigns if different from the repo name).

---

## Self-Review Notes

- **Spec coverage:** Tech stack (Task 1), hosting/deploy (Task 11), visual design system (Task 2), page structure/all 6 sections + nav (Tasks 3–9), case study framework (Task 6), resume as quiet nav link (Task 3), contact without form (Task 9), out-of-scope items (blog, form backend, analytics) — none added. Confirmed all spec sections map to a task.
- **Placeholder scan:** All `[Placeholder — ...]` text is real shipped content the user will edit post-launch, per spec's "Content Readiness" section — not a plan gap. No TBD/TODO left in the plan itself.
- **Type/name consistency:** `#case-studies` id used consistently in Task 3 nav link, Task 4 hero CTA href, and Task 6 section id. `.btn` / `.btn-outline` classes defined once in Task 2, reused in Tasks 4 and 9 without redefinition.
