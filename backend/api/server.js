/**
 * API de OBD2 Libre
 *
 * Servidor Express que expone los códigos DTC mediante una API REST.
 *
 * Uso: node api/server.js
 * Puerto: 3000 (default)
 *
 * Este servidor usa sql.js (SQLite compilado a WebAssembly) para
 * interactuar con la base de datos sin necesidad de compilación nativa.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, '..', 'data', 'mecaopen.db');

let db = null;

/**
 * Inicializa la base de datos.
 *
 * Si el archivo mecaopen.db existe, lo carga.
 * Si no existe, crea una instancia vacía y muestra una advertencia.
 * (Ejecuta `npm run import` para crear la base de datos)
 */
async function initDB() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const filebuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(filebuffer);
    console.log(`📊 Base de datos cargada: ${DB_PATH}`);
  } else {
    console.log('⚠️  No existe la base de datos. Ejecuta: npm run import');
    db = new SQL.Database();
  }
}

/**
 * Convierte una fila de SQLite en un objeto de ficha.
 *
 * Los campos sintomas, causas y pasos_diagnostico se almacenan como
 * strings JSON en la base de datos, por lo que se parsean a arrays.
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
 * Ejecuta una consulta SQL y devuelve los resultados como array de objetos.
 *
 * @param {string} sql - Consulta SQL a ejecutar
 * @param {Array} params - Parámetros para la consulta (prepared statement)
 * @returns {Array} - Array de objetos con los resultados
 */
