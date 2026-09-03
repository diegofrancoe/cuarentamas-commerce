# Make — configuración real del formulario

[Volver al README](../README.md) · Snapshot exportado el 2026-09-02 · Escenario **activo** al corte.

Escenario: `40+ · Experiencias y e-book Ritual 40+`, ID `6121732`, región `us2.make.com`. [Acceso del operador](https://us2.make.com/1690555/scenarios/6121732/edit) — requiere permisos; no es un enlace público a datos.

## Respaldo versionado

- [Blueprint saneado](automation/make.blueprint.sanitized.json): derivado de la exportación real; no es un escenario idealizado.
- [Contrato JSON](automation/experience-payload.schema.json) y [ejemplo ficticio](automation/experience-payload.example.json).
- [Encabezados de Sheets](automation/sheets-headers.csv): estructura A:S, sin filas de clientes.
- [Plantillas HTML aprobadas](automation/emails/README.md): aviso interno y correo al cliente.

Se quitaron identificadores de webhook, conexiones OAuth, identificador privado de la hoja y metadatos de restauración asociados a cuentas. No se incluyen bundles de ejecución, tokens ni ejemplos reales. El archivo requiere reconectar recursos en Make y **no se ha probado su importación en un escenario independiente**. No reemplaza el backup privado completo ni despliega infraestructura desde Git.

## Orden efectivo, no orden visual

La lista `flow` exportada y los logs registran:

```text
2 Webhook → 9 Correo interno → 10 Correo cliente → 11 Search Rows → 12 Add a Row
```

En el lienzo los módulos Sheets se ven a la izquierda de los correos por sus coordenadas. Esa posición no debe utilizarse para documentar una secuencia distinta de la exportada.

| ID | Módulo | Configuración observada |
| --- | --- | --- |
| 2 | `gateway:CustomWebHook` v1 | Webhook personalizado, `maxResults: 1`; endpoint y autenticación configurados fuera de Git |
| 9 | `microsoft-email:createAndSendAMessage` v2 | HTML; asunto `Nueva experiencia recibida — 40+`; destinatario `contacto@cuarentamas.com` |
| 10 | `microsoft-email:createAndSendAMessage` v2 | HTML; asunto `Gracias por compartir tu experiencia con 40+`; destinatario `{{2.email}}` |
| 11 | `google-sheets:filterRows` v2 | Hoja `Experiencias`; encabezados `A1:Z1`; límite 1; busca columna A igual a `CONFIGURACION-NO-PROCESAR` |
| 12 | `google-sheets:addRow` v2 | Hoja `Experiencias`; IDs por encabezado; `INSERT_ROWS`; `USER_ENTERED`; `insertUnformatted: true` |

El escenario está configurado para recibir datos inmediatamente, `sequential: false`, `maxErrors: 3`, `dlq: false`, `confidential: false`. No se añadió en esta tarea ningún cambio de ejecución, privacidad o recuperación.

## Registro en Sheets / Drive

La hoja es un documento nativo de Google Sheets en Drive; carpeta registrada durante la preparación: `Cuarentamas Web`. El identificador se resuelve en los módulos 11 y 12 del escenario, sin publicarlo en el portafolio. No hay módulo adicional Google Drive ni almacenamiento del PDF en Drive dentro de este flujo.

| Columnas | Campos | Mapeo actual |
| --- | --- | --- |
| A:D | `submissionId`, `submittedAt`, `source`, `formVersion` | Campos correspondientes del webhook 2 |
| E:I | `nombre`, `email`, `celular`, `ciudad`, `experiencia` | Campos correspondientes del webhook 2 |
| J:L | `consentimiento`, `autorizacionTestimonio`, `politicaDatosVersion` | Se conservan por separado |
| M:P | `ebook`, `ebookRequested`, `ebookUrl`, `pageUrl` | Campos correspondientes del webhook 2 |
| Q | `estadoEnvio` | Literal `pendiente` |
| R:S | `fechaEnvio`, `errorEnvio` | Sin mapeo de escritura en el snapshot |

La salida del módulo 12 de la prueba de las 19:27:26 reporta `Table Range: Experiencias!A1:S8` y `Row Number: 9`. Esa evidencia confirma una escritura del módulo; no constituye una auditoría de todas las filas del archivo.

## Correos y archivos

Ambos módulos usan la conexión Microsoft 365 del buzón `contacto@cuarentamas.com`.

- **Interno:** datos del cliente, experiencia, autorizaciones, solicitud del e-book, página de origen e ID. Mantiene el texto aprobado.
- **Cliente:** agradecimiento, regalo Ritual 40+, CTA de descarga y CTA de compra; saludo dinámico desde `nombre`.
- **Descarga:** `{{2.ebookUrl}}`, generado en backend como `https://cuarentamas.com/downloads/ebook-ritual-40.pdf`.
- **Compra:** `https://cuarentamas.com/producto/colageno-hidrolizado-40`.
- **Marca:** `https://cuarentamas.com/email/logo-40plus.jpg`, 88 px, cabecera `#124948`.
- **Formato:** el PDF es un enlace, no un adjunto; no hay módulo que descargue y adjunte el binario.

La política de testimonios no cambia: aceptar recibir el e-book no equivale a autorizar publicación. El escenario no publica automáticamente los textos.

## Diferencias respecto del plan inicial

La versión anterior de esta guía describía objetivos aún no implementados. La exportación permite corregirlos:

1. **No hay deduplicación por ID.** `Search Rows` busca un registro de configuración, no `{{2.submissionId}}`. Reprocesar un envío puede volver a enviar ambos correos y crear otra fila; así ocurrió en la prueba controlada del logo.
2. **Los correos se ejecutan antes del registro.** Si falla Sheets, el cliente puede haber recibido ya su email.
3. **No hay actualización final de estado.** Una fila puede seguir en `pendiente` aunque ambos correos se hayan enviado. No usar esa columna como evidencia de fracaso ni para reenvíos masivos.
4. **No está configurada escritura `RAW`.** `USER_ENTERED` requiere revisar la interpretación de entradas y probar texto que comienza con caracteres de fórmula antes de escalar. No presentar `insertUnformatted` como garantía equivalente sin prueba.
5. **No hay ruta explícita de errores / retry idempotente en el blueprint.** La aceptación HTTP del webhook no acredita el resultado de todo el escenario.
6. **No hay escape HTML explícito documentado para campos libres.** Revisar antes de tratar cualquier entrada como segura en un correo HTML.

Estas limitaciones no se corrigieron silenciosamente durante la documentación. El flujo quedó activo tal como fue aprobado; las mejoras requieren una tarea de implementación y nuevas pruebas.

## Restaurar o reproducir sin tocar producción

1. Crear un escenario separado e inactivo. Importar el blueprint saneado, nunca sobre el escenario activo sin respaldo.
2. Crear un nuevo webhook y autenticación; reconectar las dos cuentas de servicio autorizadas.
3. Seleccionar una copia de la hoja con los encabezados A:S. Reemplazar `RECONNECT_PRIVATE_SPREADSHEET` en ambos módulos y revisar los mapeos.
4. Revisar el registro de configuración buscado por el módulo 11. No asumir que la búsqueda deja pasar datos si ese registro no existe. Para reproducir el comportamiento histórico, resolverlo explícitamente en la hoja de prueba; para mejorar el diseño, implementar deduplicación antes de correos.
5. Usar un entorno web y buzones de prueba autorizados. Nunca publicar la URL privada del webhook.
6. Ejecutar un caso normal y verificar fila, dos mensajes, logo, enlaces y consentimientos.
7. Probar duplicado, error parcial y recuperación **antes de afirmar** que esas garantías están resueltas.
8. Registrar la nueva versión, exportar, sanear y revisar diff. La importación y activación deben quedar como eventos distintos de Git.

## Operación segura

Revisar primero el run y sus módulos ante un problema. No pulsar `Replay` a ciegas: puede duplicar correos y registros. No borrar la fila de configuración ni filas de clientes para “limpiar” pruebas sin comprobar su función y tener autorización. Las credenciales se gestionan en Make; la política de retención y acceso a logs se administra fuera de este repositorio.
