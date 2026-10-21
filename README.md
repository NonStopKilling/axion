# Axion

Sitio comercial de Axion: asistentes de WhatsApp con IA, automatización y crecimiento digital para empresas en Chile.

## Inicio rápido

Requiere Node.js 20 LTS o superior.

```powershell
npm install
npm run dev
```

Para validar una entrega local:

```powershell
npm run check
npm run test
npm run build
```

## Estructura

- `src/pages/`: rutas estáticas y plantillas de servicio.
- `src/components/`: componentes semánticos y accesibles.
- `src/data/`: contenido tipado de servicios, navegación y contacto.
- `src/styles/`: tokens y estilos globales de Axion.
- `public/`: activos sin procesar, incluyendo el logo oficial.
- `tests/`: contratos unitarios y pruebas de navegador.
- `docs/`: diseño, plan de implementación y evidencia de verificación.

## Normas de implementación

- HTML primero: contenido comercial, navegación y SEO deben existir sin JavaScript.
- Un solo `h1` por página; usar landmarks semánticos y enlaces reales para navegación.
- Botones para acciones; controles operables con teclado, foco visible y objetivos táctiles de al menos 44 px.
- Respetar `prefers-reduced-motion`; las animaciones no deben ocultar contenido ni ser necesarias para usar la página.
- Usar los tokens de `global.css`. No incorporar colores de marca arbitrarios.
- Todo copy se escribe en español de Chile. No inventar precios, casos, métricas, RUT, reseñas, logos de clientes ni redes sociales.
- La mensajería usa `+56999464840` y el correo es `chat@axion.cl`.

## Calidad y despliegue

Antes de entregar cambios se ejecutan `npm run check`, `npm run test`, `npm run build` y las pruebas de navegador disponibles. Las verificaciones locales no acreditan métricas de producción.

El sitio puede desplegarse en Cloudflare Pages o Vercel con `npm run build` y directorio de salida `dist`. Configura los identificadores de analítica como variables de entorno del proveedor: nunca los dejes en el repositorio.
