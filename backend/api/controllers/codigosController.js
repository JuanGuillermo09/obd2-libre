/**
 * Controlador de códigos DTC.
 *
 * Maneja las peticiones HTTP relacionadas con códigos.
 */
const codigosService = require('../services/codigosService');

/**
 * GET /api/codigos
 * Lista todos los códigos con paginación y filtros.
 */
function listarCodigos(req, res) {
  const pagina = parseInt(req.query.pagina) || 1;
  const porPagina = parseInt(req.query.porPagina) || 50;
  const categoria = req.query.categoria;
  const estado = req.query.estado;
  const marca = req.query.marca;

  const resultado = codigosService.listarCodigos({ pagina, porPagina, categoria, estado, marca });
  res.json(resultado);
}

/**
 * GET /api/codigos/:codigo
 * Devuelve la ficha completa de un código específico.
 */
function obtenerCodigo(req, res) {
  const codigo = req.params.codigo.toUpperCase();
  const ficha = codigosService.obtenerCodigo(codigo);

  if (!ficha) {
    return res.status(404).json({
      error: 'Código no encontrado',
      mensaje: `No se encontró el código ${codigo}`,
      sugerencia: 'Verifica que el código esté escrito correctamente (ej: P0300)'
    });
  }

  res.json(ficha);
}

/**
 * GET /api/buscar?q=texto
 * Busca códigos por texto.
 */
function buscarCodigos(req, res) {
  const q = req.query.q?.trim();
  if (!q || q.length < 2) {
    return res.status(400).json({
      error: 'Búsqueda muy corta',
      mensaje: 'Ingresa al menos 2 caracteres para buscar'
    });
  }

  const resultados = codigosService.buscarCodigos(q);
  res.json({
    query: q,
    total: resultados.length,
    resultados
  });
}

/**
 * GET /api/categorias
 * Devuelve el resumen de códigos por categoría.
 */
function obtenerCategorias(req, res) {
  const categorias = codigosService.obtenerCategorias();
  res.json(categorias);
}

/**
 * GET /api/marcas
 * Devuelve la lista de marcas disponibles.
 */
function obtenerMarcas(req, res) {
  const marcas = codigosService.obtenerMarcas();
  res.json(marcas);
}

module.exports = {
  listarCodigos,
  obtenerCodigo,
  buscarCodigos,
  obtenerCategorias,
  obtenerMarcas,
};
