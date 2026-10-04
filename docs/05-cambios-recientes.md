# Cambios recientes

> Documento que resume las nuevas funcionalidades y correcciones agregadas al proyecto.

## Integración de Google Custom Search

- Se añadió Google Custom Search API para mostrar resultados de la web directamente en la ficha de cada código (`codigo.html`).
- Se mostró un botón "Buscar en Google" que ahora es reemplazado por la integración en la misma página.

## Login de administrador

- En `/sugerencias` se creó una sección de acceso para administradores.
- Credenciales demo: **soporte@obd2libre.com / admin123**.
- Después de iniciar sesión, el administrador puede cambiar el estado y responder a cada sugerencia.

## Actualización de estados y respuestas

- Los estados de sugerencias ahora son más descriptivos: `pendiente`, `en_desarrollo`, `terminada`, `rechazada`.
- Se agregó la posibilidad de escribir una respuesta oficial dentro de cada sugerencia.
- Se persistieron estos campos en la base de datos (nuevo endpoint `PUT /api/sugerencias/:id`).

## Paginación en sugerencias

- La tabla de sugerencias en `/sugerencias` ahora tiene paginación.
- Cambio visible cuando hay más de 15 registros.

## Cambio de arquitectura Angular 22

- Se ajustaron todos los componentes para usar standalone components.
- Los archivos se separaron en `.ts`, `.html` y `.css`.
- Se renombraron los archivos a la nueva convención: `home.ts`, `codigo.ts`, etc., sin el sufijo `.component`.

## Renderizado de Angular

- Se aplicó `ChangeDetectorRef.detectChanges()` en los componentes que cargan datos desde HTTP para forzar la actualización de la vista.
- Esto resolvió el problema de que los datos no aparecieran sin hacer clic.
