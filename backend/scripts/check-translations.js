/**
 * Script de verificación de traducciones.
 *
 * Ejecuta queries de prueba para revisar que las traducciones
 * automáticas quedaron bien en la base de datos.
 *
 * Uso: node scripts/check-translations.js
 */
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'mecaopen.db');

initSqlJs().then(SQL => {
  const db = new SQL.Database(fs.readFileSync(DB_PATH));

  // Queries de prueba para verificar traducciones
  const queries = [
    "SELECT codigo, nombre_es FROM codigos WHERE codigo = 'P0300'",
    "SELECT codigo, nombre_es FROM codigos WHERE codigo = 'P0420'",
    "SELECT codigo, nombre_es FROM codigos WHERE nombre_es LIKE '%Bujías%' LIMIT 3",
    "SELECT codigo, nombre_es FROM codigos WHERE nombre_es LIKE '%Combustible%' LIMIT 3"
  ];

  queries.forEach(q => {
    const result = db.exec(q);
    if (result.length > 0) {
      console.log(`\nQuery: ${q}`);
      console.log(result[0].values);
    }
  });

  db.close();
});
