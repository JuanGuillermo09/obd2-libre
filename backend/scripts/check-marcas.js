const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, '..', 'data', 'mecaopen.db');

initSqlJs().then(SQL => {
  const db = new SQL.Database(fs.readFileSync(DB_PATH));
  const r = db.exec("SELECT DISTINCT marca FROM codigos WHERE marca != 'Genérico' ORDER BY marca");
  console.log(r[0].values.map(v => v[0]).join(', '));
  db.close();
});
