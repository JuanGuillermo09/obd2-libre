/**
 * Rutas de metadatos.
 *
 * Se monta en /api
 * Expone los listados de apoyo: categorías y marcas.
 */
const express = require('express');
const router = express.Router();
const codigosController = require('../controllers/codigosController');

// GET /api/categorias - Resumen de códigos por categoría
router.get('/categorias', codigosController.obtenerCategorias);

// GET /api/marcas - Lista de marcas disponibles
router.get('/marcas', codigosController.obtenerMarcas);

module.exports = router;