# Historia, decisiones y trazabilidad

[Volver al README](../README.md) · Corte: 2026-09-02, America/Bogota.

## Alcance de la reconstrucción

La historia combina commits de este repositorio, configuración exportada de Make, pruebas observadas en esta sesión y decisiones aprobadas por el responsable. Los archivos iniciales fueron importados de un proyecto previo: el commit inicial no demuestra la fecha original de creación de cada parte. No se reconstruyen hechos anteriores sin evidencia.

## Línea de tiempo del código

| Fecha | Commit | Hito |
| --- | --- | --- |
| 2026-08-14 | [`d307c97`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/d307c97) | Repositorio separado: React/Vite, carrito, Three.js, adaptador Tiendanube y membresía/n8n |
| 2026-08-26 | [`f170cb1`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/f170cb1) | Rediseño comercial y transición del recorrido de compra hacia WhatsApp |
| 2026-08-26 | [`551b877`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/551b877) | Organización de recursos del rediseño |
| 2026-08-27 | [`b2a803a`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/b2a803a) | Iteración de hero con producto 3D y animación editorial; hito histórico, no descripción del runtime actual |
| 2026-08-28 | [`76cc81f`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/76cc81f) | Identidad visual y experiencia de compra |
| 2026-08-28 | [`69616ae`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/69616ae) | Recursos visuales editoriales |
| 2026-08-31 | [`a67eafe`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/a67eafe) | Formulario, API, Turnstile, e-book, consentimiento Meta, páginas legales, cabeceras y cierre de rutas heredadas |
| 2026-09-01 | [`273369c`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/273369c) | Refinamiento visual y envío del token privado de Make mediante `x-make-apikey` |
| 2026-09-02 | [`5a517de`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/5a517de) | Producto del hero clicable y respuesta de descarga para el PDF |
| 2026-09-02 | [`7899c2f`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/7899c2f) | Ajustes de tipografía móvil, desbordamientos y flechas decorativas en botones |
| 2026-09-02 | [`1879076`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/1879076) | Normalización del nombre cuarentamas |
| 2026-09-02 | [`addb865`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/addb865) | Commit vacío para disparar despliegue después de corregir conexión de Vercel |
| 2026-09-02 | [`a068b60`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/a068b60) | Logo estable de email y permiso de carga entre sitios limitado a `/email/` |

Las eliminaciones de componentes, imágenes y video del diseño anterior siguen recuperables en Git. Esta documentación no vuelve a incluir archivos obsoletos en producción.

## Cambios externos a Git

| Momento | Sistema | Cambio y evidencia |
| --- | --- | --- |
| 1 de septiembre | Drive / Make | Creación del archivo nativo de Sheets y registro de la migración pendiente desde Excel en la documentación de continuidad |
| 2 de septiembre | Make | Sustitución de los dos módulos Excel por Sheets; mapeo de experiencias; envío interno y al cliente mediante Outlook |
| 2 de septiembre | Correo | Iteraciones de texto, botones compactos, tono neutro y marca; se conservó el aviso interno aprobado |
| 2 de septiembre | GoDaddy / Microsoft 365 | Publicación de ambos CNAME y habilitación DKIM del dominio |
| 2 de septiembre | Vercel | Corrección del repositorio vinculado y Root Directory; despliegue del sitio actualizado |
| 2 de septiembre, 19:14:51 | Make | Ejecución manual exitosa sobre envío real del formulario público: 5 operaciones |
| 2 de septiembre, 19:27:26 | Make | Replay con logo corregido: 5 operaciones; fila 9 reportada por Sheets; dos correos recibidos |
| Después de esa prueba | Make | Escenario activado; estado `Active` comprobado nuevamente durante esta documentación |
| Cierre de validación | Responsable de marca | Confirmó que la marca se ve bien y funcionan descarga y acceso al producto |

## Decisiones de solución

### 1. WhatsApp reemplaza el cierre con Tiendanube

La versión inicial contenía autorización OAuth, consulta de productos y creación de órdenes preliminares mediante `draft_orders`. El código solicitaba una URL de checkout, no implementaba por sí mismo un procesador de pagos.

