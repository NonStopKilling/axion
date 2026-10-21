import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('contextual internal links', () => {
  it('defines a shared contextual-link pattern with a hover indicator', () => {
    const component = readFileSync('src/components/ContextLink.astro', 'utf8');
    const css = readFileSync('src/styles/global.css', 'utf8');

    expect(component).toContain('context-link');
    expect(css).toContain('.context-link::after');
    expect(css).toContain('.context-link:hover::after');
  });

  it('connects the main editorial destinations without generic button links', () => {
    const cases = readFileSync('src/pages/casos.astro', 'utf8');
    const prices = readFileSync('src/pages/precios.astro', 'utf8');
    const roi = readFileSync('src/pages/recursos/calculadora-roi.astro', 'utf8');
    const home = readFileSync('src/pages/index.astro', 'utf8');

    expect(cases).toContain('/recursos/calculadora-roi/');
    expect(prices).toContain('/servicios/');
    expect(roi).toContain('/precios/');
    expect(home).toContain('/casos/');
  });
});
