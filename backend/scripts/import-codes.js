/**
 * Script de importación de códigos DTC
 * 
 * Lee los archivos .txt de data/source-data/ y los importa
 * a la base de datos mecaopen.db con estado 'borrador'.
 * 
 * Uso: node scripts/import-codes.js
 */

const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const SOURCE_DIR = path.join(__dirname, '..', 'data', 'source-data');
const DB_PATH = path.join(__dirname, '..', 'data', 'mecaopen.db');

// Diccionario de traducciones comunes de términos técnicos
const traducciones = {
  // Términos comunes
  'Fuel Volume Regulator': 'Regulador de volumen de combustible',
  'Fuel Shutoff Valve': 'Válvula de corte de combustible',
  'Engine Position System': 'Sistema de posición del motor',
  'Camshaft Position': 'Posición del árbol de levas',
  'Crankshaft Position': 'Posición del cigüeñal',
  'HO2S Heater': 'Calentador del sensor de oxígeno',
  'Catalyst System': 'Sistema de catalizador',
  'Catalyst Efficiency': 'Eficiencia del catalizador',
  'Evaporative Emission System': 'Sistema de emisiones evaporativas',
  'EVAP': 'EVAP',
  'Misfire': 'Fallo de encendido',
  'Random/Multiple Cylinder': 'Aleatorio/Múltiples cilindros',
  'Cylinder 1': 'Cilindro 1',
  'Cylinder 2': 'Cilindro 2',
  'Cylinder 3': 'Cilindro 3',
  'Cylinder 4': 'Cilindro 4',
  'Cylinder 5': 'Cilindro 5',
  'Cylinder 6': 'Cilindro 6',
  'Cylinder 7': 'Cilindro 7',
  'Cylinder 8': 'Cilindro 8',
  'Bank 1': 'Banco 1',
  'Bank 2': 'Banco 2',
  'Sensor 1': 'Sensor 1',
  'Sensor 2': 'Sensor 2',
  'Sensor A': 'Sensor A',
  'Sensor B': 'Sensor B',
  'Circuit/Open': 'Circuito/Abierto',
  'Circuit Low': 'Circuito bajo',
  'Circuit High': 'Circuito alto',
  'Range/Performance': 'Rango/Rendimiento',
  'System Performance': 'Rendimiento del sistema',
  'Slow Response': 'Respuesta lenta',
  'Timing Over-Advanced': 'Tiempo sobre-avanzado',
  'Timing Over-Retarded': 'Tiempo sobre-atrasado',
  'Correlation': 'Correlación',
  'Control Circuit': 'Circuito de control',
  'Actuator': 'Actuador',
  'Solenoid': 'Senoide',
  'Valve': 'Válvula',
  'Sensor': 'Sensor',
  'System': 'Sistema',
  'Control': 'Control',
  'Module': 'Módulo',
  'Pressure': 'Presión',
  'Temperature': 'Temperatura',
  'Flow': 'Flujo',
  'Level': 'Nivel',
  'Position': 'Posición',
  'Speed': 'Velocidad',
  'Air': 'Aire',
  'Fuel': 'Combustible',
  'Engine': 'Motor',
  'Transmission': 'Transmisión',
  'Throttle': 'Acelerador',
  'Intake': 'Admisión',
  'Exhaust': 'Escape',
  'Emission': 'Emisión',
  'Oxygen': 'Oxígeno',
  'O2': 'O2',
  'NOx': 'NOx',
  'HC': 'HC',
  'CO': 'CO',
  'CO2': 'CO2',
  'MAP': 'MAP',
  'MAF': 'MAF',
  'TPS': 'TPS',
  'IAC': 'IAC',
  'VVT': 'VVT',
  'VTEC': 'VTEC',
  'VANOS': 'VANOS',
  'Turbo': 'Turbo',
  'Supercharger': 'Sobrealimentador',
  'Intercooler': 'Intercooler',
  'EGR': 'EGR',
  'PCV': 'PCV',
  'TCC': 'TCC',
  'ABS': 'ABS',
  'ESP': 'ESP',
  'TCS': 'TCS',
  'SRS': 'SRS',
  'CAN': 'CAN',
  'LIN': 'LIN',
  'MOST': 'MOST',
  'FlexRay': 'FlexRay',
  'Ethernet': 'Ethernet',
  'Bluetooth': 'Bluetooth',
  'WiFi': 'WiFi',
  'GPS': 'GPS',
  'GSM': 'GSM',
  'CDMA': 'CDMA',
  'LTE': 'LTE',
  '5G': '5G',
  'NFC': 'NFC',
  'RFID': 'RFID',
  'USB': 'USB',
  'HDMI': 'HDMI',
  'VGA': 'VGA',
  'DVI': 'DVI',
  'DisplayPort': 'DisplayPort',
  'Thunderbolt': 'Thunderbolt',
  'FireWire': 'FireWire',
  'eSATA': 'eSATA',
  'SAS': 'SAS',
  'SATA': 'SATA',
  'IDE': 'IDE',
  'SCSI': 'SCSI',
  'Fibre Channel': 'Fibre Channel',
  'InfiniBand': 'InfiniBand',
  'iSCSI': 'iSCSI',
  'NVMe': 'NVMe',
  'PCIe': 'PCIe',
  'PCI': 'PCI',
  'AGP': 'AGP',
  'ISA': 'ISA',
  'EISA': 'EISA',
  'MCA': 'MCA',
  'VESA': 'VESA',
  'AMR': 'AMR',
  'CNR': 'CNR',
  'ACR': 'ACR',
  'PCI-X': 'PCI-X',
  'PCI Express': 'PCI Express',
  'USB 2.0': 'USB 2.0',
  'USB 3.0': 'USB 3.0',
  'USB 3.1': 'USB 3.1',
  'USB 3.2': 'USB 3.2',
  'USB4': 'USB4',
  'USB-C': 'USB-C',
  'Lightning': 'Lightning',
  'Micro-USB': 'Micro-USB',
  'Mini-USB': 'Mini-USB',
};

