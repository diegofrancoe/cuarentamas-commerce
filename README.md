# 40+ Commerce Ecosystem

Sitio comercial de 40+ para presentar la marca, informar sobre el Colágeno Hidrolizado 40+, preparar pedidos por WhatsApp y recibir experiencias de clientes. El formulario está preparado para conectarse mediante webhook con Make.

## Funcionalidades implementadas

- Landing pública de la marca y navegación mediante rutas de React.
- Detalle del Colágeno Hidrolizado 40+ con información nutricional, ingredientes, modo de uso, advertencias y trazabilidad visibles.
- Carrito con selección de cantidad, tarifas de envío y continuación del pedido por WhatsApp.
- Contacto directo por WhatsApp, correo e Instagram; páginas de términos, tratamiento de datos, envíos, cambios y devoluciones; y un aviso inicial de preferencias de cookies.
- Servidor Express para desarrollo local con salud, autorización de Tiendanube y rutas de integración protegidas por banderas de entorno.
- Las rutas antiguas de checkout, administración de Tiendanube y membresía permanecen deshabilitadas por defecto mientras el pedido continúe por WhatsApp.
- Página para compartir la experiencia con 40+ y solicitar por correo el e-book Ritual 40+, protegida con Cloudflare Turnstile y lista para conectarse a un webhook.
- Archivo público del e-book disponible para que la automatización de correo lo enlace desde `/downloads/ebook-ritual-40.pdf`.
- Experiencia visual 3D de producto con Three.js.
- Metadatos SEO y sociales, sitemap, banner de cookies con consentimiento previo y configuración de rutas para Vercel.

No existe un sistema POS implementado en este repositorio. Un POS se considera una demostración o una extensión futura.

## Stack tecnológico

- React 19 y React Router.
- Vite 7.
- Tailwind CSS 3 y PostCSS.
- Three.js para la experiencia 3D.
- Node.js, Express, Axios, CORS y dotenv para el servidor local.
- Funciones serverless compatibles con el directorio `api/`.
- ESLint 9.

## Arquitectura

- `src/`: aplicación React, rutas, componentes, estilos, contexto del carrito y configuración pública.
- `src/assets/`: imágenes, iconos y modelo 3D referenciados por el código.
- `public/`: favicon, archivos SEO y video público.
- `api/`: funciones serverless de checkout y contacto de membresía.
- `server/`: servidor Express para ejecutar localmente los flujos de integración.
- `index.html`: documento base y metadatos públicos.

Las integraciones usan variables de entorno. El repositorio no incluye endpoints privados, tokens ni credenciales reales.

## Requisitos

- Node.js compatible con Vite 7.
- npm.

## Instalación y ejecución

```bash
npm install
cp .env.example .env
npm run dev
```

Para ejecutar también el servidor local, abre otra terminal y usa:

```bash
npm run server
```

Vite redirige las solicitudes a `/api` hacia el servidor local en el puerto configurado.

## Variables de entorno

### Servidor

- `PORT`: puerto del servidor Express local.
- `TIENDANUBE_APP_ID`: identificador de la aplicación de Tiendanube.
- `TIENDANUBE_APP_SECRET`: secreto de la aplicación de Tiendanube.
- `TIENDANUBE_REDIRECT_URI`: URL de retorno del flujo de autorización.
- `TIENDANUBE_STORE_ID`: identificador de la tienda.
- `TIENDANUBE_ACCESS_TOKEN`: token de acceso de la tienda.
- `TIENDANUBE_PRODUCT_ID`: identificador del producto configurado.
- `TIENDANUBE_VARIANT_ID`: identificador de la variante usada por checkout.
- `TIENDANUBE_STORE_FRONT_URL`: URL pública de la tienda.
- `EXPERIENCE_WEBHOOK_URL`: endpoint de Make que recibirá las experiencias.
- `EXPERIENCE_WEBHOOK_TOKEN`: clave privada del webhook de Make enviada como `x-make-apikey`.
- `PUBLIC_SITE_URL`: dominio público usado para construir el enlace seguro al e-book.
- `TURNSTILE_SECRET_KEY`: clave privada usada por el servidor para validar cada desafío de Cloudflare Turnstile.
- `TURNSTILE_EXPECTED_ACTION`: debe conservar el valor `experience_form`.
- `TURNSTILE_ALLOWED_HOSTNAMES`: dominios autorizados, separados por comas.
- `ENABLE_TIENDANUBE_CHECKOUT`: debe seguir en `false` mientras el checkout se gestione por WhatsApp.
- `ENABLE_TIENDANUBE_ADMIN_ROUTES`: habilita de forma explícita las rutas locales de administración de Tiendanube.
- `ALLOWED_ORIGINS`: orígenes autorizados para el servidor Express local.

### Frontend

- `VITE_META_PIXEL_ID`: identificador público del píxel de Meta, que solo se carga después de aceptar cookies.
- `VITE_TURNSTILE_SITE_KEY`: clave pública del widget Cloudflare Turnstile.

Todas las variables `VITE_*` se incluyen en el código del navegador y son públicas. Nunca deben contener secretos, tokens ni credenciales.

## Scripts

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run build`: genera la compilación de producción.
- `npm run preview`: sirve localmente la compilación.
- `npm run lint`: ejecuta ESLint.
- `npm run server`: inicia el servidor Express local.
- `npm run tailwind:init`: inicializa la configuración de Tailwind si se requiere regenerarla.

## Estado actual

La interfaz, las rutas y las validaciones locales están preparadas para publicación. Antes de activar el formulario en producción se debe crear el escenario de automatización, generar las claves reales de Turnstile, activar DKIM y configurar las variables en Vercel. Consulta `docs/PUBLICACION.md`, `docs/DNS-CORREO.md` y `docs/MAKE.md` para la lista final.
