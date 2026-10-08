/**
 * Controlador de sugerencias.
 *
 * Maneja las peticiones HTTP relacionadas con sugerencias de la comunidad.
 */
const sugerenciasService = require('../services/sugerenciasService');

/**
 * POST /api/sugerencias
 * Crea una nueva sugerencia.
 */
function crearSugerencia(req, res) {
  const { codigo, tipo, contenido, contacto } = req.body;

  try {
    const resultado = sugerenciasService.crearSugerencia({ codigo, tipo, contenido, contacto });
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({
      error: 'Datos inválidos',
      mensaje: err.message
    });
  }
}

/**
 * GET /api/sugerencias
 * Lista todas las sugerencias, opcionalmente filtradas por estado.
 */
function listarSugerencias(req, res) {
  const estado = req.query.estado;
  const sugerencias = sugerenciasService.listarSugerencias(estado);
  res.json(sugerencias);
}

/**
 * PUT /api/sugerencias/:id
 * Actualiza el estado y/o respuesta de una sugerencia.
 */
function actualizarSugerencia(req, res) {
  const id = req.params.id;
  const { estado, respuesta } = req.body;

  try {
    const resultado = sugerenciasService.actualizarSugerencia(id, { estado, respuesta });
    res.json(resultado);
  } catch (err) {
    if (err.message.includes('No se encontró')) {
      return res.status(404).json({
        error: 'Sugerencia no encontrada',
        mensaje: err.message
      });
    }
    res.status(400).json({
      error: 'Datos inválidos',
      mensaje: err.message
    });
  }
}

module.exports = {
  crearSugerencia,
  listarSugerencias,
  actualizarSugerencia,
};
