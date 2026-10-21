import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('brand delivery assets', () => {
  it('uses the supplied favicon, manifest and social image set', () => {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');

    expect(layout).toContain('/favicon.ico');
    expect(layout).toContain('/apple-touch-icon.png');
    expect(layout).toContain('/site.webmanifest');
    expect(layout).toContain('/og.jpg');
  });

  it('places the supplied map in services and the isotipo in an interior page', () => {
    const services = readFileSync('src/pages/servicios/index.astro', 'utf8');
    const pricing = readFileSync('src/pages/precios.astro', 'utf8');

    expect(services).toContain('/img/mapa.png');
    expect(pricing).toContain('/img/isotipo.png');
  });
});
