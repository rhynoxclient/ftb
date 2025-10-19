let equipos = [];
        let partidas = [];
        let partidaActual = null;
        let fechaActual = new Date('2025-10-18');
        let fixture = [];
        let resultados = [];
        let selectedPlayer = null;
        let noticias = [];
        let mensajes = [];
        const diasPorFecha = 7;

        const equiposLigaArgentina = [
            "River Plate", "Boca Juniors", "Racing Club", "Independiente",
            "San Lorenzo", "Estudiantes", "Gimnasia LP", "Vélez Sarsfield",
            "Huracán", "Argentinos Juniors", "Lanús", "Banfield",
            "Defensa y Justicia", "Talleres", "Belgrano", "Instituto",
            "Rosario Central", "Newells", "Unión", "Colón",
            "Godoy Cruz", "Atlético Tucumán", "Central Córdoba", "Tigre",
            "Platense", "Sarmiento", "Barracas Central", "Deportivo Riestra"
        ];

        const nombres = ["González", "Rodríguez", "Fernández", "López", "Martínez", 
                        "García", "Pérez", "Sánchez", "Romero", "Torres",
                        "Álvarez", "Ramírez", "Flores", "Castro", "Moreno",
                        "Benítez", "Díaz", "Ruiz", "Rojas", "Medina"];

        const apellidos = ["Lionel", "Juan", "Carlos", "Diego", "Matías", "Lucas", 
                          "Santiago", "Pablo", "Nicolás", "Martín", "Franco",
                          "Ignacio", "Facundo", "Rodrigo", "Ezequiel", "Sebastián"];

        // SISTEMA DE ÁRBITROS
const arbitros = [
    { 
        nombre: 'Carlos Benítez', 
        estilo: 'Permisivo', 
        tarjetasFaciles: 0.2, 
        expulsionesFaciles: 0.1,
        descripcion: 'Deja jugar mucho, pocas tarjetas'
    },
    { 
        nombre: 'Martín Rodríguez', 
        estilo: 'Estricto', 
        tarjetasFaciles: 0.7, 
        expulsionesFaciles: 0.4,
        descripcion: 'Muy riguroso, saca tarjetas fácilmente'
    },
    { 
        nombre: 'Pablo Fernández', 
        estilo: 'Equilibrado', 
        tarjetasFaciles: 0.4, 
        expulsionesFaciles: 0.2,
        descripcion: 'Criterio balanceado, justo'
    },
    { 
        nombre: 'Diego Sánchez', 
        estilo: 'Variable', 
        tarjetasFaciles: 0.5, 
        expulsionesFaciles: 0.25,
        descripcion: 'Impredecible, puede tener días buenos o malos'
    },
    { 
        nombre: 'Javier López', 
        estilo: 'Permisivo', 
        tarjetasFaciles: 0.25, 
        expulsionesFaciles: 0.12,
        descripcion: 'Criterio amplio, buen árbitro'
    }
];

let arbitroActual = null;
let arbitroComprado = false;
let vecesComprado = 0; // Contador de veces que compraste al árbitro
let probabilidadDescubrimiento = 0; // Se acumula con cada compra

 function generarEquipos() {
    const nacionalidades = [
    { pais: 'Argentina', icono: '🇦🇷', climaPreferido: 'Templado', peso: 60 },
    { pais: 'Brasil', icono: '🇧🇷', climaPreferido: 'Calor', peso: 15 },
    { pais: 'Uruguay', icono: '🇺🇾', climaPreferido: 'Templado', peso: 10 },
    { pais: 'Paraguay', icono: '🇵🇾', climaPreferido: 'Calor', peso: 5 },
    { pais: 'Chile', icono: '🇨🇱', climaPreferido: 'Frío', peso: 3 },
    { pais: 'Bolivia', icono: '🇧🇴', climaPreferido: 'Altura', peso: 2 },
    { pais: 'Colombia', icono: '🇨🇴', climaPreferido: 'Calor', peso: 3 },
    { pais: 'Ecuador', icono: '🇪🇨', climaPreferido: 'Templado', peso: 2 }
];
    const climasPreferidos = {
        'Argentina': ['Soleado', 'Nublado'],
        'Brasil': ['Soleado', 'Lluvia'],
        'Uruguay': ['Nublado', 'Lluvia'],
        'Paraguay': ['Soleado'],
        'Bolivia': ['Soleado'],
        'Chile': ['Nublado'],
        'Colombia': ['Lluvia', 'Soleado'],
        'Ecuador': ['Soleado', 'Lluvia'],
        'Perú': ['Soleado']
    };
    
    const mentalidades = ['Frío', 'Equilibrado', 'Caliente', 'Provocador'];
    
    const cualidadesDisponibles = [
        { nombre: 'Buena Pegada', descripcion: 'Puede marcar golazos de la nada', icono: '🚀', probabilidad: 0.15 },
        { nombre: 'Provocador', descripcion: 'Puede hacer que rivales se expulsen', icono: '😈', probabilidad: 0.12 },
        { nombre: 'Líder Natural', descripcion: 'Mayor influencia en el vestuario', icono: '👑', probabilidad: 0.10 },
        { nombre: 'Goleador Nato', descripcion: 'Mayor efectividad en el área', icono: '⚽', probabilidad: 0.12 },
        { nombre: 'Muralla', descripcion: 'Muy difícil de superar en defensa', icono: '🛡️', probabilidad: 0.10 },
        { nombre: 'Visión de Juego', descripcion: 'Asistencias increíbles', icono: '👁️', probabilidad: 0.10 },
        { nombre: 'Motor', descripcion: 'Nunca se cansa', icono: '🔋', probabilidad: 0.12 },
        { nombre: 'Clutch', descripcion: 'Rinde mejor bajo presión', icono: '❄️', probabilidad: 0.08 },
        { nombre: 'Reflejo Felino', descripcion: 'Atajadas imposibles (solo POR)', icono: '🧤', probabilidad: 0.10 },
        { nombre: 'Velocista', descripcion: 'Velocidad extrema', icono: '⚡', probabilidad: 0.11 },
        { nombre: 'Guerrero', descripcion: 'Alta resistencia y determinación', icono: '🛡️💪', probabilidad: 0.20 },
        { nombre: 'Mala Definición', descripcion: 'Tiende a errar ocasiones claras', icono: '❌⚽', probabilidad: 0.15 }
    ];
    
    const estilosJuego = {
        'River Plate': {
            estilo: 'Tiki-Taka',
            descripcion: 'Juego de posesión, pases cortos y constante circulación del balón',
            valores: { posesion: 65, ataque: 70, defensa: 55, fisico: 50 }
        },
        'Boca Juniors': {
            estilo: 'Contraataque',
            descripcion: 'Defensa sólida y salidas rápidas al ataque',
            valores: { posesion: 45, ataque: 75, defensa: 70, fisico: 65 }
        },
        'Racing Club': {
            estilo: 'Juego Directo',
            descripcion: 'Verticalidad y búsqueda constante del arco rival',
            valores: { posesion: 50, ataque: 75, defensa: 60, fisico: 70 }
        },
        'Independiente': {
            estilo: 'Presión Alta',
            descripcion: 'Recuperación rápida en campo rival',
            valores: { posesion: 55, ataque: 65, defensa: 65, fisico: 75 }
        },
        'San Lorenzo': {
            estilo: 'Equilibrado',
            descripcion: 'Balance entre ataque y defensa',
            valores: { posesion: 55, ataque: 60, defensa: 65, fisico: 60 }
        }
    };
    
    const equiposGrandes = ['River Plate', 'Boca Juniors', 'Racing Club', 'Independiente'];
    
    equipos = equiposLigaArgentina.map((nombre, idx) => {
        const jugadores = [];
        
        const posiciones = [
            { pos: 'POR', cant: 2 },
            { pos: 'DFC', cant: 5 },
            { pos: 'MED', cant: 6 },
            { pos: 'DEL', cant: 5 }
        ];
        
        const esGrande = equiposGrandes.includes(nombre);
        
        posiciones.forEach(({ pos, cant }) => {
            for (let j = 0; j < cant; j++) {
                const nacionalidad = nacionalidades[Math.floor(Math.random() * nacionalidades.length)];
                const mentalidad = mentalidades[Math.floor(Math.random() * mentalidades.length)];
                const edad = Math.floor(Math.random() * 19) + 17; // 17-35 años
                
                let alturaMin, alturaMax;
                if (pos === 'POR' || pos === 'DFC') {
                    alturaMin = 175;
                    alturaMax = 195;
                } else if (pos === 'MED') {
                    alturaMin = 165;
                    alturaMax = 185;
                } else { // DEL
                    alturaMin = 170;
                    alturaMax = 190;
                }
                const altura = Math.floor(Math.random() * (alturaMax - alturaMin + 1)) + alturaMin;
                
                const cualidades = [];
                cualidadesDisponibles.forEach(cualidad => {
                    if (cualidad.nombre === 'Reflejo Felino' && pos !== 'POR') return;
                    if (cualidad.nombre === 'Goleador Nato' && pos === 'DEL' && Math.random() < 0.25) {
                        cualidades.push(cualidad);
                    } else if (cualidad.nombre === 'Muralla' && pos === 'DFC' && Math.random() < 0.20) {
                        cualidades.push(cualidad);
                    } else if (Math.random() < cualidad.probabilidad) {
                        cualidades.push(cualidad);
                    }
                });
                
                if (mentalidad === 'Provocador' && !cualidades.find(c => c.nombre === 'Provocador')) {
                    cualidades.push(cualidadesDisponibles.find(c => c.nombre === 'Provocador'));
                }
                
                if (!esGrande && edad <= 23 && Math.random() < 0.2) {
                    cualidades.push(cualidadesDisponibles.find(c => c.nombre === 'Mala Definición'));
                }
                
                if (!esGrande && Math.random() < 0.25) {
                    cualidades.push(cualidadesDisponibles.find(c => c.nombre === 'Guerrero'));
                }
                
                let baseStatMin = esGrande ? 70 : 50;
                let baseStatMax = esGrande ? 95 : 80;
                
                if (edad >= 30) {
                    baseStatMin = esGrande ? 75 : 55;
                    baseStatMax = esGrande ? 97 : 82;
                } else if (edad <= 22) {
                    baseStatMin = esGrande ? 65 : 45;
                    baseStatMax = esGrande ? 90 : 75;
                }
                
                const fisico = edad >= 32 ? Math.floor(Math.random() * 15) + 60 : Math.floor(Math.random() * 25) + 70;
                
                let potencial = 0;
                if (edad <= 23) {
                    potencial = !esGrande ? Math.floor(Math.random() * 21) + 75 : Math.floor(Math.random() * 16) + 70; // Pequeños: 75-95, grandes: 70-85
                }
                
                jugadores.push({
                    id: `${idx}-${jugadores.length}`,
                    nombre: `${apellidos[Math.floor(Math.random() * apellidos.length)]} ${nombres[Math.floor(Math.random() * nombres.length)]}`,
                    posicion: pos,
                    edad: edad,
                    altura: altura,
                    nacionalidad: nacionalidad,
                    velocidad: Math.floor(Math.random() * (baseStatMax - baseStatMin)) + baseStatMin,
                    regate: Math.floor(Math.random() * (baseStatMax - baseStatMin)) + baseStatMin,
                    tiro: Math.floor(Math.random() * (baseStatMax - baseStatMin)) + baseStatMin,
                    defensa: Math.floor(Math.random() * (baseStatMax - baseStatMin)) + baseStatMin,
                    pase: Math.floor(Math.random() * (baseStatMax - baseStatMin)) + baseStatMin,
                    fisico: fisico,
                    animo: 75,
                    mentalidad: mentalidad,
                    climasPreferidos: climasPreferidos[nacionalidad],
                    adaptacionClima: Math.floor(Math.random() * 30) + 50,
                    cualidades: cualidades.slice(0, Math.min(2, cualidades.length)),
                    autoridad: edad >= 30 ? Math.floor(Math.random() * 30) + 60 : Math.floor(Math.random() * 40) + 30,
                    partidosJugados: 0,
                    goles: 0,
                    asistencias: 0,
                    potencial: potencial,
                    madurez: edad <= 23 ? Math.floor(Math.random() * 21) + 30 : Math.floor(Math.random() * 31) + 70 // Jóvenes: 30-50, adultos: 70-100
                });
            }
        });
        
        const estiloEquipo = estilosJuego[nombre] || {
            estilo: ['Tiki-Taka', 'Contraataque', 'Juego Directo', 'Presión Alta', 'Equilibrado'][Math.floor(Math.random() * 5)],
            descripcion: 'Estilo de juego característico del equipo',
            valores: {
                posesion: Math.floor(Math.random() * 30) + 50,
                ataque: Math.floor(Math.random() * 30) + 50,
                defensa: Math.floor(Math.random() * 30) + 50,
                fisico: Math.floor(Math.random() * 30) + 50
            }
        };
        
        return {
            id: idx,
            nombre: nombre,
            jugadores: jugadores,
            starting11: jugadores.slice(0, 11).map(j => j.id),
            pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0,
            estiloJuego: estiloEquipo,
            tacticaActual: 'Equilibrada'
        };
    });

    const select = document.getElementById('equipoSelect');
    select.innerHTML = '<option value="">-- Selecciona un equipo --</option>';
    equipos.forEach(equipo => {
        const option = document.createElement('option');
        option.value = equipo.id;
        option.textContent = equipo.nombre;
        select.appendChild(option);
    });
    inicializarPresupuestos();
}

// Función para progresión de jugadores, incluyendo madurez, mentalidad y ánimo
function progresionJugadores() {
    equipos.forEach(equipo => {
        equipo.jugadores.forEach(jugador => {
            if (jugador.edad <= 23 && jugador.potencial > 0) {
                // Mejorar stats hacia potencial
                const stats = ['velocidad', 'regate', 'tiro', 'defensa', 'pase', 'fisico'];
                stats.forEach(stat => {
                    if (jugador[stat] < jugador.potencial) {
                        jugador[stat] = Math.min(jugador.potencial, jugador[stat] + Math.floor(Math.random() * 3) + 1); // +1-3
                    }
                });
                // Mejorar madurez, mentalidad y ánimo
                jugador.madurez = Math.min(100, jugador.madurez + Math.floor(Math.random() * 5) + 1); // +1-5 madurez
                if (jugador.madurez > 70 && Math.random() < 0.2) {
                    // Mejorar mentalidad si madurez alta
                    if (jugador.mentalidad === 'Caliente' || jugador.mentalidad === 'Provocador') {
                        jugador.mentalidad = Math.random() < 0.5 ? 'Equilibrado' : 'Frío';
                    }
                }
                jugador.animo = Math.min(100, jugador.animo + Math.floor(Math.random() * 3) + 1); // +1-3 ánimo
            } else if (jugador.edad >= 30 && Math.random() < 0.15) {
                // Empeorar stats para veteranos
                const stats = ['velocidad', 'regate', 'tiro', 'defensa', 'pase', 'fisico'];
                stats.forEach(stat => {
                    jugador[stat] = Math.max(40, jugador[stat] - Math.floor(Math.random() * 2) + 1); // -1-2
                });
            }
        });
    });
}


// MODIFICADO: Generar fixture asegurando que no siempre seamos local
function generarFixture() {
    fixture = [];
    const totalEquipos = equipos.length;
    const totalFechas = (totalEquipos - 1) * 2; // Ida y vuelta
    
    // Generar fixture de ida
    for (let fecha = 1; fecha <= totalEquipos - 1; fecha++) {
        const partidosFecha = [];
        for (let i = 0; i < totalEquipos / 2; i++) {
            const local = equipos[(fecha - 1 + i) % totalEquipos];
            let visitante = equipos[(totalEquipos - i + fecha - 1) % totalEquipos];
            
            while (local.id === visitante.id) {
                visitante = equipos[(visitante.id + 1) % totalEquipos];
            }
            
            partidosFecha.push({
                fecha: fecha,
                local: local.id,
                visitante: visitante.id,
                jugado: false,
                golesLocal: null,
                golesVisitante: null
            });
        }
        fixture.push(...partidosFecha);
    }
    
    // Generar fixture de vuelta (invertir local/visitante)
    for (let fecha = totalEquipos; fecha <= totalFechas; fecha++) {
        const fechaIda = fecha - (totalEquipos - 1);
        const partidosIda = fixture.filter(p => p.fecha === fechaIda);
        
        partidosIda.forEach(partidoIda => {
            fixture.push({
                fecha: fecha,
                local: partidoIda.visitante, // INVERTIR
                visitante: partidoIda.local, // INVERTIR
                jugado: false,
                golesLocal: null,
                golesVisitante: null
            });
        });
    }
}

        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(s => {
                s.classList.remove('active');
            });
            
            setTimeout(() => {
                const target = document.getElementById(screenId);
                if (target) {
                    target.classList.add('active');
                }
                
                if (screenId === 'cargarPartidaScreen') {
                    mostrarPartidas();
                }
            }, 100);
        }

        // MODIFICADO: Añadir tab de CLUB
function showTab(event, tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
    document.getElementById(tabName + 'Tab').style.display = 'block';
    
    if (tabName === 'inicio') mostrarInicio();
    if (tabName === 'noticias') mostrarNoticias();
    if (tabName === 'mensajes') mostrarMensajes();
    if (tabName === 'plantilla') mostrarPlantilla();
    if (tabName === 'fixture') mostrarFixture();
    if (tabName === 'tabla') mostrarTabla();
    if (tabName === 'mercado') mostrarMercado();
    if (tabName === 'club') mostrarClub(); // NUEVO
}

        function crearPartida() {
            const nombre = document.getElementById('nombreManager').value.trim();
            const equipoId = parseInt(document.getElementById('equipoSelect').value);

            if (!nombre) {
                alert('Por favor ingresa tu nombre');
                return;
            }

            if (isNaN(equipoId)) {
                alert('Por favor selecciona un equipo');
                return;
            }

            generarFixture();
            
            partidaActual = {
                id: Date.now(),
                manager: nombre,
                equipoId: equipoId,
                fechaInicial: new Date(fechaActual),
                fechaActual: new Date(fechaActual),
                equipos: equipos,
                fixture: fixture,
                resultados: []
            };

            partidas.push(partidaActual);
            
            document.getElementById('equipoNombre').textContent = equipos.find(e => e.id === equipoId).nombre;
            document.getElementById('fechaActual').textContent = fechaActual.toLocaleDateString('es-AR', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            });

            showScreen('juegoScreen');
            generarMensajesIniciales();
            agregarNoticia('general', '¡Comienza la temporada!', `${partidaActual.manager} es el nuevo DT de ${equipos.find(e => e.id === equipoId).nombre}. ¡Empieza la aventura!`);
            mostrarInicio();
            mostrarTabla();
        }

        // MODIFICADO: Mostrar inicio actualizando barra de vestuario
function mostrarInicio() {
    mostrarCalendario();
    mostrarProximoPartidoDestacado();
    actualizarBotonAvanzarDia();
    actualizarBarraVestuario();
}
        // NUEVA: Actualizar estado del botón "Avanzar Día"
        function actualizarBotonAvanzarDia() {
            const btnAvanzar = document.getElementById('btnAvanzarDia');
            const diasDesdeInicio = Math.floor((fechaActual - partidaActual.fechaInicial) / (1000 * 60 * 60 * 24));
            const fechaTorneoActual = Math.floor(diasDesdeInicio / diasPorFecha) + 1;
            const diaEnFechaActual = diasDesdeInicio % diasPorFecha;
            
            const nextPartido = fixture.find(p => !p.jugado && (p.local === partidaActual.equipoId || p.visitante === partidaActual.equipoId));
            
            if (nextPartido) {
                const diasHastaProximaFecha = nextPartido.fecha - fechaTorneoActual;
                const diasHastaPartido = (diasHastaProximaFecha * diasPorFecha) - diaEnFechaActual;
                
                if (diasHastaPartido === 0) {
                    // Hay partido hoy, desactivar el botón
                    btnAvanzar.disabled = true;
                    btnAvanzar.style.opacity = '0.5';
                    btnAvanzar.style.cursor = 'not-allowed';
                } else {
                    btnAvanzar.disabled = false;
                    btnAvanzar.style.opacity = '1';
                    btnAvanzar.style.cursor = 'pointer';
                }
            }
        }

        function mostrarCalendario() {
            const container = document.getElementById('calendarioDias');
            container.innerHTML = '';

            const diasSemana = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
            
            for (let i = 0; i < 7; i++) {
                const fecha = new Date(fechaActual);
                fecha.setDate(fecha.getDate() + i);
                
                const diaItem = document.createElement('div');
                diaItem.className = 'dia-item' + (i === 0 ? ' hoy' : '');
                diaItem.innerHTML = `
                    <div class="dia-nombre">${diasSemana[fecha.getDay()]}</div>
                    <div class="dia-numero">${fecha.getDate()}</div>
                `;
                container.appendChild(diaItem);
            }
        }

        function mostrarProximoPartidoDestacado() {
            const container = document.getElementById('proximoPartidoDestacado');
            
            const nextPartido = fixture.find(p => !p.jugado && (p.local === partidaActual.equipoId || p.visitante === partidaActual.equipoId));
            
            if (!nextPartido) {
                container.innerHTML = '<div class="empty-state">¡Temporada completada! 🏆</div>';
                return;
            }

            const local = equipos.find(e => e.id === nextPartido.local);
            const visitante = equipos.find(e => e.id === nextPartido.visitante);
            const esLocal = nextPartido.local === partidaActual.equipoId;
            
            // Calcular días restantes correctamente
            const diasDesdeInicio = Math.floor((fechaActual - partidaActual.fechaInicial) / (1000 * 60 * 60 * 24));
            const fechaTorneoActual = Math.floor(diasDesdeInicio / diasPorFecha) + 1;
            const diaEnFechaActual = diasDesdeInicio % diasPorFecha;
            
            const diasHastaProximaFecha = nextPartido.fecha - fechaTorneoActual;
            const diasHastaPartido = (diasHastaProximaFecha * diasPorFecha) - diaEnFechaActual;
            
            container.innerHTML = `
                <div class="proximo-partido-destacado">
                    <div class="proximo-partido-header">
                        <h3>⚽ Próximo Partido - Fecha ${nextPartido.fecha}</h3>
                        <div class="dias-restantes">
                            ${diasHastaPartido > 0 ? `En ${diasHastaPartido} días` : 'HOY'}
                        </div>
                    </div>
                    
                    <div class="partido-principal">
                        <div class="equipo-info local">
                            <div class="equipo-escudo">${esLocal ? '🏠' : '🛡️'}</div>
                            <div class="equipo-nombre">${local.nombre}</div>
                            <div class="equipo-stats">
                                ${local.pj} PJ | ${local.pts} PTS | Pos: ${getPosicionEnTabla(local.id)}
                            </div>
                        </div>
                        
                        <div class="vs-divider">
                            <div class="vs-text">VS</div>
                            <div class="partido-info-extra">
                                ${esLocal ? 'Local' : 'Visitante'}<br>
                                Liga Argentina
                            </div>
                        </div>
                        
                        <div class="equipo-info visitante">
                            <div class="equipo-escudo">${!esLocal ? '🏠' : '🛡️'}</div>
                            <div class="equipo-nombre">${visitante.nombre}</div>
                            <div class="equipo-stats">
                                ${visitante.pj} PJ | ${visitante.pts} PTS | Pos: ${getPosicionEnTabla(visitante.id)}
                            </div>
                        </div>
                    </div>
                    
                    ${diasHastaPartido === 0 ? `
                        <button class="boton-simular" onclick="simularMiPartido()">
                            ⚡ JUGAR PARTIDO
                        </button>
                    ` : ''}
                </div>
            `;
        }

        function getPosicionEnTabla(equipoId) {
            const equiposOrdenados = [...equipos].sort((a, b) => {
                if (b.pts !== a.pts) return b.pts - a.pts;
                return (b.gf - b.gc) - (a.gf - a.gc);
            });
            return equiposOrdenados.findIndex(e => e.id === equipoId) + 1;
        }
  // MODIFICADA: Avanzar día con fluctuación de ánimo
