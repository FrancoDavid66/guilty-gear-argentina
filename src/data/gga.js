// =====================================================================
//  GUILTY GEAR ARGENTINA (GGA) — TODOS LOS TEXTOS Y LINKS DE LA WEB
//  Cambiá lo que necesites acá y volvé a correr `npm run build`.
// =====================================================================

export const sitio = {
  nombre: 'Guilty Gear Argentina',
  sigla: 'GGA',
  dominio: 'https://TU-DOMINIO.com.ar', // cambiar cuando esté el dominio
  credito: { texto: 'Web hecha por Franco David', link: 'https://www.instagram.com/francodavid_66/' },
}

// ---------------------------------------------------------------------
//  LOGO: poné el PNG del team en src/assets/logo/ (cualquier nombre,
//  .png / .webp / .svg). Si la carpeta está vacía se ve un logo provisorio.
// ---------------------------------------------------------------------

export const hero = {
  bajada: 'Comunidad sudamericana de fighting games',
  titulo: ['Somos', 'Guilty Gear', 'Argentina'],
  // Las partes entre ** se resaltan en celeste
  texto:
    'Una comunidad de Fighting Game sudamericana centrada en **Guilty Gear Strive**, **Guilty Gear Xrd REV 2** y **Guilty Gear XX Accent Core Plus R**.',
  objetivo:
    'Nuestro objetivo es hacer crecer la comunidad a través de **eventos para novatos**, **lobbys abiertos** a toda la comunidad y **streams didácticos** donde te enseñamos a jugar.',
  juegos: [
    { id: 'strive', corto: 'STRIVE', largo: 'Guilty Gear Strive' },
    { id: 'xrd', corto: 'XRD REV 2', largo: 'Guilty Gear Xrd REV 2' },
    { id: 'acpr', corto: '+R', largo: 'Accent Core Plus R' },
  ],
}

// Cinta que corre entre secciones
export const cinta = [
  'Lobbys abiertos',
  'Torneos para novatos',
  'Streams didácticos',
  'Strive',
  'Xrd REV 2',
  'Accent Core +R',
]

export const discord = {
  link: 'https://discord.gg/hRRB5CGk8C',
  codigo: 'hRRB5CGk8C', // con esto la web trae en vivo los miembros y los conectados
  miembrosRespaldo: 2193, // se muestra si no se puede leer el número en vivo (relevado 21/11/2026)
  titulo: '¡Unite a nuestro Discord de más de 2000 miembros!',
  texto:
    'Un servidor dedicado a jugar, pedir feedback y pasar el rato. Acá se organizan nuestros torneos, además de que vas a recibir toda la info importante de los eventos online y presenciales de Guilty Gear en Sudamérica.',
  usos: ['Jugar', 'Pedir feedback', 'Pasar el rato', 'Torneos', 'Eventos online y presenciales'],
  boton: 'Entrar al Discord',
}

