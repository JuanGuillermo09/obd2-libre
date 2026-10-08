/**
 * Servicio de códigos DTC.
 *
 * Contiene la lógica de negocio para consultar y gestionar códigos.
 */
const db = require('../db/database');

/**
 * Convierte una fila de SQLite en un objeto de ficha.
 * Los campos JSON se parsean a arrays.
 */
function parseFicha(row) {
  if (!row) return null;
  return {
    ...row,
    sintomas: row.sintomas ? JSON.parse(row.sintomas) : [],
    causas: row.causas ? JSON.parse(row.causas) : [],
    pasos_diagnostico: row.pasos_diagnostico ? JSON.parse(row.pasos_diagnostico) : [],
  };
}

/**
 * Lista códigos con paginación y filtros opcionales.
 */
function listarCodigos({ pagina = 1, porPagina = 50, categoria, estado, marca }) {
  const offset = (pagina - 1) * porPagina;
  const where = [];
  const params = [];

  if (categoria) {
    where.push('categoria = ?');
    params.push(categoria.toUpperCase());
  }
  if (estado) {
    where.push('estado = ?');
    params.push(estado);
  }
  if (marca) {
    where.push('marca COLLATE NOCASE = ?');
    params.push(marca);
  }

  const whereClause = where.length > 0 ? 'WHERE ' + where.join(' AND ') : '';

  const total = db.query(`SELECT COUNT(*) as count FROM codigos ${whereClause}`, params)[0].count;
  const codigos = db.query(`
    SELECT codigo, categoria, nombre_tecnico, nombre_es, estado, gravedad, se_puede_manejar
    FROM codigos ${whereClause}
    ORDER BY codigo
    LIMIT ? OFFSET ?
  `, [...params, porPagina, offset]);

  return {
    datos: codigos,
    paginacion: {
      pagina,
      porPagina,
      total,
      totalPaginas: Math.ceil(total / porPagina)
    }
  };
}

/**
 * Obtiene la ficha completa de un código específico.
 */
function obtenerCodigo(codigo) {
  const ficha = db.query('SELECT * FROM codigos WHERE codigo = ?', [codigo])[0];
  return parseFicha(ficha);
}

/**
 * Busca códigos por texto en código, nombre técnico, nombre en español o explicación.
 */
function buscarCodigos(q) {
  const busqueda = `%${q}%`;
  return db.query(`
    SELECT codigo, categoria, nombre_tecnico, nombre_es, estado, gravedad
    FROM codigos
    WHERE codigo LIKE ? OR nombre_tecnico LIKE ? OR nombre_es LIKE ? OR explicacion LIKE ?
    ORDER BY
      CASE WHEN codigo LIKE ? THEN 0 ELSE 1 END,
      codigo
    LIMIT 20
  `, [busqueda, busqueda, busqueda, busqueda, busqueda]);
}

/**
 * Obtiene el resumen de códigos por categoría.
 */
function obtenerCategorias() {
  const categorias = db.query(`
    SELECT categoria, COUNT(*) as total,
           SUM(CASE WHEN estado = 'revisado' THEN 1 ELSE 0 END) as revisados
    FROM codigos
    GROUP BY categoria
    ORDER BY categoria
  `);

  const descripciones = {
    'P': 'Motor y Transmisión',
    'B': 'Carrocería',
    'C': 'Chasis',
    'U': 'Red de Comunicaciones'
  };

  return categorias.map(c => ({
    ...c,
    descripcion: descripciones[c.categoria] || 'Otro'
  }));
}

/**
 * Obtiene la lista de marcas con al menos un código.
 */
function obtenerMarcas() {
  const marcas = db.query(`
    SELECT DISTINCT marca as nombre_visible
    FROM codigos
    WHERE marca != 'Genérico'
    ORDER BY marca
  `);
  return marcas.map(m => ({ nombre: m.nombre_visible, nombre_visible: m.nombre_visible }));
}

module.exports = {
  listarCodigos,
  obtenerCodigo,
  buscarCodigos,
  obtenerCategorias,
  obtenerMarcas,
};
