/**
 * Script para levantar backend y frontend de una vez
 * 
 * Uso: node start.js
 */

const { spawn } = require('child_process');
const path = require('path');

const BACKEND_DIR = path.join(__dirname, 'backend');
const FRONTEND_DIR = path.join(__dirname, 'frontend');

function startProcess(name, command, args, cwd) {
  console.log(`\n🚀 Iniciando ${name}...`);
  
  const child = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'inherit'
  });

  child.on('error', (err) => {
    console.error(`❌ Error iniciando ${name}:`, err);
  });

  child.on('close', (code) => {
    console.log(`⚠️  ${name} se detuvo con código ${code}`);
  });

  return child;
}

console.log('=== OBD2 Libre - Iniciando servidores ===\n');

// Levantar backend
const backend = startProcess('Backend', 'node', ['api/server.js'], BACKEND_DIR);

// Levantar frontend después de 2 segundos
setTimeout(() => {
  const frontend = startProcess('Frontend', 'ng', ['s', '--port', '4200'], FRONTEND_DIR);
}, 2000);

// Manejar cierre
process.on('SIGINT', () => {
  console.log('\n\n🛑 Deteniendo servidores...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});