// ---------------------------------------------------------------------
//  LOS JUEGOS (datos verificados el 21/11/2026; actualizar personajes
//  cuando salga un DLC nuevo). Trailer = video oficial de Arc System Works.
//  Imágenes propias opcionales: src/assets/juegos/strive.jpg, xrd.jpg, acpr.jpg
// ---------------------------------------------------------------------
export const juegos = {
  bajada: 'Los juegos de GGA',
  titulo: 'Elegí tu Guilty',
  texto: 'Jugamos los tres. Cada semana del mes es de uno distinto, así que siempre hay lobby y torneo para el que elijas.',
  lista: [
    {
      id: 'strive',
      juego: 'STRIVE', // tiene que coincidir con el "juego" del calendario
      corto: 'STRIVE',
      nombre: 'Guilty Gear -Strive-',
      tag: 'El actual',
      trailer: 'mLGruVR6VkM', // Season 5 and 2.0 Update Trailer (Arc System Works America)
      steam: 'https://store.steampowered.com/app/1384160/GUILTY_GEAR_STRIVE/',
      datos: [
        { valor: '2021', que: 'Salió' },
        { valor: '34', que: 'Personajes', nota: '15 de base + 19 DLC' },
        { valor: '6', que: 'Plataformas', nota: 'PC, PS4, PS5, Xbox One, Xbox Series y Switch' },
        { valor: 'Sí', que: 'Rollback', nota: 'Desde el lanzamiento' },
      ],
      resumen:
        'El último de la saga y el más fácil para arrancar. En abril de 2026 recibió la versión 2.00 gratis, con la Temporada 5 y movimientos nuevos para todo el plantel. Ya lo jugaron más de 4 millones de personas.',
      mecanicas: [
        { nombre: 'Wall Break', texto: 'Arrinconás al rival, rompés la pared y la pelea sigue en otro escenario con ventaja para vos.' },
        { nombre: 'Roman Cancel', texto: 'Cortás cualquier ataque gastando tensión para alargar el combo o salir de un apuro.' },
        { nombre: 'Psych Burst', texto: 'Te sacás de encima un combo del rival. Usalo bien: no se recarga al toque.' },
        { nombre: 'Counter Blitz', texto: 'Lo nuevo de la versión 2.00.' },
      ],
      ideal: 'Ideal si recién empezás o querés encontrar rival online a cualquier hora.',
      clases: 'strive',
    },
    {
      id: 'xrd',
      juego: 'XRD',
      corto: 'XRD REV 2',
      nombre: 'Guilty Gear Xrd REV 2',
      tag: 'El técnico',
      trailer: 'OdjUhvAHG68', // Rev 2 Introduction Trailer (arcsystemworks)
      steam: 'https://store.steampowered.com/app/520440/GUILTY_GEAR_Xrd_REV_2/',
      datos: [
        { valor: '2017', que: 'Salió' },
        { valor: '25', que: 'Personajes' },
        { valor: '3', que: 'Plataformas', nota: 'PC, PS4 y PS3' },
        { valor: 'Sí', que: 'Rollback', nota: 'En Steam, desde enero de 2023' },
      ],
      resumen:
        'La revisión final de Xrd: 3D con look de anime dibujado a mano y uno de los sistemas más profundos de la saga. Sumó a Baiken y Answer y rebalanceó a todo el plantel.',
      mecanicas: [
        { nombre: 'Roman Cancel', texto: 'Hay de varios colores: para alargar combos, para presionar o para escapar.' },
        { nombre: 'Dust', texto: 'Un golpe que manda al rival por el aire para seguir el combo.' },
        { nombre: 'Blitz Shield', texto: 'Bloqueás el ataque y respondés al toque.' },
        { nombre: 'Danger Time', texto: 'Si dos golpes chocan puede activarse: por unos segundos, los counters pegan mucho más.' },
      ],
      ideal: 'Ideal si ya te gustan los juegos de pelea y querés algo exigente y muy técnico.',
      clases: 'xrd',
    },
    {
      id: 'acpr',
      juego: '+R',
      corto: '+R',
      nombre: 'Guilty Gear XX Accent Core Plus R',
      tag: 'El clásico',
      trailer: '45spJS4pZl4', // ΛCORE PLUS R for Steam Trailer (arcsystemworks)
      steam: 'https://store.steampowered.com/app/348550/GUILTY_GEAR_XX_ACCENT_CORE_PLUS_R/',
      datos: [
        { valor: '2012', que: 'Salió', nota: 'Llegó a Steam en 2015' },
        { valor: '25', que: 'Personajes' },
        { valor: '2', que: 'Para jugar hoy', nota: 'PC (Steam) y Switch' },
        { valor: 'Sí', que: 'Rollback', nota: 'En Steam (GGPO), desde diciembre de 2020' },
      ],
      resumen:
        'La versión definitiva de la serie XX: años de ajustes para dejar a los 25 personajes listos para competir. 2D a la vieja escuela, rápido y crudo, con una comunidad fiel que lo sigue jugando.',
      mecanicas: [
        { nombre: 'Gatling', texto: 'Encadenás golpes apretando los botones en orden.' },
        { nombre: 'Dust', texto: 'El golpe por arriba que lanza al rival por el aire.' },
        { nombre: 'Roman Cancel', texto: 'Cortás tu propio movimiento para seguir atacando.' },
        { nombre: 'Force Break', texto: 'Versiones especiales de tus ataques que gastan tensión.' },
      ],
      ideal: 'Ideal si te gusta lo clásico y querés aprender la base de la que sale todo Guilty Gear.',
      clases: 'acpr',
    },
  ],
}

