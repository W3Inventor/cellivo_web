# SEO Audit Report

Date: 2026-04-18  
Project: Cellivo website  
Base URL audited: `https://cellivo.com`  
Local verification environment: production SSR build served from `http://localhost:8080`

## Overall SEO Score

**88/100**

The website has a strong technical SEO foundation:

- Server-side rendering is working
- Core indexed pages have unique metadata
- Canonicals are production-based and self-referencing
- Schema coverage is strong
- Internal linking is much better than a typical small SaaS site
- Local SEO signals are consistent

The main issues now are:

- keyword cannibalization across closely related commercial pages
- one missing blog URL in the sitemap
- uneven contextual internal linking
- slow LCP / heavy shared JS on important landing pages

---

## 1. Technical SEO Audit

### Summary

What is working well:

- All audited public pages returned HTML successfully
- Titles exist on all audited public pages
- Meta descriptions exist on all audited public pages
- Canonical tags exist and point to production URLs
- Legacy SEO-hostile URLs redirect correctly
- `robots.txt` is present and valid
- `sitemap.xml` is present and valid
- `login` and `signup` are correctly noindexed
- 404 pages return `404` and `noindex, nofollow`

### Technical Issues

| Page URL / Area | Issue | Severity | Fix recommendation |
|---|---|---:|---|
| `/blog/customer-loyalty-programs-phone-shops` | Live page returns `200` but is missing from `sitemap.xml`. | High | Add this blog post to sitemap generation so search engines can discover and prioritize it. |
| `/`, `/mobile-shop-pos-system`, `/pos-system-for-phone-shop`, `/pos-for-mobile-shops` | Keyword intent overlap remains in the commercial cluster. | High | Define one clear primary keyword and unique search intent per page. Keep intro copy, anchors, and internal links aligned to that role. |
| Sitewide | Local Lighthouse showed slow LCP on key landing pages. | High | Reduce client-side JS further, especially shared UI/vendor code. |
| `/pos-for-mobile-shops` | Page is still close in intent to the main hub despite retargeting toward small shops. | Medium | Either deepen the “small mobile shops” angle or merge into the main hub later if performance in search is weak. |
| `/customers-suppliers-management` | Page targeting is broad and less explicit than the rest of the feature cluster. | Medium | Make the title, H1, and intro more clearly focused on customer/supplier management for phone shops. |
| Removed URLs `/subscription-billing-support`, `/reload-topup-services` | These return `404`. Technically valid, but risky if they had backlinks or prior traffic. | Medium | Check Search Console and backlink tools. Redirect if those URLs still carry equity. |
| HTTPS | Production URLs and canonicals use `https://cellivo.com`, but public SSL behavior was not externally tested in this local audit. | Low | Validate the live deployed domain with Search Console / SSL tools after deployment. |

### Redirects Checked

Verified working `301` redirects:

- `/pos-billing-system` -> `/billing-software-for-mobile-shop`
- `/inventory-imei-tracking` -> `/imei-tracking-pos-system`
- `/repair-management-system` -> `/mobile-repair-management-software`
- `/multi-branch-pos` -> `/multi-branch-pos-system`

### Robots and Indexing

Verified `robots.txt`:

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://cellivo.com/sitemap.xml
```

Verified indexing controls:

- `/login` -> `noindex, nofollow`
- `/signup` -> `noindex, nofollow`
- non-existent route -> `404` with `noindex, nofollow`

### Broken Links

Internal link crawl summary:

- No broken internal links were found in the audited page set
- Sampled external links were valid:
  - `https://support.cellivo.com/`
  - `https://w3inventor.com/`
  - Google Maps business location link

---

## 2. On-Page SEO Audit

### Home Page `/`

**What is good**

- Strong title and H1
- Strong first paragraph with broad commercial relevance
- Good FAQ and SoftwareApplication schema
- Strong internal links into the product cluster

**What is missing**

- The homepage leans more toward the hub page than the conversion page in body-level links

**What should be improved**

- Add one more contextual body link to `/pos-system-for-phone-shop`
- Keep the homepage broad and brand-led so it does not compete with the hub too directly

### `/mobile-shop-pos-system`

**What is good**

- Strong title, H1, and first paragraph
- Strong depth and structure
- Good feature linking
- Strong schema coverage
- Clear role as main system overview page

**What is missing**

- It still overlaps a bit with `/pos-system-for-phone-shop`

**What should be improved**

- Keep this page strictly focused on full-system overview intent
- Avoid drifting too hard into billing-speed or local-market copy

### `/pos-system-for-phone-shop`

**What is good**

