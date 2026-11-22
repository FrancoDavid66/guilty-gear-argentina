// Calcula el próximo evento (o el que está en vivo) a partir de los días y la hora argentina.
import { idiomaActual, localeActual, t } from '../i18n'
const ARG = -3 // UTC-3, sin horario de verano

function ocurrenciasDe(evento, desde) {
  const [h, m] = evento.hora.split(':').map(Number)
  const lista = []
  // fecha "argentina" de hoy
  const base = new Date(desde.getTime() + ARG * 3600_000)
  for (let d = -1; d <= 8; d++) {
    const dia = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + d))
    if (!evento.dias.includes(dia.getUTCDay())) continue
    const inicio = new Date(Date.UTC(dia.getUTCFullYear(), dia.getUTCMonth(), dia.getUTCDate(), h - ARG, m))
    lista.push(inicio)
  }
  return lista
}

export function proximoEvento(eventos, duracionHoras, ahora = new Date()) {
  const dur = duracionHoras * 3600_000
  let mejor = null
  for (const ev of eventos) {
    for (const inicio of ocurrenciasDe(ev, ahora)) {
      const fin = inicio.getTime() + dur
      if (fin < ahora.getTime()) continue
      const enVivo = inicio.getTime() <= ahora.getTime()
      const cand = { evento: ev, inicio, enVivo }
      if (!mejor || (enVivo && !mejor.enVivo) || (enVivo === mejor.enVivo && inicio < mejor.inicio)) mejor = cand
    }
  }
  return mejor
}

const DIAS_IDIOMA = {
  es: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  pt: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
}
const diasDe = () => DIAS_IDIOMA[idiomaActual()] ?? DIAS_IDIOMA.es

export function diasTexto(dias) {
  const n = dias.map((d) => diasDe()[d])
  const id = idiomaActual()
  if (n.length === 1) {
    if (id === 'en') return `Every ${n[0]}`
    if (id === 'pt') return `Todo ${n[0]}${n[0] === 'sábado' || n[0] === 'domingo' ? '' : '-feira'}`
    return `Todos los ${n[0]}${n[0].endsWith('s') ? '' : 's'}`
  }
  const y = id === 'en' ? ' and ' : id === 'pt' ? ' e ' : ' y '
  return n.slice(0, -1).map(cap).join(', ') + y + n.at(-1)
}

function cap(s) {
  return s[0].toUpperCase() + s.slice(1)
}

// "Jueves 20:00" en hora argentina
export function fechaArg(fecha) {
  const f = new Date(fecha.getTime() + ARG * 3600_000)
  const hh = String(f.getUTCHours()).padStart(2, '0')
  const mm = String(f.getUTCMinutes()).padStart(2, '0')
  return { dia: cap(diasDe()[f.getUTCDay()]), hora: `${hh}:${mm}` }
}

// Si quien mira no está en hora argentina, devuelve la hora en su zona
export function horaLocal(fecha) {
  if (-new Date().getTimezoneOffset() / 60 === ARG) return null
  try {
    return fecha.toLocaleString(localeActual(), { weekday: 'long', hour: '2-digit', minute: '2-digit' })
  } catch {
    return null
  }
}

export function partes(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  }
}

// ---------------- Calendario del mes ----------------
const NOMBRES = { lobby: 'Lobby abierto', torneo: 'Torneo novatos' } // se traducen con t()

// Pasa una fecha AAAA-MM-DD + hora argentina a Date
export function fechaDe(fecha, hora) {
  const [a, m, d] = fecha.split('-').map(Number)
  const [h, mi] = hora.split(':').map(Number)
  return new Date(Date.UTC(a, m - 1, d, h - ARG, mi))
}

// Lista del calendario con todo lo necesario para mostrar (canal, link, estado)
export function armarCalendario(calendario, lista, duracionHoras, ahora = new Date()) {
  const dur = duracionHoras * 3600_000
  const porTipo = Object.fromEntries(lista.map((e) => [e.id, e]))
  let proximoMarcado = false
  return calendario.eventos
    .map((e) => ({ ...e, inicio: fechaDe(e.fecha, e.hora) }))
    .sort((a, b) => a.inicio - b.inicio)
    .map((e) => {
      const base = porTipo[e.tipo] ?? {}
      const ms = e.inicio.getTime()
      let estado = 'futuro'
      if (ahora.getTime() >= ms + dur) estado = 'terminado'
      else if (ahora.getTime() >= ms) estado = 'vivo'
      else if (!proximoMarcado) {
        estado = 'proximo'
        proximoMarcado = true
      }
      if (estado === 'vivo') proximoMarcado = true
      return {
        ...e,
        nombre: e.nombre ?? (NOMBRES[e.tipo] ? t(NOMBRES[e.tipo]) : e.tipo),
        canal: base.canal,
        link: base.link,
        estado,
        hoy: mismoDiaArg(e.inicio, ahora),
      }
    })
}

function mismoDiaArg(a, b) {
  const x = new Date(a.getTime() + ARG * 3600_000)
  const y = new Date(b.getTime() + ARG * 3600_000)
  return x.getUTCFullYear() === y.getUTCFullYear() && x.getUTCMonth() === y.getUTCMonth() && x.getUTCDate() === y.getUTCDate()
}

// Próximo evento: primero el calendario del mes; si ya terminó, los días fijos
export function proximoGeneral(calendario, lista, duracionHoras, ahora = new Date()) {
  const cal = armarCalendario(calendario, lista, duracionHoras, ahora)
  const vivo = cal.find((e) => e.estado === 'vivo')
  const prox = vivo ?? cal.find((e) => e.estado === 'proximo')
  if (prox) return { ...prox, enVivo: prox.estado === 'vivo', delCalendario: true }
  const fijo = proximoEvento(lista, duracionHoras, ahora)
  if (!fijo) return null
  return {
    nombre: fijo.evento.nombre,
    canal: fijo.evento.canal,
    link: fijo.evento.link,
    inicio: fijo.inicio,
    enVivo: fijo.enVivo,
    delCalendario: false,
  }
}

export function diaCorto(fecha) {
  const f = new Date(fecha.getTime() + ARG * 3600_000)
  return { num: f.getUTCDate(), dia: diasDe()[f.getUTCDay()].slice(0, 3) }
}
