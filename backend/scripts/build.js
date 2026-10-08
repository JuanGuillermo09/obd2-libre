/**
 * Script de build para despliegue.
 *
 * Compila el frontend con Angular y copia el resultado a backend/dist
 * para que un solo proceso (el backend) sirva la API y el sitio.
 *
 * Uso: node scripts/build.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const FRONTEND = path.join(ROOT, 'frontend');
const DESTINO = path.join(ROOT, 'backend', 'dist');
// Angular 22 compila a dist/mecaopen/browser; copiamos esa carpeta a dist/public
const ORIGEN = path.join(FRONTEND, 'dist', 'mecaopen', 'browser');
const DESTINO_FINAL = path.join(DESTINO, 'public');

function log(msg) {
  console.log(msg);
}

// 1. Limpiar destino
log('🧹 Limpiando backend/dist...');
fs.rmSync(DESTINO, { recursive: true, force: true });

// 2. Compilar el frontend
log('🔨 Compilando el frontend...');
execSync('npm run build -- --configuration production', {
  cwd: FRONTEND,
  stdio: 'inherit',
  shell: true,
});

// 3. Copiar el resultado a backend/dist/public
if (!fs.existsSync(ORIGEN)) {
  console.error(`❌ No se encontró el build en: ${ORIGEN}`);
  process.exit(1);
}

log('📦 Copiando el build a backend/dist/public...');
fs.cpSync(ORIGEN, DESTINO_FINAL, { recursive: true });

// 4. Verificar que quedó lo esperado
const indexFinal = path.join(DESTINO_FINAL, 'index.html');
if (fs.existsSync(indexFinal)) {
  log(`✅ Listo. El sitio se sirve desde: ${indexFinal}`);
} else {
  console.error('❌ No se encontró index.html en el destino esperado');
  process.exit(1);
}