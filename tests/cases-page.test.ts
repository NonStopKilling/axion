import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('cases landing', () => {
  it('labels simulations honestly and includes dogfooding, sandboxes and beta CTA', () => {
    const page = readFileSync('src/pages/casos.astro', 'utf8');

    expect(page).toContain('Simulaciones de arquitectura');
    expect(page).toContain('Acreditación minera');
    expect(page).toContain('Conciliación bancaria y facturación SII');
    expect(page).toContain('Cómo automatizamos nuestro propio onboarding');
    expect(page).toContain('Extractor de datos de documentos');
    expect(page).toContain('2 empresas en Chile');
    expect(page).toContain('50% de descuento en el setup');
  });
});
