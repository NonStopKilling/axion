import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('not found page', () => {
  it('keeps visitors inside the Axion conversion path', () => {
    const page = readFileSync('src/pages/404.astro', 'utf8');
    expect(page).toContain('<SiteHeader />');
    expect(page).toContain('<SiteFooter />');
    expect(page).toContain('Volver al inicio');
  });
});
