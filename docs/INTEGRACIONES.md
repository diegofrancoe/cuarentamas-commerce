# Inventario de integraciones

[Volver al README](../README.md) · Estado documentado al 2026-09-02. “Implementado” no equivale a una prueba de transacción comercial completa.

| Sistema / canal | Conexión y propósito | Fuente / estado |
| --- | --- | --- |
| GitHub | `diegofrancoe/cuarentamas-commerce`, rama de producción `main` | Repositorio privado; código y documentación versionados |
| Vercel | Proyecto `cuarentamas`, dominio `https://cuarentamas.com`, raíz del repositorio | Despliegue corregido y sitio verificado; configuración operativa en [PUBLICACION](PUBLICACION.md) |
| Make | `40+ · Experiencias y e-book Ritual 40+`, escenario 6121732 en región US2 | Activo; snapshot saneado en [automation](automation/make.blueprint.sanitized.json) |
| Google Sheets | Documento de experiencias, pestaña `Experiencias`, columnas A:S | Conexión OAuth en Make, búsqueda y agregado de fila; última prueba devuelve fila 9 |
| Google Drive | Archivo nativo de Sheets en carpeta `Cuarentamas Web` según registro de preparación del 1 de septiembre | Drive es el contenedor de la hoja, no un módulo adicional de ejecución ni el alojamiento del PDF |
| Microsoft 365 / Outlook | Buzón `contacto@cuarentamas.com`, módulos 9 y 10 de Make | Aviso a la marca y respuesta al email recibido del formulario; pruebas de recepción aprobadas |
| E-book | `https://cuarentamas.com/downloads/ebook-ritual-40.pdf` | Archivo en Vercel; enlace en email; descarga verificada, no adjunto |
| Marca en correo | `https://cuarentamas.com/email/logo-40plus.jpg` | Imagen de 88 px; CORP `cross-origin` solo bajo `/email/`; aprobado |
| WhatsApp | `https://wa.me/573209099105` | Enlace público de contacto y carrito con resumen codificado en `text`; no bot ni Business API |
| Correo público | `mailto:contacto@cuarentamas.com` | Footer, producto, páginas legales y respaldo del formulario; no es por sí mismo envío automatizado |
| Instagram | `https://www.instagram.com/cuarentamas_official/` | Enlace visible en landing y referencia `sameAs` de SEO; no integración API ni publicación programada |
| Facebook | `https://www.facebook.com/cuarentamascom/` | Referencia `sameAs` en datos estructurados; no botón visible equivalente en el footer actual |
| Meta Pixel | `VITE_META_PIXEL_ID`, implementación `PageView` | Carga tras aceptación de cookies; permisos de tráfico del administrador de Meta no certificados en esta entrega |
| Cloudflare Turnstile | Widget público y verificación server-side | Claves privadas en Vercel; acción `experience_form`; formulario real probado |
| GoDaddy DNS | DNS del dominio y registros de correo | Dos CNAME DKIM publicados; no se publica acceso al panel |
| Microsoft Defender | Firma DKIM del dominio | Habilitada en panel; [estado de autenticación](DNS-CORREO.md) |
| Tiendanube | OAuth, consulta de catálogo y `draft_orders` del backend histórico | Retirado del recorrido visible; adaptadores conservados deshabilitados por defecto |
| n8n / membresía | Webhook histórico del formulario opcional | Retirado del flujo actual; API antigua eliminada; no conectado a Make como dependencia |
| Microsoft Excel | Dos módulos intermedios del escenario | Sustituidos por Google Sheets; no hay conector Excel en el snapshot actual |

## Pedido por WhatsApp

`src/components/Cart.jsx` construye un resumen con producto, cantidad, subtotal, envío, total, nombre, teléfono, ciudad y dirección. Exige los campos de entrega y aceptación de términos/datos antes de abrir WhatsApp. No guarda estos datos de pedido en la hoja de experiencias y no crea una orden en Tiendanube.

Valores en código al corte: producto `$69.900 COP`; envío Bogotá `$6.000`, resto de Colombia `$16.000`. No son valores consultados de un inventario remoto. Si cambian, revisar producto y carrito, no solo el README.

El número existe tanto en `businessInfo.js` como en `Cart.jsx`: actualizar ambos en un cambio futuro. Correo, web y datos del fabricante se centralizan parcialmente en `businessInfo.js`; otros componentes tienen enlaces explícitos. El inventario ayuda a evitar actualizaciones incompletas.

## Propiedad, acceso y privacidad

- Resolver la hoja exacta desde la conexión del módulo Google Sheets en Make. Su identificador y las cuentas personales de conexión se omiten en el respaldo de portafolio.
- No crear un enlace público a la hoja ni a los logs: contienen o pueden contener datos de clientes.
- Los permisos OAuth, destinatarios y credenciales no se pueden reconstruir desde un clon de Git. Requieren acceso autorizado del propietario.
- No se modificaron aquí nombres, ubicación o permisos del archivo de Drive ni configuración de las cuentas sociales.
- Los únicos destinos de correo de la automatización actual son el buzón de la marca y el email recibido en el formulario. No existe una newsletter añadida por este trabajo.
