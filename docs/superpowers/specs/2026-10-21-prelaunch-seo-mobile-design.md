# Prelaunch SEO and Mobile Footer Design

## Goal

Prepare Axion for public launch with a complete technical SEO baseline and a composed mobile experience for the process section, prefooter and footer.

## Scope

### Mobile composition

- The `process` sequence remains one card per row below 800px. Each card keeps its heading and supporting copy in the upper-left with deliberate breathing room; its decorative ordinal stays anchored to the lower/right visual field so it never constrains the text.
- The prefooter becomes a single-column composition on mobile: copy, CTA and brand mark are independent blocks with generous vertical gaps. The heading uses the available line width instead of a narrow desktop column.
- The footer grid remains stacked on mobile, with a clear separator and independently spaced identity, contact and legal groups.

### SEO foundation

- `BaseLayout` is the single metadata boundary. It receives page title, description, canonical path and optional robots directive, then renders canonical, primary social metadata, X card metadata, language/locale and a default social image.
- The layout emits JSON-LD for `Organization` and `WebSite`, using Axion's public identity, Chilean market, phone and email. No ratings, fabricated reviews or unsupported claims are included.
- Static endpoints provide `/robots.txt` and `/sitemap-index.xml`; the sitemap lists every public, indexable route in the repository. The 404 route sets `noindex, nofollow`.
- A web app manifest and theme color metadata are added. Existing SVG assets are reused for icons/social sharing to avoid new generated imagery.
- The two legal links in the footer resolve to concise privacy and terms pages so crawlers and visitors do not reach the 404 page.

### Performance and accessibility

- Keep the current font loading contract while adding `font-display=swap` through the Google Fonts URL already in use.
- Declare fixed dimensions or an aspect ratio for footer/logo and content images where markup renders them. Decorative images remain hidden from assistive technology.
- Do not add third-party analytics, tracking pixels or new runtime dependencies. Use semantic landmarks, valid heading hierarchy and accessible button/link labels.
- Keep motion optional with the existing reduced-motion rules; visual mobile changes must use CSS only.

## Route inventory

Indexable: `/`, `/servicios/`, the seven service detail paths, `/precios/`, `/casos/`, `/nosotros/`, `/recursos/calculadora-roi/`, `/legal/privacidad/`, `/legal/terminos/`.

Not indexable: `/404.html`.

## Validation

- Add source-level tests for robots/sitemap/schema/404 metadata and mobile CSS contracts.
- Run `npm run test`, `npm run check`, `npm run build`, and `git diff --check`.
- Build output must contain the two static metadata endpoints and both legal routes.

