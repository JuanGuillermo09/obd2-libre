/**
 * Controlador de búsqueda web.
 *
 * Maneja las peticiones HTTP relacionadas con búsqueda en la web.
 */
const webService = require('../services/webService');

/**
 * GET /api/buscar-web?q=texto
 * Busca información en la web usando DuckDuckGo.
 */
async function buscarEnWeb(req, res) {
  const q = req.query.q?.trim();
  if (!q || q.length < 2) {
    return res.status(400).json({
      error: 'Búsqueda muy corta',
      mensaje: 'Ingresa al menos 2 caracteres para buscar'
    });
  }

  const resultado = await webService.buscarEnWeb(q);
  res.json(resultado);
}

module.exports = {
  buscarEnWeb,
};
