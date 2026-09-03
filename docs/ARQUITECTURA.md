# Arquitectura y recorrido de datos

[Volver al README](../README.md) · Corte: 2026-09-02 · Fuente: código en `a068b60` y exportación de Make del mismo día.

## Componentes y responsabilidades

| Capa | Implementación | Responsabilidad / límite |
| --- | --- | --- |
| Interfaz | React, React Router, Vite | Presentar marca y producto, preparar pedido, capturar experiencia |
| Estado de compra | `CartContext.jsx` | Cantidades y totales en memoria; no es una base de pedidos ni persiste al recargar |
| API productiva | `api/experiencia.js`, Vercel Functions | Validar, normalizar y enviar a Make; no enviar correos directamente |
| API local | `server/index.js`, Express | Desarrollo con `/api/health` y réplica del formulario; no se despliega como servidor Express por el simple build de Vite |
| Protección del formulario | `TurnstileWidget.jsx`, `server/turnstile.js` | Desafío en navegador, verificación del token, acción y host en servidor |
| Orquestación | Make | Webhook, dos correos y operaciones Sheets; configuración externa a Git |
| Registro | Google Sheets en Drive | Fila de experiencia y consentimientos; no inventario ni pagos |
| Correo | Conector Microsoft 365 Outlook | Envío desde el buzón de contacto; firma DKIM configurada en Microsoft 365 |
| Archivos | `public/downloads/`, `public/email/` en Vercel | E-book y logo públicos; no requieren autorización de Drive |
| Pedido | Enlace `wa.me` | Abrir conversación con mensaje preparado; envío, pago y despacho dependen de personas |

## Rutas actuales

| Ruta | Función |
| --- | --- |
| `/` | Landing y acceso al producto / experiencias |
| `/producto/colageno-hidrolizado-40` | Producto, cantidades y carrito |
| `/comparte-tu-experiencia` | Formulario protegido |
| `/terminos-y-condiciones` | Información contractual publicada |
| `/politica-de-datos` | Tratamiento de datos y consentimientos |
| `/envios-cambios-y-devoluciones` | Información de operación comercial |
| `/downloads/ebook-ritual-40.pdf` | Descarga pública del PDF |
| `/email/logo-40plus.jpg` | Imagen estable usada por el correo |
| `POST /api/experiencia` | Recepción y validación del formulario |
| `/api/tiendanube-checkout` | Adaptador heredado; responde 404 para POST si la bandera no es `true` |

Las rutas desconocidas redirigen al inicio en React. El rewrite de Vercel permite navegación directa de la SPA. Archivos y funciones deben seguir comprobándose por sus respuestas reales después de cada despliegue.

## Secuencia del formulario

1. React recoge nombre, email, celular y ciudad opcionales, experiencia, consentimiento obligatorio y autorización testimonial opcional.
2. El navegador envía JSON a `/api/experiencia`, incluyendo token Turnstile y señales antispam.
3. El servidor comprueba método, tipo de contenido, tamaño declarado, límite por IP, honeypot y tiempo mínimo; verifica Turnstile y valida longitudes y consentimiento.
4. Normaliza los campos, genera `submissionId` con UUID y `submittedAt` en UTC. Construye el enlace del e-book desde `PUBLIC_SITE_URL`; no acepta un enlace arbitrario del visitante.
5. Entrega el contrato a `EXPERIENCE_WEBHOOK_URL`; si existe `EXPERIENCE_WEBHOOK_TOKEN`, lo envía en `x-make-apikey`. La configuración productiva usa esta autenticación, aunque el código no exige que la variable exista.
6. Make procesa la secuencia exportada: **2 → 9 → 10 → 11 → 12**. Los correos preceden a Sheets en el orden de ejecución actual.
7. La web muestra éxito cuando Make acepta la petición. Esto **no acredita por sí mismo** que un correo haya llegado ni que una fila se haya guardado; la evidencia de esos resultados está en Make y el buzón.

Contrato de salida: [JSON Schema](automation/experience-payload.schema.json). Datos sintéticos: [ejemplo](automation/experience-payload.example.json). El ejemplo no sirve para saltar Turnstile ni es un envío real.

## Límites y fronteras de confianza

- Las variables `VITE_*` son públicas; secretos únicamente en backend y conexiones de Make.
- Turnstile usa una clave de prueba conocida como alternativa local; en producción falla si falta la clave secreta. La validación de hostname depende de que `TURNSTILE_ALLOWED_HOSTNAMES` esté configurada.
- El límite de 5 solicitudes/hora vive en memoria de cada proceso. No es un límite global distribuido y puede reiniciarse con una instancia serverless.
- Honeypot o envío demasiado rápido responde éxito sin reenviar a Make: comportamiento antispam, no comprobante de entrega.
- La API productiva revisa el tamaño indicado por `Content-Length`; Express aplica además un parser de 32 KB. No afirmar equivalencia absoluta de ambos entornos.
- El payload hacia Make incluye IP, user agent y página de origen. No se publican en Git; los logs externos pueden contener datos personales. La hoja solo mapea las columnas documentadas.
- Los textos libres se insertan en HTML mediante mapeos Make. El snapshot no acredita escape HTML explícito ni pruebas de inyección. Es una mejora pendiente antes de escalar.
- La preferencia de cookies se guarda localmente. Meta solo se inicializa al aceptar; no hay eventos de compra ni Conversion API implementados.
- El PDF es público. El formulario organiza su entrega por correo, pero no funciona como control de acceso al archivo.

## Qué vive en Git y qué no

Git conserva código, recursos públicos, nombres de variables, decisiones y una copia saneada del escenario. Make conserva conexiones, webhook y ejecuciones; Google conserva la hoja; Microsoft conserva el buzón y firma; GoDaddy conserva DNS; Vercel conserva secretos y configuración del proyecto.

Un rollback del código **no revierte** esos sistemas externos. Se deben coordinar mediante la guía de [mantenimiento](PUBLICACION.md) y dejar un nuevo registro en [verificación](VERIFICACION.md).
