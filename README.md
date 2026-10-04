# OBD2 Libre

Códigos de falla de carros explicados en español, sin tecnicismos y gratis.

> OBD2 Libre es un nombre provisional. Si ves otro en el repo, es que ya lo cambié.

## Por qué hago esto

Cuando uno escanea un carro y sale un P0300 o un P0420, lo normal es terminar en una página en inglés, con una explicación que no dice nada, o en un software que cobra mensualidad solo para decirte qué significa el código. Y los que más lo necesitan, mecánicos independientes, estudiantes y gente que solo quiere saber si puede seguir manejando, no siempre tienen cómo pagarlo.

Quiero que cualquiera pueda entrar desde el celular, escribir el código y leer qué significa, qué lo causa normalmente y qué revisar primero. Sin registrarse, sin pagar y sin avisos encima de todo.

## Estructura del proyecto

```
MecaOpen/
├── backend/              # API Node.js + datos
│   ├── api/              # Servidor Express
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
- Resultados de Google en la misma página.

## Con qué lo estoy construyendo

- **Frontend:** Angular 22, con renderizado en servidor para que las páginas salgan en Google.
- **Backend:** Node.js + Express.
- **Base de datos:** SQLite (via sql.js).
- **Estilos:** Tailwind CSS v4, pensando primero en pantallas de celular.
- **Búsqueda en la web:** Google Custom Search API integrada en la ficha de cada código.

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

- Integración de Google Custom Search API en cada ficha.
- Página `/sugerencias` con listado de contribuciones y paginación.
- Login de administrador en `/sugerencias` (demo: `soporte@obd2libre.com` / `admin123`).
- Estados de sugerencia: `pendiente`, `en_desarrollo`, `terminada`, `rechazada`.
- Fix de renderizado: `ChangeDetectorRef` en todos los componentes HTTP.
- Archivos de componentes separados en `.ts` + `.html` + `.css`.
- Renombrado de archivos Angular a convención sin `.component`.
