/**
 * Script de validación de fichas
 * 
 * Verifica que todas las fichas marcadas como 'revisado'
 * tengan todos los campos requeridos.
 * 
 * Uso: node scripts/validate.js
 */

const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const DB_PATH = path.join(__dirname, '..', 'data', 'mecaopen.db');

const camposRequeridos = [
  'codigo',
  'nombre_tecnico',
  'explicacion',
  'sintomas',
  'causas',
  'pasos_diagnostico',
  'gravedad',
  'se_puede_manejar'
];

const gravedadesValidas = ['baja', 'media', 'alta'];
const manejarValidos = ['sí', 'con precaución', 'no'];

function validarFicha(ficha) {
  const errores = [];

  camposRequeridos.forEach(campo => {
    if (!ficha[campo] || ficha[campo].toString().trim() === '') {
      errores.push(`Campo faltante: ${campo}`);
    }
  });

  if (ficha.gravedad && !gravedadesValidas.includes(ficha.gravedad.toLowerCase())) {
    errores.push(`Gravedad inválida: ${ficha.gravedad} (debe ser: baja, media, alta)`);
  }

  if (ficha.se_puede_manejar && !manejarValidos.includes(ficha.se_puede_manejar.toLowerCase())) {
    errores.push(`Valor inválido para se_puede_manejar: ${ficha.se_puede_manejar}`);
  }

  ['sintomas', 'causas', 'pasos_diagnostico'].forEach(campo => {
    if (ficha[campo]) {
      try {
        JSON.parse(ficha[campo]);
      } catch (e) {
        errores.push(`JSON inválido en ${campo}`);
      }
    }
  });

  return errores;
}

async function main() {
  if (!fs.existsSync(DB_PATH)) {
    console.log('❌ No existe la base de datos. Ejecuta primero: npm run import');
    return;
  }

  const SQL = await initSqlJs();
  const filebuffer = fs.readFileSync(DB_PATH);
  const db = new SQL.Database(filebuffer);

  // Obtener estadísticas
  const totalResult = db.exec("SELECT COUNT(*) as count FROM codigos");
  const revisadosResult = db.exec("SELECT COUNT(*) as count FROM codigos WHERE estado = 'revisado'");
  const borradoresResult = db.exec("SELECT COUNT(*) as count FROM codigos WHERE estado = 'borrador'");

  const total = totalResult[0].values[0][0];
  const revisados = revisadosResult[0].values[0][0];
  const borradores = borradoresResult[0].values[0][0];

  console.log(`\n📊 Estado de la base de datos:`);
  console.log(`   Fichas revisadas: ${revisados}`);
  console.log(`   Fichas en borrador: ${borradores}`);
  console.log(`   Total: ${total}`);

  // Obtener fichas revisadas
  const fichasRevisadas = db.exec("SELECT * FROM codigos WHERE estado = 'revisado'");
  
  if (fichasRevisadas.length === 0) {
    console.log('\n📝 No hay fichas revisadas todavía.');
  } else {
    let fichasConErrores = 0;
    fichasRevisadas[0].values.forEach(row => {
      const ficha = {};
      fichasRevisadas[0].columns.forEach((col, i) => {
        ficha[col] = row[i];
      });
      
      const errores = validarFicha(ficha);
      if (errores.length > 0) {
        fichasConErrores++;
        console.log(`\n❌ ${ficha.codigo}:`);
        errores.forEach(e => console.log(`   - ${e}`));
      }
    });

    if (fichasConErrores === 0) {
      console.log(`\n✅ Todas las fichas revisadas son válidas.`);
    } else {
      console.log(`\n⚠️  ${fichasConErrores} fichas revisadas tienen errores.`);
    }
  }

  // Mostrar borradores con contenido
  const borradoresConContenido = db.exec(`
    SELECT codigo, nombre_tecnico FROM codigos 
    WHERE estado = 'borrador' 
    AND explicacion IS NOT NULL 
    AND sintomas IS NOT NULL 
    AND causas IS NOT NULL 
    AND pasos_diagnostico IS NOT NULL
    LIMIT 10
  `);

  if (borradoresConContenido.length > 0) {
    console.log(`\n📝 Fichas en borrador con contenido completo (listas para revisión):`);
    borradoresConContenido[0].values.forEach(row => {
      console.log(`   - ${row[0]}: ${row[1].substring(0, 50)}...`);
    });
  }

  db.close();
}

main().catch(console.error);
