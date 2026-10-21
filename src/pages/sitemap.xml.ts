export const prerender = true;

const routes = [
  '/', '/servicios/', '/servicios/asistentes-whatsapp-ia/', '/servicios/automatizacion-procesos/',
  '/servicios/desarrollo-web/', '/servicios/seo-local/', '/servicios/ecommerce/',
  '/servicios/sistemas-a-medida/', '/servicios/mantencion-web/', '/precios/', '/casos/',
  '/nosotros/', '/recursos/calculadora-roi/', '/legal/privacidad/', '/legal/terminos/',
];

export function GET() {
  const urls = routes.map((route) => `<url><loc>https://axion.cl${route}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
