import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('services listing presentation', () => {
  it('defines the editorial layout used by the services hub', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.listing{');
    expect(css).toContain('.listing-grid{');
  });

  it('uses the available footer width with a balanced CTA composition', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.footer-cta{display:grid');
  });

  it('loads Montserrat for display titles and DM Sans for interface copy', () => {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
    expect(layout).toContain('family=Montserrat');
    expect(layout).toContain('family=DM+Sans');
  });

  it('gives service GIFs a visible framed treatment on every card tone', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.listing-card-top img{');
    expect(css).toContain('background:#fff');
    expect(css).toContain('mix-blend-mode:normal!important');
  });

  it('defines a shared visual shell for interior pages', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.simple-page,.service-hero{');
  });
});
