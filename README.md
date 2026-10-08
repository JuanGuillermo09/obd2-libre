# OBD2 Libre

Códigos de falla de carros explicados en español, sin tecnicismos y gratis.

**Sitio en vivo:** https://obd2-libre.onrender.com

> OBD2 Libre es un nombre provisional. Si ves otro en el repo, es que ya lo cambié.

## Por qué hago esto

Cuando uno escanea un carro y sale un P0300 o un P0420, lo normal es terminar en una página en inglés, con una explicación que no dice nada, o en un software que cobra mensualidad solo para decirte qué significa el código. Y los que más lo necesitan, mecánicos independientes, estudiantes y gente que solo quiere saber si puede seguir manejando, no siempre tienen cómo pagarlo.

Quiero que cualquiera pueda entrar desde el celular, escribir el código y leer qué significa, qué lo causa normalmente y qué revisar primero. Sin registrarse, sin pagar y sin avisos encima de todo.

## Estructura del proyecto

```
MecaOpen/
├── backend/              # API Node.js + datos
│   ├── api/              # Servidor Express (arquitectura modular)
│   │   ├── server.js     # Punto de entrada
│   │   ├── routes/       # Endpoints agrupados por módulo
│   │   ├── controllers/  # Traducen HTTP a llamadas de servicio
│   │   ├── services/     # Lógica de negocio
│   │   ├── db/           # Acceso a datos (sql.js)
│   │   └── middleware/   # Manejo de errores
│   ├── scripts/          # Importación y validación
│   ├── data/             # Base de datos y datos fuente
│   │   ├── source-data/  # Archivos originales (solo lectura)
│   │   └── mecaopen.db   # Base de datos SQLite
│   ├── node_modules/     # Dependencias del backend
│   └── package.json
├── frontend/             # Aplicación Angular 22
│   ├── public/           # Archivos estáticos (logos, favicon)
│   ├── src/              # Código fuente
│   │   ├── app/          # Componentes standalone (.ts + .html + .css)
│   │   │   ├── pages/    # Páginas: home, codigo, codigos, buscar...
│   │   │   └── services/ # Servicio de API (HTTP)
│   │   └── main.ts
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── docs/                 # Documentación del proyecto
└── README.md
```

## Cómo correrlo

### Backend

```bash
cd backend
npm install
npm run import    # Importa los códigos desde data/source-data/
npm run dev       # Levanta la API en http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev       # Levanta el sitio en http://localhost:4200
```

### Atajo para levantar ambos

```bash
node start.js
```

## Lo que va a tener cada ficha

- Qué significa el código, dicho de forma sencilla.
- Síntomas que se suelen notar.
- Causas probables, de la más común a la menos común.
- Pasos para revisar, en orden.
- Qué tan grave es y si se puede seguir manejando.
- Si la ficha ya la revisó un mecánico o todavía es borrador.
- Resultados de Wikipedia en la misma página (búsqueda automática al abrir la ficha).

## Con qué lo estoy construyendo

- **Frontend:** Angular 22, con renderizado en servidor para que las páginas salgan en Google.
- **Backend:** Node.js + Express, con arquitectura modular por capas.
- **Base de datos:** SQLite (via sql.js).
- **Estilos:** Tailwind CSS v4, pensando primero en pantallas de celular.
- **Búsqueda en la web:** Wikipedia API integrada en la ficha de cada código (sin API key, con fallback a búsqueda genérica).

## Despliegue

El proyecto está desplegado en **Render** como un único servicio web. El backend sirve
la API y también el sitio compilado, así que todo vive en un solo dominio.

- **Servicio:** Web Service conectado al repositorio, rama `main`
- **URL:** `https://obd2-libre.onrender.com` (mismo origen para el sitio y la API)
- **Plan:** Free

El código nunca se despliega precompilado: Render clona el repo y construye el frontend
en cada despliegue. Las carpetas `dist/` y `node_modules/` están en `.gitignore`.

### Configuración en Render

| Campo | Valor |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

El `npm run build` compila Angular y copia el sitio a `backend/dist/public`, que es
la carpeta que el servidor lee.

### Variables de entorno

| Variable | Valor | Para qué |
|---|---|---|
| `PORT` | lo asigna Render | Puerto de escucha |
| `STATIC_DIR` | *(opcional)* | Ruta alterna del build del frontend |

### Limitaciones del plan Free

Dos cosas a tener en cuenta mientras el servicio esté en el plan gratuito:

