import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('repository contract', () => {
  it('documents a runnable Astro project and ignores local secrets', () => {
    expect(readFileSync('package.json', 'utf8')).toContain('"build": "astro build"');
    expect(readFileSync('.gitignore', 'utf8')).toContain('.env*');
    expect(readFileSync('README.md', 'utf8')).toContain('npm install');
  });
});