async function avanzarDia() {
    const modalAvance = document.createElement('div');
    modalAvance.id = 'modalAvanceDia';
    modalAvance.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); z-index: 2000; display: flex; align-items: center; justify-content: center;';
    modalAvance.innerHTML = `
        <div style="background: rgba(20, 30, 70, 0.9); backdrop-filter: blur(20px); padding: 50px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); max-width: 700px; width: 90%;">
            <h2 style="text-align: center; margin-bottom: 30px; font-size: 2em;">📅 Avanzando el día...</h2>
            <div id="eventosDia" style="min-height: 200px; max-height: 400px; overflow-y: auto;">
                <div style="text-align: center; padding: 40px;">
                    <div class="loader"></div>
                    <p style="color: #7c8ba1; margin-top: 20px;">Procesando eventos del día...</p>
                </div>
            </div>
            <div id="botonContinuar" style="text-align: center; margin-top: 30px; display: none;">
                <button class="btn btn-primary" onclick="cerrarModalAvanceDia()">Continuar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalAvance);
    
    await sleep(1500);
    
    fechaActual.setDate(fechaActual.getDate() + 1);
    document.getElementById('fechaActual').textContent = fechaActual.toLocaleDateString('es-AR', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    
    const eventosDelDia = await generarEventosDelDia();
    
    const container = document.getElementById('eventosDia');
    container.innerHTML = '';
    
    for (let evento of eventosDelDia) {
        await mostrarEventoDia(container, evento);
        await sleep(1200);
    }
    
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    equipo.jugadores.forEach(jugador => {
        if (jugador.animo < 75) {
            jugador.animo = Math.min(100, jugador.animo + 1);
        }
    });
    
    fluctuacionDiariaAnimo(equipo); // Añadido: fluctuación de ánimo
    
    const diasDesdeInicio = Math.floor((fechaActual - partidaActual.fechaInicial) / (1000 * 60 * 60 * 24));
    const fechaTorneo = Math.floor(diasDesdeInicio / diasPorFecha) + 1;
    
    const partidosSimulados = [];
    fixture.forEach(partido => {
        if (!partido.jugado && partido.fecha <= fechaTorneo) {
            if (partido.local !== partidaActual.equipoId && partido.visitante !== partidaActual.equipoId) {
                const resultado = simularPartidoSilencioso(partido);
                partidosSimulados.push(resultado);
            }
        }
    });
    // Al final de la función, si es fin de fecha, aplicar progresión
    if ((diasDesdeInicio + 1) % diasPorFecha === 0) { // Fin de fecha
        progresionJugadores();
        agregarNoticia('general', '📈 Progresión de Jugadores', 'Al final de la fecha, los jugadores jóvenes han mejorado y algunos veteranos muestran signos de declive.');
    }
    partidosSimulados.slice(-5).forEach(resultado => {
        agregarNoticia('resultado', `${resultado.local} ${resultado.golesLocal} - ${resultado.golesVisitante} ${resultado.visitante}`, 
            `Partido emocionante en la Fecha ${resultado.fecha}`);
    });
    actualizarMercadoEnAvanceDia();
    generarNoticiasAvanzadas();
    
    document.getElementById('botonContinuar').style.display = 'block';
}

// NUEVA: Cerrar modal de avance de día
function cerrarModalAvanceDia() {
    const modal = document.getElementById('modalAvanceDia');
    if (modal) modal.remove();
    
    mostrarInicio();
    mostrarTabla();
}
// Función para generar eventos del día, incluyendo evento de nervios para jóvenes
async function generarEventosDelDia() {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    const eventos = [];
    
    const diaSemana = fechaActual.getDay();
    const esFinDeSemana = diaSemana === 0 || diaSemana === 6;
    
    if (!esFinDeSemana && Math.random() < 0.8) {
        const tipoEntrenamiento = Math.random();
        
        if (tipoEntrenamiento < 0.5) {
            const jugadoresAfectados = equipo.jugadores.filter(() => Math.random() < 0.4).slice(0, 3);
            jugadoresAfectados.forEach(j => {
                j.animo = Math.min(100, j.animo + Math.floor(Math.random() * 5) + 3);
            });
            
            eventos.push({
                tipo: 'entrenamiento_positivo',
                icono: '💪',
                titulo: 'Entrenamiento productivo',
                descripcion: `Gran sesión de entrenamiento. ${jugadoresAfectados.map(j => j.nombre).join(', ')} mostraron excelente nivel.`,
                color: '#10b981',
                jugadores: jugadoresAfectados
            });
        } else if (tipoEntrenamiento < 0.65) {
            eventos.push({
                tipo: 'entrenamiento_normal',
                icono: '⚽',
                titulo: 'Entrenamiento de rutina',
                descripcion: 'Sesión de entrenamiento normal. El equipo trabajó en lo táctico.',
                color: '#7c8ba1'
            });
        } else {
            const jugadorLesionado = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
            jugadorLesionado.animo = Math.max(0, jugadorLesionado.animo - (15 * calcularMultiplicadorEdad(jugadorLesionado)));
            
            eventos.push({
                tipo: 'lesion',
                icono: '🤕',
                titulo: 'Molestias en el entrenamiento',
                descripcion: `${jugadorLesionado.nombre} salió con molestias del entrenamiento. No es nada grave pero su ánimo bajó.`,
                color: '#ef4444',
                jugador: jugadorLesionado
            });
        }
    }
    
    if (Math.random() < 0.3) {
        const jugadorAleatorio = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        const eventosPersonales = [
            {
                icono: '🎂',
                titulo: 'Cumpleaños familiar',
                descripcion: `${jugadorAleatorio.nombre} asistió al cumpleaños de su hermana. Llegó feliz al entrenamiento.`,
                color: '#10b981',
                efectoAnimo: 5
            },
            {
                icono: '🍔',
                titulo: 'Intoxicación alimentaria',
                descripcion: `${jugadorAleatorio.nombre} comió una hamburguesa en mal estado y pasó una noche terrible.`,
                color: '#ef4444',
                efectoAnimo: -10
            },
            {
                icono: '👶',
                titulo: 'Nacimiento en la familia',
                descripcion: `¡${jugadorAleatorio.nombre} se convirtió en padre! Está emocionado pero también cansado.`,
                color: '#3b82f6',
                efectoAnimo: 8
            },
            {
                icono: '🎮',
                titulo: 'Maratón de videojuegos',
                descripcion: `${jugadorAleatorio.nombre} se quedó hasta las 4AM jugando videojuegos. Llegó cansado al entrenamiento.`,
                color: '#eab308',
                efectoAnimo: -5
            },
            {
                icono: '📚',
                titulo: 'Estudiando para examen',
                descripcion: `${jugadorAleatorio.nombre} está terminando su carrera universitaria. Concentrado en sus estudios.`,
                color: '#3b82f6',
                efectoAnimo: 3
            },
            {
                icono: '🏠',
                titulo: 'Mudanza',
                descripcion: `${jugadorAleatorio.nombre} se mudó a un nuevo departamento. El cambio lo tiene algo estresado.`,
                color: '#7c8ba1',
                efectoAnimo: -3
            }
        ];
        
        const eventoPersonal = eventosPersonales[Math.floor(Math.random() * eventosPersonales.length)];
        jugadorAleatorio.animo = Math.max(0, Math.min(100, jugadorAleatorio.animo + (eventoPersonal.efectoAnimo * calcularMultiplicadorEdad(jugadorAleatorio))));
        
        eventos.push({
            tipo: 'personal',
            icono: eventoPersonal.icono,
            titulo: eventoPersonal.titulo,
            descripcion: eventoPersonal.descripcion,
            color: eventoPersonal.color,
            jugador: jugadorAleatorio
        });
    }
    
    if (esFinDeSemana && Math.random() < 0.4) {
        const jugadoresFiesteros = equipo.jugadores.filter(j => 
            j.mentalidad === 'Caliente' || j.mentalidad === 'Provocador'
        );
        
        if (jugadoresFiesteros.length > 0) {
            const jugadorFiestero = jugadoresFiesteros[Math.floor(Math.random() * jugadoresFiesteros.length)];
            
            const eventosFiesta = [
                {
                    icono: '🍾',
                    titulo: '¡De boliche!',
                    descripcion: `${jugadorFiestero.nombre} fue visto en un boliche hasta las 5AM. La directiva no está contenta.`,
                    efectoAnimo: -8
                },
                {
                    icono: '🎤',
                    titulo: 'Rumor de romance',
                    descripcion: `¡Hay rumores de que ${jugadorFiestero.nombre} salió con una cantante famosa! Las redes sociales estallan.`,
                    efectoAnimo: 5
                },
                {
                    icono: '🚗',
                    titulo: 'Auto nuevo',
                    descripcion: `${jugadorFiestero.nombre} se compró un auto deportivo de lujo y lo mostró en redes. Los hinchas opinan divididos.`,
                    efectoAnimo: 3
                },
                {
                    icono: '📸',
                    titulo: 'Foto comprometedora',
                    descripcion: `Se filtró una foto de ${jugadorFiestero.nombre} en una fiesta. El club le llamó la atención.`,
                    efectoAnimo: -12
                },
                {
                    icono: '🎉',
                    titulo: 'Fiesta privada',
                    descripcion: `${jugadorFiestero.nombre} organizó una fiesta en su casa. Algunos compañeros asistieron.`,
                    efectoAnimo: 2
                }
            ];
            
            const eventoFiesta = eventosFiesta[Math.floor(Math.random() * eventosFiesta.length)];
            jugadorFiestero.animo = Math.max(0, Math.min(100, jugadorFiestero.animo + (eventoFiesta.efectoAnimo * calcularMultiplicadorEdad(jugadorFiestero))));
            
            eventos.push({
                tipo: 'vida_nocturna',
                icono: eventoFiesta.icono,
                titulo: eventoFiesta.titulo,
                descripcion: eventoFiesta.descripcion,
                color: eventoFiesta.efectoAnimo > 0 ? '#3b82f6' : '#ef4444',
                jugador: jugadorFiestero
            });
        }
    }
    
    if (Math.random() < 0.15) {
        const jugador1 = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        let jugador2 = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        while (jugador2.id === jugador1.id) {
            jugador2 = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        }
        
        const tipoConflicto = Math.random();
        
        if (tipoConflicto < 0.4) {
            jugador1.animo = Math.max(0, jugador1.animo - (8 * calcularMultiplicadorEdad(jugador1)));
            jugador2.animo = Math.max(0, jugador2.animo - (8 * calcularMultiplicadorEdad(jugador2)));
            
            eventos.push({
                tipo: 'conflicto',
                icono: '😠',
                titulo: 'Pelea en el vestuario',
                descripcion: `${jugador1.nombre} y ${jugador2.nombre} tuvieron una fuerte discusión en el vestuario. Hubo que separarlos.`,
                color: '#ef4444',
                jugadores: [jugador1, jugador2]
            });
        } else if (tipoConflicto < 0.7) {
            jugador1.animo = Math.max(0, jugador1.animo - (3 * calcularMultiplicadorEdad(jugador1)));
            jugador2.animo = Math.max(0, jugador2.animo - (3 * calcularMultiplicadorEdad(jugador2)));
            
            eventos.push({
                tipo: 'tension',
                icono: '😐',
                titulo: 'Roces en el entrenamiento',
                descripcion: `${jugador1.nombre} y ${jugador2.nombre} tuvieron un cruce de palabras durante el entrenamiento.`,
                color: '#eab308',
                jugadores: [jugador1, jugador2]
            });
        } else {
            jugador1.animo = Math.min(100, jugador1.animo + 5);
            jugador2.animo = Math.min(100, jugador2.animo + 5);
            
            eventos.push({
                tipo: 'amistad',
                icono: '🤝',
                titulo: 'Buena química',
                descripcion: `${jugador1.nombre} y ${jugador2.nombre} están trabajando muy bien juntos. La química es evidente.`,
                color: '#10b981',
                jugadores: [jugador1, jugador2]
            });
        }
    }
    
    if (Math.random() < 0.2) {
        const veteranos = equipo.jugadores.filter(j => j.edad >= 30 && j.autoridad >= 70).sort((a, b) => b.autoridad - a.autoridad);
        
        if (veteranos.length > 0) {
            const capitan = veteranos[0];
            const jugadoresMotivados = equipo.jugadores.filter(() => Math.random() < 0.5).slice(0, 4);
            
            jugadoresMotivados.forEach(j => {
                j.animo = Math.min(100, j.animo + 6);
            });
            
            eventos.push({
                tipo: 'liderazgo',
                icono: '👑',
                titulo: 'Charla del capitán',
                descripcion: `${capitan.nombre} reunió al equipo para una charla motivacional. Varios jugadores levantaron el ánimo.`,
                color: '#10b981',
                jugadores: [capitan, ...jugadoresMotivados]
            });
        }
    }
    
    if (Math.random() < 0.25) {
        const jugadorDestacado = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        
        const eventosPrensa = [
            {
                icono: '📰',
                titulo: 'Elogio en los medios',
                descripcion: `Los medios destacan el nivel de ${jugadorDestacado.nombre}: "Está en su mejor momento"`,
                efectoAnimo: 8,
                color: '#10b981'
            },
            {
                icono: '📉',
                titulo: 'Crítica feroz',
                descripcion: `La prensa destroza a ${jugadorDestacado.nombre}: "No está a la altura del club"`,
                efectoAnimo: -10,
                color: '#ef4444'
            },
            {
                icono: '🎙️',
                titulo: 'Entrevista polémica',
                descripcion: `${jugadorDestacado.nombre} dio declaraciones polémicas en una entrevista. Generó controversia.`,
                efectoAnimo: -5,
                color: '#eab308'
            },
            {
                icono: '⭐',
                titulo: 'Premio individual',
                descripcion: `${jugadorDestacado.nombre} fue elegido como uno de los mejores jugadores de la fecha pasada.`,
                efectoAnimo: 10,
                color: '#10b981'
            }
        ];
        
        const eventoPrensa = eventosPrensa[Math.floor(Math.random() * eventosPrensa.length)];
        jugadorDestacado.animo = Math.max(0, Math.min(100, jugadorDestacado.animo + (eventoPrensa.efectoAnimo * calcularMultiplicadorEdad(jugadorDestacado))));
        
        eventos.push({
            tipo: 'prensa',
            icono: eventoPrensa.icono,
            titulo: eventoPrensa.titulo,
            descripcion: eventoPrensa.descripcion,
            color: eventoPrensa.color,
            jugador: jugadorDestacado
        });
    }
    
    if (Math.random() < 0.1) {
        const jugadorAfortunado = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        
        const eventosRaros = [
            {
                icono: '🎰',
                titulo: '¡Ganó la lotería!',
                descripcion: `${jugadorAfortunado.nombre} ganó un premio menor en la lotería. Está eufórico.`,
                efectoAnimo: 15,
                color: '#10b981'
            },
            {
                icono: '🚓',
                titulo: 'Multa de tránsito',
                descripcion: `${jugadorAfortunado.nombre} fue multado por exceso de velocidad. Está molesto.`,
                efectoAnimo: -6,
                color: '#ef4444'
            },
            {
                icono: '🐕',
                titulo: 'Nueva mascota',
                descripcion: `${jugadorAfortunado.nombre} adoptó un perro. Las fotos en redes derritieron corazones.`,
                efectoAnimo: 8,
                color: '#10b981'
            },
            {
                icono: '✈️',
                titulo: 'Vuelo cancelado',
                descripcion: `${jugadorAfortunado.nombre} tenía un viaje familiar planificado pero su vuelo se canceló.`,
                efectoAnimo: -7,
                color: '#ef4444'
            },
            {
                icono: '🎬',
                titulo: 'Aparición en TV',
                descripcion: `${jugadorAfortunado.nombre} hizo un cameo en un programa de TV. Se volvió viral.`,
                efectoAnimo: 10,
                color: '#3b82f6'
            },
            {
                icono: '☕',
                titulo: 'Cafetería favorita cerró',
                descripcion: `Cerraron la cafetería favorita de ${jugadorAfortunado.nombre}. Está triste.`,
                efectoAnimo: -2,
                color: '#7c8ba1'
            }
        ];
        
        const eventoRaro = eventosRaros[Math.floor(Math.random() * eventosRaros.length)];
        jugadorAfortunado.animo = Math.max(0, Math.min(100, jugadorAfortunado.animo + (eventoRaro.efectoAnimo * calcularMultiplicadorEdad(jugadorAfortunado))));
        
        eventos.push({
            tipo: 'raro',
            icono: eventoRaro.icono,
            titulo: eventoRaro.titulo,
            descripcion: eventoRaro.descripcion,
            color: eventoRaro.color,
            jugador: jugadorAfortunado
        });
    }
    
    if (Math.random() < 0.15) {
        const jugadoresJovenes = equipo.jugadores.filter(j => j.edad <= 23 && j.madurez < 50);
        if (jugadoresJovenes.length > 0) {
            const jugadorNervioso = jugadoresJovenes[Math.floor(Math.random() * jugadoresJovenes.length)];
            jugadorNervioso.animo = Math.max(0, jugadorNervioso.animo - (10 * calcularMultiplicadorEdad(jugadorNervioso)));
            
            eventos.push({
                tipo: 'nervios',
                icono: '😢',
                titulo: 'Nervios en el vestuario',
                descripcion: `${jugadorNervioso.nombre} rompió en llanto por los nervios antes del entrenamiento. La juventud pesa.`,
                color: '#ef4444',
                jugador: jugadorNervioso
            });
        }
    }
    
    if (eventos.length === 0) {
        eventos.push({
            tipo: 'tranquilo',
            icono: '😌',
            titulo: 'Día tranquilo',
            descripcion: 'Un día sin novedades. El equipo descansó y se preparó para lo que viene.',
            color: '#7c8ba1'
        });
    }
    
    return eventos;
}
function calcularEstrellas(equipo) {
    const avgRating = equipo.jugadores.reduce((sum, j) => sum + (j.velocidad + j.regate + j.tiro + j.defensa + j.pase + j.fisico) / 6, 0) / equipo.jugadores.length;
    return Math.min(5, Math.max(1, Math.round((avgRating - 50) / 10))); // 1-5 estrellas
}
// Inicializa presupuestos si no existe
function inicializarPresupuestos() {
    equipos.forEach(equipo => {
        if (!equipo.presupuesto) {
            equipo.presupuesto = Math.floor(Math.random() * 50000000) + 10000000; // 10M - 60M
        }
    });
}

// Genera grid de equipos
function mostrarSelectorEquipos() {
    const grid = document.getElementById('equiposGrid');
    grid.innerHTML = '';
    let equipoSeleccionado = null;
    
    equipos.forEach(equipo => {
        const estrellas = calcularEstrellas(equipo);
        const momentoEco = equipo.presupuesto > 30000000 ? 'Excelente' : equipo.presupuesto > 20000000 ? 'Bueno' : 'Limitado';
        const claseEco = `economico-${momentoEco.toLowerCase()}`;
        
        const card = document.createElement('div');
        card.className = 'equipo-card';
        card.innerHTML = `
            <div class="equipo-card-content">
                <div class="menu-card-icon" style="font-size: 5em; margin-bottom: 20px;">⚽</div> <!-- Puedes cambiar por logo real -->
                <h2>${equipo.nombre}</h2>
                <div class="estrellas">${'★'.repeat(estrellas)}${'☆'.repeat(5 - estrellas)}</div>
                <p>Presupuesto: $${(equipo.presupuesto / 1000000).toFixed(1)}M</p>
                <p>Estilo: ${equipo.estiloJuego.estilo}</p>
                <p>Momento económico: <span class="${claseEco}">${momentoEco}</span></p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.equipo-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            equipoSeleccionado = equipo.id;
            document.getElementById('btnComenzar').disabled = false;
        });
        
        grid.appendChild(card);
    });
    
    // Botón comenzar
    document.getElementById('btnComenzar').onclick = () => {
        const nombre = document.getElementById('nombreManager').value.trim();
        if (!nombre || equipoSeleccionado === null) {
            alert('Ingresa nombre y selecciona equipo');
            return;
        }
        crearPartidaConIntro(nombre, equipoSeleccionado);
    };
}
// Modificar showScreen para cargar el selector
const originalShowScreen = showScreen;
showScreen = function(screenId) {
    originalShowScreen.apply(this, arguments);
    if (screenId === 'nuevaPartidaScreen') {
        mostrarSelectorEquipos();
    }
};

// Nueva función para crear partida con intro (reemplaza crearPartida)
function crearPartidaConIntro(nombre, equipoId) {
    // Lógica original de crearPartida...
    generarFixture();
    
    partidaActual = {
        id: Date.now(),
        manager: nombre,
        equipoId: equipoId,
        fechaInicial: new Date(fechaActual),
        fechaActual: new Date(fechaActual),
        equipos: equipos,
        fixture: fixture,
        resultados: []
    };

    partidas.push(partidaActual);
    
    // Intro modal (estilo FIFA: narrativo + loader)
    const introModal = document.createElement('div');
    introModal.className = 'modal';
    introModal.style.display = 'block';
    introModal.innerHTML = `
        <div class="modal-content" style="max-width: 800px; text-align: center; animation: fadeIn 1s;">
            <h2 style="font-size: 3em; margin-bottom: 30px;">¡Bienvenido al Modo Carrera!</h2>
            <div style="font-size: 1.5em; margin-bottom: 20px;">${nombre}, nuevo DT de</div>
            <div style="font-size: 2.5em; font-weight: 900; margin-bottom: 30px; color: #3b82f6;">${equipos.find(e => e.id === equipoId).nombre}</div>
            <p style="font-size: 1.2em; margin-bottom: 40px; line-height: 1.6;">
                La prensa está expectante, los hinchas ilusionados. <br>
                ¿Podrás llevar al equipo a la gloria en la Liga Argentina? ¡Que comience la temporada!
            </p>
            <div class="loader" style="margin: 0 auto 30px;"></div>
            <p style="color: #7c8ba1;">Cargando el vestuario y la pretemporada...</p>
        </div>
    `;
    document.body.appendChild(introModal);
    
    // Cierra después de 5 segundos y entra al juego
    setTimeout(() => {
        introModal.remove();
        document.getElementById('equipoNombre').textContent = equipos.find(e => e.id === equipoId).nombre;
        document.getElementById('fechaActual').textContent = fechaActual.toLocaleDateString('es-AR', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });

        showScreen('juegoScreen');
        generarMensajesIniciales();
        agregarNoticia('general', '¡Comienza la temporada!', `${partidaActual.manager} es el nuevo DT de ${equipos.find(e => e.id === equipoId).nombre}. ¡Empieza la aventura!`);
        mostrarInicio();
        mostrarTabla();
    }, 5000);
}



