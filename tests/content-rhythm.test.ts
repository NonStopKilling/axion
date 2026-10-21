import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('editorial content rhythm', () => {
  it('separates service copy, contextual links and notices', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');

    expect(css).toContain('.section .service-copy{margin:1.5rem 0 0}');
    expect(css).toContain('.section .service-copy+.context-link{margin-top:1.5rem}');
    expect(css).toContain('.section .notice{margin-top:2rem}');
  });
});
