/**
 * Módulo de base de datos.
 *
 * Inicializa y gestiona la conexión con SQLite usando sql.js.
 * Proporciona funciones para consultas y persistencia.
 */
const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'mecaopen.db');

let db = null;

/**
 * Inicializa la base de datos.
 * Si el archivo existe, lo carga. Si no, crea una instancia vacía.
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
 * Devuelve la instancia de la base de datos.
 */
function getDB() {
  return db;
}

/**
 * Ejecuta una consulta SQL y devuelve los resultados como array de objetos.
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

/**
 * Ejecuta una sentencia SQL (INSERT, UPDATE, DELETE).
 */
function run(sql, params = []) {
  db.run(sql, params);
}

/**
 * Guarda los cambios en el archivo de base de datos.
 */
function save() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

module.exports = { initDB, getDB, query, run, save };
