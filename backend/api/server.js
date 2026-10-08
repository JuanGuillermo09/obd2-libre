/**
 * API de OBD2 Libre
 *
 * Punto de entrada del servidor Express.
 *
 * Estructura modular:
 *   routes/       → define los endpoints
 *   controllers/  → traducen HTTP a llamadas de servicio
 *   services/     → contienen la lógica de negocio
 *   db/           → acceso a datos
 *   middleware/   → manejo de errores
 *
 * Uso: node api/server.js
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { initDB } = require('./db/database');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Carpeta con el build del frontend.
 *
 * El script `npm run build` compila Angular y deja el sitio en
 * backend/dist/public para que un solo proceso sirva la API y el sitio
 * (despliegue en un único servicio). Se puede sobreescribir con STATIC_DIR.
 */
const STATIC_DIR = process.env.STATIC_DIR
  ? path.resolve(process.env.STATIC_DIR)
  : path.join(__dirname, '..', 'dist', 'public');

// ─── Middleware global ────────────────────────────────────────

app.use(cors());
app.use(express.json());

// ─── Información de la API ────────────────────────────────────
//
// Va en /api para no tapar la raíz del sitio, que debe servir index.html.

function apiInfo(req, res) {
  res.json({
    nombre: 'OBD2 Libre API',
    version: '1.0.0',
    descripcion: 'Códigos de falla OBD2 explicados en español',
    endpoints: {
      codigos: 'GET /api/codigos',
      codigo: 'GET /api/codigos/:codigo',
      buscar: 'GET /api/buscar?q=texto',
      categorias: 'GET /api/categorias',
      marcas: 'GET /api/marcas',
      buscarWeb: 'GET /api/buscar-web?q=texto',
      sugerencias: 'GET/POST /api/sugerencias',
      actualizarSugerencia: 'PUT /api/sugerencias/:id'
    }
  });
}

app.get('/api', apiInfo);

// ─── Rutas de la API ──────────────────────────────────────────

app.use('/api', routes);

// ─── Frontend (archivos estáticos) ─────────────────────────────
//
// Se registran DESPUÉS de la API para que /api/* siempre se resuelva
// contra los routers y nunca caiga en el index.html.

if (fs.existsSync(STATIC_DIR)) {
  // Archivos con hash en el nombre (js, css, imágenes): se cachean para siempre
  app.use(
    express.static(STATIC_DIR, {
      index: false,
      maxAge: '1y',
      setHeaders: (res, filePath) => {
        // index.html nunca se cachea, para que los deploys se vean al instante
        if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );

  // Cualquier otra ruta GET devuelve index.html para que Angular enrute
  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(STATIC_DIR, 'index.html'));
  });
} else {
  // Sin build del frontend la API queda sola, así que la raíz muestra la info
  app.get('/', apiInfo);
  console.warn(`⚠️  No se encontró el build del frontend en: ${STATIC_DIR}`);
  console.warn('   Ejecuta: cd frontend && npm run build -- --configuration production');
  console.warn('   El sitio no estará disponible, solo la API.');
}

// ─── Manejo de errores ────────────────────────────────────────

app.use(notFoundHandler);
app.use(errorHandler);

// ─── Inicio ───────────────────────────────────────────────────

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚗 OBD2 Libre API corriendo en http://localhost:${PORT}`);
      if (fs.existsSync(STATIC_DIR)) {
        console.log(`🌐 Sitio web en http://localhost:${PORT}`);
      }
    });
  })
  .catch(console.error);