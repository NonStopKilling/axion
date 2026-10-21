import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('pricing landing', () => {
  it('contains the Chilean SEO proposition, complexity selector and transactional FAQs', () => {
    const page = readFileSync('src/pages/precios.astro', 'utf8');

    expect(page).toContain('Cotización y Precios de Automatización Tecnológica en Chile');
    expect(page).toContain('Nivel 1: Automatización Simple');
    expect(page).toContain('Nivel 2: Integración de Sistemas Heterogéneos');
    expect(page).toContain('Nivel 3: Arquitectura y Software Operativo Completo');
    expect(page).toContain('¿Cómo entregan un presupuesto en AXION?');
    expect(page).toContain('FAQPage');
  });

  it('accepts page-specific structured data in the shared layout', () => {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');

    expect(layout).toContain('structuredData');
    expect(layout).toContain('application/ld+json');
  });
});
