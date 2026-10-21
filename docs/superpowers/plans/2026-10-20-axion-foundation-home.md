# Axion Foundation and Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the standalone Axion landing with a fast, accessible Astro home and reusable conversion-site foundation.

**Architecture:** Astro renders all sales and SEO content statically. Typed content modules drive navigation, services, metadata and WhatsApp actions; interactive islands are limited to the accessible navigation, ROI calculator and progressive hero conversation. Shared layouts and components own semantic DOM, design tokens and structured data.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, Vitest, Playwright, GSAP/ScrollTrigger loaded only by the editorial before/after scene.

**Spec:** `docs/superpowers/specs/2026-10-20-axion-site-design.md`

## Global Constraints

- Use `logotipo-axion-agentic.png` as the official brand asset.
- Use `+56999464840` for WhatsApp and `chat@axion.cl` for email.
- Copy is Spanish for Chile, specific and outcome-led; no false claims or invented social links, prices, cases, testimonials, RUT or metrics.
- Meet AA contrast, 44 px targets, keyboard navigation, visible focus and `prefers-reduced-motion` support.
- Keep primary content as static HTML; defer nonessential JavaScript and 3D assets.
- Maintain a single `h1`, semantic landmarks and no horizontal overflow at 360 px.
- Record validation as local evidence only; do not present it as production performance proof.

---

### Task 1: Establish the Astro workspace and repository contract

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/env.d.ts`
- Create: `src/styles/global.css`, `public/favicon.svg`, `public/og-default.svg`
- Modify: `.gitignore`, `README.md`
- Test: `tests/repository-contract.test.ts`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, `npm run check`, `npm run test`, `npm run test:e2e`.
- Produces: CSS variables `--axion-violet`, `--axion-orange`, `--axion-cream`, `--axion-ink` and utilities used by all components.

- [ ] **Step 1: Write the failing repository contract test**

```ts
expect(readFileSync('package.json', 'utf8')).toContain('"build": "astro build"');
expect(readFileSync('.gitignore', 'utf8')).toContain('.env*');
expect(readFileSync('README.md', 'utf8')).toContain('npm install');
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm run test -- tests/repository-contract.test.ts`  
Expected: FAIL because the Astro scripts and documentation do not yet exist.

- [ ] **Step 3: Add the minimal Astro and Tailwind configuration**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "check": "astro check",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Define the color tokens and base semantic styles in `src/styles/global.css`. Replace the Laravel-specific ignore file with Node/Astro ignores while retaining `.env*`, build output and local reports. Document installation, commands, file architecture, content rules, accessibility/DOM rules and deploy assumptions in the README.

- [ ] **Step 4: Run static checks**

Run: `npm install; npm run test -- tests/repository-contract.test.ts; npm run check`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json tailwind.config.mjs src .gitignore README.md tests/repository-contract.test.ts
git commit -m "chore: establish Axion Astro foundation"
```

### Task 2: Model typed marketing content and SEO primitives

**Files:**
- Create: `src/data/site.ts`, `src/lib/whatsapp.ts`, `src/lib/seo.ts`
- Create: `src/components/SeoMeta.astro`, `src/components/JsonLd.astro`, `src/layouts/BaseLayout.astro`
- Test: `tests/site-data.test.ts`, `tests/whatsapp.test.ts`

**Interfaces:**
- Produces: `services`, `primaryNavigation`, `footerGroups`, `siteContact` from `src/data/site.ts`.
- Produces: `buildWhatsAppUrl(message: string): string` from `src/lib/whatsapp.ts`.
- Consumes: Task 1 tokens and global styles.

- [ ] **Step 1: Write failing data and URL tests**

```ts
expect(services).toHaveLength(7);
expect(buildWhatsAppUrl('Quiero una demo')).toBe('https://wa.me/56999464840?text=Quiero%20una%20demo');
expect(siteContact.email).toBe('chat@axion.cl');
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm run test -- tests/site-data.test.ts tests/whatsapp.test.ts`  
Expected: FAIL because content modules do not exist.

- [ ] **Step 3: Implement typed data and static metadata**

Define service slugs, labels, short benefit copy, descriptions and contextual WhatsApp messages in `site.ts`. `BaseLayout` accepts `title`, `description`, `canonicalPath`, optional JSON-LD and renders `lang="es-CL"`, canonical, Open Graph and a skip link. `JsonLd` serializes only supplied verified objects.

- [ ] **Step 4: Run tests and Astro type checks**