export const escuelita = {
  bajada: 'La Escuelita de GGA',
  titulo: '¡Jugá y aprendé con nosotros!',
  videos: [
    {
      id: '6Z-bzO9pAMM',
      etiqueta: 'Fighting games',
      corto: 'FG',
      titulo: 'Tutoriales de FG',
      texto: 'Todo lo básico que necesitás para subir tu juego al siguiente nivel.',
      video: '¿Qué es y cómo hacer un Meaty? · La Escuelita',
    },
    {
      id: 'yAkNVLQoxi4',
      etiqueta: 'Guilty Gear Xrd',
      corto: 'XRD',
      titulo: 'Todo lo que necesitás saber para aprender Guilty Gear Xrd',
      texto: 'Arrancá de cero con el capítulo 1 de la Escuelita.',
      video: '¿Principiante en GG Xrd? · Escuelita Cap. 1 (Raulis)',
    },
    {
      id: 'eBD_df4BiLs',
      etiqueta: 'Guilty Gear +R',
      corto: '+R',
      titulo: 'Todo lo que necesitás saber para aprender Guilty Gear ACPR',
      texto: 'El primer stream de la Escuelita dedicado a Accent Core Plus R.',
      video: 'La Escuelita de ACPR · Stream N.º 1',
    },
  ],
  // Todas las clases (canal de YouTube de GGA, relevado el 21/11/2026)
  canal: 'https://www.youtube.com/@guiltygearargentina',
  series: [
    {
      id: 'basico',
      nombre: 'Lo básico',
      bajada: 'Para arrancar en cualquier juego de pelea',
      clases: [
        { id: 'GsmzQbBn104', titulo: 'Aprendemos lo básico', tag: '1.ª clase', dura: '40:35' },
        { id: 'lbJnf7x1rSw', titulo: 'Recursos para practicar', tag: '2.ª clase', dura: '1:37:43' },
        { id: 'qK1dUTm4xy0', titulo: 'Mecánicas y técnicas universales', tag: '3.ª clase', dura: '2:03:36' },
        { id: 'yN9h2gmDcgw', titulo: 'Cómo analizar tus partidas y usar el modo replay', tag: '4.ª clase', dura: '1:43:30' },
        { id: '1JDP_VNRc1M', titulo: 'Lo básico de la frame data', tag: '5.ª clase', dura: '1:47:33' },
        { id: '820cD9avCXA', titulo: '¿Qué es la notación numérica?', tag: 'Corto', dura: '3:43' },
        { id: '6Z-bzO9pAMM', titulo: '¿Qué es y cómo hacer un meaty?', tag: 'Corto', dura: '1:16' },
      ],
    },
    {
      id: 'strive',
      nombre: 'Strive',
      bajada: 'La Escuelita T2: aprendé un personaje',
      clases: [
        { id: '3lb10NmTLlI', titulo: 'Aprendé a jugar con Sol Badguy', tag: 'T2', dura: '2:21:21' },
        { id: 'uAQ6d1-Ifq4', titulo: 'Aprendé a jugar con Testament', tag: 'T2', dura: '1:41:28' },
        { id: 'vb907pHHffs', titulo: 'Aprendé a jugar con Jack-O', tag: 'T2', dura: '1:54:23' },
        { id: 'Bdnhr51x5VU', titulo: 'Aprendé a jugar con Johnny', tag: 'T2', dura: '2:22:33' },
        { id: '4QMnoafnO4M', titulo: 'Mecánicas básicas', tag: 'Escuelita #1', dura: '1:52:13' },
        { id: 'iPpnqek0JV8', titulo: 'Entrenamiento básico', tag: 'Strive', dura: '47:26' },
      ],
    },
    {
      id: 'xrd',
      nombre: 'Xrd REV 2',
      bajada: '¿Principiante en GG Xrd? Curso completo en 8 capítulos',
      clases: [
        { id: 'yAkNVLQoxi4', titulo: 'Capítulo 1', tag: 'Raulis', dura: '1:44:40' },
        { id: 'GyykY7uPM_Y', titulo: 'Capítulo 2', tag: 'Raulis', dura: '1:12:54' },
        { id: 'AO7K1-vppEE', titulo: 'Capítulo 3', tag: 'Kyo', dura: '2:27:35' },
        { id: 'YcZesiIKJ_Y', titulo: 'Capítulo 4', tag: 'Kyo', dura: '2:30:28' },
        { id: 'uvsummuIjr0', titulo: 'Capítulo 5', tag: 'Raulis', dura: '2:21:12' },
        { id: 'RUxtEBBOYlI', titulo: 'Capítulo 6', tag: 'Raulis', dura: '2:04:16' },
        { id: 'aSoYTNtb_lo', titulo: 'Capítulo 7', tag: 'Raulis', dura: '2:01:32' },
        { id: 'doExJKyucdc', titulo: 'Capítulo 8', tag: 'Raulis', dura: '1:26:58' },
      ],
    },
    {
      id: 'acpr',
      nombre: '+R',
      bajada: 'La Escuelita de Accent Core Plus R, en stream',
      clases: [
        { id: 'eBD_df4BiLs', titulo: 'Stream N.º 1', tag: 'ACPR', dura: '1:13:38' },
        { id: 'pL8_i7jTdZw', titulo: 'Stream N.º 2', tag: 'ACPR', dura: '1:08:54' },
        { id: 'PjmJW3yotgQ', titulo: 'Stream N.º 3', tag: 'ACPR', dura: '1:52:41' },
      ],
    },
  ],
}

