# Correo del dominio — SPF, DKIM y DMARC

[Volver al README](../README.md) · Dominio: `cuarentamas.com` · Corte: 2026-09-02.

## Evolución verificada

El 31 de agosto se encontraron MX, SPF y DMARC publicados, pero faltaban los selectores DKIM. El 2 de septiembre se publicaron ambos CNAME en GoDaddy y se habilitó DKIM en Microsoft 365. El panel informó que se estaban aplicando firmas DKIM al dominio.

| Control | Estado al corte | Referencia pública / evidencia |
| --- | --- | --- |
| MX | Existente en auditoría inicial | `cuarentamas-com.mail.protection.outlook.com` |
| SPF | Existente; sin cambios en este trabajo | `v=spf1 include:secureserver.net -all` |
| DMARC | Existente; sin cambios en este trabajo | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` |
| DNS | GoDaddy | `ns63.domaincontrol.com`, `ns64.domaincontrol.com` |
| DKIM | CNAME publicados y firma habilitada | Resolución DNS y panel Microsoft Defender comprobados durante la configuración |
| Remitente Make | Microsoft 365 Outlook | `contacto@cuarentamas.com`; dos mensajes recibidos en pruebas |

Los registros MX/SPF/DMARC anteriores son el registro de la auditoría inicial, no una promesa de que nunca cambien. No se creó un segundo SPF ni se sustituyeron políticas durante la activación DKIM.

## Registros DKIM aplicados

| Tipo | Nombre | Destino exacto mostrado por Microsoft |
| --- | --- | --- |
| CNAME | `selector1._domainkey` | `selector1-cuarentamas-com._domainkey.NETORGFT19853967.k-v1.dkim.mail.microsoft` |
| CNAME | `selector2._domainkey` | `selector2-cuarentamas-com._domainkey.NETORGFT19853967.k-v1.dkim.mail.microsoft` |

Estos son destinos DNS públicos, no claves privadas. Reemplazan los ejemplos orientativos que tenía la guía anterior. Para otro tenant se deben usar sus propios valores, nunca copiarlos automáticamente.

Panel utilizado: [Microsoft Defender — DKIM](https://security.microsoft.com/authentication?viewid=DKIM). La administración de DNS se hizo en GoDaddy con el propietario completando las verificaciones de acceso necesarias.

## Qué acredita la prueba

Se observaron el estado habilitado, la resolución de selectores y la recepción de emails de Make. El usuario aprobó el contenido, logo y botones.

**No se conserva en Git una cabecera de correo que demuestre `spf=pass`, `dkim=pass` y `dmarc=pass` para un destinatario externo.** La recepción y el switch habilitado no sustituyen esa comprobación. No se garantiza entrega en bandeja principal ni ausencia de spam en todos los proveedores.

## Mantenimiento

1. Si cambia proveedor o tenant, obtener nuevos registros desde su panel; coordinar DNS sin duplicar SPF ni eliminar registros de la web.
2. Tras rotación, revisar ambos selectores y un mensaje nuevo en un buzón controlado externo; inspeccionar `Authentication-Results`.
3. Si cambian remitente o permisos, revisar las conexiones de los módulos 9 y 10 en Make.
4. Comprobar logo y enlaces con un correo nuevo. Un mensaje antiguo no se reescribe al guardar una plantilla.
5. Guardar solo un resumen saneado de la prueba en [VERIFICACION](VERIFICACION.md), nunca el mensaje completo con cabeceras, IDs o datos privados innecesarios.

El tamaño del logo y la descarga del PDF no dependen de DKIM. Se corrigieron en el HTML y en las respuestas del hosting, respectivamente.
