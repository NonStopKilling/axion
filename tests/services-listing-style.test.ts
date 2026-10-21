import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('services listing presentation', () => {
  it('defines the editorial layout used by the services hub', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.listing{');
    expect(css).toContain('.listing-grid{');
  });

  it('uses the available footer width with a balanced CTA composition', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.footer-cta{display:grid');
  });

  it('gives the prefooter a deferred visual treatment with external caption', () => {
    const footer = readFileSync('src/components/SiteFooter.astro', 'utf8');
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(footer).toContain('footer-media" data-deferred-video');
    expect(footer).toContain('IA que se pone a trabajar');
    expect(css).toContain('.site-footer .footer-video-shell');
    expect(css).toContain('.footer-cta-copy{');
  });

  it('keeps the prefooter CTA wide enough to avoid a cramped headline', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.site-footer .footer-cta{max-width:1180px');
    expect(css).toContain('.site-footer .footer-cta-copy h2{max-width:15ch');
  });

  it('loads Montserrat for display titles and DM Sans for interface copy', () => {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
    expect(layout).toContain('family=Montserrat');
    expect(layout).toContain('family=DM+Sans');
  });

  it('gives service GIFs a visible framed treatment on every card tone', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.listing-card-top img{');
    expect(css).toContain('background:#fff');
    expect(css).toContain('mix-blend-mode:normal!important');
  });

  it('keeps homepage service GIFs compact and outside the title flow', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('position:static!important');
    expect(css).toContain('width:64px!important');
  });

  it('gives industry buttons an animated technological hover state', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.industry a::before{');
    expect(css).toContain('.industry a:hover::before');
    expect(css).toContain('.industry a:hover span');
  });

  it('extends the signal motion to shared CTA buttons without changing their base color', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.button::before{');
    expect(css).toContain('.button:hover::before');
    expect(css).toContain('.button:hover span');
  });

  it('adds breathing room before the FAQ consultation CTA', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.faq>div:first-child .button{margin-top:2rem}');
  });

  it('does not draw a connector line through the process milestones', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.process::after{display:none}');
  });

  it('defines a shared visual shell for interior pages', () => {
    const css = readFileSync('src/styles/global.css', 'utf8');
    expect(css).toContain('.simple-page,.service-hero{');
  });

  it('uses the Chile map as a tall, light-surface desktop composition', () => {
    const services = readFileSync('src/pages/servicios/index.astro', 'utf8');

    expect(services).toContain('class="services-map"');
    expect(services).toContain('.services-map{display:grid;grid-template-columns:minmax(0,.8fr) minmax(360px,1.2fr)');
    expect(services).toContain('background:#fff');
    expect(services).toContain('.services-map img{width:100%;height:min(760px,65vw)');
  });

  it('offers a concise corporate navigation group in the footer', () => {
    const footer = readFileSync('src/components/SiteFooter.astro', 'utf8');

    expect(footer).toContain('<strong>Explorar</strong>');
    expect(footer).toContain('href="/servicios/"');
    expect(footer).toContain('href="/casos/"');
    expect(footer).toContain('href="/recursos/calculadora-roi/"');
    expect(footer).toContain('href="/nosotros/"');
  });
});
