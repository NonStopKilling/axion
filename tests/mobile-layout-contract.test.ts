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

  it('uses full-width prefooter columns and centers footer groups on mobile', () => {
    const footer = readFileSync('src/components/SiteFooter.astro', 'utf8');

    expect(footer).toContain('.site-footer .footer-cta{grid-template-columns:1fr!important');
    expect(footer).toContain('.site-footer .footer-media{width:100%;justify-items:center');
    expect(footer).toContain('.footer-grid{grid-template-columns:1fr;text-align:center;justify-items:center}');
  });

  it('provides an accessible full-screen mobile navigation and floating WhatsApp CTA', () => {
    const header = readFileSync('src/components/SiteHeader.astro', 'utf8');

    expect(header).toContain('class="mobile-menu-toggle"');
    expect(header).toContain('aria-controls="mobile-navigation"');
    expect(header).toContain('id="mobile-navigation"');
    expect(header).toContain('class="mobile-whatsapp"');
    expect(header).toContain('.mobile-navigation.is-open');
  });
});
