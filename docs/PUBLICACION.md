# Preparación para publicar 40+

## Ya resuelto en el proyecto

- Navegación y diseño adaptable para laptop, tablet y celular, con rutas públicas directas.
- Página del producto con precio, contenido, porciones, tabla nutricional, ingredientes, uso, advertencias y notificación sanitaria.
- Carrito coherente con el proceso actual: prepara el pedido y continúa por WhatsApp; no afirma que el pago ya fue realizado.
- Aceptación de términos y política de datos en el pedido.
- Contacto directo por WhatsApp, correo e Instagram; páginas de términos, tratamiento de datos y envíos/devoluciones; y un aviso inicial de preferencias de cookies.
- Meta Pixel bloqueado hasta que la persona acepte las cookies.
- Formulario de experiencia con consentimiento obligatorio, autorización opcional para publicar el testimonio, Cloudflare Turnstile y validación del desafío en el servidor.
- Límite local de cinco intentos por hora para reducir envíos automatizados simples.
- E-book disponible en `/downloads/ebook-ritual-40.pdf`.
- SEO, imagen social, robots, sitemap y soporte de rutas directas en Vercel.
- Política de seguridad de contenido, HSTS, protección contra inclusión en marcos, restricciones de permisos y respuestas API sin caché en Vercel.
- Rutas antiguas de checkout y administración de Tiendanube cerradas por defecto; la antigua API de membresía fue retirada.
- El formulario solo usa `EXPERIENCE_WEBHOOK_URL`; ya no reutiliza automáticamente ninguna configuración anterior de n8n.
- Solicitudes JSON limitadas a 32 KB, validación de tipo de contenido y limpieza periódica del límite de intentos.
- El carrito bloquea el fondo, conserva el foco dentro del diálogo y puede cerrarse con Escape.

## Datos verificados en la documentación

Revisión realizada el 31 de agosto de 2026 contra el certificado de existencia, el registro mercantil y la guía de producto suministrados:

- Razón social exacta: `ZENTIA HEALTHCARE GROUP S.A.S.`.
- Fabricante declarado: `ZENTIA HEALTHCARE GROUP S.A.S.`.
- NIT: `901.977.632-6`.
- Dirección: `Carrera 9A No. 117A-65, apartamento 301, Bogotá D.C., Colombia`.
- Correo: `contacto@cuarentamas.com`.
- Teléfono y WhatsApp: `+57 (320) 909-9105`.
- Notificación sanitaria: `NSA-0013618-2023`.
- Tarifas: `$6.000` para Bogotá y `$16.000` para el resto de Colombia.
- La guía, transportadora, número de seguimiento y tiempo estimado de llegada se informan por WhatsApp después del despacho.
- Retracto, garantía y reversión están descritos en la política pública de envíos y devoluciones.
- Los textos comerciales fueron ajustados a la guía de comunicación responsable entregada.
- Precio público vigente configurado en el sitio: `$69.900 COP`.

Si cambia alguno de estos datos, actualizar `src/config/businessInfo.js`, el carrito y las páginas legales antes de publicar.

## Flujo pendiente en Make

El escenario debe recibir el webhook de `/api/experiencia` y realizar, como mínimo:

1. Guardar nombre, correo, celular, ciudad, experiencia, fecha, versión de la política y autorizaciones.
2. Avisar a `contacto@cuarentamas.com` que llegó una experiencia nueva.
3. Enviar al cliente una confirmación clara desde un dominio de 40+.
4. Incluir el enlace absoluto al e-book recibido en el campo `ebookUrl`.
5. No publicar el testimonio si `autorizacionTestimonio` es `false`.
6. Registrar errores y evitar enviar el mismo correo varias veces si Make reintenta el escenario.

Después de crear el escenario, configurar en Vercel:

- `EXPERIENCE_WEBHOOK_URL`
- `EXPERIENCE_WEBHOOK_TOKEN`, si Make valida un token
- `PUBLIC_SITE_URL=https://cuarentamas.com`
- `VITE_META_PIXEL_ID`
- `VITE_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_EXPECTED_ACTION=experience_form`
- `TURNSTILE_ALLOWED_HOSTNAMES=cuarentamas.com,www.cuarentamas.com`

Antes de habilitar el formulario en producción, crear el widget de Cloudflare Turnstile para el dominio y configurar sus dos claves en Vercel. El formulario queda cerrado en producción si falta la clave secreta.

Mantener estas variables en `false` mientras el pedido continúe por WhatsApp:

- `ENABLE_TIENDANUBE_CHECKOUT=false`
- `ENABLE_TIENDANUBE_ADMIN_ROUTES=false`

SPF y DMARC ya están publicados. Falta activar DKIM en Microsoft 365/GoDaddy siguiendo `docs/DNS-CORREO.md` y probar la entrega desde el proveedor que finalmente use Make.

## Verificación final

- Crear primero un despliegue de vista previa en Vercel.
- Probar navegación directa al producto y a todas las políticas, además de los enlaces de WhatsApp, correo e Instagram del pie.
- Probar el carrito en celular y escritorio, incluido el mensaje generado en WhatsApp.
- Hacer un envío real del formulario con un correo de prueba y confirmar que llega la respuesta y el e-book.
- Confirmar que el formulario rechaza un envío sin Turnstile y acepta uno validado.
- Verificar que rechazar cookies no cargue el píxel de Meta y que aceptar sí lo habilite.
- Confirmar favicon, vista previa al compartir la URL y dominio `https://cuarentamas.com`.
- Revisar ortografía y datos legales una última vez con la persona responsable de la marca.
- Solo después, promover el despliegue verificado a producción.
