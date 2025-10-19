const HaxballJS = require("haxball.js");
const {
    fs,
    path,
    FormData,
    axios,
    fsPromises,
} = require('./utils/lib.js');
const {
    mapaSalaDeEspera,
    MENSAJE_LLAMAR_ADMIN,
    MENSAJE_DISCORD,
    MENSAJE_GUIA,
} = require('./utils/var.js');
const { updateJsonFiles } = require('./updateJson');
const {
    enviarDiscordYCambio,
    enviarMensajeGuia,
    enviarMensajeLlamarAdmin,
    resetTouchStats,
} = require('./utils/functions.js');
// Llamar a updateJsonFiles cada 30 segundos, solo si hay jugadores

HaxballJS.then((HBInit) => {
    // Same as in Haxball Headless Host Documentation
    const room = HBInit({
        roomName: '🔥 𝙓𝟰 | Dts',
        maxPlayers: 18,
        public: false,
        playerName: "saturnx4.glitch.me",
        noPlayer: true,
        token: 'thr1.AAAAAGgxKa7NNGfBpBQbyw.V-kQ0pAf7g8'
    });

    let updateJsonInterval = 10000; // Intervalo por defecto (10 segundos)
let updateJsonIntervalId = null; // Para almacenar el ID del intervalo

// Función para ejecutar updateJsonFiles
function executeUpdateJsonFiles() {
  try {
    const playerList = room.getPlayerList().filter(p => p.id !== 0);
    const playerCount = playerList.length;
    
    // Actualizar intervalo según cantidad de jugadores
    const newInterval = playerCount === 0 ? 35000 : 10000; // 35s si no hay jugadores, 10s si hay
    
    if (newInterval !== updateJsonInterval) {
      console.log(`[DEBUG] Cambiando intervalo de updateJsonFiles a ${newInterval / 1000} segundos. Jugadores: ${playerCount}`);
      clearInterval(updateJsonIntervalId);
      updateJsonInterval = newInterval;
      updateJsonIntervalId = setInterval(executeUpdateJsonFiles, updateJsonInterval);
    }

    // Ejecutar updateJsonFiles incluso con 0 jugadores
    updateJsonFiles(room);
    console.log(`[DEBUG] updateJsonFiles ejecutado con ${playerCount} jugadores.`);
  } catch (error) {
    console.error("[ERROR] Fallo al ejecutar updateJsonFiles:", error.message);
  }
}

// Iniciar el intervalo
updateJsonIntervalId = setInterval(executeUpdateJsonFiles, updateJsonInterval);
const INTERVALO_DISCORD_CAMBIO = 130000;
    const INTERVALO_LLAMAR_ADMIN = 90000;
    const START_PLAYERS = 12; // Jugadores necesarios para iniciar la partida
    const PHANTOM_TIME_OUT = 60;
    const PHANTOM_DURATION = 4000;
    const PHANTOM_COOLDOWN = 30000;
    const DEFAULT_CMASK = 0x3F;
    const PLAYER_CGROUP = 0x02;
        // Cooldowns para las nuevas habilidades
let supernovaCooldown = {};
let thunderReboundCooldown = {};

// Constantes para Supernova
    function enviarAnuncio() {
    room.sendAnnouncement("¡Visita nuestro ranking oficial! 🌟 https://saturnx4.glitch.me/ranking.html", null, 0x00FF00, "small", 2);
}

// Configurar el intervalo para enviar el anuncio cada 50 segundos
    setInterval(enviarAnuncio, 70 * 1000); // 50 segundos en milisegundos
// Constantes para Thunder Rebound
const DEFAULT_BCOEFF = 0.4; // Valor por defecto de bCoeff
    const PHANTOM_SPEED_COEFFICIENT = 1.2;
    const DURACION_MERCADO = 120000;
    const PRESUPUESTO_INICIAL = 25;
    const VALOR_BASE_JUGADOR = 10;
    const PREMIO_GOL_EQUIPO = 10;
    const INCREMENTO_VALOR_POR_GOL = 15;
    const INCREMENTO_VALOR_POR_ASISTENCIA = 10;
    const DT_REMINDER_INTERVAL = 10000;
    const WARNING_TIME = 10000;
    const SELECTION_TIME_PER_PLAYER = 40000;
    const TIEMPO_ADVERTENCIA = 10000;
    const TIEMPO_TOTAL_POR_DT = 85000;
    var UltraTimeOut = 95;
    var TimeOut = 75;
    var UltraPowerCoefficient = 1.7;
    var PowerCoefficient = 1.3;
    const POSICIONES_SPAWN = {
        DT: [
            { x: 361, y: 356 },
            { x: -412, y: 375 },
        ],
        ROJO: [
            { x: -250, y: -13 },
            { x: -698, y: -13 }
        ],
        AZUL: [
            { x: 700, y: -10 },
            { x: 285, y: -10 }
        ]
    };
    const MESSAGE_LIMIT = 1; // Máximo de mensajes por segundo
    const TIME_WINDOW = 1000; // Ventana de tiempo en milisegundos (1 segundo)
    const UMBRAL_LLAMADA_ADMIN = 8; // Número de votos necesarios
    const TIEMPO_LLAMADA_ADMIN_MS = 60 * 1000; // 1 minuto en milisegundos
    const URL_WEBHOOK_LLAMADA_ADMIN = "https://discord.com/api/webhooks/1361422628203663370/TdDZUOobEdrpqNlW3kql4MkgKdtNa8p-dnHqvaceED9ufCeQb0zEOJqAkJxn3CwqQ5OL"; // Reemplaza con la URL de tu webhook de Discord
    var Admin = "Rhyno";
    var Admin1 = "recc";
    var password = "!-_oKo52X$1j:b3J,h7nC)l00>`Eeq)h7V;Wb?";
    const DT_POSITIONS = {
        RED: { x: -339, y: 371 },
        BLUE: { x: 330, y: 371 }
    };
    const HEARTBEAT_INTERVAL = 20000; // 10 segundos
const GLITCH_HEARTBEAT_URL = 'https://saturnx4.glitch.me/heartbeat-extreme';

// Función para enviar heartbeat
// Variable global para almacenar el enlace de la sala
let roomLink = null;
let heartbeatInterval = HEARTBEAT_INTERVAL; // Intervalo por defecto (20 segundos)
// Evento para obtener el enlace de la sala
room.onRoomLink = function (link) {
    console.log(`[DEBUG] Enlace de la sala recibido: ${link}`);
    roomLink = link; // Almacenar el enlace
    if (!hasSentRoomOpenNotification) {
        sendRoomOpenNotification(link);
        hasSentRoomOpenNotification = true; // Marcar que la notificación ya se envió
    }
};

// Función para enviar heartbeat
// Función para enviar heartbeat


// Función para enviar heartbeat
// Función para enviar heartbeat
// Variables globales para rastrear estado
let lastPlayerCount = 0;
let lastValidHeartbeat = 0;
let lastValidPlayers = [];
const HEARTBEAT_OFFLINE_INTERVAL = 25000; // 60 segundos
const BACKUP_VALIDITY = 50000; // 90 segundos
let intervalId = setInterval(sendHeartbeat, heartbeatInterval);

// Función para enviar heartbeat de respaldo
async function sendBackupHeartbeat() {
  try {
    const roomDetails = {
      timestamp: Date.now(),
      playerCount: lastPlayerCount,
      mode: 'extreme',
      roomName: "#2",
      players: lastValidPlayers,
      maxPlayers: 18,
      link: roomLink,
      status: roomwaiting ? 'waiting' : (mercadoActivo ? 'mercado' : (juegoEnCurso ? 'playing' : 'idle'))
    };
    await axios.post(GLITCH_HEARTBEAT_URL, roomDetails, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
    console.log(`[DEBUG] Heartbeat de respaldo enviado: ${lastPlayerCount}/18 jugadores`);
  } catch (error) {
    console.error('[ERROR] Error al enviar heartbeat de respaldo:', error.message);
  }
}

// Función para enviar heartbeat
async function sendHeartbeat() {
  try {
    // Validar objeto room
    if (!room || typeof room.getPlayerList !== 'function') {
      console.error('[ERROR] Objeto room inválido o no inicializado en sendHeartbeat');
      if (lastPlayerCount > 0 && Date.now() - lastValidHeartbeat < BACKUP_VALIDITY) {
        console.log(`[DEBUG] Usando datos de respaldo: ${lastPlayerCount} jugadores`);
        await sendBackupHeartbeat();
      }
      return;
    }

    const playerList = room.getPlayerList().filter(p => p.id !== 0);
    const playerCount = playerList.length;
    console.log(`[DEBUG] Enviando heartbeat con ${playerCount} jugadores: ${JSON.stringify(playerList.map(p => ({ id: p.id, name: p.name })))}`);

    // Depuración del estado de la sala
    console.log(`[DEBUG] Estado de la sala: roomwaiting=${roomwaiting}, juegoEnCurso=${juegoEnCurso}, mercadoActivo=${mercadoActivo}, enTransicion=${enTransicion}`);

    // Validar conteo de jugadores contra el estado de la sala
    const expectedPlayers = juegoEnCurso || mercadoActivo ? Math.max(jugadoresEnJuego[1].length + jugadoresEnJuego[2].length, DTS.length) : room.getPlayerList().length;
    if (playerCount === 0 && expectedPlayers > 0 && lastPlayerCount > 0 && Date.now() - lastValidHeartbeat < BACKUP_VALIDITY) {
      console.log(`[DEBUG] Ignorando playerCount=0 (esperado: ${expectedPlayers}), usando último conteo válido: ${lastPlayerCount}`);
      await sendBackupHeartbeat();
      return;
    }

    const playerNames = playerList.map(p => p.name);
    const roomDetails = {
      timestamp: Date.now(),
      playerCount,
      mode: 'extreme',
      roomName: "#2",
      players: playerNames,
      maxPlayers: 18,
      link: roomLink,
      status: roomwaiting ? 'waiting' : (mercadoActivo ? 'mercado' : (juegoEnCurso ? 'playing' : 'idle'))
    };

    await axios.post(GLITCH_HEARTBEAT_URL, roomDetails, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
    console.log(`[DEBUG] Heartbeat enviado a Glitch (Extreme): ${playerCount}/${roomDetails.maxPlayers} jugadores, Link: ${roomDetails.link}`);

    // Actualizar datos de respaldo solo si el conteo es coherente
    if (playerCount > 0 || (playerCount === 0 && expectedPlayers === 0)) {
      lastPlayerCount = playerCount;
      lastValidHeartbeat = Date.now();
      lastValidPlayers = playerNames;
    }
  } catch (error) {
    console.error('[ERROR] Error al enviar heartbeat (Extreme):', error.message);
    if (lastPlayerCount > 0 && Date.now() - lastValidHeartbeat < BACKUP_VALIDITY) {
      console.log(`[DEBUG] Error en heartbeat, usando último conteo válido: ${lastPlayerCount}`);
      await sendBackupHeartbeat();
    }
  }
}

// Actualizar intervalo dinámicamente
setInterval(() => {
  try {
    if (!room || typeof room.getPlayerList !== 'function') {
      console.error('[ERROR] Objeto room inválido al actualizar intervalo');
      return;
    }

    const playerList = room.getPlayerList().filter(p => p.id !== 0);
    const playerCount = playerList.length;
    const newInterval = playerCount === 0 ? HEARTBEAT_OFFLINE_INTERVAL : HEARTBEAT_INTERVAL;

    console.log(`[DEBUG] Verificando intervalo: ${playerCount} jugadores, intervalo actual: ${heartbeatInterval / 1000}s`);

    if (newInterval !== heartbeatInterval) {
      clearInterval(intervalId);
      heartbeatInterval = newInterval;
      intervalId = setInterval(sendHeartbeat, heartbeatInterval);
      console.log(`[DEBUG] Intervalo de heartbeat actualizado a ${heartbeatInterval / 1000} segundos. Jugadores: ${playerCount}`);
    }
  } catch (error) {
    console.error('[ERROR] Error al actualizar intervalo de heartbeat:', error.message);
  }
}, 10000);

// Depuración periódica del estado de la sala
setInterval(() => {
  try {
    const playerList = room.getPlayerList().filter(p => p.id !== 0);
    const expectedPlayers = juegoEnCurso || mercadoActivo ? Math.max(jugadoresEnJuego[1].length + jugadoresEnJuego[2].length, DTS.length) : playerList.length;
    console.log(`[DEBUG] Estado de la sala: ${playerList.length} jugadores, esperado=${expectedPlayers}, roomwaiting=${roomwaiting}, juegoEnCurso=${juegoEnCurso}, mercadoActivo=${mercadoActivo}, enTransicion=${enTransicion}`);
  } catch (error) {
    console.error('[ERROR] Error al verificar estado de la sala:', error.message);
  }
}, 30000);


// Actualizar intervalo dinámicamente
// Iniciar heartbeat con intervalo dinámico




// Actualizar intervalo dinámicamente


const map = fs.readFileSync(path.join(__dirname,'extreme', 'maps', 'map.hbs'), 'utf8');
const map1 = fs.readFileSync(path.join(__dirname,'extreme', 'maps', 'map1.hbs'), 'utf8');
const map3 = fs.readFileSync(path.join(__dirname,'extreme', 'maps', 'map3.hbs'), 'utf8');
const map4 = fs.readFileSync(path.join(__dirname,'extreme', 'maps', 'map4.hbs'), 'utf8');
const MAPA_FICHAJES = fs.readFileSync(path.join(__dirname,'extreme', 'maps', 'MAPA_FICHAJES.hbs'), 'utf8');
const adminKeys = {};
let enTransicion = false; // Declara en el ámbito global, junto con otras variables
const mapasDisponibles = [map, map1, map3, map4]; 
const MIN_JUGADORES_EQUIPO = 4;
const MIN_PLAYERS_FOR_GAME = 10;
const MIN_TIEMPO_EXTRA = 60000;
const MAX_TIEMPO_EXTRA = 180000;
let teamKicks = { 1: 0, 2: 0 }; // Contador de kicks por equipo (1: Rojo, 2: Azul)
let matchScore = { red: 0, blue: 0 }; // Contador de goles por equipo

const playerIps = {}; // { playerId: ip }

const chatCooldown = new Map(); // ID del jugador -> { lastMessageTime, messageCount }


let matchStats = {
    redGoals: 0,
    blueGoals: 0,
    redScorers: {}, // { playerId: { name, goals, assists } }
    blueScorers: {}, // { playerId: { name, goals, assists } }
    redPlayers: [],
    bluePlayers: [],
    startTime: null,
    endTime: null
};
// Lista de ISPs sospechosos asociados con VPNs, servidores en la nube o redes no residenciales


// Caché para almacenar resultados de verificaciones de IPs
const ipCache = new Map(); // { ip: { isVpn, ispName } }
let lastCacheUpdate = 0;

var hostabierto = false;





// Funciones para enviar mensajes automáticos

// Iniciar los ciclos de mensajes en intervalos diferentes
setInterval(() => enviarDiscordYCambio(room, MENSAJE_DISCORD), INTERVALO_DISCORD_CAMBIO); // Cada 60s
setInterval(() => enviarMensajeLlamarAdmin(room, MENSAJE_LLAMAR_ADMIN), INTERVALO_LLAMAR_ADMIN); // Cada 100s
setInterval(() => enviarMensajeGuia(room, MENSAJE_GUIA), INTERVALO_LLAMAR_ADMIN); // Cada 75s


// Una sola posición de spawn por equipo (ajustá según tu estadio)
// Posiciones de spawn para DTs y jugadores (ajustá según tu estadio)
room.setDefaultStadium('Big');
room.setScoreLimit(0);
room.setTeamsLock(true);



let DTS = [];
var playerTeam = {};
var currentDT = 0; // Índice del DT que tiene el turno para seleccionar
const Team = { SPECTATORS: 0, RED: 1, BLUE: 2 };

var jugadoresEnJuego = { 1: [], 2: [] }; // Lista de jugadores en cada equipo
var juegoPausado = false; // Estado del juego (si está pausado)
var juegoEnCurso = false;
let titularesTimers = {
    1: null, // Timer para el equipo rojo
    2: null  // Timer para el equipo azul
};
let masterControlCooldown = {};
var phantomStrikeCooldown = {};
var phantomTimePlayerBallTouch = 0; // Contador para activar
var phantomActive = false; // Estado de activación


let faseTitulares = false;
let temporizadorSeleccion = null;
let temporizadorPartido = null;
let dtSeleccionCompleta = { 1: false, 2: false };
let tiempoExtra = 0;
let jugadoresFichados = new Set(); // Se limpia al inicio de cada mercado
let dtReminderTimeout = null;
const playersFilePath = path.join(__dirname, 'player_logs.json'); // Ruta al archivo JSON
let modoTest = false;
var playerAuth = {};
var playerColors = {};
var playerGoals = {};
var playerAssists = {};

let temporizadorTiempoExtra = null;
let countdownInterval = null;

var TimePlayerBallTouch = 0;
var UltraTimePlayerBallTouch = 0; // Contador separado para Ultra Power Shot
var powerActive = false; // You can kick the ball faster when this is true.
var ultraPowerActive = false; // Para Ultra Power Shot
var lastPlayerTouched = "";
var lastTeamTouched = 0;
var spaceTouchTime = {};       // Contador de tiempo por jugador para Master Space
var masterSpaceCooldown = {};  // Cooldown por jugador para Master Space
POINTS_PER_KICK = 10;
let camisetasUsadas = {
    1: "", // camiseta usada por el equipo 1
    2: ""  // camiseta usada por el equipo 2
};
var lastPlayerToKick = null, secondaryPlayerTouched = null;
let timerPorDT = {
    1: null, // Timer para DT rojo
    2: null  // Timer para DT azul
};
let temporizadorSalaNegociacion = null; // Agregar variable global para el temporizador

let warningPorDT = {
    1: null, // Warning timer para DT rojo
    2: null  // Warning timer para DT azul
};

let presupuestoEquipos = {
    1: PRESUPUESTO_INICIAL, // Equipo Rojo
    2: PRESUPUESTO_INICIAL  // Equipo Azul
};
let selectionTimers = {
    dt1: null,
    dt2: null
};

var jugadoresSeleccionados = { 1: [], 2: [] };  // 1 = Rojo, 2 = Azul


room.setTimeLimit(0);
let playerValues = {};
let golesJugadores = {};
let temporizadorMercado;
let mercadoActivo = false;
let roomwaiting = false;



waitingRoom()
room.setScoreLimit(0);
room.setTimeLimit(0);

// Sistema de llamada a admin
let votosLlamadaAdmin = {}; // Almacena los votos por auth del jugador
let llamadaActiva = null; // { razonInicial, inicio: timestamp }
let temporizadorLlamadaAdmin = null; // Controla el temporizador de 1 minuto

var defaults = {
    kickingDamping: 0.9649 // Valor para detectar tecla X
  };
var mapBounds = { x: 1150, y: 610 };
  
  // Estado de los jugadores
var playerStates = {};





function waitingRoom() {
    roomwaiting = true;
    modoTest = true;

    // Configura el mapa de la sala de espera
    room.setCustomStadium(mapaSalaDeEspera);
    room.stopGame();
    room.startGame();

    // Asignar equipos balanceados a todos los jugadores
    const players = room.getPlayerList().filter(p => p.id !== 0);
    let teamA = [];
    let teamB = [];
    players.forEach(player => {
        if (teamA.length > teamB.length) {
            room.setPlayerTeam(player.id, Team.BLUE);
            teamB.push(player);
        } else if (teamB.length > teamA.length) {
            room.setPlayerTeam(player.id, Team.RED);
            teamA.push(player);
        } else {
            const randomTeam = Math.floor(Math.random() * 2) + 1;
            room.setPlayerTeam(player.id, randomTeam === 1 ? Team.RED : Team.BLUE);
            if (randomTeam === 1) teamA.push(player);
            else teamB.push(player);
        }
    });

    // Anuncio de activación con conteo, usando amarillo brillante
    const playersCount = players.length;
    room.sendAnnouncement(
        `[Server] 🕒 Sala de espera activada. Jugadores: ${playersCount}/${START_PLAYERS}`,
        null,
        0xFFFF00, // Amarillo brillante
        "small",
        2
    );

    // Verifica si ya se puede salir
    checkWaitingRoomStatus();
}
function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 8; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}
function ensureHexPrefix(color) {
    if (!color.startsWith('0x')) {
        return '0x' + color;
    }
    return color;
}
function decryptHex(str) {
    let strOut = "";
    for (let x = 0; x < str.length; x += 2) {
        strOut += String.fromCharCode(parseInt(str.substr(x, 2), 16));
    }
    return strOut;
}
function pointDistance(p1, p2) {
    var d1 = p1.x - p2.x;
    var d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}
function checkWaitingRoomStatus() {
    const players = room.getPlayerList().filter(p => p.id !== 0);
    const totalPlayers = players.length;

    if (roomwaiting && totalPlayers >= START_PLAYERS) {
        roomwaiting = false;
        room.stopGame();
        
        // Selecciona un mapa aleatorio para el juego real
        const mapaAleatorio = mapasDisponibles[Math.floor(Math.random() * mapasDisponibles.length)];
        room.setCustomStadium(mapaAleatorio);
        
        // Anuncio de inicio
        room.sendAnnouncement(
            `[Server] ✅ ¡${totalPlayers}/${START_PLAYERS} jugadores! Iniciando partida...`,
            null,
            0x87C38F,
            "small",
            2
        );
        
        // Limpia equipos y mueve a todos a espectadores para iniciar selección
        room.getPlayerList().forEach(player => {
            room.setPlayerTeam(player.id, Team.SPECTATORS);
        });
        setTimeout(() => {
            modoTest = false;
        }, 2200); // Delay de 1 segundo
        reiniciarJuego(); // Inicia el proceso de selección de DTs
    } else if (roomwaiting) {
        // Actualiza el anuncio con el número de jugadores necesarios
        room.sendAnnouncement(
            `[Server] 🕒 Sala de espera activada. Jugadores: ${totalPlayers}/${START_PLAYERS}`,
            null,
            0xFFFF00, // Amarillo brillante
            "small",
            2
        );
    }
}


const ALLOWED_IP = "186.19.22.138";
room.onPositionsReset = function () {
    const jugadores = room.getPlayerList().filter(p => p.id !== 0);

// Separar jugadores por equipo y DTs
const rojos = jugadores.filter(j => j.team === Team.RED && !DTS.includes(j.name));
const azules = jugadores.filter(j => j.team === Team.BLUE && !DTS.includes(j.name));
const dts = jugadores.filter(j => DTS.includes(j.name));

// Asignar posiciones a DTs
dts.forEach(jugador => {
    const dtIndex = DTS.indexOf(jugador.name); // Índice en DTS (0 o 1)
    if (dtIndex >= 0 && dtIndex < POSICIONES_SPAWN.DT.length) {
        room.setPlayerDiscProperties(jugador.id, {
            x: POSICIONES_SPAWN.DT[dtIndex].x,
            y: POSICIONES_SPAWN.DT[dtIndex].y,
            xspeed: 0,
            yspeed: 0
        });
    }
});

// Dividir jugadores del equipo Rojo en dos grupos
const mitadRojo = Math.ceil(rojos.length / 2); // Mitad para balancear
rojos.forEach((jugador, index) => {
    const grupo = index < mitadRojo ? 0 : 1; // Primeros al grupo 1, resto al grupo 2
    room.setPlayerDiscProperties(jugador.id, {
        x: POSICIONES_SPAWN.ROJO[grupo].x,
        y: POSICIONES_SPAWN.ROJO[grupo].y,
        xspeed: 0,
        yspeed: 0
    });
});

// Dividir jugadores del equipo Azul en dos grupos
const mitadAzul = Math.ceil(azules.length / 2);
azules.forEach((jugador, index) => {
    const grupo = index < mitadAzul ? 0 : 1;
    room.setPlayerDiscProperties(jugador.id, {
        x: POSICIONES_SPAWN.AZUL[grupo].x,
        y: POSICIONES_SPAWN.AZUL[grupo].y,
        xspeed: 0,
        yspeed: 0
    });
});

};




room.onPlayerJoin = async function(player) {
    playerStates[player.id] = {
        activation: 0,
        slowdown: 0,
        slowdownUntil: 0,
        isRunning: false
    };

    const players = room.getPlayerList().filter(p => p.id !== 0);
    const totalPlayers = players.length;

    const teamA = players.filter(p => p.team === Team.RED);
    const teamB = players.filter(p => p.team === Team.BLUE);

    try {
        console.log(`[DEBUG] ${player.name} (ID: ${player.id}) intentando unirse a la sala. Total jugadores: ${totalPlayers}`);

        const playerIp = player.conn ? decryptHex(player.conn) : "unknown";
        console.log(`[DEBUG] IP detectada para ${player.name}: ${playerIp}`);

        const playersInRoom = players.filter(p => p.id !== player.id);
        console.log(`[DEBUG] Total de jugadores en la sala (excluyendo al nuevo): ${playersInRoom.length}`);

        const currentIps = playersInRoom.map(p => ({
            id: p.id,
            name: p.name,
            ip: playerIps[p.id] || "unknown"
        }));
        console.log(`[DEBUG] IPs almacenadas en la sala:`, JSON.stringify(currentIps, null, 2));

        const ipExists = Object.values(playerIps).includes(playerIp);
        console.log(`[DEBUG] ¿IP ${playerIp} ya existe en la sala? ${ipExists}`);

        if (ipExists && playerIp !== ALLOWED_IP) {
            console.log(`[DEBUG] Expulsando a ${player.name} (IP: ${playerIp}) porque la IP ya está en uso.`);
            room.kickPlayer(player.id, "Solo se permite una conexión por IP. Contacta a un admin.", false);
            return;
        }

        if (roomwaiting) {
            if (teamA.length > teamB.length) {
                room.setPlayerTeam(player.id, Team.BLUE);
            } else if (teamB.length > teamA.length) {
                room.setPlayerTeam(player.id, Team.RED);
            } else {
                const randomTeam = Math.floor(Math.random() * 2) + 1;
                room.setPlayerTeam(player.id, randomTeam === 1 ? Team.RED : Team.BLUE);
            }

            room.sendAnnouncement(
                `🌟 ¡Bienvenido, ${player.name}! 🌟\n` +
                `👥 Jugadores: ${totalPlayers}/${START_PLAYERS}\n` +
                `🏆 Mira el ranking oficial: https://saturnx4.glitch.me/ranking.html`,
                null,
                0x00FF00,
                "small",
                2
            );

            checkWaitingRoomStatus();
        } else {
            room.setPlayerTeam(player.id, Team.SPECTATORS);
        }

        const blacklistData = getBlacklistData();
        if (blacklistData.blacklisted_ips.includes(playerIp)) {
            room.kickPlayer(player.id, "Estás baneado de Rhyno", true);
            console.log(`[DEBUG] ${player.name} (IP: ${playerIp}) expulsado por blacklist.`);
            return;
        }

        const sameNamePlayers = playersInRoom.filter(p => p.name === player.name);
        if (sameNamePlayers.length > 0 && !player.admin) {
            room.kickPlayer(player.id, "❌ Ya hay un jugador con este nombre en la sala. Usa un nombre diferente o contacta a un admin.", false);
            console.log(`[DEBUG] ${player.name} expulsado por nombre duplicado.`);
            return;
        }

        playerIps[player.id] = playerIp;
        console.log(`[DEBUG] IP ${playerIp} almacenada para ${player.name} (ID: ${player.id}).`);

        playerColors[player.id] = 5;
        const playerKey = player.auth || `id_${player.id}`;
        playerAuth[player.id] = playerKey;

        let playerLogs = await readPlayerLogs();
        const currentDate = new Date().toISOString();

        // Sanitize player name to avoid issues with commas
        const sanitizedName = player.name.replace(/,/g, '');

        if (!playerLogs[playerKey]) {
            const discordCode = generateRandomKey();
            playerLogs[playerKey] = {
                conn: player.conn || "unknown",
                ip: playerIp,
                auth: player.auth || null,
                name: sanitizedName,
                oldname: "", // Initialize oldname as empty string
                goals: 0,
                assists: 0,
                elo: 500,
                points: 0,
                powershot: false,
                highlighted: false,
                mastercontrol: false,
                masterspace: false,
                ultrapowershot: false,
                voiddash: false,
                phantomstrike: false,
                gravityshift: false,
                supernova: false,
                celestial: false,
                upgrade1: false,
                upgrade2: false,
                upgrade3: false,
                equipped: {},
                Gil: 0,
                date: currentDate,
                totalVictories: 0,
                matchHistory: [],
                redeemedCodes: [],
                position: "",
                discord: discordCode,
                dtVictory: DTS.includes(player.name) ? 0 : undefined,
                dtDefeat: DTS.includes(player.name) ? 0 : undefined,
                dtDraw: DTS.includes(player.name) ? 0 : undefined
            };
            console.log(`Nuevo jugador registrado: ${sanitizedName} con código Discord: ${discordCode}`);
        } else {
            // Check if the player's name has changed
            if (playerLogs[playerKey].name !== sanitizedName) {
                console.log(`Jugador ${playerLogs[playerKey].name} cambió su nombre a ${sanitizedName}`);
                // Append the old name to oldname field (limit to 5 names)
                if (playerLogs[playerKey].name) {
                    let oldNames = playerLogs[playerKey].oldname ? playerLogs[playerKey].oldname.split(',') : [];
                    oldNames.push(playerLogs[playerKey].name);
                    oldNames = oldNames.slice(-5); // Keep only the last 5 names
                    playerLogs[playerKey].oldname = oldNames.join(',');
                }
                // Update the current name
                playerLogs[playerKey].name = sanitizedName;
            }
            playerLogs[playerKey].date = currentDate;
            playerLogs[playerKey].elo = playerLogs[playerKey].elo || 500;
            playerLogs[playerKey].points = playerLogs[playerKey].points || 0;
            playerLogs[playerKey].totalVictories = playerLogs[playerKey].totalVictories || 0;
            playerLogs[playerKey].matchHistory = playerLogs[playerKey].matchHistory || [];
            playerLogs[playerKey].powershot = playerLogs[playerKey].powershot || false;
            playerLogs[playerKey].highlighted = playerLogs[playerKey].highlighted || false;
            playerLogs[playerKey].mastercontrol = playerLogs[playerKey].mastercontrol || false;
            playerLogs[playerKey].masterspace = playerLogs[playerKey].masterspace || false;
            playerLogs[playerKey].ultrapowershot = playerLogs[playerKey].ultrapowershot || false;
            playerLogs[playerKey].phantomstrike = playerLogs[playerKey].phantomstrike || false;
            playerLogs[playerKey].gravityshift = playerLogs[playerKey].gravityshift || false;
            playerLogs[playerKey].supernova = playerLogs[playerKey].supernova || false;
            playerLogs[playerKey].celestial = playerLogs[playerKey].celestial || false;
            playerLogs[playerKey].voiddash = playerLogs[playerKey].voiddash || false;
            playerLogs[playerKey].upgrade1 = playerLogs[playerKey].upgrade1 || false;
            playerLogs[playerKey].upgrade2 = playerLogs[playerKey].upgrade2 || false;
            playerLogs[playerKey].upgrade3 = playerLogs[playerKey].upgrade3 || false;
            playerLogs[playerKey].equipped = playerLogs[playerKey].equipped || {};
            playerLogs[playerKey].redeemedCodes = playerLogs[playerKey].redeemedCodes || [];
            playerLogs[playerKey].position = playerLogs[playerKey].position || "";
            if (!playerLogs[playerKey].discord) {
                const discordCode = generateRandomKey();
                playerLogs[playerKey].discord = discordCode;
            }
            if (DTS.includes(sanitizedName)) {
                playerLogs[playerKey].dtVictory = playerLogs[playerKey].dtVictory || 0;
                playerLogs[playerKey].dtDefeat = playerLogs[playerKey].dtDefeat || 0;
                playerLogs[playerKey].dtDraw = playerLogs[playerKey].dtDraw || 0;
            }
        }

        await writePlayerLogs(playerLogs);
        console.log(`[DEBUG] Datos de ${sanitizedName} guardados en player_logs.json`);

        let adminList = { admins: [] };
        try {
            const adminData = fs.readFileSync(path.join('extreme', 'admin.json'), 'utf8');
            adminList = JSON.parse(adminData) || { admins: [] };
        } catch (err) {
            console.error("[ERROR] Fallo al leer admin.json, creando uno vacío:", err.message);
            adminList = { admins: [] };
            fs.writeFileSync('admin.json', JSON.stringify(adminList, null, 2));
        }

        if (player.auth && adminList.admins.includes(player.auth)) {
            const randomKey = generateRandomKey();
            adminKeys[player.id] = randomKey;
            console.log(`[DEBUG] Clave generada para ${sanitizedName} (ID: ${player.id}, Auth: ${player.auth}): ${randomKey}`);
            room.sendAnnouncement(
                `[Server] 🔑 ${sanitizedName}, tu clave de administrador es: ${randomKey}\nIngresa esta clave en el chat para activar tus permisos.`,
                player.id,
                0xFFD700,
                "small",
                2
            );
        }

        playerValues[player.id] = playerValues[player.id] || VALOR_BASE_JUGADOR;
        playerGoals[player.id] = playerGoals[player.id] || 0;
        playerAssists[player.id] = playerAssists[player.id] || 0;

        if ((mercadoActivo || juegoEnCurso) && !DTS.includes(sanitizedName)) {
            const redTeamCount = jugadoresSeleccionados[1].length;
            const blueTeamCount = jugadoresSeleccionados[2].length;

            let equipoNum;
            if (redTeamCount < blueTeamCount) {
                playerTeam[player.id] = 'rojo';
                equipoNum = 1;
            } else if (blueTeamCount < redTeamCount) {
                playerTeam[player.id] = 'azul';
                equipoNum = 2;
            } else {
                equipoNum = Math.random() < 0.5 ? 1 : 2;
                playerTeam[player.id] = equipoNum === 1 ? 'rojo' : 'azul';
            }

            if (!jugadoresSeleccionados[equipoNum].includes(player.id)) {
                jugadoresSeleccionados[equipoNum].push(player.id);
            }

            room.sendAnnouncement(
                `[Server] ¡${sanitizedName} fue agregado a la lista del equipo ${playerTeam[player.id]}!`,
                null,
                0xA6D9F7,
                "small",
                2
            );

            room.sendAnnouncement(
                `[Server] ${sanitizedName}, estás asignado al equipo ${playerTeam[player.id]} como espectador. ` +
                `Recibirás victorias o derrotas según el resultado del equipo, pero no jugarás a menos que un DT te seleccione.`,
                player.id,
                0xA6D9F7,
                "small",
                2
            );
        }

        if (DTS.length < 2) {
            room.sendAnnouncement(
                "🌟 ¡SE BUSCAN DIRECTORES TÉCNICOS LEGENDARIOS! 🌟\n" +
                "👨‍💼 Conviértete en DT y lidera a tu equipo a la gloria.\n" +
                "🎮 Controla la estrategia, elige a tus cracks y demuestra quién manda.\n" +
                "💰 ¡Gana +4000 puntos por victoria y prestigio en el ranking!\n" +
                "⚡ Escribe !dt para postularte YA. ¡No dejes que otro te robe el puesto!",
                player.id,
                0xFFD700,
                "small-bold",
                2
            );
        }

        if (juegoEnCurso && juegoPausado && verificarJugadoresSuficientes()) {
            room.sendAnnouncement(
                "[Server] ✅ Ambos equipos tienen jugadores suficientes. Reanudando partido...",
                null,
                0xA6D9F7,
                "small",
                2
            );
            room.pauseGame(false);
            juegoPausado = false;
        }

    } catch (error) {
        console.error("[ERROR] Fallo en onPlayerJoin:", error.message);
        room.sendAnnouncement(
            "[Server] ⚠️ Error al procesar tu ingreso. Contacta al admin.",
            player.id,
            0xFF5555,
            "small",
            2
        );
        delete playerIps[player.id];
        room.kickPlayer(player.id, "Error al procesar el ingreso. Intenta de nuevo.", false);
    }
};
room.onPlayerLeave = function(player) {
    if (!player || !player.id || !player.name) {
        console.error("[ERROR] Jugador inválido en onPlayerLeave:", player);
        return;
    }

    console.log(`[DEBUG] ${player.name} (ID: ${player.id}) ha abandonado la sala`);

    // Limpiar datos del jugador
    const state = playerStates[player.id];
    if (state) {
        state.xPressStart = 0;
        state.consecutivePressTicks = 0;
        state.isRunning = false;
        state.slowdown = 0;
        state.slowdownUntil = 0;
        state.lastCooldownMessage = 0;
        console.log(`[DEBUG] Estado de Void Dash reiniciado para ${player.name} (ID: ${player.id})`);
    }
    delete playerStates[player.id];
    const playerIp = playerIps[player.id] || "unknown";
    delete playerIps[player.id];
    delete playerColors[player.id];
    delete playerAuth[player.id];
    delete playerGoals[player.id];
    delete playerAssists[player.id];
    delete lastAvatarEffect[player.id];

    if (adminKeys[player.id]) {
        console.log(`[DEBUG] Clave de admin eliminada para ${player.name} (ID: ${player.id})`);
        delete adminKeys[player.id];
    }

    console.log(`[DEBUG] Datos limpiados para ${player.name} (ID: ${player.id}, IP: ${playerIp})`);

    const players = room.getPlayerList().filter(p => p.id !== 0 && p.id !== player.id);
    const totalPlayers = players.length;
    const esDT = DTS.includes(player.name) && (playerTeam[player.id] === 'rojo' || playerTeam[player.id] === 'azul');

    // Transición: DT abandona
    if (enTransicion && esDT) {
        DTS = DTS.filter(dt => dt !== player.name);
        const equipoJugador = playerTeam[player.id];
        if (equipoJugador) {
            const teamNum = equipoJugador === 'rojo' ? 1 : 2;
            jugadoresSeleccionados[teamNum] = jugadoresSeleccionados[teamNum].filter(id => id !== player.id);
            jugadoresEnJuego[teamNum] = jugadoresEnJuego[teamNum].filter(id => id !== player.id);
            delete playerTeam[player.id];
            delete playerValues[player.id];
            delete golesJugadores[player.id];
        }
        room.sendAnnouncement(
            `[AD] ⚠️ El DT ${player.name} ha abandonado durante la transición. Reiniciando juego.`,
            null,
            0xFFEFBD,
            "small",
            1
        );
        reiniciarJuego(`El DT ${player.name} ha abandonado durante la transición.`);
        return;
    }

    // Sala de espera
    if (roomwaiting) {
        room.sendAnnouncement(
            `[Server] 👋 ${player.name} se fue. Jugadores: ${totalPlayers}/${START_PLAYERS}`,
            null,
            0xA6D9F7,
            "small",
            1
        );

        if (esDT) {
            DTS = DTS.filter(dt => dt !== player.name);
            room.sendAnnouncement(
                `[Server] ⚠️ El DT ${player.name} ha abandonado.`,
                null,
                0xFFA500,
                "small",
                2
            );
        }

        const equipoJugador = playerTeam[player.id];
        if (equipoJugador) {
            const teamNum = equipoJugador === 'rojo' ? 1 : 2;
            jugadoresSeleccionados[teamNum] = jugadoresSeleccionados[teamNum].filter(id => id !== player.id);
            jugadoresEnJuego[teamNum] = jugadoresEnJuego[teamNum].filter(id => id !== player.id);
            delete playerTeam[player.id];
            delete playerValues[player.id];
            delete golesJugadores[player.id];
        }

        fs.readFile('player_logs.json', 'utf8', (err, data) => {
            if (err || !data) {
                console.error("[ERROR] Fallo al leer player_logs.json:", err?.message);
                return;
            }
            try {
                let playerLogs = JSON.parse(data);
                if (playerLogs[player.auth]) {
                    playerLogs[player.auth].date = new Date().toISOString();
                    fs.writeFile('player_logs.json', JSON.stringify(playerLogs, null, 2), err => {
                        if (err) console.error("[ERROR] Fallo al escribir player_logs.json:", err.message);
                    });
                }
            } catch (err) {
                console.error("[ERROR] JSON corrupto en player_logs.json:", err.message);
            }
        });
        return;
    }

    // DT abandona
    if (esDT) {
        DTS = DTS.filter(dt => dt !== player.name);
        const equipoJugador = playerTeam[player.id];
        const teamNum = equipoJugador === 'rojo' ? 1 : 2;
        const equipoOpuesto = equipoJugador === 'rojo' ? 'azul' : 'rojo';
        const teamNumOpuesto = teamNum === 1 ? 2 : 1;

        if (mercadoActivo) {
            room.sendAnnouncement(
                `[AD] ⚠️ El DT ${player.name} ha abandonado.\nEl juego se reiniciará.`,
                null,
                0xFFEFBD,
                "small",
                1
            );
            reiniciarJuego(`El DT ${player.name} ha abandonado durante el mercado.`);
            return;
        }

        if (!juegoEnCurso && !mercadoActivo) {
            room.sendAnnouncement(
                `[AD] ⚠️ El DT ${player.name} ha abandonado.\nEl juego se reiniciará.`,
                null,
                0xFFEFBD,
                "small",
                1
            );
            reiniciarJuego(`El DT ${player.name} ha abandonado durante la selección.`);
            return;
        }

        if (juegoEnCurso && !mercadoActivo) {
            const jugadoresRestantes = jugadoresEnJuego[teamNum].length;
            if (jugadoresRestantes < MIN_JUGADORES_EQUIPO) {
                room.sendAnnouncement(
                    `[AD] ⚠️ El equipo ${equipoJugador} no tiene suficientes jugadores (${jugadoresRestantes}/${MIN_JUGADORES_EQUIPO}).\nEl juego se reiniciará.`,
                    null,
                    0xFFEFBD,
                    "small",
                    1
                );
                reiniciarJuego(`El equipo ${equipoJugador} no tiene suficientes jugadores tras la salida del DT.`);
                return;
            }

            const espectadoresElegibles = room.getPlayerList().filter(p => 
                p.team === Team.SPECTATORS && 
                jugadoresSeleccionados[teamNum].includes(p.id) &&
                !DTS.includes(p.name)
            );

            if (espectadoresElegibles.length > 0) {
                const nuevoDT = espectadoresElegibles[0];
                DTS.push(nuevoDT.name);
                playerTeam[nuevoDT.id] = equipoJugador;
                room.setPlayerTeam(nuevoDT.id, teamNum === 1 ? Team.RED : Team.BLUE);
                jugadoresEnJuego[teamNum] = jugadoresEnJuego[teamNum].filter(id => id !== nuevoDT.id);
                jugadoresSeleccionados[teamNum] = jugadoresSeleccionados[teamNum].filter(id => id !== nuevoDT.id);

                const jugadoresRestantesDespues = jugadoresEnJuego[teamNum].length;
                if (jugadoresRestantesDespues < MIN_JUGADORES_EQUIPO) {
                    room.sendAnnouncement(
                        `[AD] ⚠️ El equipo ${equipoJugador} no tiene suficientes jugadores (${jugadoresRestantesDespues}/${MIN_JUGADORES_EQUIPO}).\nEl juego se reiniciará.`,
                        null,
                        0xFFEFBD,
                        "small",
                        1
                    );
                    reiniciarJuego(`El equipo ${equipoJugador} no tiene suficientes jugadores tras el reemplazo del DT.`);
                    return;
                }

                const dtOpuesto = room.getPlayerList().find(p => 
                    p.team === (teamNumOpuesto === 1 ? Team.RED : Team.BLUE) && 
                    DTS.includes(p.name)
                );
                let posicionDT = dtOpuesto 
                    ? room.getPlayerDiscProperties(dtOpuesto.id) 
                    : (teamNum === 1 ? DT_POSITIONS.RED : DT_POSITIONS.BLUE);

                // Validar posicionDT
                if (!posicionDT || typeof posicionDT.x === 'undefined' || typeof posicionDT.y === 'undefined') {
                    console.log(`[DEBUG] Posición DT inválida para ${nuevoDT.name}, usando posición por defecto para equipo ${teamNum}`);
                    posicionDT = teamNum === 1 
                        ? { x: -200, y: 0 } // Posición por defecto para rojo
                        : { x: 200, y: 0 }; // Posición por defecto para azul
                }

                try {
                    room.setPlayerDiscProperties(nuevoDT.id, {
                        x: posicionDT.x,
                        y: posicionDT.y,
                        xspeed: 0,
                        yspeed: 0,
                        cGroup: room.CollisionFlags.player,
                        cMask: room.CollisionFlags.all
                    });
                } catch (err) {
                    console.error(`[ERROR] Fallo al establecer propiedades del disco para ${nuevoDT.name}:`, err.message);
                    room.sendAnnouncement(
                        `[Server] ⚠️ Error al asignar nuevo DT. Contacta a un admin.`,
                        null,
                        0xFF5555,
                        "small",
                        2
                    );
                    reiniciarJuego(`Error al asignar nuevo DT: ${nuevoDT.name}`);
                    return;
                }

                console.log(`[DEBUG] Nuevo DT ${nuevoDT.name} asignado al equipo ${equipoJugador}`);
                room.sendAnnouncement(
                    `[Server] ✅ ${nuevoDT.name} es el nuevo DT del equipo ${equipoJugador}.`,
                    null,
                    0xA6D9F7,
                    "small",
                    2
                );
            } else {
                room.sendAnnouncement(
                    `[AD] ⚠️ El DT ${player.name} ha abandonado y no hay reemplazos.\nEl juego se reiniciará.`,
                    null,
                    0xFFEFBD,
                    "small",
                    1
                );
                reiniciarJuego(`El DT ${player.name} ha abandonado sin reemplazo.`);
            }
            return;
        }
    }

    // Jugador no DT
    const equipoJugador = playerTeam[player.id];
    if (equipoJugador) {
        const teamNum = equipoJugador === 'rojo' ? 1 : 2;
        const estabaJugando = juegoEnCurso && !mercadoActivo && jugadoresEnJuego[teamNum].includes(player.id);

        jugadoresSeleccionados[teamNum] = jugadoresSeleccionados[teamNum].filter(id => id !== player.id);
        jugadoresEnJuego[teamNum] = jugadoresEnJuego[teamNum].filter(id => id !== player.id);
        delete playerTeam[player.id];
        delete playerValues[player.id];
        delete golesJugadores[player.id];

        if (estabaJugando) {
            const espectadores = room.getPlayerList().filter(p => 
                p.team === Team.SPECTATORS && jugadoresSeleccionados[teamNum].includes(p.id)
            );
            if (espectadores.length > 0) {
                const jugadorAUnir = espectadores[0];
                room.setPlayerTeam(jugadorAUnir.id, teamNum === 1 ? Team.RED : Team.BLUE);
                jugadoresEnJuego[teamNum].push(jugadorAUnir.id);
                playerTeam[jugadorAUnir.id] = equipoJugador;
                room.sendAnnouncement(
                    `[Server] ✅ ${jugadorAUnir.name} se unió al equipo ${equipoJugador} en lugar de ${player.name}.`,
                    null,
                    0xA6D9F7,
                    "small",
                    2
                );
            } else {
                const jugadoresRestantesEnCancha = jugadoresEnJuego[teamNum].length;
                room.sendAnnouncement(
                    `[Server] ⚠️ ${player.name} abandonó. Equipo ${equipoJugador}: ${jugadoresRestantesEnCancha}/${MIN_JUGADORES_EQUIPO} jugadores.`,
                    null,
                    0xFFA500,
                    "small",
                    2
                );
                if (jugadoresRestantesEnCancha < MIN_JUGADORES_EQUIPO) {
                    room.sendAnnouncement(
                        `[AD] ⚠️ El equipo ${equipoJugador} no tiene suficientes jugadores.`,
                        null,
                        0xFFEFBD,
                        "small",
                        2
                    );
                    reiniciarJuego(`Partido terminado: El equipo ${equipoJugador} no tiene suficientes jugadores.`);
                    return;
                }
            }
        } else if (mercadoActivo) {
            room.sendAnnouncement(
                `[Server] ⚠️ ${player.name} abandonó durante el mercado.`,
                null,
                0xFFA500,
                "small",
                2
            );
            const jugadoresRestantesSeleccionados = jugadoresSeleccionados[teamNum].length;
            if (jugadoresRestantesSeleccionados < MIN_JUGADORES_EQUIPO) {
                room.sendAnnouncement(
                    `[AD] ⚠️ El equipo ${equipoJugador} no tiene suficientes jugadores seleccionados (${jugadoresRestantesSeleccionados}/${MIN_JUGADORES_EQUIPO}).`,
                    null,
                    0xFFEFBD,
                    "small",
                    2
                );
                setTimeout(() => {
                    reiniciarJuego(`Mercado interrumpido: El equipo ${equipoJugador} no tiene suficientes jugadores.`);
                    if (totalPlayers < MIN_PLAYERS_FOR_GAME) waitingRoom();
                }, 1000);
                return;
            }
        }
    }

    // Fase de titulares
    if (juegoEnCurso && faseTitulares) {
        room.sendAnnouncement(
            `[Server] 👋 ${player.name} se fue. Jugadores: ${totalPlayers}/${START_PLAYERS}`,
            null,
            0xA6D9F7,
            "small",
            2
        );
        const jugadoresRojo = jugadoresSeleccionados[1].length;
        const jugadoresAzul = jugadoresSeleccionados[2].length;
        if (jugadoresRojo < MIN_JUGADORES_EQUIPO || jugadoresAzul < MIN_JUGADORES_EQUIPO) {
            room.sendAnnouncement(
                `[AD] ⚠️ Un equipo no tiene suficientes jugadores (Rojo: ${jugadoresRojo}, Azul: ${jugadoresAzul}). Reiniciando...`,
                null,
                0xFFEFBD,
                "small",
                2
            );
            reiniciarJuego(`Equipo incompleto tras la salida de ${player.name}.`);
            return;
        }
        DTS.forEach((dtName, index) => {
            const team = index + 1;
            if (!dtSeleccionCompleta[team]) {
                const jugadoresFaltantes = MIN_JUGADORES_EQUIPO - jugadoresEnJuego[team].length;
                room.sendAnnouncement(
                    `[AD] ⏳ ${dtName}: Te faltan ${jugadoresFaltantes} jugador(es).`,
                    null,
                    0xFFEFBD,
                    "small",
                    2
                );
            }
        });
        return;
    }

    // Selección de equipos
    if (DTS.length === 2 && !juegoEnCurso && !mercadoActivo) {
        verificarSeleccionCompleta();
        const jugadoresDisponibles = room.getPlayerList().filter(p => !DTS.includes(p.name));
        if (jugadoresDisponibles.length < MIN_JUGADORES_EQUIPO * 2 - jugadoresSeleccionados[1].length - jugadoresSeleccionados[2].length) {
            reiniciarJuego(`Jugadores insuficientes tras desconexión (${totalPlayers}/${MIN_PLAYERS_FOR_GAME})`);
            setTimeout(() => waitingRoom(), 1000);
            return;
        }
    }

    // Juego en curso
    if (juegoEnCurso && !mercadoActivo && !faseTitulares) {
        const jugadoresRojo = jugadoresEnJuego[1].length;
        const jugadoresAzul = jugadoresEnJuego[2].length;
        if (jugadoresRojo < MIN_JUGADORES_EQUIPO || jugadoresAzul < MIN_JUGADORES_EQUIPO) {
            const equipoIncompleto = jugadoresRojo < MIN_JUGADORES_EQUIPO ? 'rojo' : 'azul';
            room.sendAnnouncement(
                `[AD] ⚠️ El equipo ${equipoIncompleto} no tiene suficientes jugadores (${jugadoresRojo}/${jugadoresAzul}).`,
                null,
                0xFFEFBD,
                "small",
                2
            );
            reiniciarJuego(`Partido terminado: El equipo ${equipoIncompleto} no tiene suficientes jugadores.`);
            return;
        }
    }

    // Jugadores mínimos
    if (!roomwaiting && totalPlayers < MIN_PLAYERS_FOR_GAME && !juegoEnCurso) {
        setTimeout(() => {
            reiniciarJuego(`Jugadores insuficientes (${totalPlayers}/${MIN_PLAYERS_FOR_GAME})`);
            modoTest = true;
            waitingRoom();
            room.sendAnnouncement(
                `[Server] ⚠️ Jugadores insuficientes (${totalPlayers}/${MIN_PLAYERS_FOR_GAME}). Volviendo a sala de espera...`,
                null,
                0xFFA500,
                "small",
                2
            );
        }, 2000);
    } else if (!roomwaiting && totalPlayers < START_PLAYERS && !juegoEnCurso) {
        // Anuncio de advertencia, pero no reinicia inmediatamente
        room.sendAnnouncement(
            `[Server] ⚠️ Quedan ${totalPlayers} jugadores. Se necesitan ${START_PLAYERS} para iniciar la partida.`,
            null,
            0xFFA500,
            "small",
            2
        );
    }

    // Actualizar log
    fs.readFile('player_logs.json', 'utf8', (err, data) => {
        if (err || !data) {
            console.error("[ERROR] Fallo al leer player_logs.json:", err?.message);
            return;
        }
        try {
            let playerLogs = JSON.parse(data);
            if (playerLogs[player.auth]) {
                playerLogs[player.auth].date = new Date().toISOString();
                fs.writeFile('player_logs.json', JSON.stringify(playerLogs, null, 2), err => {
                    if (err) console.error("[ERROR] Fallo al escribir player_logs.json:", err.message);
                });
            }
        } catch (err) {
            console.error("[ERROR] JSON corrupto en player_logs.json:", err.message);
        }
    });

    // Reanudar juego si está pausado
    if (juegoPausado && verificarJugadoresSuficientes()) {
        room.sendAnnouncement(
            "[Server] ✅ Ambos equipos tienen jugadores suficientes. Reanudando...",
            null,
            0x87C38F,
            "small",
            2
        );
        room.pauseGame(false);
        juegoPausado = false;
    }
};
// Función para iniciar el proceso de selección
function iniciarSeleccion() {
    if (DTS.length === 2) {
        room.sendAnnouncement(
            "[Server] 🎮 ¡Arranca la fase de selección de equipos! 🎮\n" +
            "👨‍💼 DTs: Elijan jugadores escribiendo !s <id> o solo el ID del jugador.\n" +
            "📋 Usen !ids para ver los IDs disponibles.\n" +
            `⏱️ Tenés ${SELECTION_TIME_PER_PLAYER/1000} segundos por elección.\n` +
            "⚠️ ¡Ojo! Si no elegís a tiempo, el juego se reiniciará.",
            null,
            0xA6D9F7,
            "small",
            3
        );
        mostrarJugadoresDisponibles(null);
        currentDT = 0; // Comenzar con el primer DT
        initiateDTSelection(currentDT);
        startDTPointsInterval(); // Iniciar temporizador de puntos
    }
}
function getUpgradeMultiplier(playerKey, playerLogs) {
    if (playerLogs[playerKey]?.equipped?.upgrade3) return 3;
    if (playerLogs[playerKey]?.equipped?.upgrade2) return 2;
    if (playerLogs[playerKey]?.equipped?.upgrade1) return 1.5;
    return 1; // Sin mejora
}

// Función para mostrar jugadores disponibles
function mostrarJugadoresDisponibles(playerId) {
    var jugadoresDisponibles = room.getPlayerList().filter(p => 
        !DTS.includes(p.name) && !playerTeam[p.id]);
    var mensaje = '[Server] Jugadores disponibles: ' + 
        jugadoresDisponibles.map(p => `${p.id}: ${p.name}`).join(', ');
    room.sendAnnouncement(mensaje, playerId, 0xDF7373, "small", 3);
}
room.onGameStart = function() {
    for (var id in playerStates) {
        playerStates[id].activation = 0;
        playerStates[id].slowdown = 0;
        playerStates[id].slowdownUntil = 0;
        playerStates[id].isRunning = false;
      }
    if (modoTest) {
        juegoEnCurso = true;
        faseTitulares = false;
        lastPlayerTouch = null;
        room.pauseGame(false);
        juegoPausado = false;
        resetTouchStats();
        console.log("[DEBUG] Modo test activado, estadísticas reiniciadas, sin grabación.");
        return;
    }

    // Verificar mercado de pases
    if (mercadoActivo) {
        console.log("[DEBUG] Mercado de pases activo, no se inicia grabación ni estadísticas.");
        resetTouchStats();
        juegoEnCurso = true;
        faseTitulares = false;
        room.pauseGame(false);
        juegoPausado = false;
        return;
    }

    // Iniciar grabación y anunciar
    room.sendAnnouncement("[Server] La partida está siendo grabada, saluda. ", null, 0xECCD6F, "small", 2);
    room.startRecording();

    // Inicializar estadísticas (los jugadores se registrarán dinámicamente)
    matchStats = {
        redGoals: 0,
        blueGoals: 0,
        redScorers: {},
        blueScorers: {},
        redPlayers: [], // Se llenará en onPlayerTeamChange o onGameStop
        bluePlayers: [],
        startTime: Date.now(),
        endTime: null
    };
    resetTouchStats();
    // Reiniciar estados de Void Dash para todos los jugadores
    Object.keys(playerStates).forEach(playerId => {
        const state = playerStates[playerId];
        state.xPressStart = 0;
        state.isRunning = false;
        state.slowdown = 0;
        state.slowdownUntil = 0;
        state.lastCooldownMessage = 0;
        console.log(`[DEBUG] Reiniciando estado de Void Dash para jugador ID: ${playerId} en onGameStop.`);
    });

    juegoEnCurso = true;
    faseTitulares = true;
    lastPlayerTouch = null;

    // Verificar DTs
    if (DTS.length < 2) {
        room.sendAnnouncement(
            "[Server] 👨‍💼 ¡Se necesitan Directores Técnicos!\n" +
            "Usa !dt para postularte como DT y comenzar el partido.",
            null,
            0xA6D9F7,
            "small",
            2
        );
    }

    // Mover a todos a espectadores excepto DTs
    room.getPlayerList().forEach(player => {
        if (!DTS.includes(player.name)) {
            room.setPlayerTeam(player.id, Team.SPECTATORS);
        }
    });

    // Mostrar lista de jugadores disponibles con sus IDs
    let listaJugadores = room.getPlayerList()
        .filter(p => !DTS.includes(p.name))
        .map(p => `ID: ${p.id} - ${p.name}`)
        .join('\n');

    // Mensaje combinado para la fase de titulares
    room.sendAnnouncement(
        "[Server] ⚽ ¡Arranca la fase de titulares! ⚽\n" +
        "👨‍💼 DTs: Pongan jugadores con !meter <id> o solo el ID.\n" +
        "📋 Usen !ids para ver los IDs de su equipo.\n" +
        "⏱️ ¡Apuren, elijan sus titulares ya!",
        null,
        0xA6D9F7,
        "small",
        2
    );

    room.pauseGame(true);
    juegoPausado = true;

    mostrarResumenEquipos();
    posicionarDTs();

    iniciarTimerTitulares(1);
    iniciarTimerTitulares(2);
};
room.onPlayerTeamChange = function(player, byPlayer) {
    if (!player || mercadoActivo || modoTest) {
        return;
    }

    // Registrar jugadores en matchStats según su equipo
    if (player.team === Team.RED && !matchStats.redPlayers.includes(player.id)) {
        matchStats.redPlayers.push(player.id);
        console.log(`[DEBUG] Jugador ${player.name} (ecnieID: ${player.id}) agregado al equipo Rojo.`);
    } else if (player.team === Team.BLUE && !matchStats.bluePlayers.includes(player.id)) {
        matchStats.bluePlayers.push(player.id);
        console.log(`[DEBUG] Jugador ${player.name} (ID: ${player.id}) agregado al equipo Azul.`);
    }
};

function iniciarTimerTitulares(team) {
    const dtName = DTS[team - 1];
    if (!dtName) {
        console.log(`[DEBUG] No hay DT para equipo ${team}, no se inicia temporizador.`);
        return;
    }

    const jugadoresFaltantes = MIN_JUGADORES_EQUIPO - jugadoresEnJuego[team].length;
    if (jugadoresFaltantes <= 0) {
        console.log(`[DEBUG] Equipo ${team} ya tiene suficientes jugadores, no se inicia temporizador.`);
        dtSeleccionCompleta[team] = true;
        verificarTitularesCompletos();
        return;
    }

    // Limpiar timers existentes
    if (titularesTimers[`dt${team}`]) {
        clearTimeout(titularesTimers[`dt${team}`]);
        titularesTimers[`dt${team}`] = null;
    }
    if (titularesTimers[`warning${team}`]) {
        clearTimeout(titularesTimers[`warning${team}`]);
        titularesTimers[`warning${team}`] = null;
    }

    // Timer de advertencia
    titularesTimers[`warning${team}`] = setTimeout(() => {
        if (!dtSeleccionCompleta[team]) {
            room.sendAnnouncement(
                `[AD] ⚠️ ¡${dtName}! Te quedan 10 segundos para meter ${jugadoresFaltantes} jugador(es).`,
                null,
                0xFFEFBD,
                "small",
                2
            );
            console.log(`[DEBUG] Advertencia enviada a ${dtName} para equipo ${team}.`);
        }
    }, TIEMPO_TOTAL_POR_DT - TIEMPO_ADVERTENCIA);

    // Timer principal
    titularesTimers[`dt${team}`] = setTimeout(() => {
        if (!dtSeleccionCompleta[team]) {
            room.sendAnnouncement(
                `[AD] ⌛ ¡${dtName} tardó demasiado! Seleccionando jugadores automáticamente...`,
                null,
                0xFFEFBD,
                "small",
                2
            );
            console.log(`[DEBUG] Tiempo agotado para ${dtName} en equipo ${team}, seleccionando automáticamente.`);
            seleccionarJugadoresAutomaticamente(team, dtName);
        }
    }, TIEMPO_TOTAL_POR_DT);

    room.sendAnnouncement(
        `[AD] ⏱️ ${dtName}: Tienes ${TIEMPO_TOTAL_POR_DT / 1000} segundos para meter ${jugadoresFaltantes} jugador(es).`,
        null,
        0xFFEFBD,
        "small",
        2
    );
    console.log(`[DEBUG] Temporizador iniciado para ${dtName} en equipo ${team}: ${TIEMPO_TOTAL_POR_DT}ms.`);
}
function seleccionarJugadoresAutomaticamente(team, dtName) {
    const jugadoresFaltantes = MIN_JUGADORES_EQUIPO - jugadoresEnJuego[team].length;
    const jugadoresDisponibles = jugadoresSeleccionados[team].filter(id => !jugadoresEnJuego[team].includes(id));

    if (jugadoresDisponibles.length < jugadoresFaltantes) {
        room.sendAnnouncement(
            `[AD] ⚠️ No hay suficientes jugadores disponibles para el equipo ${team === 1 ? 'Rojo' : 'Azul'}. Reiniciando...`,
            null,
            0xFFEFBD,
            "small",
            2
        );
        console.log(`[DEBUG] Jugadores insuficientes para equipo ${team}, reiniciando.`);
        reiniciarJuego(`No hay suficientes jugadores para ${dtName}`);
        return;
    }

    // Seleccionar jugadores aleatoriamente
    const seleccionados = [];
    for (let i = 0; i < jugadoresFaltantes && jugadoresDisponibles.length > 0; i++) {
        const index = Math.floor(Math.random() * jugadoresDisponibles.length);
        const id = jugadoresDisponibles.splice(index, 1)[0];
        const jugador = room.getPlayer(id);
        if (jugador) {
            room.setPlayerTeam(id, team === 1 ? Team.RED : Team.BLUE);
            jugadoresEnJuego[team].push(id);
            seleccionados.push(jugador.name);
        }
    }

    if (seleccionados.length > 0) {
        room.sendAnnouncement(
            `[Server] ✅ ${dtName} - Jugadores seleccionados automáticamente: ${seleccionados.join(', ')}`,
            null,
            0x87C38F,
            "small",
            2
        );
        console.log(`[DEBUG] Seleccionados automáticamente para equipo ${team}: ${seleccionados.join(', ')}`);
    }

    dtSeleccionCompleta[team] = true;
    // Limpiar timers
    if (titularesTimers[`dt${team}`]) {
        clearTimeout(titularesTimers[`dt${team}`]);
        titularesTimers[`dt${team}`] = null;
    }
    if (titularesTimers[`warning${team}`]) {
        clearTimeout(titularesTimers[`warning${team}`]);
        titularesTimers[`warning${team}`] = null;
    }

    verificarTitularesCompletos();
}

// Función para manejar el comando !meter
function manejarComandoMeter(player, message) {
    if (!juegoEnCurso || !DTS.includes(player.name)) {
        room.sendAnnouncement("[Error]   Solo los DTs pueden meter jugadores durante el partido.", null, 0x842636, "small", 3);
        return;
    }

    // Verificar que estamos en fase de titulares
    if (!faseTitulares) {
        room.sendAnnouncement("[Error] ❌ ❌ No estamos en fase de titulares.", null, 0x842636, "small", 3);
        return;
    }

    const team = playerTeam[player.id] === 'rojo' ? 1 : 2;
    const id = parseInt(message.split(' ')[1]);

    if (isNaN(id)) {
        room.sendAnnouncement("[Error] ❌ ❌ ID inválido. Uso: !meter <ID>", null, 0x842636, "small", 3);
        return;
    }

    const jugadorAMeter = room.getPlayer(id);
    if (!jugadorAMeter) {
        room.sendAnnouncement("[Error] ❌ ❌ No se encontró un jugador con ese ID.", null, 0x842636, "small", 3);
        return;
    }

    if (!jugadoresSeleccionados[team].includes(id)) {
        room.sendAnnouncement("[Error] ❌ ❌ Este jugador no pertenece a tu equipo.", null, 0x842636, "small", 3);
        return;
    }

    if (jugadoresEnJuego[team].includes(id)) {
        room.sendAnnouncement("[Error] ❌ ❌ Este jugador ya está en cancha.", null, 0x842636, "small", 3);
        return;
    }

    if (jugadoresEnJuego[team].length >= MIN_JUGADORES_EQUIPO) {
        room.sendAnnouncement("[Error] ❌ ❌ Ya tienes ${MIN_JUGADORES_EQUIPO} jugadores en cancha.", null, 0x842636, "small", 3);
        return;
    }

    // Meter al jugador
    room.setPlayerTeam(id, team === 1 ? Team.RED : Team.BLUE);
    jugadoresEnJuego[team].push(id);

    room.sendAnnouncement(
        `[Server] ✅ ${jugadorAMeter.name} ha entrado al campo para el equipo ${team === 1 ? 'rojo' : 'azul'}.`,
        null,
        0x87C38F,
        "small",
        2
    );

    // Si este equipo completó sus titulares
    if (jugadoresEnJuego[team].length === MIN_JUGADORES_EQUIPO) {
        dtSeleccionCompleta[team] = true;

        // Limpiar timers de este equipo
        if (titularesTimers[`dt${team}`]) {
            clearTimeout(titularesTimers[`dt${team}`]);
            titularesTimers[`dt${team}`] = null;
        }
        if (titularesTimers[`warning${team}`]) {
            clearTimeout(titularesTimers[`warning${team}`]);
            titularesTimers[`warning${team}`] = null;
        }

        room.sendAnnouncement(
            `[Server] ✅ ¡${player.name} ha completado su selección de titulares!`,
            null,
            0x87C38F,
            "small",
            2
        );

        // Si el otro equipo no ha completado, mostrar cuántos jugadores le faltan
        const otroTeam = team === 1 ? 2 : 1;
        if (!dtSeleccionCompleta[otroTeam]) {
            const jugadoresFaltantes = MIN_JUGADORES_EQUIPO - jugadoresEnJuego[otroTeam].length;
            const otroDT = DTS[otroTeam - 1];
            room.sendAnnouncement(
                `[AD] ⏳ ${otroDT}: Te faltan ${jugadoresFaltantes} jugador(es) por meter.`,
                null,
                0xFFEFBD,
                "small",
                2
            );
        }

        verificarTitularesCompletos();
    }
}

// Manejo de comandos de chat
function manejarComandoCambio(player, message) {
    // Validar estado del juego
    if (!juegoEnCurso || mercadoActivo || !faseTitulares) {
        room.sendAnnouncement("[Error] ❌ Cambios solo permitidos durante el partido.", null, 0x842636, "small", 3);
        return;
    }

    // Validar DT
    if (!DTS.includes(player.name)) {
        room.sendAnnouncement("[Error] ❌ Solo los DTs pueden realizar cambios.", null, 0x842636, "small", 3);
        return;
    }

    // Validar argumentos
    const args = message.split(' ');
    if (args.length !== 3) {
        room.sendAnnouncement(
            "[Error] ❌ Uso correcto: !cmb <ID_SALE> <ID_ENTRA>" + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    // Validar IDs
    const idSale = parseInt(args[1]);
    const idEntra = parseInt(args[2]);
    if (isNaN(idSale) || isNaN(idEntra)) {
        room.sendAnnouncement(
            "[Error] ❌ IDs inválidos." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    // Validar jugadores
    const jugadorSale = room.getPlayer(idSale);
    const jugadorEntra = room.getPlayer(idEntra);
    if (!jugadorSale || !jugadorEntra) {
        room.sendAnnouncement(
            "[Error] ❌ No se encontró alguno de los jugadores." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    // Validar equipo del DT
    const equipoDt = playerTeam[player.id];
    if (!equipoDt) {
        room.sendAnnouncement("[Error] ❌ No estás asignado a un equipo.", null, 0x842636, "small", 3);
        return;
    }

    const equipoNumericoDt = equipoDt === 'rojo' ? Team.RED : Team.BLUE;
    const equipoNum = equipoNumericoDt === Team.RED ? 1 : 2;

    // Verificaciones adicionales
    if (DTS.includes(jugadorEntra.name)) {
        room.sendAnnouncement(
            "[Error] ❌ No puedes meter a un DT como jugador." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    if (!jugadoresEnJuego[equipoNum].includes(idSale)) {
        room.sendAnnouncement(
            "[Error] ❌ El jugador que quieres sacar no está en cancha." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    if (!jugadoresSeleccionados[equipoNum].includes(idSale)) {
        room.sendAnnouncement(
            "[Error] ❌ El jugador que sale no pertenece a tu equipo." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    if (!jugadoresSeleccionados[equipoNum].includes(idEntra)) {
        room.sendAnnouncement(
            "[Error] ❌ El jugador que entra no pertenece a tu equipo." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    if (jugadoresEnJuego[equipoNum].includes(idEntra)) {
        room.sendAnnouncement(
            "[Error] ❌ El jugador que entra ya está en cancha." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05, // <--- Corregido: reemplacé 'diret' por '0x842636'
            "small",
            3
        );
        return;
    }

    if (jugadorEntra.team !== Team.SPECTATORS) {
        room.sendAnnouncement(
            "[Error] ❌ El jugador que entra debe estar en espectadores." + (mostrarEstadoEquipo(player) || ""),
            null,
            0xEC9F05,
            "small",
            3
        );
        return;
    }

    // Ejecución del cambio
    try {
        jugadoresEnJuego[equipoNum] = jugadoresEnJuego[equipoNum].filter(id => id !== idSale);
        jugadoresEnJuego[equipoNum].push(idEntra);
        playerTeam[idEntra] = equipoDt;

        room.setPlayerTeam(idEntra, equipoNumericoDt);
        setTimeout(() => {
            const jugadorSaleCheck = room.getPlayer(idSale);
            if (jugadorSaleCheck) {
                room.setPlayerTeam(idSale, Team.SPECTATORS);
            }
        }, 50);

        room.sendAnnouncement(
            `[Server] 🔄 CAMBIO en equipo ${equipoDt}:\n` +
            `↩️ Sale: ${jugadorSale.name}\n` +
            `↪️ Entra: ${jugadorEntra.name}`,
            null,
            0xA6D9F7,
            "small",
            2
        );
    } catch (error) {
        console.error("[ERROR] Fallo al realizar cambio:", error.message);
        room.sendAnnouncement("[Error] ❌ Error al procesar el cambio. Intenta de nuevo.", null, 0x842636, "small", 3);
    }
}

// Nueva función para mostrar el estado del equipo
function mostrarEstadoEquipo(player) {
    const equipoDt = playerTeam[player.id]; // 'rojo' o 'azul'
    const equipoNum = equipoDt === 'rojo' ? 1 : 2;

    // Jugadores en cancha
    const enCancha = jugadoresEnJuego[equipoNum]
        .map(id => {
            const p = room.getPlayer(id);
            return p ? `${p.name} (ID: ${id})` : null;
        })
        .filter(Boolean)
        .join(", ") || "Ninguno";

    // Jugadores afuera (seleccionados pero no en cancha)
    const afuera = jugadoresSeleccionados[equipoNum]
        .filter(id => !jugadoresEnJuego[equipoNum].includes(id))
        .map(id => {
            const p = room.getPlayer(id);
            return p ? `${p.name} (ID: ${id})` : null;
        })
        .filter(Boolean)
        .join(", ") || "Ninguno";

    return `\nEquipo ${equipoDt}:\nEn cancha: ${enCancha}\nAfuera: ${afuera}`;
}

// Add cleanup function for when selection phase ends
function mostrarJugadoresEquipos(playerId) {
    let mensaje = "[Server]  JUGADORES DISPONIBLES (ID - Nombre - Equipo):\n";

    // Obtener todos los jugadores (excepto DTs)
    const jugadores = room.getPlayerList().filter(p => !DTS.includes(p.name));

    // Mostrar cada jugador con su ID y equipo lógico
    jugadores.forEach(player => {
        const equipo = playerTeam[player.id] ? `[${playerTeam[player.id].toUpperCase()}]` : "[SIN EQUIPO]";
        mensaje += `[Server] • (ID: ${player.id}) ${player.name} ${equipo}\n`;
    });

    room.sendAnnouncement(mensaje, playerId, 0xDF7373, "small", 2);
}

// Función para manejar el comando !dt
function manejarComandoTest(player) {
    if (!player.admin) {
        room.sendAnnouncement("[Error]  Solo los administradores pueden usar este comando.", player.id, 0x842636, "small", 2);
        return;
    }

    modoTest = !modoTest;
    const estado = modoTest ? "activado" : "desactivado";
    room.sendAnnouncement(
        `[Server] 🔧 Modo prueba ${estado}.\n` +
        `${modoTest ? "Puntos, goles y estadísticas no se sumarán." : "El modo normal está activo."}`,
        null,
        0xA6D9F7,
        "small",
        2
    );
}

function manejarComandoDT(player) {
    if (!player || !player.name) {
        console.error("Error: jugador inválido");
        return;
    }

    if (DTS.includes(player.name)) {
        room.sendAnnouncement('[Error] Ya eres un DT.', player.id, 0x842636, "small", 2);
        return;
    }

    if (modoTest) {
        room.sendAnnouncement('[Error] No puedes ser DT en modo prueba.', player.id, 0x842636, "small", 2);
        return;
    }

    // Si ya hay 2 DTs, no permitir más
    if (DTS.length >= 2) {
        room.sendAnnouncement('[Error] Ya hay suficientes DTs.', player.id, 0x842636, "small", 2);
        return;
    }

    // Validación de la lista de jugadores
    const playerList = room.getPlayerList();
    if (!playerList || !Array.isArray(playerList)) {
        console.error("Error: lista de jugadores inválida");
        room.sendAnnouncement('[Error] Error interno del servidor.', player.id, 0x842636, "small", 2);
        return;
    }

    const jugadoresTotal = playerList.filter(p => p && p.id !== 0).length;

    if (jugadoresTotal < MIN_PLAYERS_FOR_GAME) {
        room.sendAnnouncement(
            `[Error] ❌ No hay suficientes jugadores para comenzar (${jugadoresTotal}/${MIN_PLAYERS_FOR_GAME}).\n` +
            "Espera a que haya más jugadores para ser DT.",
            player.id,
            0x842636,
            "small",
            2
        );
        return;
    }

    if (DTS.length < 2) {
        const team = DTS.length === 0 ? 'rojo' : 'azul';
        DTS.push(player.name);
        playerTeam[player.id] = team;
        room.setPlayerTeam(player.id, team === 'rojo' ? Team.RED : Team.BLUE);
        room.sendAnnouncement(`[Server] ${player.name} es ahora DT del equipo ${team}.`, null, 0xA6D9F7, "small", 3);
        
        // Detener el recordatorio de DT si ya tenemos los dos
        if (DTS.length === 2) {
            if (typeof dtReminderTimeout !== 'undefined') {
                clearTimeout(dtReminderTimeout);
            }
            iniciarSeleccion();
        }
    }
}

// Función para manejar el comando !seleccionar
function manejarComandoSeleccionar(player, message) {
    const args = message.split(' ');

    // Validar formato del comando
    if (args.length !== 2) {
        room.sendAnnouncement("[Error] ❌ Uso correcto: !s <id> o intenta solo poniendo la ID!", player.id, 0x842636, "small", 3);
        return;
    }

    // Validar que el jugador es un DT
    if (!DTS.includes(player.name)) {
        room.sendAnnouncement("[Error] ❌ Solo los DTs pueden seleccionar jugadores.", player.id, 0x842636, "small", 3);
        return;
    }

    // Validar que hay exactamente dos DTs
    if (DTS.length !== 2) {
        room.sendAnnouncement(
            "[Error] ❌ Se necesitan dos DTs para comenzar la selección. Usa !dt para postularte como DT del otro equipo.",
            player.id,
            0x842636,
            "small",
            3
        );
        return;
    }

    // Validar que ambos DTs tienen equipos asignados
    const equipoDT1 = DTS[0] ? playerTeam[room.getPlayerList().find(p => p.name === DTS[0])?.id] : null;
    const equipoDT2 = DTS[1] ? playerTeam[room.getPlayerList().find(p => p.name === DTS[1])?.id] : null;
    if (!equipoDT1 || !equipoDT2 || equipoDT1 === equipoDT2) {
        room.sendAnnouncement(
            "[Error] ❌ Error en la configuración de DTs. Ambos equipos deben estar asignados correctamente.",
            player.id,
            0x842636,
            "small",
            3
        );
        return;
    }

    // Validar que es el turno del DT
    if (DTS[currentDT] !== player.name) {
        room.sendAnnouncement('[Error] ❌ No es tu turno para seleccionar.', player.id, 0x842636, "small", 3);
        return;
    }

    const id = parseInt(args[1]);
    if (isNaN(id)) {
        room.sendAnnouncement("[Error] ❌ ID inválido.", player.id, 0x842636, "small", 2);
        return;
    }

    let selectedPlayer = room.getPlayer(id);
    if (!selectedPlayer) {
        room.sendAnnouncement("[Error] ❌ No se encontró un jugador con ese ID.", player.id, 0x842636, "small", 3);
        return;
    }

    if (DTS.includes(selectedPlayer.name)) {
        room.sendAnnouncement("[Error] ❌ No puedes seleccionar a otro DT.", player.id, 0x842636, "small", 3);
        return;
    }

    const team = playerTeam[player.id] === 'rojo' ? 1 : 2;
    if (playerTeam[selectedPlayer.id]) {
        room.sendAnnouncement('[Error] ❌ Este jugador ya ha sido seleccionado.', player.id, 0x842636, "small", 3);
        return;
    }

    // Re-verificar jugador justo antes de asignar
    selectedPlayer = room.getPlayer(id);
    if (!selectedPlayer) {
        room.sendAnnouncement(
            `[Error] ❌ El jugador con ID ${id} se ha desconectado justo ahora. Selecciona a otro jugador.`,
            player.id,
            0x842636,
            "small",
            3
        );
        return;
    }

    // Limpiar timers del DT actual
    if (selectionTimers[`dt${team}`]) {
        clearTimeout(selectionTimers[`dt${team}`]);
        selectionTimers[`dt${team}`] = null;
    }
    if (selectionTimers[`warning${team}`]) {
        clearTimeout(selectionTimers[`warning${team}`]);
        selectionTimers[`warning${team}`] = null;
    }

    // Asignar jugador al equipo
    jugadoresSeleccionados[team].push(selectedPlayer.id);
    playerTeam[selectedPlayer.id] = playerTeam[player.id];
    room.setPlayerTeam(selectedPlayer.id, team === 1 ? Team.RED : Team.BLUE);

    room.sendAnnouncement(
        `[Server] ✅ ${selectedPlayer.name} ha sido seleccionado para el equipo ${playerTeam[player.id]}.`,
        null,
        0x87C38F,
        "small",
        3
    );

    // Actualizar turno y comenzar nuevo timer
    currentDT = (currentDT + 1) % 2;
    initiateDTSelection(currentDT);

    verificarSeleccionCompleta();
}
function initiateDTSelection(dtIndex) {
    const dtName = DTS[dtIndex];
    const teamId = dtIndex === 0 ? 1 : 2; // 1 para rojo, 2 para azul

    // Limpiar timers existentes para este DT
    if (selectionTimers[`dt${teamId}`]) clearTimeout(selectionTimers[`dt${teamId}`]);
    if (selectionTimers[`warning${teamId}`]) clearTimeout(selectionTimers[`warning${teamId}`]);

    // Timer de advertencia (10 segundos restantes)
    selectionTimers[`warning${teamId}`] = setTimeout(() => {
        room.sendAnnouncement(
            `[AD] ⚠️ ¡${dtName}! Te quedan 10 segundos para seleccionar`,
            null,
            0xFFEFBD,
            "small",
            2
        );
    }, SELECTION_TIME_PER_PLAYER - WARNING_TIME);

    // Timer principal
    selectionTimers[`dt${teamId}`] = setTimeout(() => {
        // Obtener jugadores disponibles (no seleccionados, no DTs)
        const jugadoresDisponibles = room.getPlayerList().filter(p => 
            !DTS.includes(p.name) && !playerTeam[p.id] && p.team === Team.SPECTATORS
        );

        if (jugadoresDisponibles.length === 0) {
            room.sendAnnouncement(
                `[AD] ⌛ ¡${dtName} tardó demasiado y no hay jugadores disponibles! Reiniciando el juego...`,
                null,
                0xFFEFBD,
                "small",
                2
            );
            reiniciarJuego(`No hay jugadores disponibles para ${dtName}`);
            return;
        }

        // Seleccionar un jugador aleatorio
        const randomIndex = Math.floor(Math.random() * jugadoresDisponibles.length);
        const selectedPlayer = jugadoresDisponibles[randomIndex];

        // Asignar jugador al equipo
        jugadoresSeleccionados[teamId].push(selectedPlayer.id);
        playerTeam[selectedPlayer.id] = teamId === 1 ? 'rojo' : 'azul';
        room.setPlayerTeam(selectedPlayer.id, teamId === 1 ? Team.RED : Team.BLUE);

        room.sendAnnouncement(
            `[Server] ⚠️ ${dtName} tardó demasiado. Se seleccionó aleatoriamente a ${selectedPlayer.name} para el equipo ${teamId === 1 ? 'Rojo' : 'Azul'}.`,
            null,
            0xFFA500,
            "small",
            2
        );

        // Avanzar al siguiente DT
        currentDT = (currentDT + 1) % 2;
        initiateDTSelection(currentDT);

        // Verificar si la selección está completa
        verificarSeleccionCompleta();
    }, SELECTION_TIME_PER_PLAYER);

    room.sendAnnouncement(
        `[Server] 🎮 Turno de ${dtName} (${teamId === 1 ? 'Rojo' : 'Azul'}) - ${SELECTION_TIME_PER_PLAYER / 1000} segundos`,
        null,
        0xA6D9F7,
        "small",
        2
    );
}

function limpiarTimersSeleccion() {
    Object.values(selectionTimers).forEach(timer => {
        if (timer) clearTimeout(timer);
    });
    selectionTimers = {
        dt1: null,
        dt2: null,
        warning1: null,
        warning2: null
    };
}

function limpiarTimers() {
    console.log("[DEBUG] Limpiando timers...");
    Object.values(timerPorDT).forEach(timer => {
        if (timer) {
            console.log("[DEBUG] Limpiando timerPorDT:", timer);
            clearTimeout(timer);
        }
    });
    Object.values(warningPorDT).forEach(timer => {
        if (timer) {
            console.log("[DEBUG] Limpiando warningPorDT:", timer);
            clearTimeout(timer);
        }
    });
    Object.values(titularesTimers).forEach(timer => {
        if (timer) {
            console.log("[DEBUG] Limpiando titularesTimers:", timer);
            clearTimeout(timer);
        }
    });

    // Reiniciar objetos de timers
    timerPorDT = { 1: null, 2: null };
    warningPorDT = { 1: null, 2: null };
    titularesTimers = { dt1: null, dt2: null, warning1: null, warning2: null }; // Inicializar explícitamente
    console.log("[DEBUG] Timers reiniciados: titularesTimers =", titularesTimers);
}


function reiniciarJuego(razon = "") {
    if (temporizadorPartido) clearTimeout(temporizadorPartido);
    if (temporizadorTiempoExtra) clearTimeout(temporizadorTiempoExtra);
    if (countdownInterval) clearInterval(countdownInterval);
    if (temporizadorSalaNegociacion) clearTimeout(temporizadorSalaNegociacion);

    temporizadorPartido = null;
    temporizadorTiempoExtra = null;
    countdownInterval = null;
    temporizadorSalaNegociacion = null;

    if (typeof dtReminderTimeout !== 'undefined') clearTimeout(dtReminderTimeout);
    if (typeof temporizadorSeleccion !== 'undefined') clearTimeout(temporizadorSeleccion);
    if (typeof temporizadorMercado !== 'undefined') clearTimeout(temporizadorMercado);
    if (typeof titularesTimers !== 'undefined') clearTimeout(titularesTimers);
    if (typeof selectionTimers !== 'undefined') clearTimeout(selectionTimers);
    limpiarTimersSeleccion();
    limpiarTimers();
    stopDTPointsInterval(); // Detener temporizador de puntos

    DTS = [];
    currentDT = 0;
    jugadoresSeleccionados = { 1: [], 2: [] };
    jugadoresEnJuego = { 1: [], 2: [] };
    juegoEnCurso = false;
    faseTitulares = false;
    mercadoActivo = false;
    juegoPausado = true;
    lastPlayerTouch = null;
    playerTeam = {};

    playerValues = {};
    golesJugadores = {};
    presupuestoEquipos = {
        1: PRESUPUESTO_INICIAL,
        2: PRESUPUESTO_INICIAL
    };

    if (typeof jugadoresFichados !== 'undefined') {
        jugadoresFichados.clear();
    } else {
        jugadoresFichados = new Set();
    }

    room.stopGame();

    room.getPlayerList().forEach(player => {
        if (player && player.id) {
            room.setPlayerTeam(player.id, Team.SPECTATORS);
        }
    });

    const mapaAleatorio = mapasDisponibles[Math.floor(Math.random() * mapasDisponibles.length)];
    room.setCustomStadium(mapaAleatorio);

    let mensaje = "🆕 ¡El juego ha sido reiniciado!";
    if (razon) {
        mensaje += ` Razón: ${razon}\n`;
    }
    mensaje += "[Server] \nJugadores, usen !dt para postularse como Director Técnico.";

    room.sendAnnouncement(mensaje, null, 0xA6D9F7, "small", 3);

    verificarEstadoSala();
}

function kickearDT(dtId) {
    const dtName = room.getPlayer(dtId).name;
    DTS = DTS.filter(dt => dt !== dtName);
    room.kickPlayer(dtId, "Tardaste demasiado en meter a tus jugadores", false);
}

// Manejo de jugadores que abandonan
function verificarJugadoresSuficientes() {
    const jugadoresRojo = jugadoresEnJuego[1].length;
    const jugadoresAzul = jugadoresEnJuego[2].length;

    return jugadoresRojo >= MIN_JUGADORES_EQUIPO && jugadoresAzul >= MIN_JUGADORES_EQUIPO;
}

function iniciarPartido() {
    tiempoExtra = Math.floor(Math.random() * (MAX_TIEMPO_EXTRA - MIN_TIEMPO_EXTRA + 1)) + MIN_TIEMPO_EXTRA;
    room.sendAnnouncement("[Partido]  ¡Comienza el partido! ", null, 0x5EF38C, "small", 2);
    room.pauseGame(false);

    temporizadorPartido = setTimeout(() => {
        room.sendAnnouncement(`[Partido] ⌛ ¡Tiempo Extra! (+${Math.round(tiempoExtra / 1000)}s)`, null, 0x5EF38C, "small", 2);

        temporizadorTiempoExtra = setTimeout(() => {
            iniciarTransicionFinPartido();
        }, tiempoExtra);
    }, 780000); ///780000
}

function iniciarTransicionFinPartido() {
    clearTimeout(temporizadorPartido);
    clearTimeout(temporizadorTiempoExtra);

    room.sendAnnouncement("[Server] 🔚 ¡El partido está por terminar! Preparándose para negociaciones...", null, 0xFF5555, "small", 2);

    let countdown = 10;
    countdownInterval = setInterval(() => {
        if (countdown > 0) {
            room.sendAnnouncement(`⏳ ${countdown}`, null, 0xA6D9F7, "small", 1);
            if (countdown === 3) {
                room.pauseGame(true);
            }
            countdown--;
        } else {
            clearInterval(countdownInterval);
            countdownInterval = null;
            terminarPartido();
        }
    }, 1000);
}


async function terminarPartido() {
    // Obtener el marcador del partido
    enTransicion = true; // Iniciar transiciónini
    const scores = room.getScores();
    const redGoals = scores ? scores.red : 0;
    const blueGoals = scores ? scores.blue : 0;

    // Detener el juego explícitamente
    room.stopGame();

    // Enviar la grabación si no estamos en modo test ni mercado
    if (!modoTest && !mercadoActivo) {
        recordingSent = false; // Resetear la bandera
        sendDiscordWebhook();
        recordingSent = true; // Marcar como enviado
    } else {
        room.stopRecording(); // Detener la grabación si no se envía
    }

    // Determinar el ganador o si fue empate
    let resultadoMensaje;
    let winner = null;
    if (redGoals > blueGoals) {
        resultadoMensaje = `🏆 ¡El equipo Rojo gana ${redGoals} - ${blueGoals}!`;
        winner = "rojo";
    } else if (blueGoals > redGoals) {
        resultadoMensaje = `🏆 ¡El equipo Azul gana ${blueGoals} - ${blueGoals}!`;
        winner = "azul";
    } else {
        resultadoMensaje = `🤝 ¡Empate ${redGoals} - ${blueGoals}!`;
    }

    // Enviar anuncio con el resultado
    room.sendAnnouncement(
        `[Server] 🔚 ¡Fin del partido!\n` +
        `${resultadoMensaje}\n` +
        `Iniciando sala de negociación en breve...`,
        null,
        0xA6D9F7,
        "small",
        2
    );

    // Actualizar estadísticas de los jugadores
    let playerLogs = {};
    try {
        const data = fs.readFileSync('player_logs.json', 'utf8');
        playerLogs = JSON.parse(data);
    } catch (err) {
        console.error('Error al leer player_logs.json:', err);
        room.sendAnnouncement(
            "[Server] ❌ Error al procesar estadísticas del partido.",
            null,
            0xFF0000,
            "small",
            2
        );
        return;
    }

    let maxDTVictories = 0;
    let currentTopDTKey = null;
    for (const [key, log] of Object.entries(playerLogs)) {
        const victories = log.victorydt || 0;
        if (victories > maxDTVictories) {
            maxDTVictories = victories;
            currentTopDTKey = key;
        }
    }

    const players = room.getPlayerList().filter(p => p.id !== 0);
    for (const player of players) {
        const playerKey = playerAuth[player.id];
        if (!playerKey) continue;

        const playerTeamValue = playerTeam[player.id] || "Espectador";
        let updates = {};

        if (playerTeamValue !== "Espectador") {
            if (DTS.includes(player.name)) {
                if (winner) {
                    if (playerTeamValue === winner) {
                        updates.victorydt = 1;
                        updates.points = 4000;
                        const newVictories = (playerLogs[playerKey]?.victorydt || 0) + 1;
                        if (newVictories > maxDTVictories) {
                            room.sendAnnouncement(
                                `🏅 ¡${player.name} es el nuevo REY DT con ${newVictories} victorias!`,
                                null,
                                0xFFD700,
                                "small-bold",
                                2
                            );
                        }
                    } else {
                        updates.defeatdt = 1;
                        updates.points = -2000;
                    }
                } else {
                    updates.empatedt = 1;
                }
            } else {
                if (winner) {
                    if (playerTeamValue === winner) {
                        updates.victory = 1;
                        updates.points = 1500;
                    } else {
                        updates.defeat = 1;
                        updates.points = -1300;
                    }
                } else {
                    updates.empate = 1;
                }
            }

            if (Object.keys(updates).length > 0) {
                await updatePlayerStats(playerKey, updates);
            }
        }
    }

    // Reiniciar variables de partido
    teamKicks = { 1: 0, 2: 0 };
    matchScore = { red: 0, blue: 0 };
    lastPlayerTouched = null;
    lastPlayerToKick = null;
    secondaryPlayerTouched = null;

    // Temporizador para sala de negociación
    temporizadorSalaNegociacion = setTimeout(() => {
        iniciarSalaNegociacion();
        temporizadorSalaNegociacion = null;
    }, 3000);
}

function mostrarResumenEquipos() {
    // Mostrar jugadores del equipo rojo
    const jugadoresRojos = jugadoresSeleccionados[1].map(id => {
        const player = room.getPlayer(id);
        return player ? `[${player.id}] ${player.name}` : '[Desconectado]';
    }).join(', ');

    // Mostrar jugadores del equipo azul
    const jugadoresAzules = jugadoresSeleccionados[2].map(id => {
        const player = room.getPlayer(id);
        return player ? `[${player.id}] ${player.name}` : '[Desconectado]';
    }).join(', ');

    room.sendAnnouncement(
        "[Server] 📋 RESUMEN DE EQUIPOS 📋\n" +
        `Equipo Rojo: ${jugadoresRojos}\n` +
        `Equipo Azul: ${jugadoresAzules}`,
        null,
        0x7AC74F,
        "small",
        3
    );
}
function iniciarMercadoFichajes() {
    // Limpiar registro de fichajes anteriores
    jugadoresFichados.clear();

    // Mover a TODOS a espectadores (incluyendo DTs temporalmente)
    room.getPlayerList().forEach(player => {
        room.setPlayerTeam(player.id, Team.SPECTATORS);
    });

    // Restaurar equipos de DTs basándonos en playerTeam
    DTS.forEach(dtName => {
        const dt = room.getPlayerList().find(p => p.name === dtName);
        if (dt) {
            const equipoDT = playerTeam[dt.id]; // Usar playerTeam para determinar el equipo
            if (equipoDT === 'rojo') {
                room.setPlayerTeam(dt.id, Team.RED);
            } else if (equipoDT === 'azul') {
                room.setPlayerTeam(dt.id, Team.BLUE);
            } else {
                // Si no hay equipo asignado, asignar uno por defecto
                const equipoPorDefecto = DTS.indexOf(dtName) === 0 ? 'rojo' : 'azul';
                playerTeam[dt.id] = equipoPorDefecto;
                room.setPlayerTeam(dt.id, equipoPorDefecto === 'rojo' ? Team.RED : Team.BLUE);
                console.log(`[DEBUG] Asignado equipo por defecto ${equipoPorDefecto} a DT ${dtName}`);
            }
            console.log(`[DEBUG] DT ${dtName} restaurado al equipo ${playerTeam[dt.id]}, equipo en juego: ${dt.team === Team.RED ? 'rojo' : dt.team === Team.BLUE ? 'azul' : 'espectadores'}`);
        }
    });

    // Reiniciar estados específicos del mercado
    mercadoActivo = true;
    juegoEnCurso = false;
    juegoPausado = false;

    // Limpiar temporizadores anteriores
    clearTimeout(DURACION_MERCADO);

    room.sendAnnouncement(
        "[Server] 🏦 ¡MERCADO DE FICHAJES ABIERTO! 🏦\n" +
        "Usa los siguientes comandos:\n" +
        "• !fichar <ID> - Fichar un jugador por su ID\n" +
        "• !ids - Ver lista de jugadores con sus IDs\n" +
        "• !economia - Ver presupuesto de tu equipo\n",
        null,
        0x87C38F,
        "small",
        3
    );

    temporizadorMercado = setTimeout(() => {
        cerrarMercadoFichajes();
    }, DURACION_MERCADO);
}

function procesarFichaje(dtId, jugadorId) {
    if (!mercadoActivo) {
        room.sendAnnouncement("[Error]   El mercado de fichajes está cerrado.", null, 0x842636, "small", 3);
        return;
    }

    const dt = room.getPlayer(dtId);
    if (!dt || !DTS.includes(dt.name)) {
        room.sendAnnouncement("[Error] ❌ ❌ Solo los DTs pueden realizar fichajes.", null, 0x842636, "small", 3);
        return;
    }

    const jugador = room.getPlayer(jugadorId);
    if (!jugador) {
        room.sendAnnouncement("[Error] ❌ ❌ No se encontró un jugador con ese ID.", null, 0x842636, "small", 3);
        return;
    }

    if (jugadoresFichados.has(jugadorId)) {
        room.sendAnnouncement("[Error] ❌ ❌ Este jugador ya fue transferido en este mercado de pases.", null, 0x842636, "small", 3);
        return;
    }

    if (DTS.includes(jugador.name)) {
        room.sendAnnouncement("[Error] ❌ ❌ No puedes fichar a un DT.", null, 0x842636, "small", 3);
        return;
    }

    const equipoDt = playerTeam[dt.id];
    const equipoNumericoDt = equipoDt === 'rojo' ? 1 : 2;
    const equipoJugador = playerTeam[jugador.id];

    if (equipoDt === equipoJugador) {
        room.sendAnnouncement("[Error] ❌ ❌ No puedes fichar a un jugador de tu propio equipo.", null, 0x842636, "small", 3);
        return;
    }

    const equipoVendedorNum = equipoJugador === 'rojo' ? 1 : 2;
    const jugadoresEquipoVendedor = jugadoresSeleccionados[equipoVendedorNum].length;

    if (equipoJugador && jugadoresEquipoVendedor <= MIN_JUGADORES_EQUIPO) {
        room.sendAnnouncement(
            `[Error] ❌ No se puede realizar el fichaje. El equipo ${equipoJugador} quedaría con menos de ${MIN_JUGADORES_EQUIPO} jugadores.`,
            dtId,
            0x842636,
            "small",
            2
        );
        return;
    }

    const valorJugador = playerValues[jugador.id] || VALOR_BASE_JUGADOR;
    const presupuestoEquipo = presupuestoEquipos[equipoNumericoDt];

    if (presupuestoEquipo < valorJugador) {
        room.sendAnnouncement(
            `[Error] ❌ Presupuesto insuficiente.\nValor del jugador: ${valorJugador}\nPresupuesto disponible: ${presupuestoEquipo}`,
            dtId,
            0x842636,
            "small",
            2
        );
        return;
    }

    // Limpiar completamente del equipo anterior
    if (equipoJugador) {
        const equipoNumericoAnterior = equipoJugador === 'rojo' ? 1 : 2;
        jugadoresSeleccionados[equipoNumericoAnterior] = jugadoresSeleccionados[equipoNumericoAnterior].filter(id => id !== jugador.id);
        jugadoresEnJuego[equipoNumericoAnterior] = jugadoresEnJuego[equipoNumericoAnterior].filter(id => id !== jugador.id);
    }

    // Actualización económica
    presupuestoEquipos[equipoNumericoDt] -= valorJugador;
    if (equipoJugador) {
        const equipoNumericoJugador = equipoJugador === 'rojo' ? 1 : 2;
        presupuestoEquipos[equipoNumericoJugador] += Math.floor(valorJugador * 0.8);
    }

    // Asignar al nuevo equipo
    jugadoresFichados.add(jugadorId);
    playerValues[jugador.id] = Math.floor(valorJugador * 1.2);
    playerTeam[jugador.id] = equipoDt;
    jugadoresSeleccionados[equipoNumericoDt].push(jugador.id);

    const nuevoTeam = equipoDt === 'rojo' ? Team.RED : Team.BLUE;
    room.setPlayerTeam(jugador.id, nuevoTeam);
    setTimeout(() => {
        const jugadorCheck = room.getPlayer(jugadorId);
        if (jugadorCheck && jugadorCheck.team !== nuevoTeam) {
            room.setPlayerTeam(jugadorId, nuevoTeam);
        }
    }, 100);

    room.sendAnnouncement(
        `[Server] 💰 ¡Fichaje completado!\n` +
        `${jugador.name} ha sido transferido al equipo ${equipoDt}\n` +
        `Valor de transferencia: ${valorJugador}\n` +
        `Nuevo valor del jugador: ${playerValues[jugador.id]}`,
        null,
        0x87C38F,
        "small",
        2
    );
}

// Función para cerrar el mercado de fichajes
function cerrarMercadoFichajes() {
    mercadoActivo = false;
    sincronizarEquipos(); // Sincronizar antes de continuar
    jugadoresEnJuego = { 1: [], 2: [] };
    dtSeleccionCompleta = { 1: false, 2: false };
    faseTitulares = true;
    room.stopGame();

    // Verificar DTs activos
    const dtsActivos = DTS.filter(dtName => room.getPlayerList().find(p => p.name === dtName));
    if (dtsActivos.length < 2) {
        room.sendAnnouncement(
            "[Server] ⚠️ No hay suficientes DTs para iniciar la fase de titulares. Reiniciando...",
            null,
            0xFFA500,
            "small",
            2
        );
        console.log("[DEBUG] Faltan DTs, reiniciando juego.");
        reiniciarJuego("Faltan DTs para iniciar la fase de titulares");
        return;
    }

    // Verificar que ambos equipos tengan suficientes jugadores
    const equipoRojo = jugadoresSeleccionados[1].filter(id => room.getPlayer(id)).length;
    const equipoAzul = jugadoresSeleccionados[2].filter(id => room.getPlayer(id)).length;
    if (equipoRojo < MIN_JUGADORES_EQUIPO || equipoAzul < MIN_JUGADORES_EQUIPO) {
        room.sendAnnouncement(
            `[Server] ⚠️ Uno de los equipos no tiene suficientes jugadores (Rojo: ${equipoRojo}, Azul: ${equipoAzul}). Reiniciando...`,
            null,
            0xFFA500,
            "small",
            2
        );
        console.log("[DEBUG] Equipos incompletos, reiniciando juego.");
        reiniciarJuego("Equipos incompletos para iniciar la fase de titulares");
        return;
    }

    // Limpiar todos los temporizadores
    limpiarTimers();
    limpiarTimersSeleccion();

    setTimeout(() => {
        const mapaElegido = mapasDisponibles[Math.floor(Math.random() * mapasDisponibles.length)];
        room.setCustomStadium(mapaElegido);
        room.startGame();

        // Asignar equipos a jugadores y DTs
        room.getPlayerList().forEach(player => {
            if (DTS.includes(player.name)) {
                const equipo = playerTeam[player.id];
                if (equipo === 'rojo') {
                    room.setPlayerTeam(player.id, Team.RED);
                } else if (equipo === 'azul') {
                    room.setPlayerTeam(player.id, Team.BLUE);
                } else {
                    const equipoPorDefecto = DTS.indexOf(player.name) === 0 ? 'rojo' : 'azul';
                    playerTeam[player.id] = equipoPorDefecto;
                    room.setPlayerTeam(player.id, equipoPorDefecto === 'rojo' ? Team.RED : Team.BLUE);
                }
            } else {
                const equipo = playerTeam[player.id];
                if (equipo === 'rojo') {
                    room.setPlayerTeam(player.id, Team.RED);
                } else if (equipo === 'azul') {
                    room.setPlayerTeam(player.id, Team.BLUE);
                } else {
                    room.setPlayerTeam(player.id, Team.SPECTATORS);
                }
            }
        });

        juegoEnCurso = true;
        faseTitulares = true;
        room.pauseGame(true);
        posicionarDTs();
        mostrarResumenEquipos(); // Mostrar resumen de equipos
        room.sendAnnouncement(
            "[Server] ⚽ ¡Fase de titulares iniciada! DTs usen !meter <id>",
            null,
            0xA6D9F7,
            "small",
            3
        );
        console.log("[DEBUG] Fase de titulares iniciada, iniciando temporizadores.");

        // Iniciar temporizadores para ambos equipos
        iniciarTimerTitulares(1);
        iniciarTimerTitulares(2);
    }, 1000);
}

// Función auxiliar para mostrar estado económico
function mostrarEstadoEconomico(teamId) {
    // Mostrar economía de ambos equipos si no se especifica uno
    if (!teamId) {
        // Equipo Rojo
        mostrarEstadoEconomicoPorEquipo(1);
        // Equipo Azul
        mostrarEstadoEconomicoPorEquipo(2);
        return;
    }
    mostrarEstadoEconomicoPorEquipo(teamId);
}

function mostrarEstadoEconomicoPorEquipo(teamId) {
    const teamName = teamId === 1 ? "Rojo" : "Azul";

    let mensaje = `💰 Estado económico equipo ${teamName}:\n`;
    mensaje += `Presupuesto: ${presupuestoEquipos[teamId]} monedas\n`;

    room.sendAnnouncement(mensaje, null, 0xA6D9F7, "small", 2);
}



function getUpgradeMultiplier(playerKey, playerLogs) {
    if (!playerLogs || !playerLogs[playerKey]) return 1; // Sin datos, multiplicador base
    if (playerLogs[playerKey].upgrade3) return 3; // Mejora III (x3)
    if (playerLogs[playerKey].upgrade2) return 2; // Mejora II (x2)
    if (playerLogs[playerKey].upgrade1) return 1.5; // Mejora I (x1.5)
    return 1; // Sin mejoras
}



room.onTeamGoal = async function(team) {
    try {
        const scorerTeam = team;
        const scorer = lastPlayerToKick;
        const assister = secondaryPlayerTouched;

        // Incrementar contador de goles
        if (team === 1) {
            matchScore.red++;
        } else if (team === 2) {
            matchScore.blue++;
        }
        console.log(`[DEBUG] Goles: Rojo ${matchScore.red} - Azul ${matchScore.blue}`);

        console.log(`[DEBUG] Gol del equipo ${team}.`);
        console.log(`[DEBUG] Goleador: ${scorer ? `${scorer.name} (ID: ${scorer.id}, Team: ${scorer.team})` : "No definido"}`);
        console.log(`[DEBUG] Asistente: ${assister ? `${assister.name} (ID: ${assister.id}, Team: ${assister.team})` : "No definido"}`);
        console.log(`[DEBUG] touchStack: ${touchStack.map(p => `${p.name} (ID: ${p.id}, Team: ${p.team})`).join(", ")}`);

        if (!scorer) {
            room.sendAnnouncement("[Server] ⚽ ¡Gol! No se pudo determinar el goleador.", null, 0xA6D9F7, "small", 2);
            console.log("[DEBUG] Error: No hay goleador definido.");
            return;
        }

        if (typeof modoTest === 'undefined') {
            console.log("[DEBUG] modoTest no está definido, asumiendo false.");
            modoTest = false;
        }

        if (modoTest) {
            room.sendAnnouncement(
                `[Server] ⚽ ¡Gol del equipo ${team == 1 ? "Rojo" : "Azul"} en modo prueba! No se suman estadísticas.`,
                null,
                0xA6D9F7,
                "small",
                2
            );
            touchStack = [];
            lastPlayerTouched = null;
            secondaryPlayerTouched = null;
            lastPlayerToKick = null;
            return;
        }

        let playerLogs = await getPlayerLogsCached();

        function getUpgradeMultiplier(playerKey) {
            if (!playerLogs[playerKey]) return 1;
            if (playerLogs[playerKey].upgrade3) return 3;
            if (playerLogs[playerKey].upgrade2) return 2;
            if (playerLogs[playerKey].upgrade1) return 1.5;
            return 1;
        }

        // Gol con asistencia
        if (assister && assister.team === scorer.team && assister.id !== scorer.id && scorer.team === team) {
            console.log(`[DEBUG] Asistencia confirmada: ${assister.name} -> ${scorer.name}`);
            try {
                playerColors[assister.id] = (playerColors[assister.id] || 0) + 2;
                playerColors[scorer.id] = (playerColors[scorer.id] || 0) + 2;
                presupuestoEquipos[scorerTeam] = (presupuestoEquipos[scorerTeam] || 0) + PREMIO_GOL_EQUIPO;

                playerGoals[scorer.id] = (playerGoals[scorer.id] || 0) + 1;
                playerAssists[assister.id] = (playerAssists[assister.id] || 0) + 1;

                playerValues[scorer.id] = (playerValues[scorer.id] || VALOR_BASE_JUGADOR) + INCREMENTO_VALOR_POR_GOL;
                playerValues[assister.id] = (playerValues[assister.id] || VALOR_BASE_JUGADOR) + INCREMENTO_VALOR_POR_ASISTENCIA;

                const scorerMultiplier = getUpgradeMultiplier(playerAuth[scorer.id]);
                const assisterMultiplier = getUpgradeMultiplier(playerAuth[assister.id]);
                const goalsToAdd = 1;
                const assistsToAdd = 1;
                const pointsToAddScorer = Math.round(100 * scorerMultiplier);
                const pointsToAddAssister = Math.round(100 * assisterMultiplier);

                var mensajes = [
                    "[Server] ¡Por fin tira un buen pase el inútil este!, asistencia de " + assister.name + " para " + scorer.name + ".",
                    "[Server] Que pase de mierda de " + assister.name + ", suerte que estaba " + scorer.name + " para definir, mamita querida.",
                    "[Server] Sí no es por " + assister.name + ", el burro de " + scorer.name + " olvidate que meta alguna.",
                    "[Server> Cierren el estadio, " + assister.name + " hizo una buena, gol de " + scorer.name + ".",
                    "[Server] ¡Qué lujo, papá! " + assister.name + " la dejó servida para " + scorer.name + ".",
                    "[Server] ¡Mamita, qué pase! " + assister.name + " y " + scorer.name + " la rompieron.",
                    "[Server] ¡Esto es fútbol! " + assister.name + " con un pase de crack para " + scorer.name + ".",
                    "[Server] ¡Tiki-taka en Haxball! " + assister.name + " asistió a " + scorer.name + " como los dioses.",
                    "[Server] ¡Qué dupla! " + assister.name + " puso el pase y " + scorer.name + " no perdonó.",
                    "[Server] ¡Se despertó el genio! " + assister.name + " le dio una asistencia de oro a " + scorer.name + ".",
                    "[Server] ¡La combinación letal! " + assister.name + " y " + scorer.name + " haciendo magia.",
                    "[Server] ¡Pase quirúrgico! " + assister.name + " dejó solo a " + scorer.name + " para el gol.",
                    "[Server] ¡Qué visión! " + assister.name + " vio el hueco y " + scorer.name + " la mandó adentro.",
                    "[Server] ¡Esto es un equipo, che! " + assister.name + " asistiendo a " + scorer.name + " como crack.",
                    "[Server] ¡Pase de PlayStation! " + assister.name + " para " + scorer.name + ", golazo asegurado.",
                    "[Server] ¡Qué barbaridad! " + assister.name + " la puso en el pie y " + scorer.name + " la clavó.",
                    "[Server] ¡Un toque de clase! " + assister.name + " y " + scorer.name + " haciendo arte.",
                    "[Server] ¡La dejó pintada! " + assister.name + " para que " + scorer.name + " la empuje nomás.",
                    "[Server] ¡Qué ojo clínico! " + assister.name + " vio a " + scorer.name + " y no falló.",
                    "[Server] ¡Pase de maestro! " + assister.name + " le sirvió el gol a " + scorer.name + " en bandeja.",
                    "[Server] ¡Esto es para ESPN! " + assister.name + " asistiendo a " + scorer.name + " como los grandes.",
                    "[Server] ¡La cocinaron entre los dos! " + assister.name + " puso el pase y " + scorer.name + " el grito.",
                    "[Server] ¡Qué conexión! " + assister.name + " y " + scorer.name + " en modo Messi y Agüero.",
                    "[Server] ¡Pase con GPS! " + assister.name + "找到了" + scorer.name + " para el gol.",
                    "[Server] ¡Esto es un sueño! " + assister.name + " la puso justa y " + scorer.name + " definió."
                ];
                var mensajeRandom = mensajes[Math.floor(Math.random() * mensajes.length)];
                room.sendAnnouncement(`${mensajeRandom} [x${scorerMultiplier}/${assisterMultiplier}]`, null, 0xA6D9F7, "small", 2);

                updatePlayerStats(playerAuth[scorer.id], { goals: goalsToAdd, points: pointsToAddScorer });
                updatePlayerStats(playerAuth[assister.id], { assists: assistsToAdd, points: pointsToAddAssister });
            } catch (error) {
                console.error("[ERROR] Fallo al procesar asistencia:", error.message);
            }
        }
        // Gol normal
        else if (scorer.team === team) {
            console.log(`[DEBUG] Gol normal por ${scorer.name}`);
            try {
                playerColors[scorer.id] = (playerColors[scorer.id] || 0) + 2;
                playerValues[scorer.id] = (playerValues[scorer.id] || VALOR_BASE_JUGADOR) + INCREMENTO_VALOR_POR_GOL;
                playerGoals[scorer.id] = (playerGoals[scorer.id] || 0) + 1;
                presupuestoEquipos[scorerTeam] = (presupuestoEquipos[scorerTeam] || 0) + PREMIO_GOL_EQUIPO;

                const scorerMultiplier = getUpgradeMultiplier(playerAuth[scorer.id]);
                const goalsToAdd = 1;
                const pointsToAdd = Math.round(100 * scorerMultiplier);

                var mensajes = [
                    "[Server] ⚽ ¡Golazo de " + scorer.name + "! Este tipo no necesita a nadie, se la mandó solito.",
                    "[Server] ⚽ ¡Qué bestia! " + scorer.name + " la clavó sin ayuda de nadie, un crack.",
                    "[Server] ⚽ ¡Gol de " + scorer.name + "! Se ve que no confía en sus compañeros, ja.",
                    "[Server] ⚽ ¡Mamita querida! " + scorer.name + " definió como si fuera el único en la cancha.",
                    "[Server] ⚽ ¡Aplausos para " + scorer.name + "! Se gambeteó hasta al aire y la metió.",
                    "[Server] ⚽ ¡Qué fenómeno! " + scorer.name + " haciendo todo el trabajo él solo.",
                    "[Server] ⚽ ¡Gol de " + scorer.name + "! Esto es un one-man show, che.",
                    "[Server] ⚽ ¡La rompió toda! " + scorer.name + " no necesita socios para meterla.",
                    "[Server] ⚽ ¡Qué loco! " + scorer.name + " la mandó a guardar sin mirar a nadie.",
                    "[Server] ⚽ ¡Golazo solitario de " + scorer.name + "! Este tipo juega en otra liga.",
                    "[Server] ⚽ ¡Un gol para el highlight! " + scorer.name + " se lució sin ayuda.",
                    "[Server] ⚽ ¡Qué manera de definir! " + scorer.name + " se la jugó toda él solo.",
                    "[Server] ⚽ ¡Gol de " + scorer.name + "! Parece que el equipo es puro adorno.",
                    "[Server] ⚽ ¡Este es crack! " + scorer.name + " metió un gol sin pedir permiso.",
                    "[Server] ⚽ ¡Qué joya! " + scorer.name + " la puso donde quiso, solito y sin drama.",
                    "[Server] ⚽ ¡Gol de " + scorer.name + "! Se ve que no le gusta compartir la gloria.",
                    "[Server] ⚽ ¡Un gol para la historia! " + scorer.name + " se mandó una obra maestra en solitario.",
                    "[Server] ⚽ ¡Qué capo! " + scorer.name + " definió como si el resto no existiera.",
                    "[Server] ⚽ ¡Golazo de " + scorer.name + "! Este tipo hace todo y lo hace bien.",
                    "[Server] ⚽ ¡Qué manera de romperla! " + scorer.name + " la metió sin ayuda de nadie.",
                    "[Server] ⚽ ¡Gol de " + scorer.name + "! Se gambeteó al universo y la mandó adentro.",
                    "[Server] ⚽ ¡Un gol para el ego! " + scorer.name + " dijo 'yo me basto solo'.",
                    "[Server] ⚽ ¡Qué atrevido! " + scorer.name + " la clavó sin mirar al resto del equipo.",
                    "[Server] ⚽ ¡Gol de " + scorer.name + "! Este loco juega como si estuviera en el patio de su casa.",
                    "[Server] ⚽ ¡Qué clase! " + scorer.name + " se la jugó solo y la metió con estilo."
                ];
                var mensajeRandom = mensajes[Math.floor(Math.random() * mensajes.length)];
                room.sendAnnouncement(`${mensajeRandom} [x${scorerMultiplier}]`, null, 0xA6D9F7, "small", 2);

                updatePlayerStats(playerAuth[scorer.id], { goals: goalsToAdd, points: pointsToAdd });
            } catch (error) {
                console.error("[ERROR] Fallo al procesar gol normal:", error.message);
            }
        }
        // Gol en contra
        else if (scorer.team !== team) {
            console.log(`[DEBUG] Gol en contra por ${scorer.name}`);
            try {
                const player = room.getPlayer(scorer.id);
                if (player) {
                    playerValues[scorer.id] = (playerValues[scorer.id] || VALOR_BASE_JUGADOR) - 20;
                    if (playerValues[scorer.id] < 0) playerValues[scorer.id] = 0;

                    const pointsToDeduct = -100;

                    var mensajes = [
                        "[Server] ¡Gol en contra! El gol del equipo " + (team == 1 ? "Red" : "Blue") + " fue hecho por " + scorer.name + " del equipo contrario. 🐸",
                        "[Server] ¡Alto bot, amigo! " + scorer.name + " del equipo contrario ha marcado en su propia portería. 🐸",
                        "[Server] ¡Mamadera! " + scorer.name + " ha marcado un gol en su propio arco. 🐸",
                        "[Server] ¡Que imbecil! " + scorer.name + " se metió un gol en contra. 🐸",
                        "[Server] ¡Esto es un chiste! " + scorer.name + " le regaló el gol al equipo " + (team == 1 ? "Rojo" : "Azul") + ". 🐸",
                        "[Server] ¡Para qué jugás, loco! " + scorer.name + " metió un golazo... en contra. 🐸",
                        "[Server] ¡Mamita, qué desastre! " + scorer.name + " se confundió de arco. 🐸",
                        "[Server] ¡Un aplauso para " + scorer.name + "! Le dio una mano al enemigo. 🐸",
                        "[Server] ¡Qué crack! " + scorer.name + " jugando para el rival como campeón. 🐸",
                        "[Server] ¡Esto no se vio nunca! " + scorer.name + " definiendo para el otro lado. 🐸",
                        "[Server] ¡Gracias, genio! " + scorer.name + " haciendo favores al equipo " + (team == 1 ? "Rojo" : "Azul") + ". 🐸",
                        "[Server] ¡Qué fenómeno! " + scorer.name + " metió un gol en contra y ni se inmutó. 🐸",
                        "[Server] ¡Payaso total! " + scorer.name + " se mandó un gol en su propio arco. 🐸",
                        "[Server] ¡Esto es para Tinelli! " + scorer.name + " con un gol en contra épico. 🐸",
                        "[Server] ¡Qué manera de ayudar! " + scorer.name + " le dio el gol al rival en bandeja. 🐸",
                        "[Server] ¡Qué papelón, boludo! " + scorer.name + " metió un gol en contra de antología. 🐸",
                        "[Server] ¡Un desastre con patas! " + scorer.name + " le hizo el trabajo al equipo " + (team == 1 ? "Rojo" : "Azul") + ". 🐸",
                        "[Server] ¡Qué lindo regalo! " + scorer.name + " le dio el punto al rival sin querer queriendo. 🐸",
                        "[Server] ¡Se equivocó de cancha! " + scorer.name + " y un gol en contra para el recuerdo. 🐸",
                        "[Server] ¡Esto es pa’ llorar! " + scorer.name + " metió un gol en su arco y encima lo celebra. 🐸",
                        "[Server] ¡Un héroe al revés! " + scorer.name + " jugando para el enemigo como crack. 🐸",
                        "[Server] ¡Qué manera de cagar el partido! " + scorer.name + " con un gol en contra de novela. 🐸",
                        "[Server] ¡Esto es Haxball! " + scorer.name + " dándole una alegría al equipo " + (team == 1 ? "Rojo" : "Azul") + ". 🐸",
                        "[Server] ¡Qué clase de amigo! " + scorer.name + " le puso el moño al gol del rival. 🐸",
                        "[Server] ¡Un gol para enmarcar… en contra! " + scorer.name + " la mandó a guardar en su propio arco. 🐸",
                        "[Server] ¡El gordo este de " + scorer.name + " esta a 2 kilos de que Greenpeace lo proteja! 🐸"
                    ];
                    var mensajeRandom = mensajes[Math.floor(Math.random() * mensajes.length)];
                    room.sendAnnouncement(`${mensajeRandom}`, null, 0xA6D9F7, "small", 2);

                    await updatePlayerStats(playerAuth[scorer.id], { points: pointsToDeduct });
                } else {
                    room.sendAnnouncement("[Server] ¡Gol en contra! (Jugador desconectado)", null, 0xA6D9F7, "small", 2);
                }
            } catch (error) {
                console.error("[ERROR] Fallo al procesar gol en contra:", error.message);
            }
        }

        touchStack = [];
        lastPlayerTouched = null;
        secondaryPlayerTouched = null;
        lastPlayerToKick = null;
        console.log("[DEBUG] Variables y touchStack reseteados post-gol.");
    } catch (error) {
        console.error("[ERROR] Fallo en onTeamGoal:", error.message);
        room.sendAnnouncement("[Server] ⚠️ Error al procesar el gol. Contactá al admin.", null, 0xFF5555, "small", 2);
    }
};


// Funciones de verificación
function verificarSeleccionCompleta() {
    // Obtener todos los jugadores disponibles (excluyendo DTs)
    const jugadoresDisponibles = room.getPlayerList().filter(p => !DTS.includes(p.name));
    
    // Verificar si todos los jugadores han sido asignados a un equipo
    const todosAsignados = jugadoresDisponibles.every(jugador => 
        jugadoresSeleccionados[1].includes(jugador.id) || jugadoresSeleccionados[2].includes(jugador.id)
    );

    // Verificar que ambos equipos tengan al menos MIN_JUGADORES_EQUIPO
    const equiposCompletos = Object.values(jugadoresSeleccionados).every(
        equipo => equipo.length >= MIN_JUGADORES_EQUIPO
    );

    // Si todos los jugadores están asignados y los equipos están completos
    if (todosAsignados && equiposCompletos) {
        // Limpiar todos los timers de selección
        limpiarTimersSeleccion();
        
        room.sendAnnouncement(
            "[Server] ✅ ¡Selección de jugadores completada!\n" +
            "Iniciando partido...",
            null,
            0x87C38F,
            "small",
            2
        );
        
        // Reiniciar el partido para comenzar con los equipos seleccionados
        room.stopGame();
        setTimeout(() => {
            room.startGame();
        }, 500);

        // Reiniciar variables de estado
        faseTitulares = true;
        dtSeleccionCompleta = { 1: false, 2: false };
        jugadoresEnJuego = { 1: [], 2: [] };
        
        // Mostrar recordatorio para meter jugadores
        setTimeout(() => {
            // Iniciar timers para la fase de titulares
            iniciarTimerTitulares(1); // Equipo Rojo
            iniciarTimerTitulares(2); // Equipo Azul
        }, 1000);
    } else if (!todosAsignados) {
        // Si no todos los jugadores están asignados, mostrar un mensaje
        console.log("Faltan Jugs")
    }
}


function verificarTitularesCompletos() {
    const equipo1Completo = jugadoresEnJuego[1].length >= MIN_JUGADORES_EQUIPO;
    const equipo2Completo = jugadoresEnJuego[2].length >= MIN_JUGADORES_EQUIPO;

    if (equipo1Completo && equipo2Completo) {
        console.log("[DEBUG] Ambos equipos tienen suficientes jugadores, iniciando partido.");
        room.pauseGame(false);
        juegoPausado = false;
        iniciarPartido();
    } else {
        const equipoIncompleto = !equipo1Completo ? "Rojo" : "Azul";
        const jugadoresFaltantes = MIN_JUGADORES_EQUIPO - jugadoresEnJuego[!equipo1Completo ? 1 : 2].length;
        room.sendAnnouncement(
            `[Server] ⚠️ El equipo ${equipoIncompleto} necesita ${jugadoresFaltantes} jugador(es) más.`,
            null,
            0xFFA500,
            "small",
            2
        );
        console.log(`[DEBUG] Equipo ${equipoIncompleto} incompleto, faltan ${jugadoresFaltantes} jugadores.`);
    }
}
function sincronizarEquipos() {
    // Limpiar jugadores desconectados de jugadoresSeleccionados
    jugadoresSeleccionados[1] = jugadoresSeleccionados[1].filter(id => room.getPlayer(id));
    jugadoresSeleccionados[2] = jugadoresSeleccionados[2].filter(id => room.getPlayer(id));

    // Sincronizar playerTeam con jugadoresSeleccionados
    Object.keys(playerTeam).forEach(playerId => {
        const id = parseInt(playerId);
        const equipo = playerTeam[id];
        if (equipo === 'rojo' && !jugadoresSeleccionados[1].includes(id)) {
            delete playerTeam[id];
        } else if (equipo === 'azul' && !jugadoresSeleccionados[2].includes(id)) {
            delete playerTeam[id];
        }
    });

    // Asegurarse de que los jugadores seleccionados estén en playerTeam
    jugadoresSeleccionados[1].forEach(id => {
        if (!playerTeam[id]) playerTeam[id] = 'rojo';
    });
    jugadoresSeleccionados[2].forEach(id => {
        if (!playerTeam[id]) playerTeam[id] = 'azul';
    });

    console.log("[DEBUG] Equipos sincronizados:", {
        equipoRojo: jugadoresSeleccionados[1],
        equipoAzul: jugadoresSeleccionados[2],
        playerTeam
    });
}
// Función para posicionar DTs
function posicionarDTs() {
    DTS.forEach((dtName, index) => {
        var dtPlayer = room.getPlayerList().find(p => p.name === dtName);
        if (dtPlayer) {
            var position = index === 0 ? DT_POSITIONS.RED : DT_POSITIONS.BLUE;
            room.setPlayerDiscProperties(dtPlayer.id, { x: position.x, y: position.y });
        }
    });
}
room.onPlayerChat = function(player, message) {
    var teamPrefix = "";
    const playerName = playerAuth[player.id];
    const playerData = getPlayerData(playerName);
    const adminList1 = [Admin, Admin1, "𝓜𝓸𝓷𝓴𝓮𝔂"];





    // Detectar y bloquear IPs de forma estricta
const ipRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.|\s*[\[\]\(\)\{\}\-_=]+\s*|\s+)){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
const normalizedIpMessage = message
    .replace(/[\[\]\(\)\{\}\-_=]+/g, '.') // Reemplaza caracteres comunes por puntos
    .replace(/\s+/g, ''); // Elimina espacios
if (ipRegex.test(message) || ipRegex.test(normalizedIpMessage)) {
    room.sendAnnouncement(
        "[Server] ❌ No podés compartir direcciones IP en el chat.",
        player.id,
        0xFF0000,
        "small",
        2
    );
    return false; // Bloquear el mensaje
}

// Detectar y bloquear códigos de Discord de forma estricta
const codeRegex = /[a-zA-Z0-9]{6,10}/g; // Busca códigos alfanuméricos de 6 a 10 caracteres
let playerLogs = {};
try {
    const data = fs.readFileSync('player_logs.json', 'utf8');
    playerLogs = JSON.parse(data);
} catch (err) {
    console.error('Error al leer player_logs.json en onPlayerChat:', err);
}


// Obtener todos los códigos de Discord almacenados
const discordCodes = Object.values(playerLogs).map(log => log.discord).filter(code => code);

// Normalizar el mensaje eliminando caracteres comunes usados para ocultar códigos


// Normalizar el mensaje eliminando caracteres comunes usados para ocultar códigos
const normalizedMessage = message
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, ''); // Elimina todo lo que no sea alfanumérico

// Buscar coincidencias de códigos en el mensaje original
const possibleCodes = message.match(codeRegex) || [];
const containsCode = !message.toLowerCase().startsWith("!discord ") && ( // Excluir mensajes que empiezan con !discord
    possibleCodes.some(code => {
        // Normalizar el código encontrado para comparar
        const normalizedCode = code.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        return discordCodes.includes(normalizedCode);
    }) || discordCodes.some(code => normalizedMessage.includes(code.toLowerCase()))
);

if (containsCode) {
    room.sendAnnouncement(
        "[Server] ❌ No podés compartir códigos de vinculación en el chat. Usá !discord <código> para vincular tu cuenta.",
        player.id,
        0xFF0000,
        "small",
        2
    );
    return false; // Bloquear el mensaje
}
     // Nueva lógica para detectar números en fase de selección
     const isNumber = /^\d+$/.test(message.trim());
     if (isNumber && !juegoEnCurso && !mercadoActivo && DTS.length === 2) {
         // Estamos en fase de selección, interpretar como !s <id>
         const id = parseInt(message.trim());
         if (!isNaN(id)) {
             manejarComandoSeleccionar(player, `!s ${id}`);
             return false; // Evitar que el mensaje se procese como chat normal
         }
     }

     
     
      // Nueva lógica para detectar números en fase de titulares
    if (isNumber && juegoEnCurso && faseTitulares && DTS.includes(player.name)) {
        // Estamos en fase de titulares, interpretar como !meter <id>
        const id = parseInt(message.trim());
        if (!isNaN(id)) {
            manejarComandoMeter(player, `!meter ${id}`);
            return false; // Evitar que el mensaje se procese como chat normal
        }
    }
    // Nueva lógica para detectar dos números en fase de cambios
    const isTwoNumbers = /^\d+\s+\d+$/.test(message.trim());
    if (isTwoNumbers && juegoEnCurso && !mercadoActivo && !faseTitulares && DTS.includes(player.name)) {
        const [idSale, idEntra] = message.trim().split(/\s+/).map(num => parseInt(num));
        if (!isNaN(idSale) && !isNaN(idEntra)) {
            manejarComandoCambio(player, `!cmb ${idSale} ${idEntra}`);
            return false; // Evitar que el mensaje se procese como chat normal
        }
    }

     // Nuevo comando !discord <código>
    if (message.toLowerCase().startsWith("!discord ")) {
        const args = message.split(" ");
        const inputCode = args[1]?.trim();

        if (!inputCode) {
            room.sendAnnouncement(
                "[Server] ❌ Uso: !discord <código>",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }

        try {
            let playerLogs;
            try {
                const data = fs.readFileSync('player_logs.json', 'utf8');
                playerLogs = JSON.parse(data) || {};
            } catch (err) {
                console.error('Error al leer player_logs.json en !discord:', err);
                room.sendAnnouncement(
                    "[Server] ❌ Error al procesar tu vinculación. Contacta a un admin.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            const playerKey = playerAuth[player.id];
            if (!playerLogs[playerKey]) {
                room.sendAnnouncement(
                    "[Server] ❌ No se encontraron tus datos. Reingresa al servidor.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            // Inicializar linked si no existe
            if (playerLogs[playerKey].linked === undefined) {
                playerLogs[playerKey].linked = false;
            }

            // Verificar si ya está vinculado
            if (playerLogs[playerKey].linked) {
                room.sendAnnouncement(
                    "[Server] ❌ Tu cuenta ya está vinculada a Discord.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            // Verificar si el código coincide
            const storedCode = playerLogs[playerKey].discord;
            if (!storedCode) {
                room.sendAnnouncement(
                    "[Server] ❌ No tienes un código de Discord asignado. Reingresa al servidor.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            if (inputCode !== storedCode) {
                room.sendAnnouncement(
                    "[Server] ❌ Código incorrecto. Verifica tu código de Discord.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            // Vincular la cuenta
            playerLogs[playerKey].linked = true;

            try {
                fs.writeFileSync('player_logs.json', JSON.stringify(playerLogs, null, 2));
                room.sendAnnouncement(
                    `[Server] ✅ ¡${player.name}, has vinculado tu cuenta con Discord exitosamente!`,
                    player.id,
                    0x00FF00,
                    "small",
                    2
                );
            } catch (writeErr) {
                console.error('Error al guardar player_logs.json en !discord:', writeErr);
                room.sendAnnouncement(
                    "[Server] ❌ Error al guardar tu vinculación. Intenta de nuevo.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
            }
        } catch (err) {
            console.error("[ERROR] Fallo al procesar !discord:", err.message);
            room.sendAnnouncement(
                "[Server] ❌ Error al procesar el comando. Contacta al admin.",
                player.id,
                0xFF0000,
                "small",
                2
            );
        }
        return false;
    }

    // Verificar clave de administrador
    if (adminKeys[player.id] && message === adminKeys[player.id]) {
        try {
            let adminList = { admins: [] };
            try {
                const adminData = fs.readFileSync(path.join('extreme', 'admin.json'), 'utf8');
                adminList = JSON.parse(adminData) || { admins: [] };
            } catch (err) {
                console.error("[ERROR] Fallo al leer admin.json:", err.message);
                room.sendAnnouncement(
                    "[Server] ❌ Error al verificar permisos. Contacta al soporte.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }
    
            // Cambiar player.auth por playerAuth[player.id]
            if (playerAuth[player.id] && adminList.admins.includes(playerAuth[player.id])) {
                if (!player.admin) {
                    room.setPlayerAdmin(player.id, true);
                    room.sendAnnouncement(
                        `[Server] 🛡️ ${player.name} ha activado sus permisos de administrador.`,
                        null,
                        0xFFD700,
                        "small",
                        2
                    );
                    console.log(`[DEBUG] ${player.name} (Auth: ${playerAuth[player.id]}) activó admin con clave: ${adminKeys[player.id]}`);
                    delete adminKeys[player.id];
                } else {
                    room.sendAnnouncement(
                        "[Server] ✅ Ya eres administrador.",
                        player.id,
                        0xA6D9F7,
                        "small",
                        2
                    );
                }
            } else {
                room.sendAnnouncement(
                    "[Server] ❌ No tienes permiso para usar esta clave.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
            }
            return false;
        } catch (err) {
            console.error("[ERROR] Fallo al procesar clave de admin:", err.message);
            room.sendAnnouncement(
                "[Server] ❌ Error al procesar la clave. Contacta al soporte.",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }
    }

    // Verificar límite de mensajes para no admins
    if (!player.admin) {
        const now = Date.now();
        let playerChatInfo = chatCooldown.get(player.id) || { lastMessageTime: 0, messageCount: 0 };

        // Si pasó el tiempo de la ventana, reiniciar el contador
        if (now - playerChatInfo.lastMessageTime > TIME_WINDOW) {
            playerChatInfo = { lastMessageTime: now, messageCount: 1 };
        } else {
            playerChatInfo.messageCount++;
        }

        // Actualizar el mapa
        chatCooldown.set(player.id, playerChatInfo);

        // Bloquear si excedió el límite
        if (playerChatInfo.messageCount > MESSAGE_LIMIT) {
            room.sendAnnouncement(
                "[Server] ❌ Demasiados mensajes seguidos. Esperá un segundo.",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false; // Bloquear el mensaje
        }
    }
    if (message.toLowerCase().startsWith("!llamaradmin")) {
        const razon = message.slice("!llamaradmin".length).trim() || "No especificada";
        const claveJugador = playerAuth[player.id];
    
        // Verificar si el jugador tiene un auth válido
        if (!claveJugador) {
            room.sendAnnouncement(
                "[Server] ❌ Error: No se pudo identificar tu cuenta. Reingresa al servidor.",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }
    
        // Verificar si el jugador ya votó
        if (votosLlamadaAdmin[claveJugador]) {
            room.sendAnnouncement(
                "[Server] ❌ Ya has votado para llamar a un admin.",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }
    
        // Si no hay llamada activa, iniciar una nueva
        if (!llamadaActiva) {
            llamadaActiva = {
                razonInicial: razon,
                inicio: Date.now()
            };
            votosLlamadaAdmin[claveJugador] = { nombre: player.name, razon };
            temporizadorLlamadaAdmin = setTimeout(reiniciarLlamadaAdmin, TIEMPO_LLAMADA_ADMIN_MS);
        } else {
            // Sumar voto a la llamada activa
            votosLlamadaAdmin[claveJugador] = { nombre: player.name, razon };
        }
    
        // Contar votos
        const conteoVotos = Object.keys(votosLlamadaAdmin).length;
    
        // Anunciar el voto
        room.sendAnnouncement(
            `[Server] 🗳️ ${player.name} ha votado para llamar a un admin. Votos: ${conteoVotos}/${UMBRAL_LLAMADA_ADMIN}`,
            null,
            0xFFA500,
            "small",
            2
        );
    
        // Verificar si se alcanzó el umbral
        if (conteoVotos >= UMBRAL_LLAMADA_ADMIN) {
            const votantes = Object.values(votosLlamadaAdmin).map(v => v.nombre);
            const otrasRazones = Object.values(votosLlamadaAdmin)
                .map(v => v.razon)
                .filter(r => r !== llamadaActiva.razonInicial && r !== "No especificada");
    
            // Enviar webhook
            enviarWebhookLlamadaAdmin(llamadaActiva.razonInicial, votantes, otrasRazones);
    
            // Reiniciar la llamada
            reiniciarLlamadaAdmin();
        }
    
        return false;
    }
    if (message.toLowerCase().startsWith("!pos ")) {
        const args = message.toLowerCase().split(" ");
        const posicion = args[1];

        const posicionesValidas = ["defensa", "delantero", "mediocampista", "gk", "poli"];
        if (!posicion || !posicionesValidas.includes(posicion)) {
            room.sendAnnouncement(
                "[Server] ❌ Uso: !pos <defensa|delantero|mediocampista|gk|poli>",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }

        try {
            let playerLogs = {};
            try {
                const data = fs.readFileSync('player_logs.json', 'utf8');
                playerLogs = JSON.parse(data);
            } catch (err) {
                console.error('Error al leer player_logs.json en !pos:', err);
                room.sendAnnouncement(
                    "[Server] ❌ Error al procesar tu posición. Contacta a un admin.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            const playerKey = playerAuth[player.id];
            if (!playerLogs[playerKey]) {
                room.sendAnnouncement(
                    "[Server] ❌ No se encontraron tus datos. Reingresa al servidor.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            playerLogs[playerKey].position = posicion;
            try {
                fs.writeFileSync('player_logs.json', JSON.stringify(playerLogs, null, 2));
                room.sendAnnouncement(
                    `[Server] ✅ ¡${player.name}, has establecido tu posición como ${posicion}!`,
                    player.id,
                    0x00FF00,
                    "small",
                    2
                );
            } catch (writeErr) {
                console.error('Error al guardar player_logs.json en !pos:', writeErr);
                room.sendAnnouncement(
                    "[Server] ❌ Error al guardar tu posición. Intenta de nuevo.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
            }
        } catch (err) {
            console.error("[ERROR] Fallo al procesar !pos:", err.message);
            room.sendAnnouncement(
                "[Server] ❌ Error al procesar el comando. Contacta al admin.",
                player.id,
                0xFF0000,
                "small",
                2
            );
        }
        return false;
    }
    // Comando !canjear
    if (message.toLowerCase().startsWith("!canjear ")) {
        const args = message.split(" ");
        const code = args[1]?.toLowerCase();

        console.log(`[DEBUG] Intentando canjear código: "${code}" para ${player.name}`);

        if (!code) {
            room.sendAnnouncement(
                "[Server] ❌ Uso: !canjear <código>",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }

        try {
            // Leer codes.json de forma síncrona
            let codesData;
            try {
                const data = fs.readFileSync('extreme/codes.json', 'utf8');
                codesData = JSON.parse(data) || { codes: {} };
            } catch (err) {
                if (err.code === 'ENOENT') {
                    codesData = { codes: {} };
                    fs.writeFileSync('extreme/codes.json', JSON.stringify(codesData, null, 2));

                } else {
                    throw err;
                }
            }

            // Leer player_logs.json de forma síncrona
            let playerLogs;
            try {
                const data = fs.readFileSync('player_logs.json', 'utf8');
                playerLogs = JSON.parse(data) || {};
            } catch (err) {
                if (err.code === 'ENOENT') {
                    playerLogs = {};
                    fs.writeFileSync('player_logs.json', JSON.stringify(playerLogs, null, 2));
                } else {
                    throw err;
                }
            }

            const playerKey = playerAuth[player.id];
            if (!playerLogs[playerKey]) {
                room.sendAnnouncement(
                    "[Server] ❌ No se encontraron tus datos. Reingresa al servidor.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            const codeData = codesData.codes[code];
            if (!codeData || !codeData.active) {
                room.sendAnnouncement(
                    "[Server] ❌ Código inválido o expirado.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            playerLogs[playerKey].redeemedCodes = playerLogs[playerKey].redeemedCodes || [];
            if (playerLogs[playerKey].redeemedCodes.includes(code)) {
                room.sendAnnouncement(
                    "[Server] ❌ Ya canjeaste este código.",
                    player.id,
                    0xFF0000,
                    "small",
                    2
                );
                return false;
            }

            

            // Canjear el código
            playerLogs[playerKey].points = (playerLogs[playerKey].points || 0) + codeData.reward;
            playerLogs[playerKey].redeemedCodes.push(code);

            // Guardar player_logs.json de forma síncrona
            fs.writeFileSync('player_logs.json', JSON.stringify(playerLogs, null, 2));
            console.log(`[DEBUG] ${player.name} canjeó "${code}" y recibió ${codeData.reward} monedas.`);

            room.sendAnnouncement(
                `[Server] ✅ ¡Código ${code} canjeado! Recibiste ${codeData.reward} monedas. Total: ${playerLogs[playerKey].points}`,
                player.id,
                0x00FF00,
                "small",
                2
            );
        } catch (err) {
            console.error("[ERROR] Fallo al procesar !canjear:", err.message);
            room.sendAnnouncement(
                "[Server] ❌ Error al canjear el código. Contacta al admin.",
                player.id,
                0xFF0000,
                "small",
                2
            );
        }
        return false; // Anula el mensaje original
    }

    if (message.startsWith("!team")) {
        manejarComandoEquipo(player);
        return false;
    }
    if (message.startsWith('!guiadt')) {
        manejarComandoGuiaDT(player);
        return false;
    }
    if (message.toLowerCase() === "!reydt") {
        let playerLogs = {};
        try {
            const data = fs.readFileSync('player_logs.json', 'utf8');
            playerLogs = JSON.parse(data);
        } catch (err) {
            console.error('Error al leer player_logs.json:', err);
            room.sendAnnouncement("[Server] ❌ Error al leer datos.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        let maxDTVictories = 0;
        let topDTPlayer = null;
        for (const [_, log] of Object.entries(playerLogs)) {
            const victories = log.victorydt || 0;
            if (victories > maxDTVictories) {
                maxDTVictories = victories;
                topDTPlayer = log;
            }
        }
    
        const mensaje = maxDTVictories > 0
            ? `[Server] 🏅 Rey DT: ${topDTPlayer.name} con ${maxDTVictories} victorias`
            : "[Server] 😔 No hay DTs con victorias aún.";
        room.sendAnnouncement(mensaje, player.id, 0xFFD700, "small", 2);
        return false;
    }
    
    if (message.toLowerCase() === "!points") {
        let playerLogs = {};
        try {
            const data = fs.readFileSync('player_logs.json', 'utf8');
            playerLogs = JSON.parse(data);
        } catch (err) {
            console.error('Error al leer player_logs.json en !points:', err);
            room.sendAnnouncement(
                "[Server] ❌ Error al leer tus datos. Contacta a un admin.",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }

        const playerKey = playerAuth[player.id];
        if (!playerLogs[playerKey]) {
            room.sendAnnouncement(
                "[Server] ❌ No se encontraron tus datos. Reingresa al servidor.",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }

        const playerPoints = playerLogs[playerKey].points || 0;
        room.sendAnnouncement(
            `[Server] 💰 ${player.name}, tenés ${playerPoints} puntos.`,
            player.id,
            0xA6D9F7,
            "small",
            2
        );
        return false;
    }

    if (message.toLowerCase() === "!clearbans") {
        if (player.admin) {
            room.clearBans();
            room.sendAnnouncement(
                "✅ Se han limpiado todos los bans de la sala.",
                null,
                0x00FF00,
                "small",
                2
            );
        } else {
            room.sendAnnouncement(
                "❌ Este comando solo está permitido para administradores.",
                player.id,
                0xFFA500,
                "small",
                0
            );
        }
        return false;
    }

    if (message.startsWith("!rrball")) {
        if (!player.admin) {
            room.sendAnnouncement("[Error] ❌ Solo los administradores pueden usar este comando.", player.id, 0xFF0000, "small", 2);
            return false;
        }

        // Reiniciar la posición de la pelota al centro (0, 0)
        const ballProps = room.getDiscProperties(0); // Obtener propiedades actuales de la pelota (disco ID 0)
        if (ballProps) {
            room.setDiscProperties(0, {
                x: 0, // Centro en X
                y: 0, // Centro en Y
                xspeed: 0, // Velocidad X a 0
                yspeed: 0  // Velocidad Y a 0
            });
            room.sendAnnouncement("[Server] ⚽ ¡La pelota ha sido reiniciada al centro (0, 0) por un administrador!", null, 0x00FF00, "small", 2);
        } else {
            room.sendAnnouncement("[Server] ⚠️ Error al reiniciar la pelota. Contactá al admin.", player.id, 0xFF0000, "small", 2);
        }
        return false;
    }
    if (message.startsWith("!bl ")) {
        if (player.admin) {
            var blackip = message.slice("!bl ".length);
            const blacklistData = getBlacklistData();

            if (!blacklistData.blacklisted_ips.includes(blackip)) {
                blacklistData.blacklisted_ips.push(blackip);
                updateBlacklistData(blacklistData);

                room.sendAnnouncement(
                    "Se ha actualizado la blacklist. 👮",
                    player.id,
                    0xFFA500,
                    "small",
                    2
                );

                sendBlacklistNotification(blackip, player.name);
            } else {
                room.sendAnnouncement(
                    "Esa IP ya está en la blacklist.",
                    player.id,
                    0xFFA500,
                    "small",
                    2
                );
            }
        } else {
            room.sendAnnouncement(
                "❌ Este comando solo está permitido para administradores.",
                player.id,
                0xFFA500,
                "small",
                0
            );
        }
        return false;
    }

    // Nuevo comando !tienda
    // Comando !tienda
    if (message.toLowerCase() === "!tienda") {
        const tiendaMsg = "[Server] 🏪 TIENDA:\n" +
                         "• Powershot (powershot) - 130.500 puntos\n" +
                         "• Highlighted Message (highlighted) - 2500 puntos\n" +
                         "• Master Control (mastercontrol) - 25.500 puntos\n" +
                         "• Master Space (masterspace) - 30.400 puntos\n" +
                         "• Abyss Cannon (abysscannon) -  600.000 puntos\n" +
                         "• Void Dash (voiddash) -  300.000 puntos\n" +
                         "• Phantom Strike (phantomstrike) - 170.000 puntos\n" +
                         "• Celestial Slash (celestial) - 100.000 puntos\n" +
                         "• Supernova (supernova) - 800.000 puntos\n" +
                         "• Mejora I (upgrade1) - 16.500 puntos (x1.5 en goles, asistencias y kicks)\n" +
                         "• Mejora II (upgrade2) - 30.000 puntos (x2 en goles, asistencias y kicks)\n" +
                         "• Mejora III (upgrade3) - 90.000 puntos (x3 en goles, asistencias y kicks)\n" +
                         "Usa !comprar <item> para adquirirlo.";
        room.sendAnnouncement(tiendaMsg, player.id, 0xFFD700, "small", 2);
        return false;
    }

    if (message.toLowerCase().startsWith("!equip ")) {
        const habilidad = message.toLowerCase().split(" ")[1];
        let playerLogs = {};
        try {
            const data = fs.readFileSync('player_logs.json', 'utf8');
            playerLogs = JSON.parse(data);
        } catch (err) {
            console.error('Error al leer player_logs.json en !equip:', err);
            room.sendAnnouncement("[Server] ❌ Error al leer tus datos.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        const playerKey = playerAuth[player.id];
        if (!playerLogs[playerKey]) {
            room.sendAnnouncement("[Server] ❌ No se encontraron tus datos. Reingresa al servidor.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        const habilidadesDisponibles = {
            "powershot": playerLogs[playerKey].powershot,
            "highlighted": playerLogs[playerKey].highlighted,
            "mastercontrol": playerLogs[playerKey].mastercontrol,
            "masterspace": playerLogs[playerKey].masterspace,
            "ultrapowershot": playerLogs[playerKey].ultrapowershot,
            "phantomstrike": playerLogs[playerKey].phantomstrike,
            "voiddash": playerLogs[playerKey].voiddash,
            "supernova": playerLogs[playerKey].supernova,
            "celestial": playerLogs[playerKey].celestial
        };
    
        if (!habilidadesDisponibles[habilidad]) {
            room.sendAnnouncement(
                "[Server] ❌ No tenés la habilidad " + habilidad + " o no existe. Usa !tienda para verlas.",
                player.id,
                0xFF0000,
                "small",
                2
            );
            return false;
        }
    
        if (habilidad === "powershot" && (
            playerLogs[playerKey].equipped.masterspace ||
            playerLogs[playerKey].equipped.ultrapowershot ||
            playerLogs[playerKey].equipped.phantomstrike ||
            playerLogs[playerKey].equipped.gravityshift ||
            playerLogs[playerKey].equipped.supernova ||
            playerLogs[playerKey].equipped.celestial
        )) {
            room.sendAnnouncement("[Server] ❌ Powershot es incompatible con Master Space, Abyss Cannon, Phantom Strike, Gravity Shift, Supernova y Celestial Slash.", player.id, 0xFF0000, "small", 2);
            return false;
        }
        if (habilidad === "masterspace" && (
            playerLogs[playerKey].equipped.powershot ||
            playerLogs[playerKey].equipped.ultrapowershot ||
            playerLogs[playerKey].equipped.phantomstrike ||
            playerLogs[playerKey].equipped.gravityshift ||
            playerLogs[playerKey].equipped.supernova ||
            playerLogs[playerKey].equipped.celestial
        )) {
            room.sendAnnouncement("[Server] ❌ Master Space es incompatible con Powershot, Abyss Cannon, Phantom Strike, Gravity Shift, Supernova y Celestial Slash.", player.id, 0xFF0000, "small", 2);
            return false;
        }
        if (habilidad === "ultrapowershot" && (
            playerLogs[playerKey].equipped.powershot ||
            playerLogs[playerKey].equipped.masterspace ||
            playerLogs[playerKey].equipped.phantomstrike ||
            playerLogs[playerKey].equipped.gravityshift ||
            playerLogs[playerKey].equipped.supernova ||
            playerLogs[playerKey].equipped.celestial
        )) {
            room.sendAnnouncement("[Server] ❌ Abyss Cannon es incompatible con Powershot, Master Space, Phantom Strike, Gravity Shift, Supernova y Celestial Slash.", player.id, 0xFF0000, "small", 2);
            return false;
        }
        if (habilidad === "phantomstrike" && (
            playerLogs[playerKey].equipped.powershot ||
            playerLogs[playerKey].equipped.masterspace ||
            playerLogs[playerKey].equipped.ultrapowershot ||
            playerLogs[playerKey].equipped.gravityshift ||
            playerLogs[playerKey].equipped.supernova ||
            playerLogs[playerKey].equipped.celestial
        )) {
            room.sendAnnouncement("[Server] ❌ Phantom Strike es incompatible con Powershot, Master Space, Abyss Cannon, Gravity Shift, Supernova y Celestial Slash.", player.id, 0xFF0000, "small", 2);
            return false;
        }
        if (habilidad === "gravityshift" && (
            playerLogs[playerKey].equipped.powershot ||
            playerLogs[playerKey].equipped.masterspace ||
            playerLogs[playerKey].equipped.ultrapowershot ||
            playerLogs[playerKey].equipped.phantomstrike ||
            playerLogs[playerKey].equipped.supernova ||
            playerLogs[playerKey].equipped.celestial
        )) {
            room.sendAnnouncement("[Server] ❌ Gravity Shift es incompatible con Powershot, Master Space, Abyss Cannon, Phantom Strike, Supernova y Celestial Slash.", player.id, 0xFF0000, "small", 2);
            return false;
        }
        if (habilidad === "supernova" && (
            playerLogs[playerKey].equipped.powershot ||
            playerLogs[playerKey].equipped.masterspace ||
            playerLogs[playerKey].equipped.ultrapowershot ||
            playerLogs[playerKey].equipped.phantomstrike ||
            playerLogs[playerKey].equipped.gravityshift ||
            playerLogs[playerKey].equipped.celestial
        )) {
            room.sendAnnouncement("[Server] ❌ Supernova es incompatible con Powershot, Master Space, Abyss Cannon, Phantom Strike, Gravity Shift y Celestial Slash.", player.id, 0xFF0000, "small", 2);
            return false;
        }
        if (habilidad === "celestial" && (
            playerLogs[playerKey].equipped.powershot ||
            playerLogs[playerKey].equipped.masterspace ||
            playerLogs[playerKey].equipped.ultrapowershot ||
            playerLogs[playerKey].equipped.phantomstrike ||
            playerLogs[playerKey].equipped.gravityshift ||
            playerLogs[playerKey].equipped.supernova
        )) {
            room.sendAnnouncement("[Server] ❌ Celestial Slash es incompatible con Powershot, Master Space, Abyss Cannon, Phantom Strike, Gravity Shift y Supernova.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        playerLogs[playerKey].equipped[habilidad] = true;
        try {
            fs.writeFileSync('player_logs.json', JSON.stringify(playerLogs, null, 2));
            room.sendAnnouncement("[Server] ✅ Has equipado " + habilidad + " con éxito.", player.id, 0x00FF00, "small", 2);
        } catch (writeErr) {
            console.error('Error al guardar JSON en !equip:', writeErr);
            room.sendAnnouncement("[Server] ❌ Error al equipar la habilidad. Intenta de nuevo.", player.id, 0xFF0000, "small", 2);
        }
        return false;
    }
    
    // !unequip
    if (message.toLowerCase().startsWith("!unequip ")) {
        const habilidad = message.toLowerCase().split(" ")[1];
        let playerLogs = {};
        try {
            const data = fs.readFileSync('player_logs.json', 'utf8');
            playerLogs = JSON.parse(data);
        } catch (err) {
            console.error('Error al leer player_logs.json en !unequip:', err);
            room.sendAnnouncement("[Server] ❌ Error al leer tus datos.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        const playerKey = playerAuth[player.id];
        if (!playerLogs[playerKey]) {
            room.sendAnnouncement("[Server] ❌ No se encontraron tus datos. Reingresa al servidor.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        const habilidadesDisponibles = {
            "powershot": playerLogs[playerKey].powershot,
            "highlighted": playerLogs[playerKey].highlighted,
            "mastercontrol": playerLogs[playerKey].mastercontrol,
            "masterspace": playerLogs[playerKey].masterspace,
            "ultrapowershot": playerLogs[playerKey].ultrapowershot,
            "phantomstrike": playerLogs[playerKey].phantomstrike,
            "voiddash": playerLogs[playerKey].voiddash,
            "supernova": playerLogs[playerKey].supernova,
            "celestial": playerLogs[playerKey].celestial
        };
    
        if (!habilidadesDisponibles[habilidad]) {
            room.sendAnnouncement("[Server] ❌ No tenés la habilidad " + habilidad + " o no existe.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        if (!playerLogs[playerKey].equipped[habilidad]) {
            room.sendAnnouncement("[Server] ❌ No tenés " + habilidad + " equipado.", player.id, 0xFF0000, "small", 2);
            return false;
        }
    
        delete playerLogs[playerKey].equipped[habilidad];
        try {
            fs.writeFileSync('player_logs.json', JSON.stringify(playerLogs, null, 2));
            room.sendAnnouncement("[Server] ✅ Has desequipado " + habilidad + " con éxito.", player.id, 0x00FF00, "small", 2);
        } catch (writeErr) {
            console.error('Error al guardar JSON en !unequip:', writeErr);
            room.sendAnnouncement("[Server] ❌ Error al desequipar la habilidad. Intenta de nuevo.", player.id, 0xFF0000, "small", 2);
        }
        return false;
    }
    if (message.toLowerCase().startsWith("!comprar ")) {
    const item = message.toLowerCase().split(" ")[1];
    const shopItems = {
        "powershot": { cost: 130500, key: "powershot", name: "Powershot" },
        "highlighted": { cost: 7500, key: "highlighted", name: "Highlighted Message" },
        "mastercontrol": { cost: 25500, key: "mastercontrol", name: "Master Control" },
        "masterspace": { cost: 30400, key: "masterspace", name: "Master Space" },
        "abysscannon": { cost: 600000, key: "ultrapowershot", name: "Abyss Cannon" },
        "phantomstrike": { cost: 170000, key: "phantomstrike", name: "Phantom Strike" },
        "voiddash": { cost: 300000, key: "voiddash", name: "Void Dash" },
        "supernova": { cost: 800000, key: "supernova", name: "Supernova" },
        "celestial": { cost: 100000, key: "celestial", name: "Celestial Slash" },
        "upgrade1": { cost: 16500, key: "upgrade1", name: "Mejora I (x1.5)", requires: null },
        "upgrade2": { cost: 30000, key: "upgrade2", name: "Mejora II (x2)", requires: "upgrade1" },
        "upgrade3": { cost: 90000, key: "upgrade3", name: "Mejora III (x3)", requires: "upgrade2" }
    };
    if (!shopItems[item]) {
        room.sendAnnouncement("[Server] ❌ Ítem no válido. Usa !tienda para ver los ítems disponibles.", player.id, 0xFF0000, "small", 2);
        return false;
    }

    let playerLogs = {};
    try {
        const data = fs.readFileSync('player_logs.json', 'utf8');
        playerLogs = JSON.parse(data);
    } catch (err) {
        console.error('Error al leer player_logs.json:', err);
        room.sendAnnouncement("[Server] ❌ Error al leer tus datos.", player.id, 0xFF0000, "small", 2);
        return false;
    }

    const playerKey = playerAuth[player.id];
    if (!playerLogs[playerKey]) {
        room.sendAnnouncement("[Server] ❌ No se encontraron tus datos. Reingresa al servidor.", player.id, 0xFF0000, "small", 2);
        return false;
    }

    // Verificar si la cuenta está vinculada
    if (playerLogs[playerKey].linked !== true) {
        room.sendAnnouncement(
            "[Server] ❌ Debes vincular tu cuenta con Discord para comprar. Usa !discord <código>.",
            player.id,
            0xFF0000,
            "small",
            2
        );
        return false;
    }

    const playerPoints = playerLogs[playerKey].points || 0;
    const hasItem = playerLogs[playerKey][shopItems[item].key] || false;

    if (hasItem) {
        room.sendAnnouncement(`[Server] ❌ Ya tienes ${shopItems[item].name}.`, player.id, 0xFF0000, "small", 2);
        return false;
    }

    if (shopItems[item].requires && !playerLogs[playerKey][shopItems[item].requires]) {
        room.sendAnnouncement(`[Server] ❌ Debes comprar ${shopItems[shopItems[item].requires].name} primero.`, player.id, 0xFF0000, "small", 2);
        return false;
    }

    if (playerPoints < shopItems[item].cost) {
        room.sendAnnouncement(
            `[Server] ❌ No tienes suficientes puntos (necesitas ${shopItems[item].cost}, tienes ${playerPoints}).`,
            player.id,
            0xFF0000,
            "small",
            2
        );
        return false;
    }

    playerLogs[playerKey].points -= shopItems[item].cost;
    playerLogs[playerKey][shopItems[item].key] = true;

    try {
        fs.writeFileSync('player_logs.json', JSON.stringify(playerLogs, null, 2));
        room.sendAnnouncement(
            `[Server] ✅ ¡Has comprado ${shopItems[item].name} por ${shopItems[item].cost} puntos! Puntos restantes: ${playerLogs[playerKey].points}` +
            (item.startsWith("upgrade") ? "" : `\nUsa !equip ${item} para activarlo.`),
            player.id,
            0x00FF00,
            "small",
            2
        );
    } catch (writeErr) {
        console.error('Error al guardar JSON:', writeErr);
        room.sendAnnouncement("[Server] ❌ Error al procesar la compra. Intenta de nuevo.", player.id, 0xFF0000, "small", 2);
    }
    return false;
}
    

let msg = message.toLowerCase().trim();
if (msg === "!help") {
    let helpMessage = "[Server] 📜 Lista de comandos disponibles:\n";
    helpMessage += "!mercado - Ver valores de jugadores\n";
    helpMessage += "!listacolors - Lista de camisetas\n";
    helpMessage += "!colors [nombre] - Cambiar camiseta\n";
    helpMessage += "!economia - Estado económico\n";
    helpMessage += "!ids - ID de todos los jugadores\n";
    helpMessage += "!dt - Ser DT\n";
    helpMessage += "!s [ID] - Seleccionar jugador\n";
    helpMessage += "!meter [ID] - Meter jugador\n";
    helpMessage += "!cmb [ID1] [ID2] -Cambiar jugador\n";
    helpMessage += "!test - Comando de prueba\n";
    helpMessage += "!discord - Link del discord\n";
    helpMessage += "!team - Muestra tu equipo\n";
    helpMessage += "!tienda - Ver objetos disponibles\n";
    helpMessage += "!bb - kick\n";
    helpMessage += "!guiadt- para ver la guía para ser DT\n";
    helpMessage += "!reydt- para ver el DT mas exitoso\n";
    helpMessage += "!nv - kick\n";
    helpMessage += "!memide - ¿Cuanto te mide?\n";
    helpMessage += "!canjear <codigo> - Canjear un codigo por recompensa\n";
    if (mercadoActivo) {
        helpMessage += "!fichar [ID] - Fichar jugador\n";
        helpMessage += "!valor [ID] - Valor de jugador\n";
    }
    helpMessage += "!help - Muestra esta ayuda";
    room.sendAnnouncement(helpMessage, player.id, 0x00FF00, "small", 2);
    return false;
}

if (message === password) {
    if (adminList1.includes(player.name)) {
        room.setPlayerAdmin(player.id, true);
        return false;
    } else {
        return false;
    }
}
if (msg === "!mercado") {
    let jugadores = room.getPlayerList().filter(p => p.id !== 0);
    if (jugadores.length === 0) {
        room.sendAnnouncement("[Server] No hay jugadores en cancha.", player.id, 0xFF0000, "small", 2);
        return false;
    }

    let mercadoMsg = "📢 [Mercado de jugadores]\n";
    jugadores.forEach(j => {
        let valor = playerValues[j.id] || VALOR_BASE_JUGADOR;
        let equipo = playerTeam[j.id] ? `[${playerTeam[j.id].toUpperCase()}]` : "[SIN EQUIPO]";
        mercadoMsg += `👤 (ID: ${j.id}) ${j.name} ${equipo}: 💰 ${valor} monedas\n`;
    });

    room.sendAnnouncement(mercadoMsg, player.id, 0xFFD700, "small", 2);
    return false;
}



if (message.toLowerCase() === "!rr") {
    if (player.admin) {
        reiniciarJuego();
    } else {
        room.sendAnnouncement(
            "[Error] ❌ Solo los administradores pueden usar este comando.",
            player.id,
            0x842636,
            "small",
            2
        );
    }
    return false;
}

if (message.startsWith("!bb")) {
    room.kickPlayer(player.id, "Te saliste con !bb", false);
    return false;
}

if (message.startsWith("!nv")) {
    room.kickPlayer(player.id, "Te saliste con !nv", false);
    return false;
}

if (message.startsWith("!memide") ) {
    let medida = Math.floor(Math.random() * (35 - 3 + 1)) + 3; // Random entre 3 y 35
    room.sendAnnouncement(`📏 ${player.name}, te mide: ${medida} cm 😜`, null, 0xFFD700, "small", 1);
    return false;
}

if (message.startsWith("!info")) {
    var teamName = player.team === 1 ? 'rojo' : player.team === 2 ? 'azul' : 'espectador';
    var ping = player.ping;

    room.sendAnnouncement("[Server] \n 👕 Tu equipo es: " + teamName + "\n📶 Tu ping es: " + ping + " ms" + "\n⚽ Has marcado: " + (playerData ? playerData.goals : 0) + " goles" + "\n👟 Has asistido: " + (playerData ? playerData.assists : 0) + " asistencias", player.id, 0xA6D9F7, "small", 0);
    return false;
}

if (message.startsWith("!discord")) {
    room.sendAnnouncement('Discord: https://discord.gg/xU4ZsFNQRV', player.id, 0xA6D9F7, "small", 1);
    return false;
}
if (message.startsWith("!ds")) {
    room.sendAnnouncement('Discord: https://discord.gg/xU4ZsFNQRV', player.id, 0x06D6A0, "small", 1);
    return false;
}

if (message.startsWith('!listacolors')) {
    fs.readFile('extreme/colors.json', 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            room.sendAnnouncement("[Error] No se pudo cargar la lista de camisetas.", null, 0x842636, "small", 2);
            return false;
        }

        const ligas = JSON.parse(data).ligas;
        let anuncio = "[Server] Lista de camisetas por liga:\n";

        for (const [liga, equipos] of Object.entries(ligas)) {
            const nombresEquipos = equipos.map(e => e.nombre).join(", ");
            anuncio += `${liga}: ${nombresEquipos}\n`;
        }

        room.sendAnnouncement(anuncio, player.id, 0xA6D9F7, "small", 2);
    });
    return false;
}



if (message.startsWith("!colors ")) {
    if (!player.admin) {
        room.sendAnnouncement("[Error] ❌ Solo los administradores pueden usar este comando.", player.id, 0x842636, "small", 2);
        return false;
    }

    const args = message.split(' ');
    const camisetaInput = args.slice(1, -1).join(""); // Une todo excepto el último argumento (equipo)
    const equipo = parseInt(args[args.length - 1]); // Último argumento es el equipo

    if (!camisetaInput || (equipo !== 1 && equipo !== 2)) {
        room.sendAnnouncement("[Server] Uso: !colors <camiseta> <equipo> (1 para rojo, 2 para azul)", player.id, 0xA6D9F7, "small", 2);
        return false;
    }

    fs.readFile('extreme/colors.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            room.sendAnnouncement("[Error] No se pudo cargar las camisetas.", player.id, 0x842636, "small", 2);
            return false;
        }

        const ligas = JSON.parse(data).ligas;
        let foundCamiseta = null;
        let ligaOrigen = null;

        // Buscar coincidencia parcial o exacta (sin importar mayúsculas/minúsculas)
        for (const [liga, equipos] of Object.entries(ligas)) {
            const camisetaEncontrada = equipos.find(c => 
                c.nombre.toLowerCase().includes(camisetaInput.toLowerCase())
            );
            if (camisetaEncontrada) {
                foundCamiseta = camisetaEncontrada;
                ligaOrigen = liga;
                break;
            }
        }

        if (!foundCamiseta) {
            room.sendAnnouncement("[Server] Camiseta no encontrada.", player.id, 0xA6D9F7, "small", 2);
            return false;
        }

        // Chequear si ya está en uso por el mismo equipo
        if (equipo === 1 && camisetasUsadas[1] === foundCamiseta.nombre) {
            room.sendAnnouncement("[Server] La camiseta ya está en uso por el equipo rojo!", player.id, 0xA6D9F7, "small", 2);
            return false;
        }
        if (equipo === 2 && camisetasUsadas[2] === foundCamiseta.nombre) {
            room.sendAnnouncement("[Server] La camiseta ya está en uso por el equipo azul!", player.id, 0xA6D9F7, "small", 2);
            return false;
        }
        // Chequear si está en uso por el equipo contrario
        if (equipo === 1 && camisetasUsadas[2] === foundCamiseta.nombre) {
            room.sendAnnouncement("[Server] La camiseta ya está en uso por el equipo azul!", player.id, 0xA6D9F7, "small", 2);
            return false;
        }
        if (equipo === 2 && camisetasUsadas[1] === foundCamiseta.nombre) {
            room.sendAnnouncement("[Server] La camiseta ya está en uso por el equipo rojo!", player.id, 0xA6D9F7, "small", 2);
            return false;
        }

        // Chequear camisetas parecidas
        const camisetaOpuesta = equipo === 1 ? camisetasUsadas[2] : camisetasUsadas[1];
        if (camisetaOpuesta) {
            let opuestaEncontrada = null;
            for (const [liga, equipos] of Object.entries(ligas)) {
                const encontrada = equipos.find(c => c.nombre === camisetaOpuesta);
                if (encontrada) {
                    opuestaEncontrada = encontrada;
                    break;
                }
            }

            if (opuestaEncontrada && foundCamiseta.parecidos.includes(opuestaEncontrada.nombre)) {
                room.sendAnnouncement(`[Server] ¡Error! La camiseta ${foundCamiseta.nombre} es muy parecida a ${camisetaOpuesta} del equipo contrario.`, player.id, 0x842636, "small", 2);
                return false;
            }
        }

        // Asegurar que los colores tengan el prefijo 0x
        const colores = [
            ensureHexPrefix(foundCamiseta.color1),
            ensureHexPrefix(foundCamiseta.color2),
            ensureHexPrefix(foundCamiseta.color3)
        ];
        const numberColor = ensureHexPrefix(foundCamiseta.numberColor);

        // Aplicar la camiseta
        room.setTeamColors(equipo, foundCamiseta.angulo, numberColor, colores);
        room.sendAnnouncement(`[Server] Camisetas cambiadas para el equipo ${equipo === 1 ? 'rojo' : 'azul'}: ${foundCamiseta.nombre}.`, null, 0xFFEFBD, "small", 2);
        camisetasUsadas[equipo] = foundCamiseta.nombre;
    });
    return false;
}

if (message === "!economia") {
    mostrarEstadoEconomico();
    return false;
} else if (message === "!ids") {
    mostrarJugadoresEquipos(player.id);
    return false;
} else if (message.startsWith('!dt')) {
    manejarComandoDT(player);
    return false;
} else if (message.startsWith("!s ")) {
    manejarComandoSeleccionar(player, message);
    return false;
} else if (message.startsWith("!meter ")) {
    manejarComandoMeter(player, message);
    return false;
} else if (message.startsWith('!cmb ')) {
    manejarComandoCambio(player, message);
    return false;
} else if (message === "!test") {
    manejarComandoTest(player);
    return false;
}

if (mercadoActivo) {
    if (message.startsWith('!fichar ')) {
        const jugadorId = parseInt(message.split(' ')[1]);
        if (isNaN(jugadorId)) {
            room.sendAnnouncement("[Error] ❌ ID inválido. Ejemplo: !fichar 5", player.id, 0x842636, "small", 2);
            return false;
        }
        procesarFichaje(player.id, jugadorId);
    }

    if (message.startsWith('!valor ')) {
        const jugadorId = parseInt(message.split(' ')[1]);
        if (isNaN(jugadorId)) {
            room.sendAnnouncement("[Error] ❌ Usa: !valor <ID>", player.id, 0x842636, "small", 2);
            return false;
        }
        mostrarValorJugador(player, jugadorId);
    }
}

if (player.team === 1) {
    teamPrefix = "🔴";
} else if (player.team === 2) {
    teamPrefix = "🔵";
} else {
    teamPrefix = "🔰";
}
if (player.admin && player.team === 1) {
    teamPrefix = "👮‍♂️.🔴";
} else if (player.admin && player.team === 2) {
    teamPrefix = "👮‍♂️.🔵";
} else if (player.admin && player.team === 0) {
    teamPrefix = "👮‍♂️.💤";
}
if (adminList1.includes(player.name) && player.admin && player.team === 1) {
    teamPrefix = "👨‍💼.🔴";
} else if (adminList1.includes(player.name) && player.admin && player.team === 2) {
    teamPrefix = "👨‍💼.🔵";
} else if (adminList1.includes(player.name) && player.admin && player.team === 0) {
    teamPrefix = "👨‍💼.💤";
}

// Leer player_logs.json para verificar highlighted y posición
// Leer player_logs.json para verificar highlighted, posición y encontrar al DT con más victorias

const playerKey = playerAuth[player.id];
const hasHighlighted = playerLogs[playerKey]?.highlighted ?? false;
const posicion = playerLogs[playerKey]?.position || "";

// NUEVO: Encontrar al jugador con más victorias como DT
let maxDTVictories = 0;
let topDTPlayerKey = null;
for (const [key, log] of Object.entries(playerLogs)) {
    const victories = log.victorydt || 0; // ← CORREGIDO ACÁ
    if (victories > maxDTVictories) {
        maxDTVictories = victories;
        topDTPlayerKey = key;
    }
}

// Verificar si el jugador actual es el Rey DT (y tiene al menos 1 victoria)
const isTopDT = playerKey === topDTPlayerKey && maxDTVictories > 0;

let posicionEmoji = "";
switch (posicion) {
    case "defensa":
        posicionEmoji = "🛡️";
        break;
    case "delantero":
        posicionEmoji = "⚽";
        break;
    case "mediocampista":
        posicionEmoji = "🎮";
        break;
    case "gk":
        posicionEmoji = "🧤";
        break;
    case "poli":
        posicionEmoji = "🌟";
        break;
    default:
        posicionEmoji = "";
}

// NUEVO: Definir el prefijo para el Rey DT
let topDTPrefix = "";
if (isTopDT) {
    topDTPrefix = "🏅";
    // Alternativa: topDTPrefix = "[ReyDT] ";
}

// Colores del chat en un objeto
const chatColors = {
    default: 0xFFFFFF,
    team1: 0xF23B3C,
    team2: 0x5689E5,
    spectator: 0xFFFC31,
    admin: 0xFFDA9E,
    highlighted: 0xD282A6,
    rhyno: 0xFF8016
};

// Determinar el color del chat
// Determinar el color del chat
const chatColor = isTopDT
    ? 0xFFBF00 // Amber → dorado con ese toque naranja que buscás
    : player.admin && player.name === "🦏 » Rhyno"
        ? chatColors.rhyno
        : player.admin
            ? chatColors.admin
            : DTS.includes(player.name)
                ? { 1: chatColors.team1, 2: chatColors.team2 }[player.team] ?? chatColors.spectator
                : hasHighlighted
                    ? chatColors.highlighted
                    : chatColors.default;

// Condiciones previas
const isDT = DTS.includes(player.name);
const isAdmin = player.name === Admin;
const hasData = !!playerData;
const style = isDT ? "bold" : "normal";

// Construir el mensaje incluyendo el emoji de posición y el prefijo de Rey DT
const finalMessage = hasData && (isDT || isAdmin)
    ? `${player.id}.${teamPrefix}${topDTPrefix}${posicionEmoji} ${player.name} | ${message}`
    : `[${player.id}] ${teamPrefix}${topDTPrefix}${posicionEmoji} ${player.name} | ${message}`;

// Enviar el mensaje
room.sendAnnouncement(finalMessage, null, chatColor, style, 1);

return false;

};



///JSON 

const blacklistFilePath = path.join(__dirname,'extreme', 'config','blacklist.json');

// Función para leer el JSON de blacklist
function getBlacklistData() {
  try {
    const data = fs.readFileSync(blacklistFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer blacklist.json:', err);
    return { blacklisted_ips: [] }; // Valor por defecto si hay error
  }
}

// Función para actualizar el JSON de blacklist
function updateBlacklistData(newData) {
  try {
    fs.writeFileSync(blacklistFilePath, JSON.stringify(newData, null, 2));
    return true;
  } catch (err) {
    console.error('Error al actualizar blacklist.json:', err);
    return false;
  }
}

// Función para leer player_logs.json
function readPlayerLogs() {
    const maxRetries = 3; // Reduje retries para menos espera
    const retryDelay = 500; // 0.5 segundos entre reintentos
    const filePath = 'player_logs.json';
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            if (!data.trim()) {
                console.warn(`[WARN] player_logs.json está vacío en intento ${attempt + 1}/${maxRetries}.`);
                throw new Error('Archivo vacío');
            }

            const parsedData = JSON.parse(data);
            if (!parsedData || typeof parsedData !== 'object') {
                console.warn(`[WARN] Datos inválidos en player_logs.json en intento ${attempt + 1}/${maxRetries}.`);
                throw new Error('JSON inválido');
            }

            console.log(`[DEBUG] player_logs.json leído exitosamente en intento ${attempt + 1}.`);
            return parsedData;
        } catch (err) {
            attempt++;
            if (err.code === 'ENOENT') {
                console.error(`[ERROR] player_logs.json no encontrado en intento ${attempt}/${maxRetries}.`);
            } else {
                console.error(`[ERROR] Fallo al leer player_logs.json en intento ${attempt}/${maxRetries}: ${err.message}`);
            }

            if (attempt < maxRetries) {
                console.log(`[INFO] Reintentando en ${retryDelay / 1000} segundos...`);
                // Simular espera síncrona (bloqueante, pero corta)
                const start = Date.now();
                while (Date.now() - start < retryDelay) {}
                continue;
            }

            // Último intento fallido, intentar con respaldo
            console.error(`[ERROR] No se pudo leer player_logs.json tras ${maxRetries} intentos. Intentando restaurar desde respaldo...`);
            try {
                const backupDir = path.join(__dirname, 'extreme', 'backup');
                const backupFiles = fs.readdirSync(backupDir);
                const validBackups = backupFiles
                    .filter(f => f.startsWith('player_logs_backup_') && f.endsWith('.json'))
                    .sort((a, b) => {
                        const timeA = new Date(a.replace('player_logs_backup_', '').replace('.json', '').replace(/-/g, ':'));
                        const timeB = new Date(b.replace('player_logs_backup_', '').replace('.json', '').replace(/-/g, ':'));
                        return timeB - timeA; // Más reciente primero
                    });

                if (validBackups.length === 0) {
                    console.error('[ERROR] No se encontraron respaldos válidos en backup/.');
                    return {};
                }

                const backupPath = path.join(backupDir, validBackups[0]);
                const backupData = fs.readFileSync(backupPath, 'utf8');
                if (!backupData.trim()) {
                    console.warn('[WARN] El respaldo está vacío:', backupPath);
                    return {};
                }

                const parsedBackup = JSON.parse(backupData);
                if (!parsedBackup || typeof parsedBackup !== 'object') {
                    console.warn('[WARN] Datos inválidos en el respaldo:', backupPath);
                    return {};
                }

                console.log(`[INFO] Restaurado exitosamente desde ${backupPath}.`);
                fs.writeFileSync(filePath, JSON.stringify(parsedBackup, null, 2));
                return parsedBackup;
            } catch (backupErr) {
                console.error(`[ERROR] Fallo al restaurar desde respaldo: ${backupErr.message}`);
                return {};
            }
        }
    }

    console.error('[ERROR] No se pudo leer player_logs.json ni restaurar respaldo. Devolviendo objeto vacío.');
    return {};
}

// Función para escribir en player_logs.json
let lastBackupTime = 0;
const BACKUP_INTERVAL = 60 * 1000; // 1 minuto

async function writePlayerLogs(playerLogs) {
    try {
        if (!playerLogs || typeof playerLogs !== 'object') {
            console.error('[ERROR] Datos de playerLogs inválidos.');
            throw new Error('Datos inválidos');
        }

        const now = Date.now();
        const mainFilePath = 'player_logs.json';
        const dataToWrite = JSON.stringify(playerLogs, null, 2);
        if (!dataToWrite) {
            throw new Error('Datos serializados vacíos o inválidos');
        }

        // Escribir archivo principal
        fs.writeFileSync(mainFilePath, dataToWrite);

        // Crear backup cada 1 minuto
        if (now - lastBackupTime >= BACKUP_INTERVAL) {
            const backupDir = path.join(__dirname, 'extreme', 'backup');
            fs.mkdirSync(backupDir, { recursive: true });
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupPath = path.join(backupDir, `player_logs_backup_${timestamp}.json`);
            fs.writeFileSync(backupPath, dataToWrite);
            lastBackupTime = now;
            console.log(`[DEBUG] player_logs.json guardado. Backup creado en ${backupPath}.`);
        } else {
            console.log('[DEBUG] player_logs.json guardado. Backup omitido.');
        }
    } catch (err) {
        console.error('[ERROR] No se pudo escribir player_logs.json:', err.message);
        throw err;
    }
}


function getPlayerLogsCached() {
    const now = Date.now();
    if (!playerLogsCache.data || Object.keys(playerLogsCache.data).length === 0 || now - playerLogsCache.timestamp > CACHE_DURATION) {
        playerLogsCache.data = readPlayerLogs();
        playerLogsCache.timestamp = now;
        console.log('[DEBUG] playerLogsCache actualizado.');
    } else {
        console.log('[DEBUG] Usando playerLogsCache existente.');
    }
    return playerLogsCache.data;
}
  
// Función auxiliar para desencriptar la conexión
function decryptHex(str) {
    let strOut = "";
    for (let x = 0; x < str.length; x += 2) {
        strOut += String.fromCharCode(parseInt(str.substr(x, 2), 16));
    }
    return strOut;
}
  
  // Función para actualizar stats del jugador
  async function updatePlayerStats(auth, updates) {
    try {
      let playerLogs = await readPlayerLogs();
      if (!auth || !playerLogs[auth]) {
        console.warn(`[WARN] Player with auth ${auth} not found in player_logs.json, skipping update.`);
        return;
      }
  
      const validKeys = [
        'goals', 'assists', 'elo', 'points', 'powershot',
        'victory', 'defeat', 'empate',
        'victorydt', 'empatedt', 'defeatdt'
      ];
      const invalidKeys = Object.keys(updates).filter(key => !validKeys.includes(key));
      if (invalidKeys.length > 0) {
        console.warn(`[WARN] Invalid update keys for ${auth}: ${invalidKeys.join(', ')}`);
      }
  
      Object.entries(updates).forEach(([key, value]) => {
        if (!validKeys.includes(key)) return;
        switch (key) {
          case 'goals':
            playerLogs[auth].goals = (playerLogs[auth].goals || 0) + (Number.isFinite(value) ? value : 0);
            break;
          case 'assists':
            playerLogs[auth].assists = (playerLogs[auth].assists || 0) + (Number.isFinite(value) ? value : 0);
            break;
          case 'elo':
            playerLogs[auth].elo = (playerLogs[auth].elo || 500) + (Number.isFinite(value) ? value : 0);
            break;
          case 'points':
            playerLogs[auth].points = Math.max(0, (playerLogs[auth].points || 0) + (Number.isFinite(value) ? value : 0));
            break;
          case 'powershot':
            playerLogs[auth].powershot = !!value;
            break;
          case 'victory':
            playerLogs[auth].victory = (playerLogs[auth].victory || 0) + (Number.isFinite(value) ? value : 0);
            break;
          case 'defeat':
            playerLogs[auth].defeat = (playerLogs[auth].defeat || 0) + (Number.isFinite(value) ? value : 0);
            break;
          case 'empate':
            playerLogs[auth].empate = (playerLogs[auth].empate || 0) + (Number.isFinite(value) ? value : 0);
            break;
          case 'victorydt':
            playerLogs[auth].victorydt = (playerLogs[auth].victorydt || 0) + (Number.isFinite(value) ? value : 0);
            break;
          case 'empatedt':
            playerLogs[auth].empatedt = (playerLogs[auth].empatedt || 0) + (Number.isFinite(value) ? value : 0);
            break;
          case 'defeatdt':
            playerLogs[auth].defeatdt = (playerLogs[auth].defeatdt || 0) + (Number.isFinite(value) ? value : 0);
            break;
        }
      });
  
      await writePlayerLogs(playerLogs);
      console.log(`[DEBUG] Stats updated for player ${auth}:`, updates);
      await updateJsonFiles(); // Llamar aquí para enviar a Glitch
    } catch (err) {
      console.error(`[ERROR] Failed to update stats for ${auth}:`, err.message);
    }
  }

  
  // Función para obtener datos de un jugador
  function getPlayerData(playerName) {
    try {
        const data = fs.readFileSync('player_logs.json', 'utf8');
        if (!data.trim()) {
            console.error('[ERROR] player_logs.json is empty');
            return null;
        }
        const playerLogs = JSON.parse(data);
        if (!playerLogs || typeof playerLogs !== 'object') {
            console.error('[ERROR] Invalid data in player_logs.json');
            return null;
        }

        const playerEntry = Object.entries(playerLogs).find(([_, data]) => data.name === playerName);
        if (!playerEntry) {
            console.log(`[DEBUG] No player found with name ${playerName}`);
            return null;
        }

        return playerEntry[1];
    } catch (error) {
        console.error('[ERROR] Failed to load player data:', error.message);
        return null;
    }
}
function iniciarSalaNegociacion() {
    if (DTS.length < 2) {
        room.sendAnnouncement(
            "[Server] ⚠️ No hay suficientes DTs para iniciar el mercado de fichajes. Reiniciando...",
            null,
            0xFFA500,
            "small",
            2
        );
        reiniciarJuego("Faltan DTs para el mercado de fichajes");
        return;
    }

    room.stopGame();
    room.setCustomStadium(MAPA_FICHAJES);
    room.startGame();
    
    // Activar el mercado
    iniciarMercadoFichajes();

    // Iniciar el juego después de configurar todo
    setTimeout(() => {
        room.startGame();
        enTransicion = false; // Finalizar transición
    }, 1000);
}

function manejarComandoEquipo(player) {
    const equipoJugador = playerTeam[player.id]; // 'rojo', 'azul' o undefined

    if (!equipoJugador) {
        room.sendAnnouncement(
            "[Server] ❌ No estás en ningún equipo. Usa !dt para postularte o espera a ser fichado.",
            player.id,
            0xA6D9F7,
            "small",
            2
        );
        return;
    }

    const equipoNum = equipoJugador === 'rojo' ? 1 : 2;

    // Jugadores en cancha
    const enCancha = jugadoresEnJuego[equipoNum]
        .map(id => {
            const p = room.getPlayer(id);
            return p ? `${p.name} (ID: ${id})` : null;
        })
        .filter(Boolean)
        .join(", ") || "Ninguno";

    // Jugadores afuera (seleccionados pero no en cancha)
    const afuera = jugadoresSeleccionados[equipoNum]
        .filter(id => !jugadoresEnJuego[equipoNum].includes(id))
        .map(id => {
            const p = room.getPlayer(id);
            return p ? `${p.name} (ID: ${id})` : null;
        })
        .filter(Boolean)
        .join(", ") || "Ninguno";

    const mensaje = `Equipo ${equipoJugador}:\nEn cancha: ${enCancha}\nAfuera: ${afuera}`;

    room.sendAnnouncement(
        mensaje,
        player.id,
        0xA6D9F7,
        "small",
        2
    );
}

// Función para verificar el estado de la sala
function verificarEstadoSala() {
    const jugadoresTotal = room.getPlayerList().filter(p => p.id !== 0).length;
    
    if (jugadoresTotal < MIN_PLAYERS_FOR_GAME) {
        room.sendAnnouncement(
            `[AD] ⚠️ No hay suficientes jugadores para comenzar (${jugadoresTotal}/${MIN_PLAYERS_FOR_GAME})`,
            null,
            0xFFEFBD,
            "small",
            2
        );
        return;
    }

    // Si no hay DTs, iniciar recordatorio
    // Si no hay DTs suficientes, iniciar recordatorio
    if (DTS.length < 2) {
        dtReminderTimeout = setInterval(() => {
            room.sendAnnouncement(
                "🔥 ¡Sé el *Rey DT* y lleva la medalla dorada! 🥇\n" +
                "¡Cada victoria como DT suma 4000 puntos! Usa !dt para postularte.",
                null,
                0xFFD700, // Dorado brillante
                "small-bold",
                2
            );
        }, DT_REMINDER_INTERVAL);
    }
    

}
////POWERSHOT



// Pila para rastrear los últimos toques
var touchStack = []; // Asegurate de definir esto globalmente al inicio del script

let lastAvatarEffect = {};

function getLastTouchTheBall() {
    try {
        const ballPosition = room.getBallPosition();
        if (!ballPosition) return lastPlayerTouched;

        const players = room.getPlayerList();
        if (!players || players.length === 0) return lastPlayerTouched;

        let playerLogs = getPlayerLogs();

        for (let i = 0; i < players.length; i++) {
            if (players[i].position == null) continue;

            const distanceToBall = pointDistance(players[i].position, ballPosition);
            if (distanceToBall >= 30) continue;

            // Registrar toque siempre, sin importar vinculación
            if (!lastPlayerTouched || lastPlayerTouched.id !== players[i].id) {
                touchStack.push(players[i]);
            }
            lastPlayerTouched = players[i];
            lastTeamTouched = players[i].team;
            if (touchStack.length > 5) touchStack.shift();
            if (touchStack.length >= 2) {
                const penultimate = touchStack[touchStack.length - 2];
                secondaryPlayerTouched = (penultimate.team === lastPlayerTouched.team && penultimate.id !== lastPlayerTouched.id)
                    ? penultimate
                    : null;
            } else {
                secondaryPlayerTouched = null;
            }

            const playerKey = playerAuth[players[i].id];
            if (!playerKey) {
                console.warn(`[DEBUG] No se encontró playerKey para jugador ID: ${players[i].id}, Nombre: ${players[i].name}`);
                continue;
            }

            const playerData = playerLogs[playerKey] || {};
            // Solo procesar habilidades si la cuenta está vinculada
            if (playerData.linked !== true) {
                continue;
            }

            const hasMasterSpace = playerData.masterspace && playerData.equipped?.masterspace;
            const hasMasterControl = playerData.mastercontrol && playerData.equipped?.mastercontrol;

            if (hasMasterControl && !masterControlCooldown[players[i].id]) {
                const ballProps = room.getDiscProperties(0);
                const currentSpeed = Math.sqrt(ballProps.xspeed ** 2 + ballProps.yspeed ** 2);
                if (currentSpeed > 1) {
                    room.setDiscProperties(0, {
                        xspeed: ballProps.xspeed * 0.85,
                        yspeed: ballProps.yspeed * 0.85
                    });
                    console.log(`[DEBUG] MasterControl activado por ${players[i].name} (ID: ${players[i].id}), velocidad reducida a ${currentSpeed * 0.85}`);
                }
                masterControlCooldown[players[i].id] = true;
                setTimeout(() => {
                    masterControlCooldown[players[i].id] = false;
                    console.log(`[DEBUG] MasterControl cooldown finalizado para ${players[i].name} (ID: ${players[i].id})`);
                }, 500);
            }

            if (hasMasterSpace) {
                spaceTouchTime[players[i].id] = (spaceTouchTime[players[i].id] || 0) + 1;
                if (spaceTouchTime[players[i].id] >= 60 && !masterSpaceCooldown[players[i].id]) {
                    const playerTeam = players[i].team;
                    const playerName = players[i].name;
                    const playerId = players[i].id;
                    const originalAvatar = room.getPlayer(playerId)?.avatar || null;

                    lastAvatarEffect[playerId] = 'masterspace';
                    room.sendAnnouncement(
                        "[Server] 🌌 ¡" + playerName + " activó Master Space! Los enemigos se achican por 5 segundos.",
                        null,
                        0xC28CAE,
                        "small",
                        2
                    );
                    room.setPlayerAvatar(playerId, "🌌");

                    players.forEach(p => {
                        if (p.team !== 0 && p.team !== playerTeam) {
                            const currentProps = room.getPlayerDiscProperties(p.id);
                            if (currentProps) {
                                room.setPlayerDiscProperties(p.id, { radius: 7.5 });
                            }
                        }
                    });

                    setTimeout(() => {
                        if (lastAvatarEffect[playerId] === 'masterspace') {
                            const currentPlayer = room.getPlayer(playerId);
                            if (currentPlayer) {
                                room.setPlayerAvatar(playerId, originalAvatar);
                                delete lastAvatarEffect[playerId];
                            }
                        }
                        players.forEach(p => {
                            if (p.team !== 0 && p.team !== playerTeam) {
                                const currentProps = room.getPlayerDiscProperties(p.id);
                                if (currentProps) {
                                    room.setPlayerDiscProperties(p.id, { radius: 15 });
                                }
                            }
                        });
                    }, 5000);

                    spaceTouchTime[players[i].id] = 0;
                    masterSpaceCooldown[players[i].id] = true;
                    setTimeout(() => masterSpaceCooldown[players[i].id] = false, 180000);
                }
            } else if (spaceTouchTime[players[i].id] !== 0) {
                spaceTouchTime[players[i].id] = 0;
            }
            break;
        }
        return lastPlayerTouched;
    } catch (error) {
        console.error("[ERROR] Fallo en getLastTouchTheBall:", error.message);
        return lastPlayerTouched;
    }
}

function run(player, state, props) {
    var now = Date.now();
    var magnitude = Math.sqrt(props.xspeed * props.xspeed + props.yspeed * props.yspeed);
    if (magnitude < 0.1) {
        room.setPlayerDiscProperties(player.id, {
            xspeed: 5,
            yspeed: 0
        });
        return;
    }

    const playerLogs = getPlayerLogs();
    const playerKey = playerAuth[player.id];
    if (!playerKey) {
        return;
    }

    // Solo procesar la habilidad si la cuenta está vinculada
    if (playerLogs[playerKey]?.linked !== true) {
        return;
    }

    state.isRunning = true;
    var vecX = props.xspeed / magnitude;
    var vecY = props.yspeed / magnitude;

    const originalAvatar = room.getPlayer(player.id)?.avatar || null;

    console.log(`[DEBUG] Void Dash activado para ${player.name} (ID: ${player.id}). Original avatar: ${originalAvatar}`);

    lastAvatarEffect[player.id] = 'voiddash';

    room.setPlayerDiscProperties(player.id, {
        xgravity: vecX * 0.037,
        ygravity: vecY * 0.037
    });
    room.setPlayerAvatar(player.id, "🌀");
    room.sendAnnouncement(
        `[🌀] ¡Void Dash activado para ${player.name}!`,
        null,
        0x4F78CE,
        "small",
        2
    );
    state.activation = 0;

    setTimeout(function() {
        const currentPlayer = room.getPlayer(player.id);
        if (!currentPlayer) {
            console.log(`[DEBUG] Jugador ${player.name} (ID: ${player.id}) no está en la sala al intentar restaurar avatar (Void Dash).`);
            state.isRunning = false;
            state.slowdown = 0;
            state.slowdownUntil = now + 20000;
            delete lastAvatarEffect[player.id];
            return;
        }

        if (lastAvatarEffect[player.id] === 'voiddash') {
            console.log(`[DEBUG] Restaurando avatar para ${player.name} (ID: ${player.id}). Original avatar: ${originalAvatar}, Current avatar: ${currentPlayer.avatar}`);
            room.setPlayerAvatar(player.id, originalAvatar);
            delete lastAvatarEffect[player.id];
        } else {
            console.log(`[DEBUG] Void Dash no restaura avatar para ${player.name} (ID: ${player.id}) porque otro efecto (${lastAvatarEffect[player.id]}) tomó prioridad.`);
        }

        const currentProps = room.getPlayerDiscProperties(player.id);
        if (currentProps) {
            const slowdownFactor = 0.90;
            const newXspeed = currentProps.xspeed * slowdownFactor;
            const newYspeed = currentProps.yspeed * slowdownFactor;
            room.setPlayerDiscProperties(player.id, {
                xgravity: 0,
                ygravity: 0,
                xspeed: newXspeed,
                yspeed: newYspeed
            });
            if (Math.abs(newXspeed) < 0.05 && Math.abs(newYspeed) < 0.05) {
                room.setPlayerDiscProperties(player.id, {
                    xspeed: 0,
                    yspeed: 0
                });
            }
        }

        state.isRunning = false;
        state.slowdown = 0;
        state.slowdownUntil = now + 20000;

        room.sendAnnouncement(
            `[🌀] ${player.name} entra en cooldown de Void Dash (20s).`,
            player.id,
            0x4F78CE,
            "small",
            2
        );
    }, 4000);
}


// Inicializar playerLogsCache al inicio del script
let playerLogsCache = { data: {}, timestamp: 0 };
const CACHE_DURATION = 1000; // 1 segundo
function getPlayerLogs() {
    const now = Date.now();
    if (!playerLogsCache.data || Object.keys(playerLogsCache.data).length === 0 || now - playerLogsCache.timestamp > CACHE_DURATION) {
        try {
            const data = fs.readFileSync('player_logs.json', 'utf8');
            
            // Verificar si el archivo está vacío
            if (!data.trim()) {
                console.error("[ERROR] player_logs.json está vacío. Intentando usar respaldo...");
                throw new Error('Archivo vacío');
            }
            
            // Intentar parsear el JSON
            try {
                playerLogsCache.data = JSON.parse(data);
                playerLogsCache.timestamp = now;
            } catch (parseErr) {
                console.error("[ERROR] Error al parsear player_logs.json:", parseErr.message);
                throw new Error('JSON inválido');
            }
            
            // Verificar si el JSON es un objeto válido
            if (!playerLogsCache.data || typeof playerLogsCache.data !== 'object') {
                console.error("[ERROR] Datos inválidos en player_logs.json");
                throw new Error('Objeto JSON inválido');
            }
            
        } catch (err) {
            console.error("[ERROR] Fallo al leer player_logs.json:", err.message);
            
            // Intentar recuperar desde backup
            try {
                console.log("[INFO] Intentando restaurar desde respaldo...");
                const backupDir = path.join(__dirname, 'extreme', 'backup');
                const backupFiles = fs.readdirSync(backupDir);
                const validBackups = backupFiles
                    .filter(f => f.startsWith('player_logs_backup_') && f.endsWith('.json'))
                    .sort((a, b) => {
                        const timeA = new Date(a.replace('player_logs_backup_', '').replace('.json', '').replace(/-/g, ':'));
                        const timeB = new Date(b.replace('player_logs_backup_', '').replace('.json', '').replace(/-/g, ':'));
                        return timeB - timeA; // Más reciente primero
                    });

                if (validBackups.length === 0) {
                    console.error('[ERROR] No se encontraron respaldos válidos en backup/.');
                    playerLogsCache.data = {};
                    playerLogsCache.timestamp = now;
                    return {};
                }

                // Intentar leer el respaldo más reciente
                const backupPath = path.join(backupDir, validBackups[0]);
                const backupData = fs.readFileSync(backupPath, 'utf8');

                if (!backupData.trim()) {
                    console.warn('[WARN] El respaldo está vacío:', backupPath);
                    playerLogsCache.data = {};
                    playerLogsCache.timestamp = now;
                    return {};
                }

                const parsedBackup = JSON.parse(backupData);
                if (!parsedBackup || typeof parsedBackup !== 'object') {
                    console.warn('[WARN] Datos inválidos en el respaldo:', backupPath);
                    playerLogsCache.data = {};
                    playerLogsCache.timestamp = now;
                    return {};
                }

                console.log(`[INFO] Restaurado exitosamente desde ${backupPath}.`);
                
                // Restaurar el archivo principal con el respaldo
                fs.writeFileSync('player_logs.json', JSON.stringify(parsedBackup, null, 2));
                
                playerLogsCache.data = parsedBackup;
                playerLogsCache.timestamp = now;
                
            } catch (backupErr) {
                console.error(`[ERROR] Fallo al restaurar desde respaldo: ${backupErr.message}`);
                playerLogsCache.data = {};
                playerLogsCache.timestamp = now;
            }
        }
    }
    return playerLogsCache.data || {};
}



function interpolateColor(startColor, endColor, factor) {
    const r1 = (startColor >> 16) & 0xFF;
    const g1 = (startColor >> 8) & 0xFF;
    const b1 = startColor & 0xFF;
    const r2 = (endColor >> 16) & 0xFF;
    const g2 = (endColor >> 8) & 0xFF;
    const b2 = endColor & 0xFF;

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return (r << 16) | (g << 8) | b;
}
const ULTRA_POWER_COOLDOWN = 25000; // 10 segundos de cooldown para Abyss Cannon

// Definir objeto para rastrear cooldowns (agrega esto con otras variables globales)
let ultraPowerCooldown = {};
// Función para manejar la transición de color de la pelota
function transitionBallColor(startColor, endColor, duration, callback) {
    const steps = 20; // Más pasos para una transición más suave
    const interval = duration / steps;
    let step = 0;

    const intervalId = setInterval(() => {
        step++;
        const factor = step / steps;
        const currentColor = interpolateColor(startColor, endColor, factor);
        room.setDiscProperties(0, { color: currentColor });

        if (step >= steps) {
            clearInterval(intervalId);
            if (callback) callback();
        }
    }, interval);
}

// Funciones de chequeo de poderes
function CheckPhantomStrike(playerId, playerProps, ballProps) {
    try {
        if (!playerId || !playerProps || !ballProps) return;

        const distance = pointDistance(playerProps, ballProps);
        const playerLogs = getPlayerLogs();
        const playerKey = playerAuth[playerId] || null;

        // Verificar si la cuenta está vinculada
        if (!playerKey || playerLogs[playerKey]?.linked !== true) {
            return; // Si no está vinculada, no procesar habilidades
        }

        const hasPhantomStrike = playerKey && playerLogs[playerKey]?.phantomstrike && playerLogs[playerKey]?.equipped?.phantomstrike;

        if (hasPhantomStrike && distance < 30 && !phantomStrikeCooldown[playerId]) {
            phantomTimePlayerBallTouch++;
            if (phantomTimePlayerBallTouch === PHANTOM_TIME_OUT) {
                room.sendAnnouncement(`[Server] 👻 ¡Phantom Strike activado por ${lastPlayerTouched.name}!`, null, 0x80FFFF, "small", 2);
            }
            if (phantomTimePlayerBallTouch >= PHANTOM_TIME_OUT) {
                phantomActive = true;
            }
        } else if (phantomTimePlayerBallTouch !== 0) {
            phantomTimePlayerBallTouch = 0;
            phantomActive = false;
        }
    } catch (error) {
        console.error("[ERROR] Fallo en CheckPhantomStrike:", error.message);
    }
}

// Definir contadores globales por habilidad


const SUPERNOVA_MIN_TIME = 90; // 1.5 segundos para empezar a cargar
const SUPERNOVA_MAX_MULTIPLIER = 1.8; // Velocidad máxima
const SUPERNOVA_MULTIPLIER_STEP = 0.2; // Incremento por nivel (1.2x, 1.4x, 1.6x, 1.8x)
const SUPERNOVA_TICKS_PER_STEP = 110; // ~1.83 segundos por nivel
const SUPERNOVA_COOLDOWN = 30000; // 60 segundos de cooldown

const CELESTIAL_SLASH_MIN_TIME = 30; // 0.5 segundos para activar
const CELESTIAL_SLASH_SPEED_MULTIPLIER = 1.3; // Ajustado para un efecto más suave
const CELESTIAL_SLASH_BCOEFF = 0.80; // Rebote sutil
const CELESTIAL_SLASH_DURATION = 5000; // 5 segundos
const CELESTIAL_SLASH_COOLDOWN = 30000; // 60 segundos
let powerShotTouchTime = {};
let ultraPowerShotTouchTime = {};
let supernovaTouchTime = {};
let celestialSlashTouchTime = {}; // Cambiado de thunderReboundTouchTime
let lastMultiplierSent = {}; // Para evitar spam
let celestialSlashCooldown = {}; // Cambiado de thunderReboundCooldown
let supernovaActive = false;
let celestialSlashActive = false; // Cambiado de thunderReboundActive




function CheckPowerShot(playerId, playerProps, ballProps) {
    try {
        if (!playerId || !playerProps || !ballProps) return;

        const distance = pointDistance(playerProps, ballProps);
        const playerLogs = getPlayerLogs();
        const playerKey = playerAuth[playerId] || null;

        if (!playerKey) {
            return;
        }

        const hasPowershot = playerKey && playerLogs[playerKey]?.powershot && playerLogs[playerKey]?.equipped?.powershot;
        const hasUltraPowerShot = playerKey && playerLogs[playerKey]?.ultrapowershot && playerLogs[playerKey]?.equipped?.ultrapowershot;
        const hasSupernova = playerKey && playerLogs[playerKey]?.supernova && playerLogs[playerKey]?.equipped?.supernova;
        const hasCelestialSlash = playerKey && playerLogs[playerKey]?.celestial && playerLogs[playerKey]?.equipped?.celestial;

        // Solo procesar habilidades si la cuenta está vinculada
        if (playerLogs[playerKey]?.linked !== true) {
            return;
        }

        // Powershot
        if (hasPowershot && distance < 30) {
            powerShotTouchTime[playerId] = (powerShotTouchTime[playerId] || 0) + 1;
            if (powerShotTouchTime[playerId] === TimeOut) {
                room.sendAnnouncement("[Server] Powershot activado!", null, 0x61D095, "small-bold", 2);
            }
            if (powerShotTouchTime[playerId] >= TimeOut) {
                powerActive = true;
            }
        } else if (powerShotTouchTime[playerId]) {
            powerShotTouchTime[playerId] = 0;
            powerActive = false;
        }

        // UltraPowerShot
        if (hasUltraPowerShot && distance < 30 && !ultraPowerCooldown[playerId]) {
            ultraPowerShotTouchTime[playerId] = (ultraPowerShotTouchTime[playerId] || 0) + 1;
            if (ultraPowerShotTouchTime[playerId] === UltraTimeOut) {
                room.sendAnnouncement("[Server] Abyss Cannon activado!", null, 0xF72C25, "small-bold", 2);
            }
            if (ultraPowerShotTouchTime[playerId] >= UltraTimeOut) {
                ultraPowerActive = true;
            }
        } else if (ultraPowerShotTouchTime[playerId]) {
            ultraPowerShotTouchTime[playerId] = 0;
            ultraPowerActive = false;
        }

        // Supernova
        if (hasSupernova && distance < 30 && !supernovaCooldown[playerId]) {
            supernovaTouchTime[playerId] = (supernovaTouchTime[playerId] || 0) + 1;
            if (supernovaTouchTime[playerId] >= SUPERNOVA_MIN_TIME) {
                const factor = Math.min(supernovaTouchTime[playerId] / (SUPERNOVA_MIN_TIME + SUPERNOVA_TICKS_PER_STEP * 4), 1);
                const currentColor = interpolateColor(0xFF0000, 0x0000FF, factor);
                room.setDiscProperties(0, { color: currentColor });
                if (supernovaTouchTime[playerId] === SUPERNOVA_MIN_TIME) {
                    room.sendAnnouncement("[Server] 🌟 ¡Supernova cargándose!", null, 0x1E90FF, "small-bold", 2);
                }
                const multiplier = 1 + SUPERNOVA_MULTIPLIER_STEP * Math.min(Math.floor((supernovaTouchTime[playerId] - SUPERNOVA_MIN_TIME) / SUPERNOVA_TICKS_PER_STEP), 4);
                const multiplierStep = Math.floor((supernovaTouchTime[playerId] - SUPERNOVA_MIN_TIME) / SUPERNOVA_TICKS_PER_STEP);
                if (supernovaTouchTime[playerId] === SUPERNOVA_MIN_TIME + multiplierStep * SUPERNOVA_TICKS_PER_STEP && multiplier !== lastMultiplierSent[playerId]) {
                    const player = room.getPlayer(playerId);
                    if (player) {
                        room.sendAnnouncement(
                            `[Supernova] 🌌 Velocidad: ${multiplier.toFixed(1)}x`,
                            playerId,
                            0x1E90FF,
                            "small-bold",
                            2
                        );
                        lastMultiplierSent[playerId] = multiplier;
                    }
                }
                supernovaActive = true;
            }
        } else if (supernovaTouchTime[playerId]) {
            supernovaTouchTime[playerId] = 0;
            supernovaActive = false;
            lastMultiplierSent[playerId] = 0;
            room.setDiscProperties(0, { color: 0xFFFFFF });
        }

        // Celestial Slash
        if (hasCelestialSlash && distance < 30 && !celestialSlashCooldown[playerId]) {
            celestialSlashTouchTime[playerId] = (celestialSlashTouchTime[playerId] || 0) + 1;
            if (celestialSlashTouchTime[playerId] >= CELESTIAL_SLASH_MIN_TIME) {
                celestialSlashActive = true;
                if (celestialSlashTouchTime[playerId] === CELESTIAL_SLASH_MIN_TIME) {
                    room.sendAnnouncement("[Server] ⚔️ ¡Celestial Slash listo!", null, 0xFFD700, "small-bold", 2);
                }
            }
        } else if (celestialSlashTouchTime[playerId]) {
            celestialSlashTouchTime[playerId] = 0;
            celestialSlashActive = false;
        }
    } catch (error) {
        console.error("[ERROR] Fallo en CheckPowerShot:", error.message);
    }
}


// Global timer registry (add this with other global variables)
let activeTimers = {};

// Modificación de applySkillEffect
function applySkillEffect(player, skill, ballProps) {
    try {
        const playerLogs = getPlayerLogs();
        const playerKey = playerAuth[player.id];
        if (!playerKey) {
            return;
        }

        // Solo procesar habilidades si la cuenta está vinculada
        if (playerLogs[playerKey]?.linked !== true) {
            return;
        }

        if (skill === 'powershot' && powerActive) {
            room.setDiscProperties(0, {
                xspeed: PowerCoefficient * ballProps.xspeed,
                yspeed: PowerCoefficient * ballProps.yspeed
            });
            transitionBallColor(0xFF4500, 0xFFFFFF, 1000);
            room.sendAnnouncement(`[Server] 💪 ¡Powershot ejecutado por ${player.name}!`, null, 0x61D095, "small-bold", 2);
            powerActive = false;
            powerShotTouchTime[player.id] = 0;
        }
        else if (skill === 'ultrapowershot' && ultraPowerActive) {
            room.setDiscProperties(0, {
                xspeed: UltraPowerCoefficient * ballProps.xspeed,
                yspeed: UltraPowerCoefficient * ballProps.yspeed
            });
            const players = room.getPlayerList();
            players.forEach(p => {
                if (p.id !== player.id) {
                    const currentProps = room.getPlayerDiscProperties(p.id);
                    if (currentProps) {
                        room.setPlayerDiscProperties(p.id, { radius: 11.5 });
                    }
                }
            });
            transitionBallColor(0xF72C25, 0x000000, 1000, () => {
                const effectTimer = setTimeout(() => {
                    transitionBallColor(0x000000, 0xFFFFFF, 1000);
                }, 4000);
                activeTimers[`${player.id}_ultrapowershot_transition`] = { timer: effectTimer, type: 'effect' };
            });
            room.sendAnnouncement(`[Server] ⚫ ¡Abyss Cannon ejecutado por ${player.name}!`, null, 0xF72C25, "small-bold", 2);
            const abyssEffectTimer = setTimeout(() => {
                players.forEach(p => {
                    if (p.id !== player.id) {
                        const currentProps = room.getPlayerDiscProperties(p.id);
                        if (currentProps) {
                            room.setPlayerDiscProperties(p.id, { radius: 15 });
                        }
                    }
                });
                room.sendAnnouncement("[Server] ⚫ Abyss ha terminado.", player.id, 0xF72C25, "small-bold", 2);
            }, 5000);
            activeTimers[`${player.id}_ultrapowershot_effect`] = { timer: abyssEffectTimer, type: 'effect' };
            ultraPowerCooldown[player.id] = true;
            ultraPowerActive = false;
            ultraPowerShotTouchTime[player.id] = 0;
            const cooldownTimer = setTimeout(() => {
                ultraPowerCooldown[player.id] = false;
                room.sendAnnouncement(`[Server] ⚫ Abyss Cannon está listo de nuevo para ${player.name}.`, player.id, 0xF72C25, "small-bold", 2);
            }, ULTRA_POWER_COOLDOWN);
            activeTimers[`${player.id}_ultrapowershot_cooldown`] = { timer: cooldownTimer, type: 'cooldown' };
        }
        else if (skill === 'phantomstrike' && phantomActive && !phantomStrikeCooldown[player.id]) {
            const originalCMask = ballProps.cMask || DEFAULT_CMASK;
            const originalCGroup = ballProps.cGroup || room.CollisionFlags.ball | room.CollisionFlags.kick | room.CollisionFlags.score;
            const removeKick = Math.random() < 0.15;
            const newCGroup = removeKick ? originalCGroup & ~room.CollisionFlags.kick : originalCGroup;
            room.setDiscProperties(0, {
                cMask: originalCMask & ~PLAYER_CGROUP,
                cGroup: newCGroup,
                xspeed: ballProps.xspeed * PHANTOM_SPEED_COEFFICIENT,
                yspeed: ballProps.yspeed * PHANTOM_SPEED_COEFFICIENT
            });
            transitionBallColor(0x8a53a4, 0xFFFFFF, PHANTOM_DURATION);
            room.sendAnnouncement(`[Server] 👻 ¡Phantom Strike ejecutado por ${player.name}!${removeKick ? " ¡La pelota no puede ser pateada!" : ""}`, null, 0x80FFFF, "small-bold", 2);
            const effectTimer = setTimeout(() => {
                room.setDiscProperties(0, {
                    cMask: originalCMask,
                    cGroup: originalCGroup
                });
                room.sendAnnouncement("[Server] 👻 El efecto Phantom Strike ha terminado.", null, 0x80FFFF, "small-bold", 2);
            }, PHANTOM_DURATION);
            activeTimers[`${player.id}_phantomstrike_effect`] = { timer: effectTimer, type: 'effect' };
            phantomActive = false;
            phantomTimePlayerBallTouch = 0;
            phantomStrikeCooldown[player.id] = true;
            const cooldownTimer = setTimeout(() => {
                phantomStrikeCooldown[player.id] = false;
                room.sendAnnouncement(`[Server] 👻 Phantom Strike está listo de nuevo para ${player.name}.`, player.id, 0x80FFFF, "small-bold", 2);
            }, PHANTOM_COOLDOWN);
            activeTimers[`${player.id}_phantomstrike_cooldown`] = { timer: cooldownTimer, type: 'cooldown' };
        }
        else if (skill === 'supernova' && supernovaActive && !supernovaCooldown[player.id]) {
            const multiplier = 1 + SUPERNOVA_MULTIPLIER_STEP * Math.min(Math.floor((supernovaTouchTime[player.id] - SUPERNOVA_MIN_TIME) / SUPERNOVA_TICKS_PER_STEP), 4);
            room.setDiscProperties(0, {
                xspeed: ballProps.xspeed * multiplier,
                yspeed: ballProps.yspeed * multiplier
            });
            transitionBallColor(0x0000FF, 0xFFFFFF, 1000);
            room.sendAnnouncement(`[Server] 🌟 ¡${player.name} desata Supernova!`, null, 0x1E90FF, "small-bold", 2);
            supernovaActive = false;
            supernovaTouchTime[player.id] = 0;
            lastMultiplierSent[player.id] = 0;
            supernovaCooldown[player.id] = true;
            const cooldownTimer = setTimeout(() => {
                supernovaCooldown[player.id] = false;
                room.sendAnnouncement(`[Server] 🌟 Supernova está lista de nuevo para ${player.name}.`, player.id, 0x1E90FF, "small-bold", 2);
            }, SUPERNOVA_COOLDOWN);
            activeTimers[`${player.id}_supernova_cooldown`] = { timer: cooldownTimer, type: 'cooldown' };
        }
        else if (skill === 'thunderrebound' && celestialSlashActive && !celestialSlashCooldown[player.id]) {
            room.setDiscProperties(0, {
                xspeed: ballProps.xspeed * CELESTIAL_SLASH_SPEED_MULTIPLIER,
                yspeed: ballProps.yspeed * CELESTIAL_SLASH_SPEED_MULTIPLIER,
                bCoeff: CELESTIAL_SLASH_BCOEFF
            });
            transitionBallColor(0xFFFFFF, 0xFFD700, 500, () => {
                const transitionTimer = setTimeout(() => {
                    transitionBallColor(0xFFD700, 0xFFFFFF, 500);
                }, CELESTIAL_SLASH_DURATION - 500);
                activeTimers[`${player.id}_thunderrebound_transition`] = { timer: transitionTimer, type: 'effect' };
            });
            room.sendAnnouncement(`[Server] ⚔️ ¡${player.name} lanza Celestial Slash!`, null, 0xFFD700, "small-bold", 2);
            const effectTimer = setTimeout(() => {
                room.setDiscProperties(0, { bCoeff: DEFAULT_BCOEFF });
                room.sendAnnouncement("[Server] ⚔️ El efecto Celestial Slash ha terminado.", null, 0xFFD700, "small-bold", 2);
            }, CELESTIAL_SLASH_DURATION);
            activeTimers[`${player.id}_thunderrebound_effect`] = { timer: effectTimer, type: 'effect' };
            celestialSlashActive = false;
            celestialSlashTouchTime[player.id] = 0;
            celestialSlashCooldown[player.id] = true;
            const cooldownTimer = setTimeout(() => {
                celestialSlashCooldown[player.id] = false;
                room.sendAnnouncement(`[Server] ⚔️ Celestial Slash está listo de nuevo para ${player.name}.`, player.id, 0xFFD700, "small-bold", 2);
            }, CELESTIAL_SLASH_COOLDOWN);
            activeTimers[`${player.id}_thunderrebound_cooldown`] = { timer: cooldownTimer, type: 'cooldown' };
        }
    } catch (error) {
        console.error("[ERROR] Fallo en applySkillEffect:", error.message);
    }
}



room.onPlayerBallKick = function(player) {
    try {
        if (!player) {
            console.log("[DEBUG] No se pudo identificar al jugador que pateó.");
            return;
        }

        if (player.team === 1 || player.team === 2) {
            teamKicks[player.team]++;
            console.log(`[DEBUG] Kick registrado para equipo ${player.team === 1 ? "Rojo" : "Azul"}. Total: ${teamKicks[player.team]}`);
        }

        if (lastPlayerTouched && lastPlayerTouched.id !== player.id && lastTeamTouched === player.team) {
            secondaryPlayerTouched = lastPlayerTouched;
            console.log(`[DEBUG] Asistente registrado en pateo: ${secondaryPlayerTouched.name} (ID: ${secondaryPlayerTouched.id})`);
        }

        lastPlayerToKick = player;
        console.log(`[DEBUG] Pateó ${player.name} (ID: ${player.id}).`);

        const playerLogs = getPlayerLogs();
        const playerKey = playerAuth[player.id];
        if (!playerKey) {
            console.log(`[DEBUG] No se encontró auth para ${player.name} (ID: ${player.id}).`);
            return;
        }

        const multiplier = getUpgradeMultiplier(playerKey, playerLogs);
        console.log(`[DEBUG] Multiplicador para ${player.name} (Key: ${playerKey}): ${multiplier}`);
        const pointsToAdd = Math.round(POINTS_PER_KICK * multiplier);

        if (!modoTest) {
            updatePlayerStats(playerKey, { points: pointsToAdd });
            if (player.team === 1 || player.team === 2) {
                presupuestoEquipos[player.team] = (presupuestoEquipos[player.team] || 0) + 1;
                console.log(`[DEBUG] Valor del equipo ${player.team === 1 ? "Rojo" : "Azul"} incrementado a ${presupuestoEquipos[player.team]}`);
            }
            playerValues[player.id] = (playerValues[player.id] || VALOR_BASE_JUGADOR) + 5;
            console.log(`[DEBUG] Valor de ${player.name} (ID: ${player.id}) incrementado a ${playerValues[player.id]}`);
        }

        const ballProps = room.getDiscProperties(0);
        if (ballProps) {
            const hasPowershot = playerLogs[playerKey]?.powershot && playerLogs[playerKey]?.equipped?.powershot;
            const hasUltraPowerShot = playerLogs[playerKey]?.ultrapowershot && playerLogs[playerKey]?.equipped?.ultrapowershot;
            const hasPhantomStrike = playerLogs[playerKey]?.phantomstrike && playerLogs[playerKey]?.equipped?.phantomstrike;
            const hasSupernova = playerLogs[playerKey]?.supernova && playerLogs[playerKey]?.equipped?.supernova;
            const hasThunderRebound = playerLogs[playerKey]?.celestial && playerLogs[playerKey]?.equipped?.celestial;

            if (hasPowershot) applySkillEffect(player, 'powershot', ballProps);
            if (hasUltraPowerShot) applySkillEffect(player, 'ultrapowershot', ballProps);
            if (hasPhantomStrike) applySkillEffect(player, 'phantomstrike', ballProps);
            if (hasSupernova) applySkillEffect(player, 'supernova', ballProps);
            if (hasThunderRebound) applySkillEffect(player, 'thunderrebound', ballProps);
        }
    } catch (error) {
        console.error("[ERROR] Fallo en onPlayerBallKick:", error.message);
        room.sendAnnouncement("[Server] ⚠️ Error al procesar el pateo. Contactá al admin.", null, 0xFF5555, "small", 2);
    }
};
room.onGameStop = function(byPlayer) {
    matchStats.endTime = Date.now();

    room.getPlayerList().forEach(player => {
        if (player.team === Team.RED && !matchStats.redPlayers.includes(player.id)) {
            matchStats.redPlayers.push(player.id);
            console.log(`[DEBUG] Jugador ${player.name} (ID: ${player.id}) agregado al equipo Rojo en onGameStop.`);
        } else if (player.team === Team.BLUE && !matchStats.bluePlayers.includes(player.id)) {
            matchStats.bluePlayers.push(player.id);
            console.log(`[DEBUG] Jugador ${player.name} (ID: ${player.id}) agregado al equipo Azul en onGameStop.`);
        }
    });

    if (!modoTest && !mercadoActivo && !recordingSent) {
        sendDiscordWebhook();
        recordingSent = true;
    } else {
        console.log("[DEBUG] Juego detenido en modo test, mercado de pases o grabación ya enviada, no se envía webhook.");
    }

    // Limpiar todos los timers activos
    Object.keys(activeTimers).forEach(key => {
        clearTimeout(activeTimers[key].timer);
        console.log(`[DEBUG] Timer ${key} (${activeTimers[key].type}) cleared in onGameStop.`);
    });
    activeTimers = {};

    // Reiniciar variables
    teamKicks = { 1: 0, 2: 0 };
    matchScore = { red: 0, blue: 0 };
    lastPlayerTouched = null;
    lastPlayerToKick = null;
    secondaryPlayerTouched = null;
    masterControlCooldown = {};
    spaceTouchTime = {};
    masterSpaceCooldown = {};
    phantomStrikeCooldown = {};
    phantomTimePlayerBallTouch = 0;
    phantomActive = false;
    gravityShiftCooldown = {};
    modoAmistoso = false;
    supernovaCooldown = {};
    supernovaActive = false;
    celestialSlashCooldown = {};
    celestialSlashActive = false;
    powerShotTouchTime = {};
    ultraPowerShotTouchTime = {};
    supernovaTouchTime = {};
    celestialSlashTouchTime = {};
    lastMultiplierSent = {};
    ultraPowerCooldown = {};

    console.log("[DEBUG] Variables de partido reiniciadas en onGameStop.");
};
room.onGameTick = function () {
    try {
        const now = Date.now();

        getLastTouchTheBall();
        
        const ballProps = room.getDiscProperties(0);
        const player = lastPlayerTouched;
        const playerProps = player && player.id ? room.getPlayerDiscProperties(player.id) : null;

        CheckPhantomStrike(player?.id, playerProps, ballProps);
        CheckPowerShot(player?.id, playerProps, ballProps);

        const players = room.getPlayerList().filter(p => p.team !== 0);
        players.forEach(player => {
            const state = playerStates[player.id];
            if (!state) return;

            const props = room.getPlayerDiscProperties(player.id);
            if (!props) return;

            const playerLogs = getPlayerLogs();
            const playerKey = playerAuth[player.id];
            if (!playerKey) {
                return;
            }

            // Procesar habilidades solo si la cuenta está vinculada
            if (playerLogs[playerKey]?.linked === true) {
                if (props.damping === defaults.kickingDamping || state.isRunning) {
                    const hasBlazingDash = playerKey && playerLogs[playerKey]?.voiddash && playerLogs[playerKey]?.equipped?.voiddash;

                    if (hasBlazingDash) {
                        if (props.damping === defaults.kickingDamping) {
                            if (!state.xPressStart) {
                                state.xPressStart = now;
                                state.consecutivePressTicks = 0;
                                console.log(`[DEBUG] ${player.name} (ID: ${player.id}) comenzó a presionar X. Start: ${state.xPressStart}`);
                            }

                            state.consecutivePressTicks = (state.consecutivePressTicks || 0) + 1;
                            const pressDuration = now - state.xPressStart;

                            if (pressDuration >= 700 && state.consecutivePressTicks >= 25 && !state.isRunning) {
                                if (state.slowdownUntil > now) {
                                    if (!state.lastCooldownMessage || now - state.lastCooldownMessage > 1000) {
                                        const timeLeft = Math.ceil((state.slowdownUntil - now) / 1000);
                                        room.sendAnnouncement(
                                            `[🌀] Faltan ${timeLeft} segundos para usar Void Dash, ${player.name}!`,
                                            player.id,
                                            0x4F78CE,
                                            "small",
                                            2
                                        );
                                        state.lastCooldownMessage = now;
                                    }
                                    state.xPressStart = 0;
                                    state.consecutivePressTicks = 0;
                                    return;
                                }
                                console.log(`[DEBUG] Activando Void Dash para ${player.name} (ID: ${player.id}). Duración: ${pressDuration} ms, Ticks: ${state.consecutivePressTicks}`);
                                run(player, state, props);
                                state.xPressStart = 0;
                                state.consecutivePressTicks = 0;
                            }
                        } else {
                            if (state.xPressStart > 0 && now - state.xPressStart > 30) {
                                console.log(`[DEBUG] ${player.name} (ID: ${player.id}) soltó X. Reiniciando xPressStart de ${state.xPressStart}, Ticks: ${state.consecutivePressTicks}`);
                                state.xPressStart = 0;
                                state.consecutivePressTicks = 0;
                            }
                        }
                    }
                } else {
                    if (state.xPressStart > 0) {
                        console.log(`[DEBUG] ${player.name} (ID: ${player.id}) no en damping. Reiniciando xPressStart de ${state.xPressStart}, Ticks: ${state.consecutivePressTicks}`);
                        state.xPressStart = 0;
                        state.consecutivePressTicks = 0;
                    }
                }
            }

            if (state.slowdownUntil <= now && state.slowdown > 0) {
                state.slowdown = 0;
                state.slowdownUntil = 0;
            }
        });
    } catch (error) {
        console.error("[ERROR] Fallo en onGameTick:", error.message);
        room.sendAnnouncement("[Server] Error interno en el tick del juego. Contactá al admin.", null, 0xFF5555, "small", 2);
    }
};

function getDate(){
    let data = new Date(),
    dia=data.getDate().toString().padStart(2, '0'),
    mes=(data.getMonth()+1).toString().padStart(2, '0'),
    ano=data.getFullYear(),
    horas=data.getHours().toString().padStart(2, '0'),
    minutos=data.getMinutes().toString().padStart(2, '0');
    return `${dia}-${mes}-${ano}-${horas}h${minutos}m`;
}

function gameStats() {
  const players = room.getPlayerList().filter(player => player.id !== 0);
  const redPlayers = players.filter(p=>p.team===1);
  const bluePlayers = players.filter(p=>p.team===2);
  const printRed = redPlayers.map(player=>player.name).join('\n');
  const printBlue = bluePlayers.map(player=>player.name).join('\n');

  let game = {
      formationRed: `${printRed}`,
      formationBlue: `${printBlue}`,
  };

  return game;
};
const recwebhookURL = "https://discord.com/api/webhooks/1350543900636479550/3ezZUpGm0HPrQ5HMIyNFu-ztSQm8MuCAS5rieNOa1alLlON9d7u_8Kjw4dPFfXw-xNLP"; // Cambia esto por tu URL real
function sendDiscordWebhook() {
    const form = new FormData();
    var stats = gameStats();

    // Calcular posesión del balón
    const totalKicks = teamKicks[1] + teamKicks[2];
    const redPossession = totalKicks > 0 ? ((teamKicks[1] / totalKicks) * 100).toFixed(1) : 0;
    const bluePossession = totalKicks > 0 ? ((teamKicks[2] / totalKicks) * 100).toFixed(1) : 0;

    // Determinar el ganador o empate
    let resultText = `🔴 **Rojo ${matchScore.red}** - **${matchScore.blue} Azul** 🔵`;
    let winnerText = "";
    if (matchScore.red > matchScore.blue) {
        winnerText = "🏆 **¡Victoria para el equipo Rojo!**";
    } else if (matchScore.blue > matchScore.red) {
        winnerText = "🏆 **¡Victoria para el equipo Azul!**";
    } else {
        winnerText = "🤝 **¡Empate emocionante!**";
    }

    var embed = {
        title: "⚽ FINAL DEL PARTIDO | HAXBALL 4v4 ⚽",
        description: `🎉 ¡Partidazo concluido! Aquí tienes los detalles: \n${winnerText}`,
        color: 0x058E3F,
        fields: [
            {
                name: "📊 **Resultado Final**",
                value: `${resultText}\n━━━━━━━━━━━━━━━`,
                inline: false
            },
            {
                name: "⚽ **Posesión del Balón**",
                value: `🔴 **Rojo**: ${redPossession}%  |  🔵 **Azul**: ${bluePossession}%\n━━━━━━━━━━━━━━━`,
                inline: false
            },
            {
                name: "🔴 **Equipo Rojo**",
                value: `🏃 ${stats.formationRed || "No disponible"}\n━━━━━━━━━━━━━━━`,
                inline: false
            },
            {
                name: "🔵 **Equipo Azul**",
                value: `🏃 ${stats.formationBlue || "No disponible"}\n━━━━━━━━━━━━━━━`,
                inline: false
            },
        ],
        footer: {
            text: "🎥 Mira la grabación completa arriba | ¡Gracias por jugar! 😎",
            icon_url: "https://media.discordapp.net/attachments/1342380089995694101/1350543184039776266/iconr.png"
        },
        timestamp: new Date().toISOString(),
        thumbnail: {
            url: "https://media.discordapp.net/attachments/1342380089995694101/1350543184039776266/iconr.png?ex=67d71eda&is=67d5cd5a&hm=53b4a4086dd80bafdc429be1038798a7caf15667264721061612f87e14b2c308&=&format=webp&quality=lossless"
        }
    };

    const payload = {
        username: "4v4 | Grabaciones 📹",
        avatar_url: "https://media.discordapp.net/attachments/1342380089995694101/1350543184039776266/iconr.png?ex=67d71eda&is=67d5cd5a&hm=53b4a4086dd80bafdc429be1038798a7caf15667264721061612f87e14b2c308&=&format=webp&quality=lossless",
        content: "🎬 **¡Nueva grabación disponible!** Mira cómo se vivió este partidazo:",
        embeds: [embed]
    };

    form.append("payload_json", JSON.stringify(payload));

    const fileData = room.stopRecording();
    if (fileData) {
        console.log("[DEBUG] Recording data obtained successfully, size:", fileData.length);
        form.append("file", Buffer.from(fileData), {
            filename: `HBReplay-${getDate()}.hbr2`,
            contentType: "text/plain"
        });
    } else {
        console.warn("[WARN] No recording data available from room.stopRecording()");
        // Optionally, still send the webhook without the file
    }

    axios.post(recwebhookURL, form, {
        headers: form.getHeaders()
    })
    .then(response => {
        console.log("[DEBUG] Webhook enviado con éxito");
    })
    .catch(error => {
        console.error("[ERROR] Error al enviar webhook:", error.message);
    });
}

let recordingSent = false; // Bandera para evitar envíos duplicados


// Temporizador para otorgar puntos a DTs cada 5 minutos
let dtPointsInterval = null;

// Función para otorgar puntos a los DTs
async function awardDTPoints() {
    if (modoTest) {
        console.log('[DEBUG] No se otorgan puntos a DTs en modo prueba.');
        return;
    }

    try {
        let playerLogs = await readPlayerLogs();
        const pointsToAdd = 1800;

        for (const dtName of DTS) {
            const dtPlayer = room.getPlayerList().find(p => p.name === dtName);
            if (!dtPlayer) {
                console.log(`[DEBUG] DT ${dtName} no encontrado en la sala.`);
                continue;
            }

            const playerKey = playerAuth[dtPlayer.id];
            if (!playerKey || !playerLogs[playerKey]) {
                console.log(`[DEBUG] No se encontraron datos para DT ${dtName} (ID: ${dtPlayer.id}).`);
                continue;
            }

            // Calcular multiplicador de mejoras
            const multiplier = getUpgradeMultiplier(playerKey, playerLogs);
            const totalPoints = Math.round(pointsToAdd * multiplier);

            // Actualizar puntos
            playerLogs[playerKey].points = (playerLogs[playerKey].points || 0) + totalPoints;
            console.log(`[DEBUG] ${totalPoints} puntos otorgados a DT ${dtName} (multiplicador: x${multiplier}).`);

            // Notificar al DT
            room.sendAnnouncement(
                `[Server] 🎉 ¡Has recibido ${totalPoints} puntos por ser DT!`,
                dtPlayer.id,
                0x87C38F,
                "small",
                2
            );
        }

        // Guardar los cambios
        await writePlayerLogs(playerLogs);
        console.log('[DEBUG] player_logs.json actualizado con nuevos puntos para DTs.');
    } catch (error) {
        console.error('[ERROR] Fallo al otorgar puntos a DTs:', error.message);
    }
}

// Función para iniciar el temporizador de puntos
function startDTPointsInterval() {
    if (dtPointsInterval) {
        clearInterval(dtPointsInterval);
        console.log('[DEBUG] Temporizador de puntos para DTs reiniciado.');
    }

    dtPointsInterval = setInterval(awardDTPoints, 420000); // 5 minutos = 300,000 ms
    console.log('[DEBUG] Temporizador de puntos para DTs iniciado.');
}

// Función para detener el temporizador de puntos
function stopDTPointsInterval() {
    if (dtPointsInterval) {
        clearInterval(dtPointsInterval);
        dtPointsInterval = null;
        console.log('[DEBUG] Temporizador de puntos para DTs detenido.');
    }
}
///BLACKLIST
const webhookURL = "https://discord.com/api/webhooks/1344734976733745203/KlhTLIKfby7wYB4GJ6LnF3-roZnyiHKAyFvOLIXs4lxp08vUdPhAA2W_1MwfcmdUFQNd"; // Cambia esto por tu URL real
async function enviarWebhookLlamadaAdmin(razonInicial, votantes, otrasRazones) {
    const form = new FormData();
    const embed = {
        title: "🚨 Llamada de Admin Requerida",
        description: `Se han recibido ${UMBRAL_LLAMADA_ADMIN} votos para llamar a un administrador.`,
        color: 0xFF0000,
        fields: [
            {
                name: "Razón Principal",
                value: razonInicial || "No se proporcionó una razón específica.",
                inline: false
            },
            {
                name: "Votantes",
                value: votantes.join(", ") || "Desconocido",
                inline: false
            },
            {
                name: "Otras Razones Reportadas",
                value: otrasRazones.length > 0 ? otrasRazones.join(", ") : "Ninguna adicional.",
                inline: false
            }
        ],
        footer: {
            text: "Sistema de Llamada de Admin"
        },
        timestamp: new Date().toISOString()
    };

    const payload = {
        content: "<@&1348423635446272113>", // Reemplaza con el ID del rol de moderadores
        username: "4v4 | Bot de Llamada",
        avatar_url: "https://cdn.discordapp.com/attachments/1342380089995694101/1349908002047787080/rhynostart.png",
        embeds: [embed]
    };

    form.append("payload_json", JSON.stringify(payload));

    try {
        await axios.post(URL_WEBHOOK_LLAMADA_ADMIN, form, {
            headers: form.getHeaders()
        });
        console.log("Webhook de llamada de admin enviado con éxito.");
        room.sendAnnouncement(
            "[Server] ✅ Se ha notificado a los moderadores. Por favor, espera su respuesta.",
            null,
            0x00FF00,
            "small",
            2
        );
    } catch (error) {
        console.error("Error al enviar webhook de llamada de admin:", error);
        room.sendAnnouncement(
            "[Server] ❌ Error al notificar a los moderadores. Intenta de nuevo.",
            null,
            0xFF0000,
            "small",
            2
        );
    }
}

function reiniciarLlamadaAdmin() {
    votosLlamadaAdmin = {};
    llamadaActiva = null;
    if (temporizadorLlamadaAdmin) {
        clearTimeout(temporizadorLlamadaAdmin);
        temporizadorLlamadaAdmin = null;
    }
    room.sendAnnouncement(
        "[Server] ⏰ La llamada de admin ha expirado (1 minuto sin suficientes votos).",
        null,
        0xFFA500,
        "small",
        2
    );
}
async function sendRoomOpenNotification(link) {

    if(hostabierto){
        const form = new FormData();

    const embed = {
        title: "✅ Sala Abierta",
        description: "¡La sala ya está lista! Unite con el link de abajo.",
        color: 0x00FF00,
        fields: [
            {
                name: "Link de la Sala",
                value: `[Click aquí para entrar](${link})`,
                inline: false
            }
        ],
        footer: {
            text: "Sistema de Notificaciones"
        },
        timestamp: new Date().toISOString()
    };

    const payload = {
        content: "<@&1348970744348016691>", // Mención a @HOST fuera del embed
        username: "4v4 | Room Bot",
        avatar_url: "https://cdn.discordapp.com/attachments/1342380089995694101/1349908002047787080/rhynostart.png?ex=67d4cf4b&is=67d37dcb&hm=23ba8da27acd6f6a3e2b58b0f75f5f3d3fb5dfcd97ba9876ea2320f631e138f2&format=webp&quality=lossless",
        embeds: [embed]
    };

    form.append("payload_json", JSON.stringify(payload));

    try {
        await axios.post(roomWebhookURL, form, {
            headers: form.getHeaders()
        });
        console.log(`Notificación de sala abierta enviada a Discord con link: ${link}`);
    } catch (error) {
        console.error("Error al enviar notificación de sala abierta a Discord:", error);
    }
    }
    
}
function manejarComandoGuiaDT(player) {
    room.sendAnnouncement(
        " GUÍA RÁPIDA PARA DTs \n" +
        "1. Escribe !dt para postularte como DT.\n" +
        "2. Escribe la <id> sola para seleccionar jugadores en la fase de selección.\n" +
        "3. Escribe la <id> sola para poner titulares al inicio del partido.\n" +
        "4. Usa !cmb <id_sale> <id_entra> para hacer cambios durante el juego.\n" +
        "5. ¡Lidera a tu equipo a la victoria y gana 4000 puntos!\n" +
        " Usa !ids para ver los jugadores disponibles.",
        player.id,
        0xFF9B54,
        "small",
        2
    );
}



function getNamesByIp(ip) {
    try {
      const data = fs.readFileSync(playersFilePath, 'utf8');
      const playerLogs = JSON.parse(data);
      
      // Buscar todas las entradas con la IP dada y extraer los nombres
      const names = Object.values(playerLogs)
        .filter(player => player.ip === ip)
        .map(player => player.name);
      
      return names.length > 0 ? names : ["Desconocido"];
    } catch (err) {
      console.error('Error al leer player_logs.json:', err);
      return ["Error al buscar nombres"];
    }
  }
  
  async function sendBlacklistNotification(ip, adminName) {
    const form = new FormData();
    
    // Obtener los nombres asociados a la IP
    const names = getNamesByIp(ip);
    const namesList = names.join(", ");
  
    const embed = {
      title: "🚫 Jugador Baneado - Blacklist Actualizada",
      color: 0xFF0000,
      fields: [
        {
          name: "Nombres Asociados",
          value: namesList,
          inline: false
        },
        {
          name: "Admin Responsable",
          value: adminName,
          inline: false
        }
      ],
      footer: {
        text: "Sistema de Blacklist"
      },
      timestamp: new Date().toISOString()
    };
  
    const payload = {
      username: "4v4 | Blacklist Bot",
      avatar_url: "https://media.discordapp.net/attachments/1344491691255791725/1344734759351488613/rhynoblacklist.png?ex=67c1fd56&is=67c0abd6&hm=d2dcda7e86617624fcf35cf983b84dfb02f066dd0d069f8504735fe79b0784af&=&format=webp&quality=lossless",
      embeds: [embed]
    };
  
    form.append("payload_json", JSON.stringify(payload));
  
    try {
      await axios.post(webhookURL, form, {
        headers: form.getHeaders()
      });
      console.log(`Notificación de blacklist enviada a Discord para IP: ${ip} con nombres: ${namesList}`);
    } catch (error) {
      console.error("Error al enviar notificación a Discord:", error);
    }
  }


  const roomWebhookURL = "https://discord.com/api/webhooks/1349908152476237924/4JiTs7leJTp9jLVn2LDCFF4tQVaGUELub9uGnrh4WbZiOb-XyC75S27SU88VR8AkYvU_";

 
  
// Declarar la bandera global al inicio del código, junto con otras variables globales
let hasSentRoomOpenNotification = false;

// Evento onRoomLink
});