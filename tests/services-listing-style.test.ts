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
});
