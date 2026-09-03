# Verificación, evidencia y límites

[Volver al README](../README.md) · Corte: 2026-09-02 · Horas de operación: America/Bogota (UTC−5).

Este registro distingue pruebas observadas, aprobación del responsable y lectura de configuración. No publica bundles, testimonios, direcciones, IPs ni capturas de buzones privados.

## Evidencia del flujo aprobado

| ID | Prueba / fuente | Resultado y alcance |
| --- | --- | --- |
| E01 | Formulario público, 2 de septiembre | Envío con datos de prueba, consentimiento y Turnstile; interfaz mostró confirmación |
| E02 | [Make 19:14:51](https://us2.make.com/1690555/scenarios/6121732/logs/52dae70cdf6c4a6bab763182dc5de17c) | Ejecución manual con datos del formulario; `Success`, 3 segundos, 5 operaciones, 5 créditos |
| E03 | [Make 19:27:26](https://us2.make.com/1690555/scenarios/6121732/logs/9e5f40a45e97496fac62bcf526bab251) | Replay controlado de E02 para verificar logo; `Success`, 1 segundo, 5 operaciones, 5 créditos |
| E04 | Salida de Google Sheets, módulo 12, E03 | `Table Range: Experiencias!A1:S8`; `Row Number: 9`; escritura confirmada por el conector |
| E05 | Outlook, mensajes de las 19:27 | Se observaron aviso interno y correo al cliente en el buzón controlado de la marca; logo visible |
| E06 | Descarga HTTP del enlace usado por el email | HTTP 200, `application/pdf`, archivo identificado como PDF, 6.606.435 bytes, cabecera de descarga correcta |
| E07 | Producto público | Ruta directa cargó la ficha `Colágeno Hidrolizado 40+` |
| E08 | Confirmación explícita del responsable | Aprobó visual de marca y confirmó que los botones descargan el e-book y llevan al producto |
| E09 | Make / panel e historial | Escenario `Active`, activación posterior a la prueba; estado reconfirmado durante documentación |
| E10 | Microsoft / GoDaddy durante configuración | CNAME DKIM resueltos y firma del dominio habilitada en panel |
| E11 | Git remoto | `main` y `codex/cuarentamas-work` en `a068b60` antes de esta entrega; sin PR ni commit merge anterior |
| E12 | Exportación Make durante documentación | Blueprint real de cinco módulos, plantillas finales y mapeos de Sheets saneados y versionados |

Los enlaces Make requieren acceso del operador y su retención depende del servicio; el resumen saneado permanece en Git. E02/E03 fueron pruebas controladas/manuales, no una medición de carga ni prueba de una ejecución automática nueva posterior a la activación.

## Integridad de archivos aprobados

SHA-256 al corte; [manifest legible por máquina](verification-baseline.json):

| Archivo | SHA-256 |
| --- | --- |
| `public/email/logo-40plus.jpg` | `564112d294c350aecebd8dbd387f29a3a4ef7f0cd6b08dfa6f134e0458c619bb` |
| `public/downloads/ebook-ritual-40.pdf` | `b4ad45691d44f048f7996dfcdc5277e6c64c738d54188afc6dc8bc258610ec31` |
| `docs/automation/make.blueprint.sanitized.json` | `f37cda1050cef816880760462430ea9c2cc51dabdfb0be450824fb9090ae82cc` |

Los hashes identifican versiones, no sustituyen una revisión de contenido o derechos.

## Comprobaciones locales de esta entrega

- `npm run lint`: ejecutado sin errores.
- `npm run build`: ejecutado correctamente; Vite generó la aplicación de producción.
- `node scripts/verify-project-docs.mjs`: verifica enlaces locales, coherencia de blueprint/plantillas, estructura de ejemplo y hashes; ejecutar nuevamente al editar estos artefactos.
- `git diff --check`: revisión de whitespace antes de publicar.

La verificación documental no importa Make, no envía formularios, no autentica cuentas externas y no valida todos los casos de negocio. No existe una suite end-to-end automatizada completa en esta entrega.

## Backlog técnico priorizado

| Prioridad | Pendiente | Criterio para cerrarlo |
| --- | --- | --- |
| Alta | Deduplicación real y orden del escenario | Buscar por `submissionId` antes de efectos; repetir mismo ID sin nuevo correo ni fila |
| Alta | Estados y recuperación parcial | Persistir resultado por correo, fechas y error; reintentar el paso fallido sin repetir lo completado |
| Alta | Tratamiento de texto no confiable | Revisar escritura `RAW` frente a `USER_ENTERED` y escape HTML; probar caracteres especiales y entradas tipo fórmula en entorno aislado |
| Media | Revisión operativa de accesos y retención | Definir quién accede a Sheets/logs, tiempo de retención y respuesta a errores; `dlq` está desactivado |
| Media | Verificación automática posterior a activación | Un formulario nuevo, controlado, dispara ejecución instantánea y conserva fila y dos entregas |
| Media | Autenticación de correo extremo a extremo | Conservar resumen saneado de `Authentication-Results` con SPF/DKIM/DMARC en mensaje externo nuevo |
| Media | Recorrido comercial completo | Probar carrito móvil/escritorio, ambos envíos, mensaje WhatsApp y operación humana; pago/despacho no certificados |
| Media | Medición Meta | Confirmar permisos de tráfico y eventos en administrador; no se validaron campañas ni conversiones de compra |
| Media | Rate limiting global | Estado compartido y prueba de comportamiento entre instancias si crece el tráfico |
| Baja | Reducir deuda heredada | Revisar dependencia Three.js, vestigio de membresía y duplicación de configuración sin borrar historia |
| Baja | Calidad continua | Añadir pruebas unitarias/e2e y procedimiento por PR; no inventar un CI que no existe |

## Lo que no se afirma

No se certifican todas las combinaciones de móviles o clientes de correo, accesibilidad WCAG completa, pruebas de carga, auditoría legal o seguridad exhaustiva, importación del blueprint saneado, pagos Tiendanube históricos, envío de un pedido real ni incremento de ventas. Las pruebas funcionales aprobadas se limitan a lo descrito arriba.

La aprobación de la marca y los botones es válida, pero no elimina los pendientes operativos identificados después al exportar Make. Se corrigió la documentación en vez de ocultarlos bajo una afirmación de “todo listo”.