function traducirNombre(nombre) {
  // Diccionario de traducciones con frases completas para evitar conflictos
  const traduccionesCompletas = {
    // Frases completas primero (más específicas)
    'Worn out spark plugs': 'Bujías gastadas',
    'ignition wires': 'cables de encendido',
    'distributor cap and rotor': 'tapa del distribuidor y rotor',
    'ignition timing': 'tiempo de encendido',
    'Vacuum leak(s)': 'Fuga(s) de vacío',
    'Low or weak Fuel Pressure': 'Presión de combustible baja o débil',
    'Improperly functioning EGR System': 'Sistema EGR que no funciona correctamente',
    'Defective Mass Air Flow Sensor': 'Sensor de flujo de aire (MAF) defectuoso',
    'Defective Crankshaft and or Camshaft Sensor': 'Sensor de cigüeñal y/o árbol de levas defectuoso',
    'Defective Throttle Position Sensor': 'Sensor de posición del acelerador (TPS) defectuoso',
    'Mechanical Engine problems': 'Problemas mecánicos del motor',
    'low compression': 'baja compresión',
    'leaking head gasket(s)': 'junta de culata con fuga(s)',
    'valve problems': 'problemas de válvulas',
    'Fuel Pressure': 'Presión de combustible',
    'Air Flow': 'Flujo de aire',
    'Throttle Position': 'Posición del acelerador',
    'Engine': 'Motor',
    'Fuel': 'Combustible',
    'System': 'Sistema',
    'Sensor': 'Sensor',
    'Pressure': 'Presión',
    'Position': 'Posición',
    'Flow': 'Flujo',
    'Air': 'Aire',
    'Coil(s)': 'Bobina(s)',
    'Incorrect': 'Incorrecto',
    'Compression': 'Compresión',
    'Valve': 'Válvula',
    'Spark plugs': 'Bujías',
    'EGR': 'EGR',
    'Mass': 'Masa',
    'Crankshaft': 'Cigüeñal',
    'Camshaft': 'Árbol de levas',
    'Throttle': 'Acelerador',
    'Mechanical': 'Mecánico',
    'problems': 'problemas',
    'Defective': 'Defectuoso',
    'Improperly': 'Incorrectamente',
    'functioning': 'funcionando',
    'Low': 'Baja',
    'weak': 'débil',
    'or': 'o',
    'and': 'y',
    'the': 'el',
    'of': 'de',
    'in': 'en',
    'to': 'a',
    'for': 'para',
    'with': 'con',
    'on': 'en',
    'at': 'en',
    'by': 'por',
    'from': 'de',
    'as': 'como',
    'is': 'es',
    'are': 'son',
    'was': 'era',
    'were': 'eran',
    'be': 'ser',
    'been': 'sido',
    'being': 'siendo',
    'have': 'tener',
    'has': 'tiene',
    'had': 'tenía',
    'do': 'hacer',
    'does': 'hace',
    'did': 'hizo',
    'will': 'hará',
    'would': 'haría',
    'should': 'debería',
    'could': 'podría',
    'may': 'puede',
    'might': 'podría',
    'must': 'debe',
    'can': 'puede',
    'shall': 'deberá',
    'need': 'necesitar',
    'want': 'querer',
    'like': 'gustar',
    'know': 'saber',
    'think': 'pensar',
    'see': 'ver',
    'look': 'mirar',
    'come': 'venir',
    'want': 'querer',
    'use': 'usar',
    'find': 'encontrar',
    'give': 'dar',
    'tell': 'decir',
    'work': 'trabajar',
    'call': 'llamar',
    'try': 'intentar',
    'ask': 'preguntar',
    'need': 'necesitar',
    'feel': 'sentir',
    'become': 'convertirse',
    'leave': 'dejar',
    'put': 'poner',
    'mean': 'significar',
    'keep': 'mantener',
    'let': 'dejar',
    'begin': 'comenzar',
    'seem': 'parecer',
    'help': 'ayudar',
    'talk': 'hablar',
    'turn': 'girar',
    'start': 'comenzar',
    'show': 'mostrar',
    'hear': 'oír',
    'play': 'jugar',
    'run': 'correr',
    'move': 'mover',
    'live': 'vivir',
    'believe': 'creer',
    'hold': 'sostener',
    'bring': 'traer',
    'happen': 'suceder',
    'write': 'escribir',
    'provide': 'proporcionar',
    'sit': 'sentarse',
    'stand': 'estar de pie',
    'lose': 'perder',
    'pay': 'pagar',
    'meet': 'encontrar',
    'include': 'incluir',
    'continue': 'continuar',
    'set': 'establecer',
    'learn': 'aprender',
    'change': 'cambiar',
    'lead': 'liderar',
    'understand': 'entender',
    'watch': 'mirar',
    'follow': 'seguir',
    'stop': 'detener',
    'create': 'crear',
    'speak': 'hablar',
    'read': 'leer',
    'allow': 'permitir',
    'add': 'agregar',
    'spend': 'gastar',
    'grow': 'crecer',
    'open': 'abrir',
    'walk': 'caminar',
    'win': 'ganar',
    'offer': 'ofrecer',
    'remember': 'recordar',
    'love': 'amar',
    'consider': 'considerar',
    'appear': 'aparecer',
    'buy': 'comprar',
    'wait': 'esperar',
    'serve': 'servir',
    'die': 'morir',
    'send': 'enviar',
    'expect': 'esperar',
    'build': 'construir',
    'stay': 'quedarse',
    'fall': 'caer',
    'cut': 'cortar',
    'reach': 'alcanzar',
    'kill': 'matar',
    'remain': 'permanecer',
    'suggest': 'sugerir',
    'raise': 'elevar',
    'pass': 'pasar',
    'sell': 'vender',
    'require': 'requerir',
    'report': 'informar',
    'decide': 'decidir',
    'pull': 'tirar',
    'return': 'regresar',
    'explain': 'explicar',
    'hope': 'esperar',
    'develop': 'desarrollar',
    'carry': 'llevar',
    'break': 'romper',
    'receive': 'recibir',
    'agree': 'estar de acuerdo',
    'support': 'apoyar',
    'hit': 'golpear',
    'produce': 'producir',
    'eat': 'comer',
    'cover': 'cubrir',
    'catch': 'atrapar',
    'choose': 'elegir',
    'draw': 'dibujar',
    'cause': 'causar',
    'point': 'apuntar',
    'listen': 'escuchar',
    'realize': 'darse cuenta',
    'place': 'colocar',
    'close': 'cerrar',
    'force': 'forzar',
    'achieve': 'lograr',
    'seek': 'buscar',
    'deal': 'tratar',
    'fight': 'luchar',
    'throw': 'lanzar',
    'catch': 'atrapar',
    'obtain': 'obtener',
    'push': 'empujar',
    'touch': 'tocar',
    'protect': 'proteger',
    'accept': 'aceptar',
    'reduce': 'reducir',
    'establish': 'establecer',
    'join': 'unirse',
    'encourage': 'animar',
    'prevent': 'prevenir',
    'resolve': 'resolver',
    'reveal': 'revelar',
    'complete': 'completar',
    'apply': 'aplicar',
    'prepare': 'preparar',
    'compare': 'comparar',
    'declare': 'declarar',
    'deliver': 'entregar',
    'depend': 'depender',
    'describe': 'describir',
    'design': 'diseñar',
    'destroy': 'destruir',
    'discover': 'descubrir',
    'discuss': 'discutir',
    'distribute': 'distribuir',
    'divide': 'dividir',
    'dominate': 'dominar',
    'enable': 'habilitar',
    'encourage': 'animar',
    'engage': 'participar',
    'enhance': 'mejorar',
    'ensure': 'asegurar',
    'enter': 'entrar',
    'escape': 'escapar',
    'establish': 'establecer',
    'estimate': 'estimar',
    'evaluate': 'evaluar',
    'exist': 'existir',
    'expand': 'expandir',
    'expect': 'esperar',
    'experience': 'experimentar',
    'explain': 'explicar',
    'explore': 'explorar',
    'express': 'expresar',
    'extend': 'extender',
    'face': 'enfrentar',
    'fail': 'fallar',
    'favor': 'favorecer',
    'fear': 'temer',
    'feel': 'sentir',
    'fight': 'luchar',
    'fill': 'llenar',
    'find': 'encontrar',
    'finish': 'terminar',
    'fit': 'caber',
    'fix': 'arreglar',
    'focus': 'enfocar',
    'follow': 'seguir',
    'force': 'forzar',
    'forget': 'olvidar',
    'form': 'formar',
    'gain': 'ganar',
    'gather': 'reunir',
    'generate': 'generar',
    'get': 'obtener',
    'give': 'dar',
    'go': 'ir',
    'grow': 'crecer',
    'handle': 'manejar',
    'happen': 'suceder',
    'hate': 'odiar',
    'have': 'tener',
    'hear': 'oír',
    'help': 'ayudar',
    'hide': 'esconder',
    'hold': 'sostener',
    'hope': 'esperar',
    'hurt': 'herir',
    'identify': 'identificar',
    'ignore': 'ignorar',
    'illustrate': 'ilustrar',
    'imagine': 'imaginar',
    'impact': 'impactar',
    'implement': 'implementar',
    'imply': 'implicar',
    'import': 'importar',
    'impose': 'imponer',
    'improve': 'improve',
    'include': 'incluir',
    'increase': 'aumentar',
    'indicate': 'indicar',
    'influence': 'influir',
    'inform': 'informar',
    'insist': 'insistir',
    'install': 'instalar',
    'intend': 'tener la intención',
    'introduce': 'introducir',
    'invite': 'invitar',
    'involve': 'involucrar',
    'join': 'unirse',
    'jump': 'saltar',
    'keep': 'mantener',
    'kick': 'patear',
    'kill': 'matar',
    'kiss': 'besar',
    'know': 'saber',
    'lack': 'carecer',
    'land': 'aterrizar',
    'last': 'durar',
    'laugh': 'reír',
    'launch': 'lanzar',
    'lay': 'poner',
    'lead': 'liderar',
    'lean': 'apoyarse',
    'learn': 'aprender',
    'leave': 'dejar',
    'lend': 'prestar',
    'let': 'dejar',
    'lie': 'mentir',
    'lift': 'levantar',
    'like': 'gustar',
    'limit': 'limitar',
    'line': 'línea',
    'link': 'enlazar',
    'list': 'listar',
    'listen': 'escuchar',
    'live': 'vivir',
    'load': 'cargar',
    'locate': 'localizar',
    'lock': 'bloquear',
    'look': 'mirar',
    'lose': 'perder',
    'love': 'amar',
    'make': 'hacer',
    'manage': 'manejar',
    'mark': 'marcar',
    'match': 'coincidir',
    'matter': 'importar',
    'mean': 'significar',
    'measure': 'medir',
    'meet': 'encontrar',
    'mention': 'mencionar',
    'mind': 'importar',
    'miss': 'extrañar',
    'mix': 'mezclar',
    'move': 'mover',
    'need': 'necesitar',
    'note': 'notar',
    'notice': 'notar',
    'obtain': 'obtener',
    'occur': 'ocurrir',
    'offer': 'ofrecer',
    'open': 'abrir',
    'order': 'ordenar',
    'organize': 'organizar',
    'overcome': 'superar',
    'owe': 'deber',
    'own': 'poseer',
    'paint': 'pintar',
    'participate': 'participar',
    'pass': 'pasar',
    'perform': 'realizar',
    'permit': 'permitir',
    'pick': 'elegir',
    'place': 'colocar',
    'plan': 'planear',
    'play': 'jugar',
    'point': 'apuntar',
    'pose': 'plantear',
    'practice': 'practicar',
    'predict': 'predecir',
    'prefer': 'preferir',
    'prepare': 'preparar',
    'present': 'presentar',
    'preserve': 'preservar',
    'press': 'presionar',
    'pretend': 'fingir',
    'prevent': 'prevenir',
    'produce': 'producir',
    'promise': 'prometer',
    'promote': 'promover',
    'protect': 'proteger',
    'prove': 'probar',
    'provide': 'proporcionar',
    'pull': 'tirar',
    'push': 'empujar',
    'put': 'poner',
    'raise': 'elevar',
    'reach': 'alcanzar',
    'read': 'leer',
    'realize': 'darse cuenta',
    'receive': 'recibir',
    'recognize': 'reconocer',
    'record': 'grabar',
    'reduce': 'reducir',
    'refer': 'referir',
    'reflect': 'reflejar',
    'refuse': 'rechazar',
    'regard': 'considerar',
    'relate': 'relacionar',
    'release': 'liberar',
    'remain': 'permanecer',
    'remember': 'recordar',
    'remove': 'quitar',
    'repeat': 'repetir',
    'replace': 'reemplazar',
    'reply': 'responder',
    'report': 'informar',
    'represent': 'representar',
    'require': 'requerir',
    'research': 'investigar',
    'resolve': 'resolver',
    'respond': 'responder',
    'rest': 'descansar',
    'result': 'resultar',
    'return': 'regresar',
    'reveal': 'revelar',
    'review': 'revisar',
    'ride': 'montar',
    'ring': 'sonar',
    'rise': 'subir',
    'risk': 'arriesgar',
    'roll': 'rodar',
    'run': 'correr',
    'save': 'guardar',
    'say': 'decir',
    'see': 'ver',
    'seek': 'buscar',
    'seem': 'parecer',
    'sell': 'vender',
    'send': 'enviar',
    'serve': 'servir',
    'set': 'establecer',
    'share': 'compartir',
    'shoot': 'disparar',
    'show': 'mostrar',
    'shut': 'cerrar',
    'sing': 'cantar',
    'sink': 'hundir',
    'sit': 'sentarse',
    'sleep': 'dormir',
    'slide': 'deslizar',
    'smile': 'sonreír',
    'solve': 'resolver',
    'sort': 'ordenar',
    'sound': 'sonar',
    'speak': 'hablar',
    'spend': 'gastar',
    'spread': 'extender',
    'stand': 'estar de pie',
    'start': 'comenzar',
    'state': 'declarar',
    'stay': 'quedarse',
    'steal': 'robar',
    'stick': 'pegar',
    'stop': 'detener',
    'study': 'estudiar',
    'succeed': 'tener éxito',
    'suffer': 'sufrir',
    'suggest': 'sugerir',
    'support': 'apoyar',
    'suppose': 'suponer',
    'surprise': 'sorprender',
    'survive': 'sobrevivir',
    'swear': 'jurar',
    'sweep': 'barrer',
    'swim': 'nadar',
    'take': 'tomar',
    'talk': 'hablar',
    'teach': 'enseñar',
    'tear': 'romper',
    'tell': 'decir',
    'tend': 'tender',
    'test': 'probar',
    'thank': 'agradecer',
    'think': 'pensar',
    'throw': 'lanzar',
    'touch': 'tocar',
    'track': 'rastrear',
    'trade': 'comerciar',
    'train': 'entrenar',
    'transfer': 'transferir',
    'transform': 'transformar',
    'translate': 'traducir',
    'travel': 'viajar',
    'treat': 'tratar',
    'trick': 'engañar',
    'try': 'intentar',
    'turn': 'girar',
    'understand': 'entender',
    'unite': 'unir',
    'update': 'actualizar',
    'use': 'usar',
    'visit': 'visitar',
    'vote': 'votar',
    'wait': 'esperar',
    'wake': 'despertar',
    'walk': 'caminar',
    'want': 'querer',
    'warn': 'advertir',
    'wash': 'lavar',
    'watch': 'mirar',
    'water': 'regar',
    'wave': 'saludar',
    'wear': 'usar',
    'weigh': 'pesar',
    'welcome': 'dar la bienvenida',
    'win': 'ganar',
    'wish': 'desear',
    'wonder': 'preguntarse',
    'work': 'trabajar',
    'worry': 'preocuparse',
    'write': 'escribir',
    'yield': 'ceder',
    'zone': 'zonificar'
  };
  
  let resultado = nombre;
  
  // Ordenar por longitud descendente para evitar reemplazos parciales
  const terminos = Object.keys(traduccionesCompletas).sort((a, b) => b.length - a.length);
  
  // Usar placeholders para evitar que los reemplazos se pisen
  const placeholders = [];
  
  terminos.forEach((termino, i) => {
    const regex = new RegExp(termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    resultado = resultado.replace(regex, `%%${i}%%`);
    placeholders[i] = traduccionesCompletas[termino];
  });
  
  // Reemplazar placeholders con valores finales
  placeholders.forEach((valor, i) => {
    resultado = resultado.replace(new RegExp(`%%${i}%%`, 'g'), valor);
  });
  
  return resultado;
}

async function main() {
  const SQL = await initSqlJs();
  
  // Cargar o crear la base de datos
  let db;
  if (fs.existsSync(DB_PATH)) {
    const filebuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(filebuffer);
    console.log('📂 Base de datos existente cargada');
  } else {
    db = new SQL.Database();
    console.log('🆕 Creando nueva base de datos');
  }

  // Crear tablas
  db.run(`
    CREATE TABLE IF NOT EXISTS codigos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      nombre_tecnico TEXT NOT NULL,
      nombre_es TEXT,
      marca TEXT DEFAULT 'Genérico',
      explicacion TEXT,
      sintomas TEXT,
      causas TEXT,
      pasos_diagnostico TEXT,
      gravedad TEXT,
      se_puede_manejar TEXT,
      estado TEXT DEFAULT 'borrador',
      fecha_creacion TEXT DEFAULT (datetime('now')),
      fecha_actualizacion TEXT DEFAULT (datetime('now')),
      revisor TEXT,
      fuente_base TEXT DEFAULT 'Wal33D/dtc-database',
      UNIQUE(codigo, marca)
    );
  `);

  // Verificar si existe la columna nombre_es y agregarla si no existe (para BD existentes con esquema viejo)
  const columnas = db.exec("PRAGMA table_info(codigos)");
  const tieneNombreEs = columnas.length > 0 && columnas[0].values.some(fila => fila[1] === 'nombre_es');
  
  if (!tieneNombreEs) {
    console.log('🔄 Agregando columna nombre_es...');
    db.run('ALTER TABLE codigos ADD COLUMN nombre_es TEXT');
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS marcas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL,
      nombre_visible TEXT NOT NULL,
      prioridad INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS fallas_por_marca (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo_id INTEGER REFERENCES codigos(id),
      marca_id INTEGER REFERENCES marcas(id),
      modelo TEXT,
      causas_comunes TEXT,
      notas TEXT,
      estado TEXT DEFAULT 'borrador'
    );

    CREATE TABLE IF NOT EXISTS sugerencias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL,
      tipo TEXT NOT NULL,
      contenido TEXT NOT NULL,
      contacto TEXT,
      estado TEXT DEFAULT 'pendiente',
      respuesta TEXT,
      fecha_creacion TEXT DEFAULT (datetime('now')),
      fecha_respuesta TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_codigos_codigo ON codigos(codigo);
    CREATE INDEX IF NOT EXISTS idx_codigos_categoria ON codigos(categoria);
    CREATE INDEX IF NOT EXISTS idx_codigos_estado ON codigos(estado);
  `);

  // Insertar marcas prioritarias
  const marcas = [
    ['chevrolet', 'Chevrolet', 1],
    ['renault', 'Renault', 1],
    ['mazda', 'Mazda', 1],
    ['kia', 'Kia', 1],
    ['toyota', 'Toyota', 1],
    ['nissan', 'Nissan', 1],
    ['hyundai', 'Hyundai', 1],
    ['volkswagen', 'Volkswagen', 2],
    ['honda', 'Honda', 2],
    ['ford', 'Ford', 2],
    ['bmw', 'BMW', 3],
    ['mercedes', 'Mercedes-Benz', 3],
    ['audi', 'Audi', 3],
  ];

  const insertMarca = db.prepare('INSERT OR IGNORE INTO marcas (nombre, nombre_visible, prioridad) VALUES (?, ?, ?)');
  marcas.forEach(m => insertMarca.run(m));
  insertMarca.free();

  // Función para parsear una línea del archivo
  function parseLine(line) {
    const match = line.match(/^([PBCU][0-9A-F]{4})\s+-\s+(.+)$/);
    if (match) {
      return { codigo: match[1], nombre_tecnico: match[2].trim() };
    }
    return null;
  }

  // Función para determinar la categoría
  function getCategoria(codigo) {
    return codigo.charAt(0);
  }

  // Importar archivos de códigos genéricos
  const archivosGenericos = ['p_codes.txt', 'u_codes.txt', 'b_codes.txt', 'c_codes.txt'];
  const insertCodigoGen = db.prepare(`
    INSERT OR IGNORE INTO codigos (codigo, categoria, nombre_tecnico, nombre_es, marca)
    VALUES (?, ?, ?, ?, 'Genérico')
  `);

  let totalImportados = 0;

  archivosGenericos.forEach(archivo => {
    const filePath = path.join(SOURCE_DIR, archivo);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  No se encontró: ${archivo}`);
      return;
    }

    const contenido = fs.readFileSync(filePath, 'utf-8');
    const lineas = contenido.split('\n');
    let importados = 0;

    lineas.forEach(linea => {
      const parsed = parseLine(linea.trim());
      if (parsed) {
        const nombreEs = traducirNombre(parsed.nombre_tecnico);
        insertCodigoGen.run([parsed.codigo, getCategoria(parsed.codigo), parsed.nombre_tecnico, nombreEs]);
        importados++;
      }
    });

    console.log(`✅ ${archivo}: ${importados} códigos importados`);
    totalImportados += importados;
  });

  console.log(`\n📊 Total de códigos genéricos importados: ${totalImportados}`);

  // Importar códigos de marcas
  const archivosMarcas = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('_codes.txt') && !archivosGenericos.includes(f));
  let totalMarcas = 0;

  archivosMarcas.forEach(archivo => {
    const filePath = path.join(SOURCE_DIR, archivo);
    const contenido = fs.readFileSync(filePath, 'utf-8');
    const lineas = contenido.split('\n');
    let importados = 0;

    // Mapa de nombre de archivo a nombre visible de marca
    const nombreMarcaMap = {
      'acura': 'Acura', 'audi': 'Audi', 'bmw': 'BMW', 'buick': 'Buick',
      'cadillac': 'Cadillac', 'chevy': 'Chevrolet', 'chrysler': 'Chrysler',
      'dodge': 'Dodge', 'ford': 'Ford', 'geo': 'Geo', 'gmc': 'GMC',
      'gm': 'GM', 'honda': 'Honda', 'infiniti': 'Infiniti', 'jaguar': 'Jaguar',
      'jeep': 'Jeep', 'kia': 'Kia', 'lexus': 'Lexus', 'lincoln': 'Lincoln',
      'mazda': 'Mazda', 'mercedes': 'Mercedes-Benz', 'mercury': 'Mercury',
      'mitsubishi': 'Mitsubishi', 'nissan': 'Nissan', 'oldsmobile': 'Oldsmobile',
      'other': 'Other', 'plymouth': 'Plymouth', 'pontiac': 'Pontiac',
      'saturn': 'Saturn', 'subaru': 'Subaru', 'suzuki': 'Suzuki',
      'toyota': 'Toyota', 'volkswagen': 'Volkswagen', 'renault': 'Renault'
    };

    lineas.forEach(linea => {
      const parsed = parseLine(linea.trim());
      if (parsed) {
        const archivoSinExt = archivo.replace('_codes.txt', '').toLowerCase();
        const nombreMarca = nombreMarcaMap[archivoSinExt] || archivoSinExt;
        const nombreCompleto = `[${nombreMarca}] ${parsed.nombre_tecnico}`;
        // Para códigos de marcas: mantener texto original con nota
        const nombreEs = `[${nombreMarca}] ${parsed.nombre_tecnico} (específico de ${nombreMarca})`;
        db.run(`INSERT OR IGNORE INTO codigos (codigo, categoria, nombre_tecnico, nombre_es, marca) VALUES (?, ?, ?, ?, ?)`,
          [parsed.codigo, getCategoria(parsed.codigo), nombreCompleto, nombreEs, nombreMarca]);
        importados++;
      }
    });

    if (importados > 0) {
      console.log(`✅ ${archivo}: ${importados} códigos de marca importados`);
      totalMarcas += importados;
    }
  });

  console.log(`\n📊 Total de códigos de marca importados: ${totalMarcas}`);

  // Guardar la base de datos
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
  db.close();

  console.log(`\n🎉 Importación completada en: ${DB_PATH}`);
}

main().catch(console.error);
