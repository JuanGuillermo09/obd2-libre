/**
 * Rutas de sugerencias.
 */
const express = require('express');
const router = express.Router();
const sugerenciasController = require('../controllers/sugerenciasController');

// GET /api/sugerencias - Lista todas (opcionalmente filtradas por estado)
router.get('/', sugerenciasController.listarSugerencias);

// POST /api/sugerencias - Crear nueva sugerencia
router.post('/', sugerenciasController.crearSugerencia);

// PUT /api/sugerencias/:id - Actualizar estado y/o respuesta
router.put('/:id', sugerenciasController.actualizarSugerencia);

module.exports = router;