- Strong commercial-intent targeting
- Strong H1 and keyword placement
- Clear billing/sales angle
- Good funnel role

**What is missing**

- Some overlap with the main hub remains

**What should be improved**

- Keep this page tightly focused on billing speed, checkout flow, and counter efficiency

### `/features`

**What is good**

- Corrected H1
- Deep, useful content
- Strong section hierarchy
- Strong schema coverage
- Good internal links

**What is missing**

- The first visible paragraph is pain-led rather than keyword-led

**What should be improved**

- Strengthen the first descriptive paragraph so `mobile shop POS features` appears early in the page body

### Feature Pages

Pages audited:

- `/billing-software-for-mobile-shop`
- `/imei-tracking-pos-system`
- `/inventory-management-system`
- `/mobile-repair-management-software`
- `/multi-branch-pos-system`
- `/cash-drawer-management`
- `/customer-loyalty-system`
- `/banking-credit-cheques`
- `/staff-commissions-payroll`
- `/customers-suppliers-management`
- `/settings-security-integrations`
- `/integrations`

**What is good**

- One H1 per page
- Strong landing-page structure
- Good CTA usage
- FAQ schema on most pages
- Hub and conversion links exist

**What is missing**

- Several pages use similar structural language patterns
- Some secondary pages rely more on shared nav/footer links than editorial in-copy links
- `/customers-suppliers-management` is less search-focused than the others

**What should be improved**

- Differentiate the intros and keyword angles more clearly page to page
- Add 1–2 stronger contextual links on:
  - `/banking-credit-cheques`
  - `/staff-commissions-payroll`
  - `/settings-security-integrations`
  - `/integrations`
- Retarget `/customers-suppliers-management` more explicitly

### About Page `/about`

**What is good**

- Strong authority and trust signals
- W3Inventor positioning is clear
- Good Organization schema
- Good internal product links

**What is missing**

- Product-adjacent keyword targeting is softer than the commercial pages

**What should be improved**

- Keep About trust-focused and do not over-optimize it into a product landing page

### Contact Page `/contact`

**What is good**

- Strong local SEO signals
- Real phone and address
- LocalBusiness schema
- FAQ section
- Good trust content

**What is missing**

- No major on-page SEO gaps were found

**What should be improved**

- Maintain this page as a local trust/support page, not a competing product page

### Blog

Pages audited:

- `/blog`
- `/blog/how-to-choose-pos-system-for-phone-shop`
- `/blog/imei-tracking-best-practices-phone-shops`
- `/blog/why-phone-shops-need-repair-management-software`
- `/blog/multi-branch-phone-shop-management-tips`
- `/blog/reducing-billing-errors-mobile-retail`
- `/blog/customer-loyalty-programs-phone-shops`

**What is good**

- Blog and post pages have valid metadata
- Blog and BlogPosting schema are present
- Canonicals are correct

**What is missing**

- Editorial links from blog content into core money pages are relatively light
- One blog URL is missing from the sitemap

**What should be improved**

- Add contextual product links inside articles
- Fix sitemap inclusion for the missing blog post

---

## 3. Site Structure Audit

### Current Structure

```text
/
├─ /mobile-shop-pos-system                <- main SEO hub
│  ├─ /pos-system-for-phone-shop          <- conversion / billing-speed angle
│  ├─ /billing-software-for-mobile-shop
│  ├─ /imei-tracking-pos-system
│  ├─ /inventory-management-system
│  ├─ /mobile-repair-management-software
│  ├─ /multi-branch-pos-system
│  ├─ /cash-drawer-management
│  ├─ /customer-loyalty-system
│  ├─ /banking-credit-cheques
│  ├─ /staff-commissions-payroll
│  ├─ /customers-suppliers-management
│  ├─ /settings-security-integrations
│  └─ /integrations
├─ /pos-for-mobile-shops                  <- small-shop variant
├─ /pos-system-sri-lanka                  <- local intent
├─ /features
├─ /pricing
├─ /about
├─ /contact
└─ /blog
   ├─ /blog/how-to-choose-pos-system-for-phone-shop
   ├─ /blog/imei-tracking-best-practices-phone-shops
   ├─ /blog/why-phone-shops-need-repair-management-software
   ├─ /blog/multi-branch-phone-shop-management-tips
   ├─ /blog/reducing-billing-errors-mobile-retail
   └─ /blog/customer-loyalty-programs-phone-shops
```

### What is strong

- URLs are lowercase and hyphenated
- Hub-and-spoke model exists
- Main SEO pages are surfaced in nav and footer
- Breadcrumb schema is present on major pages

### Weak areas

