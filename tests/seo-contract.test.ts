import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('technical SEO delivery', () => {
  it('defines crawl assets for the public route inventory', () => {
    expect(existsSync('src/pages/robots.txt.ts')).toBe(true);
    expect(existsSync('src/pages/sitemap.xml.ts')).toBe(true);

    const robots = readFileSync('src/pages/robots.txt.ts', 'utf8');
    const sitemap = readFileSync('src/pages/sitemap.xml.ts', 'utf8');
    expect(robots).toContain('Sitemap: https://axion.cl/sitemap.xml');
    expect(sitemap).toContain('/servicios/asistentes-whatsapp-ia/');
    expect(sitemap).toContain('/recursos/calculadora-roi/');
    expect(sitemap).toContain('/legal/privacidad/');
  });

  it('keeps a complete shared metadata and schema baseline', () => {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
    const notFound = readFileSync('src/pages/404.astro', 'utf8');
    expect(layout).toContain('name="robots"');
    expect(layout).toContain('og:locale');
    expect(layout).toContain('application/ld+json');
    expect(layout).toContain('Organization');
    expect(layout).toContain('WebSite');
    expect(notFound).toContain('robots="noindex, nofollow"');
  });

  it('ships the linked legal pages and modern image sources', () => {
    expect(existsSync('src/pages/legal/privacidad.astro')).toBe(true);
    expect(existsSync('src/pages/legal/terminos.astro')).toBe(true);
    const services = readFileSync('src/pages/servicios/index.astro', 'utf8');
    expect(services).toContain('type="image/webp"');
    expect(services).toContain('/img/mapa.webp');
  });
});
