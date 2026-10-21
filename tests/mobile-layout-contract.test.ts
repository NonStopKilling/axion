import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('mobile footer and process composition', () => {
  it('keeps process copy vertical and the ordinal decorative on small screens', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');

    expect(css).toContain('.process li b{top:auto;bottom:.7rem;right:1rem}');
    expect(css).toContain('.process li h3,.process li p{max-width:25ch}');
  });

  it('stacks the prefooter and footer with deliberate mobile spacing', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');

    expect(css).toContain('.site-footer .footer-cta{gap:3.25rem;padding-bottom:4.5rem}');
    expect(css).toContain('.site-footer .footer-grid{gap:2.5rem;margin-top:0;padding-top:2.5rem;padding-bottom:2.8rem}');
  });
});
