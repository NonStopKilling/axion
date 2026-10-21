import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from '../src/lib/whatsapp';

describe('buildWhatsAppUrl', () => {
  it('uses Axion’s supplied number and encodes the message', () => {
    expect(buildWhatsAppUrl('Quiero una demo')).toBe('https://wa.me/56999464840?text=Quiero%20una%20demo');
  });
});
