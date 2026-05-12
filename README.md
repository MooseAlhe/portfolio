# Mustafa Alhelawe — Portfolio

Personal portfolio site built with Next.js 14, TypeScript, and zero UI dependencies. Terminal/hacker aesthetic, fully responsive, accessibility-conscious.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run typecheck` — TypeScript check (no emit)

## Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Composes all sections
  globals.css         # Design tokens + base styles
  components/         # One file per section
  lib/
    data.ts           # All site content
    commands.ts       # Interactive terminal command logic
public/
  resume.pdf          # Downloadable resume
```

## Deploying

The site is plain Next.js — works on Vercel, Netlify, Cloudflare Pages, Railway, or any Node host.

**Vercel:** push to GitHub, import in Vercel dashboard. Add a custom domain in Project Settings → Domains. Vercel handles HTTPS automatically.

**Netlify:** push to GitHub, "New site from Git", framework auto-detected. Custom domain under Domain Management.

**Cloudflare Pages:** push to GitHub, create new Pages project, build command `next build`, output directory `.next`.

For a custom domain (no `.vercel.app` URL), buy a domain (Namecheap/Porkbun/Cloudflare ~$10/yr), point the DNS to your host, and the host serves the site under it.