// ---------------------------------------------------------------------
//  DICCIONARIO GUILTY: notación numérica y términos de la comunidad
// ---------------------------------------------------------------------
export const diccionario = {
  bajada: 'Hablá en Guilty',
  titulo: 'Diccionario Guilty',
  texto: 'En el Discord vas a leer cosas como "236H" o "lo castigué con RC". Acá tenés lo básico para entender todo.',
  // Botones de Guilty Gear (colores como los muestra la comunidad)
  botones: [
    { b: 'P', nombre: 'Punch', color: '#FF6FB1' },
    { b: 'K', nombre: 'Kick', color: '#4DA3FF' },
    { b: 'S', nombre: 'Slash', color: '#4CD964' },
    { b: 'H', nombre: 'Heavy Slash', color: '#FF4054' },
    { b: 'D', nombre: 'Dust', color: '#FFA23A' },
  ],
  movimientos: [
    { input: '236', boton: 'P', nombre: 'Cuarto de círculo adelante', texto: 'Abajo, diagonal y adelante. El movimiento más usado de todos los juegos de pelea.' },
    { input: '214', boton: 'K', nombre: 'Cuarto de círculo atrás', texto: 'Lo mismo pero hacia atrás.' },
    { input: '623', boton: 'S', nombre: 'Dragon Punch (DP)', texto: 'Adelante, abajo y diagonal: el clásico ataque antiaéreo.' },
    { input: '41236', boton: 'H', nombre: 'Medio círculo adelante', texto: 'De atrás hacia adelante pasando por abajo.' },
    { input: '632146', boton: 'H', nombre: 'Medio círculo + atrás', texto: 'El movimiento de muchos Overdrives (súper ataques).' },
    { input: '22', boton: 'D', nombre: 'Dos veces abajo', texto: 'Abajo, soltás y abajo de nuevo.' },
  ],
  terminos: [
    { t: 'Tensión', d: 'La barra que se llena atacando y yendo para adelante. Se gasta en Overdrives, Roman Cancel y Faultless Defense.' },
    { t: 'Roman Cancel (RC)', d: 'Cortás tu propio ataque gastando tensión: para alargar un combo, salvar un golpe que te bloquearon o escapar.' },
    { t: 'Burst', d: 'Te sacás de encima un combo del rival. Se recarga lento: guardalo para cuando te van a matar.' },
    { t: 'Faultless Defense (FD)', d: 'Un bloqueo que gasta tensión pero empuja al rival lejos y no te saca vida.' },
    { t: 'Overdrive', d: 'Los súper ataques. Gastan la mitad de la barra de tensión.' },
    { t: 'Gatling', d: 'Encadenar golpes normales en orden, por ejemplo P, K, S, H.' },
    { t: 'Instant Kill', d: 'Un golpe que gana el round de una. Está en Xrd y +R; Strive no lo tiene.' },
    { t: 'Meaty', d: 'Pegar justo en el momento en que el rival se levanta del piso.' },
    { t: 'Oki', d: 'Toda la presión que hacés mientras el rival se levanta. Viene del japonés "okizeme".' },
    { t: 'Punish', d: 'Castigar un ataque que el rival erró o que te bloquearon.' },
    { t: 'Frame data', d: 'Cuántos cuadros dura cada golpe. Dice quién vuelve a actuar primero.' },
    { t: 'FT2 / FT3', d: '"First to": gana el primero que llega a 2 o 3 partidas. Así se juegan los torneos.' },
  ],
}

