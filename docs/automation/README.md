# Artefactos de automatización

[Guía principal de Make](../MAKE.md).

Esta carpeta conserva el estado observado del escenario, no datos de clientes ni una nueva implementación. El blueprint procede de **Export blueprint** de Make; no se construyó deduciendo módulos desde un dibujo.

## Saneamiento aplicado

- `parameters.hook`: sustituido por `null`.
- `parameters.__IMTCONN__`: sustituido por `null` en los cuatro módulos conectados.
- `mapper.spreadsheetId`: sustituido por `RECONNECT_PRIVATE_SPREADSHEET`.
- Metadatos de cada módulo: se conservaron solamente las coordenadas `designer`; se retiraron datos de restauración asociados a cuentas y recursos.
- Se conservaron orden `flow`, IDs de módulo, versiones, mapeos, filtros, contenido HTML y metadatos del escenario para que los límites actuales sean visibles.

No se han importado estos archivos en otro escenario. No activar una copia sin reconfigurar webhook, conexiones, hoja y destinatarios. Los placeholders no son secretos ni recursos válidos.

## Actualización futura

1. Exportar el escenario aprobado desde Make y guardar el original en almacenamiento privado del operador, fuera del repositorio.
2. Revisar localmente campos, metadatos, credenciales, URLs de webhook, IDs de recursos y posibles datos de ejemplo; sanear antes de añadir a Git.
3. Conservar los cambios de lógica reales: no “corregir” filtros o estados solo en la copia documental.
4. Actualizar las dos plantillas a partir del campo `mapper.content`, el contrato si cambió y la lista de encabezados.
5. Registrar nueva prueba, actualizar hashes de `docs/verification-baseline.json` y ejecutar `node scripts/verify-project-docs.mjs`.
6. Revisar el diff y hacer commit. Ni Git ni estos archivos actualizan por sí solos el escenario externo.

El export original de esta entrega quedó en Descargas del equipo del operador; no se subió a GitHub. Este repositorio no contiene tokens ni IDs privados de las conexiones exportadas.
