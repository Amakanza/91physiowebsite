# Ronelle Isaacs Physiotherapists – Website

Single-page site built with **Vite + React + Tailwind**.

## Local dev
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Deploy (zero-config)
### Vercel
1. Create a new project and import this repo.
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build`
4. Output directory: `dist/`
5. Add your domain. TLS is automatic. Enable **Force HTTPS**/**HSTS**.

### Netlify
- Build command: `npm run build`
- Publish directory: `dist/`

### Cloudflare Pages
- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`

## DNS + SSL (custom domain)
- Point `www` CNAME to your chosen host (e.g., `cname.vercel-dns.com`).
- Point apex/root to the A/ALIAS the host provides.
- Enable automatic HTTPS and redirects (HTTP→HTTPS).

## Notes
- We use anchor links for navigation (`#home`, `#services`, ...).
- All contact flows prefer **WhatsApp** and the **mobile number**.
- Tailwind is configured in `tailwind.config.js` and `src/index.css`.