// ---------------------------------------------------------------------
//  EVENTOS. Días: 0 domingo · 1 lunes · 2 martes · 3 miércoles ·
//  4 jueves · 5 viernes · 6 sábado. Hora en horario argentino (UTC-3).
//  "dias" y "hora" se usan solo cuando terminó el calendario del mes.
// ---------------------------------------------------------------------
export const eventos = {
  bajada: 'En vivo por Twitch',
  titulo: '¡Nuestros eventos!',
  duracionHoras: 3, // cuánto se muestra "EN VIVO" después de que arranca
  lista: [
    {
      id: 'lobby',
      lado: 'P1',
      nombre: 'Lobbys abiertos',
      gancho: '¡Lobbys semanales de todos los Guilty!',
      texto:
        'Vení a jugar con nosotros en stream. Aprovechá esta oportunidad para perderle el miedo al stream, pedir feedback y sacarte todas las dudas sobre el juego o tu personaje.',
      canal: 'orderkyo',
      link: 'https://www.twitch.tv/orderkyo',
      // Flyer fijo del lobby (de X). Local: src/assets/flyers/lobby.jpg
      flyer: 'https://pbs.twimg.com/media/HXYtcbrWcAAa_dk?format=jpg&name=large',
      dias: [2, 4],
      hora: '20:00',
    },
    {
      id: 'torneo',
      lado: 'P2',
      nombre: 'Nuestros torneos',
      gancho: '¡Vení a demostrar tu nivel!',
      texto: 'Wake up, Throw!: nuestro torneo de rookies, todas las semanas. Se organiza en el Discord y el top 8 va en vivo.',
      canal: 'nabbori',
      link: 'https://www.twitch.tv/nabbori',
      // Flyer del torneo: poné el link acá o guardalo como src/assets/flyers/torneo.jpg
      flyer: null,
      dias: [6],
      hora: '18:00',
    },
  ],
  // Reglamento del Wake up, Throw! (sacado de Challonge, 21/11/2026)
  reglamento: [
    'Solo para novatos: máximo 300 horas de juego en Steam.',
    'Doble eliminación. Todo al primero que gana 2 (FT2); winners final, losers final y gran final son FT3.',
    'Conexión por cable (Ethernet).',
    'Character lock para el ganador.',
    '10 minutos de tolerancia para presentarse a cada partida.',
    'Check-in una hora antes. Las partidas se coordinan en el Discord de GGA.',
    'Países: Argentina, Chile, Uruguay, Paraguay, Brasil, Bolivia y Perú.',
    'Se transmite todo el top 8 en twitch.tv/nabbori.',
  ],
}

// ---------------------------------------------------------------------
//  CALENDARIO DEL MES (el que publican en X a principio de mes).
//  Cada mes: cambiá "mes", "post" y la lista. tipo: 'lobby' o 'torneo'.
//  juego: 'STRIVE', 'XRD' o '+R'. fecha AAAA-MM-DD, hora argentina.
//  "inscripcion": link de Challonge del torneo (si ya está).
// ---------------------------------------------------------------------
export const calendario = {
  mes: 'Noviembre 2026',
  post: 'https://x.com/GearArgentina/status/2119096530384941229',
  // Flyer del mes (la placa que publican en X). Para no depender de X:
  // guardalo como src/assets/flyers/mes.jpg y se usa ese.
  flyer: 'https://pbs.twimg.com/media/HWiKR6xXYAANz-k?format=jpg&name=large',
  eventos: [
    { fecha: '2026-11-10', hora: '20:00', tipo: 'lobby', juego: '+R' },
    { fecha: '2026-11-12', hora: '20:00', tipo: 'lobby', juego: '+R' },
    { fecha: '2026-11-14', hora: '18:00', tipo: 'torneo', juego: '+R', nombre: 'Wake up, Throw!' },
    { fecha: '2026-11-17', hora: '20:00', tipo: 'lobby', juego: 'XRD' },
    { fecha: '2026-11-19', hora: '20:00', tipo: 'lobby', juego: 'XRD' },
    { fecha: '2026-11-21', hora: '18:00', tipo: 'torneo', juego: 'XRD', nombre: 'Wake up, Throw!', inscripcion: 'https://challonge.com/es/WakeupThrowXRD' },
    { fecha: '2026-11-24', hora: '20:00', tipo: 'lobby', juego: 'STRIVE' },
    { fecha: '2026-11-26', hora: '20:00', tipo: 'lobby', juego: 'STRIVE' },
    { fecha: '2026-11-28', hora: '18:00', tipo: 'torneo', juego: 'STRIVE', nombre: 'Wake up, Throw!' },
  ],
}

