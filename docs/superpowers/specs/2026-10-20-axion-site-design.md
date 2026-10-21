# Diseño del sitio Axion

**Fecha:** 20 de octubre de 2026  
**Estado:** aprobado para revisión de especificación

## Propósito y criterio de éxito

Axion necesita una web comercial para empresas chilenas que transforme visitas en conversaciones calificadas por WhatsApp y solicitudes de demo. La web explica resultados antes que tecnología: más consultas atendidas, menos tareas manuales y más ventas recuperadas.

La primera entrega construible es una home de conversión y su sistema compartido. Debe poder crecer a servicios, soluciones por rubro, recursos y contenido editorial sin duplicar estructura ni sacrificar SEO técnico.

Los indicadores a instrumentar son: clic a WhatsApp, envío de formulario, uso de demo, cálculo de ROI, auditoría solicitada y reunión agendada. Las metas de rendimiento son LCP menor a 2 segundos, CLS menor a 0,05, INP menor a 200 ms y Lighthouse móvil mayor a 90 bajo condiciones de producción.

## Identidad y dirección visual

La dirección es **optimismo operativo**: una identidad chilena, luminosa y precisa que hace visible el paso de consultas desordenadas a oportunidades atendidas. No se usarán fondos oscuros, gradientes genéricos, tarjetas idénticas ni estética de plantilla de IA.

- Activo de marca: `logotipo-axion-agentic.png`; se usará como logotipo oficial, con variantes de contraste generadas desde el activo solo si su legibilidad lo requiere.
- Paleta: morado `#5B2EE8`, naranja `#FF6A1A`, lila `#EDE6FF`, crema `#FAF7FF`, amarillo `#FFD84D`, menta `#BFF3D4` y tinta `#1D1238`.
- Tipografía: Bricolage Grotesque para titulares y Figtree para lectura/interfaz. Se servirán con subconjuntos, `font-display: swap` y preload selectivo.
- Composición: secciones amplias sobre crema, bloques de tamaños intencionalmente distintos, bordes expresivos, stickers informativos y resaltados inclinados reservados para información de valor.
- Movimiento: una escena memorable en la home (el contraste entre un día sin/con Axion). El resto será sobrio; motion debe respetar `prefers-reduced-motion` y no bloquear interacción.

## Arquitectura técnica

El proyecto se migrará desde la landing HTML actual a Astro con TypeScript y Tailwind CSS.

- Astro produce HTML estático por defecto y mantendrá contenido principal y navegación indexables sin JavaScript.
- Las islas interactivas se limitan a menú móvil/mega menú, demo de WhatsApp, calculadora ROI, formularios y elementos de medición. Su JavaScript cargará solo donde corresponde.
- GSAP y ScrollTrigger se cargarán únicamente en la escena editorial de la home. Three.js queda diferido y opcional para el héroe; en móvil o reduced-motion se sustituye por una composición CSS estática. Lottie se reserva para iconos que aporten información.
- Las imágenes se optimizan a AVIF/WebP, con dimensiones declaradas para prevenir CLS. Fuentes, analítica y scripts externos no deben competir con el contenido LCP.
- Tailwind define los tokens de sistema; los componentes no tendrán colores, márgenes ni tamaños de marca arbitrarios fuera del sistema.

## Mapa del sitio

| Área | Ruta | Propósito |
| --- | --- | --- |
| Inicio | `/` | Captación y explicación de la propuesta de valor. |
| Servicios | `/servicios/` | Hub de las siete especialidades. |
| Servicio | `/servicios/[slug]/` | Landing única por servicio, con schema Service, FAQ y CTA contextual. |
| Soluciones | `/soluciones/[rubro]/` | Propuesta por industria. |
| Soluciones locales | `/soluciones/[rubro]/[ciudad]/` | Contenido local genuino, no una sustitución mecánica de ciudad. |
| Precios | `/precios/` | Planes, rangos y criterios de alcance. |
| Casos | `/casos/` | Evidencia comercial verificable. |
| Recursos | `/recursos/calculadora-roi/`, `/recursos/auditoria-whatsapp/` | Herramientas de captación. |
| Contenido | `/blog/` y `/blog/[slug]/` | Guías y clústeres SEO. |
| Conversión | `/demo/`, `/contacto/`, `/partners/` | Conversación, agendamiento y canal de partners. |
| Institucional | `/nosotros/`, `/legal/privacidad/`, `/legal/terminos/` | Confianza y cumplimiento. |

## Arquitectura de componentes

### Compartidos

