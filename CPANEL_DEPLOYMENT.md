# cPanel Deployment Checklist

Use this checklist when deploying Cellivo to cPanel without losing SEO signals.

## Required hosting mode

Deploy this project as a cPanel **Node.js application**. Do not upload only `dist/client` to `public_html`, because the app relies on `server.js` for server-rendered SEO tags, sitemap generation, canonical URLs, blog API data, admin routes, and 301 redirects.

If the cPanel plan does not include **Setup Node.js App**, use a hosting plan/VPS that supports Node.js instead of switching this project to a static-only upload.

## Pre-deploy

1. Keep the same live domain, URL paths, titles, meta descriptions, canonical tags, robots.txt, sitemap URL, and structured data.
2. Use one canonical host only. Current canonical URL is:
   `https://cellivo.com`
3. Keep SSL active before switching DNS or making the cPanel app public.
4. Take a backup of the current live site and the existing DNS records.
5. Back up `data/cellivo.sqlite` and `data/uploads/` if the site already has live blog/admin content.

## cPanel setup

1. Open **Setup Node.js App** in cPanel.
2. Create an app with:
   - Node.js version: use the newest available LTS version supported by the host.
   - Application mode: `production`
   - Application root: a folder outside `public_html`, for example `cellivo`.
   - Application URL: the live domain, for example `cellivo.com`.
   - Application startup file: `server.js`
3. Upload the project files to the application root.
4. In the cPanel terminal, run:

```bash
npm ci
npm run build
```

5. Set environment variables in the Node.js app screen:

```text
NODE_ENV=production
SITE_URL=https://cellivo.com
ENFORCE_CANONICAL_URL=true
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
ADMIN_NAME=Cellivo Admin
```

6. Restart the Node.js app from cPanel.

## SEO checks after launch

Run these checks immediately after deployment:

```bash
curl -I https://cellivo.com/
curl -s https://cellivo.com/ | grep -E "<title>|canonical|og:url|robots"
curl -s https://cellivo.com/robots.txt
curl -s https://cellivo.com/sitemap.xml | head
curl -I https://cellivo.com/pos-billing-system
curl -I https://cellivo.com/non-existing-page-test
```

Expected results:

- Home page returns `200`.
- Canonical URL points to `https://cellivo.com/`.
- `robots.txt` allows public pages and disallows `/admin/` and `/api/`.
- `sitemap.xml` returns `200` and uses `https://cellivo.com/...` URLs.
- Old URLs such as `/pos-billing-system` return `301` to the new URL.
- Missing pages return `404`, not `200`.

## DNS cutover

1. Lower DNS TTL before switching, if possible.
2. Point the domain to cPanel.
3. Enable cPanel **Force HTTPS Redirect**.
4. Make sure `www` and non-`www` do not both serve duplicate pages. Redirect one to the canonical domain.
5. After DNS is live, submit `https://cellivo.com/sitemap.xml` in Google Search Console.

## Do not change during migration

- Do not change slugs.
- Do not change the canonical domain unless the domain is intentionally changing.
- Do not block the site with `noindex`.
- Do not replace the SSR Node app with a static-only upload.
- Do not delete existing blog/database content without a backup.