export const vods = {
  bajada: 'Replay',
  titulo: '¿Te perdiste algo?',
  texto: 'Nuestros canales de YouTube, donde guardamos para la posteridad todos nuestros eventos.',
  principal: {
    nombre: 'Guilty Gear Argentina',
    usuario: '@guiltygearargentina',
    link: 'https://www.youtube.com/@guiltygearargentina',
    que: 'Canal oficial',
    detalle: 'La Escuelita, torneos, crew battles y ligas desde 2021.',
  },
  // Momentos de GGA: videos del canal propio (torneos, crew battles, ligas)
  momentos: [
    { id: 'Q5xaIN71-Mk', titulo: 'Torneo de Verano 2021', tag: 'Torneo · Xrd' },
    { id: 'YqmnWBv_Jlk', titulo: 'Liga Dark Winter: The Last Series', tag: 'Liga · Xrd' },
    { id: 'Mi6kcHLoE8o', titulo: 'Dark Winter: Rookie of the Winter', tag: 'Liga · +R' },
    { id: 'ifzsi3UotWI', titulo: 'GG Brasil vs GG Argentina', tag: 'Crew battle' },
    { id: 'C_USpO-8deE', titulo: 'Guilty Gear ARENA #9: GGA vs VAL', tag: 'Crew battle' },
    { id: 'kf1BPTtQlJw', titulo: 'GGA vs TIER: ARG vs BR, FT30', tag: 'Crew battle' },
    { id: 'jrwSm1HFZ7Y', titulo: 'Liga Argentina de GGST 2023', tag: 'Liga · Strive' },
    { id: 'UJ_c1PwxwF8', titulo: 'Torneo de Navidad 2023', tag: 'Torneo · Strive' },
    { id: 'FUj4JT9SIjo', titulo: 'Only Rookies Tournament #1', tag: 'Torneo · Strive' },
    { id: 'XvFqtE3i_2I', titulo: 'Order VS Disorder', tag: 'Exhibición · Strive' },
    { id: 'of8-sBZrBss', titulo: 'GearRevolution #3', tag: 'Torneo · +R' },
    { id: 'eME_aVeTgxU', titulo: 'Out of Context: Guilty Gear Argentina', tag: 'Comunidad' },
  ],
  canales: [
    { nombre: 'Order Kyo', usuario: '@orderkyo', link: 'https://www.youtube.com/@orderkyo', que: 'Lobbys abiertos' },
    { nombre: 'Nabbori', usuario: '@nabbori4609', link: 'https://www.youtube.com/@nabbori4609', que: 'Torneos' },
  ],
}

export const redes = {
  bajada: 'Seguinos en X',
  titulo: '¡Nuestras redes!',
  texto: 'Somos GGA: seguinos para estar al tanto de todos nuestros eventos antes que nadie.',
  principal: {
    nombre: 'Guilty Gear Argentina',
    usuario: '@GearArgentina',
    rol: 'Cuenta oficial',
    link: 'https://x.com/GearArgentina',
    numero: '1.488', // seguidores al 21/11/2026
    desde: 2020,
  },
  organizadores: [
    { nombre: 'Nabbori', usuario: '@Nabbori1', rol: 'El organizador principal', link: 'https://x.com/Nabbori1', lado: 'P1' },
    { nombre: 'Order Kyo', usuario: '@orderkyo', rol: 'El otro organizador principal', link: 'https://x.com/orderkyo', lado: 'P2' },
  ],
  // Más redes de GGA. Números relevados el 21/11/2026 (actualizar cada tanto)
  otras: [
    { red: 'twitch', nombre: 'Twitch', usuario: 'GuiltyGearArgentina', link: 'https://www.twitch.tv/guiltygearargentina', numero: '959', que: 'seguidores' },
    { red: 'youtube', nombre: 'YouTube', usuario: '@guiltygearargentina', link: 'https://www.youtube.com/@guiltygearargentina', numero: '542', que: 'suscriptores' },
    { red: 'instagram', nombre: 'Instagram', usuario: '@guiltygearargentina', link: 'https://www.instagram.com/guiltygearargentina/', numero: '227', que: 'seguidores' },
  ],
}

// Menú: cada uno es una página (Inicio está en el logo)
export const menu = [
  { id: 'nosotros', nombre: 'Nosotros' },
  { id: 'juegos', nombre: 'Juegos' },
  { id: 'eventos', nombre: 'Eventos' },
  { id: 'aprende', nombre: 'Aprendé' },
  { id: 'comunidad', nombre: 'Comunidad' },
]

export const aviso =
  'Guilty Gear es una marca de Arc System Works. Sitio de la comunidad, sin afiliación oficial.'


// ---------------------------------------------------------------------
//  PÁGINAS: título y bajada de la cabecera de cada página
// ---------------------------------------------------------------------
export const paginas = {
  nosotros: { bajada: 'Quiénes somos', titulo: 'Nosotros', texto: 'La comunidad sudamericana de Guilty Gear: lobbys, torneos para novatos y clases gratis desde 2020.' },
  juegos: { bajada: 'Strive · Xrd REV 2 · +R', titulo: 'Juegos', texto: 'Los tres Guilty que jugamos, sus mecánicas y el plantel completo del más actual.' },
  eventos: { bajada: 'En vivo por Twitch', titulo: 'Eventos', texto: 'Lobbys abiertos los martes y jueves, torneo de novatos los sábados y todo lo que ya pasó.' },
  aprende: { bajada: 'La Escuelita de GGA', titulo: 'Aprendé', texto: 'Clases gratis para arrancar de cero o subir de nivel, y el diccionario para entender cómo hablamos.' },
  comunidad: { bajada: 'Discord y redes', titulo: 'Comunidad', texto: 'Dónde estamos, cómo sumarte y las reglas para que todos la pasemos bien.' },
}


