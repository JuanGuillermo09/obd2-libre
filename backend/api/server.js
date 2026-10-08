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

const { initDB } = require('./db/database');
const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware global ────────────────────────────────────────

app.use(cors());
app.use(express.json());

// ─── Ruta raíz: información de la API ─────────────────────────

app.get('/', (req, res) => {
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
});

// ─── Rutas de la API ──────────────────────────────────────────

app.use('/api', routes);

// ─── Manejo de errores ────────────────────────────────────────

app.use(notFoundHandler);
app.use(errorHandler);

// ─── Inicio ───────────────────────────────────────────────────

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚗 OBD2 Libre API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(console.error);