// NUEVA: Mostrar evento individual del día con animación
async function mostrarEventoDia(container, evento) {
    const eventoDiv = document.createElement('div');
    eventoDiv.style.cssText = `
        padding: 20px;
        background: rgba(20, 30, 70, 0.4);
        border-radius: 12px;
        border-left: 4px solid ${evento.color};
        margin-bottom: 16px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    eventoDiv.innerHTML = `
        <div style="display: flex; gap: 16px; align-items: start;">
            <div style="font-size: 3em; line-height: 1;">${evento.icono}</div>
            <div style="flex: 1;">
                <h4 style="color: ${evento.color}; margin-bottom: 8px; font-size: 1.2em;">${evento.titulo}</h4>
                <p style="color: #a8b3cf; line-height: 1.6; margin-bottom: 12px;">${evento.descripcion}</p>
                ${evento.jugador ? `
                    <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: rgba(59, 130, 246, 0.1); border-radius: 6px;">
                        <span style="font-size: 0.9em; color: #7c8ba1;">Jugador afectado:</span>
                        <span style="font-weight: 700; color: #fff;">${evento.jugador.nombre}</span>
                        <span style="margin-left: auto; padding: 4px 12px; background: ${evento.jugador.animo >= 75 ? '#10b981' : evento.jugador.animo >= 50 ? '#eab308' : '#ef4444'}; border-radius: 6px; font-size: 0.85em; font-weight: 700;">
                            Ánimo: ${evento.jugador.animo}
                        </span>
                    </div>
                ` : ''}
                ${evento.jugadores ? `
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                        ${evento.jugadores.map(j => `
                            <span style="padding: 6px 12px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; font-size: 0.85em;">
                                ${j.nombre}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    container.appendChild(eventoDiv);
    
    // Animar entrada
    await sleep(50);
    eventoDiv.style.opacity = '1';
    eventoDiv.style.transform = 'translateY(0)';
    
    // Agregar noticia si es relevante
    if (evento.tipo !== 'tranquilo' && evento.tipo !== 'entrenamiento_normal') {
        agregarNoticia('general', evento.titulo, evento.descripcion);
    }
    
    // Agregar mensaje si es muy importante
    if (['conflicto', 'lesion', 'vida_nocturna'].includes(evento.tipo) && evento.jugador) {
        agregarMensaje(
            'Director Deportivo',
            'Directiva',
            '📋',
            `${partidaActual.manager}, necesitamos que estés al tanto de la situación con ${evento.jugador.nombre}. ${evento.descripcion}`
        );
    }
}


        // NUEVA FUNCIÓN: Simular MI partido con EVENTOS ANIMADOS y CLIMA
        // NUEVA: Generar mensajes iniciales
        function generarMensajesIniciales() {
            const equipo = equipos.find(e => e.id === partidaActual.equipoId);
            agregarMensaje(
                'Director Deportivo',
                'Dirección Técnica',
                '👔',
                `Bienvenido ${partidaActual.manager}! Estamos emocionados de tenerte como DT de ${equipo.nombre}. Esperamos una gran temporada!`
            );
            agregarMensaje(
                'Capitán del equipo',
                'Jugador',
                '⚽',
                `El equipo está listo para darlo todo esta temporada. Confían en tu liderazgo!`
            );
        }

        // NUEVA: Generar mensajes realistas post-partido
        function generarMensajesPostPartido(esVictoria, esEmpate, clima, golesLocal, golesVisitante, local, visitante) {
            const equipoJugador = equipos.find(e => e.id === partidaActual.equipoId);
            const jugadores = equipoJugador.jugadores;
            
            // Mensajes según clima
            if (clima.nombre === 'Lluvia') {
                // Si perdimos o empatamos con lluvia
                if (!esVictoria) {
                    const jugadorAleatorio = jugadores[Math.floor(Math.random() * jugadores.length)];
                    const mensajesLluvia = [
                        `Perdón ${partidaActual.manager}, no fue mi día. Simplemente no estoy acostumbrado a este tipo de clima, la cancha estaba muy pesada.`,
                        `Disculpá, con la lluvia no pude rendir al 100%. La pelota se me escapaba todo el tiempo, necesito trabajar en eso.`,
                        `Lo siento mucho, DT. Jugar con lluvia me complica bastante, no pude hacer las jugadas que tenía pensadas.`,
                        `Fue muy difícil hoy. La cancha mojada me jugó en contra, pero voy a entrenar más para estos climas.`
                    ];
                    agregarMensaje(jugadorAleatorio.nombre, 'Jugador', '😔', mensajesLluvia[Math.floor(Math.random() * mensajesLluvia.length)]);
                } else {
                    // Si ganamos con lluvia
                    const jugadorAleatorio = jugadores[Math.floor(Math.random() * jugadores.length)];
                    const mensajesVictoriaLluvia = [
                        `¡Qué partido, DT! A pesar de la lluvia supimos adaptarnos. Esto demuestra la calidad del equipo.`,
                        `La lluvia no fue excusa para nadie. Gran victoria, esto habla del carácter del plantel.`,
                        `Jugamos inteligente bajo la lluvia. El equipo mostró personalidad hoy.`
                    ];
                    agregarMensaje(jugadorAleatorio.nombre, 'Jugador', '💪', mensajesVictoriaLluvia[Math.floor(Math.random() * mensajesVictoriaLluvia.length)]);
                }
            }
            
            // Mensajes según resultado
            if (esVictoria) {
                const diferenciaGoles = Math.abs(golesLocal - golesVisitante);
                
                if (diferenciaGoles >= 3) {
                    // Goleada
                    agregarMensaje('Capitán del equipo', 'Jugador', '⚽', `¡Tremenda goleada! Así se juega, el equipo está en un gran momento. Seguimos por este camino.`);
                    agregarMensaje('Director Deportivo', 'Directiva', '👔', `Excelente resultado, ${partidaActual.manager}. Esta es la clase de actuaciones que esperamos. La dirigencia está muy contenta.`);
                    
                    // Jugador figura
                    const jugadorFigura = jugadores[Math.floor(Math.random() * 11)]; // De los titulares
                    agregarMensaje(jugadorFigura.nombre, 'Jugador', '⭐', `Fue un partido perfecto. Me sentí muy cómodo con el esquema táctico, pude jugar libremente.`);
                } else {
                    // Victoria ajustada
                    agregarMensaje('Capitán del equipo', 'Jugador', '⚽', `Victoria importante, aunque fue complicado. Hay cosas para mejorar pero lo importante son los 3 puntos.`);
                    agregarMensaje('Entrenador Asistente', 'Cuerpo Técnico', '📋', `Buen trabajo, DT. El equipo supo sufrir cuando tuvo que sufrir. Defensivamente estuvimos sólidos.`);
                }
                
                // Mensaje random de hincha
                const mensajesHinchas = [
                    `¡VAMOS! Así se juega, estos colores se defienden con el alma. ¡Dale campeón!`,
                    `Excelente partido, DT. Esperamos que siga esta racha. ¡Los hinchas estamos con vos!`,
                    `¡QUÉ PARTIDAZO! Esto es lo que queremos ver. ¡Vamos por el campeonato!`
                ];
                setTimeout(() => {
                    agregarMensaje('Hincha del club', 'Aficionado', '🎉', mensajesHinchas[Math.floor(Math.random() * mensajesHinchas.length)]);
                }, 500);
                
            } else if (esEmpate) {
                const esLocal = local.id === partidaActual.equipoId;
                
                if (esLocal) {
                    // Empatamos de local
                    agregarMensaje('Director Deportivo', 'Directiva', '😐', `Un empate de local no es lo ideal, ${partidaActual.manager}. Teníamos que ganar en casa. Necesitamos sumar de a tres.`);
                    
                    const jugadorFrustrado = jugadores[Math.floor(Math.random() * jugadores.length)];
                    const mensajesEmpateLocal = [
                        `Se nos escapó, DT. De local teníamos que ganarlo. El equipo está frustrado, merecíamos más.`,
                        `No puede ser... jugando en casa teníamos que sumar los 3 puntos. Nos faltó contundencia.`,
                        `Duele empatar de local. Creamos situaciones pero no las pudimos convertir.`
                    ];
                    agregarMensaje(jugadorFrustrado.nombre, 'Jugador', '😤', mensajesEmpateLocal[Math.floor(Math.random() * mensajesEmpateLocal.length)]);
                } else {
                    // Empatamos de visitante
                    agregarMensaje('Capitán del equipo', 'Jugador', '⚽', `Un punto de visitante siempre sirve. No jugamos bien pero rescatamos el empate.`);
                    agregarMensaje('Entrenador Asistente', 'Cuerpo Técnico', '📋', `Punto importante afuera. Aunque claramente podemos jugar mejor, hay que valorar sumar de visitante.`);
                }
                
            } else {
                // Derrota
                const diferenciaGoles = Math.abs(golesLocal - golesVisitante);
                
                if (diferenciaGoles >= 3) {
                    // Goleada en contra
                    agregarMensaje('Director Deportivo', 'Directiva', '😠', `Esto es inaceptable, ${partidaActual.manager}. Una goleada así no puede volver a pasar. Esperamos una respuesta inmediata.`);
                    
                    const jugadorPreocupado = jugadores[Math.floor(Math.random() * jugadores.length)];
                    const mensajesGoleada = [
                        `Perdón DT, jugamos muy mal. Nos superaron en todo. Tenemos que dar vuelta esta situación cuanto antes.`,
                        `Esto duele muchísimo. No estuvimos a la altura, fue un papelón. Pido disculpas a la gente.`,
                        `No tengo palabras. Nos hicieron un baile. Hay que ponerse las pilas urgente.`
                    ];
                    agregarMensaje(jugadorPreocupado.nombre, 'Jugador', '😞', mensajesGoleada[Math.floor(Math.random() * mensajesGoleada.length)]);
                    
                    // Hincha enojado
                    setTimeout(() => {
                        agregarMensaje('Hincha del club', 'Aficionado', '😡', `¿Qué fue esto? ¡Vergonzoso! Tienen que poner más huevos en la cancha. Así no se puede ganar nada.`);
                    }, 500);
                    
                } else {
                    // Derrota ajustada
                    agregarMensaje('Capitán del equipo', 'Jugador', '⚽', `Duele perder, pero estuvimos cerca. Hay que levantar la cabeza, quedan muchos partidos.`);
                    
                    const jugadorAutocritico = jugadores[Math.floor(Math.random() * jugadores.length)];
                    const mensajesDerrotaAjustada = [
                        `Se nos escapó por detalles. Trabajamos bien pero nos faltó suerte en el área. El próximo lo ganamos.`,
                        `Estuvimos al nivel pero no alcanzó. Hay que seguir trabajando, el equipo está bien.`,
                        `Por poco, DT. Nos faltó eficacia, pero el funcionamiento estuvo. A seguir.`
                    ];
                    agregarMensaje(jugadorAutocritico.nombre, 'Jugador', '💬', mensajesDerrotaAjustada[Math.floor(Math.random() * mensajesDerrotaAjustada.length)]);
                    
                    agregarMensaje('Entrenador Asistente', 'Cuerpo Técnico', '📋', `Resultado adverso pero el equipo compitió. Hay cosas rescatables, solo faltó concretar las chances.`);
                }
            }
            
            // Mensajes adicionales según contexto
            setTimeout(() => {
                // Mensaje de prensa
                if (esVictoria) {
                    const mensajesPrensa = [
                        `La prensa destaca tu trabajo: "${partidaActual.manager} tiene al equipo jugando de memoria. Gran victoria."`,
                        `Los medios elogian: "Actuación sólida bajo la conducción de ${partidaActual.manager}."`,
                        `Titular en los diarios: "${equipoJugador.nombre} juega cada vez mejor con ${partidaActual.manager} al mando."`
                    ];
                    agregarMensaje('Medios de Comunicación', 'Prensa', '📰', mensajesPrensa[Math.floor(Math.random() * mensajesPrensa.length)]);
                } else if (!esEmpate) {
                    const mensajesPrensa = [
                        `La prensa critica: "¿Qué le pasa a ${equipoJugador.nombre}? ${partidaActual.manager} debe encontrar soluciones."`,
                        `Los medios cuestionan: "Derrota preocupante. ${partidaActual.manager} necesita corregir urgente."`,
                        `Debate en los programas: "¿Es ${partidaActual.manager} el DT indicado para este proyecto?"`
                    ];
                    agregarMensaje('Medios de Comunicación', 'Prensa', '📰', mensajesPrensa[Math.floor(Math.random() * mensajesPrensa.length)]);
                }
            }, 1000);
        }        // NUEVA FUNCIÓN: Simular MI partido con EVENTOS ANIMADOS y CLIMA
 // MODIFICADO: Actualizar contador de partidos jugados

// NUEVA: Mostrar perfil del árbitro con opción de compra
async function mostrarPerfilArbitro(partido) {
    return new Promise((resolve) => {
        const equipo = equipos.find(e => e.id === partidaActual.equipoId);
        const costoCompra = 500000; // $500k
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <h2 style="text-align: center; margin-bottom: 30px;">🧑‍⚖️ Árbitro del Partido</h2>
                
                <div style="background: rgba(20, 30, 70, 0.5); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 4em; margin-bottom: 10px;">👨‍⚖️</div>
                        <h3 style="color: #3b82f6; margin-bottom: 5px;">${arbitroActual.nombre}</h3>
                        <div style="display: inline-block; padding: 6px 16px; background: ${arbitroActual.estilo === 'Permisivo' ? '#10b981' : arbitroActual.estilo === 'Estricto' ? '#ef4444' : '#eab308'}; border-radius: 20px; font-size: 0.9em; font-weight: 700;">
                            ${arbitroActual.estilo}
                        </div>
                    </div>
                    
                    <p style="text-align: center; color: #a8b3cf; font-size: 1.1em; line-height: 1.6; margin-bottom: 20px;">
                        "${arbitroActual.descripcion}"
                    </p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;">
                        <div style="background: rgba(59, 130, 246, 0.1); padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 0.85em; color: #7c8ba1; margin-bottom: 4px;">Tarjetas</div>
                            <div style="font-size: 1.5em; font-weight: 700; color: #eab308;">
                                ${arbitroActual.tarjetasFaciles < 0.3 ? '🟨' : arbitroActual.tarjetasFaciles < 0.6 ? '🟨🟨' : '🟨🟨🟨'}
                            </div>
                        </div>
                        <div style="background: rgba(59, 130, 246, 0.1); padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 0.85em; color: #7c8ba1; margin-bottom: 4px;">Expulsiones</div>
                            <div style="font-size: 1.5em; font-weight: 700; color: #ef4444;">
                                ${arbitroActual.expulsionesFaciles < 0.15 ? '🟥' : arbitroActual.expulsionesFaciles < 0.3 ? '🟥🟥' : '🟥🟥🟥'}
                            </div>
                        </div>
                    </div>
                </div>
                
                ${equipo.presupuesto >= costoCompra ? `
                    <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #ef4444; text-align: center; margin-bottom: 12px;">⚠️ OFERTA ILEGAL</h4>
                        <p style="color: #a8b3cf; text-align: center; line-height: 1.5; margin-bottom: 16px;">
                            Puedes "asegurar" decisiones favorables por <strong style="color: #fff;">$${(costoCompra/1000000).toFixed(1)}M</strong>
                        </p>
                        <p style="color: #ef4444; text-align: center; font-size: 0.9em;">
                            ⚠️ Riesgo de descubrimiento: <strong>${Math.min(95, (probabilidadDescubrimiento * 100).toFixed(0))}%</strong>
                        </p>
                        <p style="color: #7c8ba1; text-align: center; font-size: 0.85em; margin-top: 8px;">
                            Si te descubren: ánimo del equipo -30, sanción económica severa
                        </p>
                    </div>
                ` : ''}
                
                <div class="btn-group" style="justify-content: center; gap: 12px;">
                    ${equipo.presupuesto >= costoCompra ? `
                        <button class="btn" style="background: #ef4444; flex: 1;" id="btnComprarArbitro">
                            💰 Sobornar Árbitro ($${(costoCompra/1000000).toFixed(1)}M)
                        </button>
                    ` : ''}
                    <button class="btn btn-primary" style="flex: 1;" id="btnContinuarPartido">
                        ⚽ Continuar al Partido
                    </button>
                </div>
                
                <button class="btn btn-secondary" style="width: 100%; margin-top: 12px;" id="btnCancelar">
                    Volver
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // EVENTOS
        if (equipo.presupuesto >= costoCompra) {
            document.getElementById('btnComprarArbitro').onclick = () => {
                equipo.presupuesto -= costoCompra;
                arbitroComprado = true;
                vecesComprado++;
                probabilidadDescubrimiento += 0.15; // +15% cada vez
                
                modal.remove();
                mostrarMensajeSoborno();
                setTimeout(() => resolve('comprado'), 1000);
            };
        }
        
        document.getElementById('btnContinuarPartido').onclick = () => {
            modal.remove();
            resolve('continuar');
        };
        
        document.getElementById('btnCancelar').onclick = () => {
            modal.remove();
            resolve('cancelado');
        };
    });
}

// NUEVA: Mensaje tras sobornar
function mostrarMensajeSoborno() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; text-align: center;">
            <div style="font-size: 5em; margin-bottom: 20px;">🤝💰</div>
            <h3 style="color: #ef4444; margin-bottom: 16px;">Trato Cerrado</h3>
            <p style="color: #a8b3cf; line-height: 1.6;">
                El árbitro acepta el "acuerdo". Las decisiones serán favorables...<br>
                <strong style="color: #eab308;">Pero esto es muy peligroso.</strong>
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
    }, 2500);
}

// NUEVA: Revisar si el soborno fue descubierto (llamar DESPUÉS del partido)
async function revisarDescubrimientoSoborno() {
    if (!arbitroComprado) return;
    
    // Probabilidad de ser descubierto
    if (Math.random() < probabilidadDescubrimiento) {
        // ¡TE DESCUBRIERON!
        await mostrarEscandaloSoborno();
        
        const equipo = equipos.find(e => e.id === partidaActual.equipoId);
        
        // CASTIGOS
        equipo.presupuesto -= 5000000; // -$5M de multa
        equipo.jugadores.forEach(j => {
            j.animo = Math.max(0, j.animo - 30); // -30 ánimo a todos
        });
        
        // Resetear contador
        vecesComprado = 0;
        probabilidadDescubrimiento = 0;
        
        agregarNoticia('general', '🚨 ¡ESCÁNDALO DE CORRUPCIÓN!', 
            `Se descubrió que ${equipos.find(e => e.id === partidaActual.equipoId).nombre} sobornó al árbitro. Multa de $5M y ánimo del plantel devastado.`);
        
        agregarMensaje('Presidente del Club', 'Directiva', '😡', 
            `${partidaActual.manager}, esto es IMPERDONABLE. Has manchado el nombre del club. Si vuelve a pasar, te despedimos.`);
        
    } else {
        // Te salvaste... por ahora
        if (Math.random() < 0.3) {
            agregarMensaje('Director Deportivo', 'Directiva', '😰', 
                `DT, hay rumores en la prensa sobre "arreglos" con árbitros. Ten mucho cuidado, están investigando...`);
        }
        
        // Disminuir probabilidad con el tiempo (cada partido que pasa sin ser descubierto)
        probabilidadDescubrimiento = Math.max(0.05, probabilidadDescubrimiento - 0.03);
    }
}

