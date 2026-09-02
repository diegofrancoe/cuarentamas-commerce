# Flujo de experiencias en Make

Esta guía deja definido el escenario que conectará el formulario de 40+ con el correo. No contiene credenciales y no activa ningún envío por sí sola.

## Objetivo del escenario

Cuando una persona envíe su experiencia:

1. Recibir y validar el webhook del sitio.
2. Evitar procesar dos veces el mismo envío.
3. Guardar la experiencia y sus autorizaciones.
4. Avisar a `contacto@cuarentamas.com`.
5. Responder al cliente con el e-book Ritual 40+.
6. Registrar el resultado o el error del envío.

## Campos que recibirá Make

| Campo | Uso |
| --- | --- |
| `submissionId` | Identificador único para evitar duplicados. |
| `source` | Siempre `web-experiencia-ritual-40`. |
| `formVersion` | Versión del formulario enviado. |
| `nombre` | Nombre del cliente. |
| `email` | Correo de respuesta. |
| `celular` | Opcional. |
| `ciudad` | Opcional. |
| `experiencia` | Texto compartido por el cliente. |
| `consentimiento` | Debe ser `true` para procesar. |
| `autorizacionTestimonio` | Indica si puede evaluarse para publicación. |
| `politicaDatosVersion` | Versión de la política aceptada. |
| `ebookUrl` | Enlace absoluto al PDF. |
| `submittedAt` | Fecha y hora del envío. |
| `pageUrl` | Página desde la que se envió. |

## Orden recomendado de módulos

1. **Webhook personalizado:** recibe el JSON de `/api/experiencia`.
2. **Filtro de entrada:** continuar solo cuando `source` sea `web-experiencia-ritual-40`, `consentimiento` sea verdadero y exista `submissionId`.
3. **Control de duplicados:** buscar `submissionId` en el registro elegido. Si ya existe, terminar sin volver a enviar correos.
4. **Registro:** guardar todos los campos, conservando por separado `consentimiento` y `autorizacionTestimonio`.
5. **Correo interno:** enviar el aviso a `contacto@cuarentamas.com`.
6. **Correo al cliente:** enviar la confirmación y el enlace `ebookUrl`.
7. **Actualización del registro:** marcar el envío como `enviado` y guardar la fecha; ante un error, marcarlo como `fallido` con su descripción.

El registro puede estar en Airtable, Google Sheets o una base de datos. Para controlar duplicados, la búsqueda siempre debe hacerse con `submissionId`, no solamente con el correo.

Si se usa Google Sheets, configurar la escritura de valores como **RAW**. Así, un texto enviado por una persona que empiece por `=`, `+`, `-` o `@` se guarda como texto y no se interpreta como una fórmula de la hoja.

## Correo al cliente

**Asunto:** Gracias por compartir tu historia con 40+

Hola, {{nombre}}:

Gracias por contarnos cómo 40+ acompaña tus días. Tu experiencia también hace parte de esta comunidad que elige cuidarse con hábitos simples.

Como agradecimiento, aquí tienes tu e-book **Ritual 40+**, con un recetario digital, un mini planner y nuevas formas de disfrutar tu 40+:

{{ebookUrl}}

Si quieres conversar con nosotros o necesitas ayuda, responde a este correo o escríbenos a contacto@cuarentamas.com.

Un abrazo,

Equipo 40+

## Aviso interno

**Asunto:** Nueva experiencia 40+ — {{nombre}}

Se recibió una nueva experiencia desde el sitio.

- ID: {{submissionId}}
- Nombre: {{nombre}}
- Correo: {{email}}
- Celular: {{celular}}
- Ciudad: {{ciudad}}
- Fecha: {{submittedAt}}
- Autoriza evaluar su testimonio para publicación: {{autorizacionTestimonio}}
- Versión de política aceptada: {{politicaDatosVersion}}

Experiencia:

{{experiencia}}

No publicar ni reutilizar el texto si `autorizacionTestimonio` es falso.

## Configuración al terminar el escenario

Crear en Vercel:

- `EXPERIENCE_WEBHOOK_URL`: URL del webhook de Make.
- `EXPERIENCE_WEBHOOK_TOKEN`: clave privada configurada en el webhook de Make; el servidor la envía en el encabezado `x-make-apikey`.
- `PUBLIC_SITE_URL=https://cuarentamas.com`.

Antes de activar el formulario públicamente, crear el widget de Cloudflare Turnstile y configurar sus claves pública y privada en Vercel. También se deben configurar SPF, DKIM y DMARC para el dominio que enviará los correos.

## Prueba de aceptación

Usar un correo controlado por 40+ y comprobar una sola vez:

- El registro se crea con todas las autorizaciones.
- El aviso interno llega a `contacto@cuarentamas.com`.
- El cliente recibe un solo correo y el enlace abre el e-book.
- Repetir el mismo `submissionId` no envía otro correo.
- Un error de correo queda registrado y puede reintentarse sin duplicar el resto del flujo.

## Estado de continuidad — 1 de septiembre de 2026

- El webhook recibe correctamente una solicitud válida y responde `Accepted`.
- Cloudflare Turnstile y las variables necesarias están configurados para producción en Vercel.
- Se creó en Google Drive, dentro de la carpeta `Cuarentamas Web`, la hoja nativa `Cuarenta Más · Experiencias Web` con las columnas de registro, estado y error.
- El escenario `40+ · Experiencias y e-book Ritual 40+` queda **inactivo** hasta finalizar la prueba de aceptación.
- Antes de activarlo, sustituir los dos módulos de Microsoft 365 Excel por Google Sheets, apuntando a la pestaña `Experiencias` de la hoja anterior.
- Después de guardar el escenario, ejecutar la prueba completa de este documento y confirmar que los dos correos salen desde `contacto@cuarentamas.com`.
