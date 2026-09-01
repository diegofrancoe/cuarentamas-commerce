# Correo del dominio: SPF, DKIM y DMARC

Auditoría realizada el 31 de agosto de 2026 para `cuarentamas.com`.

## Estado encontrado

| Control | Estado | Registro observado |
| --- | --- | --- |
| MX | Activo | `cuarentamas-com.mail.protection.outlook.com` |
| SPF | Activo | `v=spf1 include:secureserver.net -all` |
| DMARC | Activo | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` |
| DKIM | Pendiente | No se encontraron los selectores habituales `selector1` y `selector2` publicados. |
| DNS | GoDaddy | `ns63.domaincontrol.com` y `ns64.domaincontrol.com` |

SPF y DMARC ya están publicados. No se debe crear un segundo registro SPF: si cambia el proveedor de envío, su autorización se agrega al registro existente.

## Activar DKIM

1. Entrar al centro de administración de Microsoft 365 o al panel de correo de GoDaddy asociado a `cuarentamas.com`.
2. Abrir la configuración de DKIM del dominio y copiar los dos destinos CNAME exactos que muestre el proveedor.
3. Crear en el DNS de GoDaddy los registros para `selector1._domainkey` y `selector2._domainkey` con esos destinos.
4. Esperar la propagación y activar la firma DKIM en el panel de correo.
5. Enviar un correo de prueba desde la cuenta que usará Make y comprobar en los encabezados que SPF, DKIM y DMARC aparezcan como `pass`.

Por la forma del tenant actual, los destinos pueden parecerse a:

- `selector1-cuarentamas-com._domainkey.NETORGFT19853967.onmicrosoft.com`
- `selector2-cuarentamas-com._domainkey.NETORGFT19853967.onmicrosoft.com`

Estos valores son una referencia de formato. Hay que usar exactamente los que entregue el panel de Microsoft 365 antes de publicarlos.

## Decisión necesaria para Make

La opción más simple es que Make envíe desde una cuenta real de `@cuarentamas.com` mediante el conector de Microsoft 365/Outlook. Si se elige otro proveedor de correo, primero se deben añadir sus registros de autenticación y actualizar el SPF existente sin duplicarlo.

No se deben guardar contraseñas, tokens o claves de correo en el repositorio. Esas credenciales se configuran únicamente en Make y en Vercel.
