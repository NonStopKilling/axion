import { describe, expect, it } from 'vitest';
import { services, siteContact } from '../src/data/site';

describe('site data', () => {
  it('contains seven sellable services and the supplied email', () => {
    expect(services).toHaveLength(7);
    expect(siteContact.email).toBe('chat@axion.cl');
  });
});