- **Arranque en frío:** el servicio se apaga tras 15 minutos sin tráfico. La primera
  visita después de eso tarda unos 50 segundos en despertarlo.
- **Disco efímero:** los cambios en archivos se pierden al redesplegar. Los 18,000+
  códigos no se pierden (vienen del repo y solo se leen), pero **las sugerencias
  enviadas por los usuarios sí se borran**. Para conservarlas hace falta un disco
  persistente (de pago) o una base de datos externa.

### Endpoints

- `/api/*` → API REST
- `/` y cualquier otra ruta → el sitio (Angular enruta en el cliente)

Las URLs de la API son relativas en producción, así que el mismo dominio sirve todo.

## Arquitectura del backend

El backend sigue una separación de responsabilidades en capas. Cada capa hace una sola cosa:

```
Petición HTTP
    ↓
routes/       → define qué URL responde a qué método (GET, POST...)
    ↓
controllers/  → validan la entrada y arman la respuesta HTTP
    ↓
services/     → contienen la lógica de negocio
    ↓
db/           → ejecuta las consultas y guarda los cambios
```

**Agregar un endpoint nuevo** es un proceso de cuatro pasos:

1. Escribir la función en `services/` con la lógica.
2. Exponerla en `controllers/` como un manejador de `req` y `res`.
3. Registrar la ruta en el archivo de `routes/` correspondiente.
4. Si es un módulo nuevo, montar su router en `routes/index.js`.

El servidor se mantiene corto: `server.js` solo configura middlewares, monta las rutas y arranca el proceso.

**Manejo de errores:** los controladores capturan los errores de los servicios y los traducen a respuestas con código HTTP (400, 404, 500). Lo que no se capture pasa a `middleware/errorHandler.js`, que evita que el proceso se caiga.

**Archivos actuales:**

| Capa | Archivos |
|---|---|
| `routes/` | `codigos.js`, `buscar.js`, `metadatos.js`, `sugerencias.js`, `web.js`, `index.js` |
| `controllers/` | `codigosController.js`, `sugerenciasController.js`, `webController.js` |
| `services/` | `codigosService.js`, `sugerenciasService.js`, `webService.js` |
| `db/` | `database.js` |
| `middleware/` | `errorHandler.js` |

## Cómo ayudar

Me sirve mucho:

- **Mecánicos:** que lean fichas y me digan qué está mal o qué falta. No tienen que escribir nada, con que marquen errores ya ayudan.
- **Gente con experiencia en una marca:** que cuente qué fallas se ven más seguido en ese carro, con sus propias palabras.
- **Desarrolladores:** issues y pull requests son bienvenidos.

Una regla importante: **no copien textos de manuales de servicio ni de otras páginas.** Escriban con sus palabras. Los manuales tienen derechos de autor y no quiero que el proyecto se meta en problemas por eso.

## Aviso

La información de este proyecto es orientativa. Sirve para entender qué puede estar pasando, pero no reemplaza un diagnóstico de un mecánico, y menos si se trata de frenos, dirección, bolsas de aire o cualquier cosa que afecte la seguridad. Úsala bajo tu propia responsabilidad.

Algunas fichas pueden tener errores o estar en borrador. Cada una indica si ya fue revisada.

## Créditos y licencias

La lista de códigos y sus nombres técnicos en inglés salen de [Wal33D/dtc-database](https://github.com/Wal33D/dtc-database), de Waleed Judah, publicado con licencia MIT. Mil gracias por compartirlo.

Las explicaciones en español, los síntomas, las causas y los pasos de diagnóstico son escritos por este proyecto.

Licencia del código y del contenido: *por definir*. Voy a decidirla antes de publicar y la dejo en el archivo `LICENSE`.

## Últimos cambios

- Backend reestructurado en capas (`routes/`, `controllers/`, `services/`, `db/`, `middleware/`).
- Integración de Wikipedia API en cada ficha (resultados inline, sin API key).
- Página `/sugerencias` con listado de contribuciones y paginación.
- Login de administrador en `/sugerencias` (demo: `soporte@obd2libre.com` / `admin123`).
- Estados de sugerencia: `pendiente`, `en_desarrollo`, `terminada`, `rechazada`.
- Fix de renderizado: `ChangeDetectorRef` en todos los componentes HTTP.
- Archivos de componentes separados en `.ts` + `.html` + `.css`.
- Renombrado de archivos Angular a convención sin `.component`.
- Fix de watermark: el contenido principal ahora tiene `z-index` superior.
- Archivo `_redirects` para despliegue en Render (SPA routing).