// ---------------------------------------------------------------------
//  NOSOTROS
// ---------------------------------------------------------------------
export const nosotros = {
  bio: 'Comunidad de la saga Guilty Gear y equipo semi-profesional de eSports.', // de la bio de X
  pilares: [
    { titulo: 'Lobbys abiertos', texto: 'Todas las semanas, martes y jueves a las 20 hs en el canal de Order Kyo. Jugás en stream, pedís feedback y le perdés el miedo a la cámara.' },
    { titulo: 'Torneos para novatos', texto: 'Wake up, Throw!: el torneo de rookies de los sábados a las 18 hs, organizado por Nabbori. El top 8 va en vivo.' },
    { titulo: 'Streams didácticos', texto: 'La Escuelita: clases gratis de Strive, Xrd REV 2 y +R, desde lo básico de cualquier juego de pelea.' },
    { titulo: 'Ligas y crew battles', texto: 'Ligas propias y crew battles contra comunidades de la región, como Brasil y VAL.' },
  ],
  // Hitos que se ven en X y en el canal de YouTube de GGA
  historia: [
    { anio: '2020', texto: 'Nace Guilty Gear Argentina (la cuenta de X @GearArgentina es de octubre de 2020).' },
    { anio: '2021', texto: 'Torneo de Verano 2021 y primeros eventos grabados en el canal de YouTube.' },
    { anio: 'Ligas', texto: 'Liga Dark Winter, Rookie of the Winter y crew battles contra Brasil, VAL y TIER.' },
    { anio: '2023', texto: 'Liga Argentina de GGST 2023 y Torneo de Navidad 2023.' },
    { anio: '2026', texto: 'Calendario fijo: cada semana del mes un Guilty distinto, con lobby y torneo. Más de 2.100 personas en el Discord.' },
  ],
}

// ---------------------------------------------------------------------
//  PERSONAJES DE STRIVE (34 al 21/11/2026: 15 de base + 19 DLC)
//  Imagen opcional de cada uno: src/assets/personajes/<id>.webp|png|jpg
//  OJO: imágenes propias o fan art con permiso del artista. Las guías de
//  fans de Arc System Works no permiten usar ilustraciones, logos ni
//  contenido del juego oficiales directamente.
// ---------------------------------------------------------------------
export const personajes = {
  juego: 'Guilty Gear -Strive-',
  // perfil = código de la página oficial: guiltygear.com/ggst/en/character/<perfil>/ (verificados 21/11/2026)
  perfiles: 'https://www.guiltygear.com/ggst/en/character/',
  proximo: 'DLC #20: personaje invitado (invierno 2026) · #21 en primavera 2027',
  lista: [
    { id: 'sol', perfil: 'sol', nombre: 'Sol Badguy', tanda: 'Base' },
    { id: 'ky', perfil: 'kyk', nombre: 'Ky Kiske', tanda: 'Base' },
    { id: 'may', perfil: 'may', nombre: 'May', tanda: 'Base' },
    { id: 'axl', perfil: 'axl', nombre: 'Axl Low', tanda: 'Base' },
    { id: 'chipp', perfil: 'chp', nombre: 'Chipp Zanuff', tanda: 'Base' },
    { id: 'potemkin', perfil: 'pot', nombre: 'Potemkin', tanda: 'Base' },
    { id: 'faust', perfil: 'fau', nombre: 'Faust', tanda: 'Base' },
    { id: 'millia', perfil: 'mll', nombre: 'Millia Rage', tanda: 'Base' },
    { id: 'zato', perfil: 'zat', nombre: 'Zato-1', tanda: 'Base' },
    { id: 'ramlethal', perfil: 'ram', nombre: 'Ramlethal Valentine', tanda: 'Base' },
    { id: 'leo', perfil: 'leo', nombre: 'Leo Whitefang', tanda: 'Base' },
    { id: 'nagoriyuki', perfil: 'nag', nombre: 'Nagoriyuki', tanda: 'Base' },
    { id: 'giovanna', perfil: 'gio', nombre: 'Giovanna', tanda: 'Base' },
    { id: 'anji', perfil: 'anji', nombre: 'Anji Mito', tanda: 'Base' },
    { id: 'ino', perfil: 'ino', nombre: 'I-No', tanda: 'Base' },
    { id: 'goldlewis', perfil: 'gld', nombre: 'Goldlewis Dickinson', tanda: 'Temporada 1' },
    { id: 'jacko', perfil: 'jko', nombre: "Jack-O'", tanda: 'Temporada 1' },
    { id: 'happychaos', perfil: 'cos', nombre: 'Happy Chaos', tanda: 'Temporada 1' },
    { id: 'baiken', perfil: 'bkn', nombre: 'Baiken', tanda: 'Temporada 1' },
    { id: 'testament', perfil: 'tst', nombre: 'Testament', tanda: 'Temporada 1' },
    { id: 'bridget', perfil: 'bgt', nombre: 'Bridget', tanda: 'Temporada 2' },
    { id: 'sin', perfil: 'sin', nombre: 'Sin Kiske', tanda: 'Temporada 2' },
    { id: 'bedman', perfil: 'bed', nombre: 'Bedman?', tanda: 'Temporada 2' },
    { id: 'asuka', perfil: 'ask', nombre: 'Asuka R♯', tanda: 'Temporada 2' },
    { id: 'johnny', perfil: 'jhn', nombre: 'Johnny', tanda: 'Temporada 3' },
    { id: 'elphelt', perfil: 'elp', nombre: 'Elphelt Valentine', tanda: 'Temporada 3' },
    { id: 'aba', perfil: 'aba', nombre: 'A.B.A', tanda: 'Temporada 3' },
    { id: 'slayer', perfil: 'sly', nombre: 'Slayer', tanda: 'Temporada 3' },
    { id: 'dizzy', perfil: 'dzy', nombre: 'Queen Dizzy', tanda: 'Temporada 4' },
    { id: 'venom', perfil: 'ven', nombre: 'Venom', tanda: 'Temporada 4' },
    { id: 'unika', perfil: 'uni', nombre: 'Unika', tanda: 'Temporada 4' },
    { id: 'lucy', perfil: 'luc', nombre: 'Lucy', tanda: 'Temporada 4', nota: 'Invitada de Cyberpunk: Edgerunners' },
    { id: 'jam', perfil: 'jam', nombre: 'Jam Kuradoberi', tanda: 'Temporada 5' },
    { id: 'roboky', perfil: 'rbk', nombre: 'Robo-Ky', tanda: 'Temporada 5' },
  ],
}

