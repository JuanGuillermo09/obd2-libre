# Cambios recientes

> Documento que resume las nuevas funcionalidades y correcciones agregadas al proyecto.

## Servidor único (API + sitio)

- El backend ahora sirve también los archivos estáticos del frontend, para desplegar todo en un solo servicio de Render.
- Se agregó el script `npm run build` en el backend: compila Angular y copia el resultado a `backend/dist/public`.
- Las rutas del sitio usan un fallback a `index.html` para que Angular enrute en el cliente, sin capturar las rutas `/api/*`.
- La información de la API se movió de `/` a `/api` para no tapar la raíz del sitio.
- En el frontend la URL de la API ahora es relativa en producción, por lo que funciona en cualquier dominio y puerto.
- En desarrollo sigue apuntando a `localhost:3000` cuando corre en el puerto 4200.
- `index.html` se sirve sin caché para que los deploys se vean al instante; los assets con hash se cachean un año.

## Reestructuración del backend

- El servidor Express se reorganizó en capas: `routes/`, `controllers/`, `services/`, `db/` y `middleware/`.
- `server.js` pasó de ~390 líneas a menos de 70: solo configura middlewares, monta rutas y arranca el proceso.
- Cada módulo se puede extender de forma aislada sin tocar el resto.
- Se centralizó el acceso a datos en `db/database.js`, que expone `query`, `run` y `save`.
- Se añadió middleware de errores para que ningún fallo sin manejar detenga el servidor.
- Se verificó que los 8 endpoints mantienen el mismo comportamiento y las mismas respuestas que antes.
- Sin cambios en el frontend ni en el contrato de la API.

## Integración de Wikipedia API

- Se reemplazó la integración de Google Custom Search API por Wikipedia API.
- La búsqueda se hace automáticamente al abrir la ficha de cada código.
- Los resultados aparecen **inline en la misma página**, sin abrir pestañas nuevas.
- **Sin API keys, sin Google Cloud, sin facturación.**
- Búsqueda con fallback: primero intenta con el código + nombre técnico, y si no hay resultados, busca solo "OBD2".
- Sección renombrada a "Más información en Wikipedia".

## Despliegue en Render

- Se creó `frontend/public/_redirects` con `/* /index.html 200` para que las rutas de Angular funcionen correctamente en Render.
- Backend como Web Service: Root Directory `backend`, Start Command `node api/server.js`.
- Frontend como Static Site: Build Command `npm install && npm run build -- --configuration production`, Publish Directory `dist/mecaopen/browser`.

## Fix de watermark

- El watermark "OBD2 Libre" se superponía con el contenido de las páginas.
- Se añadió `relative z-10` al `<main>` en `app.html` para que el contenido esté por encima del watermark.

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
