export type Service = { slug: string; name: string; description: string; benefit: string };

export const siteContact = { phone: '56999464840', email: 'chat@axion.cl' };
export const services: Service[] = [
  { slug: 'asistentes-whatsapp-ia', name: 'Asistentes de WhatsApp con IA', benefit: 'Responde, cotiza y agenda incluso fuera de horario.', description: 'Un asistente entrenado para atender consultas frecuentes y derivar lo importante a tu equipo.' },
  { slug: 'automatizacion-procesos', name: 'Automatización de procesos', benefit: 'Menos planillas, menos tareas repetidas.', description: 'Conectamos formularios, WhatsApp, correo, CRM y operaciones para que la información llegue donde debe.' },
  { slug: 'desarrollo-web', name: 'Sitios web que venden', benefit: 'Tu sitio guía a cada visita hacia una acción.', description: 'Webs rápidas, claras y medibles para captar consultas, reservas o ventas.' },
  { slug: 'seo-local', name: 'SEO local', benefit: 'Que te encuentren cuando ya te están buscando.', description: 'Mejoramos tu presencia local para búsquedas en Google y Maps.' },
  { slug: 'ecommerce', name: 'Ecommerce integrado', benefit: 'Vende con pagos y despacho conectados.', description: 'Tiendas con Webpay, Mercado Pago, logística y flujos de venta listos para operar.' },
  { slug: 'sistemas-a-medida', name: 'Sistemas a medida', benefit: 'Herramientas hechas para tu operación.', description: 'Cotizadores, portales y paneles que resuelven un proceso específico de tu negocio.' },
  { slug: 'mantencion-web', name: 'Mantención web', benefit: 'Tu plataforma se mantiene segura y vigente.', description: 'Soporte, mejoras y seguimiento mensual para sitios y sistemas que deben seguir funcionando.' },
];

export const industries = ['Clínicas', 'Inmobiliarias', 'Constructoras', 'Estudios jurídicos', 'Tiendas online', 'Restaurantes', 'Servicios técnicos'];
