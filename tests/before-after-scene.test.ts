import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('before and after scene', () => {
  it('renders operational evidence instead of empty comparison cards', () => {
    const page = readFileSync('src/pages/index.astro', 'utf8');
    expect(page).toContain('class="operation-scene"');
    expect(page).toContain('12 consultas sin responder');
    expect(page).toContain('4 horas agendadas');
  });

  it('treats process numbers as oversized visual milestones', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.process li b{font:800 clamp(7rem');
  });
});
