/**
 * Rutas de códigos DTC.
 *
 * Se monta en /api/codigos
 */
const express = require('express');
const router = express.Router();
const codigosController = require('../controllers/codigosController');

// GET /api/codigos - Lista con paginación y filtros
router.get('/', codigosController.listarCodigos);

// GET /api/codigos/:codigo - Ficha completa
router.get('/:codigo', codigosController.obtenerCodigo);

module.exports = router;