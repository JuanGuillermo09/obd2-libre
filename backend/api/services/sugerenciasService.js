/**
 * Servicio de sugerencias.
 *
 * Contiene la lógica de negocio para gestionar las sugerencias de la comunidad.
 */
const db = require('../db/database');

const TIPOS_VALIDOS = ['correccion', 'nuevo_codigo', 'info_marca'];

/**
 * Crea una nueva sugerencia.
 */
function crearSugerencia({ codigo, tipo, contenido, contacto }) {
  if (!codigo || !tipo || !contenido) {
    throw new Error('Se requieren: codigo, tipo y contenido');
  }
  if (!TIPOS_VALIDOS.includes(tipo)) {
    throw new Error(`El tipo debe ser uno de: ${TIPOS_VALIDOS.join(', ')}`);
  }

  db.run(
    'INSERT INTO sugerencias (codigo, tipo, contenido, contacto) VALUES (?, ?, ?, ?)',
    [codigo.toUpperCase(), tipo, contenido, contacto || null]
  );
  db.save();

  return { mensaje: 'Sugerencia enviada correctamente. ¡Gracias por contribuir!' };
}

/**
 * Lista todas las sugerencias, opcionalmente filtradas por estado.
 */
function listarSugerencias(estado) {
  let sql = 'SELECT * FROM sugerencias';
  const params = [];

  if (estado) {
    sql += ' WHERE estado = ?';
    params.push(estado);
  }

  sql += ' ORDER BY fecha_creacion DESC';
  return db.query(sql, params);
}

/**
 * Actualiza el estado y/o respuesta de una sugerencia.
 */
function actualizarSugerencia(id, { estado, respuesta }) {
  if (!estado && !respuesta) {
    throw new Error('Se requiere al menos estado o respuesta');
  }

  const existente = db.query('SELECT * FROM sugerencias WHERE id = ?', [id])[0];
  if (!existente) {
    throw new Error(`No se encontró la sugerencia con id ${id}`);
  }

  const nuevoEstado = estado || existente.estado;
  const nuevaRespuesta = respuesta !== undefined ? respuesta : existente.respuesta;

  db.run(
    `UPDATE sugerencias SET estado = ?, respuesta = ?, fecha_respuesta = datetime('now') WHERE id = ?`,
    [nuevoEstado, nuevaRespuesta, id]
  );
  db.save();

  return {
    mensaje: 'Sugerencia actualizada correctamente',
    id,
    estado: nuevoEstado,
    respuesta: nuevaRespuesta
  };
}

module.exports = {
  crearSugerencia,
  listarSugerencias,
  actualizarSugerencia,
};