- Too many closely related commercial pages in the top-level cluster
- Heavy reliance on sitewide nav/footer links instead of body-level editorial links
- `/pos-for-mobile-shops` is structurally the least clear page in the cluster

### Recommended improvements

- Keep `/mobile-shop-pos-system` as the main hub
- Keep `/pos-system-for-phone-shop` as the conversion page
- Keep `/pos-system-sri-lanka` purely local-intent
- Either deepen or consolidate `/pos-for-mobile-shops`

---

## 4. Performance & Core Web Vitals Audit

### Lighthouse Lab Checks

Checked pages:

- `/`
- `/mobile-shop-pos-system`

Results:

- Performance score: **62**
- SEO score: **100**
- Best Practices: **100**
- LCP: **6.5s**
- CLS: **0**
- TBT: **0 ms**
- Speed Index: **6.2s**
- Unused JS estimate: **253–256 KiB**

### Built Asset Observations

Notable production asset sizes:

- `index-*.js` ~ 93.9 kB
- `icons-*.js` ~ 50.2 kB
- `motion-*.js` ~ 122.6 kB
- `radix-*.js` ~ 251.8 kB

### Performance Issues

- LCP is too slow on key landing pages
- Shared UI/vendor chunks are still heavy
- Main issue is script/asset cost, not CLS

### Suggested fixes

- Reduce shared vendor chunk weight
- Split or defer more `radix`, `motion`, and icon code
- Lazy-load below-the-fold interactive components
- Re-run Lighthouse on:
  - `/`
  - `/mobile-shop-pos-system`
  - `/pos-system-for-phone-shop`
  - `/pricing`
  - top feature pages

---

## 5. Mobile SEO Audit

### What is good

- Pages appear structurally responsive
- Buttons are generally large enough
- No obvious overflow issues were found in the rendered output
- Forms and CTAs appear mobile-friendly

### Mobile UX Issues

- The biggest mobile SEO risk is performance, not layout
- Long-form landing pages are content-heavy and can feel dense before users reach deeper sections

### Suggested fixes

- Improve LCP and reduce script weight first
- Keep above-the-fold sections tight on long landing pages
- Validate with real-device testing after performance work

---

## 6. Schema & Structured Data Audit

### Present and healthy

- `Organization` schema: sitewide
- `LocalBusiness`: `/contact`
- `FAQPage`: most feature/commercial pages and pricing
- `SoftwareApplication`: main product/system pages
- `Product`: `/pricing`
- `Blog` / `BlogPosting`: blog pages
- `BreadcrumbList`: main indexed pages

### Issues

| Page / Area | Issue | Severity | Recommendation |
|---|---|---:|---|
| `/blog/customer-loyalty-programs-phone-shops` | Page exists but sitemap discovery is missing. Schema itself is not the issue. | High | Add to sitemap generation. |
| `/pos-for-mobile-shops` | No FAQ schema. | Low | Optional: add if this page becomes strategically important. |
| `/pos-system-sri-lanka` | No FAQ schema. | Low | Optional: add if local SERP competition becomes more important. |

### Recommendations

- Keep current schema coverage
- Expand only where it supports distinct search intent
- Prioritize sitemap completeness before adding more schema types

---

## 7. Internal Linking Audit

### Main Target Pages

- `/mobile-shop-pos-system`
- `/pos-system-for-phone-shop`

### Link Distribution

**`/mobile-shop-pos-system`**

- linked from **28 audited pages**
- strongest anchor patterns:
  - `Mobile Shop POS`
  - `mobile shop POS system`
  - `View Full POS System`
  - `Explore Full POS System`

**`/pos-system-for-phone-shop`**

- linked from **28 audited pages**
- strongest anchor patterns:
  - `POS for Phone Shops`
  - `POS system for phone shop`
  - `View POS System`
  - `View POS for Phone Shops`

### Weak internal-link areas

- blog list page
- blog post content
- `/pos-for-mobile-shops`
- `/pos-system-sri-lanka`
- secondary feature pages need stronger editorial in-copy linking:
  - `/banking-credit-cheques`
  - `/staff-commissions-payroll`
  - `/settings-security-integrations`
  - `/integrations`

### Orphan Pages

- No orphan pages were found in the audited set

### Recommendation

- Add more in-content links rather than only relying on nav/footer links
- Use varied but controlled anchor text

---

## 8. Content & SEO Strategy Audit

### Strengths

- Good keyword targeting across major pages
- Strong landing-page depth
- Good conversion coverage
- Blog foundation exists

### Keyword gaps and risks

