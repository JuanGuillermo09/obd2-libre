const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, '..', 'data', 'mecaopen.db');

initSqlJs().then(SQL => {
  const db = new SQL.Database(fs.readFileSync(DB_PATH));
  
  // Ver qué categorías tienen los códigos de marcas específicas
  const marcas = ['BMW', 'Mazda', 'Chevrolet', 'Toyota', 'Volkswagen'];
  marcas.forEach(m => {
    const r = db.exec(`SELECT categoria, COUNT(*) as total FROM codigos WHERE marca = '${m}' GROUP BY categoria`);
    if (r.length > 0) {
      console.log(`\n${m}:`);
      r[0].values.forEach(v => console.log(`  ${v[0]}: ${v[1]} códigos`));
    } else {
      console.log(`\n${m}: 0 códigos`);
    }
  });
  
  // Ver categorías de genéricos
  const r = db.exec(`SELECT categoria, COUNT(*) as total FROM codigos WHERE marca = 'Genérico' GROUP BY categoria`);
  console.log('\nGenérico:');
  r[0].values.forEach(v => console.log(`  ${v[0]}: ${v[1]} códigos`));
  
  db.close();
});
