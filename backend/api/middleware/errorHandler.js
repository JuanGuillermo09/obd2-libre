/**
 * Middleware de manejo de errores.
 *
 * Captura errores no manejados y devuelve respuestas JSON consistentes.
 */

/** Devuelve 404 para rutas no definidas */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: 'Ruta no encontrada',
    mensaje: `La ruta ${req.method} ${req.path} no existe`
  });
}

/** Manejador de errores global */
function errorHandler(err, req, res, next) {
  console.error('Error no manejado:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    mensaje: 'Algo salió mal. Intenta de nuevo más tarde.'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
