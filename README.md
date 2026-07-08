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
