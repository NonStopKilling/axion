import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('about page', () => {
  it('presents Rodrigo as Axion visible lead and links his professional network', () => {
    const page = readFileSync('src/pages/nosotros.astro', 'utf8');

    expect(page).toContain('/img/yo.png');
    expect(page).toContain('Rodrigo Daniel Salgado Escanilla');
    expect(page).toContain('https://www.linkedin.com/in/rodrigo-salgado-91146149/');
    expect(page).toContain('www.area3.cl');
    expect(page).toContain('www.vfx.cl');
    expect(page).toContain('www.uxui.cl');
  });
});
