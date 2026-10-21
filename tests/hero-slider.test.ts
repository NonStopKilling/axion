import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('home hero slider', () => {
  it('offers two navigable hero scenes including the supplied visual asset', () => {
    const page = readFileSync('src/pages/index.astro', 'utf8');
    const slider = readFileSync('src/components/HeroSlider.astro', 'utf8');
    expect(page).toContain('<HeroSlider />');
    expect(slider).toContain('data-hero-slider');
    expect(slider).toContain('data-hero-slide');
    expect(slider).toContain('benzoboxc4146');
    expect(slider).toContain('data-hero-dot');
    expect(slider).toContain('const slideOrder = [1, 0]');
  });

  it('provides reduced-motion-friendly slider styling', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.hero-slider');
    expect(css).toContain('.hero-slide.is-active');
  });
});