El recorrido actual prepara el pedido por WhatsApp. Se retiró Tiendanube de la interfaz; quedan `api/tiendanube-checkout.js` y rutas locales protegidas por banderas `ENABLE_TIENDANUBE_CHECKOUT` y `ENABLE_TIENDANUBE_ADMIN_ROUTES`, ambas desactivadas por defecto. No hay evidencia aquí de un pago histórico completado ni de revocación externa de todas las credenciales. Reactivarlo exige otro alcance, credenciales y pruebas; no basta con encender las banderas.

### 2. Experiencias y Make reemplazan membresía/n8n

El commit inicial incluía `MembresiaPage.jsx`, `/api/membresia-contacto` y configuración de webhook n8n. La versión actual ofrece `/comparte-tu-experiencia` y `/api/experiencia`; la API de membresía fue eliminada. El archivo `src/config/siteConfig.js` y la variable `VITE_ENABLE_MEMBRESIA` son vestigios sin ruta pública activa. No se interpreta su presencia como una membresía operativa.

### 3. Sheets conserva el registro; Vercel distribuye el e-book

La hoja es un archivo de Drive. No se añadió un módulo Drive al escenario ni se usa un enlace de Drive para el PDF. El enlace público de Vercel evita depender de permisos de visualización de un archivo compartido. A cambio, el PDF no está restringido a quien rellena el formulario.

### 4. Correo iterado con aprobación humana

Se aprobó el agradecimiento por el aporte a la comunidad, el regalo Ritual 40+ y el CTA al producto. Se redujeron botones y logo; se mantuvo el texto neutral. Los tamaños finales y ambos HTML están versionados en [automation/emails](automation/emails/README.md). No se agregó el PDF como adjunto.

### 5. Se corrigió una divergencia entre Git y producción

El proyecto Vercel estaba vinculado a `diegofrancoe/portfolio` con raíz `projects/cuarentamas`, mientras el código vigente estaba en `diegofrancoe/cuarentamas-commerce`. Se conectó este repositorio y se dejó la raíz vacía. `addb865` disparó un nuevo despliegue. Esto explica por qué actualizar código no bastaba para corregir los enlaces públicos.

### 6. Logo compatible con correo sin abrir todos los recursos

Después del despliegue, el logo aún fallaba en Outlook. La respuesta tenía CORP `same-site`; la corrección cambió a un archivo estable `/email/logo-40plus.jpg` con `cross-origin` solo para esa carpeta. La causa se diagnosticó a partir de cabeceras y comportamiento, no mediante una captura de red exhaustiva de todos los clientes. El resultado final se observó en Outlook y lo aprobó el usuario.

## ¿Está en main? ¿Hubo merge?

Antes de documentar, ambas ramas remotas apuntaban al mismo commit completo:

```text
origin/main                      a068b6069bd3d1fe194588dca5f0292ef55627bf
origin/codex/cuarentamas-work     a068b6069bd3d1fe194588dca5f0292ef55627bf
```

La incorporación fue **fast-forward / avance directo**: los cambios sí estaban en `main`, pero no hubo un PR ni un commit de merge separado. La consulta de PR del repositorio devolvió cero resultados y el historial no contenía commits de merge. La rama local `main` todavía apuntaba a `d307c97`; era una referencia local atrasada, no el estado de GitHub.

Para esta entrega documental se conserva el historial, sin reescribir commits ni simular PR anteriores. El commit de documentación y las referencias remotas del cierre son la evidencia de su publicación; consultar `git log` y `git ls-remote --heads origin` para el estado posterior al corte.

## Aprendizajes y próximos pasos

La presentación visual de un escenario no garantiza su orden lógico. El blueprint mostró correos antes del registro, una búsqueda de configuración en vez de deduplicación y estados aún no actualizados. Se documentaron como deuda técnica sin cambiar el escenario aprobado durante la tarea documental. [Backlog verificable](VERIFICACION.md).

El valor del caso de estudio es conectar sistemas y resolver fricciones reales con validación humana, conservando los límites de evidencia: no afirmar pagos, métricas, garantías de entrega o capacidades de IA que el proyecto no demuestra.
