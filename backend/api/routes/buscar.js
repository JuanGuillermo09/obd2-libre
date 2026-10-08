/**
 * Rutas de búsqueda.
 *
 * Se monta en /api/buscar
 */
const express = require('express');
const router = express.Router();
const codigosController = require('../controllers/codigosController');

// GET /api/buscar?q=texto - Búsqueda por texto libre
router.get('/', codigosController.buscarCodigos);

module.exports = router;