const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, '..', 'data', 'mecaopen.db');

initSqlJs().then(SQL => {
  const db = new SQL.Database(fs.readFileSync(DB_PATH));
  
  // Contar códigos por marca en nombre_es
  const marcas = ['Mazda', 'Audi', 'BMW', 'Ford', 'Toyota', 'Chevrolet', 'Volkswagen'];
  marcas.forEach(m => {
    const r = db.exec(`SELECT COUNT(*) FROM codigos WHERE nombre_es LIKE '%[${m}]%'`);
    console.log(`${m}: ${r[0].values[0][0]} códigos`);
  });
  
  // Mostrar algunos ejemplos de Mazda
  const r = db.exec("SELECT codigo, nombre_es FROM codigos WHERE nombre_es LIKE '%Mazda%' LIMIT 5");
  console.log('\nEjemplos Mazda:');
  r[0].values.forEach(v => console.log(`  ${v[0]}: ${v[1]}`));
  
  db.close();
});