// ---------------------------------------------------------------------
//  REGLAS DEL DISCORD
//  Están dentro del servidor y no se ven sin cuenta. Cargalas acá tal
//  cual, una por línea: { titulo: '...', texto: '...' }. Aparecen solas
//  en Comunidad. Con la lista vacía se muestra el aviso para leerlas en el server.
// ---------------------------------------------------------------------
export const reglasDiscord = {
  titulo: 'Reglas del Discord',
  texto: 'Para que el server siga siendo un lugar copado para jugar y aprender.',
  lista: [],
  basicas: [
    { titulo: 'Pautas de la comunidad de Discord', link: 'https://discord.com/guidelines', texto: 'Valen en todos los servidores, también en el nuestro.' },
    { titulo: 'Términos del servicio de Discord', link: 'https://discord.com/terms', texto: 'Para tener cuenta hay que cumplirlos, edad mínima incluida.' },
  ],
}

// ---------------------------------------------------------------------
//  INICIO (debajo de la portada 3D, estilo Fnatic): 4 tarjetas.
//  ultimoVideo = el video más nuevo del canal de GGA (cambiarlo cuando suban otro).
//  El próximo evento sale solo del calendario; Discord y clases, de sus datos.
// ---------------------------------------------------------------------
export const inicio = {
  ultimoVideo: { id: 'PjmJW3yotgQ', titulo: 'La Escuelita de ACPR · Stream 3', tag: '+R' },
}

// ---------------------------------------------------------------------
//  EL TEAM (página Nosotros): jugadores del equipo semi-profesional.
//  Tarjeta de cada uno (la de Instagram, opcional): src/assets/team/<id>.jpg|png|webp
//  x = usuario de X sin @ (opcional)
// ---------------------------------------------------------------------
export const team = {
  texto: 'Además de comunidad, somos un equipo semi-profesional que compite en la escena de Guilty Gear Strive.',
  jugadores: [
    { id: 'pacha', nick: 'Pacha' },
    { id: 'orderkyo', nick: 'Order Kyo', x: 'orderkyo' },
    { id: 'jest', nick: 'Jest', x: 'JestElPibe' },
    { id: 'tsubomikyo', nick: 'Tsubomi Kyo' },
    { id: 'agma', nick: 'Agma' },
  ],
}

// ---------------------------------------------------------------------
//  GALERÍA "LA COMUNIDAD" (página Nosotros)
//  Poné las fotos en src/assets/comunidad/ (jpg, png o webp) y aparecen solas,
//  ordenadas por nombre de archivo (ej.: 01-presencial.jpg, 02-torneo.jpg).
//  Epígrafe opcional: 'nombre-del-archivo.jpg': 'Texto'
//  Usar fotos con el OK de quienes aparecen.
// ---------------------------------------------------------------------
export const galeria = {
  epigrafes: {},
}
