/**
 * Índice central de rutas de la API.
 *
 * Cada grupo de endpoints se monta como un router independiente.
 * Para agregar un nuevo módulo basta con crear su router y montarlo aquí.
 */
const express = require('express');
const router = express.Router();

// Routers de cada módulo
const codigosRoutes = require('./codigos');
const buscarRoutes = require('./buscar');
const metadatosRoutes = require('./metadatos');
const sugerenciasRoutes = require('./sugerencias');
const webRoutes = require('./web');

// Montaje de módulos
router.use('/codigos', codigosRoutes);
router.use('/buscar', buscarRoutes);
router.use('/sugerencias', sugerenciasRoutes);
router.use('/buscar-web', webRoutes);
router.use('/', metadatosRoutes);

module.exports = router;