- `BaseLayout`: metadatos, canonical, Open Graph, JSON-LD, idioma `es-CL`, skip link y contenedor principal.
- `SiteHeader`: píldora sticky, navegación desktop, mega menús, menú móvil con foco contenido, Escape y restauración del foco.
- `SiteFooter`: CTA, enlaces por área, contacto, legales y marca tipográfica de gran escala.
- `WhatsAppCta`: genera un mensaje prellenado según página y enlaza al número real `+56999464840`.
- `SeoMeta`, `Breadcrumbs`, `Faq`, `JsonLd` y `Section`: contratos semánticos reutilizables.

### Home

- `HeroConversation`: propuesta de valor, dos CTA y demostración no engañosa de conversación.
- `ServiceBento`: siete servicios, todos enlazados a su landing propia.
- `BeforeAfterScene`: escena con ScrollTrigger que muestra pérdida/recuperación de oportunidades.
- `ProcessSteps`, `IndustryLinks`, `CasePreview`, `RoiCalculator`, `FaqSection` y `FinalCta`.

### Datos y contenido

Los servicios, rubros, ciudades, metadatos y mensajes de CTA se modelan como datos tipados. Cada página debe aportar copy propio, preguntas, enlaces relacionados y schema; no se permite una plantilla con el nombre de ciudad reemplazado.

Los campos sin respaldo real se representan como `[COMPLETAR]`: precios, métricas, testimonios, clientes, RUT, dirección formal, perfiles sociales y garantías. No se inventarán logos, reseñas, integraciones activas ni resultados.

## DOM, accesibilidad y calidad

- Un único `h1` por página; jerarquía `h2`/`h3` sin saltos, `main`, `nav`, `header`, `footer` y listas semánticas.
- Controles reales con `button`; enlaces solo para navegación. Íconos decorativos quedan ocultos a lectores de pantalla.
- Navegación completa por teclado, foco visible, menú móvil con diálogo accesible y cierre mediante Escape.
- Contraste AA, textos alternativos útiles, objetivos táctiles mínimos de 44 px y layout sin desborde desde 360 px.
- Animaciones eliminables con reduced-motion; nunca serán la única forma de comprender contenido o completar una acción.
- Formularios con etiquetas visibles, ayuda contextual, errores anunciados y consentimiento explícito antes de enviar datos.

## SEO, GEO y medición

- Metadatos únicos, canonical, `hreflang="es-CL"`, sitemap y `robots.txt` generados desde las rutas.
- Datos estructurados pertinentes: Organization/ProfessionalService, Service, FAQPage, BreadcrumbList, Article y Review solo cuando existan datos verificables.
- `llms.txt` describirá servicios, rutas y fuentes propias en lenguaje directo.
- Enlazado interno: hub → servicio → rubro → ciudad → artículo/recurso, con breadcrumbs navegables.
- GA4, Search Console, Meta Pixel/API de conversiones y Clarity quedan como integraciones configurables, sin claves ni IDs incrustados en repositorio. Los eventos se normalizan por intención de conversión.

## Primera fase y criterios de aceptación

La primera fase incluye el sistema de diseño, estructura Astro, header, footer, home, SEO base, analítica preparada y documentación del repositorio. No incluye integración real con WhatsApp Cloud API, n8n, Anthropic, agenda, CRM, auditoría remota ni contenido masivo de rutas futuras.

Se considerará lista cuando:

1. La home use el logo oficial, teléfono y correo reales entregados.
2. El proyecto pueda instalarse, ejecutarse, construir y validarse mediante instrucciones del README.
3. No existan números de WhatsApp ficticios ni información comercial inventada.
4. Las rutas de navegación iniciales sean funcionales o estén claramente fuera de la primera fase sin enlaces rotos.
5. Las pruebas de build, formato/lint, chequeo de tipos y auditoría local relevante se documenten con su alcance real.
6. `.gitignore` excluya dependencias, salidas de build, variables de entorno, reportes y archivos de sistema, sin ocultar documentación necesaria para el proyecto.

## Riesgos y límites

- La mensajería real, agenda y CRM requieren credenciales, políticas de consentimiento, contratos de datos y una definición del flujo humano; se diseñan en una fase posterior.
- El rendimiento de producción depende del proveedor de hosting, CDN, analítica y activos finales; las comprobaciones locales no se presentarán como prueba de producción.
- Casos, testimonios y precios necesitan fuente comercial aprobada antes de publicarse.
- Redes sociales no existen aún: el footer no mostrará enlaces vacíos.