Run: `npm run test -- tests/site-data.test.ts tests/whatsapp.test.ts; npm run check`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data src/lib src/components/SeoMeta.astro src/components/JsonLd.astro src/layouts/BaseLayout.astro tests/site-data.test.ts tests/whatsapp.test.ts
git commit -m "feat: add typed Axion content and SEO primitives"
```

### Task 3: Build accessible shared header, footer and conversion CTA

**Files:**
- Create: `src/components/SiteHeader.astro`, `src/components/MobileMenu.ts`, `src/components/SiteFooter.astro`, `src/components/WhatsAppCta.astro`
- Modify: `src/styles/global.css`
- Test: `tests/header.spec.ts`, `tests/footer.spec.ts`

**Interfaces:**
- Consumes: `primaryNavigation`, `footerGroups`, `siteContact`, `buildWhatsAppUrl`.
- Produces: header landmark, `<dialog>` mobile menu, footer contact links and `WhatsAppCta` with `message` prop.

- [ ] **Step 1: Write failing component tests**

```ts
await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible();
await expect(page.getByRole('link', { name: /hablar por whatsapp/i })).toHaveAttribute('href', /56999464840/);
await expect(page.getByRole('contentinfo').getByText('chat@axion.cl')).toBeVisible();
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm run test:e2e -- tests/header.spec.ts tests/footer.spec.ts`  
Expected: FAIL because the shared components are absent.

- [ ] **Step 3: Implement semantic navigation**

Render the official image logo with descriptive alt text. Build desktop service/solution disclosures and a `dialog` menu opened by a real button. Trap focus while open, close with Escape, restore focus to trigger and preserve reduced-motion. Header scroll behavior must only add/remove CSS classes and never hide keyboard focus. Footer includes no empty social section; include contact and `[COMPLETAR]` only where business data cannot be verified.

- [ ] **Step 4: Run interaction tests**

Run: `npm run test:e2e -- tests/header.spec.ts tests/footer.spec.ts`  
Expected: PASS on desktop and 360 px viewport.

- [ ] **Step 5: Commit**

```bash
git add src/components/SiteHeader.astro src/components/MobileMenu.ts src/components/SiteFooter.astro src/components/WhatsAppCta.astro src/styles/global.css tests/header.spec.ts tests/footer.spec.ts
git commit -m "feat: add accessible Axion navigation and footer"
```

### Task 4: Implement the static home conversion narrative

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/home/HeroConversation.astro`, `src/components/home/ServiceBento.astro`, `src/components/home/ProcessSteps.astro`, `src/components/home/IndustryLinks.astro`, `src/components/home/FaqSection.astro`, `src/components/home/FinalCta.astro`
- Test: `tests/home.spec.ts`

**Interfaces:**
- Consumes: Task 2 content and Task 3 components.
- Produces: one semantic landing page with a single `h1` and all initial conversion links.

- [ ] **Step 1: Write the failing home test**

```ts
await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
await expect(page.getByRole('heading', { name: /todo lo que axion puede hacer/i })).toBeVisible();
await expect(page.getByRole('link', { name: /ver una demo/i }).first()).toHaveAttribute('href', /56999464840/);
```

- [ ] **Step 2: Run test and verify failure**

Run: `npm run test:e2e -- tests/home.spec.ts`  
Expected: FAIL because the Astro home is absent.

- [ ] **Step 3: Implement static sections**

Create an outcome-led hero with a progressive conversation illustration, two CTAs and non-deceptive event chips. Add service bento links, process steps, industry links, FAQ with matching FAQPage JSON-LD, and final CTA. Retain current useful visual energy but replace all placeholder WhatsApp URLs with the supplied number and use routes rather than fragment-only navigation for service cards.

- [ ] **Step 4: Run home tests and build**

Run: `npm run test:e2e -- tests/home.spec.ts; npm run build`  
Expected: PASS and generated `/index.html`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/components/home tests/home.spec.ts
git commit -m "feat: build Axion conversion home"
```

### Task 5: Add ROI and before/after interactions with progressive enhancement

**Files:**
- Create: `src/components/home/RoiCalculator.astro`, `src/components/home/BeforeAfterScene.astro`, `src/components/home/roi-calculator.ts`, `src/components/home/before-after-scene.ts`
- Modify: `src/pages/index.astro`
- Test: `tests/roi-calculator.test.ts`, `tests/home-interactions.spec.ts`

**Interfaces:**
- Produces: `calculateRoi({ hours, hourlyCost, lostMessages }): RoiEstimate` and a static fallback summary.
- Consumes: `buildWhatsAppUrl` for a contextual result message.

- [ ] **Step 1: Write failing calculation and browser tests**

```ts
expect(calculateRoi({ hours: 40, hourlyCost: 8000, lostMessages: 20 }).monthlySavings).toBeGreaterThan(0);
await page.getByLabel('Horas de atención al mes').fill('40');
await expect(page.getByText(/ahorro mensual estimado/i)).toBeVisible();
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm run test -- tests/roi-calculator.test.ts; npm run test:e2e -- tests/home-interactions.spec.ts`  
Expected: FAIL because calculator and scene modules do not exist.

- [ ] **Step 3: Implement bounded interaction**

Use labelled numeric inputs with validation and an explanatory estimate disclaimer. Build the scene with static readable before/after content first; load GSAP/ScrollTrigger only if motion is permitted, and do not pin on small screens. Expose the result to screen readers through a live region only after a user input.

- [ ] **Step 4: Run tests and reduced-motion browser check**

Run: `npm run test -- tests/roi-calculator.test.ts; npm run test:e2e -- tests/home-interactions.spec.ts`  
Expected: PASS, including reduced-motion test.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/RoiCalculator.astro src/components/home/BeforeAfterScene.astro src/components/home/roi-calculator.ts src/components/home/before-after-scene.ts src/pages/index.astro tests/roi-calculator.test.ts tests/home-interactions.spec.ts
git commit -m "feat: add Axion ROI and before-after interactions"
```

