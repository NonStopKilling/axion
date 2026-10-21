import { siteContact } from '../data/site';
export const buildWhatsAppUrl = (message: string) => `https://wa.me/${siteContact.phone}?text=${encodeURIComponent(message)}`;
