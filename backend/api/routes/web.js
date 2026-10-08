/**
 * Rutas de búsqueda web.
 */
const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

// GET /api/buscar-web?q=texto - Búsqueda en la web
router.get('/', webController.buscarEnWeb);

module.exports = router;