### Task 6: Publish routing and crawlability foundations

**Files:**
- Create: `src/pages/servicios/index.astro`, `src/pages/servicios/[slug].astro`, `src/pages/contacto.astro`, `src/pages/legal/privacidad.astro`, `src/pages/legal/terminos.astro`, `src/pages/robots.txt.ts`, `src/pages/sitemap-index.xml.ts`, `public/llms.txt`
- Test: `tests/routes.spec.ts`, `tests/seo-output.test.ts`

**Interfaces:**
- Consumes: services data and `BaseLayout` metadata contract.
- Produces: accessible working routes for every link exposed in Tasks 3–4 and canonical crawl directives.

- [ ] **Step 1: Write failing route and SEO tests**

```ts
await expect(page.goto('/servicios/asistentes-whatsapp-ia')).resolves.not.toThrow();
expect(await fetchLocal('/robots.txt')).toContain('Sitemap:');
expect(await fetchLocal('/llms.txt')).toContain('Axion');
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm run test:e2e -- tests/routes.spec.ts; npm run test -- tests/seo-output.test.ts`  
Expected: FAIL because route files are absent.

- [ ] **Step 3: Implement route-safe templates**

Build the service hub and seven service routes from typed data, each with a unique H1, title, description, service JSON-LD, contextual CTA and visible `[COMPLETAR]` only for unavailable commercial figures. Build contact and legal pages with consent copy that does not make unsupported privacy claims. Generate robots/sitemap and `llms.txt` with real published routes.

- [ ] **Step 4: Run route validation**

Run: `npm run test:e2e -- tests/routes.spec.ts; npm run test -- tests/seo-output.test.ts; npm run build`  
Expected: PASS and no broken navigation.

- [ ] **Step 5: Commit**

```bash
git add src/pages public/llms.txt tests/routes.spec.ts tests/seo-output.test.ts
git commit -m "feat: add Axion services and SEO routes"
```

### Task 7: Verify quality and record operational handoff

**Files:**
- Modify: `README.md`, `docs/superpowers/specs/2026-10-20-axion-site-design.md`
- Create: `docs/verification/2026-10-20-foundation.md`

**Interfaces:**
- Consumes: complete site from Tasks 1–6.
- Produces: reproducible local validation evidence and a clear boundary between verified local state and unverified deployment state.

- [ ] **Step 1: Write failing document assertions**

```ts
expect(readFileSync('docs/verification/2026-10-20-foundation.md', 'utf8')).toContain('Local verification');
expect(readFileSync('README.md', 'utf8')).toContain('Cloudflare Pages');
```

- [ ] **Step 2: Run assertion and verify failure**

Run: `npm run test -- tests/repository-contract.test.ts`  
Expected: FAIL until the verification record exists.

- [ ] **Step 3: Run and capture checks**

Run `npm run check`, `npm run test`, `npm run test:e2e`, `npm run build`, `git diff --check`, then perform a 360 px and desktop visual review. Record commands, outcome, browser viewport, limitations and deploy steps. Update README with Cloudflare Pages/Vercel configuration but do not claim a live deploy.

- [ ] **Step 4: Run final validation**

Run: `npm run check; npm run test; npm run test:e2e; npm run build; git diff --check`  
Expected: PASS; documentation differentiates local evidence from production evidence.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/verification/2026-10-20-foundation.md docs/superpowers/specs/2026-10-20-axion-site-design.md tests/repository-contract.test.ts
git commit -m "docs: record Axion foundation verification"
```

## Plan self-review

- Spec coverage: Tasks 1–7 cover the approved first phase. Real Cloud API, CRM, scheduling, remote audit, social profiles, cases and programmatic local content remain intentionally out of scope.
- Placeholder scan: no implementation instructions rely on unknown content; `[COMPLETAR]` is explicitly constrained to unverified business data.
- Interface consistency: `siteContact`, `services`, `buildWhatsAppUrl`, `BaseLayout` and `calculateRoi` are introduced before their consumers.
