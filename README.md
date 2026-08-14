# 40+ Commerce Ecosystem

Plataforma web comercial de 40+ orientada a presentar la marca y su catálogo de bienestar, ofrecer información del producto, gestionar un carrito y conectar el recorrido de compra con Tiendanube. El proyecto también contiene un flujo opcional de solicitud de membresía conectado a n8n.

## Funcionalidades implementadas

- Landing pública de la marca y navegación mediante rutas de React.
- Catálogo y detalle del producto Colágeno Hidrolizado 40+.
- Carrito en el navegador con selección de cantidad y resumen de compra.
- Creación de una orden preliminar de checkout mediante una función serverless que usa la API de Tiendanube.
- Servidor Express para desarrollo local con rutas de salud, autorización de Tiendanube, consulta de productos, checkout y membresía.
- Formulario de membresía, activable mediante una bandera pública, que envía la solicitud a un webhook de n8n desde el servidor.
- Experiencia visual 3D de producto con Three.js.
- Metadatos SEO, banner de cookies y páginas públicas de términos y política de datos.

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
- `N8N_MEMBRESIA_WEBHOOK_URL`: endpoint del flujo de membresía.
- `N8N_MEMBRESIA_WEBHOOK_TOKEN`: token opcional del webhook de membresía.

### Frontend

- `VITE_ENABLE_MEMBRESIA`: habilita la ruta pública de membresía cuando su valor es `true`.

Todas las variables `VITE_*` se incluyen en el código del navegador y son públicas. Nunca deben contener secretos, tokens ni credenciales.

## Scripts

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run build`: genera la compilación de producción.
- `npm run preview`: sirve localmente la compilación.
- `npm run lint`: ejecuta ESLint.
- `npm run server`: inicia el servidor Express local.
- `npm run tailwind:init`: inicializa la configuración de Tailwind si se requiere regenerarla.

## Estado actual

Este repositorio representa la versión inicial separada del proyecto existente. Conserva las funcionalidades demostradas por el código y no incluye optimizaciones de recursos, rediseños, mejoras funcionales ni un POS. Las integraciones requieren configuración externa y no se ejecutan durante el proceso de compilación.
