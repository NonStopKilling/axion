import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('deferred footer video', () => {
  it('keeps the video source unloaded until the footer remains visible', () => {
    const footer = readFileSync('src/components/SiteFooter.astro', 'utf8');

    expect(footer).toContain('data-deferred-video');
    expect(footer).toContain('data-src="/video/axion.webm"');
    expect(footer).toContain('data-src="/video/axion.mp4"');
    expect(footer).toContain('IntersectionObserver');
    expect(footer).toContain('setTimeout');
    expect(footer).toContain('2000');
  });
});
