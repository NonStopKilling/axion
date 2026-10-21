# Prelaunch SEO and Mobile Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the mobile process/footer composition intentional and ship a complete, verifiable SEO baseline for Axion.

**Architecture:** `BaseLayout.astro` remains the shared document-head boundary and emits page metadata plus safe organization/site structured data. Static Astro endpoints serve crawler assets, while legal pages resolve footer destinations. CSS-only mobile overrides correct the visual hierarchy without changing current desktop markup.

**Tech Stack:** Astro 5, TypeScript, Vitest, CSS.

**Spec:** `docs/superpowers/specs/2026-10-21-prelaunch-seo-mobile-design.md`

## Global Constraints

- Use only Axion's existing logo, public identity, phone `+56 9 9946 4840`, and email `chat@axion.cl`.
- Do not add analytics, third-party packages, fabricated claims, ratings, reviews, or social accounts.
- Index only the routes named in the spec; return `noindex, nofollow` for `/404.html`.
- Preserve desktop composition; apply mobile layout changes at `max-width: 800px`.
- Do not stage or modify the untracked root `index.html`.

---

### Task 1: Establish metadata and schema contracts

**Files:**
- Create: `tests/seo-contract.test.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: `BaseLayout` props `title`, `description`, `canonicalPath`.
- Produces: optional `robots` prop and head markup for canonical, Open Graph, X cards, manifest, locale and JSON-LD.

- [ ] **Step 1: Write the failing test**

```ts
expect(layout).toContain('application/ld+json');
expect(layout).toContain('twitter:card');
expect(layout).toContain('og:image');
expect(notFound).toContain('robots="noindex, nofollow"');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/seo-contract.test.ts`
Expected: FAIL because the layout does not emit the new metadata contract.

- [ ] **Step 3: Write minimal implementation**

```astro
interface Props { title: string; description: string; canonicalPath?: string; robots?: string; }
const { robots = 'index, follow' } = Astro.props;
<meta name="robots" content={robots} />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/seo-contract.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/404.astro tests/seo-contract.test.ts
git commit -m "feat: add shared SEO metadata and schema"
```

### Task 2: Add crawl assets and destination pages

**Files:**
- Create: `src/pages/robots.txt.ts`
- Create: `src/pages/sitemap-index.xml.ts`
- Create: `src/pages/legal/privacidad.astro`
- Create: `src/pages/legal/terminos.astro`
- Create: `public/site.webmanifest`
- Modify: `tests/seo-contract.test.ts`

**Interfaces:**
- Consumes: Axion public URL `https://axion.cl` and route inventory from the spec.
- Produces: crawler endpoints, manifest, and valid legal links.

- [ ] **Step 1: Extend the failing test**

```ts
expect(robots).toContain('Sitemap: https://axion.cl/sitemap-index.xml');
expect(sitemap).toContain('/recursos/calculadora-roi/');
expect(sitemap).toContain('/legal/privacidad/');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/seo-contract.test.ts`
Expected: FAIL because endpoints and legal routes do not exist.

- [ ] **Step 3: Write minimal implementation**

```ts
export function GET() {
  return new Response('User-agent: *\\nAllow: /\\nSitemap: https://axion.cl/sitemap-index.xml\\n');
}
```

```astro
<BaseLayout title="Política de privacidad | Axion" description="Conoce cómo Axion trata los datos compartidos en sus canales de contacto." canonicalPath="/legal/privacidad/">
  <SiteHeader /><main id="contenido" class="legal-page"><h1>Política de privacidad</h1><p>Usamos tus datos solo para responder tu consulta y coordinar una propuesta.</p></main><SiteFooter />
</BaseLayout>
```

- [ ] **Step 4: Run test and build**

Run: `npm run test -- tests/seo-contract.test.ts && npm run build`
Expected: PASS and generated crawler/legal files.

- [ ] **Step 5: Commit**

```bash
git add src/pages/robots.txt.ts src/pages/sitemap-index.xml.ts src/pages/legal public/site.webmanifest tests/seo-contract.test.ts
git commit -m "feat: add crawl assets and legal routes"
```

### Task 3: Correct the mobile process and footer rhythm

**Files:**
- Create: `tests/mobile-layout-contract.test.ts`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `.process`, `.process li`, `.footer-cta`, `.footer-grid`, `.footer-mark` selectors.
- Produces: mobile-only rules that preserve desktop styles and create stacked, breathable blocks.

- [ ] **Step 1: Write the failing test**

```ts
expect(css).toMatch(/@media\(max-width:800px\)[\s\S]*\.process li/);
expect(css).toContain('.site-footer .footer-cta-copy h2{max-width:');
expect(css).toContain('.site-footer .footer-grid');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/mobile-layout-contract.test.ts`
Expected: FAIL because the dedicated mobile composition overrides do not exist.

- [ ] **Step 3: Write minimal implementation**

```css
@media (max-width:800px) {
  .process li { min-height: 230px; padding: 2rem 1.6rem; }
  .process li b { right: 1rem; bottom: .7rem; top: auto; }
  .site-footer .footer-cta { grid-template-columns: 1fr; gap: 3.25rem; }
  .site-footer .footer-grid { gap: 2.4rem; }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/mobile-layout-contract.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css tests/mobile-layout-contract.test.ts
git commit -m "fix: refine mobile process and footer spacing"
```

### Task 4: Verify the public build

**Files:**
- Verify: `dist/robots.txt`, `dist/sitemap-index.xml`, `dist/legal/privacidad/index.html`, `dist/legal/terminos/index.html`

**Interfaces:**
- Consumes: all prior tasks.
- Produces: evidence that static output contains SEO delivery artifacts.

- [ ] **Step 1: Run full verification**

Run: `npm run test && npm run check && npm run build && git diff --check`
Expected: all suites pass, Astro reports zero diagnostics, and build succeeds.

- [ ] **Step 2: Assert generated outputs**

Run: `Test-Path dist/robots.txt; Test-Path dist/sitemap-index.xml; Test-Path dist/legal/privacidad/index.html; Test-Path dist/legal/terminos/index.html`
Expected: four `True` values.

- [ ] **Step 3: Commit documentation**

```bash
git add docs/superpowers/specs/2026-10-21-prelaunch-seo-mobile-design.md docs/superpowers/plans/2026-10-21-prelaunch-seo-mobile.md
git commit -m "docs: record prelaunch SEO and mobile plan"
```
