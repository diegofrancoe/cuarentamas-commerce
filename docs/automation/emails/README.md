# Plantillas aprobadas de correo

[Configuración Make](../../MAKE.md) · Exportadas de los módulos productivos el 2026-09-02.

| Archivo | Módulo | Asunto | Destinatario |
| --- | --- | --- | --- |
| [interno.html](interno.html) | 9 | Nueva experiencia recibida — 40+ | `contacto@cuarentamas.com` |
| [cliente.html](cliente.html) | 10 | Gracias por compartir tu experiencia con 40+ | `{{2.email}}` |

Remitente: conexión Microsoft 365 de `contacto@cuarentamas.com`. Los archivos conservan las expresiones de Make y el HTML del blueprint, con saltos de línea para lectura. No contienen información de un cliente real.

El correo del cliente conserva logo de 88 px, tipografía Arial/Helvetica de 16 px, botones de 14 px y ancho máximo de tarjeta de 560 px. La presentación exacta puede variar por cliente y modo oscuro; la versión recibida fue aprobada por el responsable de la marca.

`{{2.nombre}}` es el nombre enviado, no un nombre fijo de prueba. `{{2.ebookUrl}}` proviene del backend. El CTA de compra usa la ruta pública del producto y la imagen usa `/email/logo-40plus.jpg`.

Estos archivos **no se sincronizan automáticamente** con Make. Después de una edición aprobada, actualizar el módulo correcto, guardar el escenario, probar en buzones controlados y exportar una nueva copia saneada. El validador comprueba que no diverjan respecto del blueprint versionado.

Antes de extender las plantillas, revisar el tratamiento HTML de campos introducidos por usuarios. El snapshot actual conserva el mapeo original, no añade silenciosamente escape ni filtros nuevos.
