import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('about portrait motion', () => {
  it('uses animated circular brand shapes behind the portrait', () => {
    const page = readFileSync('src/pages/nosotros.astro', 'utf8');
    const css = readFileSync('src/styles/global.css', 'utf8');

    expect(page).toContain('about-orbit about-orbit--one');
    expect(page).toContain('about-orbit about-orbit--two');
    expect(css).toContain('@keyframes about-orbit');
    expect(css).toContain('animation:about-orbit');
    expect(css).toContain('border-radius:50%');
  });
});
