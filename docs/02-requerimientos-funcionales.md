# Requerimientos Funcionales

> **Proyecto:** OBD2 Libre (nombre provisional) · **Versión:** 1.0

**Prioridad (MoSCoW):** **M** = Debe tener (MVP) · **S** = Debería tener · **C** = Podría tener · **W** = No por ahora

---

## 1. Búsqueda y consulta de códigos

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-01 | El sistema debe permitir buscar un código DTC escribiéndolo (ej. `P0300`), sin distinguir mayúsculas/minúsculas. | M |
| RF-02 | El sistema debe mostrar sugerencias mientras el usuario escribe (búsqueda predictiva). | M |
| RF-03 | El sistema debe permitir buscar también por palabra clave en español (ej. "mezcla pobre", "fallo de encendido"). | S |
| RF-04 | El sistema debe mostrar un mensaje claro cuando un código no existe o aún no está documentado, con opción de sugerirlo. | M |
| RF-05 | El sistema debe permitir explorar los códigos por categoría: Motor/Transmisión (P), Carrocería (B), Chasis (C) y Red (U). | S |
| RF-06 | El sistema debe permitir filtrar por marca del vehículo. | S |

## 2. Ficha del código

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-07 | Cada código debe tener su propia página con URL única y legible (`/codigos/p0300`). | M |
| RF-08 | La ficha debe mostrar el **código** y el **nombre técnico** (fuente: lista base). | M |
| RF-09 | La ficha debe incluir la explicación **"en cristiano"**. | M |
| RF-10 | La ficha debe listar los **síntomas** típicos. | M |
| RF-11 | La ficha debe listar las **causas probables ordenadas por frecuencia**. | M |
| RF-12 | La ficha debe incluir **pasos de diagnóstico** sugeridos, en orden. | M |
| RF-13 | La ficha debe indicar la **gravedad** (baja, media, alta). | M |
| RF-14 | La ficha debe indicar si **se puede seguir manejando** (sí / con precaución / no). | M |
| RF-15 | La ficha debe mostrar el **estado de revisión** (`borrador` o `revisado`) y la fecha de última actualización. | M |
| RF-16 | La ficha debe mostrar un aviso de que la información es orientativa y no sustituye un diagnóstico profesional. | M |
| RF-17 | La ficha debe incluir una sección opcional **"En tu carro"** con causas comunes por marca/modelo. | S |
| RF-18 | La ficha debe enlazar a códigos relacionados (ej. P0301–P0306 desde P0300). | S |
| RF-19 | La ficha debe mostrar la atribución de la fuente de datos base, cuando aplique. | M |

## 3. Marcas y vehículos

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-20 | El sistema debe tener un catálogo de marcas, priorizando las más comunes en Colombia. | S |
| RF-21 | El sistema debe mostrar códigos específicos de fabricante cuando existan para la marca elegida. | C |
| RF-22 | El sistema debe incluir una guía sobre qué vehículos son compatibles con OBD2 y qué escáner usar (carros anteriores a ~2008 pueden diferir). | S |

## 4. Comunidad y contribuciones

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-23 | Cualquier persona debe poder **sugerir una corrección** o un código faltante sin crear cuenta (formulario o enlace a GitHub). | M |
| RF-24 | Las sugerencias deben pasar por **moderación** antes de publicarse. | M |
| RF-25 | Los revisores (mecánicos) deben poder marcar una ficha como `revisado` y quedar registrado quién y cuándo. | S |
| RF-26 | La ficha podría mostrar cuántos mecánicos la validaron. | C |
| RF-27 | Los usuarios podrían votar si una ficha les fue útil. | C |

## 5. Contenido y administración

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-28 | El contenido debe almacenarse en un formato estructurado y versionado (ej. JSON o base de datos), con una plantilla fija por ficha. | M |
| RF-29 | Debe existir un proceso para importar la lista base de códigos (código + nombre técnico) desde una fuente con licencia compatible. | M |
| RF-30 | Debe existir un proceso para validar que cada ficha cumple la plantilla antes de publicarse. | S |
| RF-31 | El administrador debe poder crear, editar, ocultar y cambiar el estado de una ficha. | S |
| RF-32 | El sitio debe generar automáticamente el mapa del sitio (`sitemap.xml`). | M |

## 6. Páginas informativas

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-33 | El sitio debe incluir página de **Acerca de** (propósito, quién lo hace). | M |
| RF-34 | El sitio debe incluir **aviso legal y descargo de responsabilidad**. | M |
| RF-35 | El sitio debe incluir página de **créditos y licencias** (fuentes de datos y autores). | M |
| RF-36 | El sitio debe incluir una página de **Cómo contribuir**. | S |
| RF-37 | El sitio debe incluir un botón discreto de **donación voluntaria** (Ko-fi o PayPal). | S |

## 7. Fuera de alcance (W)

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-38 | Cuentas de usuario, historial de consultas y favoritos. | W |
| RF-39 | Conexión con escáner OBD2 por Bluetooth para leer códigos directamente. | W |
| RF-40 | Aplicación móvil nativa (iOS/Android). | W |
| RF-41 | Estimación de costos de reparación. | W |