- Cannibalization remains the main strategic risk:
  - `/`
  - `/mobile-shop-pos-system`
  - `/pos-system-for-phone-shop`
  - `/pos-for-mobile-shops`
- `/customers-suppliers-management` is less clearly targeted than the rest

### Content gaps

More supporting content would help around:

- pricing comparisons
- IMEI auditing and compliance
- repair workflow management
- staff permissions and shrinkage control
- Sri Lanka-specific POS buying guides
- multi-branch operations

### Cannibalization Risks

| Pages | Risk | Severity | Recommendation |
|---|---|---:|---|
| `/` vs `/mobile-shop-pos-system` | Both cover broad product/system intent | Medium | Keep homepage brand-led and the hub system-led |
| `/mobile-shop-pos-system` vs `/pos-system-for-phone-shop` | Overlap on general phone shop POS messaging | High | Keep hub broad, keep conversion page focused on billing/checkout |
| `/mobile-shop-pos-system` vs `/pos-for-mobile-shops` | Similar intent unless the “small shops” angle is clearly maintained | High | Either deepen the small-shop angle or merge later |
| `/pos-system-sri-lanka` vs general commercial pages | Local angle can blur if used too broadly elsewhere | Medium | Concentrate local-intent wording on the Sri Lanka page and contact page |

---

## 9. Local SEO Audit

### Strength

- Real phone number and address are consistent sitewide
- Contact page has strong local signals
- `LocalBusiness` schema is present
- Footer reinforces NAP consistently
- Sri Lanka-specific intent page exists

Verified business details:

- Phone: `+94 70 272 0000`
- Address: `318/A/3 High Level Rd, Pannipitiya 10230, Sri Lanka`

### Missing / weaker areas

- Local intent should remain concentrated on:
  - `/contact`
  - `/pos-system-sri-lanka`

If it spreads too widely across commercial pages, the local page can lose distinction.

### Local SEO Assessment

**Strong**

---

## 10. Top 10 Critical Issues

1. `/blog/customer-loyalty-programs-phone-shops` is missing from the sitemap
2. Keyword cannibalization still exists in the main commercial cluster
3. LCP is too slow on key pages (`~6.5s` in local Lighthouse)
4. Shared JS remains heavier than ideal
5. `/pos-for-mobile-shops` is not yet clearly differentiated enough
6. Blog posts are under-linked to core money pages
7. `/customers-suppliers-management` is less search-focused than the rest of the feature cluster
8. Several pages still rely on pain hooks before keyword-led explanatory copy
9. Removed URLs may need redirects if they still have backlinks
10. Some titles could be expanded slightly for better CTR without harming length targets

---

## Quick Wins

- Add `/blog/customer-loyalty-programs-phone-shops` to the sitemap
- Add editorial product links inside blog posts
- Add more body-level links on:
  - `/pos-for-mobile-shops`
  - `/pos-system-sri-lanka`
  - `/banking-credit-cheques`
  - `/staff-commissions-payroll`
  - `/settings-security-integrations`
  - `/integrations`
- Retarget `/customers-suppliers-management`
- Monitor SERP display for `/pricing`

---

## Long-Term Improvements

- Reduce shared JS further for better LCP
- Deepen or consolidate `/pos-for-mobile-shops`
- Expand the blog to support the main commercial cluster
- Further differentiate repeated landing-page patterns and wording
- Review retired 404 URLs using Search Console and backlink tools

---

## Priority Action Plan

1. Fix sitemap coverage for `/blog/customer-loyalty-programs-phone-shops`
2. Finalize the keyword map for:
   - `/`
   - `/mobile-shop-pos-system`
   - `/pos-system-for-phone-shop`
   - `/pos-for-mobile-shops`
   - `/pos-system-sri-lanka`
3. Add stronger contextual internal links from blog and support pages into the hub and conversion page
4. Improve targeting on `/customers-suppliers-management`
5. Reduce shared JS and re-test Lighthouse
6. Expand supporting blog content around pricing, repairs, IMEI, and Sri Lanka market intent
7. Review removed URLs for potential redirect opportunities

---

## Developer / SEO Checklist

### High Priority

- [ ] Add missing blog post to sitemap
- [ ] Finalize keyword mapping for all commercial cluster pages
- [ ] Improve contextual internal links on weak pages
- [ ] Reduce shared JS and improve LCP

### Medium Priority

- [ ] Retarget `/customers-suppliers-management`
- [ ] Strengthen `/pos-for-mobile-shops` or plan consolidation
- [ ] Add more product links from blog content

### Low Priority

- [ ] Reassess title expansion opportunities on shorter pages
- [ ] Consider optional FAQ schema on additional long-tail pages