// NUEVA: Modal escándalo
async function mostrarEscandaloSoborno() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px; border: 3px solid #ef4444;">
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 6em; margin-bottom: 20px;">🚨📰</div>
                    <h2 style="color: #ef4444; margin-bottom: 20px;">¡ESCÁNDALO!</h2>
                    <h3 style="margin-bottom: 16px;">Te descubrieron sobornando al árbitro</h3>
                    <p style="color: #a8b3cf; line-height: 1.6; margin-bottom: 30px;">
                        Los medios revelaron el soborno. El club recibe una multa de <strong style="color: #ef4444;">$5 millones</strong>.<br><br>
                        El vestuario está destrozado. Los jugadores perdieron toda confianza en la directiva.<br>
                        <strong style="color: #eab308;">Ánimo del plantel: -30 puntos</strong>
                    </p>
                    <button class="btn btn-primary" id="btnCerrarEscandalo">Aceptar las consecuencias</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('btnCerrarEscandalo').onclick = () => {
            modal.remove();
            resolve();
        };
    });
}
async function simularMiPartido() {
    const nextPartido = fixture.find(p => !p.jugado && (p.local === partidaActual.equipoId || p.visitante === partidaActual.equipoId));
    // NUEVO: Generar árbitro aleatorio
    arbitroActual = arbitros[Math.floor(Math.random() * arbitros.length)];
    arbitroComprado = false;
    const resultado1 = await mostrarPerfilArbitro(nextPartido);
    
    if (resultado1 === 'cancelado') {
        return; // El usuario canceló
    }
    if (!nextPartido) {
        alert('No hay partido disponible');
        return;
    }

    const local = equipos.find(e => e.id === nextPartido.local);
    const visitante = equipos.find(e => e.id === nextPartido.visitante);
    
    // Marcar que jugadores titulares jugaron este partido
    const equipoJugador = equipos.find(e => e.id === partidaActual.equipoId);
    equipoJugador.jugadores.forEach(j => {
        if (equipoJugador.starting11.includes(j.id)) {
            j.partidosJugados++;
        }
    });

    // Generar clima aleatorio
    const climas = [
        { nombre: 'Soleado', icono: '☀️', efecto: null },
        { nombre: 'Nublado', icono: '☁️', efecto: null },
        { nombre: 'Lluvia', icono: '🌧️', efecto: 'lluvia' }
    ];
    const clima = climas[Math.floor(Math.random() * climas.length)];
    
    partidaActual.climaActual = clima;

    document.getElementById('partidoModal').style.display = 'block';
    const info = document.getElementById('partidoInfo');
    info.style.display = 'block';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('continuarBtn').style.display = 'none';

    info.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4em; margin-bottom: 20px;">${clima.icono}</div>
            <h3 style="margin-bottom: 20px;">Clima: ${clima.nombre}</h3>
            <h4>${local.nombre} vs ${visitante.nombre}</h4>
            <p style="color: #7c8ba1; margin-top: 16px;">El partido está por comenzar...</p>
        </div>
    `;

    if (clima.efecto === 'lluvia') {
        const efectoLluvia = document.createElement('div');
        efectoLluvia.className = 'clima-lluvia';
        efectoLluvia.id = 'efectoClima';
        document.body.appendChild(efectoLluvia);
    }

    await sleep(2000);

    // Generar eventos del partido
    const eventos = generarEventosPartido(local, visitante);

    info.innerHTML = `
        <h3 style="text-align: center; margin-bottom: 30px;">⚽ PRIMER TIEMPO</h3>
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-block; background: rgba(59, 130, 246, 0.2); padding: 8px 24px; border-radius: 20px;">
                <span style="font-size: 1.2em; font-weight: 700;" id="minuto-actual">0'</span>
            </div>
        </div>
        <div class="partido-card" style="margin: 20px 0; padding: 30px;">
            <div class="partido-equipos">
                <div class="equipo-partido local" style="font-size: 1.5em;">${local.nombre}</div>
                <div class="resultado" id="marcador-vivo" style="font-size: 3em;">0 - 0</div>
                <div class="equipo-partido visitante" style="font-size: 1.5em;">${visitante.nombre}</div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <h4 style="text-align: center; margin-bottom: 20px;">📋 Cronología</h4>
            <div id="eventos-live" style="max-height: 300px; overflow-y: auto;"></div>
        </div>
    `;

    const eventosContainer = document.getElementById('eventos-live');
    const minutoActualDisplay = document.getElementById('minuto-actual');
    const marcadorDisplay = document.getElementById('marcador-vivo');
    
    let marcadorLocal = 0;
    let marcadorVisitante = 0;
    let eventoIndex = 0;

    // PRIMER TIEMPO (minutos 1-45)
    for (let minuto = 1; minuto <= 45; minuto++) {
        await sleep(200);
        minutoActualDisplay.textContent = minuto + "'";
        
        while (eventoIndex < eventos.length && eventos[eventoIndex].minuto <= 45 && eventos[eventoIndex].minuto === minuto) {
            const e = eventos[eventoIndex];
            
            if (e.tipo === 'gol') {
                const marcadorParts = e.marcador.split('-');
                marcadorLocal = parseInt(marcadorParts[0]);
                marcadorVisitante = parseInt(marcadorParts[1]);
                marcadorDisplay.textContent = e.marcador;
                
                marcadorDisplay.style.transform = 'scale(1.2)';
                marcadorDisplay.style.color = '#10b981';
                setTimeout(() => {
                    marcadorDisplay.style.transform = 'scale(1)';
                }, 500);
            }

            const eventoDiv = document.createElement('div');
            eventoDiv.style.cssText = `padding: 12px; margin: 8px 0; background: ${e.cualidad ? 'rgba(139, 92, 246, 0.2)' : 'rgba(20, 30, 70, 0.3)'}; border-radius: 8px; border-left: 3px solid ${e.tipo === 'gol' ? '#10b981' : e.tipo === 'expulsion' ? '#ef4444' : e.tipo === 'falta' ? '#eab308' : '#7c8ba1'}; animation: fadeInUp 0.5s ease-out; opacity: 0;`;
            eventoDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-weight: 700; color: #3b82f6;">${e.minuto}'</span>
                        <span style="margin-left: 12px;">${e.icono} ${e.descripcion}</span>
                    </div>
                    ${e.tipo === 'gol' ? `<div style="font-size: 1.2em; font-weight: 700; color: #10b981;">${e.marcador}</div>` : ''}
                </div>
            `;
            eventosContainer.insertBefore(eventoDiv, eventosContainer.firstChild);
            setTimeout(() => eventoDiv.style.opacity = '1', 50);
            
            eventoIndex++;
            await sleep(300);
        }
    }

    await sleep(1000);

    // ENTRETIEMPO - VESTUARIO
    await mostrarEntretiempo(marcadorLocal, marcadorVisitante, local, visitante);

    // SEGUNDO TIEMPO (minutos 46-90)
    info.innerHTML = `
        <h3 style="text-align: center; margin-bottom: 30px;">⚽ SEGUNDO TIEMPO</h3>
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-block; background: rgba(59, 130, 246, 0.2); padding: 8px 24px; border-radius: 20px;">
                <span style="font-size: 1.2em; font-weight: 700;" id="minuto-actual">45'</span>
            </div>
        </div>
        <div class="partido-card" style="margin: 20px 0; padding: 30px;">
            <div class="partido-equipos">
                <div class="equipo-partido local" style="font-size: 1.5em;">${local.nombre}</div>
                <div class="resultado" id="marcador-vivo" style="font-size: 3em;">${marcadorLocal} - ${marcadorVisitante}</div>
                <div class="equipo-partido visitante" style="font-size: 1.5em;">${visitante.nombre}</div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <h4 style="text-align: center; margin-bottom: 20px;">📋 Cronología</h4>
            <div id="eventos-live" style="max-height: 300px; overflow-y: auto;"></div>
        </div>
    `;

    const eventosContainer2 = document.getElementById('eventos-live');
    const minutoActualDisplay2 = document.getElementById('minuto-actual');
    const marcadorDisplay2 = document.getElementById('marcador-vivo');

    for (let minuto = 46; minuto <= 90; minuto++) {
        await sleep(200);
        minutoActualDisplay2.textContent = minuto + "'";
        
        while (eventoIndex < eventos.length && eventos[eventoIndex].minuto === minuto) {
            const e = eventos[eventoIndex];
            
            if (e.tipo === 'gol') {
                const marcadorParts = e.marcador.split('-');
                marcadorLocal = parseInt(marcadorParts[0]);
                marcadorVisitante = parseInt(marcadorParts[1]);
                marcadorDisplay2.textContent = e.marcador;
                
                marcadorDisplay2.style.transform = 'scale(1.2)';
                marcadorDisplay2.style.color = '#10b981';
                setTimeout(() => {
                    marcadorDisplay2.style.transform = 'scale(1)';
                }, 500);
            }

            const eventoDiv = document.createElement('div');
            eventoDiv.style.cssText = `padding: 12px; margin: 8px 0; background: ${e.cualidad ? 'rgba(139, 92, 246, 0.2)' : 'rgba(20, 30, 70, 0.3)'}; border-radius: 8px; border-left: 3px solid ${e.tipo === 'gol' ? '#10b981' : e.tipo === 'expulsion' ? '#ef4444' : e.tipo === 'falta' ? '#eab308' : '#7c8ba1'}; animation: fadeInUp 0.5s ease-out; opacity: 0;`;
            eventoDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-weight: 700; color: #3b82f6;">${e.minuto}'</span>
                        <span style="margin-left: 12px;">${e.icono} ${e.descripcion}</span>
                    </div>
                    ${e.tipo === 'gol' ? `<div style="font-size: 1.2em; font-weight: 700; color: #10b981;">${e.marcador}</div>` : ''}
                </div>
            `;
            eventosContainer2.insertBefore(eventoDiv, eventosContainer2.firstChild);
            setTimeout(() => eventoDiv.style.opacity = '1', 50);
            
            eventoIndex++;
            await sleep(300);
        }
    }

    // Actualizar estadísticas del partido
    nextPartido.golesLocal = marcadorLocal;
    nextPartido.golesVisitante = marcadorVisitante;
    nextPartido.jugado = true;

    local.pj++;
    visitante.pj++;
    local.gf += marcadorLocal;
    local.gc += marcadorVisitante;
    visitante.gf += marcadorVisitante;
    visitante.gc += marcadorLocal;

    if (marcadorLocal > marcadorVisitante) {
        local.pg++;
        local.pts += 3;
        visitante.pp++;
    } else if (marcadorLocal < marcadorVisitante) {
        visitante.pg++;
        visitante.pts += 3;
        local.pp++;
    } else {
        local.pe++;
        visitante.pe++;
        local.pts++;
        visitante.pts++;
    }

    await sleep(1000);

    const efectoClima = document.getElementById('efectoClima');
    if (efectoClima) efectoClima.remove();

    const esVictoria = (nextPartido.local === partidaActual.equipoId && marcadorLocal > marcadorVisitante) ||
                      (nextPartido.visitante === partidaActual.equipoId && marcadorVisitante > marcadorLocal);
    const esEmpate = marcadorLocal === marcadorVisitante;

    info.innerHTML = `
        <h3 style="text-align: center; color: ${esVictoria ? '#10b981' : esEmpate ? '#eab308' : '#ef4444'}; margin-bottom: 30px; font-size: 2.5em;">
            ${esVictoria ? '¡VICTORIA! 🎉' : esEmpate ? 'EMPATE ⚖️' : 'DERROTA 😔'}
        </h3>
        <div class="partido-card" style="margin: 20px 0; padding: 30px;">
            <div class="partido-equipos">
                <div class="equipo-partido local" style="font-size: 1.5em;">${local.nombre}</div>
                <div class="resultado" style="font-size: 3em;">${marcadorLocal} - ${marcadorVisitante}</div>
                <div class="equipo-partido visitante" style="font-size: 1.5em;">${visitante.nombre}</div>
            </div>
        </div>
    `;

    const resultado = `${marcadorLocal}-${marcadorVisitante}`;
    agregarNoticia('resultado', `Tu equipo ${esVictoria ? 'ganó' : esEmpate ? 'empató' : 'perdió'}!`, 
        `${local.nombre} ${resultado} ${visitante.nombre} - ${clima.nombre}`);
    
    document.getElementById('continuarBtn').style.display = 'inline-block';
    
    setTimeout(() => {
        generarMensajesPostPartido(esVictoria, esEmpate, clima, marcadorLocal, marcadorVisitante, local, visitante);
    }, 100);
}
// MODIFICADO: Entretiempo con opciones según AUTORIDAD de jugadores
async function mostrarEntretiempo(marcadorLocal, marcadorVisitante, local, visitante) {
    return new Promise((resolve) => {
        const info = document.getElementById('partidoInfo');
        const equipo = equipos.find(e => e.id === partidaActual.equipoId);
        
        const esLocal = local.id === partidaActual.equipoId;
        const misMarcador = esLocal ? marcadorLocal : marcadorVisitante;
        const rivalMarcador = esLocal ? marcadorVisitante : marcadorLocal;
        
        const estoyPerdiendo = misMarcador < rivalMarcador;
        const estoyGanando = misMarcador > rivalMarcador;
        const estoyEmpatando = misMarcador === rivalMarcador;
        
        // Determinar el clima del vestuario
        let tituloVestuario = '';
        let ambienteVestuario = '';
        let frasesJugadores = [];
        
        // NUEVO: Jugadores veteranos tienen más autoridad para hablar
        const jugadoresTitulares = equipo.jugadores.filter(j => equipo.starting11.includes(j.id));
        const veteranos = jugadoresTitulares.filter(j => j.edad >= 30).sort((a, b) => b.autoridad - a.autoridad);
        const referentes = veteranos.length > 0 ? veteranos.slice(0, 2) : jugadoresTitulares.sort((a, b) => b.autoridad - a.autoridad).slice(0, 2);
        
        if (estoyPerdiendo) {
            const diferencia = rivalMarcador - misMarcador;
            if (diferencia >= 3) {
                tituloVestuario = '😡 ¡VESTUARIO EN LLAMAS!';
                ambienteVestuario = 'Los jugadores están furiosos. Hay gritos, insultos y tensión extrema. Algunos jugadores se culpan entre sí.';
                frasesJugadores = [
                    { jugador: referentes[0], texto: '¡Esto es una vergüenza! ¡Nos están haciendo PELOTA! ¡Reaccionen de una vez!', autoridad: true },
                    { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: '¿Qué carajo estamos haciendo ahí afuera? ¡DESPIERTEN!', autoridad: false },
                    { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: '¡No puedo más con estos errores! ¡Parecemos amateur!', autoridad: false },
                    { jugador: referentes[1] || jugadoresTitulares[0], texto: 'La gente nos está silbando... y tienen razón. Pero todavía hay 45 minutos. ¡Vamos carajo!', autoridad: true }
                ];
            } else {
                tituloVestuario = '😤 Vestuario caliente';
                ambienteVestuario = 'Los jugadores están molestos y frustrados. Algunos bajan la cabeza, otros quieren reaccionar.';
                frasesJugadores = [
                    { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: 'No puede ser... estamos regalando el partido.', autoridad: false },
                    { jugador: referentes[0], texto: 'Tenemos que reaccionar YA, no podemos perder así. Yo me hago responsable, vamos todos juntos.', autoridad: true },
                    { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: 'Nos falta intensidad, están ganando todas las divididas.', autoridad: false },
                    { jugador: referentes[1] || jugadoresTitulares[1], texto: 'Vamos muchachos, todavía hay tiempo para dar vuelta esto. Confío en ustedes.', autoridad: true }
                ];
            }
        } else if (estoyEmpatando) {
            tituloVestuario = '😐 Vestuario tenso';
            ambienteVestuario = 'Los jugadores están inquietos. Saben que pueden más. Algunos veteranos intentan motivar.';
            frasesJugadores = [
                { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: 'No estamos jugando bien... hay que mejorar.', autoridad: false },
                { jugador: referentes[0], texto: 'Muchachos, con este nivel no alcanza. Hay que subir la intensidad en el segundo tiempo.', autoridad: true },
                { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: 'Estamos flojos, hay que apretar más.', autoridad: false },
                { jugador: referentes[1] || jugadoresTitulares[0], texto: 'Se nos están yendo puntos importantes. Vamos, que podemos ganar esto.', autoridad: true }
            ];
        } else {
            tituloVestuario = '😊 Vestuario tranquilo';
            ambienteVestuario = 'Los jugadores están conformes pero los referentes mantienen la concentración.';
            frasesJugadores = [
                { jugador: referentes[0], texto: 'Vamos bien, pero no nos relajemos. Falta todo el segundo tiempo. El partido NO está ganado.', autoridad: true },
                { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: 'Buena primera parte, a seguir así y cerrar el partido.', autoridad: false },
                { jugador: referentes[1] || jugadoresTitulares[1], texto: 'Estamos controlando, pero hay que mantener la concentración hasta el final.', autoridad: true },
                { jugador: jugadoresTitulares[Math.floor(Math.random() * jugadoresTitulares.length)], texto: 'Un tiempo más con esta intensidad y nos llevamos los 3 puntos.', autoridad: false }
            ];
        }
        
        // Mostrar escena del vestuario
        info.innerHTML = `
            <div style="background: rgba(10, 14, 39, 0.8); padding: 40px; border-radius: 12px; border: 2px solid rgba(255, 255, 255, 0.1);">
                <h2 style="text-align: center; margin-bottom: 30px;">🚪 ENTRETIEMPO - VESTUARIO</h2>
                
                <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: rgba(20, 30, 70, 0.4); border-radius: 8px;">
                    <div style="font-size: 2.5em; font-weight: 900; color: ${estoyPerdiendo ? '#ef4444' : estoyGanando ? '#10b981' : '#eab308'};">
                        ${marcadorLocal} - ${marcadorVisitante}
                    </div>
                    <div style="font-size: 0.9em; color: #7c8ba1; margin-top: 8px;">45' - Primer tiempo</div>
                </div>
                
                <h3 style="text-align: center; margin-bottom: 20px;">${tituloVestuario}</h3>
                <p style="text-align: center; color: #a8b3cf; margin-bottom: 30px; font-style: italic;">${ambienteVestuario}</p>
                
                <div id="dialogos-vestuario" style="margin-bottom: 30px; max-height: 300px; overflow-y: auto;">
                </div>
                
                <div id="opciones-dt" style="display: none;">
                    <h4 style="text-align: center; margin-bottom: 20px; color: #3b82f6;">¿Qué harás como DT?</h4>
                    <div id="botones-opciones" style="display: grid; gap: 12px;"></div>
                </div>
            </div>
        `;
        
        // Mostrar diálogos de jugadores uno por uno
        const dialogosContainer = document.getElementById('dialogos-vestuario');
        
        async function mostrarDialogos() {
            for (let i = 0; i < frasesJugadores.length; i++) {
                await sleep(1000);
                
                const { jugador, texto, autoridad } = frasesJugadores[i];
                
                const dialogoDiv = document.createElement('div');
                dialogoDiv.style.cssText = `display: flex; gap: 12px; padding: 16px; background: ${autoridad ? 'rgba(59, 130, 246, 0.2)' : 'rgba(20, 30, 70, 0.3)'}; border-radius: 8px; margin-bottom: 12px; opacity: 0; transform: translateX(-20px); transition: all 0.4s; border-left: 3px solid ${autoridad ? '#3b82f6' : 'transparent'};`;
                dialogoDiv.innerHTML = `
                    <div style="min-width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, ${autoridad ? '#3b82f6' : '#6b7280'} 0%, ${autoridad ? '#2563eb' : '#4b5563'} 100%); display: flex; align-items: center; justify-content: center; font-size: 1.5em; position: relative;">
                        ${estoyPerdiendo ? '😠' : estoyEmpatando ? '😐' : '😊'}
                        ${autoridad ? '<div style="position: absolute; bottom: -2px; right: -2px; background: #eab308; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7em; border: 2px solid rgba(10, 14, 39, 0.8);">👑</div>' : ''}
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                            <span style="font-weight: 700; color: #fff;">${jugador.nombre}</span>
                            ${autoridad ? '<span style="padding: 2px 8px; background: #eab308; border-radius: 4px; font-size: 0.75em; font-weight: 700;">REFERENTE</span>' : ''}
                            <span style="font-size: 0.75em; color: #7c8ba1;">${jugador.edad} años</span>
                        </div>
                        <div style="color: #e8e8e8; font-size: 0.95em; line-height: 1.4;">"${texto}"</div>
                    </div>
                `;
                
                dialogosContainer.appendChild(dialogoDiv);
                
                setTimeout(() => {
                    dialogoDiv.style.opacity = '1';
                    dialogoDiv.style.transform = 'translateX(0)';
                }, 50);
            }
            
            await sleep(1200);
            
            // Mostrar opciones del DT (incluyendo cambio de táctica)
            document.getElementById('opciones-dt').style.display = 'block';
            mostrarOpcionesDT(estoyPerdiendo, estoyGanando, estoyEmpatando, resolve);
        }
        
        mostrarDialogos();
    });
}

// MODIFICADO: Opciones del DT con CAMBIO DE TÁCTICA
function mostrarOpcionesDT(estoyPerdiendo, estoyGanando, estoyEmpatando, resolve) {
    const botonesContainer = document.getElementById('botones-opciones');
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    
    let opciones = [];
    
    if (estoyPerdiendo) {
        opciones = [
            {
                texto: '😡 Empezar a los gritos',
                icono: '🗣️',
                descripcion: '"¡DESPIERTEN! ¡ASÍ NO SE JUEGA!"',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.max(0, j.animo - 10);
                    });
                    return {
                        resultado: '❌ Los jugadores salen peor',
                        mensaje: 'Los gritos solo aumentaron la tensión. Los jugadores están más nerviosos y su confianza bajó.',
                        color: '#ef4444'
                    };
                }
            },
            {
                texto: '🤚 Calmar con las manos atrás',
                icono: '🧘',
                descripcion: '"Tranquilos, hay que jugar con cabeza fría..."',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.max(0, j.animo - 2);
                    });
                    return {
                        resultado: '⚠️ Los jugadores se calmaron pero no se motivaron',
                        mensaje: 'Lograste bajar la tensión, pero los jugadores siguen sin convicción. Faltó carácter.',
                        color: '#eab308'
                    };
                }
            },
            {
                texto: '👁️ Charla mirando a los ojos',
                icono: '💪',
                descripcion: '"Todavía estamos vivos. Vamos a dar vuelta esto JUNTOS"',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        if (j.mentalidad === 'Frío' || j.mentalidad === 'Equilibrado') {
                            j.animo = Math.min(100, j.animo + 12);
                        } else {
                            j.animo = Math.min(100, j.animo + 8);
                        }
                    });
                    return {
                        resultado: '✅ ¡Los jugadores están motivados!',
                        mensaje: 'Tu charla llegó. Los jugadores salen con otra actitud, decididos a revertir el resultado.',
                        color: '#10b981'
                    };
                }
            },
            {
                texto: '⚔️ Cambiar a táctica ofensiva',
                icono: '🔥',
                descripcion: 'Arriesgar todo, salir a buscar el partido',
                efecto: () => {
                    equipo.tacticaActual = 'Muy Ofensiva';
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.min(100, j.animo + 10);
                    });
                    return {
                        resultado: '🔥 ¡Táctica cambiada a MUY OFENSIVA!',
                        mensaje: 'El equipo saldrá con todo al ataque. Los jugadores están motivados por el cambio, pero la defensa quedará más expuesta.',
                        color: '#ef4444'
                    };
                }
            }
        ];
    } else if (estoyEmpatando) {
        opciones = [
            {
                texto: '😤 Exigir más intensidad',
                icono: '📈',
                descripcion: '"Así no alcanza, hay que dar MÁS"',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        if (j.mentalidad === 'Caliente' || j.mentalidad === 'Provocador') {
                            j.animo = Math.max(0, j.animo - 5);
                        } else {
                            j.animo = Math.min(100, j.animo + 5);
                        }
                    });
                    return {
                        resultado: '⚠️ Reacción mixta',
                        mensaje: 'Algunos jugadores respondieron bien a la exigencia, pero otros se tensaron.',
                        color: '#eab308'
                    };
                }
            },
            {
                texto: '😊 Mantener la calma',
                icono: '✅',
                descripcion: '"Vamos bien, sigamos así y el gol llegará"',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.min(100, j.animo + 3);
                    });
                    return {
                        resultado: '✅ Equipo tranquilo',
                        mensaje: 'Los jugadores salen confiados y sin presión. Seguirán jugando igual.',
                        color: '#10b981'
                    };
                }
            },
            {
                texto: '⚡ Cambiar a táctica ofensiva',
                icono: '🎯',
                descripcion: '"Vamos a buscar el partido, sin miedo"',
                efecto: () => {
                    equipo.tacticaActual = 'Ofensiva';
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.min(100, j.animo + 8);
                    });
                    return {
                        resultado: '🔥 ¡Táctica cambiada a OFENSIVA!',
                        mensaje: 'El cambio táctico les dio confianza. Salen a buscar la victoria.',
                        color: '#10b981' };
                }
            }
        ];
    } else { // Estoy ganando
        opciones = [
            {
                texto: '😌 Felicitar y pedir mantener',
                icono: '👍',
                descripcion: '"Excelente primer tiempo, a seguir así"',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.min(100, j.animo + 5);
                    });
                    return {
                        resultado: '✅ Equipo confiado',
                        mensaje: 'Los jugadores están contentos. Saldrán a mantener el resultado.',
                        color: '#10b981'
                    };
                }
            },
            {
                texto: '⚠️ Advertir sobre relajación',
                icono: '⚡',
                descripcion: '"Cuidado, el partido NO está ganado"',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        if (j.mentalidad === 'Frío' || j.mentalidad === 'Equilibrado') {
                            j.animo = Math.min(100, j.animo + 3);
                        } else {
                            j.animo = Math.max(0, j.animo - 2);
                        }
                    });
                    return {
                        resultado: '⚠️ Mayor concentración',
                        mensaje: 'Los jugadores entendieron. Saldrán concentrados pero algunos se tensaron.',
                        color: '#eab308'
                    };
                }
            },
            {
                texto: '🛡️ Cambiar a táctica defensiva',
                icono: '🔒',
                descripcion: '"Ahora a cerrar el partido, sin regalar nada"',
                efecto: () => {
                    equipo.tacticaActual = 'Defensiva';
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.min(100, j.animo + 7);
                    });
                    return {
                        resultado: '🛡️ ¡Táctica cambiada a DEFENSIVA!',
                        mensaje: 'El equipo se replegará para proteger el resultado. Mayor solidez atrás.',
                        color: '#3b82f6'
                    };
                }
            },
            {
                texto: '🎯 Buscar sentenciar',
                icono: '⚔️',
                descripcion: '"Vamos a buscar el segundo y matar el partido"',
                efecto: () => {
                    equipo.jugadores.forEach(j => {
                        j.animo = Math.min(100, j.animo + 10);
                    });
                    return {
                        resultado: '✅ Mentalidad ganadora',
                        mensaje: 'Los jugadores saldrán a sentenciar. Actitud perfecta para cerrar el partido.',
                        color: '#10b981'
                    };
                }
            }
        ];
    }
    
    // Crear botones
    opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.className = 'btn btn-primary';
        boton.style.cssText = 'padding: 20px; text-align: left; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.3s;';
        boton.innerHTML = `
            <div style="font-size: 2em;">${opcion.icono}</div>
            <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 1.1em; margin-bottom: 4px;">${opcion.texto}</div>
                <div style="font-size: 0.9em; opacity: 0.8; font-style: italic;">${opcion.descripcion}</div>
            </div>
        `;
        
        boton.onclick = async () => {
            // Deshabilitar todos los botones
            botonesContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
            
            // Ejecutar efecto
            const resultado = opcion.efecto();
            
            // Mostrar resultado
            const resultadoDiv = document.createElement('div');
            resultadoDiv.style.cssText = `margin-top: 30px; padding: 20px; background: rgba(20, 30, 70, 0.5); border-radius: 8px; border-left: 4px solid ${resultado.color}; opacity: 0; transform: translateY(20px); transition: all 0.5s;`;
            resultadoDiv.innerHTML = `
                <h4 style="color: ${resultado.color}; margin-bottom: 12px; font-size: 1.3em;">${resultado.resultado}</h4>
                <p style="color: #a8b3cf; line-height: 1.6;">${resultado.mensaje}</p>
            `;
            
            document.getElementById('opciones-dt').appendChild(resultadoDiv);
            
            setTimeout(() => {
                resultadoDiv.style.opacity = '1';
                resultadoDiv.style.transform = 'translateY(0)';
            }, 100);
            
            await sleep(2500);
            
            // Continuar con segundo tiempo
            resolve();
        };
        
        botonesContainer.appendChild(boton);
    });
}




// Agregar animación CSS para pulse (agregar al style)
        // NUEVA: Generar eventos del partido (sin actualizar stats)
function generarEventosPartido(local, visitante) {
    const clima = obtenerClimaActual();
    
    const strengthLocal = calcularStrengthEquipo(local, clima);
    const strengthVisitante = calcularStrengthEquipo(visitante, clima);

    let golesLocal = Math.floor(Math.random() * 4) + (strengthLocal > strengthVisitante ? 1 : 0);
    let golesVisitante = Math.floor(Math.random() * 4) + (strengthVisitante > strengthLocal ? 1 : 0);

    const eventos = [];
    let marcadorLocal = 0;
    let marcadorVisitante = 0;

    const totalGoles = golesLocal + golesVisitante;
    const minutosGoles = [];
    
    for (let i = 0; i < totalGoles; i++) {
        minutosGoles.push(Math.floor(Math.random() * 90) + 1);
    }
    minutosGoles.sort((a, b) => a - b);

    let golesLocalRestantes = golesLocal;
    let golesVisitanteRestantes = golesVisitante;
    
    const jugadoresLocal = local.jugadores.filter(j => local.starting11.includes(j.id));
    const jugadoresVisitante = visitante.jugadores.filter(j => visitante.starting11.includes(j.id));

    minutosGoles.forEach(minuto => {
        const esLocal = (golesLocalRestantes > 0 && golesVisitanteRestantes === 0) ||
                       (golesLocalRestantes > 0 && Math.random() > 0.5);
        
        if (esLocal && golesLocalRestantes > 0) {
            marcadorLocal++;
            golesLocalRestantes--;
            
            // Elegir goleador - priorizar jugadores con "Goleador Nato" o "Buena Pegada"
            let jugador;
            const goleadores = jugadoresLocal.filter(j => j.cualidades.some(c => c.nombre === 'Goleador Nato'));
            const buenaPegada = jugadoresLocal.filter(j => j.cualidades.some(c => c.nombre === 'Buena Pegada'));
            
            if (goleadores.length > 0 && Math.random() < 0.6) {
                jugador = goleadores[Math.floor(Math.random() * goleadores.length)];
            } else if (buenaPegada.length > 0 && Math.random() < 0.3) {
                // GOL DE LA NADA con buena pegada
                jugador = buenaPegada[Math.floor(Math.random() * buenaPegada.length)];
                eventos.push({
                    minuto: minuto,
                    tipo: 'gol',
                    icono: '🚀',
                    descripcion: `¡GOLAZO IMPOSIBLE! ${jugador.nombre} (${local.nombre}) clava un misil al ángulo. ¡QUÉ PEGADA!`,
                    marcador: `${marcadorLocal} - ${marcadorVisitante}`,
                    cualidad: true,
                    clase: 'pulse' // Animación para golazo
                });
                jugador.goles++;
                return; // Salir temprano porque ya agregamos el evento
            } else {
                jugador = jugadoresLocal[Math.floor(Math.random() * jugadoresLocal.length)];
            }
            
            eventos.push({
                minuto: minuto,
                tipo: 'gol',
                icono: '⚽',
                descripcion: `¡GOL de ${jugador.nombre} (${local.nombre})!`,
                marcador: `${marcadorLocal} - ${marcadorVisitante}`
            });
            jugador.goles++;
            
        } else if (golesVisitanteRestantes > 0) {
            marcadorVisitante++;
            golesVisitanteRestantes--;
            
            let jugador;
            const goleadores = jugadoresVisitante.filter(j => j.cualidades.some(c => c.nombre === 'Goleador Nato'));
            const buenaPegada = jugadoresVisitante.filter(j => j.cualidades.some(c => c.nombre === 'Buena Pegada'));
            
            if (goleadores.length > 0 && Math.random() < 0.6) {
                jugador = goleadores[Math.floor(Math.random() * goleadores.length)];
            } else if (buenaPegada.length > 0 && Math.random() < 0.3) {
                jugador = buenaPegada[Math.floor(Math.random() * buenaPegada.length)];
                eventos.push({
                    minuto: minuto,
                    tipo: 'gol',
                    icono: '🚀',
                    descripcion: `¡GOLAZO IMPOSIBLE! ${jugador.nombre} (${visitante.nombre}) clava un misil al ángulo. ¡QUÉ PEGADA!`,
                    marcador: `${marcadorLocal} - ${marcadorVisitante}`,
                    cualidad: true,
                    clase: 'pulse' // Animación para golazo
                });
                jugador.goles++;
                return;
            } else {
                jugador = jugadoresVisitante[Math.floor(Math.random() * jugadoresVisitante.length)];
            }
            
            eventos.push({
                minuto: minuto,
                tipo: 'gol',
                icono: '⚽',
                descripcion: `¡GOL de ${jugador.nombre} (${visitante.nombre})!`,
                marcador: `${marcadorLocal} - ${marcadorVisitante}`
            });
            jugador.goles++;
        }
    });

    // EVENTOS POR MENTALIDAD Y CUALIDADES
    const jugadoresLocalCompleto = jugadoresLocal;
    const jugadoresVisitanteCompleto = jugadoresVisitante;
    
    // Provocadores pueden hacer que rivales se expulsen
    const provocadoresLocal = jugadoresLocalCompleto.filter(j => j.cualidades.some(c => c.nombre === 'Provocador'));
    const provocadoresVisitante = jugadoresVisitanteCompleto.filter(j => j.cualidades.some(c => c.nombre === 'Provocador'));
    
    if (provocadoresLocal.length > 0 && Math.random() < 0.25) {
        const provocador = provocadoresLocal[Math.floor(Math.random() * provocadoresLocal.length)];
        const victima = jugadoresVisitanteCompleto[Math.floor(Math.random() * jugadoresVisitanteCompleto.length)];
        const minuto = Math.floor(Math.random() * 60) + 30; // Entre min 30-90
        
        eventos.push({
            minuto: minuto,
            tipo: 'expulsion',
            icono: '🟥😈',
            descripcion: `¡EXPULSIÓN! ${provocador.nombre} (${local.nombre}) provocó a ${victima.nombre} (${visitante.nombre}) quien pierde la cabeza y ve la roja directa`,
            jugador: victima,
            cualidad: true
        });
    }
    
    if (provocadoresVisitante.length > 0 && Math.random() < 0.25) {
        const provocador = provocadoresVisitante[Math.floor(Math.random() * provocadoresVisitante.length)];
        const victima = jugadoresLocalCompleto[Math.floor(Math.random() * jugadoresLocalCompleto.length)];
        const minuto = Math.floor(Math.random() * 60) + 30;
        
        eventos.push({
            minuto: minuto,
            tipo: 'expulsion',
            icono: '🟥😈',
            descripcion: `¡EXPULSIÓN! ${provocador.nombre} (${visitante.nombre}) provocó a ${victima.nombre} (${local.nombre}) quien pierde la cabeza y ve la roja directa`,
            jugador: victima,
            cualidad: true
        });
    }

    // EVENTOS SEGÚN MENTALIDAD (perdiendo después del minuto 60)
    // EVENTOS SEGÚN MENTALIDAD (perdiendo después del minuto 60)
for (let minuto = 60; minuto <= 90; minuto += 10) {
    const localPerdiendo = marcadorLocal < marcadorVisitante;
    const visitantePerdiendo = marcadorVisitante < marcadorLocal;
    
    if (localPerdiendo) {
        const jugadoresMalaMentalidad = jugadoresLocalCompleto.filter(j => 
            j.mentalidad === 'Caliente' || j.mentalidad === 'Provocador'
        );
        
        // MODIFICADO: Si compramos al árbitro, 70% menos probabilidad de expulsión
        const probabilidadBase = arbitroComprado && local.id === partidaActual.equipoId ? 0.09 : 0.3;
        
        if (jugadoresMalaMentalidad.length > 0 && Math.random() < probabilidadBase) {
            const jugador = jugadoresMalaMentalidad[Math.floor(Math.random() * jugadoresMalaMentalidad.length)];
            const minutoEvento = minuto + Math.floor(Math.random() * 10);
            
            // MODIFICADO: Si compramos árbitro, aplicar bonus del estilo del árbitro
            const factorArbitro = arbitroComprado && local.id === partidaActual.equipoId ? 
                arbitroActual.expulsionesFaciles * 0.3 : arbitroActual.expulsionesFaciles;
            
            if (Math.random() < factorArbitro) {
                eventos.push({
                    minuto: minutoEvento,
                    tipo: 'expulsion',
                    icono: '🟥',
                    descripcion: `¡EXPULSIÓN! ${jugador.nombre} (${local.nombre}) pierde los papeles y ve la roja directa`,
                    jugador: jugador
                });
            } else {
                eventos.push({
                    minuto: minutoEvento,
                    tipo: 'tarjeta',
                    icono: '🟨',
                    descripcion: `${jugador.nombre} (${local.nombre}) comete falta por frustración - Tarjeta amarilla`,
                    jugador: jugador
                });
            }
        }
    }
    
    if (visitantePerdiendo) {
        const jugadoresMalaMentalidad = jugadoresVisitanteCompleto.filter(j => 
            j.mentalidad === 'Caliente' || j.mentalidad === 'Provocador'
        );
        
        // MODIFICADO: Si compramos al árbitro, rival tiene MÁS probabilidad de expulsión
        const probabilidadBase = arbitroComprado && visitante.id !== partidaActual.equipoId ? 0.5 : 0.3;
        
        if (jugadoresMalaMentalidad.length > 0 && Math.random() < probabilidadBase) {
            const jugador = jugadoresMalaMentalidad[Math.floor(Math.random() * jugadoresMalaMentalidad.length)];
            const minutoEvento = minuto + Math.floor(Math.random() * 10);
            
            const factorArbitro = arbitroComprado && visitante.id !== partidaActual.equipoId ? 
                arbitroActual.expulsionesFaciles * 1.5 : arbitroActual.expulsionesFaciles;
            
            if (Math.random() < factorArbitro) {
                eventos.push({
                    minuto: minutoEvento,
                    tipo: 'expulsion',
                    icono: '🟥',
                    descripcion: `¡EXPULSIÓN! ${jugador.nombre} (${visitante.nombre}) pierde los papeles y ve la roja directa`,
                    jugador: jugador
                });
            } else {
                eventos.push({
                    minuto: minutoEvento,
                    tipo: 'tarjeta',
                    icono: '🟨',
                    descripcion: `${jugador.nombre} (${visitante.nombre}) comete falta por frustración - Tarjeta amarilla`,
                    jugador: jugador
                });
            }
        }
    }
}

    // CUALIDAD "Reflejo Felino" - Atajadas imposibles
    const porterosLocal = jugadoresLocalCompleto.filter(j => j.posicion === 'POR' && j.cualidades.some(c => c.nombre === 'Reflejo Felino'));
    const porterosVisitante = jugadoresVisitanteCompleto.filter(j => j.posicion === 'POR' && j.cualidades.some(c => c.nombre === 'Reflejo Felino'));
    
    if (porterosLocal.length > 0 && Math.random() < 0.4) {
        const portero = porterosLocal[0];
        const minuto = Math.floor(Math.random() * 90) + 1;
        eventos.push({
            minuto: minuto,
            tipo: 'atajada',
            icono: '🧤✨',
            descripcion: `¡ATAJADA IMPOSIBLE! ${portero.nombre} (${local.nombre}) vuela y salva el arco. ¡Reflejo felino!`,
            cualidad: true,
            clase: 'pulse' // Animación para atajada
        });
    }
    
    if (porterosVisitante.length > 0 && Math.random() < 0.4) {
        const portero = porterosVisitante[0];
        const minuto = Math.floor(Math.random() * 90) + 1;
        eventos.push({
            minuto: minuto,
            tipo: 'atajada',
            icono: '🧤✨',
            descripcion: `¡ATAJADA IMPOSIBLE! ${portero.nombre} (${visitante.nombre}) vuela y salva el arco. ¡Reflejo felino!`,
            cualidad: true,
            clase: 'pulse' // Animación para atajada
        });
    }
    
    // CUALIDAD "Visión de Juego" - Asistencias
    const conVision = [...jugadoresLocalCompleto, ...jugadoresVisitanteCompleto].filter(j => 
        j.cualidades.some(c => c.nombre === 'Visión de Juego')
    );
    
    conVision.forEach(jugador => {
        if (Math.random() < 0.3) {
            const minuto = Math.floor(Math.random() * 90) + 1;
            const equipo = jugadoresLocalCompleto.includes(jugador) ? local : visitante;
            eventos.push({
                minuto: minuto,
                tipo: 'asistencia',
                icono: '👁️🎯',
                descripcion: `¡Pase magistral de ${jugador.nombre} (${equipo.nombre})! Visión de juego increíble`,
                cualidad: true
            });
            jugador.asistencias++;
        }
    });

    // CUALIDAD "Mala Definición" - Goles errados
    const jugadoresConMalaDefinicion = [...jugadoresLocalCompleto, ...jugadoresVisitanteCompleto].filter(j => 
        j.cualidades.some(c => c.nombre === 'Mala Definición') || j.tiro < 60
    );
    
    jugadoresConMalaDefinicion.forEach(jugador => {
        if (Math.random() < 0.25) {
            const minuto = Math.floor(Math.random() * 90) + 1;
            const equipo = jugadoresLocalCompleto.includes(jugador) ? local : visitante;
            eventos.push({
                minuto: minuto,
                tipo: 'oportunidad_errada',
                icono: '❌',
                descripcion: `¡Increíble! ${jugador.nombre} (${equipo.nombre}) erra una clara debajo del arco. ¡Mala definición!`,
                cualidad: jugador.cualidades.some(c => c.nombre === 'Mala Definición'),
                clase: 'pulse' // Animación para gol errado
            });
        }
    });

    // Agregar eventos adicionales normales
    const eventosExtra = [
        { tipo: 'ocasion', icono: '🎯', texto: 'ocasión clara' },
        { tipo: 'falta', icono: '⚠️', texto: 'falta' },
        { tipo: 'corner', icono: '📐', texto: 'tiro de esquina' }
    ];

    for (let i = 0; i < 8; i++) {
        const minuto = Math.floor(Math.random() * 90) + 1;
        const evento = eventosExtra[Math.floor(Math.random() * eventosExtra.length)];
        const equipo = Math.random() > 0.5 ? local : visitante;
        const jugador = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        
        eventos.push({
            minuto: minuto,
            tipo: evento.tipo,
            icono: evento.icono,
            descripcion: `${jugador.nombre} (${equipo.nombre}) - ${evento.texto}`
        });
    }

    // Ordenar eventos por minuto
    eventos.sort((a, b) => a.minuto - b.minuto);

    return eventos;
}


// MODIFICADO: Calcular strength considerando TÁCTICA
function calcularStrengthEquipo(equipo, clima) {
    const posicionesEnCancha = {
        0: 'POR', 1: 'DFC', 2: 'DFC', 3: 'DFC', 4: 'DFC',
        5: 'MED', 6: 'MED', 7: 'MED', 8: 'DEL', 9: 'DEL', 10: 'DEL'
    };
    
    let strength = 0;
    
    equipo.starting11.forEach((jugadorId, index) => {
        const jugador = equipo.jugadores.find(j => j.id === jugadorId);
        const posicionEnCancha = posicionesEnCancha[index];
        
        // Stats base
        let statsBase = jugador.tiro + jugador.pase + jugador.velocidad + jugador.regate + jugador.defensa + jugador.fisico;
        
        // Aplicar penalización por posición incorrecta
        const penalizacionPosicion = calcularPenalizacionPosicion(jugador, posicionEnCancha);
        statsBase += penalizacionPosicion;
        
        // Aplicar efecto del ánimo
        const efectoAnimo = calcularEfectoAnimo(jugador.animo);
        statsBase *= (1 + efectoAnimo / 100);
        
        // Aplicar efecto del clima
        const efectoClima = calcularEfectoClima(jugador, clima);
        statsBase += efectoClima * 6;
        
        // NUEVO: Aplicar bonificación por CUALIDADES especiales
        jugador.cualidades.forEach(cualidad => {
            if (cualidad.nombre === 'Motor') statsBase += 10;
            if (cualidad.nombre === 'Clutch') statsBase += 8;
            if (cualidad.nombre === 'Muralla' && posicionEnCancha === 'DFC') statsBase += 15;
            if (cualidad.nombre === 'Velocista') statsBase += 12;
        });
        
        strength += Math.max(0, statsBase);
    });
    
    // NUEVO: Aplicar modificadores de TÁCTICA
    const modificadoresTactica = {
        'Muy Defensiva': { defensa: 1.3, ataque: 0.7 },
        'Defensiva': { defensa: 1.15, ataque: 0.9 },
        'Equilibrada': { defensa: 1.0, ataque: 1.0 },
        'Ofensiva': { defensa: 0.9, ataque: 1.15 },
        'Muy Ofensiva': { defensa: 0.7, ataque: 1.3 }
    };
    
    const tactica = equipo.tacticaActual || 'Equilibrada';
    const modificador = modificadoresTactica[tactica];
    
    // Aplicar modificador (promedio entre ataque y defensa)
    strength *= (modificador.ataque + modificador.defensa) / 2;
    
    return strength;
}



        // NUEVA: Obtener clima actual (guardado en partidaActual)
function obtenerClimaActual() {
    return partidaActual.climaActual || { nombre: 'Soleado', icono: '☀️', efecto: null };
}
// MODIFICADO: Generar noticias considerando EDAD de jugadores
function generarNoticiasAvanzadas() {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    
    // 30% de probabilidad de noticia que afecte el ánimo
    if (Math.random() < 0.3) {
        const tiposNoticias = [
            {
                tipo: 'Rumor mercado',
                efectoAnimo: -10,
                titulo: '🗞️ Rumores de transferencia',
                generarContenido: (jugador) => `Según la prensa, ${jugador.nombre} estaría en la mira de equipos europeos. El jugador parece distraído en los entrenamientos.`,
                filtro: (j) => j.edad <= 28 // Solo jóvenes
            },
            {
                tipo: 'Problema personal',
                efectoAnimo: -15,
                titulo: '😔 Problemas personales',
                generarContenido: (jugador) => `${jugador.nombre} atraviesa un momento personal difícil. Su rendimiento podría verse afectado en los próximos partidos.`
            },
            {
                tipo: 'Buen momento',
                efectoAnimo: 10,
                titulo: '😊 En gran momento',
                generarContenido: (jugador) => `${jugador.nombre} se siente muy cómodo en el equipo. "Estoy en el mejor momento de mi carrera", declaró.`
            },
            {
                tipo: 'Elogio prensa',
                efectoAnimo: 8,
                titulo: '⭐ Elogio de la prensa',
                generarContenido: (jugador) => `Los medios destacan el gran nivel de ${jugador.nombre}: "Es uno de los mejores en su posición".`
            },
            {
                tipo: 'Crítica dura',
                efectoAnimo: -12,
                titulo: '📉 Críticas fuertes',
                generarContenido: (jugador) => `La prensa no perdona a ${jugador.nombre}: "Está muy lejos de su mejor nivel". El jugador parece afectado.`
            },
            {
                tipo: 'Veterano cansado',
                efectoAnimo: -8,
                titulo: '😓 Cansancio físico',
                generarContenido: (jugador) => `${jugador.nombre} (${jugador.edad} años) mostró signos de cansancio en el último entrenamiento. La edad empieza a pesar.`,
                filtro: (j) => j.edad >= 33 // Solo veteranos
            },
            {
                tipo: 'Veterano inspirador',
                efectoAnimo: 5,
                titulo: '👑 Liderazgo veterano',
                generarContenido: (jugador) => `${jugador.nombre}, con su experiencia de ${jugador.edad} años, está siendo clave en el vestuario. Los jóvenes lo escuchan.`,
                filtro: (j) => j.edad >= 30 && j.autoridad >= 70
            }
        ];
        
        const noticiasDisponibles = tiposNoticias.filter(n => !n.filtro);
        const noticiasConFiltro = tiposNoticias.filter(n => n.filtro);
        
        // Intentar primero noticias con filtro
        let noticia = null;
        let jugadorAfectado = null;
        
        for (const n of noticiasConFiltro) {
            const candidatos = equipo.jugadores.filter(n.filtro);
            if (candidatos.length > 0) {
                noticia = n;
                jugadorAfectado = candidatos[Math.floor(Math.random() * candidatos.length)];
                break;
            }
        }
        
        // Si no hay noticias con filtro disponibles, usar una normal
        if (!noticia) {
            noticia = noticiasDisponibles[Math.floor(Math.random() * noticiasDisponibles.length)];
            jugadorAfectado = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
        }
        
        // Afectar el ánimo del jugador
        jugadorAfectado.animo = Math.max(0, Math.min(100, jugadorAfectado.animo + noticia.efectoAnimo));
        
        agregarNoticia('general', noticia.titulo, noticia.generarContenido(jugadorAfectado));
        
        // Agregar mensaje al DT
        agregarMensaje(
            'Director Deportivo',
            'Directiva',
            '📋',
            `${partidaActual.manager}, necesitamos que hables con ${jugadorAfectado.nombre}. ${noticia.efectoAnimo < 0 ? 'Su ánimo está bajo y podría afectar su rendimiento.' : 'Está en un gran momento, aprovechalo.'}`
        );
    }
    
    // 20% probabilidad de noticia que afecte a todo el equipo
    if (Math.random() < 0.2) {
        const noticiasEquipo = [
            {
                efectoAnimo: 5,
                titulo: '🎉 ¡Gran ambiente en el plantel!',
                contenido: 'Los jugadores están muy motivados. El buen clima en el vestuario se nota en los entrenamientos.'
            },
            {
                efectoAnimo: -8,
                titulo: '😠 Tensión en el vestuario',
                contenido: 'Trascendió una discusión entre jugadores. El ambiente no es el mejor en estos momentos.'
            },
            {
                efectoAnimo: 7,
                titulo: '💪 Directiva renueva confianza',
                contenido: 'La dirigencia respaldó públicamente al cuerpo técnico. Los jugadores se sienten apoyados.'
            }
        ];
        
        const noticia = noticiasEquipo[Math.floor(Math.random() * noticiasEquipo.length)];
        
        // Afectar ánimo de todo el plantel
        equipo.jugadores.forEach(jugador => {
            jugador.animo = Math.max(0, Math.min(100, jugador.animo + noticia.efectoAnimo));
        });
        
        agregarNoticia('general', noticia.titulo, noticia.contenido);
    }
    
    // NUEVO: Veteranos con mucha edad más propensos a bajar ánimo naturalmente
    equipo.jugadores.forEach(jugador => {
        if (jugador.edad >= 35 && Math.random() < 0.15) {
            jugador.animo = Math.max(0, jugador.animo - 3);
            if (Math.random() < 0.5) {
                agregarMensaje(
                    jugador.nombre,
                    'Jugador',
                    '😓',
                    `DT, siento que ya no tengo el mismo ritmo que antes. Los años pesan... pero todavía puedo aportar mi experiencia al equipo.`
                );
            }
        }
    });
}

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // NUEVA FUNCIÓN: Simular partido con eventos cronológicos
        function simularPartidoConEventos(partido) {
            const local = equipos.find(e => e.id === partido.local);
            const visitante = equipos.find(e => e.id === partido.visitante);

            const strengthLocal = local.jugadores.reduce((sum, j) => sum + j.tiro + j.pase, 0);
            const strengthVisitante = visitante.jugadores.reduce((sum, j) => sum + j.tiro + j.pase, 0);

            const golesLocal = Math.floor(Math.random() * 4) + (strengthLocal > strengthVisitante ? 1 : 0);
            const golesVisitante = Math.floor(Math.random() * 4) + (strengthVisitante > strengthLocal ? 1 : 0);

            const eventos = [];
            let marcadorLocal = 0;
            let marcadorVisitante = 0;

            // Generar eventos de goles
            const totalGoles = golesLocal + golesVisitante;
            const minutosGoles = [];
            
            for (let i = 0; i < totalGoles; i++) {
                minutosGoles.push(Math.floor(Math.random() * 90) + 1);
            }
            minutosGoles.sort((a, b) => a - b);

            // Asignar goles a equipos
            let golesLocalRestantes = golesLocal;
            let golesVisitanteRestantes = golesVisitante;

            minutosGoles.forEach(minuto => {
                const esLocal = (golesLocalRestantes > 0 && golesVisitanteRestantes === 0) ||
                               (golesLocalRestantes > 0 && Math.random() > 0.5);
                
                if (esLocal && golesLocalRestantes > 0) {
                    marcadorLocal++;
                    golesLocalRestantes--;
                    const jugador = local.jugadores[Math.floor(Math.random() * local.jugadores.length)];
                    eventos.push({
                        minuto: minuto,
                        tipo: 'gol',
                        icono: '⚽',
                        descripcion: `¡GOL de ${jugador.nombre} (${local.nombre})!`,
                        marcador: `${marcadorLocal}-${marcadorVisitante}`
                    });
                } else if (golesVisitanteRestantes > 0) {
                    marcadorVisitante++;
                    golesVisitanteRestantes--;
                    const jugador = visitante.jugadores[Math.floor(Math.random() * visitante.jugadores.length)];
                    eventos.push({
                        minuto: minuto,
                        tipo: 'gol',
                        icono: '⚽',
                        descripcion: `¡GOL de ${jugador.nombre} (${visitante.nombre})!`,
                        marcador: `${marcadorLocal}-${marcadorVisitante}`
                    });
                }
            });

            // Agregar algunos eventos adicionales
            const eventosExtra = [
                { tipo: 'ocasion', icono: '🎯', texto: 'ocasión clara' },
                { tipo: 'falta', icono: '⚠️', texto: 'falta' },
                { tipo: 'tarjeta', icono: '🟨', texto: 'tarjeta amarilla' },
                { tipo: 'corner', icono: '📐', texto: 'tiro de esquina' }
            ];

            for (let i = 0; i < 5; i++) {
                const minuto = Math.floor(Math.random() * 90) + 1;
                const evento = eventosExtra[Math.floor(Math.random() * eventosExtra.length)];
                const equipo = Math.random() > 0.5 ? local : visitante;
                const jugador = equipo.jugadores[Math.floor(Math.random() * equipo.jugadores.length)];
                
                eventos.push({
                    minuto: minuto,
                    tipo: evento.tipo,
                    icono: evento.icono,
                    descripcion: `${jugador.nombre} (${equipo.nombre}) - ${evento.texto}`
                });
            }

            // Ordenar eventos por minuto
            eventos.sort((a, b) => a.minuto - b.minuto);

            // Actualizar estadísticas del partido
            partido.golesLocal = golesLocal;
            partido.golesVisitante = golesVisitante;
            partido.jugado = true;

            local.pj++;
            visitante.pj++;
            local.gf += golesLocal;
            local.gc += golesVisitante;
            visitante.gf += golesVisitante;
            visitante.gc += golesLocal;

            if (golesLocal > golesVisitante) {
                local.pg++;
                local.pts += 3;
                visitante.pp++;
            } else if (golesLocal < golesVisitante) {
                visitante.pg++;
                visitante.pts += 3;
                local.pp++;
            } else {
                local.pe++;
                visitante.pe++;
                local.pts++;
                visitante.pts++;
            }

            return eventos;
        }

        // NUEVA FUNCIÓN: Simular partido sin mostrar (para otros equipos)
        function simularPartidoSilencioso(partido) {
            const local = equipos.find(e => e.id === partido.local);
            const visitante = equipos.find(e => e.id === partido.visitante);

            const strengthLocal = local.jugadores.reduce((sum, j) => sum + j.tiro + j.pase, 0);
            const strengthVisitante = visitante.jugadores.reduce((sum, j) => sum + j.tiro + j.pase, 0);

            const golesLocal = Math.floor(Math.random() * 4) + (strengthLocal > strengthVisitante ? 1 : 0);
            const golesVisitante = Math.floor(Math.random() * 4) + (strengthVisitante > strengthLocal ? 1 : 0);

            partido.golesLocal = golesLocal;
            partido.golesVisitante = golesVisitante;
            partido.jugado = true;

            local.pj++;
            visitante.pj++;
            local.gf += golesLocal;
            local.gc += golesVisitante;
            visitante.gf += golesVisitante;
            visitante.gc += golesLocal;

            if (golesLocal > golesVisitante) {
                local.pg++;
                local.pts += 3;
                visitante.pp++;
            } else if (golesLocal < golesVisitante) {
                visitante.pg++;
                visitante.pts += 3;
                local.pp++;
            } else {
                local.pe++;
                visitante.pe++;
                local.pts++;
                visitante.pts++;
            }

            return {
                local: local.nombre,
                visitante: visitante.nombre,
                golesLocal,
                golesVisitante,
                fecha: partido.fecha
            };
        }

        function simularPartido(partido) {
            const local = equipos.find(e => e.id === partido.local);
            const visitante = equipos.find(e => e.id === partido.visitante);

            const strengthLocal = local.jugadores.reduce((sum, j) => sum + j.tiro + j.pase, 0);
            const strengthVisitante = visitante.jugadores.reduce((sum, j) => sum + j.tiro + j.pase, 0);

            const golesLocal = Math.floor(Math.random() * 4) + (strengthLocal > strengthVisitante ? 1 : 0);
            const golesVisitante = Math.floor(Math.random() * 4) + (strengthVisitante > strengthLocal ? 1 : 0);

            partido.golesLocal = golesLocal;
            partido.golesVisitante = golesVisitante;
            partido.jugado = true;

            local.pj++;
            visitante.pj++;
            local.gf += golesLocal;
            local.gc += golesVisitante;
            visitante.gf += golesVisitante;
            visitante.gc += golesLocal;

            if (golesLocal > golesVisitante) {
                local.pg++;
                local.pts += 3;
                visitante.pp++;
            } else if (golesLocal < golesVisitante) {
                visitante.pg++;
                visitante.pts += 3;
                local.pp++;
            } else {
                local.pe++;
                visitante.pe++;
                local.pts++;
                visitante.pts++;
            }

            return { local: local.nombre, visitante: visitante.nombre, golesLocal, golesVisitante };
        }

        async function cerrarModalPartido() {
    // NUEVO: Revisar si el soborno fue descubierto
    await revisarDescubrimientoSoborno();
    
    document.getElementById('partidoModal').style.display = 'none';
    mostrarInicio();
    mostrarTabla();
}

        
// MODIFICADO: Mostrar plantilla con nuevas estadísticas
// MODIFICADO: Mostrar plantilla ORGANIZADA por posiciones fijas
function mostrarPlantilla() {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    const titularesList = document.getElementById('titularesList');
    const suplentesList = document.getElementById('suplentesList');

    titularesList.innerHTML = '';
    suplentesList.innerHTML = '';

    // Definir estructura fija de posiciones
    const estructuraFormacion = [
        { posicion: 'POR', cantidad: 1, nombre: 'Portero' },
        { posicion: 'DFC', cantidad: 4, nombre: 'Defensores' },
        { posicion: 'MED', cantidad: 3, nombre: 'Mediocampistas' },
        { posicion: 'DEL', cantidad: 3, nombre: 'Delanteros' }
    ];

    // Mostrar TITULARES organizados por posición
    estructuraFormacion.forEach(grupo => {
        const tituloGrupo = document.createElement('h4');
        tituloGrupo.textContent = grupo.nombre;
        tituloGrupo.style.cssText = 'grid-column: 1 / -1; margin: 20px 0 10px; color: #a8b3cf; font-size: 1.1em;';
        titularesList.appendChild(tituloGrupo);

        for (let i = 0; i < grupo.cantidad; i++) {
            const posicionIndex = estructuraFormacion.slice(0, estructuraFormacion.indexOf(grupo))
                .reduce((sum, g) => sum + g.cantidad, 0) + i;
            
            const jugadorId = equipo.starting11[posicionIndex];
            const jugador = equipo.jugadores.find(j => j.id === jugadorId);
            
            if (jugador) {
                const card = crearJugadorCard(jugador, grupo.posicion, true);
                titularesList.appendChild(card);
            }
        }
    });

    // Mostrar SUPLENTES
    const suplentesTitle = document.createElement('h4');
    suplentesTitle.textContent = 'Suplentes';
    suplentesTitle.style.cssText = 'grid-column: 1 / -1; margin: 20px 0 10px; color: #a8b3cf; font-size: 1.1em;';
    suplentesList.appendChild(suplentesTitle);

    equipo.jugadores.forEach(jugador => {
        if (!equipo.starting11.includes(jugador.id)) {
            const card = crearJugadorCard(jugador, null, false);
            suplentesList.appendChild(card);
        }
    });
}
// NUEVO SISTEMA DE MERCADO DE PASES

// Agregar presupuesto inicial a los equipos
function inicializarPresupuestos() {
    const equiposGrandes = ['River Plate', 'Boca Juniors', 'Racing Club', 'Independiente', 'San Lorenzo'];
    const equiposMedianitos = ['Vélez Sarsfield', 'Huracán', 'Estudiantes', 'Gimnasia LP', 'Argentinos Juniors', 'Lanús'];
    
    equipos.forEach(equipo => {
        if (equiposGrandes.includes(equipo.nombre)) {
            equipo.presupuesto = Math.floor(Math.random() * 15000000) + 35000000; // 35-50M
        } else if (equiposMedianitos.includes(equipo.nombre)) {
            equipo.presupuesto = Math.floor(Math.random() * 10000000) + 15000000; // 15-25M
        } else {
            equipo.presupuesto = Math.floor(Math.random() * 8000000) + 5000000; // 5-13M
        }
    });
}

// Calcular valor de mercado de un jugador
function calcularValorMercado(jugador) {
    let valorBase = 100000;
    
    // Promedio de stats
    const promedioStats = (jugador.velocidad + jugador.regate + jugador.tiro + jugador.defensa + jugador.pase + jugador.fisico) / 6;
    valorBase += promedioStats * 50000;
    
    // Edad (las promesas valen más)
    if (jugador.edad <= 23 && jugador.potencial > 75) {
        valorBase *= 2.5; // PROMESAS VALEN MUCHO
        if (jugador.potencial >= 85) {
            valorBase *= 1.8; // Promesa de élite
        }
    } else if (jugador.edad >= 30) {
        valorBase *= 0.3; // Veteranos valen poco
    } else if (jugador.edad >= 26 && jugador.edad <= 29) {
        valorBase *= 1.2; // Jugadores en su mejor momento
    }
    
    // Mentalidad
    if (jugador.mentalidad === 'Frío' || jugador.mentalidad === 'Equilibrado') {
        valorBase *= 1.1;
    } else if (jugador.mentalidad === 'Provocador') {
        valorBase *= 0.8;
    }
    
    // Ánimo
    if (jugador.animo < 50) {
        valorBase *= 0.7;
    } else if (jugador.animo > 85) {
        valorBase *= 1.15;
    }
    
    // Cualidades especiales
    if (jugador.cualidades && jugador.cualidades.length > 0) {
        jugador.cualidades.forEach(cualidad => {
            if (['Goleador Nato', 'Líder Natural', 'Clutch', 'Visión de Juego'].includes(cualidad.nombre)) {
                valorBase *= 1.3;
            }
        });
    }
    
    // Partidos jugados (experiencia)
    if (jugador.partidosJugados > 50) {
        valorBase *= 1.1;
    }
    
    // Nacionalidad (extranjeros valen más en Argentina)
    if (jugador.nacionalidad !== 'Argentina') {
        valorBase *= 1.2;
    }
    
    return Math.floor(valorBase);
}

// Generar ofertas de otros equipos por nuestros jugadores
function generarOfertasPorMisJugadores() {
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    const otrosEquipos = equipos.filter(e => e.id !== partidaActual.equipoId);
    
    // Solo ofertan por promesas o jugadores buenos que NO son titulares
    const jugadoresAtractivos = miEquipo.jugadores.filter(j => {
        const esTitular = miEquipo.starting11.includes(j.id);
        const esPromesa = j.edad <= 23 && j.potencial >= 75;
        const esBueno = (j.velocidad + j.regate + j.tiro + j.defensa + j.pase + j.fisico) / 6 >= 75;
        
        return (esPromesa || esBueno) && !esTitular && Math.random() < 0.3;
    });
    
    if (jugadoresAtractivos.length === 0) return null;
    
    const jugadorOfertado = jugadoresAtractivos[Math.floor(Math.random() * jugadoresAtractivos.length)];
    const equipoInteresado = otrosEquipos[Math.floor(Math.random() * otrosEquipos.length)];
    
    const valorReal = calcularValorMercado(jugadorOfertado);
    const montoOferta = Math.floor(valorReal * (0.8 + Math.random() * 0.4)); // 80%-120% del valor
    
    // Verificar que el equipo tenga presupuesto
    if (equipoInteresado.presupuesto < montoOferta) return null;
    
    return {
        tipo: 'oferta_recibida',
        jugador: jugadorOfertado,
        equipoInteresado: equipoInteresado,
        monto: montoOferta,
        valorReal: valorReal,
        fecha: new Date(fechaActual),
        expira: 7 // días
    };
}

// Generar jugadores disponibles en el mercado
function generarJugadoresDisponibles() {
    const otrosEquipos = equipos.filter(e => e.id !== partidaActual.equipoId);
    const jugadoresDisponibles = [];
    
    otrosEquipos.forEach(equipo => {
        // Cada equipo puede tener 1-3 jugadores en venta (suplentes o que quieren irse)
        const jugadoresEnVenta = equipo.jugadores.filter(j => {
            const esTitular = equipo.starting11.includes(j.id);
            const animoBajo = j.animo < 50;
            const esViejo = j.edad >= 32;
            
            return (!esTitular || animoBajo || esViejo) && Math.random() < 0.15;
        }).slice(0, 3);
        
        jugadoresEnVenta.forEach(jugador => {
            const valor = calcularValorMercado(jugador);
            jugadoresDisponibles.push({
                jugador: jugador,
                equipoActual: equipo,
                precio: valor,
                disponible: true
            });
        });
    });
    
    return jugadoresDisponibles;
}

// Mostrar mercado de pases
function mostrarMercado() {
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    const container = document.getElementById('mercadoTab');
    
    if (!partidaActual.mercado) {
        partidaActual.mercado = {
            ofertas: [],
            jugadoresDisponibles: generarJugadoresDisponibles()
        };
    }
    
    container.innerHTML = `
        <div style="display: grid; gap: 30px;">
            <!-- Presupuesto -->
            <div style="background: rgba(20, 30, 70, 0.4); padding: 30px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <h3 style="margin-bottom: 20px;">💰 Presupuesto del Club</h3>
                <div style="font-size: 2.5em; font-weight: 900; color: #10b981;">
                    $${formatearDinero(miEquipo.presupuesto)}
                </div>
                <p style="color: #7c8ba1; margin-top: 12px;">Disponible para fichajes</p>
            </div>
            
            <!-- Tabs del mercado -->
            <div style="display: flex; gap: 12px; background: rgba(10, 14, 39, 0.4); padding: 8px; border-radius: 12px;">
                <button class="mercado-subtab active" onclick="mostrarSubTabMercado('ofertas')">
                    📥 Ofertas Recibidas <span id="badge-ofertas" style="background: #ef4444; padding: 2px 8px; border-radius: 10px; font-size: 0.8em; margin-left: 8px;">0</span>
                </button>
                <button class="mercado-subtab" onclick="mostrarSubTabMercado('buscar')">🔍 Buscar Jugadores</button>
                <button class="mercado-subtab" onclick="mostrarSubTabMercado('vender')">💸 Poner en Venta</button>
                <button class="mercado-subtab" onclick="mostrarSubTabMercado('libres')">🆓 Agentes Libres</button>
            </div>
            
            <!-- Contenido de las tabs -->
            <div id="mercado-subtab-content"></div>
        </div>
    `;
    
    mostrarSubTabMercado('ofertas');
}

// Mostrar sub-tabs del mercado
function mostrarSubTabMercado(tipo) {
    document.querySelectorAll('.mercado-subtab').forEach(t => t.classList.remove('active'));
    event?.target.classList.add('active');
    
    const container = document.getElementById('mercado-subtab-content');
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    
    if (tipo === 'ofertas') {
        // Generar nuevas ofertas si no hay
        if (partidaActual.mercado.ofertas.length === 0 && Math.random() < 0.7) {
            const oferta = generarOfertasPorMisJugadores();
            if (oferta) partidaActual.mercado.ofertas.push(oferta);
        }
        
        document.getElementById('badge-ofertas').textContent = partidaActual.mercado.ofertas.length;
        
        if (partidaActual.mercado.ofertas.length === 0) {
            container.innerHTML = '<div class="empty-state">No hay ofertas por tus jugadores en este momento</div>';
            return;
        }
        
        container.innerHTML = '<h3 style="margin-bottom: 20px;">📥 Ofertas por tus jugadores</h3>';
        
        partidaActual.mercado.ofertas.forEach((oferta, index) => {
            const esOfertaBuena = oferta.monto >= oferta.valorReal * 1.1;
            const esOfertaMala = oferta.monto < oferta.valorReal * 0.9;
            
            const ofertaCard = document.createElement('div');
            ofertaCard.style.cssText = `
                background: rgba(20, 30, 70, 0.3);
                padding: 24px;
                border-radius: 12px;
                border: 1px solid ${esOfertaBuena ? '#10b981' : esOfertaMala ? '#ef4444' : 'rgba(255, 255, 255, 0.08)'};
                margin-bottom: 16px;
            `;
            
            ofertaCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                            <h4 style="font-size: 1.5em; margin: 0;">${oferta.jugador.nombre}</h4>
                            <span style="font-size: 1.5em;">${oferta.jugador.nacionalidad.icono}</span>
                        </div>
                        <div style="color: #7c8ba1; margin-bottom: 12px;">
                            ${oferta.jugador.posicion} • ${oferta.jugador.edad} años • Ánimo: ${oferta.jugador.animo}%
                        </div>
                        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                            <span style="padding: 6px 12px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; font-size: 0.9em;">
                                Promedio: ${Math.floor((oferta.jugador.velocidad + oferta.jugador.regate + oferta.jugador.tiro + oferta.jugador.defensa + oferta.jugador.pase + oferta.jugador.fisico) / 6)}
                            </span>
                            ${oferta.jugador.potencial > 0 ? `<span style="padding: 6px 12px; background: rgba(16, 185, 129, 0.2); border-radius: 6px; font-size: 0.9em;">⭐ Potencial: ${oferta.jugador.potencial}</span>` : ''}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.9em; color: #7c8ba1; margin-bottom: 4px;">Interesado:</div>
                        <div style="font-weight: 700; font-size: 1.1em; color: #3b82f6;">${oferta.equipoInteresado.nombre}</div>
                    </div>
                </div>
                
                <div style="background: rgba(10, 14, 39, 0.5); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 0.9em; color: #7c8ba1; margin-bottom: 4px;">Oferta:</div>
                            <div style="font-size: 2em; font-weight: 900; color: ${esOfertaBuena ? '#10b981' : esOfertaMala ? '#ef4444' : '#eab308'};">
                                $${formatearDinero(oferta.monto)}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 0.9em; color: #7c8ba1; margin-bottom: 4px;">Valor estimado:</div>
                            <div style="font-size: 1.2em; font-weight: 700;">$${formatearDinero(oferta.valorReal)}</div>
                        </div>
                    </div>
                    <div style="margin-top: 12px; padding: 12px; background: ${esOfertaBuena ? 'rgba(16, 185, 129, 0.1)' : esOfertaMala ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)'}; border-radius: 6px;">
                        ${esOfertaBuena ? '✅ Oferta muy buena, es más de lo que vale' : esOfertaMala ? '❌ Oferta baja, vale más que eso' : '⚠️ Oferta justa, similar al valor de mercado'}
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn-success" onclick="aceptarOferta(${index})" style="flex: 1;">
                        ✅ Aceptar Oferta
                    </button>
                    <button class="btn btn-secondary" onclick="contraoferta(${index})" style="flex: 1;">
                        💬 Contraoferta
                    </button>
                    <button class="btn btn-danger" onclick="rechazarOferta(${index})">
                        ❌ Rechazar
                    </button>
                </div>
            `;
            
            container.appendChild(ofertaCard);
        });
        
    } else if (tipo === 'buscar') {
        container.innerHTML = `
            <h3 style="margin-bottom: 20px;">🔍 Jugadores Disponibles</h3>
            <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
                <button class="btn btn-secondary" onclick="filtrarMercado('todos')">Todos</button>
                <button class="btn btn-secondary" onclick="filtrarMercado('promesas')">⭐ Promesas</button>
                <button class="btn btn-secondary" onclick="filtrarMercado('experiencia')">👴 Experiencia</button>
                <button class="btn btn-secondary" onclick="filtrarMercado('baratos')">💰 Baratos</button>
            </div>
            <div id="lista-jugadores-mercado"></div>
        `;
        
        mostrarJugadoresDisponibles();
        
    } else if (tipo === 'vender') {
        container.innerHTML = '<h3 style="margin-bottom: 20px;">💸 Poner jugadores en venta o liberar</h3>';
        
        const jugadoresVendibles = miEquipo.jugadores.filter(j => !miEquipo.starting11.includes(j.id));
        
        if (jugadoresVendibles.length === 0) {
            container.innerHTML += '<div class="empty-state">Todos tus jugadores son titulares</div>';
            return;
        }
        
        jugadoresVendibles.forEach(jugador => {
            const valor = calcularValorMercado(jugador);
            const esPromesa = jugador.edad <= 23 && jugador.potencial >= 75;
            
            const card = document.createElement('div');
            card.style.cssText = `
                background: rgba(20, 30, 70, 0.3);
                padding: 20px;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                margin-bottom: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            
            card.innerHTML = `
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <h4 style="margin: 0;">${jugador.nombre}</h4>
                        <span>${jugador.nacionalidad.icono}</span>
                        ${esPromesa ? '<span style="padding: 4px 10px; background: #10b981; border-radius: 6px; font-size: 0.8em;">⭐ PROMESA</span>' : ''}
                    </div>
                    <div style="color: #7c8ba1; font-size: 0.9em; margin-bottom: 12px;">
                        ${jugador.posicion} • ${jugador.edad} años • Promedio: ${Math.floor((jugador.velocidad + jugador.regate + jugador.tiro + jugador.defensa + jugador.pase + jugador.fisico) / 6)}
                    </div>
                    <div style="font-size: 1.3em; font-weight: 700; color: #10b981;">
                        Valor: $${formatearDinero(valor)}
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn-primary" onclick="ofrecerJugador('${jugador.id}', ${valor})">
                        📢 Ofrecer
                    </button>
                    <button class="btn btn-danger" onclick="liberarJugador('${jugador.id}')">
                        🆓 Liberar
                    </button>
                </div>
            `;
            
            container.appendChild(card);
        });
        
    } else if (tipo === 'libres') {
        container.innerHTML = '<h3 style="margin-bottom: 20px;">🆓 Agentes Libres (Veteranos y Jugadores Sin Contrato)</h3>';
        
        // Generar algunos agentes libres random
        const agentesLibres = [];
        for (let i = 0; i < 5; i++) {
            const edad = Math.floor(Math.random() * 8) + 30; // 30-37
            const nacionalidadRandom = nacionalidades[Math.floor(Math.random() * nacionalidades.length)];
            const posicion = ['POR', 'DFC', 'MED', 'DEL'][Math.floor(Math.random() * 4)];
            
            agentesLibres.push({
                nombre: `${apellidos[Math.floor(Math.random() * apellidos.length)]} ${nombres[Math.floor(Math.random() * nombres.length)]}`,
                edad: edad,
                posicion: posicion,
                nacionalidad: nacionalidadRandom,
                velocidad: Math.floor(Math.random() * 20) + 60,
                regate: Math.floor(Math.random() * 20) + 60,
                tiro: Math.floor(Math.random() * 20) + 60,
                defensa: Math.floor(Math.random() * 20) + 60,
                pase: Math.floor(Math.random() * 20) + 60,
                fisico: Math.floor(Math.random() * 15) + 55,
                sueldo: Math.floor(Math.random() * 500000) + 200000
            });
        }
        
        agentesLibres.forEach(jugador => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: rgba(20, 30, 70, 0.3);
                padding: 20px;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                margin-bottom: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            
            card.innerHTML = `
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <h4 style="margin: 0;">${jugador.nombre}</h4>
                        <span>${jugador.nacionalidad.icono}</span>
                        <span style="padding: 4px 10px; background: #7c8ba1; border-radius: 6px; font-size: 0.8em;">🆓 LIBRE</span>
                    </div>
                    <div style="color: #7c8ba1; font-size: 0.9em; margin-bottom: 12px;">
                        ${jugador.posicion} • ${jugador.edad} años • Promedio: ${Math.floor((jugador.velocidad + jugador.regate + jugador.tiro + jugador.defensa + jugador.pase + jugador.fisico) / 6)}
                    </div>
                    <div style="display: flex; gap: 20px;">
                        <div>
                            <div style="font-size: 0.8em; color: #7c8ba1;">VEL: ${jugador.velocidad}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.8em; color: #7c8ba1;">TIR: ${jugador.tiro}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.8em; color: #7c8ba1;">PAS: ${jugador.pase}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.8em; color: #7c8ba1;">FIS: ${jugador.fisico}</div>
                        </div>
                    </div>
                    <div style="margin-top: 12px; color: #eab308; font-weight: 700;">
                        Sueldo pedido: $${formatearDinero(jugador.sueldo)}/año
                    </div>
                </div>
                <button class="btn btn-success" onclick="alert('Función de contratar agente libre en desarrollo')">
                    ✍️ Contratar
                </button>
            `;
            
            container.appendChild(card);
        });
    }
}

// Formatear dinero
function formatearDinero(monto) {
    if (monto >= 1000000) {
        return (monto / 1000000).toFixed(1) + 'M';
    } else if (monto >= 1000) {
        return (monto / 1000).toFixed(0) + 'K';
    }
    return monto.toString();
}

// Aceptar oferta
function aceptarOferta(index) {
    const oferta = partidaActual.mercado.ofertas[index];
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    
    if (confirm(`¿Confirmar venta de ${oferta.jugador.nombre} a ${oferta.equipoInteresado.nombre} por $${formatearDinero(oferta.monto)}?`)) {
        // Transferir dinero
        miEquipo.presupuesto += oferta.monto;
        oferta.equipoInteresado.presupuesto -= oferta.monto;
        
        // Transferir jugador
        const jugadorIndex = miEquipo.jugadores.findIndex(j => j.id === oferta.jugador.id);
        const jugadorTransferido = miEquipo.jugadores.splice(jugadorIndex, 1)[0];
        jugadorTransferido.id = `${oferta.equipoInteresado.id}-${oferta.equipoInteresado.jugadores.length}`;
        oferta.equipoInteresado.jugadores.push(jugadorTransferido);
        
        // Eliminar oferta
        partidaActual.mercado.ofertas.splice(index, 1);
        
        // Notificaciones
        agregarNoticia('mercado', `¡Venta confirmada!`, `${jugadorTransferido.nombre} fue transferido a ${oferta.equipoInteresado.nombre} por $${formatearDinero(oferta.monto)}`);
        agregarMensaje('Director Deportivo', 'Directiva', '💰', `Excelente venta, ${partidaActual.manager}. Ingresaron $${formatearDinero(oferta.monto)} a las arcas del club.`);
        
        mostrarMercado();
    }
}

// Rechazar oferta
function rechazarOferta(index) {
    if (confirm('¿Rechazar esta oferta?')) {
        const oferta = partidaActual.mercado.ofertas[index];
        partidaActual.mercado.ofertas.splice(index, 1);
        agregarMensaje('Director Deportivo', 'Directiva', '📋', `Rechazaste la oferta de ${oferta.equipoInteresado.nombre} por ${oferta.jugador.nombre}.`);
        mostrarMercado();
    }
}

// Liberar jugador
function liberarJugador(jugadorId) {
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    const jugador = miEquipo.jugadores.find(j => j.id === jugadorId);
    
    if (confirm(`¿Liberar a ${jugador.nombre}? No recibirás dinero y no podrás recuperarlo.`)) {
        const jugadorIndex = miEquipo.jugadores.findIndex(j => j.id === jugadorId);
        miEquipo.jugadores.splice(jugadorIndex, 1);
        
        agregarNoticia('mercado', `${jugador.nombre} fue liberado`, `El club decidió rescindir el contrato con ${jugador.nombre}.`);
        agregarMensaje(jugador.nombre, 'Ex-Jugador', '😢', `Me duele irme así del club. Ojalá les vaya bien. Gracias por todo.`);
        
        mostrarMercado();
    }
}

// Mostrar jugadores disponibles
function mostrarJugadoresDisponibles(filtro = 'todos') {
    const container = document.getElementById('lista-jugadores-mercado');
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    
    let jugadores = partidaActual.mercado.jugadoresDisponibles;
    
    if (filtro === 'promesas') {
        jugadores = jugadores.filter(j => j.jugador.edad <= 23 && j.jugador.potencial >= 75);
    } else if (filtro === 'experiencia') {
        jugadores = jugadores.filter(j => j.jugador.edad >= 30);
    } else if (filtro === 'baratos') {
        jugadores = jugadores.filter(j => j.precio <= 2000000).sort((a, b) => a.precio - b.precio);
    }
    
    if (jugadores.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay jugadores disponibles con este filtro</div>';
        return;
    }
    
    container.innerHTML = '';
    
    jugadores.forEach(item => {
        const jugador = item.jugador;
        const esPromesa = jugador.edad <= 23 && jugador.potencial >= 75;
        const puedeComprar = miEquipo.presupuesto >= item.precio;
        
        const card = document.createElement('div');
        card.style.cssText = `
            background: rgba(20, 30, 70, 0.3);
            padding: 24px;
            border-radius: 12px;
            border: 1px solid ${esPromesa ? '#10b981' : 'rgba(255, 255, 255, 0.08)'};
            margin-bottom: 16px;
        `;
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <h4 style="font-size: 1.4em; margin: 0;">${jugador.nombre}</h4>
                        <span style="font-size: 1.5em;">${jugador.nacionalidad.icono}</span>
                        ${esPromesa ? '<span style="padding: 4px 10px; background: #10b981; border-radius: 6px; font-size: 0.8em;">⭐ PROMESA</span>' : ''}
                    </div>
                    <div style="color: #7c8ba1; margin-bottom: 16px; font-size: 0.95em;">
                        ${jugador.posicion} • ${jugador.edad} años • Ánimo: ${jugador.animo}%
                    </div>
                    <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
                        ${jugador.cualidades && jugador.cualidades.length > 0 ? jugador.cualidades.map(c => `
                            <span style="padding: 6px 12px; background: rgba(139, 92, 246, 0.2); border-radius: 6px; font-size: 0.85em;">
                                ${c.icono} ${c.nombre}
                            </span>
                        `).join('') : ''}
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 16px;">
                        <div style="text-align: center;">
                            <div style="font-size: 0.75em; color: #7c8ba1;">VEL</div>
                            <div style="font-weight: 700; font-size: 1.1em;">${jugador.velocidad}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.75em; color: #7c8ba1;">REG</div>
                            <div style="font-weight: 700; font-size: 1.1em;">${jugador.regate}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.75em; color: #7c8ba1;">TIR</div>
                            <div style="font-weight: 700; font-size: 1.1em;">${jugador.tiro}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.75em; color: #7c8ba1;">DEF</div>
                            <div style="font-weight: 700; font-size: 1.1em;">${jugador.defensa}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.75em; color: #7c8ba1;">PAS</div>
                            <div style="font-weight: 700; font-size: 1.1em;">${jugador.pase}</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.75em; color: #7c8ba1;">FIS</div>
                            <div style="font-weight: 700; font-size: 1.1em;">${jugador.fisico}</div>
                        </div>
                    </div>
                    ${jugador.potencial > 0 ? `
                        <div style="padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 3px solid #10b981; margin-bottom: 16px;">
                            <div style="font-size: 0.85em; color: #7c8ba1;">Potencial máximo</div>
                            <div style="font-size: 1.3em; font-weight: 700; color: #10b981;">${jugador.potencial}</div>
                        </div>
                    ` : ''}
                    <div style="color: #7c8ba1; font-size: 0.9em;">
                        Actualmente en: <span style="color: #3b82f6; font-weight: 700;">${item.equipoActual.nombre}</span>
                    </div>
                </div>
                <div style="text-align: right; min-width: 200px; margin-left: 20px;">
                    <div style="font-size: 0.9em; color: #7c8ba1; margin-bottom: 8px;">Precio:</div>
                    <div style="font-size: 2.2em; font-weight: 900; color: #10b981; margin-bottom: 20px;">
                        $${formatearDinero(item.precio)}
                    </div>
                    <button 
                        class="btn ${puedeComprar ? 'btn-success' : 'btn-secondary'}" 
                        onclick="${puedeComprar ? `comprarJugador('${jugador.id}', '${item.equipoActual.id}', ${item.precio})` : 'alert("No tienes suficiente presupuesto")'}"
                        style="width: 100%;"
                        ${!puedeComprar ? 'disabled' : ''}
                    >
                        ${puedeComprar ? '💰 Comprar' : '❌ Sin presupuesto'}
                    </button>
                    ${!puedeComprar ? `
                        <div style="margin-top: 12px; padding: 8px; background: rgba(239, 68, 68, 0.1); border-radius: 6px; font-size: 0.85em; color: #ef4444;">
                            Te faltan: $${formatearDinero(item.precio - miEquipo.presupuesto)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}
// Ofrecer jugador (poner en el mercado)
function ofrecerJugador(jugadorId, valor) {
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    const jugador = miEquipo.jugadores.find(j => j.id === jugadorId);
    
    // Agregar al mercado
    partidaActual.mercado.jugadoresDisponibles.push({
        jugador: jugador,
        equipoActual: miEquipo,
        precio: valor,
        disponible: true
    });
    
    // Bajar ánimo del jugador (no le gusta que lo pongan en venta)
    jugador.animo = Math.max(0, jugador.animo - 15);
    
    agregarNoticia('mercado', `${jugador.nombre} en el mercado`, `El club puso a ${jugador.nombre} en la lista de transferibles.`);
    agregarMensaje(jugador.nombre, 'Jugador', '😞', `Me entero por los medios que me pusieron en venta... Esto no me gusta nada. Pensé que contaban conmigo.`);
    
    alert(`${jugador.nombre} fue puesto en el mercado por $${formatearDinero(valor)}. Otros equipos pueden hacer ofertas.`);
    mostrarMercado();
}

// Contraoferta (negociar)
function contraoferta(index) {
    const oferta = partidaActual.mercado.ofertas[index];
    const nuevoMonto = prompt(`La oferta actual es de $${formatearDinero(oferta.monto)}.\n\n¿Cuánto quieres pedir? (valor estimado: $${formatearDinero(oferta.valorReal)})`);
    
    if (!nuevoMonto) return;
    
    const montoNumerico = parseInt(nuevoMonto);
    
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
        alert('Monto inválido');
        return;
    }
    
    // Probabilidad de aceptación según el monto
    const porcentajeSobreValor = (montoNumerico / oferta.valorReal) * 100;
    let probabilidadAceptacion = 0;
    
    if (porcentajeSobreValor <= 100) {
        probabilidadAceptacion = 0.95; // Muy probable que acepten
    } else if (porcentajeSobreValor <= 120) {
        probabilidadAceptacion = 0.7; // Probable
    } else if (porcentajeSobreValor <= 150) {
        probabilidadAceptacion = 0.4; // Difícil
    } else {
        probabilidadAceptacion = 0.1; // Casi imposible
    }
    
    // Simular respuesta
    if (Math.random() < probabilidadAceptacion) {
        // Aceptaron la contraoferta
        oferta.monto = montoNumerico;
        agregarMensaje('Director Deportivo', 'Directiva', '✅', `¡Buenas noticias! ${oferta.equipoInteresado.nombre} aceptó tu contraoferta de $${formatearDinero(montoNumerico)} por ${oferta.jugador.nombre}.`);
        alert(`¡${oferta.equipoInteresado.nombre} aceptó tu contraoferta!`);
    } else {
        // Rechazaron
        agregarMensaje('Director Deportivo', 'Directiva', '❌', `${oferta.equipoInteresado.nombre} rechazó tu contraoferta de $${formatearDinero(montoNumerico)}. Dicen que es demasiado.`);
        alert(`${oferta.equipoInteresado.nombre} rechazó tu contraoferta. Pides demasiado.`);
    }
    
    mostrarMercado();
}

// Generar ofertas automáticas cada ciertos días
function generarOfertasAleatorias() {
    if (Math.random() < 0.4) { // 40% de probabilidad cada día
        const oferta = generarOfertasPorMisJugadores();
        if (oferta && !partidaActual.mercado.ofertas.find(o => o.jugador.id === oferta.jugador.id)) {
            partidaActual.mercado.ofertas.push(oferta);
            agregarNoticia('mercado', `📥 Nueva oferta recibida`, `${oferta.equipoInteresado.nombre} está interesado en ${oferta.jugador.nombre}`);
        }
    }
}
// Filtrar mercado
function filtrarMercado(tipo) {
    mostrarJugadoresDisponibles(tipo);
}
// Función para agregar al avance del día
function actualizarMercadoEnAvanceDia() {
    // Asegurarse de que partidaActual.mercado esté inicializado
    if (!partidaActual.mercado) {
        partidaActual.mercado = {
            ofertas: [],
            jugadoresDisponibles: generarJugadoresDisponibles()
        };
    }
    
    // Generar nuevas ofertas
    generarOfertasAleatorias();
    
    // Expirar ofertas antiguas
    partidaActual.mercado.ofertas = partidaActual.mercado.ofertas.filter(oferta => {
        const diasPasados = Math.floor((fechaActual - oferta.fecha) / (1000 * 60 * 60 * 24));
        if (diasPasados >= oferta.expira) {
            agregarNoticia('mercado', `Oferta expirada`, `La oferta de ${oferta.equipoInteresado.nombre} por ${oferta.jugador.nombre} expiró.`);
            return false;
        }
        return true;
    });
    
    // Actualizar mercado cada 7 días
    const diasDesdeInicio = Math.floor((fechaActual - partidaActual.fechaInicial) / (1000 * 60 * 60 * 24));
    if (diasDesdeInicio % 7 === 0) {
        partidaActual.mercado.jugadoresDisponibles = generarJugadoresDisponibles();
    }
}

// Comprar jugador
function comprarJugador(jugadorId, equipoActualId, precio) {
    const miEquipo = equipos.find(e => e.id === partidaActual.equipoId);
    const equipoVendedor = equipos.find(e => e.id === parseInt(equipoActualId));
    const jugador = equipoVendedor.jugadores.find(j => j.id === jugadorId);
    
    if (!confirm(`¿Confirmar compra de ${jugador.nombre} por $${formatearDinero(precio)}?`)) {
        return;
    }
    
    if (miEquipo.presupuesto < precio) {
        alert('No tienes suficiente presupuesto');
        return;
    }
    
    // Verificar que no tenga demasiados jugadores
    if (miEquipo.jugadores.length >= 25) {
        alert('Tu plantilla está completa (máximo 25 jugadores). Libera o vende jugadores primero.');
        return;
    }
    
    // Realizar transferencia
    miEquipo.presupuesto -= precio;
    equipoVendedor.presupuesto += precio;
    
    // Transferir jugador
    const jugadorIndex = equipoVendedor.jugadores.findIndex(j => j.id === jugadorId);
    const jugadorComprado = equipoVendedor.jugadores.splice(jugadorIndex, 1)[0];
    
    // Cambiar ID y agregar a mi equipo
    jugadorComprado.id = `${miEquipo.id}-${miEquipo.jugadores.length}`;
    jugadorComprado.posicion = jugadorComprado.posicionNatural || jugadorComprado.posicion;
    jugadorComprado.animo = Math.min(100, jugadorComprado.animo + 15); // Llega motivado
    miEquipo.jugadores.push(jugadorComprado);
    
    // Eliminar de mercado
    partidaActual.mercado.jugadoresDisponibles = partidaActual.mercado.jugadoresDisponibles.filter(
        j => j.jugador.id !== jugadorId
    );
    
    // Notificaciones
    agregarNoticia('mercado', `¡Fichaje confirmado! 🎉`, `${jugadorComprado.nombre} es nuevo jugador de ${miEquipo.nombre} por $${formatearDinero(precio)}`);
    agregarMensaje('Director Deportivo', 'Directiva', '✅', `Gran fichaje, ${partidaActual.manager}. ${jugadorComprado.nombre} llega para reforzar el plantel.`);
    agregarMensaje(jugadorComprado.nombre, 'Jugador', '😊', `¡Estoy muy feliz de llegar a ${miEquipo.nombre}! Voy a dar todo por esta camiseta. Gracias por la confianza, DT.`);
    
    // Si es promesa, mensaje especial
    if (jugadorComprado.edad <= 23 && jugadorComprado.potencial >= 80) {
        setTimeout(() => {
            agregarMensaje('Medios de Comunicación', 'Prensa', '📰', `¡BOMBAZO! ${miEquipo.nombre} fichó a la joven promesa ${jugadorComprado.nombre}. Los hinchas están eufóricos.`);
        }, 500);
    }
    
    mostrarMercado();
}
// MODIFICADO: Crear card de jugador con TODAS las nuevas stats
function crearJugadorCard(jugador, posicionEnCancha, esTitular) {
    const card = document.createElement('div');
    card.className = 'jugador-card';
    if (selectedPlayer === jugador.id) card.classList.add('selected');
    
    let penalizacion = 0;
    let fueraDePosicion = false;
    if (esTitular && posicionEnCancha && jugador.posicion !== posicionEnCancha) {
        penalizacion = calcularPenalizacionPosicion(jugador, posicionEnCancha);
        fueraDePosicion = true;
    }
    
    const animoColor = jugador.animo >= 75 ? '#10b981' : jugador.animo >= 50 ? '#eab308' : '#ef4444';
    const mentalidadIcon = {
        'Frío': '❄️',
        'Equilibrado': '⚖️',
        'Caliente': '🔥',
        'Provocador': '😈'
    }[jugador.mentalidad];
    
    const statsAjustadas = {
        velocidad: Math.max(0, jugador.velocidad + (penalizacion || 0)),
        tiro: Math.max(0, jugador.tiro + (penalizacion || 0)),
        pase: Math.max(0, jugador.pase + (penalizacion || 0)),
        regate: Math.max(0, jugador.regate + (penalizacion || 0)),
        defensa: Math.max(0, jugador.defensa + (penalizacion || 0)),
        fisico: Math.max(0, jugador.fisico + (penalizacion || 0))
    };
    
    // Color de la edad
    const edadColor = jugador.edad >= 33 ? '#ef4444' : jugador.edad <= 22 ? '#3b82f6' : '#a8b3cf';
    
    card.innerHTML = `
        <h4>${jugador.nombre}</h4>
        <div style="display: flex; gap: 8px; margin-bottom: 8px; align-items: center; flex-wrap: wrap;">
            <span class="posicion">${jugador.posicion}</span>
            ${fueraDePosicion ? `
                <span style="padding: 4px 8px; background: #ef4444; border-radius: 6px; font-size: 0.75em; font-weight: 700; animation: pulse 2s infinite;">
                    ⚠️ FUERA DE POSICIÓN
                </span>
            ` : ''}
            <span style="padding: 4px 8px; background: rgba(100, 100, 100, 0.3); border-radius: 6px; font-size: 0.75em;">
                ${jugador.nacionalidad}
            </span>
            <span style="padding: 4px 8px; background: rgba(100, 100, 100, 0.3); border-radius: 6px; font-size: 0.75em; color: ${edadColor};">
                ${jugador.edad} años
            </span>
            <span style="padding: 4px 8px; background: rgba(100, 100, 100, 0.3); border-radius: 6px; font-size: 0.75em;">
                ${jugador.altura} cm
            </span>
        </div>
        
        ${jugador.cualidades.length > 0 ? `
            <div style="display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap;">
                ${jugador.cualidades.map(c => `
                    <span style="padding: 4px 10px; background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); border-radius: 6px; font-size: 0.75em; font-weight: 700; display: flex; align-items: center; gap: 4px;" title="${c.descripcion}">
                        ${c.icono} ${c.nombre}
                    </span>
                `).join('')}
            </div>
        ` : ''}
        
        ${fueraDePosicion ? `
            <div style="padding: 8px; background: rgba(239, 68, 68, 0.2); border-left: 3px solid #ef4444; border-radius: 4px; margin-bottom: 12px; font-size: 0.85em;">
                <strong style="color: #ef4444;">Penalización: ${penalizacion}</strong> en todas las stats
            </div>
        ` : ''}
        
        <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 0.85em; color: #a8b3cf;">Ánimo</span>
                <span style="font-size: 0.85em; font-weight: 700; color: ${animoColor};">${jugador.animo}</span>
            </div>
            <div style="background: rgba(255,255,255,0.1); height: 6px; border-radius: 3px; overflow: hidden;">
                <div style="background: ${animoColor}; width: ${jugador.animo}%; height: 100%; transition: width 0.3s;"></div>
            </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <div style="font-size: 0.85em; color: #a8b3cf;">
                ${mentalidadIcon} ${jugador.mentalidad}
            </div>
            <div style="font-size: 0.85em; color: #a8b3cf;">
                👑 Autoridad: ${jugador.autoridad}
            </div>
        </div>
        
        <div class="stats">
            <div class="stat">
                <div class="stat-label">VEL</div>
                <div class="stat-value" style="color: ${fueraDePosicion ? '#ef4444' : '#10b981'}">${Math.round(statsAjustadas.velocidad)}</div>
            </div>
            <div class="stat">
                <div class="stat-label">TIR</div>
                <div class="stat-value" style="color: ${fueraDePosicion ? '#ef4444' : '#10b981'}">${Math.round(statsAjustadas.tiro)}</div>
            </div>
            <div class="stat">
                <div class="stat-label">PAS</div>
                <div class="stat-value" style="color: ${fueraDePosicion ? '#ef4444' : '#10b981'}">${Math.round(statsAjustadas.pase)}</div>
            </div>
            <div class="stat">
                <div class="stat-label">REG</div>
                <div class="stat-value" style="color: ${fueraDePosicion ? '#ef4444' : '#10b981'}">${Math.round(statsAjustadas.regate)}</div>
            </div>
            <div class="stat">
                <div class="stat-label">DEF</div>
                <div class="stat-value" style="color: ${fueraDePosicion ? '#ef4444' : '#10b981'}">${Math.round(statsAjustadas.defensa)}</div>
            </div>
            <div class="stat">
                <div class="stat-label">FIS</div>
                <div class="stat-value" style="color: ${fueraDePosicion ? '#ef4444' : '#10b981'}">${Math.round(statsAjustadas.fisico)}</div>
            </div>
        </div>
        
        ${esTitular && (jugador.partidosJugados > 0) ? `
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.85em; color: #7c8ba1; display: flex; gap: 12px; justify-content: center;">
                <span>⚽ ${jugador.goles}</span>
                <span>🎯 ${jugador.asistencias}</span>
                <span>📊 ${jugador.partidosJugados} PJ</span>
            </div>
        ` : ''}
    `;
    
    card.onclick = () => togglePlayer(jugador.id);
    
    return card;
}
// MODIFICADA: Mostrar club con botón de charla motivacional
function mostrarClub() {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    const container = document.getElementById('clubTab');
    
    container.innerHTML = `
        <h3>⚙️ Gestión del Club</h3>
        
        <div style="background: rgba(20, 30, 70, 0.3); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 30px;">
            <h4 style="margin-bottom: 20px;">🎯 Identidad del Club</h4>
            <div style="margin-bottom: 20px;">
                <div style="font-size: 1.5em; font-weight: 700; color: #3b82f6; margin-bottom: 8px;">
                    ${equipo.estiloJuego.estilo}
                </div>
                <p style="color: #a8b3cf; line-height: 1.6;">
                    ${equipo.estiloJuego.descripcion}
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 30px;">
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #a8b3cf;">⚽ Ataque</span>
                        <span style="font-weight: 700; color: #10b981;">${equipo.estiloJuego.valores.ataque}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #10b981; width: ${equipo.estiloJuego.valores.ataque}%; height: 100%;"></div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #a8b3cf;">🛡️ Defensa</span>
                        <span style="font-weight: 700; color: #3b82f6;">${equipo.estiloJuego.valores.defensa}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #3b82f6; width: ${equipo.estiloJuego.valores.defensa}%; height: 100%;"></div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #a8b3cf;">🎯 Posesión</span>
                        <span style="font-weight: 700; color: #eab308;">${equipo.estiloJuego.valores.posesion}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #eab308; width: ${equipo.estiloJuego.valores.posesion}%; height: 100%;"></div>
                    </div>
                </div>
                
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #a8b3cf;">💪 Físico</span>
                        <span style="font-weight: 700; color: #ef4444;">${equipo.estiloJuego.valores.fisico}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #ef4444; width: ${equipo.estiloJuego.valores.fisico}%; height: 100%;"></div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; border-radius: 8px;">
                <p style="color: #a8b3cf; font-size: 0.95em; line-height: 1.6;">
                    <strong style="color: #fff;">💡 Nota:</strong> Este es el estilo tradicional de ${equipo.nombre}. Los hinchas y la directiva esperan que juegues de esta manera. Cambiar drásticamente puede afectar la moral.
                </p>
            </div>
        </div>
        
        <div style="background: rgba(20, 30, 70, 0.3); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08);">
            <h4 style="margin-bottom: 20px;">📋 Táctica Actual: <span style="color: #3b82f6;">${equipo.tacticaActual}</span></h4>
            <p style="color: #7c8ba1; margin-bottom: 20px; font-size: 0.95em;">
                Modifica el enfoque táctico para el próximo partido. Estos cambios son temporales y afectarán tu rendimiento en el próximo encuentro.
            </p>
            
            <div style="display: grid; gap: 16px;">
                ${crearBotonTactica('Muy Defensiva', '🛡️🛡️', 'Prioridad máxima en defensa', 'defensa: +20, ataque: -15')}
                ${crearBotonTactica('Defensiva', '🛡️', 'Mayor solidez atrás', 'defensa: +10, ataque: -5')}
                ${crearBotonTactica('Equilibrada', '⚖️', 'Balance perfecto', 'Sin modificadores')}
                ${crearBotonTactica('Ofensiva', '⚔️', 'Presión constante', 'ataque: +10, defensa: -5')}
                ${crearBotonTactica('Muy Ofensiva', '⚔️⚔️', 'Todo al ataque', 'ataque: +20, defensa: -15')}
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
                <button class="btn btn-primary" onclick="darCharlaMotivacional()">📢 Dar Charla Motivacional</button>
            </div>
        </div>
    `;
}

// NUEVA: Crear botón de táctica
function crearBotonTactica(nombre, icono, descripcion, modificadores) {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    const esActual = equipo.tacticaActual === nombre;
    
    return `
        <button 
            class="btn ${esActual ? 'btn-primary' : 'btn-secondary'}"
            onclick="cambiarTactica('${nombre}')"
            style="padding: 20px; text-align: left; display: flex; align-items: center; gap: 16px; ${esActual ? 'border: 2px solid #3b82f6;' : ''}"
        >
            <div style="font-size: 2em;">${icono}</div>
            <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 1.1em; margin-bottom: 4px;">${nombre}</div>
                <div style="font-size: 0.85em; opacity: 0.8;">${descripcion}</div>
                <div style="font-size: 0.8em; opacity: 0.7; margin-top: 4px; font-style: italic;">${modificadores}</div>
            </div>
            ${esActual ? '<div style="font-size: 1.5em;">✓</div>' : ''}
        </button>
    `;
}

// NUEVA: Cambiar táctica
function cambiarTactica(nombreTactica) {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    equipo.tacticaActual = nombreTactica;
    
    agregarNoticia('general', '📋 Cambio Táctico', `${partidaActual.manager} modificó la táctica del equipo a "${nombreTactica}" para el próximo partido.`);
    mostrarClub();
}
// NUEVA: Calcular estado del vestuario
function calcularEstadoVestuario() {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    const animoPromedio = equipo.jugadores.reduce((sum, j) => sum + j.animo, 0) / equipo.jugadores.length;
    
    // Considerar también resultados recientes
    const ultimosPartidos = fixture
        .filter(p => p.jugado && (p.local === partidaActual.equipoId || p.visitante === partidaActual.equipoId))
        .slice(-5);
    
    let victorias = 0;
    ultimosPartidos.forEach(p => {
        const esLocal = p.local === partidaActual.equipoId;
        const ganoJugador = esLocal ? p.golesLocal > p.golesVisitante : p.golesVisitante > p.golesLocal;
        if (ganoJugador) victorias++;
    });
    
    const porcentajeVictorias = ultimosPartidos.length > 0 ? (victorias / ultimosPartidos.length) * 100 : 50;
    
    // Promedio ponderado: 70% ánimo, 30% resultados
    const estadoVestuario = (animoPromedio * 0.7) + (porcentajeVictorias * 0.3);
    
    return {
        valor: Math.round(estadoVestuario),
        color: estadoVestuario >= 75 ? '#10b981' : estadoVestuario >= 50 ? '#eab308' : '#ef4444',
        texto: estadoVestuario >= 75 ? 'Excelente' : estadoVestuario >= 50 ? 'Aceptable' : 'Crítico'
    };
}

// NUEVA: Mostrar barra de estado del vestuario en el header del juego
function actualizarBarraVestuario() {
    const estado = calcularEstadoVestuario();
    const gameHeader = document.querySelector('.game-header .game-info');
    
    // Buscar si ya existe la barra
    let barraExistente = document.getElementById('barraVestuario');
    if (!barraExistente) {
        barraExistente = document.createElement('div');
        barraExistente.id = 'barraVestuario';
        gameHeader.appendChild(barraExistente);
    }
    
    barraExistente.innerHTML = `
        <div style="margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center;">
                <span style="font-size: 0.9em; color: #a8b3cf; font-weight: 600;">🏟️ Estado del Vestuario</span>
                <span style="font-size: 0.9em; font-weight: 700; color: ${estado.color};">${estado.texto} (${estado.valor})</span>
            </div>
            <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background: ${estado.color}; width: ${estado.valor}%; height: 100%; transition: all 0.5s; box-shadow: 0 0 10px ${estado.color};"></div>
            </div>
        </div>
    `;
}


       // MODIFICADO: Toggle player SIN restricción de posición
function togglePlayer(playerId) {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    
    // Si ya hay un jugador seleccionado y es diferente, hacer el swap
    if (selectedPlayer && selectedPlayer !== playerId) {
        const jugador1 = equipo.jugadores.find(j => j.id === selectedPlayer);
        const jugador2 = equipo.jugadores.find(j => j.id === playerId);
        
        const idx1 = equipo.starting11.indexOf(selectedPlayer);
        const idx2 = equipo.starting11.indexOf(playerId);
        
        // Intercambiar: uno está en titulares y otro no
        if (idx1 >= 0 && idx2 === -1) {
            equipo.starting11.splice(idx1, 1);
            equipo.starting11.push(playerId);
        } else if (idx1 === -1 && idx2 >= 0) {
            equipo.starting11.splice(idx2, 1);
            equipo.starting11.push(selectedPlayer);
        }
        
        selectedPlayer = null;
    } else {
        selectedPlayer = selectedPlayer === playerId ? null : playerId;
    }
    
    mostrarPlantilla();
}

        // NUEVA: Calcular penalización por posición incorrecta
function calcularPenalizacionPosicion(jugador, posicionEnCancha) {
    const penalizaciones = {
        'POR': { 'POR': 0, 'DFC': -40, 'MED': -50, 'DEL': -60 },
        'DFC': { 'POR': -40, 'DFC': 0, 'MED': -10, 'DEL': -20 },
        'MED': { 'POR': -50, 'DFC': -15, 'MED': 0, 'DEL': -10 },
        'DEL': { 'POR': -60, 'DFC': -25, 'MED': -15, 'DEL': 0 }
    };
    
    return penalizaciones[jugador.posicion][posicionEnCancha] || -30;
}

        // NUEVA: Calcular penalización/bonus por clima
function calcularEfectoClima(jugador, clima) {
    if (!jugador.climasPreferidos || !clima || !clima.nombre) return 0;
    return jugador.climasPreferidos.includes(clima.nombre) ? 10 : -10;
}
// NUEVA: Calcular efecto del ánimo
function calcularEfectoAnimo(animo) {
    // Ánimo 100 = +10%, Ánimo 50 = 0%, Ánimo 0 = -20%
    return ((animo - 50) / 50) * 20;
}

        function mostrarFixture() {
            const lista = document.getElementById('proximosPartidos');
            lista.innerHTML = '';

            const proximosPartidos = fixture
                .filter(p => !p.jugado)
                .slice(0, 10);

            if (proximosPartidos.length === 0) {
                lista.innerHTML = '<div class="empty-state">No hay partidos pendientes</div>';
                return;
            }

            proximosPartidos.forEach((p, idx) => {
                const local = equipos.find(e => e.id === p.local);
                const visitante = equipos.find(e => e.id === p.visitante);
                const esMiPartido = p.local === partidaActual.equipoId || p.visitante === partidaActual.equipoId;
                
                const card = document.createElement('div');
                card.className = 'partido-card';
                if (esMiPartido) card.style.borderLeft = '4px solid #3b82f6';
                
                card.innerHTML = `
                    <div class="partido-equipos">
                        <div class="equipo-partido local">
                            ${local.nombre}
                        </div>
                        <div class="vs">VS</div>
                        <div class="equipo-partido visitante">
                            ${visitante.nombre}
                        </div>
                    </div>
                    <div style="text-align: right; color: #7c8ba1; font-size: 0.9em; margin-top: 8px;">
                        Fecha ${p.fecha}
                    </div>
                `;
                lista.appendChild(card);
            });
        }

        function mostrarTabla() {
            const tbody = document.getElementById('tablaPosiciones');
            tbody.innerHTML = '';

            const equiposOrdenados = [...equipos].sort((a, b) => {
                if (b.pts !== a.pts) return b.pts - a.pts;
                return (b.gf - b.gc) - (a.gf - a.gc);
            });

            equiposOrdenados.forEach((equipo, idx) => {
                const tr = document.createElement('tr');
                const esMiEquipo = equipo.id === partidaActual.equipoId;
                if (esMiEquipo) tr.className = 'mi-equipo';
                
                tr.innerHTML = `
                    <td>${idx + 1}</td>
                    <td>${equipo.nombre}</td>
                    <td>${equipo.pj}</td>
                    <td>${equipo.pg}</td>
                    <td>${equipo.pe}</td>
                    <td>${equipo.pp}</td>
                    <td>${equipo.gf}</td>
                    <td>${equipo.gc}</td>
                    <td>${equipo.gf - equipo.gc}</td>
                    <td><strong>${equipo.pts}</strong></td>
                `;
                tbody.appendChild(tr);
            });
        }

        function mostrarResultados() {
            const lista = document.getElementById('resultadosFecha');
            lista.innerHTML = '';

            const partidosJugados = fixture.filter(p => p.jugado);

            if (partidosJugados.length === 0) {
                lista.innerHTML = '<div class="empty-state">Aún no hay resultados</div>';
                return;
            }

            const ultimos10 = partidosJugados.slice(-10).reverse();
            
            ultimos10.forEach(p => {
                const local = equipos.find(e => e.id === p.local);
                const visitante = equipos.find(e => e.id === p.visitante);
                const esMiPartido = p.local === partidaActual.equipoId || p.visitante === partidaActual.equipoId;
                
                const card = document.createElement('div');
                card.className = 'partido-card';
                if (esMiPartido) card.style.borderLeft = '4px solid #3b82f6';
                
                card.innerHTML = `
                    <div class="partido-equipos">
                        <div class="equipo-partido local">${local.nombre}</div>
                        <div class="resultado">${p.golesLocal} - ${p.golesVisitante}</div>
                        <div class="equipo-partido visitante">${visitante.nombre}</div>
                    </div>
                    <div style="text-align: right; color: #7c8ba1; font-size: 0.9em; margin-top: 8px;">
                        Fecha ${p.fecha}
                    </div>
                `;
                lista.appendChild(card);
            });
        }

        function mostrarPartidas() {
            const lista = document.getElementById('partidasList');
            lista.innerHTML = '';

            if (partidas.length === 0) {
                lista.innerHTML = '<div class="empty-state">No hay partidas guardadas</div>';
                return;
            }

            partidas.forEach((partida, index) => {
                const equipo = partida.equipos.find(e => e.id === partida.equipoId);
                const card = document.createElement('div');
                card.className = 'partida-card';
                card.innerHTML = `
                    <div class="partida-info">
                        <h3>${partida.manager}</h3>
                        <p>${equipo.nombre} - ${new Date(partida.fechaActual).toLocaleDateString('es-AR')}</p>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-primary" onclick="cargarPartida(${index})">Cargar</button>
                        <button class="btn btn-danger" onclick="eliminarPartida(${partida.id})">Eliminar</button>
                    </div>
                `;
                lista.appendChild(card);
            });
        }

        // MODIFICADO: También actualizar al cargar partida
function cargarPartida(index) {
    partidaActual = partidas[index];
    equipos = partidaActual.equipos;
    fixture = partidaActual.fixture;
    fechaActual = new Date(partidaActual.fechaActual);
    resultados = partidaActual.resultados || [];

    document.getElementById('equipoNombre').textContent = equipos.find(e => e.id === partidaActual.equipoId).nombre;
    document.getElementById('fechaActual').textContent = fechaActual.toLocaleDateString('es-AR', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    showScreen('juegoScreen');
    mostrarInicio();
    mostrarTabla();
}
        function guardarPartida() {
            partidaActual.equipos = equipos;
            partidaActual.fixture = fixture;
            partidaActual.fechaActual = fechaActual;
            partidaActual.resultados = resultados;
            alert('¡Partida guardada exitosamente! 💾');
        }

        function eliminarPartida(id) {
            if (confirm('¿Estás seguro de eliminar esta partida?')) {
                partidas = partidas.filter(p => p.id !== id);
                mostrarPartidas();
            }
        }

        function volverMenu() {
            if (confirm('¿Salir de la partida? (No olvides guardar)')) {
                showScreen('menuScreen');
            }
        }

        function getCurrentFecha() {
            return Math.floor((fechaActual - partidaActual.fechaInicial) / (1000 * 60 * 60 * 24) / diasPorFecha) + 1;
        }

        // NUEVA: Mostrar noticias
        function mostrarNoticias() {
            const container = document.getElementById('feedNoticias');
            
            if (noticias.length === 0) {
                container.innerHTML = '<div class="empty-state">No hay noticias disponibles</div>';
                return;
            }
            
            container.innerHTML = noticias.slice().reverse().map(noticia => `
                <div class="noticia-card">
                    <div class="noticia-header">
                        <span class="noticia-tipo ${noticia.tipo}">${noticia.tipo.toUpperCase()}</span>
                        <span style="color: #7c8ba1; font-size: 0.9em;">${noticia.fecha}</span>
                    </div>
                    <h4 style="margin-bottom: 8px; color: #fff;">${noticia.titulo}</h4>
                    <p style="color: #a8b3cf;">${noticia.contenido}</p>
                </div>
            `).join('');
        }
        // Función añadida: Calcular multiplicador para drops de ánimo en jóvenes
// Función auxiliar para calcular multiplicador de edad (para efectos de ánimo)
function calcularMultiplicadorEdad(jugador) {
    if (jugador.edad <= 23) return 1.2; // Jóvenes más afectados
    if (jugador.edad >= 30) return 0.8; // Veteranos menos afectados
    return 1.0;
}

// Fluctuación diaria de ánimo
function fluctuacionDiariaAnimo(equipo) {
    equipo.jugadores.forEach(jugador => {
        // Fluctuación aleatoria pequeña
        const cambio = Math.floor(Math.random() * 3) - 1; // -1, 0, o +1
        jugador.animo = Math.max(0, Math.min(100, jugador.animo + cambio));
    });
}
// Función añadida: Dar charla motivacional
function darCharlaMotivacional() {
    const equipo = equipos.find(e => e.id === partidaActual.equipoId);
    const jugadoresBajoAnimo = equipo.jugadores.filter(j => j.animo < 60);
    
    if (jugadoresBajoAnimo.length === 0) {
        alert('No hay jugadores con ánimo bajo para motivar.');
        return;
    }
    
    jugadoresBajoAnimo.forEach(jugador => {
        let boost = Math.floor(Math.random() * 11) + 5; // 5-15
        if (jugador.edad >= 17 && jugador.edad <= 23) {
            boost += 5; // Mayor boost para jóvenes
        }
        jugador.animo = Math.min(100, jugador.animo + boost);
    });
    
    agregarNoticia('general', '📢 Charla Motivacional', `${partidaActual.manager} dio una charla al equipo. Varios jugadores levantaron el ánimo.`);
    agregarMensaje('Capitán del equipo', 'Jugador', '⚽', 'Gracias por la charla, DT. El equipo necesitaba esto.');
    mostrarInicio();
    mostrarPlantilla();
}
        // NUEVA: Mostrar mensajes
        function mostrarMensajes() {
            const container = document.getElementById('listaMensajes');
            
            if (mensajes.length === 0) {
                container.innerHTML = '<div class="empty-state">No tienes mensajes</div>';
                return;
            }
            
            container.innerHTML = mensajes.map(mensaje => `
                <div class="mensaje-card ${!mensaje.leido ? 'no-leido' : ''}">
                    <div class="mensaje-remitente">
                        <div class="mensaje-avatar">${mensaje.avatar}</div>
                        <div>
                            <div style="font-weight: 700; color: #fff;">${mensaje.remitente}</div>
                            <div style="font-size: 0.85em; color: #7c8ba1;">${mensaje.cargo}</div>
                        </div>
                    </div>
                    <p style="color: #a8b3cf; margin-bottom: 8px;">${mensaje.contenido}</p>
                    <div style="text-align: right; font-size: 0.85em; color: #7c8ba1;">${mensaje.fecha}</div>
                </div>
            `).join('');
        }

        // NUEVA: Agregar noticia
        function agregarNoticia(tipo, titulo, contenido) {
            noticias.push({
                tipo,
                titulo,
                contenido,
                fecha: fechaActual.toLocaleDateString('es-AR')
            });
        }

        // NUEVA: Agregar mensaje
        function agregarMensaje(remitente, cargo, avatar, contenido) {
            mensajes.push({
                remitente,
                cargo,
                avatar,
                contenido,
                fecha: fechaActual.toLocaleDateString('es-AR'),
                leido: false
            });
        }

        // NUEVA: Generar mensajes iniciales
        function generarMensajesIniciales() {
            const equipo = equipos.find(e => e.id === partidaActual.equipoId);
            agregarMensaje(
                'Director Deportivo',
                'Dirección Técnica',
                '👔',
                `Bienvenido ${partidaActual.manager}! Estamos emocionados de tenerte como DT de ${equipo.nombre}. Esperamos una gran temporada!`
            );
            agregarMensaje(
                'Capitán del equipo',
                'Jugador',
                '⚽',
                `El equipo está listo para darlo todo esta temporada. Confían en tu liderazgo!`
            );
        }
        // En generarEquipos(), al final:
inicializarPresupuestos();

        generarEquipos();