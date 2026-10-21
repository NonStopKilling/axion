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

  it('loads the chosen display and interface fonts', () => {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
    expect(layout).toContain('family=Manrope');
    expect(layout).toContain('family=DM+Sans');
  });

  it('blends service GIFs into their card backgrounds', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.service-card .service-icon{');
    expect(css).toContain('mix-blend-mode:multiply');
  });
});
