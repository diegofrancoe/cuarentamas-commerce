# Publicación y mantenimiento

[Volver al README](../README.md) · Corte: 2026-09-02. El sitio ya está publicado; esta guía sustituye la antigua lista que lo describía como pendiente.

## Configuración de producción

| Ajuste | Valor documentado |
| --- | --- |
| Repositorio | `diegofrancoe/cuarentamas-commerce` |
| Rama de producción | `main` |
| Proyecto Vercel | `cuarentamas` |
| Equipo Vercel | `diego-franco-s-projects` |
| Root Directory | Vacío: raíz de este repositorio |
| Framework | Vite |
| Build / salida | `npm run build` / `dist` |
| Funciones | Directorio `api/` |
| Dominio | `https://cuarentamas.com` |

La conexión anterior al repositorio `portfolio` y raíz `projects/cuarentamas` fue corregida. No reutilizar esa configuración para este repositorio. Vercel enlazado a Git no significa que Make, DNS o Drive queden desplegados por el mismo commit.

## Variables y fronteras

La plantilla versionada es [`.env.example`](../.env.example). Nunca copiar valores privados a documentación, issues, screenshots ni commits.

| Variable | Ubicación / uso |
| --- | --- |
| `EXPERIENCE_WEBHOOK_URL` | Secreto operativo del backend: endpoint privado Make |
| `EXPERIENCE_WEBHOOK_TOKEN` | Solo servidor; clave enviada como `x-make-apikey` |
| `PUBLIC_SITE_URL` | Servidor; `https://cuarentamas.com`; base del enlace al PDF |
| `TURNSTILE_SECRET_KEY` | Solo servidor; validación Cloudflare |
| `TURNSTILE_EXPECTED_ACTION` | Servidor; `experience_form` |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Servidor; `cuarentamas.com,www.cuarentamas.com` en producción |
| `VITE_TURNSTILE_SITE_KEY` | Pública, incorporada al build del frontend |
| `VITE_META_PIXEL_ID` | Identificador público; PageView tras consentimiento |
| `PORT`, `ALLOWED_ORIGINS` | Servidor Express local; Vite apunta a 4000 |
| `ENABLE_TIENDANUBE_CHECKOUT` | Mantener `false` mientras el pedido sea por WhatsApp |
| `ENABLE_TIENDANUBE_ADMIN_ROUTES` | Mantener `false`; rutas locales históricas no operativas |
| `TIENDANUBE_*` | Variables históricas de aplicación, tienda, variante y token; no necesarias para el flujo actual |
| `VITE_ENABLE_MEMBRESIA` | Vestigio de configuración; no activa una ruta actual |

Cambiar `VITE_*` exige reconstruir. Separar Production / Preview / Development y no enviar pruebas de preview a clientes reales. Que las variables tengan nombre en el repo no demuestra que tengan valor en cada entorno.

## Procedimiento para una modificación

1. Partir de `main` actualizado; trabajar en una rama `codex/...` y conservar cambios ajenos.
2. Revisar el alcance: web, backend, plantilla o sistema externo. Documentar efectos colaterales antes de enviar mensajes o activar flujos.
3. Ejecutar `npm ci`, `npm run lint`, `npm run build` y `node scripts/verify-project-docs.mjs`.
4. Revisar la vista previa: rutas directas, móvil, carrito y consentimientos. No comprar ni enviar un pedido real como prueba sin autorización.
5. Revisar el diff y publicar un commit. Para futuros cambios conviene un PR con evidencia de verificación; la historia anterior se incorporó por fast-forward, sin PR.
6. Incorporar a `main` sin force-push; comprobar que Vercel despliegue ese commit y que el dominio sirva la versión esperada.
7. Si cambió Make: exportar desde su UI, sanear con el procedimiento documentado y comparar las plantillas. Un cambio en los HTML de `docs/` **no modifica** los módulos de Make automáticamente.
8. Registrar fecha, commit, escenario y resultado en [VERIFICACION](VERIFICACION.md). Conservar el origen de la evidencia.

## Verificaciones de producción

- Abrir inicio, producto, formulario y tres páginas legales directamente.
- Comprobar que el logo `/email/logo-40plus.jpg` devuelve imagen y `Cross-Origin-Resource-Policy: cross-origin`.
- Comprobar que el PDF devuelve `application/pdf` y `Content-Disposition: attachment; filename=Ritual-40-plus.pdf`.
- Revisar que `/api/experiencia` no se sirva como HTML de la SPA y no almacene respuestas en caché.
- Hacer una prueba de formulario solo con datos y destinatarios controlados; revisar el run, la escritura y ambos correos.
- Confirmar que rechazar cookies no inicializa Meta y que aceptar permite `PageView`. Los resultados de campañas requieren otra validación.
- En cambios de correo/DNS, verificar autenticación en un mensaje nuevo y no solo el panel.

## Assets y caché

El logo para emails tiene un año de caché `immutable`. Si cambia la imagen, crear una ruta versionada nueva y actualizar la plantilla en Make; reemplazar bytes en el mismo URL no garantiza que los correos lo vean de inmediato.

El PDF conserva una URL estable. Su contenido debe actualizarse junto con la evidencia de descarga; en algunos móviles el sistema puede ofrecer abrir/guardar el archivo en lugar de guardarlo silenciosamente.

## Incidentes y recuperación

| Síntoma | Revisar primero | Precaución |
| --- | --- | --- |
| La web muestra una versión antigua | Repositorio, raíz, rama y commit de Vercel | Un push al repo equivocado no actualiza este proyecto |
| Formulario rechazado | Respuesta API, Turnstile, dominio, acción y entorno | No desactivar Turnstile para publicar rápidamente |
| Éxito web pero falta correo o fila | Run Make y módulo que falló | `Accepted` no certifica entrega completa |
| Correo recibido, fila `pendiente` | Configuración actual de estado | No reenviar basándose solo en esa columna |
| Logo roto | URL, tipo de contenido y CORP | Mantener excepción limitada a recursos de email |
| Error en Sheets después de correos | Módulos 11/12 y búsqueda de configuración | Replay puede repetir correos |

Para revertir código, preparar un revert revisado o promover un despliegue anterior conocido; no reescribir el historial compartido. Los cambios externos deben revertirse por separado y con respaldo. No borrar datos de clientes ni desactivar servicios como parte de un rollback implícito.

## Preparación de portafolio

El repositorio permanece privado. Antes de hacerlo público, revisar historial completo, derechos de imágenes/PDF, dependencias y secretos; esta entrega solo sanea los artefactos nuevos y revisa coherencia documental, no certifica una auditoría exhaustiva. No se añade una licencia abierta a recursos del negocio.