function query(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// ─── Middleware ───────────────────────────────────────────────

/** Permite peticiones desde otros dominios (CORS) */
app.use(cors());

/** Parsea el body de las peticiones como JSON */
app.use(express.json());

// ─── Rutas ────────────────────────────────────────────────────

/**
 * GET /
 *
 * Ruta principal. Devuelve información básica de la API y
 * una lista de los endpoints disponibles.
 */
app.get('/', (req, res) => {
  res.json({
    nombre: 'OBD2 Libre API',
    version: '0.1.0',
    descripcion: 'Códigos de falla OBD2 explicados en español',
    endpoints: {
      codigos: '/api/codigos',
      codigo: '/api/codigos/:codigo',
      buscar: '/api/buscar?q=texto',
      categorias: '/api/categorias',
      marcas: '/api/marcas',
      sugerencias: 'POST /api/sugerencias'
    }
  });
});

/**
 * GET /api/codigos
 *
 * Lista todos los códigos con paginación y filtros opcionales.
 *
 * Query params:
 *   - pagina (default: 1)
 *   - porPagina (default: 50)
 *   - categoria (P, B, C, U)
 *   - estado (borrador, revisado)
 *   - marca (ej: Mazda, BMW)
 */
app.get('/api/codigos', (req, res) => {
  const pagina = parseInt(req.query.pagina) || 1;
  const porPagina = parseInt(req.query.porPagina) || 50;
  const offset = (pagina - 1) * porPagina;
  const categoria = req.query.categoria;
  const estado = req.query.estado;
  const marca = req.query.marca;

  // Construir la cláusula WHERE dinámicamente
  let where = [];
  let params = [];

  if (categoria) {
    where.push('categoria = ?');
    params.push(categoria.toUpperCase());
  }
  if (estado) {
    where.push('estado = ?');
    params.push(estado);
  }
  if (marca) {
    // COLLATE NOCASE para que compare sin importar mayúsculas/minúsculas
    where.push('marca COLLATE NOCASE = ?');
    params.push(marca);
  }

  const whereClause = where.length > 0 ? 'WHERE ' + where.join(' AND ') : '';

  const total = query(`SELECT COUNT(*) as count FROM codigos ${whereClause}`, params)[0].count;
  const codigos = query(`
    SELECT codigo, categoria, nombre_tecnico, nombre_es, estado, gravedad, se_puede_manejar
    FROM codigos ${whereClause}
    ORDER BY codigo
    LIMIT ? OFFSET ?
  `, [...params, porPagina, offset]);

  res.json({
    datos: codigos,
    paginacion: {
      pagina,
      porPagina,
      total,
      totalPaginas: Math.ceil(total / porPagina)
    }
  });
});

/**
 * GET /api/codigos/:codigo
 *
 * Devuelve la ficha completa de un código específico.
 * Si no existe, devuelve un error 404.
 */
app.get('/api/codigos/:codigo', (req, res) => {
  const codigo = req.params.codigo.toUpperCase();
  const ficha = query('SELECT * FROM codigos WHERE codigo = ?', [codigo])[0];

  if (!ficha) {
    return res.status(404).json({
      error: 'Código no encontrado',
      mensaje: `No se encontró el código ${codigo}`,
      sugerencia: 'Verifica que el código esté escrito correctamente (ej: P0300)'
    });
  }

  res.json(parseFicha(ficha));
});

/**
 * GET /api/buscar?q=texto
 *
 * Busca códigos por texto en el código, nombre técnico, nombre en español
 * o explicación. Devuelve máximo 20 resultados.
 */
app.get('/api/buscar', (req, res) => {
  const q = req.query.q?.trim();
  if (!q || q.length < 2) {
    return res.status(400).json({
      error: 'Búsqueda muy corta',
      mensaje: 'Ingresa al menos 2 caracteres para buscar'
    });
  }

  const busqueda = `%${q}%`;
  const resultados = query(`
    SELECT codigo, categoria, nombre_tecnico, nombre_es, estado, gravedad
    FROM codigos
    WHERE codigo LIKE ? OR nombre_tecnico LIKE ? OR nombre_es LIKE ? OR explicacion LIKE ?
    ORDER BY
      CASE WHEN codigo LIKE ? THEN 0 ELSE 1 END,
      codigo
    LIMIT 20
  `, [busqueda, busqueda, busqueda, busqueda, busqueda]);

  res.json({
    query: q,
    total: resultados.length,
    resultados
  });
});

/**
 * GET /api/categorias
 *
 * Devuelve el resumen de códigos por categoría (P, B, C, U),
 * incluyendo el total y cuántos están revisados.
 */
app.get('/api/categorias', (req, res) => {
  const categorias = query(`
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

  res.json(categorias.map(c => ({
    ...c,
    descripcion: descripciones[c.categoria] || 'Otro'
  })));
});

/**
 * GET /api/marcas
 *
 * Devuelve la lista de marcas que tienen al menos un código
 * en la base de datos (excluye los genéricos).
 */
app.get('/api/marcas', (req, res) => {
  const marcas = query(`
    SELECT DISTINCT marca as nombre_visible
    FROM codigos
    WHERE marca != 'Genérico'
    ORDER BY marca
  `);
  res.json(marcas.map(m => ({ nombre: m.nombre_visible, nombre_visible: m.nombre_visible })));
});

/**
 * POST /api/sugerencias
 *
 * Permite a cualquier usuario enviar una sugerencia (corrección,
 * código nuevo o info de marca). Las sugerencias se guardan con
 * estado 'pendiente' para revisión posterior.
 *
 * Body: { codigo, tipo, contenido, contacto? }
 */
app.post('/api/sugerencias', (req, res) => {
  const { codigo, tipo, contenido, contacto } = req.body;

  if (!codigo || !tipo || !contenido) {
    return res.status(400).json({
      error: 'Datos incompletos',
      mensaje: 'Se requieren: codigo, tipo y contenido'
    });
  }

  const tiposValidos = ['correccion', 'nuevo_codigo', 'info_marca'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      error: 'Tipo inválido',
      mensaje: `El tipo debe ser uno de: ${tiposValidos.join(', ')}`
    });
  }

  db.run(
    'INSERT INTO sugerencias (codigo, tipo, contenido, contacto) VALUES (?, ?, ?, ?)',
    [codigo.toUpperCase(), tipo, contenido, contacto || null]
  );

  // Guardar cambios en el archivo de base de datos
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));

  res.status(201).json({
    mensaje: 'Sugerencia enviada correctamente. ¡Gracias por contribuir!'
  });
});

/**
 * GET /api/sugerencias
 *
 * Devuelve todas las sugerencias recibidas, ordenadas por fecha.
 * Opcionalmente filtra por estado (pendiente, aprobada, rechazada).
 */
app.get('/api/sugerencias', (req, res) => {
  const estado = req.query.estado;
  let sql = 'SELECT * FROM sugerencias';
  let params = [];

  if (estado) {
    sql += ' WHERE estado = ?';
    params.push(estado);
  }

  sql += ' ORDER BY fecha_creacion DESC';

  const sugerencias = query(sql, params);
  res.json(sugerencias);
});

/**
 * PUT /api/sugerencias/:id
 *
 * Actualiza el estado y/o la respuesta de una sugerencia.
 * Usado por el administrador desde la página de sugerencias.
 */
app.put('/api/sugerencias/:id', (req, res) => {
  const id = req.params.id;
  const { estado, respuesta } = req.body;

  if (!estado && !respuesta) {
    return res.status(400).json({
      error: 'Datos incompletos',
      mensaje: 'Se requiere al menos estado o respuesta'
    });
  }

  // Obtener la sugerencia actual
  const existente = query('SELECT * FROM sugerencias WHERE id = ?', [id])[0];
  if (!existente) {
    return res.status(404).json({
      error: 'Sugerencia no encontrada',
      mensaje: `No se encontró la sugerencia con id ${id}`
    });
  }

  const nuevoEstado = estado || existente.estado;
  const nuevaRespuesta = respuesta !== undefined ? respuesta : existente.respuesta;

  db.run(
    `UPDATE sugerencias SET estado = ?, respuesta = ?, fecha_respuesta = datetime('now') WHERE id = ?`,
    [nuevoEstado, nuevaRespuesta, id]
  );

  // Guardar cambios en el archivo de base de datos
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));

  res.json({
    mensaje: 'Sugerencia actualizada correctamente',
    id,
    estado: nuevoEstado,
    respuesta: nuevaRespuesta
  });
});

// ─── Manejo de errores ────────────────────────────────────────

/** Devuelve 404 para cualquier ruta no definida */
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    mensaje: `La ruta ${req.path} no existe`
  });
});

// ─── Inicio ───────────────────────────────────────────────────

/** Inicializa la base de datos y luego levanta el servidor */
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚗 OBD2 Libre API corriendo en http://localhost:${PORT}`);
  });
}).catch(console.error);
